export type ActiveTab =
  | 'manuals'
  | 'techniques'
  | 'ratios'
  | 'temperatures'
  | 'substitutions'
  | 'assistant'
  | 'ai-chef'
  | 'bookmarks';

export interface CulinaryTechnique {
  id: string;
  title: string;
  category: 'Knife Skills' | 'Heat & Searing' | 'Emulsifications' | 'Moist-Heat' | 'Dough & Baking' | 'Flavor Building';
  shortDesc: string;
  scienceExplanation: string;
  stepByStep: string[];
  keyEquipment: string[];
  idealTemperatures?: string;
  commonMistakes: string[];
  proTips: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface RatioItem {
  id: string;
  name: string;
  category: 'Sauces & Dressing' | 'Baking & Dough' | 'Grains & Rice' | 'Brines & Marinades';
  description: string;
  baseIngredientName: string;
  baseUnit: 'g' | 'ml' | 'cups';
  defaultBaseAmount: number;
  components: {
    name: string;
    ratioMultiplier: number; // relative to base ingredient (base = 1.0)
    unit: 'g' | 'ml' | 'tsp' | 'tbsp' | 'cups' | 'pinch' | 'pcs';
    notes?: string;
  }[];
  chefTip: string;
}

export interface DonenessItem {
  id: string;
  meatType: string;
  doneness: string;
  pullTempF: number;
  pullTempC: number;
  finalTempF: number;
  finalTempC: number;
  restTimeMinutes: number;
  visualCues: string;
  notes: string;
  safetyRating: 'USDA Recommended' | 'Chef Preferred' | 'Raw/Caution';
}

export interface OilSmokePoint {
  id: string;
  oilName: string;
  smokePointF: number;
  smokePointC: number;
  flavorProfile: 'Neutral' | 'Nutty' | 'Rich/Fruity' | 'Pungent';
  bestUses: string[];
  unsuitableFor: string[];
}

export interface SubstitutionItem {
  id: string;
  ingredient: string;
  category: 'Dairy & Eggs' | 'Baking & Thickeners' | 'Acids & Vinegar' | 'Herbs & Aromatics' | 'Fats & Oils';
  bestSubstitute: string;
  ratioFormula: string;
  howToAdjust: string;
  impactOnDish: string;
}

export interface IngredientSpec {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface ManualStep {
  stepNumber: number;
  title: string;
  instruction: string;
  proTip?: string;
  timerSeconds?: number;
}

export interface CookingManual {
  id: string;
  title: string;
  summary: string;
  cuisine: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  servings: number;
  keyTechniques: string[];
  equipmentNeeded: string[];
  ingredients: IngredientSpec[];
  steps: ManualStep[];
  troubleshooting?: { issue: string; solution: string }[];
  isCustomGenerated?: boolean;
}

export interface KitchenTimer {
  id: string;
  label: string;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  stepNumber?: number;
}

export interface SavedNote {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  tags: string[];
}

export interface SavedBookmark {
  id: string;
  title: string;
  category: string;
  type: 'manual' | 'technique' | 'ratio' | 'temperature';
  targetId: string;
  savedAt: string;
}
