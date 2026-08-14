import {
  MAX_PHOTO_BYTES_CLIENT,
  MAX_PHOTO_DIMENSION,
  PHOTO_JPEG_QUALITY_STEPS,
} from "@/lib/constants";

export class PhotoCompressionError extends Error {}

export type CompressedPhoto = {
  blob: Blob;
  filename: string;
  width: number;
  height: number;
};

async function decodeToDrawable(
  file: File
): Promise<{ source: CanvasImageSource; width: number; height: number; cleanup: () => void }> {
  try {
    const bitmap = await createImageBitmap(file);
    return {
      source: bitmap,
      width: bitmap.width,
      height: bitmap.height,
      cleanup: () => bitmap.close(),
    };
  } catch {
    // Fall back to an <img> element decode for formats createImageBitmap
    // can't handle in this browser (e.g. some HEIC cases in Safari).
    const objectUrl = URL.createObjectURL(file);
    try {
      const img = new Image();
      const loaded = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image failed to load."));
        setTimeout(() => reject(new Error("Image load timed out.")), 8000);
      });
      img.src = objectUrl;
      await loaded;
      return {
        source: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        cleanup: () => URL.revokeObjectURL(objectUrl),
      };
    } catch (err) {
      URL.revokeObjectURL(objectUrl);
      throw err;
    }
  }
}

function canvasToBlobAsync(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

function deriveJpegFilename(originalName: string): string {
  const base = originalName.replace(/\.[^.]+$/, "");
  return `${base || "photo"}.jpg`;
}

export async function compressImageFile(file: File): Promise<CompressedPhoto> {
  if (!file.type.startsWith("image/")) {
    throw new PhotoCompressionError("Unsupported file type.");
  }

  let decoded: Awaited<ReturnType<typeof decodeToDrawable>>;
  try {
    decoded = await decodeToDrawable(file);
  } catch {
    throw new PhotoCompressionError(
      "We couldn't read this photo — try a different file."
    );
  }

  const { source, width, height, cleanup } = decoded;

  try {
    const scale = Math.min(1, MAX_PHOTO_DIMENSION / Math.max(width, height));
    const targetWidth = Math.max(1, Math.round(width * scale));
    const targetHeight = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new PhotoCompressionError("Photo compression isn't supported in this browser.");
    }
    ctx.drawImage(source, 0, 0, targetWidth, targetHeight);

    let best: Blob | null = null;
    for (const quality of PHOTO_JPEG_QUALITY_STEPS) {
      const blob = await canvasToBlobAsync(canvas, "image/jpeg", quality);
      if (!blob) continue;
      best = blob;
      if (blob.size <= MAX_PHOTO_BYTES_CLIENT) {
        return { blob, filename: deriveJpegFilename(file.name), width: targetWidth, height: targetHeight };
      }
    }

    if (best && best.size <= MAX_PHOTO_BYTES_CLIENT) {
      return { blob: best, filename: deriveJpegFilename(file.name), width: targetWidth, height: targetHeight };
    }

    throw new PhotoCompressionError(
      "This photo is too large even after compression — try a smaller or simpler photo."
    );
  } finally {
    cleanup();
  }
}
