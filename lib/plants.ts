export type PlantCategory =
  | "Trees"
  | "Shrubs"
  | "Cacti & Succulents"
  | "Groundcovers"
  | "Ornamental Grasses";

export const PLANT_CATEGORIES: PlantCategory[] = [
  "Trees",
  "Shrubs",
  "Cacti & Succulents",
  "Groundcovers",
  "Ornamental Grasses",
];

export type Plant = {
  slug: string;
  name: string;
  scientificName: string;
  category: PlantCategory;
  waterUse: "Very Low" | "Low";
  sunExposure: string;
  matureSize: string;
  description: string;
  // Path under /public once real or licensed photos are sourced.
  // Falls back to an icon panel when unset — see PlantCard.
  image?: string;
};

// Deliberately common, widely-sold nursery plants (not obscure natives) so
// photos are easy to source and homeowners can actually find these at
// local nurseries like Star Nursery. Matches SNWA's Water Smart Landscapes
// approved-plant list.
export const PLANTS: Plant[] = [
  {
    slug: "desert-willow",
    name: "Desert Willow",
    scientificName: "Chilopsis linearis",
    category: "Trees",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "15-25 ft tall",
    description:
      "Deep roots and narrow, willow-like leaves minimize water loss, and it covers itself in orchid-like blooms all summer in full sun.",
  },
  {
    slug: "palo-verde",
    name: "Palo Verde",
    scientificName: "Parkinsonia spp.",
    category: "Trees",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "20-30 ft tall",
    description:
      "Green bark photosynthesizes on its own, so the tree can drop its small leaves in drought and keep producing energy anyway.",
  },
  {
    slug: "honey-mesquite",
    name: "Honey Mesquite",
    scientificName: "Prosopis glandulosa",
    category: "Trees",
    waterUse: "Very Low",
    sunExposure: "Full Sun",
    matureSize: "20-30 ft tall",
    description:
      "Taproots reach 50+ ft down to groundwater, letting it thrive on almost no supplemental water once established.",
  },
  {
    slug: "texas-ranger",
    name: "Texas Ranger",
    scientificName: "Leucophyllum frutescens",
    category: "Shrubs",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "5-8 ft tall",
    description:
      "Silvery, fuzzy leaves reflect heat and cut moisture loss, then the shrub flushes with purple blooms after summer humidity.",
  },
  {
    slug: "red-bird-of-paradise",
    name: "Red Bird of Paradise",
    scientificName: "Caesalpinia pulcherrima",
    category: "Shrubs",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "6-10 ft tall",
    description:
      "A true heat-lover that blooms hardest in the peak of Vegas summer, exactly when most other plants shut down.",
  },
  {
    slug: "brittlebush",
    name: "Brittlebush",
    scientificName: "Encelia farinosa",
    category: "Shrubs",
    waterUse: "Very Low",
    sunExposure: "Full Sun",
    matureSize: "2-5 ft tall",
    description:
      "A Mojave native with silver-gray leaves that reflect intense sun; it goes semi-dormant through the driest months to conserve water.",
  },
  {
    slug: "desert-marigold",
    name: "Desert Marigold",
    scientificName: "Baileya multiradiata",
    category: "Shrubs",
    waterUse: "Very Low",
    sunExposure: "Full Sun",
    matureSize: "1-2 ft tall",
    description:
      "Hairy, silvery foliage and a short lifecycle let it bloom heavily in cool months and coast through extreme heat on very little water.",
  },
  {
    slug: "golden-barrel-cactus",
    name: "Golden Barrel Cactus",
    scientificName: "Echinocactus grusonii",
    category: "Cacti & Succulents",
    waterUse: "Very Low",
    sunExposure: "Full Sun",
    matureSize: "2-3 ft tall/wide",
    description:
      "Its ribbed, barrel shape expands to store water, and dense golden spines shade the plant's own surface.",
  },
  {
    slug: "red-yucca",
    name: "Red Yucca",
    scientificName: "Hesperaloe parviflora",
    category: "Cacti & Succulents",
    waterUse: "Very Low",
    sunExposure: "Full Sun",
    matureSize: "2-3 ft tall, 3-4 ft wide",
    description:
      "Thick, fibrous leaves store water and tolerate the reflected heat off patios and walls that kills less hardy plants.",
  },
  {
    slug: "agave",
    name: "Agave",
    scientificName: "Agave americana / parryi",
    category: "Cacti & Succulents",
    waterUse: "Very Low",
    sunExposure: "Full Sun",
    matureSize: "2-6 ft tall/wide",
    description:
      "Thick succulent leaves in a rosette store water at the core, sacrificing outer leaves first when drought gets extreme.",
  },
  {
    slug: "prickly-pear-cactus",
    name: "Prickly Pear Cactus",
    scientificName: "Opuntia spp.",
    category: "Cacti & Succulents",
    waterUse: "Very Low",
    sunExposure: "Full Sun",
    matureSize: "2-5 ft tall/wide",
    description:
      "Flat, water-storing pads have a waxy coating that cuts evaporation to almost nothing, even in peak summer heat.",
  },
  {
    slug: "trailing-lantana",
    name: "Trailing Lantana",
    scientificName: "Lantana montevidensis",
    category: "Groundcovers",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "1-2 ft tall, spreads 4-6 ft",
    description:
      "A low, spreading habit shades its own root zone and keeps blooming right through peak summer heat.",
  },
  {
    slug: "trailing-rosemary",
    name: "Trailing Rosemary",
    scientificName: "Rosmarinus officinalis 'Prostratus'",
    category: "Groundcovers",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "1-2 ft tall, spreads 4-8 ft",
    description:
      "Mediterranean origins mean it's built for hot, dry summers and poor soil — and it doubles as a culinary herb.",
  },
  {
    slug: "deer-grass",
    name: "Deer Grass",
    scientificName: "Muhlenbergia rigens",
    category: "Ornamental Grasses",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "3-4 ft tall/wide",
    description:
      "A Mojave-native bunch grass with deep, fibrous roots built for infrequent watering and reflected heat.",
  },
  {
    slug: "purple-muhly-grass",
    name: "Purple Muhly Grass",
    scientificName: "Muhlenbergia capillaris",
    category: "Ornamental Grasses",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "2-3 ft tall/wide",
    description:
      "Tolerates reflected heat and poor soil while putting on a pink-plumed fall display few other low-water grasses can match.",
  },
];
