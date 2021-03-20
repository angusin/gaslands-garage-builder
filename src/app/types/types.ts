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
  weapons: Weapon[];
  upgrades: Upgrade[];
  specialRules: SpecialRule[];
}

export interface Weapon {
  id: number;
  name: string;
  attack: string;
  range: string;
  slots: number;
  cost: number;
  rules: string;
}

export interface Upgrade {
  id: number;
  name: string;
  slots: number;
  cost: number;
  rules: string;
}

export interface SpecialRule {
  id: number;
  name: string;
  type: string;
  effects: string;
  book: string;
}
