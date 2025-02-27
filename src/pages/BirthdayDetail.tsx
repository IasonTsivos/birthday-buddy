
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Birthday } from "@/types";
import { loadBirthdays, saveBirthdays, formatDateWithDay, getDaysUntil } from "@/lib/data";
import GiftIdeasSection from "@/components/GiftIdeasSection";
import BirthdayForm from "@/components/BirthdayForm";
import TabBar from "@/components/TabBar";
import { useToast } from "@/hooks/use-toast";
import { CalendarClock, ChevronLeft, Edit, Heart, Trash } from "lucide-react";

const BirthdayDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [birthday, setBirthday] = useState<Birthday | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    if (!id) return;
    
    try {
      const birthdaysData = loadBirthdays();
      const foundBirthday = birthdaysData.find(b => b.id === id);
      
      if (foundBirthday) {
        setBirthday(foundBirthday);
      } else {
        toast({
          title: "Error",
          description: "Birthday not found",
          variant: "destructive",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error loading birthday details:", error);
      toast({
        title: "Error",
        description: "Failed to load birthday details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [id, navigate, toast]);
  
  const handleDeleteBirthday = () => {
    if (!birthday) return;
    
    if (window.confirm(`Are you sure you want to delete ${birthday.name}'s birthday?`)) {
      try {
        const birthdaysData = loadBirthdays();
        const updatedBirthdays = birthdaysData.filter(b => b.id !== birthday.id);
        
        saveBirthdays(updatedBirthdays);
        
        toast({
          title: "Birthday deleted",
          description: `${birthday.name}'s birthday has been deleted.`,
        });
        
        navigate("/");
      } catch (error) {
        console.error("Error deleting birthday:", error);
        toast({
          title: "Error",
          description: "Failed to delete birthday",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleUpdateBirthday = (updatedBirthday: Omit<Birthday, "id">) => {
    if (!birthday) return;
    
    try {
      const birthdaysData = loadBirthdays();
      const updatedBirthdays = birthdaysData.map(b => 
        b.id === birthday.id ? { ...updatedBirthday, id: birthday.id } : b
      );
      
      saveBirthdays(updatedBirthdays);
      
      // Update local state
      setBirthday({ ...updatedBirthday, id: birthday.id });
      setIsEditing(false);
      
      toast({
        title: "Birthday updated",
        description: `${updatedBirthday.name}'s birthday has been updated.`,
      });
    } catch (error) {
      console.error("Error updating birthday:", error);
      toast({
        title: "Error",
        description: "Failed to update birthday",
        variant: "destructive",
      });
    }
  };
  
  const handleGiftIdeasUpdate = (updatedBirthday: Birthday) => {
    try {
      const birthdaysData = loadBirthdays();
      const updatedBirthdays = birthdaysData.map(b => 
        b.id === updatedBirthday.id ? updatedBirthday : b
      );
      
      saveBirthdays(updatedBirthdays);
      
      // Update local state
      setBirthday(updatedBirthday);
    } catch (error) {
      console.error("Error updating gift ideas:", error);
      toast({
        title: "Error",
        description: "Failed to update gift ideas",
        variant: "destructive",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading birthday details...</p>
        </div>
      </div>
    );
  }
  
  if (!birthday) {
    return (
      <div className="page-container">
        <div className="text-center">
          <p className="text-gray-600">Birthday not found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-purple hover:underline"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }
  
  if (isEditing) {
    return (
      <div className="page-container">
        <BirthdayForm 
          initialBirthday={birthday} 
          onSubmit={handleUpdateBirthday} 
          isEditing={true} 
        />
        <TabBar />
      </div>
    );
  }
  
  const daysUntil = getDaysUntil(birthday.date);
  const birthdayDate = formatDateWithDay(birthday.date);
  
  return (
    <div className="page-container">
      <div>
        <button 
          className="flex items-center text-gray-500 mb-6 hover:text-purple transition-colors"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Back</span>
        </button>
        
        <div className="flex items-start justify-between mb-6">
          <div className={`birthday-icon ${birthday.icon.color}`}>
            {birthday.icon.emoji}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button 
              onClick={handleDeleteBirthday}
              className="p-2 rounded-full bg-gray-100 text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-1">{birthday.name}</h1>
        <div className="flex items-center text-gray-500 mb-4">
          <CalendarClock className="h-4 w-4 mr-1" />
          <span>{birthdayDate}</span>
          {birthday.age && (
            <span className="ml-2 bg-purple/10 text-purple px-2 py-0.5 rounded-full text-sm">
              {birthday.age} years
            </span>
          )}
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Birthday Countdown</h2>
            <span className="text-2xl font-bold text-purple">{daysUntil}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple rounded-full"
              style={{ width: `${100 - (daysUntil / 365) * 100}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-500 mt-2">days until birthday</p>
        </div>
        
        {birthday.wishes && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex items-center mb-3">
              <Heart className="h-5 w-5 text-purple mr-2" />
              <h2 className="font-medium">Birthday Wishes</h2>
            </div>
            <p className="text-gray-700 italic">"{birthday.wishes}"</p>
          </div>
        )}
        
        {birthday.notes && birthday.notes.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <h2 className="font-medium mb-3">Notes & Preferences</h2>
            <ul className="space-y-2">
              {birthday.notes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-purple mt-2 mr-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <GiftIdeasSection birthday={birthday} onUpdate={handleGiftIdeasUpdate} />
      </div>
      <TabBar />
    </div>
  );
};

export default BirthdayDetail;
