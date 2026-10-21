const LIBRARY = [
  {
    keywords: ['bottle', 'pet', 'water', 'cola', 'plastic-bottle'],
    material: 'PET Plastic (#1)',
    category: 'Plastic',
    recyclable: true,
    reusePotential: 'High — refill, planter, organiser',
    recoveryValue: 8,
    environmentalRisk: 'Medium — marine microplastics if littered',
    pathway: 'Rinse → Smart bin (plastic) → MRF Perungudi → flake → bottle-to-bottle',
    instructions: 'Empty, rinse, keep cap on. Drop at PET collection or schedule a plastic pickup.',
    impact: '1 PET bottle avoids ~82g CO₂ versus virgin resin.',
    confidence: 94,
    weightKg: 0.03,
    color: '#147a56',
  },
  {
    keywords: ['cardboard', 'box', 'carton', 'amazon', 'corrugated'],
    material: 'Corrugated Cardboard',
    category: 'Paper',
    recyclable: true,
    reusePotential: 'High — storage, crafts, packing',
    recoveryValue: 4,
    environmentalRisk: 'Low',
    pathway: 'Flatten → dry storage → paper mill, Ambattur',
    instructions: 'Remove tape and plastic windows. Keep dry. Flatten to save space.',
    impact: '1 kg cardboard saves ~26 litres of water versus virgin pulp.',
    confidence: 91,
    weightKg: 0.4,
    color: '#c4a574',
  },
  {
    keywords: ['can', 'aluminium', 'aluminum', 'coke', 'tin'],
    material: 'Aluminium Can',
    category: 'Metal',
    recyclable: true,
    reusePotential: 'Medium — organisers, lanterns',
    recoveryValue: 22,
    environmentalRisk: 'Low if recycled; high energy if landfilled',
    pathway: 'Rinse → metal stream → Chennai metal recovery → smelter',
    instructions: 'Rinse. Do not crush if your local MRF prefers intact cans.',
    impact: 'Recycling aluminium uses ~95% less energy than mining bauxite.',
    confidence: 96,
    weightKg: 0.015,
    color: '#8a948e',
  },
  {
    keywords: ['glass', 'jar', 'bottle-glass'],
    material: 'Soda-lime Glass',
    category: 'Glass',
    recyclable: true,
    reusePotential: 'Very high — storage, décor',
    recoveryValue: 3,
    environmentalRisk: 'Low chemical, injury risk if broken',
    pathway: 'Rinse → colour-sorted glass → cullet plant, Sriperumbudur',
    instructions: 'Rinse. Remove lids. Do not mix with ceramics or Pyrex.',
    impact: 'Cullet lowers furnace temperature and CO₂ in glass making.',
    confidence: 89,
    weightKg: 0.35,
    color: '#5b8c7a',
  },
  {
    keywords: ['battery', 'aa', 'lithium', 'cell'],
    material: 'Lithium / Alkaline Battery',
    category: 'Batteries',
    recyclable: true,
    reusePotential: 'None — do not reuse damaged cells',
    recoveryValue: 18,
    environmentalRisk: 'Critical — fire, heavy metals, soil leachate',
    pathway: 'Tape terminals → e-waste drop → authorised recycler, Guindy',
    instructions: 'Never bin with household waste. Tape ends. Use battery take-back.',
    impact: 'Keeps lithium, cobalt and acids out of Chennai landfills.',
    confidence: 97,
    weightKg: 0.04,
    color: '#b4533a',
  },
  {
    keywords: ['shirt', 'cloth', 'cotton', 'textile', 'jeans'],
    material: 'Cotton Textile',
    category: 'Clothes',
    recyclable: true,
    reusePotential: 'Very high — donate, upcycle, rags',
    recoveryValue: 12,
    environmentalRisk: 'Medium — microfibres, landfill methane if mixed',
    pathway: 'Wearable → donation match · Damaged → textile recycler, Tiruppur',
    instructions: 'Clean, dry garments go to donations. Torn fabric to textile recycling.',
    impact: 'Extending a garment by 9 months can cut its carbon by ~20%.',
    confidence: 88,
    weightKg: 0.22,
    color: '#3d6b8a',
  },
  {
    keywords: ['phone', 'charger', 'ewaste', 'laptop', 'cable', 'mouse'],
    material: 'Mixed E-waste',
    category: 'E-waste',
    recyclable: true,
    reusePotential: 'Medium — repair first, then harvest parts',
    recoveryValue: 45,
    environmentalRisk: 'High — lead, brominated plastics',
    pathway: 'Repair Hub → if dead, authorised e-waste (CPCB) facility, Ambattur',
    instructions: 'Wipe data. Do not dismantle lithium packs at home.',
    impact: 'Urban mining recovers gold, copper and rare earths with far less land use.',
    confidence: 92,
    weightKg: 0.18,
    color: '#334e68',
  },
  {
    keywords: ['food', 'peel', 'organic', 'banana', 'waste-food'],
    material: 'Organic / Food Waste',
    category: 'Organic',
    recyclable: true,
    reusePotential: 'High — compost, biogas',
    recoveryValue: 2,
    environmentalRisk: 'Medium — methane if mixed in dumpsters',
    pathway: 'Segregate wet waste → campus compost / biomethanation',
    instructions: 'No plastic bags. Drain liquids. Mix with dry leaves if composting.',
    impact: 'Composting 1 kg food waste avoids ~0.5 kg CO₂e versus dump sites.',
    confidence: 85,
    weightKg: 0.4,
    color: '#6b8f3a',
  },
  {
    keywords: ['tetra', 'milk', 'juice-pack'],
    material: 'Tetra Pak (multi-layer)',
    category: 'Paper',
    recyclable: true,
    reusePotential: 'Low',
    recoveryValue: 5,
    environmentalRisk: 'Medium if landfilled — poly-alu layers',
    pathway: 'Rinse, flatten → specialised carton recycling, Chennai',
    instructions: 'Empty and rinse. Flatten. Not with mixed paper if soiled.',
    impact: 'Fibre can become chipboard; poly-alu recovered in specialised mills.',
    confidence: 84,
    weightKg: 0.04,
    color: '#d4a017',
  },
  {
    keywords: ['styrofoam', 'thermocol', 'foam'],
    material: 'Expanded Polystyrene (Thermocol)',
    category: 'Plastic',
    recyclable: false,
    reusePotential: 'Low — packing filler only',
    recoveryValue: 1,
    environmentalRisk: 'High — persistent, breaks into beads',
    pathway: 'Avoid. If unavoidable, take to EPS densifier (limited Chennai sites)',
    instructions: 'Do not mix with PET. Prefer reuse as packing. Reduce at source.',
    impact: 'Prevention beats recycling here — switch to paper or moulded pulp.',
    confidence: 90,
    weightKg: 0.05,
    color: '#9a3412',
  },
]

const DEMO_KEYS = ['bottle', 'cardboard', 'can', 'glass', 'battery', 'shirt', 'charger', 'food', 'tetra', 'styrofoam']

export const DEMO_SCANS = [
  { id: 'pet-bottle', label: 'PET water bottle', key: 'bottle' },
  { id: 'cardboard-box', label: 'Shipping carton', key: 'cardboard' },
  { id: 'alu-can', label: 'Aluminium can', key: 'can' },
  { id: 'glass-jar', label: 'Glass pickle jar', key: 'glass' },
  { id: 'aa-battery', label: 'Lithium cell', key: 'battery' },
  { id: 'cotton-tee', label: 'Cotton t-shirt', key: 'shirt' },
  { id: 'usb-charger', label: 'Phone charger', key: 'charger' },
  { id: 'food-scraps', label: 'Canteen leftovers', key: 'food' },
]

export function matchWaste(input = '') {
  const q = input.toLowerCase()
  const hit = LIBRARY.find((item) => item.keywords.some((k) => q.includes(k)))
  if (hit) return { ...hit }
  const fallback = LIBRARY[Math.abs(hash(q)) % LIBRARY.length]
  return { ...fallback, confidence: Math.max(72, fallback.confidence - 12) }
}

export function analyzeFile(file) {
  const name = file?.name || DEMO_KEYS[Math.floor(Math.random() * DEMO_KEYS.length)]
  const result = matchWaste(name)
  const jitter = Math.round((Math.random() - 0.5) * 6)
  return {
    ...result,
    confidence: clampConf(result.confidence + jitter),
    sourceName: name,
  }
}

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i += 1) h = (h << 5) - h + str.charCodeAt(i)
  return h
}

function clampConf(n) {
  return Math.min(99, Math.max(68, n))
}

export const BOT_KB = [
  {
    q: ['recycle this', 'can i recycle', 'recyclable'],
    a: 'In Chennai, clean PET, HDPE, paper, cardboard, metals and glass are widely recyclable. Batteries and e-waste need authorised drop-off. Thermocol and multilayer sachets have limited streams — reduce first. Scan with RecycVision for a material-specific pathway.',
  },
  {
    q: ['battery', 'batteries'],
    a: 'Never put batteries in household bins. Tape the terminals, store dry, and drop at an e-waste point (Guindy / authorised CPCB recycler) or schedule a RecycLink batteries pickup. Lithium cells can ignite in compactors.',
  },
  {
    q: ['cardboard', 'carton', 'box'],
    a: 'Flatten dry cardboard, peel off plastic tape where possible, and keep it out of rain. You can upcycle cartons into organisers or list surplus on Material Exchange. Wet or greasy pizza boxes go to compost if food-soiled, not paper recycling.',
  },
  {
    q: ['ewaste', 'e-waste', 'phone', 'charger', 'laptop'],
    a: 'Try Repair Hub first — many chargers and laptops fail at cables or batteries. If unrepairable, use an authorised e-waste facility. RecycLink can generate a Waste Passport so the device is tracked to urban mining, not a scrap fire.',
  },
  {
    q: ['clothes', 'donate', 'textile'],
    a: 'Wearable clothes should go to Donation Matching (NGOs around OMR and Adyar). Damaged cotton can be upcycled or sent to textile recyclers. Avoid dumping mixed fabric in wet waste.',
  },
  {
    q: ['plastic bag', 'carry bag'],
    a: 'Thin carry bags jam MRF screens. Reuse, then take cleaner LDPE to a plastic drop if available. Tamil Nadu restricts many single-use plastics — switch to a durable tote and earn RecycPoints for reuse actions.',
  },
  {
    q: ['food', 'wet waste', 'compost'],
    a: 'Keep wet waste separate. Campus and apartment biomethanation / compost is the right path in Chennai. No plastic liners. Mixing wet waste with recyclables collapses recovery value.',
  },
  {
    q: ['points', 'rewards', 'recycpoints'],
    a: 'You earn RecycPoints for scans, correct segregation, pickups, reports, challenges and the sorting game. Redeem in Rewards for plant kits, metro coupons and reusables. Points also lift your Circularity Score.',
  },
  {
    q: ['passport', 'track'],
    a: 'A Waste Passport is a unique ID that follows material from you → collection → sorting → recycling → final product. Schedule a pickup after a scan to mint one automatically.',
  },
  {
    q: ['omr', 'chennai', 'vit'],
    a: 'RecycLink’s demo network covers VIT Chennai, Kelambakkam, Navalur, Sholinganallur, Perungudi and Siruseri. Smart bins, facilities and collectors are simulated around OMR for this prototype.',
  },
]

export function recyReply(message) {
  const m = message.toLowerCase()
  const hit = BOT_KB.find((row) => row.q.some((k) => m.includes(k)))
  if (hit) return hit.a
  return 'I am RecyBot, RecycLink’s circularity assistant. Ask me about recycling a material, batteries, cardboard, e-waste, pickups, passports or RecycPoints. For a precise ID, use RecycVision — I’ll read the Waste DNA from there.'
}
