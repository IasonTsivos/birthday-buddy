
import { Birthday, GiftIdea } from "@/types";

// Current date for calculations
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

// Helper to generate future birthday date
const getBirthdayDateThisYear = (month: number, day: number): Date => {
  const date = new Date(currentYear, month - 1, day);
  // If birthday has passed this year, set to next year
  if (date < currentDate) {
    date.setFullYear(currentYear + 1);
  }
  return date;
};

// Helper to calculate age
const calculateAge = (birthYear: number): number => {
  return currentYear - birthYear;
};

// Sample birthdays data
export const sampleBirthdays: Birthday[] = [
  {
    id: "1",
    name: "John Smith",
    date: getBirthdayDateThisYear(3, 15),
    icon: {
      emoji: "👨",
      color: "bg-birthday-blue"
    },
    age: calculateAge(1985),
    wishes: "Happy birthday! May your day be filled with joy and laughter!",
    notes: ["Loves chocolate cake", "Prefer surprise parties", "Allergic to nuts"],
    giftIdeas: [
      {
        id: "g1",
        title: "Wireless Headphones",
        description: "Sony WH-1000XM4",
        price: "$299",
        link: "https://example.com/headphones",
        purchased: false
      },
      {
        id: "g2",
        title: "Fitness Watch",
        description: "Tracks steps, heart rate, and sleep",
        price: "$149",
        purchased: true
      }
    ]
  },
  {
    id: "2",
    name: "Emma Johnson",
    date: getBirthdayDateThisYear(5, 22),
    icon: {
      emoji: "👩",
      color: "bg-birthday-pink"
    },
    age: calculateAge(1990),
    wishes: "Wishing you an amazing birthday filled with wonderful surprises!",
    notes: ["Loves painting", "Favorite color is blue"],
    giftIdeas: [
      {
        id: "g3",
        title: "Painting Set",
        description: "Professional acrylic paints with canvas",
        price: "$79",
        purchased: false
      }
    ]
  },
  {
    id: "3",
    name: "Michael Davis",
    date: getBirthdayDateThisYear(7, 10),
    icon: {
      emoji: "🎮",
      color: "bg-birthday-green"
    },
    age: calculateAge(1988),
    giftIdeas: [
      {
        id: "g4",
        title: "Gaming Controller",
        description: "Xbox Elite Controller",
        price: "$159",
        purchased: false
      }
    ]
  },
  {
    id: "4",
    name: "Sophia Chen",
    date: getBirthdayDateThisYear(2, 5),
    icon: {
      emoji: "📚",
      color: "bg-birthday-yellow"
    },
    age: calculateAge(1992),
    wishes: "Happy birthday to my favorite bookworm! Hope your day is as wonderful as you are!",
    notes: ["Loves mystery novels", "Coffee enthusiast"],
    giftIdeas: [
      {
        id: "g5",
        title: "Book Subscription",
        description: "3-month mystery book subscription",
        price: "$65",
        purchased: false
      }
    ]
  },
  {
    id: "5",
    name: "David Wilson",
    date: getBirthdayDateThisYear(10, 18),
    icon: {
      emoji: "🎸",
      color: "bg-birthday-orange"
    },
    age: calculateAge(1983),
  }
];

// Helper to sort birthdays by upcoming date
export const sortBirthdaysByUpcoming = (birthdays: Birthday[]): Birthday[] => {
  return [...birthdays].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
};

// Helper to get days until birthday
export const getDaysUntil = (date: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const birthdayDate = new Date(date);
  birthdayDate.setHours(0, 0, 0, 0);
  
  const timeDiff = birthdayDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

// Format date to month and day
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
};

// Helper to get ordinal suffix for date (1st, 2nd, 3rd, etc)
export const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

// Format date with day and weekday
export const formatDateWithDay = (date: Date): string => {
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const formattedDay = `${day}${suffix}`;
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  
  return `${formattedDay} ${month}, ${weekday}`;
};

// Get month and date for display (e.g., "03 April")
export const getMonthDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString("en-US", { month: "long" });
  return `${day} ${month}`;
};

// Save birthdays to localStorage
export const saveBirthdays = (birthdays: Birthday[]): void => {
  localStorage.setItem("birthdays", JSON.stringify(birthdays));
};

// Load birthdays from localStorage
export const loadBirthdays = (): Birthday[] => {
  const storedBirthdays = localStorage.getItem("birthdays");
  if (!storedBirthdays) return sampleBirthdays;
  
  try {
    const parsedBirthdays = JSON.parse(storedBirthdays);
    // Convert string dates back to Date objects
    return parsedBirthdays.map((birthday: any) => ({
      ...birthday,
      date: new Date(birthday.date)
    }));
  } catch (error) {
    console.error("Error loading birthdays from localStorage:", error);
    return sampleBirthdays;
  }
};
