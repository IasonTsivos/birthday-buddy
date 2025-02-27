
import React from "react";
import { useNavigate } from "react-router-dom";
import { Birthday } from "@/types";
import { loadBirthdays, saveBirthdays } from "@/lib/data";
import BirthdayForm from "@/components/BirthdayForm";
import TabBar from "@/components/TabBar";
import { useToast } from "@/hooks/use-toast";

const AddBirthday: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleAddBirthday = (birthdayData: Omit<Birthday, "id">) => {
    try {
      // Load existing birthdays
      const existingBirthdays = loadBirthdays();
      
      // Create new birthday with ID
      const newBirthday: Birthday = {
        ...birthdayData,
        id: Date.now().toString(),
      };
      
      // Add new birthday to list
      const updatedBirthdays = [...existingBirthdays, newBirthday];
      
      // Save to localStorage
      saveBirthdays(updatedBirthdays);
      
      // Show success toast
      toast({
        title: "Birthday added",
        description: `${newBirthday.name}'s birthday has been added.`,
      });
      
      // Navigate back to home
      navigate("/");
    } catch (error) {
      console.error("Error adding birthday:", error);
      toast({
        title: "Error",
        description: "Failed to add birthday. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="page-container">
      <BirthdayForm onSubmit={handleAddBirthday} />
      <TabBar />
    </div>
  );
};

export default AddBirthday;
