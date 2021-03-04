export interface Vehicle {
  id: number;
  model: string;
  name: string;
  weight: string;
  hullPoints: number;
  handling: number;
  maxGear: number;
  buildSlots: number;
  crew: number;
  cost: number;
  upgrades: Upgrade[];
  specialRules: SpecialRule[];
}

export interface Upgrade {
  id: number;
  name: string;
  type: string;
  attack: string;
  range: string;
  buildSlots: number;
  cost: number;
  specialRules: SpecialRule[];
}

export interface SpecialRule {
  id: number;
  name: string;
  type: string;
  effects: string;
  book: string;
}
