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
