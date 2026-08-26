import type { Faq } from "@/lib/faqs";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            FAQ
          </p>
          <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-16 flex flex-col divide-y divide-border">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-8 first:pt-0 last:pb-0">
              <h3 className="font-heading text-lg text-foreground sm:text-xl">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
