
import React from "react";
import { Link } from "react-router-dom";
import { Birthday } from "@/types";
import { getDaysUntil, getMonthDate } from "@/lib/data";
import { ChevronRight } from "lucide-react";

interface BirthdayCardProps {
  birthday: Birthday;
  isFeatured?: boolean;
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ birthday, isFeatured = false }) => {
  const daysUntil = getDaysUntil(birthday.date);
  const month = birthday.date.toLocaleDateString("en-US", { month: "long" });
  const formattedDate = getMonthDate(birthday.date);
  
  if (isFeatured) {
    return (
      <Link 
        to={`/birthday/${birthday.id}`}
        className="block animate-fade-in"
      >
        <div className="birthday-card-featured animate-enter">
          <div className="birthday-confetti">
            {/* Simple confetti pattern */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 rounded-full bg-purple-dark opacity-20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
          
          <div className="flex items-center mb-3 relative z-10">
            <div className={`birthday-icon ${birthday.icon.color} mr-4`}>
              <span className="text-2xl">{birthday.icon.emoji}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{birthday.name}</h3>
              <p className="text-sm text-gray-500">{month}, {birthday.date.getFullYear() - (birthday.age || 0)}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-purple">{birthday.age}</span>
              <p className="text-xs uppercase tracking-wide text-purple-dark/70">Today</p>
            </div>
          </div>
          
          <div className="flex justify-between mt-4 relative z-10">
            {/* Action buttons */}
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10.5V8.25C21 6.59 19.66 5.25 18 5.25L6 5.25C4.34 5.25 3 6.59 3 8.25V10.5" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 13.5V15.75C21 17.41 19.66 18.75 18 18.75H14.5" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 15L14 13L16 11" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 13H14" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 15H10" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 18H6" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 12V18C20 20.2 18.2 22 16 22H8C5.8 22 4 20.2 4 18V12" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 6H19C20.1 6 21 6.9 21 8V10C21 11.1 20.1 12 19 12H5C3.9 12 3 11.1 3 10V8C3 6.9 3.9 6 5 6Z" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.5 6V5C14.5 3.9 13.6 3 12.5 3H11.5C10.4 3 9.5 3.9 9.5 5V6" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17V19" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.4405 9C16.4405 9 15.9205 12.8 15.4105 15.5C15.1805 16.99 14.1605 17.95 12.6505 17.98C9.99047 18.05 7.33047 18.05 4.67047 17.98C3.14047 17.95 2.13047 16.99 1.90047 15.5C1.39047 12.8 0.870469 9 0.870469 9" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.9 6.82001C14.1 5.03001 9.90003 5.03001 6.10003 6.82001" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.9991 12H17.9991" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.9991 9H17.9991" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.9991 15H17.9991" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 9.67002C22 14.84 12 22 12 22C12 22 2 14.84 2 9.67002C2 5.43002 6.02 2.24002 10 3.22002C11.39 3.56002 12.68 4.33002 13.5 5.74002C14.35 4.33002 15.6 3.56002 17 3.22002C20.97 2.24002 25 5.43002 22 9.67002Z" stroke="#7E69AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link 
      to={`/birthday/${birthday.id}`}
      className="block mb-3 animate-fade-in"
    >
      <div className="birthday-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
        <div className={`birthday-icon-sm ${birthday.icon.color} mr-3 flex-shrink-0`}>
          {birthday.icon.emoji}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">{birthday.name}</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500">{formattedDate}</span>
          </div>
        </div>
        <div className="text-right pl-3 flex-shrink-0">
          <span className="text-xl font-bold text-purple-medium">{birthday.age}yrs</span>
          <p className="text-xs text-gray-500">in {daysUntil} days</p>
        </div>
        <ChevronRight className="ml-2 h-5 w-5 text-gray-400" />
      </div>
    </Link>
  );
};

export default BirthdayCard;
