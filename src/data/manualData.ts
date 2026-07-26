import {
  CulinaryTechnique,
  RatioItem,
  DonenessItem,
  OilSmokePoint,
  SubstitutionItem,
  CookingManual,
} from '../types';

export const TECHNIQUES_DATA: CulinaryTechnique[] = [
  {
    id: 'maillard-searing',
    title: 'High-Heat Searing & The Maillard Reaction',
    category: 'Heat & Searing',
    shortDesc: 'Creating deep mahogany crusts and complex savory flavors through controlled protein surface dehydration.',
    scienceExplanation:
      'The Maillard reaction occurs between amino acids and reducing sugars at temperatures above 285°F (140°C) up to 330°F (165°C). Surface moisture inhibits this reaction because boiling water caps surface temperature at 212°F (100°C). Thoroughly drying meat and preheating heavy cast iron or stainless steel is mandatory.',
    stepByStep: [
      'Pat meat surface completely dry with paper towels. Uncovered fridge drying for 12-24 hours yields the ultimate crust.',
      'Heat a heavy cast iron or stainless steel pan until oil shimmer or faint smoke appears (approx. 425°F / 220°C).',
      'Season heavily with coarse kosher salt immediately before placing in the pan.',
      'Lay meat away from you to prevent hot fat splatters.',
      'Press firmly for initial 15 seconds to ensure maximum pan contact.',
      'Baste with foamy butter, garlic, and thyme during final minute of cooking.',
      'Rest on a wire rack for 5-10 minutes to allow muscle fibers to relax and reabsorb juices.'
    ],
    keyEquipment: ['Cast Iron Skillet', 'Instant-Read Digital Thermometer', 'Wire Cooling Rack', 'Fish Spatula'],
    idealTemperatures: 'Pan temp: 425°F - 450°F (218°C - 232°C). High smoke point oil required.',
    commonMistakes: [
      'Searing wet or cold meat directly from the fridge.',
      'Overcrowding the pan, causing steam accumulation instead of searing.',
      'Flipping prematurely before the crust releases naturally from the metal.'
    ],
    proTips: [
      'Dry-brining with salt 24h prior in the fridge draws moisture out and draws salt deep inside, leaving the exterior bone-dry.',
      'Add butter only near the end; butter solids burn at 302°F if added at the start.'
    ],
    difficulty: 'Intermediate',
    tags: ['Searing', 'Steak', 'Cast Iron', 'Maillard', 'Proteins']
  },
  {
    id: 'permanent-emulsification',
    title: 'Stable Emulsification (Mayonnaise & Hollandaise)',
    category: 'Emulsifications',
    shortDesc: 'Binding water-based acid with lipid oils into a smooth, thick suspension using lecithin & shear force.',
    scienceExplanation:
      'Oil and water do not naturally combine. Lecithin in egg yolk acts as an amphiphilic surfactant, binding oil droplets in a continuous water layer. Slowly introducing oil while vigorously whisking breaks oil into micro-droplets surrounded by lecithin.',
    stepByStep: [
      'Whisk egg yolk, a pinch of salt, and acid (lemon juice or vinegar) in a round-bottom bowl until pale and thick.',
      'Begin dripping oil literally drop by drop while whisking constantly with high shear force.',
      'Once a thick emulsion forms, slowly pour oil in a thin, continuous stream while whisking.',
      'If emulsion gets too stiff, whisk in a few drops of warm water to loosen before adding remaining oil.',
      'Season with salt and pepper to taste at the very end.'
    ],
    keyEquipment: ['Whisk', 'Damp Towel (to hold bowl stable)', 'Immersion Blender (for fast emulsification)'],
    idealTemperatures: 'Cold oil for Mayonnaise; Warm melted butter (130°F/55°C) for Hollandaise.',
    commonMistakes: [
      'Pouring oil too quickly at the start before the initial emulsion matrix forms.',
      'Using cold butter for Hollandaise which prevents yolk lecithin from expanding.'
    ],
    proTips: [
      'Fixing a split sauce: Place 1 tsp warm water in a clean bowl, then slowly whisk the broken sauce into it drop by drop.'
    ],
    difficulty: 'Intermediate',
    tags: ['Sauces', 'Emulsions', 'Mayonnaise', 'Hollandaise', 'Science']
  },
  {
    id: 'pan-deglazing',
    title: 'Deglazing & Building Pan Sauces',
    category: 'Flavor Building',
    shortDesc: 'Dissolving caramelized fond (browned food bits) with acidic liquid to create rich, glossy pan reductions.',
    scienceExplanation:
      'The brown residue left in the pan after searing ("fond") is concentrated caramelized protein and sugar. Alcohol, stock, or acid dissolves these flavor compounds, which are then bound into a glossy sauce with cold butter (monter au beurre).',
    stepByStep: [
      'After searing meat, pour off excess fat leaving about 1 tbsp in the pan.',
      'Add aromatics (minced shallots, garlic) and saute on medium heat for 60 seconds until fragrant.',
      'Pour in liquid (wine, dry vermouth, citrus juice, or stock) while scraping the pan bottom with a wooden spoon.',
      'Simmer rapidly until liquid reduces by half (reduce to a syrupy consistency / nappe).',
      'Remove pan from heat completely.',
      'Whisk in small cubes of ice-cold butter one at a time to form a glossy, velvety emulsion.'
    ],
    keyEquipment: ['Stainless Steel Pan', 'Wooden Spoon', 'Whisk'],
    idealTemperatures: 'High heat for deglazing; Off-heat (below 180°F/82°C) for mounting cold butter.',
    commonMistakes: [
      'Boiling sauce after adding cold butter, which breaks the fat emulsion.',
      'Using non-stick pans which produce very little fond.'
    ],
    proTips: [
      'Always use ice-cold butter cubes when mounting off-heat for a mirror-like sheen.'
    ],
    difficulty: 'Beginner',
    tags: ['Pan Sauce', 'Deglazing', 'Fond', 'Wine Reduction', 'Butter']
  },
  {
    id: 'knife-grip-and-dice',
    title: 'Pinch Grip & Precision Knife Cuts',
    category: 'Knife Skills',
    shortDesc: 'Mastering safety, control, and uniform blade geometry for consistent cooking rates.',
    scienceExplanation:
      'Uniform vegetable dimensions ensure equal surface-area-to-volume ratios, allowing ingredients to cook evenly without burning smaller pieces or leaving larger pieces raw.',
    stepByStep: [
      'Pinch the heel of the blade between thumb and index finger; wrap remaining three fingers around the handle.',
      'Form the "claw" with your off-hand, curling fingertips inward with knuckles resting against the flat of the blade.',
      'Square off round vegetables by slicing a thin strip off one side to create a stable, non-rolling base.',
      'Slice into uniform planks, then julienne sticks, and finally cross-cut into precise small dice (brunoise or macédoine).'
    ],
    keyEquipment: ['8-inch Chef knife', 'End-grain Wood or Rubber Cutting Board', 'Honing Steel'],
    commonMistakes: [
      'Holding the handle like a hammer with index finger extended along the spine.',
      'Using a dull blade which requires excessive downward pressure and causes slipping.'
    ],
    proTips: [
      'Place a damp paper towel under your cutting board to eliminate all board movement.'
    ],
    difficulty: 'Beginner',
    tags: ['Knife Skills', 'Prep', 'Brunoise', 'Julienne', 'Safety']
  },
  {
    id: 'blanching-shocking',
    title: 'Blanching & Ice Shocking Vegetables',
    category: 'Moist-Heat',
    shortDesc: 'Locking in vibrant chlorophyll color, crisp texture, and setting enzyme activity in green vegetables.',
    scienceExplanation:
      'Boiling rapidly sets chlorophyll and softens cellular pectin. Immediately transferring vegetables to ice water halts cooking instantly, stopping enzymes (polyphenol oxidase) from dulling the vibrant green to olive drab.',
    stepByStep: [
      'Bring a large pot of water to a rolling boil and salt heavily (water should taste like sea water).',
      'Prepare an ice bath with 50% ice cubes and 50% cold water in a large bowl.',
      'Submerge vegetables in boiling water in small batches for 1 to 3 minutes until tender-crisp.',
      'Using a spider strainer, quickly transfer vegetables straight into the ice bath.',
      'Let submerge for 2-3 minutes until completely cold, then drain thoroughly on paper towels.'
    ],
    keyEquipment: ['Large Stockpot', 'Spider Strainer', 'Ice Bath Bowl'],
    idealTemperatures: 'Boiling 212°F (100°C) -> Ice Bath 32°F (0°C).',
    commonMistakes: [
      'Crowding the pot, dropping the water temperature below boiling.',
      'Leaving vegetables in ice water too long, making them waterlogged.'
    ],
    proTips: [
      'Always dry thoroughly after ice shocking before sautéing or dressing to prevent soggy salads.'
    ],
    difficulty: 'Beginner',
    tags: ['Blanching', 'Vegetables', 'Ice Bath', 'Prep', 'Color']
  },
  {
    id: 'pasta-emulsification',
    title: 'Starch-Pasta Water Emulsification',
    category: 'Flavor Building',
    shortDesc: 'Creating creamy, silky pasta sauces without heavy cream using starchy pasta water & finely grated cheese.',
    scienceExplanation:
      'As pasta boils, gelatinized starch dissolves into the water. Adding this starchy water to fat (guanciale fat, olive oil, or butter) and hard cheese (Pecorino/Parmigiano) creates a silky emulsion where starch prevents cheese proteins from clumping.',
    stepByStep: [
      'Boil pasta in slightly less water than usual to concentrate starch density.',
      'Drain pasta 2 minutes before al dente, reserving 1 cup of cloudy pasta water.',
      'Add pasta directly to warm pan containing rendered fat or melted butter.',
      'Ladle in 1/4 cup reserved pasta water and toss rapidly on medium heat to create a bubbling starch emulsion.',
      'Remove pan from heat, wait 15 seconds, then shower finely grated cheese while vigorously tossing.',
      'Adjust with small splashes of pasta water until sauce clings to pasta like velvet.'
    ],
    keyEquipment: ['Microplane Grater', 'Skillet', 'Tongs'],
    idealTemperatures: 'Toss cheese off-heat below 160°F (71°C) to prevent cheese stringiness.',
    commonMistakes: [
      'Adding grated cheese while pan is still over high flame, causing protein coagulation.',
      'Using pre-grated bagged cheese which contains anti-caking wood cellulose.'
    ],
    proTips: [
      'Grate cheese using a microplane powder-fine so it dissolves instantly into the warm starch water.'
    ],
    difficulty: 'Intermediate',
    tags: ['Pasta', 'Carbonara', 'Cacio e Pepe', 'Starch', 'Italian']
  }
];

export const RATIOS_DATA: RatioItem[] = [
  {
    id: 'classic-vinaigrette',
    name: 'Classic Vinaigrette',
    category: 'Sauces & Dressing',
    description: 'The golden ratio for balanced, bright salad dressings.',
    baseIngredientName: 'Acid (Vinegar or Citrus Juice)',
    baseUnit: 'ml',
    defaultBaseAmount: 50,
    components: [
      { name: 'Neutral / Olive Oil', ratioMultiplier: 3.0, unit: 'ml', notes: '3 parts oil to 1 part acid' },
      { name: 'Dijon Mustard (Emulsifier)', ratioMultiplier: 0.1, unit: 'tbsp', notes: 'Stabilizes the emulsion' },
      { name: 'Honey or Maple Syrup', ratioMultiplier: 0.05, unit: 'tsp', notes: 'Rounds off harsh acid' },
      { name: 'Fine Salt', ratioMultiplier: 0.04, unit: 'tsp', notes: 'Season to taste' }
    ],
    chefTip: 'Whisk mustard and vinegar first, then slowly drizzle oil in a stream while whisking.'
  },
  {
    id: 'french-roux-bechamel',
    name: 'Roux & Bechamel Sauce',
    category: 'Sauces & Dressing',
    description: 'Equal weights of fat and flour, diluted with 10x liquid for thick mother sauces.',
    baseIngredientName: 'All-Purpose Flour',
    baseUnit: 'g',
    defaultBaseAmount: 30,
    components: [
      { name: 'Unsalted Butter', ratioMultiplier: 1.0, unit: 'g', notes: 'Equal weight fat to flour (1:1)' },
      { name: 'Whole Milk (or Stock)', ratioMultiplier: 10.0, unit: 'ml', notes: '10 parts liquid to 1 part roux flour' },
      { name: 'Pinch of Nutmeg & Salt', ratioMultiplier: 0.1, unit: 'pinch', notes: 'Essential Bechamel aroma' }
    ],
    chefTip: 'Pour cold milk into warm roux (or warm milk into cold roux) while whisking continuously to prevent lumps.'
  },
  {
    id: 'sourdough-bread-72',
    name: 'Sourdough Bread (72% Hydration)',
    category: 'Baking & Dough',
    description: 'Baking baker percentages based on 100% flour weight.',
    baseIngredientName: 'Bread Flour',
    baseUnit: 'g',
    defaultBaseAmount: 500,
    components: [
      { name: 'Water (72% Hydration)', ratioMultiplier: 0.72, unit: 'ml', notes: 'Filter water 80°F' },
      { name: 'Active Sourdough Starter (20%)', ratioMultiplier: 0.20, unit: 'g', notes: 'Fed and at peak rise' },
      { name: 'Fine Sea Salt (2%)', ratioMultiplier: 0.02, unit: 'g', notes: '10g salt for 500g flour' }
    ],
    chefTip: 'Perform 4 sets of stretch-and-folds spaced 30 minutes apart during initial bulk fermentation.'
  },
  {
    id: 'grain-rice-ratios',
    name: 'Long-Grain Rice & Grains',
    category: 'Grains & Rice',
    description: 'Perfect fluffy steamed rice absorption ratio.',
    baseIngredientName: 'Dry Jasmine / Basmati Rice',
    baseUnit: 'g',
    defaultBaseAmount: 200,
    components: [
      { name: 'Water', ratioMultiplier: 1.5, unit: 'ml', notes: '1.5 cups water per 1 cup rice' },
      { name: 'Butter or Oil', ratioMultiplier: 0.05, unit: 'tbsp', notes: 'Keeps grains distinct' },
      { name: 'Fine Salt', ratioMultiplier: 0.01, unit: 'tsp', notes: 'Pinch' }
    ],
    chefTip: 'Rinse rice 3 times in cold water until water runs clear to remove excess surface starch.'
  },
  {
    id: 'meat-dry-brine',
    name: 'Equilibrium Dry Brine (Meat & Poultry)',
    category: 'Brines & Marinades',
    description: '1.5% salt by total meat mass for juiciness and deep seasoning.',
    baseIngredientName: 'Raw Meat Mass (Steak, Pork, Poultry)',
    baseUnit: 'g',
    defaultBaseAmount: 1000,
    components: [
      { name: 'Kosher Salt (1.5%)', ratioMultiplier: 0.015, unit: 'g', notes: '15g salt per 1kg meat' },
      { name: 'Black Pepper (0.3%)', ratioMultiplier: 0.003, unit: 'g', notes: 'Freshly cracked' }
    ],
    chefTip: 'Rest salted meat uncovered on a wire cooling rack in the refrigerator for 12 to 24 hours.'
  },
  {
    id: 'custard-base-ratio',
    name: 'Rich Pastry Custard / Crème Anglaise',
    category: 'Baking & Dough',
    description: 'Smooth pouring dessert sauce ratio.',
    baseIngredientName: 'Heavy Cream / Whole Milk',
    baseUnit: 'ml',
    defaultBaseAmount: 250,
    components: [
      { name: 'Egg Yolks', ratioMultiplier: 0.016, unit: 'pcs', notes: 'Approx 4 yolks per 250ml' },
      { name: 'Granulated Sugar', ratioMultiplier: 0.20, unit: 'g', notes: '50g sugar per 250ml cream' },
      { name: 'Vanilla Extract', ratioMultiplier: 0.02, unit: 'tsp', notes: '1 tsp per batch' }
    ],
    chefTip: 'Temper hot milk into sugar-yolk mix slowly, then heat gently to 180°F (82°C) until coating back of spoon.'
  }
];

export const DONENESS_DATA: DonenessItem[] = [
  {
    id: 'steak-rare',
    meatType: 'Beef Ribeye / Striploin',
    doneness: 'Rare',
    pullTempF: 120,
    pullTempC: 49,
    finalTempF: 125,
    finalTempC: 52,
    restTimeMinutes: 5,
    visualCues: 'Cool red center, soft texture like the muscle between thumb and index finger.',
    notes: 'Pull 5°F below target as carryover cooking continues on the rack.',
    safetyRating: 'Chef Preferred'
  },
  {
    id: 'steak-medium-rare',
    meatType: 'Beef Ribeye / Striploin',
    doneness: 'Medium-Rare (Golden Standard)',
    pullTempF: 130,
    pullTempC: 54,
    finalTempF: 135,
    finalTempC: 57,
    restTimeMinutes: 7,
    visualCues: 'Warm red-pink center, yields gently to pressure with rich juicy tenderness.',
    notes: 'Optimal fat rendering and protein tenderness for ribeye & striploin.',
    safetyRating: 'Chef Preferred'
  },
  {
    id: 'steak-medium',
    meatType: 'Beef Ribeye / Striploin',
    doneness: 'Medium',
    pullTempF: 140,
    pullTempC: 60,
    finalTempF: 145,
    finalTempC: 63,
    restTimeMinutes: 7,
    visualCues: 'Warm pink center throughout, firm surface springiness.',
    notes: 'Great for leaner cuts like tenderloin or sirloin.',
    safetyRating: 'Chef Preferred'
  },
  {
    id: 'pork-loin-juicy',
    meatType: 'Pork Chop & Tenderloin',
    doneness: 'Juicy Blush Pink (USDA Safe)',
    pullTempF: 140,
    pullTempC: 60,
    finalTempF: 145,
    finalTempC: 63,
    restTimeMinutes: 5,
    visualCues: 'Slight blush of pink, extremely juicy.',
    notes: 'Modern pork is safe at 145°F. Do not overcook to dry white 165°F.',
    safetyRating: 'USDA Recommended'
  },
  {
    id: 'chicken-breast',
    meatType: 'Poultry Breast (Chicken/Turkey)',
    doneness: 'Juicy & Tender',
    pullTempF: 160,
    pullTempC: 71,
    finalTempF: 165,
    finalTempC: 74,
    restTimeMinutes: 8,
    visualCues: 'Opaque white juices run completely clear, no pink at bone.',
    notes: 'Pasteurization happens at 165°F instantly, or 150°F held for 3 minutes.',
    safetyRating: 'USDA Recommended'
  },
  {
    id: 'salmon-medium',
    meatType: 'Fresh Salmon Fillet',
    doneness: 'Medium-Rare Translucent',
    pullTempF: 120,
    pullTempC: 49,
    finalTempF: 125,
    finalTempC: 52,
    restTimeMinutes: 3,
    visualCues: 'Flakes easily with fork, moist dark coral pink center.',
    notes: 'Overcooking salmon to 145°F forces out white albumin protein.',
    safetyRating: 'Chef Preferred'
  }
];

export const OIL_SMOKE_POINTS: OilSmokePoint[] = [
  {
    id: 'avocado-oil',
    oilName: 'Refined Avocado Oil',
    smokePointF: 520,
    smokePointC: 271,
    flavorProfile: 'Neutral',
    bestUses: ['High-heat searing', 'Wok stir-frying', 'Deep frying', 'Searing thick steaks'],
    unsuitableFor: ['Cold salad finishings where rich olive flavor is desired']
  },
  {
    id: 'ghee-clarified',
    oilName: 'Ghee (Clarified Butter)',
    smokePointF: 485,
    smokePointC: 252,
    flavorProfile: 'Rich/Fruity',
    bestUses: ['High-heat searing', 'Indian curry bases', 'Roasting potatoes', 'Basting steaks'],
    unsuitableFor: ['Vegan dishes', 'Cold emulsion dressings']
  },
  {
    id: 'canola-oil',
    oilName: 'Refined Canola / Vegetable Oil',
    smokePointF: 400,
    smokePointC: 204,
    flavorProfile: 'Neutral',
    bestUses: ['Deep frying', 'Baking', 'General sautéing', 'Mayonnaise base'],
    unsuitableFor: ['Finishing raw dishes']
  },
  {
    id: 'extra-virgin-olive',
    oilName: 'Extra Virgin Olive Oil (EVOO)',
    smokePointF: 375,
    smokePointC: 190,
    flavorProfile: 'Pungent',
    bestUses: ['Cold salad dressings', 'Finishing pasta', 'Dipping bread', 'Low-heat gentle sautéing'],
    unsuitableFor: ['High-heat wok cooking or steak searing (polyphenols burn)']
  },
  {
    id: 'butter-unsalted',
    oilName: 'Whole Unsalted Butter',
    smokePointF: 302,
    smokePointC: 150,
    flavorProfile: 'Rich/Fruity',
    bestUses: ['Pan basting at end of cook', 'Baking', 'Sauce emulsions', 'Low heat eggs'],
    unsuitableFor: ['Initial high heat pan searing (milk solids burn quickly)']
  }
];

export const SUBSTITUTIONS_DATA: SubstitutionItem[] = [
  {
    id: 'heavy-cream-sub',
    ingredient: 'Heavy Cream (1 Cup / 240ml)',
    category: 'Dairy & Eggs',
    bestSubstitute: '3/4 Cup Whole Milk + 1/4 Cup Melted Unsalted Butter',
    ratioFormula: '1:1 ratio replace',
    howToAdjust: 'Melt butter and whisk into milk before adding to soups or sauces.',
    impactOnDish: 'Maintains butterfat richness. Do not attempt to whip for whipped cream.'
  },
  {
    id: 'buttermilk-sub',
    ingredient: 'Buttermilk (1 Cup / 240ml)',
    category: 'Dairy & Eggs',
    bestSubstitute: '1 Cup Milk + 1 tbsp Lemon Juice or White Vinegar',
    ratioFormula: '1:1 ratio replace',
    howToAdjust: 'Stir acid into milk and let sit at room temp for 10 minutes until slightly curdled.',
    impactOnDish: 'Provides required acidity to react with baking soda for fluffy pancakes and biscuits.'
  },
  {
    id: 'cornstarch-thickener',
    ingredient: 'Cornstarch Slurry Thickener (1 tbsp)',
    category: 'Baking & Thickeners',
    bestSubstitute: '2 tbsp All-Purpose Flour or Arrowroot Powder',
    ratioFormula: '2 tbsp Flour : 1 tbsp Cornstarch',
    howToAdjust: 'Cook flour longer in liquid to eliminate raw starch taste.',
    impactOnDish: 'Flour yields a slightly cloudier sheen compared to glossy cornstarch.'
  },
  {
    id: 'fresh-herbs-dried',
    ingredient: 'Fresh Herbs (1 tbsp minced)',
    category: 'Herbs & Aromatics',
    bestSubstitute: '1 tsp Dried Herbs',
    ratioFormula: '3 Fresh : 1 Dried ratio',
    howToAdjust: 'Add dried herbs earlier in cooking so heat releases essential oils.',
    impactOnDish: 'Dried herbs are concentrated and potent; fresh herbs are best added at the very end.'
  },
  {
    id: 'white-wine-deglaze',
    ingredient: 'White Wine for Deglazing (1/2 Cup)',
    category: 'Acids & Vinegar',
    bestSubstitute: '1/2 Cup Chicken/Veg Stock + 1 tbsp Lemon Juice or Apple Cider Vinegar',
    ratioFormula: '1:1 volume replace',
    howToAdjust: 'Mix citrus/vinegar into stock to replicate wine acidity and depth.',
    impactOnDish: 'Non-alcoholic bright acidity that lifts rich meat sauces perfectly.'
  }
];

export const PRELOADED_MANUALS: CookingManual[] = [
  {
    id: 'master-ribeye-steak',
    title: 'Pan-Seared Ribeye Steak & Garlic Butter Reduction',
    summary: 'The golden culinary manual for thick cut ribeye with deep brown crust, tender medium-rare center, and glossy aromatic pan reduction.',
    cuisine: 'Modern Bistro',
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    difficulty: 'Intermediate',
    servings: 2,
    keyTechniques: ['Maillard Searing', 'Butter Basting (Arrosé)', 'Pan Deglazing', 'Resting Physics'],
    equipmentNeeded: ['10-inch Cast Iron Skillet', 'Instant-Read Digital Thermometer', 'Spoon for basting', 'Wire Cooling Rack'],
    ingredients: [
      { name: 'Thick Bone-in Ribeye Steak (1.5 inch thick)', amount: 600, unit: 'g', notes: 'Brought to room temp, dry-brined' },
      { name: 'Coarse Kosher Salt', amount: 10, unit: 'g', notes: 'Heavy surface coating' },
      { name: 'Coarsely Cracked Black Pepper', amount: 4, unit: 'g', notes: 'Freshly milled' },
      { name: 'Avocado Oil or Ghee', amount: 30, unit: 'ml', notes: 'High smoke point fat' },
      { name: 'Unsalted Butter', amount: 45, unit: 'g', notes: 'Cold cubes for basting' },
      { name: 'Garlic Cloves', amount: 4, unit: 'cloves', notes: 'Smashed, skin on' },
      { name: 'Fresh Thyme & Rosemary Sprigs', amount: 3, unit: 'pcs', notes: 'Aromatic herbs' },
      { name: 'Dry Red Wine or Beef Stock', amount: 60, unit: 'ml', notes: 'For pan deglaze' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Surface Drying & Dry Brining',
        instruction: 'Pat the ribeye completely dry on all sides using paper towels. Season liberally with kosher salt. Let sit on a wire rack for 30 minutes (or overnight in fridge).',
        proTip: 'A dry exterior is mandatory for the Maillard reaction. Wet meat steams instead of sears.',
        timerSeconds: 1800
      },
      {
        stepNumber: 2,
        title: 'Preheating Heavy Cast Iron',
        instruction: 'Place cast iron skillet over high heat for 4-5 minutes until smoking hot. Add high-heat oil until shimmering across the pan.',
        proTip: 'Cast iron holds massive thermal mass, preventing pan temperature drop when cold meat touches.',
        timerSeconds: 300
      },
      {
        stepNumber: 3,
        title: 'Initial Sear & Fat Rendering',
        instruction: 'Lay the steak into the pan away from you. Sear undisturbed for 2 minutes to develop a dark mahogany crust. Flip and sear the other side.',
        proTip: 'Use tongs to press the rendered fat cap edge directly against the pan for 60 seconds.',
        timerSeconds: 120
      },
      {
        stepNumber: 4,
        title: 'Butter Basting (Arrosé)',
        instruction: 'Reduce heat to medium. Add cold butter, smashed garlic, and herb sprigs. Tilt the pan toward you and continuously spoon foamy hot herb butter over the top of the steak for 2 minutes.',
        proTip: 'Butter basting cooks the steak gently with nutty brown butter (beurre noisette) flavor.',
        timerSeconds: 120
      },
      {
        stepNumber: 5,
        title: 'Checking Internal Doneness & Resting',
        instruction: 'Insert probe into thickest center. Remove at 130°F (54°C) for medium-rare. Transfer steak to wire rack to rest for 7 minutes.',
        proTip: 'Carryover heat will raise internal temp by 5°F while juices redistribute evenly throughout muscle tissue.',
        timerSeconds: 420
      },
      {
        stepNumber: 6,
        title: 'Pan Sauce Deglaze',
        instruction: 'Pour off excess pan fat leaving garlic & herbs. Pour in red wine/stock, scraping up all dark fond bits from pan bottom. Simmer 2 minutes until syrupy. Pour over sliced steak.',
        proTip: 'Never pour pan sauce over the crispy crust; spoon around the sliced steak base.',
        timerSeconds: 120
      }
    ],
    troubleshooting: [
      { issue: 'Steak is gray and lack crust', solution: 'The meat surface was damp or pan was not preheated hot enough.' },
      { issue: 'Butter smoked and turned pitch black', solution: 'Added butter too early at high sear heat. Add butter only at final basting step with lowered flame.' }
    ]
  },
  {
    id: 'classic-french-omelette',
    title: 'French Soft-Curd Omelette (Baveuse)',
    summary: 'Silky, tender, golden cylinder with zero browning on the exterior and a delicate cream curd center.',
    cuisine: 'French Classic',
    prepTimeMinutes: 5,
    cookTimeMinutes: 3,
    difficulty: 'Intermediate',
    servings: 1,
    keyTechniques: ['Agitation Curd Creation', 'Temperature Precision', 'Omelette Roll'],
    equipmentNeeded: ['8-inch Non-Stick Skillet', 'Rubber Heat-Resistant Spatula', 'Fork'],
    ingredients: [
      { name: 'Fresh Large Eggs', amount: 3, unit: 'pcs', notes: 'Room temperature' },
      { name: 'Unsalted Butter', amount: 20, unit: 'g', notes: 'Divided' },
      { name: 'Fine Sea Salt', amount: 2, unit: 'g', notes: 'Whisked in' },
      { name: 'Fresh Chives', amount: 5, unit: 'g', notes: 'Finely snipped' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Thorough Egg Aeration',
        instruction: 'Crack eggs into a bowl, add salt, and beat vigorously with a fork until whites and yolks are 100% homogenous with no visible white streaks.',
        proTip: 'Salting eggs 15 minutes prior softens egg proteins, keeping curds extraordinarily tender.',
        timerSeconds: 60
      },
      {
        stepNumber: 2,
        title: 'Gentle Butter Melt',
        instruction: 'Melt butter in non-stick skillet over medium-low heat until foamy. Do not allow butter to brown.',
        proTip: 'The butter should coat the bottom completely without sizzling aggressively.',
        timerSeconds: 45
      },
      {
        stepNumber: 3,
        title: 'High-Agitation Curd Formation',
        instruction: 'Pour in eggs. Immediately shake the pan rapidly back and forth while stirring eggs vigorously in small circular motions with spatula.',
        proTip: 'Rapid motion breaks coagulating egg proteins into tiny, velvety curds.',
        timerSeconds: 60
      },
      {
        stepNumber: 4,
        title: 'Setting the Sheet & Rolling',
        instruction: 'When eggs are 80% set but top is still moist (baveuse), smooth surface. Tilt pan, lift top edge, and roll eggs down into a sleek almond shape.',
        proTip: 'Invert onto plate seam-side down and brush top with a touch of cold butter for a shiny glaze.',
        timerSeconds: 30
      }
    ],
    troubleshooting: [
      { issue: 'Omelette has brown spots', solution: 'Heat was too high or butter browned before adding eggs.' },
      { issue: 'Omelette broke while rolling', solution: 'Curds became too dry before rolling. Roll while surface is still glistening moist.' }
    ]
  },
  {
    id: 'sourdough-artisan-boule',
    title: 'Artisan Country Sourdough Bread',
    summary: 'Crispy blistered crust, airy open crumb, and deep natural fermentation flavor guide.',
    cuisine: 'Artisan Bakery',
    prepTimeMinutes: 45,
    cookTimeMinutes: 45,
    difficulty: 'Advanced',
    servings: 8,
    keyTechniques: ['Autolyse', 'Stretch and Fold', 'Lamination', 'Dutch Oven Steam Baking'],
    equipmentNeeded: ['Cast Iron Dutch Oven', 'Proofing Basket (Banneton)', 'Bread Lame / Razor', 'Kitchen Scale'],
    ingredients: [
      { name: 'Unbleached Bread Flour', amount: 450, unit: 'g', notes: '100% base' },
      { name: 'Whole Wheat Flour', amount: 50, unit: 'g', notes: 'For earthy aroma' },
      { name: 'Water (80°F / 27°C)', amount: 360, unit: 'ml', notes: '72% hydration' },
      { name: 'Active Starter', amount: 100, unit: 'g', notes: '20% inoculant' },
      { name: 'Fine Sea Salt', amount: 10, unit: 'g', notes: '2% salt' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Autolyse Stage',
        instruction: 'Mix flours and 340ml water in a bowl until no dry flour remains. Cover and let rest for 45 minutes.',
        proTip: 'Autolyse allows flour enzymes (amylase/protease) to hydrate fully and begin gluten development naturally without yeast competition.',
        timerSeconds: 2700
      },
      {
        stepNumber: 2,
        title: 'Incorporate Starter & Salt',
        instruction: 'Add active starter and remaining 20ml water. Dimple into dough, then add salt. Mix thoroughly using Rubaud method for 5 minutes.',
        proTip: 'Salt strengthens gluten bonds and controls fermentation rate.',
        timerSeconds: 300
      },
      {
        stepNumber: 3,
        title: 'Bulk Fermentation & Stretch-and-Folds',
        instruction: 'Perform 4 sets of stretch-and-folds every 30 minutes over 2 hours. Let dough ferment at room temp until volume increases by 50% with dome top.',
        proTip: 'Wet your hands with cold water before folding dough to prevent sticking.',
        timerSeconds: 7200
      },
      {
        stepNumber: 4,
        title: 'Shaping & Cold Retardation',
        instruction: 'Preshape into round boule, rest 20 mins, then final shape tightly for tension. Place in floured banneton and chill in fridge overnight (12-16 hrs).',
        proTip: 'Cold chilling builds complex lactic acid flavor and firms dough for clean razor scoring.',
        timerSeconds: 43200
      },
      {
        stepNumber: 5,
        title: 'Dutch Oven Steam Baking',
        instruction: 'Preheat Dutch Oven at 500°F (260°C). Invert cold dough, score top with lame at 45° angle. Bake covered for 20 mins, then uncovered at 450°F for 20 mins.',
        proTip: 'Trapped steam keeps exterior skin pliable so dough can achieve maximum oven spring.',
        timerSeconds: 2400
      }
    ]
  }
];
