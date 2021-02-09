export interface vehicle {
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
    upgrades: upgrade[];
    specialRules: specialRule[];
}

export interface upgrade {
    id: number;
    name: string;
    type: string;
    attack: string;
    range: string;
    buildSlots: number;
    cost: number;
    specialRules: specialRule[];
}

export interface specialRule {
    id: number;
    name: string;
    type: string;
    effects: string;
    book: string;
}
