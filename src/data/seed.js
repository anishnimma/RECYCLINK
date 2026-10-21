const daysAgo = (n, hours = 10) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(hours, 20, 0, 0)
  return d.toISOString()
}

export const ACCOUNTS = [
  {
    id: 'u-anish',
    name: 'Nimma Anishvaraya Sai Ganesh',
    short: 'Anish',
    email: 'anish@vitstudent.ac.in',
    password: 'demo',
    role: 'citizen',
    college: 'VIT Chennai',
    className: '24BCE — Batch 2024',
    reg: '24BCE5177',
    location: 'VIT Chennai, Kelambakkam',
    streak: 9,
  },
  {
    id: 'u-soham',
    name: 'Boina Soham',
    short: 'Soham',
    email: 'soham@vitstudent.ac.in',
    password: 'demo',
    role: 'citizen',
    college: 'VIT Chennai',
    className: '24BCE — Batch 2024',
    reg: '24BCE5180',
    location: 'VIT Chennai, Kelambakkam',
    streak: 7,
  },
  {
    id: 'u-collector',
    name: 'Karthik Collector',
    short: 'Karthik',
    email: 'collector@recyclink.in',
    password: 'demo',
    role: 'collector',
    college: 'RecycLink Fleet',
    className: 'OMR Route 04',
    reg: 'COL-044',
    location: 'Sholinganallur hub',
    streak: 21,
  },
  {
    id: 'u-recycler',
    name: 'Meena Recycler',
    short: 'Meena',
    email: 'recycler@recyclink.in',
    password: 'demo',
    role: 'recycler',
    college: 'Perungudi MRF',
    className: 'Sorting Line B',
    reg: 'RCY-012',
    location: 'Perungudi Industrial Estate',
    streak: 30,
  },
  {
    id: 'u-admin',
    name: 'RecycLink Admin',
    short: 'Admin',
    email: 'admin@recyclink.in',
    password: 'demo',
    role: 'admin',
    college: 'RecycLink HQ',
    className: 'Operations',
    reg: 'ADM-001',
    location: 'Tidel Park, Taramani',
    streak: 40,
  },
]

export const LEADERBOARD_PEOPLE = [
  { id: 'u-anish', name: 'Nimma Anishvaraya', className: '24BCE', college: 'VIT Chennai', points: 1840, score: 86 },
  { id: 'u-soham', name: 'Boina Soham', className: '24BCE', college: 'VIT Chennai', points: 1760, score: 84 },
  { id: 'p3', name: 'Aishwarya R.', className: '24BCE', college: 'VIT Chennai', points: 1620, score: 81 },
  { id: 'p4', name: 'Rahul Menon', className: '24BME', college: 'VIT Chennai', points: 1510, score: 78 },
  { id: 'p5', name: 'Diya Krishnan', className: '24BCE', college: 'SSN', points: 1440, score: 76 },
  { id: 'p6', name: 'Vikram Patel', className: '24BEE', college: 'VIT Chennai', points: 1310, score: 74 },
  { id: 'p7', name: 'Hafsa Banu', className: '24BCE', college: 'VIT Chennai', points: 1180, score: 71 },
  { id: 'p8', name: 'Arjun Iyer', className: '23BCE', college: 'VIT Chennai', points: 1090, score: 69 },
]

export const CLASS_BOARD = [
  { name: '24BCE', college: 'VIT Chennai', points: 12840, diverted: 412 },
  { name: '24BME', college: 'VIT Chennai', points: 10110, diverted: 338 },
  { name: '23BCE', college: 'VIT Chennai', points: 9740, diverted: 301 },
  { name: '24BEE', college: 'VIT Chennai', points: 8120, diverted: 266 },
]

export const COLLEGE_BOARD = [
  { name: 'VIT Chennai', points: 48210, diverted: 1620 },
  { name: 'SSN College of Engineering', points: 39100, diverted: 1412 },
  { name: 'SRM Kattankulathur', points: 35440, diverted: 1288 },
  { name: 'Anna University CEG', points: 30120, diverted: 1104 },
]

export const seedScans = () => [
  {
    id: 'DNA-7K2A',
    createdAt: daysAgo(6, 9),
    material: 'PET Plastic (#1)',
    category: 'Plastic',
    recyclable: true,
    reusePotential: 'High — refill, planter, organiser',
    recoveryValue: 8,
    environmentalRisk: 'Medium — marine microplastics if littered',
    pathway: 'Rinse → Smart bin (plastic) → MRF Perungudi → flake → bottle-to-bottle',
    instructions: 'Empty, rinse, keep cap on.',
    impact: '1 PET bottle avoids ~82g CO₂ versus virgin resin.',
    confidence: 94,
    weightKg: 0.4,
    location: 'VIT Chennai — AB1 plaza',
    imageLabel: 'PET water bottle',
  },
  {
    id: 'DNA-9Q1C',
    createdAt: daysAgo(3, 16),
    material: 'Lithium / Alkaline Battery',
    category: 'Batteries',
    recyclable: true,
    reusePotential: 'None — do not reuse damaged cells',
    recoveryValue: 18,
    environmentalRisk: 'Critical — fire, heavy metals',
    pathway: 'Tape terminals → e-waste drop → authorised recycler, Guindy',
    instructions: 'Never bin with household waste.',
    impact: 'Keeps lithium and acids out of landfills.',
    confidence: 97,
    weightKg: 0.08,
    location: 'Hostels — MH-1',
    imageLabel: 'Used 18650 cell',
  },
  {
    id: 'DNA-3M8F',
    createdAt: daysAgo(1, 11),
    material: 'Corrugated Cardboard',
    category: 'Paper',
    recyclable: true,
    reusePotential: 'High — storage, crafts',
    recoveryValue: 4,
    environmentalRisk: 'Low',
    pathway: 'Flatten → dry storage → paper mill, Ambattur',
    instructions: 'Remove tape. Keep dry.',
    impact: 'Saves water versus virgin pulp.',
    confidence: 91,
    weightKg: 1.2,
    location: 'Amazon locker, Navalur',
    imageLabel: 'Shipping carton',
  },
]

export const seedPickups = () => [
  {
    id: 'PK-4412',
    createdAt: daysAgo(5, 8),
    category: 'Plastic',
    weightKg: 4.2,
    address: 'MH-1, VIT Chennai, Kelambakkam',
    slot: 'Tomorrow, 4:00–6:00 PM',
    notes: 'Bagged PET and HDPE. Caps on.',
    status: 'Recycled',
    assignee: 'Karthik Collector',
    dnaIds: ['DNA-7K2A'],
    passportId: 'WP-CHN-4412',
  },
  {
    id: 'PK-4501',
    createdAt: daysAgo(1, 14),
    category: 'E-waste',
    weightKg: 1.1,
    address: 'AB2 lobby, VIT Chennai',
    slot: 'Today, 5:00–7:00 PM',
    notes: 'Chargers and one dead power bank.',
    status: 'Assigned',
    assignee: 'Karthik Collector',
    dnaIds: [],
    passportId: 'WP-CHN-4501',
  },
  {
    id: 'PK-4520',
    createdAt: daysAgo(0, 9),
    category: 'Paper',
    weightKg: 3.4,
    address: 'Faculty housing, OMR',
    slot: 'Fri, 10:00–12:00 AM',
    notes: 'Flattened cartons.',
    status: 'Requested',
    assignee: null,
    dnaIds: ['DNA-3M8F'],
    passportId: 'WP-CHN-4520',
  },
]

export const seedPassports = () => [
  {
    id: 'WP-CHN-4412',
    pickupId: 'PK-4412',
    material: 'PET Plastic (#1)',
    category: 'Plastic',
    originUser: 'Nimma Anishvaraya Sai Ganesh',
    originPlace: 'VIT Chennai',
    createdAt: daysAgo(5, 8),
    currentStage: 'Final Product',
    stages: [
      { name: 'User', at: daysAgo(6, 9), note: 'Scanned via RecycVision · DNA-7K2A', done: true },
      { name: 'Collection', at: daysAgo(5, 17), note: 'Collected by Karthik · OMR Route 04', done: true },
      { name: 'Sorting', at: daysAgo(4, 11), note: 'Perungudi MRF · PET near-infrared sort', done: true },
      { name: 'Recycling', at: daysAgo(3, 15), note: 'Washed, flaked, pelletised', done: true },
      { name: 'Final Product', at: daysAgo(1, 12), note: 'rPET pellets → bottle-grade resin, Sriperumbudur', done: true },
    ],
    finalProduct: 'rPET bottle-grade resin',
  },
  {
    id: 'WP-CHN-4501',
    pickupId: 'PK-4501',
    material: 'Mixed E-waste',
    category: 'E-waste',
    originUser: 'Nimma Anishvaraya Sai Ganesh',
    originPlace: 'VIT Chennai AB2',
    createdAt: daysAgo(1, 14),
    currentStage: 'Collection',
    stages: [
      { name: 'User', at: daysAgo(1, 14), note: 'Pickup requested', done: true },
      { name: 'Collection', at: null, note: 'Assigned to Karthik Collector', done: false },
      { name: 'Sorting', at: null, note: 'Awaiting Guindy e-waste line', done: false },
      { name: 'Recycling', at: null, note: 'Urban mining — copper, gold, plastics', done: false },
      { name: 'Final Product', at: null, note: 'Recovered metals / refurbished parts', done: false },
    ],
    finalProduct: null,
  },
  {
    id: 'WP-CHN-4520',
    pickupId: 'PK-4520',
    material: 'Corrugated Cardboard',
    category: 'Paper',
    originUser: 'Nimma Anishvaraya Sai Ganesh',
    originPlace: 'Faculty housing, OMR',
    createdAt: daysAgo(0, 9),
    currentStage: 'User',
    stages: [
      { name: 'User', at: daysAgo(0, 9), note: 'Linked to DNA-3M8F', done: true },
      { name: 'Collection', at: null, note: 'Awaiting collector assignment', done: false },
      { name: 'Sorting', at: null, note: 'Paper stream', done: false },
      { name: 'Recycling', at: null, note: 'Ambattur mill', done: false },
      { name: 'Final Product', at: null, note: 'Recycled kraft liner', done: false },
    ],
    finalProduct: null,
  },
]

export const seedTransactions = () => [
  { id: 'TX-1008', at: daysAgo(7, 9), type: 'earn', label: 'Campus pilot award', points: 100 },
  { id: 'TX-1001', at: daysAgo(6, 9), type: 'earn', label: 'RecycVision scan · PET', points: 40 },
  { id: 'TX-1002', at: daysAgo(5, 17), type: 'earn', label: 'Pickup collected · Plastic', points: 80 },
  { id: 'TX-1003', at: daysAgo(4, 11), type: 'earn', label: 'Passport reached Sorting', points: 30 },
  { id: 'TX-1004', at: daysAgo(3, 16), type: 'earn', label: 'Hazardous battery scan', points: 60 },
  { id: 'TX-1005', at: daysAgo(2, 18), type: 'redeem', label: 'Neem sapling kit', points: -400 },
  { id: 'TX-1006', at: daysAgo(1, 11), type: 'earn', label: 'Cardboard DNA profile', points: 35 },
  { id: 'TX-1007', at: daysAgo(1, 12), type: 'earn', label: 'Closed loop · rPET resin', points: 120 },
]

export const REWARDS = [
  { id: 'rw-1', name: 'Neem sapling kit', cost: 400, type: 'Plant kit', stock: 18, blurb: 'Two saplings with soil discs — hostel balcony friendly.' },
  { id: 'rw-2', name: 'Stainless bottle 750ml', cost: 700, type: 'Reusable', stock: 9, blurb: 'Replaces ~200 PET bottles a year on OMR commutes.' },
  { id: 'rw-3', name: 'Chennai Metro day pass', cost: 250, type: 'Coupon', stock: 40, blurb: 'Partner coupon for low-carbon travel.' },
  { id: 'rw-4', name: 'Organic cotton tote', cost: 320, type: 'Reusable', stock: 22, blurb: 'Heavy-duty market bag. No more carry bags.' },
  { id: 'rw-5', name: 'Compost starter pack', cost: 450, type: 'Plant kit', stock: 14, blurb: 'Bokashi bran + bin liner alternatives for wet waste.' },
  { id: 'rw-6', name: 'Café Earth 15% off', cost: 180, type: 'Coupon', stock: 50, blurb: 'Partner café in ECR — bring your own cup for extra off.' },
]

export const BINS = [
  { id: 'BIN-VIT-01', place: 'AB1 plaza', area: 'VIT Chennai', type: 'Plastic', fill: 78, status: 'Scheduled', etaFull: '6 hours', lat: 28, lng: 42 },
  { id: 'BIN-VIT-02', place: 'MH-1 courtyard', area: 'VIT Chennai', type: 'Mixed recyclable', fill: 41, status: 'Healthy', etaFull: '2 days', lat: 46, lng: 38 },
  { id: 'BIN-VIT-03', place: 'Food court', area: 'VIT Chennai', type: 'Organic', fill: 91, status: 'Urgent', etaFull: '40 minutes', lat: 34, lng: 58 },
  { id: 'BIN-OMR-11', place: 'Navalur bus stop', area: 'OMR', type: 'Paper', fill: 55, status: 'Watch', etaFull: '18 hours', lat: 62, lng: 48 },
  { id: 'BIN-OMR-18', place: 'Sholinganallur signal', area: 'OMR', type: 'Plastic', fill: 67, status: 'Scheduled', etaFull: '11 hours', lat: 58, lng: 70 },
  { id: 'BIN-PGD-04', place: 'Perungudi MRF inbound', area: 'Perungudi', type: 'Metal', fill: 22, status: 'Healthy', etaFull: '4 days', lat: 72, lng: 62 },
  { id: 'BIN-SIR-02', place: 'Siruseri SIPCOT', area: 'Siruseri', type: 'E-waste', fill: 33, status: 'Healthy', etaFull: '3 days', lat: 80, lng: 36 },
  { id: 'BIN-ADR-07', place: 'Adyar depot', area: 'Adyar', type: 'Glass', fill: 84, status: 'Urgent', etaFull: '3 hours', lat: 22, lng: 78 },
]

export const FACILITIES = [
  { id: 'f1', name: 'Perungudi MRF', kind: 'Material recovery', accepts: ['Plastic', 'Paper', 'Metal', 'Glass'], hours: '6:00–22:00', distance: '9.4 km', lat: 68, lng: 58 },
  { id: 'f2', name: 'Guindy e-waste (authorised)', kind: 'E-waste / batteries', accepts: ['E-waste', 'Batteries'], hours: '9:00–18:00', distance: '22 km', lat: 30, lng: 72 },
  { id: 'f3', name: 'Ambattur paper mill partner', kind: 'Fibre recycling', accepts: ['Paper', 'Cardboard'], hours: '8:00–17:00', distance: '34 km', lat: 18, lng: 40 },
  { id: 'f4', name: 'Sriperumbudur rPET line', kind: 'Bottle-to-bottle', accepts: ['PET'], hours: '24×7', distance: '41 km', lat: 44, lng: 22 },
  { id: 'f5', name: 'VIT Chennai Eco Hub', kind: 'Campus aggregation', accepts: ['Plastic', 'Paper', 'Clothes', 'Organic'], hours: '7:00–21:00', distance: '0.3 km', lat: 40, lng: 40 },
  { id: 'f6', name: 'Tiruppur textile offtake', kind: 'Textile recycler', accepts: ['Clothes'], hours: 'By appointment', distance: 'pickup routed', lat: 86, lng: 28 },
]

export const CHALLENGES = [
  { id: 'ch-1', title: 'Plastic-free hostel week', scope: 'VIT Chennai · MH blocks', ends: '26 Oct 2026', reward: 250, joined: true, progress: 62, goal: 'No single-use PET on campus retail' },
  { id: 'ch-2', title: 'Battery take-back', scope: 'OMR colleges', ends: '2 Nov 2026', reward: 180, joined: false, progress: 28, goal: 'Collect 500 cells via authorised stream' },
  { id: 'ch-3', title: 'Monsoon dry-recyclables', scope: '24BCE', ends: '30 Oct 2026', reward: 120, joined: true, progress: 74, goal: 'Keep paper dry; 1 tonne cardboard' },
  { id: 'ch-4', title: 'Repair before replace', scope: 'City-wide', ends: '15 Nov 2026', reward: 200, joined: false, progress: 41, goal: 'Log 200 successful repairs' },
]

export const BADGES = [
  { id: 'b1', name: 'First Scan', earned: true, hint: 'Run RecycVision once' },
  { id: 'b2', name: 'Loop Closer', earned: true, hint: 'A passport reached Final Product' },
  { id: 'b3', name: 'Hazard Hero', earned: true, hint: 'Correctly divert batteries / e-waste' },
  { id: 'b4', name: 'Streak 7', earned: true, hint: 'Seven-day recycling streak' },
  { id: 'b5', name: 'Community Pulse', earned: false, hint: 'File and resolve a waste report' },
  { id: 'b6', name: 'Market Maker', earned: false, hint: 'Complete a RecycMarket exchange' },
  { id: 'b7', name: 'Sorter 90', earned: false, hint: 'Score 90%+ in the segregation game' },
  { id: 'b8', name: 'Campus Top 3', earned: true, hint: 'Land on the VIT leaderboard' },
]

export const seedReports = () => [
  {
    id: 'RP-2201',
    createdAt: daysAgo(2, 19),
    type: 'Overflowing bin',
    place: 'Navalur bus stop',
    description: 'Plastic stream overflowing onto the pavement after weekend market.',
    status: 'In Progress',
    imageLabel: 'Overflowing smart bin',
  },
  {
    id: 'RP-2188',
    createdAt: daysAgo(8, 7),
    type: 'Illegal dumping',
    place: 'Service road, Kelambakkam',
    description: 'Construction debris mixed with household bags.',
    status: 'Resolved',
    imageLabel: 'Dumped debris',
  },
]

export const seedListings = () => [
  { id: 'MK-01', title: 'Study lamp — works', kind: 'Sell', category: 'E-waste', price: 450, place: 'VIT Chennai', blurb: 'LED desk lamp, slight scratch.', owner: 'Aishwarya R.' },
  { id: 'MK-02', title: 'Lab coats × 2', kind: 'Donate', category: 'Clothes', price: 0, place: 'Kelambakkam', blurb: 'Washed, size M/L.', owner: 'Boina Soham' },
  { id: 'MK-03', title: 'Glass jars (6)', kind: 'Exchange', category: 'Glass', price: 0, place: 'Navalur', blurb: 'Looking for mason lids or herbs.', owner: 'Diya Krishnan' },
  { id: 'MK-04', title: 'Unused A4 reams (partial)', kind: 'Sell', category: 'Paper', price: 120, place: 'Siruseri', blurb: 'About 180 sheets leftover.', owner: 'Rahul Menon' },
]

export const seedDonations = () => [
  { id: 'DN-01', item: 'Winter jackets × 4', ngo: 'Bhumi Chennai', status: 'Matched', createdAt: daysAgo(4, 12) },
  { id: 'DN-02', item: 'School bags × 6', ngo: 'Aid India — OMR', status: 'Picked', createdAt: daysAgo(12, 10) },
]

export const seedMaterials = () => [
  { id: 'MX-01', material: 'Clear PET bales', qty: '1.2 T', side: 'Offer', party: 'VIT Eco Hub', price: '₹18/kg' },
  { id: 'MX-02', material: 'OCC cardboard', qty: '800 kg', side: 'Want', party: 'Ambattur mill partner', price: '₹6/kg' },
  { id: 'MX-03', material: 'Aluminium UBC', qty: '90 kg', side: 'Offer', party: 'Hostel aggregation', price: '₹95/kg' },
]

export const NGOS = [
  { name: 'Bhumi Chennai', need: 'Clothes, stationery', area: 'Sholinganallur' },
  { name: 'Aid India', need: 'Bags, books', area: 'OMR' },
  { name: 'The Banyan', need: 'Usable household', area: 'Chennai' },
  { name: 'Udavum Karangal', need: 'Clothes, groceries packaging-free', area: 'Thoraipakkam' },
]

export const KNOWLEDGE = [
  { id: 'k1', title: 'How Chennai MRFs actually sort', tag: 'System', read: '8 min' },
  { id: 'k2', title: 'PET vs HDPE vs multilayer sachets', tag: 'Materials', read: '6 min' },
  { id: 'k3', title: 'Battery fires in compactors', tag: 'Safety', read: '5 min' },
  { id: 'k4', title: 'Extended producer responsibility in India', tag: 'Policy', read: '10 min' },
  { id: 'k5', title: 'Hostel composting without pests', tag: 'Organic', read: '7 min' },
  { id: 'k6', title: 'Reading a Waste Passport', tag: 'Product', read: '4 min' },
]

export const UPCYCLE_IDEAS = {
  Plastic: ['Self-watering planter from PET', 'Cable organiser from bottle bases', 'Vertical herb wall for hostel windows'],
  Paper: ['Document trays from cartons', 'Desk organiser honeycomb', 'Seedling pots from egg cartons'],
  Glass: ['Pantry jars with chalkboard labels', 'Terrarium from pickle bottles', 'Oil lamp from amber glass'],
  Clothes: ['Tote from worn tees', 'Cleaning cloths from cotton', 'Patchwork laptop sleeve'],
  Metal: ['Lantern from cans', 'Desk caddy', 'Wind chime from bottle caps'],
  'E-waste': ['Board-art from dead PCBs (no soldering)', 'Cable loops as plant ties'],
}

export const REPAIR_GUIDES = [
  { item: 'Phone charger', issue: 'Cable fray', fix: 'Strain-relief with heat-shrink; if conductors exposed, replace — fire risk.', difficulty: 'Easy' },
  { item: 'Headphones', issue: 'One-side audio', fix: 'Reseat jack; check solder at strain point; else RecycMarket parts.', difficulty: 'Medium' },
  { item: 'Study chair', issue: 'Loose base', fix: 'Retorque bolts; nylon lock nut from hardware on OMR.', difficulty: 'Easy' },
  { item: 'Power bank', issue: 'Won’t hold charge', fix: 'Do not open lithium pack. Authorised e-waste if swollen.', difficulty: 'Do not DIY' },
  { item: 'Backpack zip', issue: 'Slider stuck', fix: 'Graphite from a pencil; replace slider before discarding bag.', difficulty: 'Easy' },
]

export const GAME_ITEMS = [
  { id: 'g1', name: 'PET bottle', bin: 'Plastic' },
  { id: 'g2', name: 'Banana peel', bin: 'Organic' },
  { id: 'g3', name: 'Newspaper', bin: 'Paper' },
  { id: 'g4', name: 'AA battery', bin: 'Hazard' },
  { id: 'g5', name: 'Glass jar', bin: 'Glass' },
  { id: 'g6', name: 'Chip sachet', bin: 'Reject' },
  { id: 'g7', name: 'Aluminium can', bin: 'Metal' },
  { id: 'g8', name: 'Phone charger', bin: 'Hazard' },
  { id: 'g9', name: 'Pizza box (greasy)', bin: 'Organic' },
  { id: 'g10', name: 'Clean cardboard', bin: 'Paper' },
  { id: 'g11', name: 'Thermocol', bin: 'Reject' },
  { id: 'g12', name: 'Cotton shirt', bin: 'Clothes' },
]

export const BINS_GAME = ['Plastic', 'Paper', 'Glass', 'Metal', 'Organic', 'Clothes', 'Hazard', 'Reject']

export const IMPACT_TREND = [
  { month: 'May', diverted: 18, co2: 24 },
  { month: 'Jun', diverted: 22, co2: 31 },
  { month: 'Jul', diverted: 29, co2: 40 },
  { month: 'Aug', diverted: 34, co2: 48 },
  { month: 'Sep', diverted: 41, co2: 58 },
  { month: 'Oct', diverted: 52, co2: 71 },
]

export const CATEGORY_MIX = [
  { name: 'Plastic', value: 32 },
  { name: 'Paper', value: 24 },
  { name: 'Organic', value: 18 },
  { name: 'E-waste', value: 9 },
  { name: 'Metal', value: 8 },
  { name: 'Glass', value: 5 },
  { name: 'Clothes', value: 4 },
]
