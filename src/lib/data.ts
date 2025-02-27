import { Birthday, GiftIdea } from "@/types";

// Current date for calculations
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

// Helper to generate future birthday date
export const getBirthdayDateThisYear = (month: number, day: number): Date => {
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

// Empty birthdays array (no sample data)
export const sampleBirthdays: Birthday[] = [];

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
  const birthdaysToSave = birthdays.map(birthday => ({
    ...birthday,
    // Keep the date as a string for storage
    date: birthday.date instanceof Date ? birthday.date.toISOString() : birthday.date
  }));
  
  localStorage.setItem("birthdays", JSON.stringify(birthdaysToSave));
  console.log("Saved birthdays to localStorage:", birthdaysToSave.length);
};

// Load birthdays from localStorage
export const loadBirthdays = (): Birthday[] => {
  const storedBirthdays = localStorage.getItem("birthdays");
  if (!storedBirthdays) {
    console.log("No stored birthdays found, using empty array");
    return [];
  }
  
  try {
    const parsedBirthdays = JSON.parse(storedBirthdays);
    console.log("Loaded birthdays from localStorage:", parsedBirthdays.length);
    
    // Convert string dates back to Date objects
    return parsedBirthdays.map((birthday: any) => ({
      ...birthday,
      date: new Date(birthday.date)
    }));
  } catch (error) {
    console.error("Error loading birthdays from localStorage:", error);
    return [];
  }
};
