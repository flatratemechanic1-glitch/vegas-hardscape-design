"use client";

import type { ComponentProps } from "react";
import { trackPhoneClick } from "@/lib/analytics";
import { CONTACT_PHONE_TEL } from "@/lib/constants";

type TrackedPhoneLinkProps = Omit<ComponentProps<"a">, "href"> & {
  location: Parameters<typeof trackPhoneClick>[0];
};

export function TrackedPhoneLink({ location, ...props }: TrackedPhoneLinkProps) {
  return (
    <a
      href={`tel:${CONTACT_PHONE_TEL}`}
      onClick={() => trackPhoneClick(location)}
      {...props}
    />
  );
}
