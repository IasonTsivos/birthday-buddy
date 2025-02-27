
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Birthday, IconOption } from "@/types";
import { useToast } from "@/hooks/use-toast";
import IconSelector from "./IconSelector";
import { Calendar, ChevronLeft, Save } from "lucide-react";

interface BirthdayFormProps {
  initialBirthday?: Partial<Birthday>;
  onSubmit: (birthday: Omit<Birthday, "id">) => void;
  isEditing?: boolean;
}

const BirthdayForm: React.FC<BirthdayFormProps> = ({
  initialBirthday,
  onSubmit,
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState(initialBirthday?.name || "");
  const [birthYear, setBirthYear] = useState(
    initialBirthday?.date 
      ? initialBirthday.date.getFullYear() - (initialBirthday.age || 0)
      : new Date().getFullYear() - 30
  );
  const [birthMonth, setBirthMonth] = useState(
    initialBirthday?.date ? initialBirthday.date.getMonth() + 1 : 1
  );
  const [birthDay, setBirthDay] = useState(
    initialBirthday?.date ? initialBirthday.date.getDate() : 1
  );
  const [icon, setIcon] = useState<IconOption>(
    initialBirthday?.icon || { emoji: "👤", color: "bg-birthday-blue" }
  );
  const [wishes, setWishes] = useState(initialBirthday?.wishes || "");
  const [notes, setNotes] = useState(initialBirthday?.notes?.join("\n") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name",
        variant: "destructive",
      });
      return;
    }
    
    // Create date from form values
    const birthdayDate = new Date(birthYear, birthMonth - 1, birthDay);
    
    // Calculate age
    const today = new Date();
    const age = today.getFullYear() - birthYear;
    
    const birthdayData: Omit<Birthday, "id"> = {
      name,
      date: birthdayDate,
      icon,
      age,
      wishes: wishes.trim() || undefined,
      notes: notes.trim() ? notes.split("\n").filter(note => note.trim()) : undefined,
      giftIdeas: initialBirthday?.giftIdeas || [],
    };
    
    onSubmit(birthdayData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <button 
          type="button" 
          className="flex items-center text-gray-500 mb-4 hover:text-purple transition-colors"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Back</span>
        </button>
        <h1 className="page-title">{isEditing ? "Edit" : "Add"} Birthday</h1>
      </div>
      
      <IconSelector selectedIcon={icon} onSelectIcon={setIcon} />
      
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          placeholder="Friend's name"
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Birth Date
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="day" className="text-xs text-gray-500">Day</label>
            <input
              type="number"
              id="day"
              min="1"
              max="31"
              value={birthDay}
              onChange={(e) => setBirthDay(parseInt(e.target.value))}
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="month" className="text-xs text-gray-500">Month</label>
            <select
              id="month"
              value={birthMonth}
              onChange={(e) => setBirthMonth(parseInt(e.target.value))}
              className="input-field"
              required
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {new Date(2000, month - 1, 1).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="year" className="text-xs text-gray-500">Year</label>
            <input
              type="number"
              id="year"
              min="1900"
              max={new Date().getFullYear()}
              value={birthYear}
              onChange={(e) => setBirthYear(parseInt(e.target.value))}
              className="input-field"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="wishes" className="block text-sm font-medium text-gray-700 mb-2">
          Birthday Wishes
        </label>
        <textarea
          id="wishes"
          value={wishes}
          onChange={(e) => setWishes(e.target.value)}
          className="input-field min-h-[100px]"
          placeholder="Write your birthday wishes..."
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          Notes & Preferences
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input-field min-h-[100px]"
          placeholder="Add notes about your friend (one per line)"
        />
        <p className="text-xs text-gray-500 mt-1">Write each note on a new line</p>
      </div>
      
      <div className="flex justify-end">
        <button type="submit" className="btn-primary flex items-center">
          <Save className="h-5 w-5 mr-2" />
          {isEditing ? "Update" : "Save"} Birthday
        </button>
      </div>
    </form>
  );
};

export default BirthdayForm;
