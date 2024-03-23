import { Color } from "../Enums/color.js";
import { LineType } from "../Enums/linetype.js";
import { Rarity } from "../Enums/rarity.js";

export interface Card {
  id: number;
  name: string;
  manaCost: number;
  color: Color;
  cardType: LineType;
  rarity: Rarity;
  rulesText: string;
  strength?: number; //  Type Criatura
  resistance?: number; // Type Criatura
  loyalty?: number; // Type Planeswalker
  marketPrice: number;
}