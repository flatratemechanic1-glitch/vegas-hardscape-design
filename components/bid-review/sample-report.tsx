import { AlertTriangle, Check, Lock } from "lucide-react";

// Illustrative sample only — a fabricated bid built to demonstrate the
// report format, not an actual client's project. Market-range figures are
// blurred in the rendered table (see the `range` cell below) so the page
// shows the shape of the findings without giving away the benchmark data
// that's part of what a customer pays for. Shared as-is across every
// bid-review landing page (root + verticals) rather than customized per
// project type, to avoid maintaining N slightly-different fabricated bids.
const SAMPLE_LINE_ITEMS = [
  {
    item: "Travertine paver installation (900 sq ft)",
    bid: "$18,400",
    range: "$14-17/sq ft",
    assessment: "$3,100 above range",
    flagged: true,
  },
  {
    item: "Pool deck demo & haul-off",
    bid: "$3,200",
    range: "$2,800-3,500",
    assessment: "Typical",
    flagged: false,
  },
  {
    item: "Electrical for lighting (allowance)",
    bid: "$2,200",
    range: "—",
    assessment: "Vague scope",
    flagged: true,
  },
  {
    item: "Engineered retaining wall (60 linear ft)",
    bid: "$12,000",
    range: "$140-175/ft",
    assessment: "$1,500 above range",
    flagged: true,
  },
  {
    item: "Irrigation tie-in",
    bid: "$700",
    range: "$900-1,300",
    assessment: "$200 below range",
    flagged: false,
  },
  {
    item: "Permit & HOA submittal handling",
    bid: "$850",
    range: "$500-900",
    assessment: "Typical",
    flagged: false,
  },
];

const SAMPLE_TOTAL_BID = "$37,350";

const SAMPLE_FINDINGS = [
  "Pricing: The travertine paver line comes in $3,100 above the current Las Vegas Valley market range for this size and material — the full range is in your paid review. Ask for a materials and labor breakdown before agreeing to it.",
  "Pricing: The engineered retaining wall's per-foot rate runs $1,500 above the typical range for this length and height, and it's not clear whether a stamped engineering review is included, or billed separately.",
  "Pricing: The irrigation tie-in comes in about $200 below typical range for this scope — good news on price, though worth a quick check that the scope (zone count, fittings) matches a typical tie-in at this price.",
  "Scope gap: “Electrical for lighting” is a single $2,200 allowance with no fixture count, wattage, or trenching detail. Vague allowances like this are one of the most common places change orders show up later.",
];

const SAMPLE_QUESTIONS = [
  "Can you break the electrical allowance down by fixture count, wattage, and trenching instead of one lump sum?",
  "What's driving the $3,100 premium on the paver install compared to current market rates — material grade, base prep, or something else?",
  "Is a stamped engineering review included for the retaining wall at this height, or is that billed separately?",
  "Can you confirm the irrigation tie-in's zone count and fittings match a typical setup at this price?",
];

export function SampleReport() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 pt-24 pb-16 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            See A Sample
          </p>
          <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
            What A Review Actually Looks Like
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-sm border border-border bg-card text-left">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border bg-secondary/40 px-6 py-5">
            <div>
              <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase">
                Bid Review Report
              </p>
              <p className="mt-1 font-heading text-lg text-foreground">
                Backyard Hardscape &amp; Pool Deck Renovation
              </p>
            </div>
            <p className="text-right text-xs text-muted-foreground">
              Prepared by
              <br />
              Vegas Hardscape Design
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                  <th scope="col" className="px-6 py-3 font-medium">
                    Line Item
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Bid
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      Market Range
                      <Lock className="size-3 shrink-0" strokeWidth={2} />
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Assessment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SAMPLE_LINE_ITEMS.map((row) => (
                  <tr key={row.item}>
                    <td className="px-6 py-4 align-top text-foreground">{row.item}</td>
                    <td className="px-4 py-4 align-top whitespace-nowrap text-foreground">
                      {row.bid}
                    </td>
                    <td className="px-4 py-4 align-top whitespace-nowrap text-muted-foreground">
                      {row.range === "—" ? (
                        row.range
                      ) : (
                        <span
                          className="pointer-events-none blur-[4px] select-none"
                          aria-hidden="true"
                        >
                          {row.range}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-top whitespace-nowrap">
                      <span
                        className={
                          row.flagged
                            ? "inline-flex items-center gap-1.5 text-accent"
                            : "inline-flex items-center gap-1.5 text-muted-foreground"
                        }
                      >
                        {row.flagged ? (
                          <AlertTriangle className="size-3.5 shrink-0" strokeWidth={2} />
                        ) : (
                          <Check className="size-3.5 shrink-0" strokeWidth={2} />
                        )}
                        {row.assessment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border">
                  <td className="px-6 py-4 font-medium text-foreground">Total Bid</td>
                  <td className="px-4 py-4 font-medium whitespace-nowrap text-foreground">
                    {SAMPLE_TOTAL_BID}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="border-t border-border px-6 py-3 text-xs text-muted-foreground/80">
            <Lock className="mr-1.5 inline size-3" strokeWidth={2} />
            Market-rate benchmarks are blurred here — they&apos;re included
            in full in your paid review.
          </p>

          <div className="border-t border-border px-6 py-6">
            <p className="text-xs font-medium tracking-[0.15em] text-foreground/60 uppercase">
              Findings
            </p>
            <ul className="mt-3 space-y-3">
              {SAMPLE_FINDINGS.map((finding) => (
                <li key={finding} className="flex items-start gap-3 text-sm text-foreground">
                  <AlertTriangle
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    strokeWidth={2}
                  />
                  {finding}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs font-medium tracking-[0.15em] text-foreground/60 uppercase">
              Questions To Bring To Your Contractor
            </p>
            <ul className="mt-3 space-y-3">
              {SAMPLE_QUESTIONS.map((question) => (
                <li key={question} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} />
                  {question}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col items-start gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-heading text-lg text-foreground">
                $4,600 in above-range pricing flagged
              </p>
              <p className="text-xs font-medium tracking-[0.1em] text-accent uppercase">
                ~18x the cost of the review
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Bottom line: </span>
              Three items worth resolving before signing — the paver
              pricing ($3,100 above range), the retaining wall pricing and
              engineering ($1,500 above range), and the electrical
              allowance&apos;s vague scope. The irrigation tie-in comes in
              $200 below range — good news — and demo and permitting line
              up with current market rates.
            </p>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground/80">
          Illustrative example built from typical bid patterns — not an
          actual client&apos;s project.
        </p>
      </div>
    </section>
  );
}
