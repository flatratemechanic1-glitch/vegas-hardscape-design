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
    image: "/plants/desert-willow.png",
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
    image: "/plants/palo-verde.png",
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
    image: "/plants/honey-mesquite.png",
  },
  {
    slug: "spartan-juniper",
    name: "Spartan Juniper",
    scientificName: "Juniperus chinensis 'Spartan'",
    category: "Trees",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "15-20 ft tall, 3-4 ft wide",
    description:
      "A dense, columnar evergreen that holds a tight vertical form without shearing — the standard pick for screening a narrow side yard or fence line.",
    image: "/plants/spartan-juniper.png",
  },
  {
    slug: "italian-cypress",
    name: "Italian Cypress",
    scientificName: "Cupressus sempervirens",
    category: "Trees",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "30-40 ft tall, 3-5 ft wide",
    description:
      "The classic narrow, fast-growing spire seen along Vegas driveways and property lines — plant a row and it closes into a tall privacy wall in a few years.",
    image: "/plants/italian-cypress.png",
  },
  {
    slug: "arizona-cypress",
    name: "Arizona Cypress",
    scientificName: "Cupressus arizonica",
    category: "Trees",
    waterUse: "Very Low",
    sunExposure: "Full Sun",
    matureSize: "20-30 ft tall, 10-15 ft wide",
    description:
      "Blue-gray foliage on a broader, wind-tolerant conifer — one of the most drought-hardy screening trees for the Mojave once established.",
    image: "/plants/arizona-cypress.png",
  },
  {
    slug: "african-sumac",
    name: "African Sumac",
    scientificName: "Rhus lancea",
    category: "Trees",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "25-30 ft tall/wide",
    description:
      "A dense, weeping evergreen canopy grows quickly on minimal water and casts reliable shade year-round, making it one of the most common shade trees planted in Las Vegas yards.",
    image: "/plants/african-sumac.png",
  },
  {
    slug: "chilean-mesquite",
    name: "Chilean Mesquite",
    scientificName: "Prosopis chilensis",
    category: "Trees",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "25-35 ft tall/wide",
    description:
      "A fast-growing, feathery-canopied mesquite bred for near-thornless growth — the variety most local nurseries actually stock when homeowners ask for shade fast.",
    image: "/plants/chilean-mesquite.png",
  },
  {
    slug: "vitex",
    name: "Vitex (Chaste Tree)",
    scientificName: "Vitex agnus-castus",
    category: "Trees",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "15-20 ft tall/wide",
    description:
      "Deep roots and aromatic, drought-hardy foliage support months of purple flower spikes that keep blooming through the hottest part of summer.",
    image: "/plants/vitex.png",
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
    image: "/plants/texas-ranger.png",
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
    image: "/plants/red-bird-of-paradise.png",
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
    image: "/plants/brittlebush.png",
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
    image: "/plants/desert-marigold.png",
  },
  {
    slug: "oleander",
    name: "Oleander",
    scientificName: "Nerium oleander",
    category: "Shrubs",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "8-12 ft tall/wide",
    description:
      "Fast, dense evergreen growth makes it the go-to hedge along Vegas freeways for privacy and noise buffering. All parts are toxic if ingested, so keep it away from play areas if you have kids or pets.",
    image: "/plants/oleander.png",
  },
  {
    slug: "texas-mountain-laurel",
    name: "Texas Mountain Laurel",
    scientificName: "Sophora secundiflora",
    category: "Shrubs",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "10-15 ft tall, 8-10 ft wide",
    description:
      "Glossy evergreen foliage stays dense year-round for screening, with grape-scented purple blooms each spring — slow-growing but essentially maintenance-free once established.",
    image: "/plants/texas-mountain-laurel.png",
  },
  {
    slug: "natal-plum",
    name: "Natal Plum",
    scientificName: "Carissa macrocarpa",
    category: "Shrubs",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "4-6 ft tall/wide",
    description:
      "Glossy leaves and stiff thorns form a dense, wall-like hedge that adds security along with privacy, and the edible fruit is a bonus.",
    image: "/plants/natal-plum.png",
  },
  {
    slug: "pyracantha",
    name: "Pyracantha (Firethorn)",
    scientificName: "Pyracantha spp.",
    category: "Shrubs",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "6-12 ft tall/wide",
    description:
      "Thorny branches and thick evergreen cover make a fast, impenetrable screen, topped off with bright orange-red berries in fall.",
    image: "/plants/pyracantha.png",
  },
  {
    slug: "yellow-bells",
    name: "Yellow Bells",
    scientificName: "Tecoma stans",
    category: "Shrubs",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "6-8 ft tall/wide",
    description:
      "One of the toughest bloomers in Vegas heat, covering itself in trumpet-shaped yellow flowers from spring through the first frost.",
    image: "/plants/yellow-bells.png",
  },
  {
    slug: "autumn-sage",
    name: "Autumn Sage",
    scientificName: "Salvia greggii",
    category: "Shrubs",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "2-3 ft tall/wide",
    description:
      "Small, aromatic leaves cut water loss while the plant flushes with red, pink, purple, or white blooms nearly year-round and draws in hummingbirds.",
    image: "/plants/autumn-sage.png",
  },
  {
    slug: "fairy-duster",
    name: "Fairy Duster",
    scientificName: "Calliandra eriophylla",
    category: "Shrubs",
    waterUse: "Very Low",
    sunExposure: "Full Sun",
    matureSize: "2-3 ft tall, 3-5 ft wide",
    description:
      "A true Mojave native that needs almost no supplemental water once rooted in, covered each spring in pink powder-puff blooms.",
    image: "/plants/fairy-duster.png",
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
    image: "/plants/golden-barrel-cactus.png",
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
    image: "/plants/red-yucca.png",
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
    image: "/plants/agave.png",
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
    image: "/plants/prickly-pear-cactus.png",
  },
  {
    slug: "ocotillo",
    name: "Ocotillo",
    scientificName: "Fouquieria splendens",
    category: "Cacti & Succulents",
    waterUse: "Very Low",
    sunExposure: "Full Sun",
    matureSize: "10-15 ft tall",
    description:
      "Spiny whip-like canes stay leafless through drought and leaf out fast after any rain, topped with red flower spikes that hummingbirds seek out.",
    image: "/plants/ocotillo.png",
  },
  {
    slug: "desert-spoon",
    name: "Desert Spoon",
    scientificName: "Dasylirion wheeleri",
    category: "Cacti & Succulents",
    waterUse: "Very Low",
    sunExposure: "Full Sun",
    matureSize: "3-5 ft tall/wide",
    description:
      "A rosette of stiff, thin blades stores enough moisture in its base to shrug off months without rain — a favorite structural accent in gravel beds.",
    image: "/plants/desert-spoon.png",
  },
  {
    slug: "foxtail-agave",
    name: "Foxtail Agave",
    scientificName: "Agave attenuata",
    category: "Cacti & Succulents",
    waterUse: "Low",
    sunExposure: "Full Sun to Partial Shade",
    matureSize: "3-5 ft tall/wide",
    description:
      "Soft, spineless leaves make this the go-to agave for walkways and pool decks where sharp tips would be a hazard.",
    image: "/plants/foxtail-agave.png",
  },
  {
    slug: "soaptree-yucca",
    name: "Soaptree Yucca",
    scientificName: "Yucca elata",
    category: "Cacti & Succulents",
    waterUse: "Very Low",
    sunExposure: "Full Sun",
    matureSize: "6-10 ft tall",
    description:
      "Thin, fibrous leaves and a slow-growing trunk store enough water to survive extended drought, sending up tall white bloom spikes each summer.",
    image: "/plants/soaptree-yucca.png",
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
    image: "/plants/trailing-lantana.png",
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
    image: "/plants/trailing-rosemary.png",
  },
  {
    slug: "angelita-daisy",
    name: "Angelita Daisy",
    scientificName: "Tetraneuris acaulis",
    category: "Groundcovers",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "6-12 in tall, spreads 1-2 ft",
    description:
      "Grass-like foliage stays low and tight while bright yellow daisies bloom nearly year-round, making it a favorite for border edges and medians.",
    image: "/plants/angelita-daisy.png",
  },
  {
    slug: "ice-plant",
    name: "Ice Plant",
    scientificName: "Delosperma cooperi",
    category: "Groundcovers",
    waterUse: "Low",
    sunExposure: "Full Sun",
    matureSize: "4-6 in tall, spreads 2-3 ft",
    description:
      "Thick, succulent leaves store water for this fast-spreading mat, which blankets slopes and rock beds in magenta blooms through summer.",
    image: "/plants/ice-plant.png",
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
    image: "/plants/deer-grass.png",
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
    image: "/plants/purple-muhly-grass.png",
  },
];
