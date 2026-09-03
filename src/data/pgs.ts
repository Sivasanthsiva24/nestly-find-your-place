import pg1 from "@/assets/pg-1.jpg";
import pg2 from "@/assets/pg-2.jpg";
import pg3 from "@/assets/pg-3.jpg";
import pg4 from "@/assets/pg-4.jpg";
import pg5 from "@/assets/pg-5.jpg";
import pg6 from "@/assets/pg-6.jpg";

export const AMENITIES = [
  "Wi-Fi",
  "Food",
  "Laundry",
  "AC",
  "Parking",
  "Gym",
  "Housekeeping",
  "Study Room",
] as const;
export type Amenity = (typeof AMENITIES)[number];

export const ROOM_TYPES = ["Single", "Double Sharing", "Triple Sharing", "4 Sharing"] as const;
export type RoomType = (typeof ROOM_TYPES)[number];

export const GENDERS = ["Male", "Female", "Unisex"] as const;
export type Gender = (typeof GENDERS)[number];

export type RoomOption = {
  type: RoomType;
  price: number;
  occupancy: number;
  available: number;
  image: string;
};

export type Review = {
  id: string;
  name: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
};

export type NearbyPlace = { label: string; name: string; distance: string };

export type PG = {
  id: string;
  name: string;
  area: string;
  city: string;
  college: string;
  distanceKm: number;
  rent: number;
  deposit: number;
  rating: number;
  reviewCount: number;
  gender: Gender;
  amenities: Amenity[];
  roomTypes: RoomType[];
  availableFrom: string;
  images: string[];
  description: string;
  rooms: RoomOption[];
  reviews: Review[];
  nearby: NearbyPlace[];
  rules: { label: string; value: string }[];
  owner: { name: string; since: string; responseTime: string };
  pin: { x: number; y: number };
};

const IMAGES = [pg1, pg2, pg3, pg4, pg5, pg6];

const REVIEW_TEXTS = [
  "Rooms are cleaned every day and the food is genuinely home-style. Walking distance to campus, so I save on autos every month.",
  "Wi-Fi holds up even during online exams. Warden is strict about entry timings but that made my parents comfortable.",
  "Great value for the rent. The study room on the second floor is quiet after 9 PM which helped a lot during semester exams.",
  "Water supply is consistent and there is a backup generator. Only complaint is that the parking area gets crowded.",
  "Moved in last June and never had to think about it again. Laundry twice a week and the mess menu actually rotates.",
  "Friendly crowd of students from nearby colleges. The common area is a good spot to work on group projects.",
];

const NAMES = [
  ["Aravind K.", "AK"],
  ["Sneha R.", "SR"],
  ["Mohammed Irfan", "MI"],
  ["Divya Prakash", "DP"],
  ["Karthik S.", "KS"],
  ["Ananya Nair", "AN"],
];

function buildReviews(seed: number, count: number): Review[] {
  return Array.from({ length: Math.min(count, 4) }, (_, i) => {
    const idx = (seed + i) % NAMES.length;
    const [name, initials] = NAMES[idx]!;
    return {
      id: `${seed}-${i}`,
      name,
      initials,
      rating: [5, 4, 5, 4][i % 4]!,
      date: ["Aug 2025", "Jul 2025", "Jun 2025", "May 2025"][i % 4]!,
      text: REVIEW_TEXTS[(seed + i) % REVIEW_TEXTS.length]!,
    };
  });
}

function rooms(base: number, types: RoomType[], seed: number): RoomOption[] {
  const factor: Record<RoomType, number> = {
    Single: 1.35,
    "Double Sharing": 1,
    "Triple Sharing": 0.82,
    "4 Sharing": 0.7,
  };
  const occ: Record<RoomType, number> = {
    Single: 1,
    "Double Sharing": 2,
    "Triple Sharing": 3,
    "4 Sharing": 4,
  };
  return types.map((t, i) => ({
    type: t,
    price: Math.round((base * factor[t]) / 100) * 100,
    occupancy: occ[t],
    available: ((seed + i) % 5) + 1,
    image: IMAGES[(seed + i) % IMAGES.length]!,
  }));
}

function nearby(college: string): NearbyPlace[] {
  return [
    { label: "College", name: college, distance: "1.2 km" },
    { label: "Bus stop", name: "Main Road Bus Stand", distance: "300 m" },
    { label: "Railway station", name: "City Junction", distance: "4.5 km" },
    { label: "Hospital", name: "Sri Ramakrishna Hospital", distance: "2.1 km" },
    { label: "Supermarket", name: "More Supermarket", distance: "450 m" },
  ];
}

const RULES = [
  { label: "Entry timings", value: "Gate closes at 10:30 PM (11:30 PM on weekends)" },
  { label: "Visitors", value: "Allowed in the common lounge till 8 PM" },
  { label: "Food", value: "Veg and non-veg mess, 3 meals a day included" },
  { label: "Smoking", value: "Not permitted anywhere inside the premises" },
  { label: "Pets", value: "Pets are not allowed" },
  { label: "Security", value: "CCTV on all floors, biometric main entry, night warden" },
];

type Seed = {
  name: string;
  area: string;
  city: string;
  college: string;
  distanceKm: number;
  rent: number;
  rating: number;
  reviewCount: number;
  gender: Gender;
  amenities: Amenity[];
  roomTypes: RoomType[];
  availableFrom: string;
  pin: { x: number; y: number };
};

const SEEDS: Seed[] = [
  {
    name: "GreenNest Premium PG",
    area: "Peelamedu",
    city: "Coimbatore",
    college: "PSG College of Technology",
    distanceKm: 1.2,
    rent: 7500,
    rating: 4.6,
    reviewCount: 128,
    gender: "Female",
    amenities: ["Wi-Fi", "Food", "AC", "Laundry", "Housekeeping"],
    roomTypes: ["Single", "Double Sharing", "Triple Sharing"],
    availableFrom: "1 Oct 2026",
    pin: { x: 24, y: 32 },
  },
  {
    name: "SunBurst Stay",
    area: "Porur",
    city: "Chennai",
    college: "Anna University",
    distanceKm: 0.8,
    rent: 6200,
    rating: 4.8,
    reviewCount: 203,
    gender: "Male",
    amenities: ["Wi-Fi", "Parking", "Gym", "Study Room", "Food"],
    roomTypes: ["Double Sharing", "Triple Sharing", "4 Sharing"],
    availableFrom: "15 Sep 2026",
    pin: { x: 58, y: 22 },
  },
  {
    name: "Amber House Hostel",
    area: "Banjara Hills",
    city: "Hyderabad",
    college: "Osmania University",
    distanceKm: 2.1,
    rent: 9800,
    rating: 4.4,
    reviewCount: 87,
    gender: "Unisex",
    amenities: ["Wi-Fi", "Food", "Housekeeping", "AC", "Parking"],
    roomTypes: ["Single", "Double Sharing"],
    availableFrom: "1 Sep 2026",
    pin: { x: 72, y: 55 },
  },
  {
    name: "Saravana Comfort PG",
    area: "Gandhipuram",
    city: "Coimbatore",
    college: "PSG College of Technology",
    distanceKm: 3.4,
    rent: 5400,
    rating: 4.1,
    reviewCount: 64,
    gender: "Male",
    amenities: ["Wi-Fi", "Food", "Laundry"],
    roomTypes: ["Double Sharing", "Triple Sharing", "4 Sharing"],
    availableFrom: "20 Sep 2026",
    pin: { x: 34, y: 68 },
  },
  {
    name: "Lotus Residency",
    area: "Adyar",
    city: "Chennai",
    college: "IIT Madras",
    distanceKm: 1.5,
    rent: 11500,
    rating: 4.9,
    reviewCount: 156,
    gender: "Female",
    amenities: ["Wi-Fi", "Food", "AC", "Gym", "Study Room", "Housekeeping"],
    roomTypes: ["Single", "Double Sharing"],
    availableFrom: "5 Oct 2026",
    pin: { x: 46, y: 44 },
  },
  {
    name: "Nest & Co Coliving",
    area: "Koramangala",
    city: "Bangalore",
    college: "Christ University",
    distanceKm: 0.9,
    rent: 13200,
    rating: 4.7,
    reviewCount: 241,
    gender: "Unisex",
    amenities: ["Wi-Fi", "AC", "Gym", "Housekeeping", "Parking", "Laundry"],
    roomTypes: ["Single", "Double Sharing"],
    availableFrom: "1 Sep 2026",
    pin: { x: 63, y: 74 },
  },
  {
    name: "Kaveri Girls Hostel",
    area: "Ettimadai",
    city: "Coimbatore",
    college: "Amrita University",
    distanceKm: 0.6,
    rent: 6800,
    rating: 4.3,
    reviewCount: 112,
    gender: "Female",
    amenities: ["Wi-Fi", "Food", "Laundry", "Study Room"],
    roomTypes: ["Double Sharing", "Triple Sharing", "4 Sharing"],
    availableFrom: "12 Sep 2026",
    pin: { x: 18, y: 58 },
  },
  {
    name: "UrbanRoost PG",
    area: "Kattankulathur",
    city: "Chennai",
    college: "SRM University",
    distanceKm: 1.1,
    rent: 7900,
    rating: 4.5,
    reviewCount: 178,
    gender: "Male",
    amenities: ["Wi-Fi", "Food", "AC", "Parking", "Housekeeping"],
    roomTypes: ["Single", "Double Sharing", "Triple Sharing"],
    availableFrom: "25 Sep 2026",
    pin: { x: 52, y: 62 },
  },
  {
    name: "Deccan Student Homes",
    area: "Kothrud",
    city: "Pune",
    college: "COEP Technological University",
    distanceKm: 2.8,
    rent: 8600,
    rating: 4.2,
    reviewCount: 93,
    gender: "Unisex",
    amenities: ["Wi-Fi", "Food", "Laundry", "Parking"],
    roomTypes: ["Double Sharing", "Triple Sharing"],
    availableFrom: "8 Oct 2026",
    pin: { x: 80, y: 34 },
  },
  {
    name: "Whitefield Nest",
    area: "Whitefield",
    city: "Bangalore",
    college: "Christ University",
    distanceKm: 6.2,
    rent: 9400,
    rating: 4.0,
    reviewCount: 58,
    gender: "Male",
    amenities: ["Wi-Fi", "AC", "Parking", "Gym"],
    roomTypes: ["Single", "Double Sharing", "Triple Sharing"],
    availableFrom: "1 Nov 2026",
    pin: { x: 86, y: 66 },
  },
  {
    name: "Marina View PG",
    area: "Triplicane",
    city: "Chennai",
    college: "Anna University",
    distanceKm: 4.7,
    rent: 5900,
    rating: 3.9,
    reviewCount: 47,
    gender: "Female",
    amenities: ["Wi-Fi", "Food", "Housekeeping"],
    roomTypes: ["Triple Sharing", "4 Sharing"],
    availableFrom: "18 Sep 2026",
    pin: { x: 40, y: 18 },
  },
  {
    name: "Hilltop Boys Hostel",
    area: "Saravanampatti",
    city: "Coimbatore",
    college: "Kumaraguru College of Technology",
    distanceKm: 1.9,
    rent: 6100,
    rating: 4.4,
    reviewCount: 134,
    gender: "Male",
    amenities: ["Wi-Fi", "Food", "Laundry", "Study Room", "Parking"],
    roomTypes: ["Double Sharing", "Triple Sharing", "4 Sharing"],
    availableFrom: "3 Oct 2026",
    pin: { x: 28, y: 12 },
  },
];

export const PGS: PG[] = SEEDS.map((s, i) => ({
  id: s.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  ...s,
  deposit: s.rent * 2,
  images: [
    IMAGES[i % IMAGES.length]!,
    IMAGES[(i + 1) % IMAGES.length]!,
    IMAGES[(i + 2) % IMAGES.length]!,
    IMAGES[(i + 3) % IMAGES.length]!,
  ],
  description: `${s.name} is a ${s.gender.toLowerCase() === "unisex" ? "co-living" : s.gender.toLowerCase()} paying guest accommodation in ${s.area}, ${s.city}, ${s.distanceKm} km from ${s.college}. The property has bright, furnished rooms with a bed, wardrobe and study table for every resident, filtered drinking water on each floor and power backup. Housekeeping runs six days a week and the in-house kitchen serves South Indian breakfast, lunch and dinner with a rotating weekly menu.`,
  rooms: rooms(s.rent, s.roomTypes, i),
  reviews: buildReviews(i, 4),
  nearby: nearby(s.college),
  rules: RULES,
  owner: {
    name: ["Ramesh Kumar", "Lakshmi Iyer", "Faisal Ahmed", "Vijay Menon"][i % 4]!,
    since: `Host since 20${18 + (i % 6)}`,
    responseTime: "Usually replies within 2 hours",
  },
}));

export const CITIES = ["Coimbatore", "Chennai", "Bangalore", "Hyderabad", "Pune"];

export const TOP_COLLEGES = [
  { name: "PSG College of Technology", city: "Coimbatore" },
  { name: "Anna University", city: "Chennai" },
  { name: "IIT Madras", city: "Chennai" },
  { name: "SRM University", city: "Chennai" },
  { name: "Amrita University", city: "Coimbatore" },
];

export const getPG = (id: string) => PGS.find((p) => p.id === id);

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
