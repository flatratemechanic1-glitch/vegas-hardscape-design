export type Testimonial = {
  quote: string;
  author: string;
  detail: string;
};

// From Susan, the client behind the Featured Project case study on the
// Portfolio page — a real backyard pool, water-feature bench, turf, and
// gazebo renovation. Reused as a condensed pull-quote on the homepage.
export const FEATURED_TESTIMONIAL: Testimonial = {
  quote:
    "Our backyard was just grass and a patio — we had no idea how to turn it into what we wanted. The renderings let us see the pool, the water feature wall, even where the turf and gazebo would go, before any of it was real. Reggie was on-site checking the work against that plan through the whole build. What we ended up with is exactly what we approved on screen.",
  author: "Susan",
  detail: "Backyard Pool & Turf Renovation, Las Vegas",
};
