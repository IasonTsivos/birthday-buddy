
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Birthday } from "@/types";
import { loadBirthdays, sortBirthdaysByUpcoming, formatDateWithDay } from "@/lib/data";
import BirthdayCard from "@/components/BirthdayCard";
import TabBar from "@/components/TabBar";
import { Bell, Search } from "lucide-react";

const Index: React.FC = () => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // Load data whenever component mounts or location changes (like after navigation)
  useEffect(() => {
    loadData();
  }, [location.pathname]); // This will trigger when navigation occurs
  
  // Function to load birthdays data
  const loadData = () => {
    try {
      setLoading(true);
      const birthdaysData = loadBirthdays();
      console.log("Loaded birthdays:", birthdaysData.length);
      setBirthdays(sortBirthdaysByUpcoming(birthdaysData));
    } catch (error) {
      console.error("Error loading birthdays:", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading birthdays...</p>
        </div>
      </div>
    );
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Find today's birthday if any
  const todayBirthday = birthdays.find(birthday => {
    const birthdayDate = new Date(birthday.date);
    birthdayDate.setHours(0, 0, 0, 0);
    return birthdayDate.getTime() === today.getTime();
  });
  
  // Get upcoming birthdays excluding today's
  const upcomingBirthdays = birthdays.filter(birthday => {
    const birthdayDate = new Date(birthday.date);
    birthdayDate.setHours(0, 0, 0, 0);
    return birthdayDate.getTime() > today.getTime();
  }).slice(0, 5); // Limit to 5 upcoming birthdays
  
  return (
    <div className="page-container pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-500">Today</p>
          <h1 className="text-2xl font-bold">{formatDateWithDay(new Date())}</h1>
        </div>
        <div className="flex space-x-2">
          <button 
            className="p-2 rounded-full bg-gray-100 text-gray-600"
            onClick={loadData} // Add refresh button functionality
          >
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {todayBirthday ? (
        <section className="mb-8">
          <BirthdayCard birthday={todayBirthday} isFeatured={true} />
        </section>
      ) : (
        <section className="mb-8">
          <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 text-center">
            <p className="text-gray-500">No birthdays today</p>
            <Link to="/add" className="text-purple font-medium mt-2 inline-block">
              Add a new birthday
            </Link>
          </div>
        </section>
      )}
      
      <section>
        <h2 className="section-title mb-4">Upcoming birthdays</h2>
        
        {upcomingBirthdays.length > 0 ? (
          <div>
            {upcomingBirthdays.map((birthday, index) => (
              <div key={birthday.id} className={index === 0 ? "mb-5 transform scale-[1.02]" : ""}>
                <BirthdayCard 
                  birthday={birthday} 
                  isFeatured={index === 0}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 text-center">
            <p className="text-gray-500">No upcoming birthdays</p>
            <Link to="/add" className="text-purple font-medium mt-2 inline-block">
              Add a new birthday
            </Link>
          </div>
        )}
      </section>
      
      <TabBar />
    </div>
  );
};

export default Index;
