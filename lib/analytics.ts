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
