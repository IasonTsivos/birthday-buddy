
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Birthday, IconOption, GiftIdea } from "@/types";
import { useToast } from "@/hooks/use-toast";
import IconSelector from "./IconSelector";
import { Calendar, ChevronLeft, Gift, Plus, Save, Trash } from "lucide-react";

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
  const [giftIdeas, setGiftIdeas] = useState<GiftIdea[]>(initialBirthday?.giftIdeas || []);
  const [newGift, setNewGift] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [isAddingGift, setIsAddingGift] = useState(false);

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
      giftIdeas,
    };
    
    onSubmit(birthdayData);
  };

  const addGiftIdea = () => {
    if (!newGift.title.trim()) {
      toast({
        title: "Error",
        description: "Gift title is required",
        variant: "destructive",
      });
      return;
    }

    const newGiftIdea: GiftIdea = {
      id: Date.now().toString(),
      title: newGift.title.trim(),
      description: newGift.description.trim() || undefined,
      price: newGift.price.trim() || undefined,
      purchased: false,
    };

    setGiftIdeas([...giftIdeas, newGiftIdea]);
    setNewGift({
      title: "",
      description: "",
      price: "",
    });
    setIsAddingGift(false);

    toast({
      title: "Gift idea added",
      description: "Added to your gift ideas list",
    });
  };

  const removeGiftIdea = (giftId: string) => {
    setGiftIdeas(giftIdeas.filter(gift => gift.id !== giftId));
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
      
      {/* Gift Ideas Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Gift className="h-5 w-5 text-purple mr-2" />
            <h3 className="font-medium">Gift Ideas</h3>
            <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              {giftIdeas.length}
            </span>
          </div>
          <button 
            type="button"
            onClick={() => setIsAddingGift(!isAddingGift)} 
            className="text-sm text-purple flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Idea
          </button>
        </div>
        
        {giftIdeas.length > 0 ? (
          <div className="space-y-3 mb-4">
            {giftIdeas.map((gift) => (
              <div key={gift.id} className="p-3 rounded-xl bg-white border border-gray-100 flex items-start">
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{gift.title}</h4>
                    {gift.price && <span className="text-sm text-purple-dark">{gift.price}</span>}
                  </div>
                  {gift.description && <p className="text-sm mt-1 text-gray-600">{gift.description}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => removeGiftIdea(gift.id)}
                  className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 mb-4 text-gray-500 bg-gray-50 rounded-xl">
            <Gift className="h-10 w-10 mx-auto mb-2 text-gray-300" />
            <p>No gift ideas yet</p>
          </div>
        )}
        
        {isAddingGift && (
          <div className="p-4 border border-gray-200 rounded-xl animate-fade-in">
            <h4 className="font-medium mb-3">Add New Gift Idea</h4>
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Gift title *"
                  className="input-field"
                  value={newGift.title}
                  onChange={(e) => setNewGift({ ...newGift, title: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Description (optional)"
                  className="input-field"
                  value={newGift.description}
                  onChange={(e) => setNewGift({ ...newGift, description: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Price (optional)"
                  className="input-field"
                  value={newGift.price}
                  onChange={(e) => setNewGift({ ...newGift, price: e.target.value })}
                />
              </div>
              <div className="flex space-x-2 justify-end">
                <button
                  type="button"
                  className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsAddingGift(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-3 py-2 rounded-lg bg-purple text-white hover:bg-purple-dark transition-colors"
                  onClick={addGiftIdea}
                >
                  Add Gift
                </button>
              </div>
            </div>
          </div>
        )}
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
