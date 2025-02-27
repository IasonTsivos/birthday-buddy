
export interface Birthday {
  id: string;
  name: string;
  date: Date;
  icon: {
    emoji: string;
    color: string;
  };
  age?: number;
  wishes?: string;
  notes?: string[];
  giftIdeas?: GiftIdea[];
}

export interface GiftIdea {
  id: string;
  title: string;
  description?: string;
  price?: string;
  link?: string;
  purchased?: boolean;
}

export type IconOption = {
  emoji: string;
  color: string;
};

export const ICON_COLORS = [
  "bg-birthday-yellow",
  "bg-birthday-pink",
  "bg-birthday-blue",
  "bg-birthday-green",
  "bg-birthday-orange",
  "bg-birthday-peach",
  "bg-purple-light"
];

export const ICON_EMOJIS = ["👨", "👩", "👦", "👧", "👴", "👵", "🧑", "👶", "🐱", "🐶", "🎵", "👑", "🎮", "⚽", "🏀", "🎨", "📚", "🍕", "🎸", "💻"];
