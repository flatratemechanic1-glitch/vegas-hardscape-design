declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// GA4's recommended event name for a completed contact/quote request.
// `form` distinguishes the homepage quick-form from the full /contact page
// form so conversion rate can be compared between the two.
export function trackLeadSubmitted(form: "hero" | "contact_page") {
  window.gtag?.("event", "generate_lead", { form });
}

// GA4's enhanced measurement only auto-tracks outbound clicks to other
// domains, not tel: links, so phone taps need an explicit event.
// `location` marks which tel: link was clicked — footer (every page), the
// homepage quick-form, or the full /contact page.
export function trackPhoneClick(location: "footer" | "hero_form" | "contact_page") {
  window.gtag?.("event", "phone_call_click", { location });
}

// Measures engagement with free interactive tools (e.g. the paver
// calculator) so their traffic/SEO value can be judged by actual usage,
// not just pageviews. `tool` names the calculator; fires once per session
// of meaningful use (valid dimensions entered), not on every keystroke.
export function trackToolUsed(tool: string) {
  window.gtag?.("event", "tool_used", { tool });
}

// Fires when a visitor carries their selected plants from /plants into a
// quote request, so this funnel is measurable alongside the calculators.
export function trackPlantsQuoteRequested(plantCount: number) {
  window.gtag?.("event", "plants_quote_requested", { plant_count: plantCount });
}

// GA4's recommended event name for a completed purchase — fires once the
// paid bid-review upload form is successfully submitted (after Stripe
// Checkout has already confirmed payment), so this revenue funnel is
// trackable end to end alongside the free-lead events above.
export function trackBidReviewSubmitted() {
  window.gtag?.("event", "purchase", {
    currency: "USD",
    value: 249,
    items: [{ item_name: "Contractor Bid Review" }],
  });
}
