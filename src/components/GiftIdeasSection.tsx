
import React, { useState } from "react";
import { Birthday, GiftIdea } from "@/types";
import { Check, ChevronDown, ChevronUp, Gift, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GiftIdeasSectionProps {
  birthday: Birthday;
  onUpdate: (birthday: Birthday) => void;
}

const GiftIdeasSection: React.FC<GiftIdeasSectionProps> = ({ birthday, onUpdate }) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(true);
  const [newGift, setNewGift] = useState({
    title: "",
    description: "",
    price: "",
    link: "",
  });
  const [isAddingGift, setIsAddingGift] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const toggleGiftPurchased = (giftId: string) => {
    const updatedGiftIdeas = birthday.giftIdeas?.map((gift) =>
      gift.id === giftId ? { ...gift, purchased: !gift.purchased } : gift
    ) || [];

    onUpdate({
      ...birthday,
      giftIdeas: updatedGiftIdeas,
    });

    toast({
      title: "Gift updated",
      description: "Gift purchase status updated successfully",
    });
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
      link: newGift.link.trim() || undefined,
      purchased: false,
    };

    const updatedGiftIdeas = [...(birthday.giftIdeas || []), newGiftIdea];

    onUpdate({
      ...birthday,
      giftIdeas: updatedGiftIdeas,
    });

    setNewGift({
      title: "",
      description: "",
      price: "",
      link: "",
    });
    setIsAddingGift(false);

    toast({
      title: "Gift idea added",
      description: "New gift idea added successfully",
    });
  };

  const removeGiftIdea = (giftId: string) => {
    const updatedGiftIdeas =
      birthday.giftIdeas?.filter((gift) => gift.id !== giftId) || [];

    onUpdate({
      ...birthday,
      giftIdeas: updatedGiftIdeas,
    });

    toast({
      title: "Gift idea removed",
      description: "Gift idea removed successfully",
    });
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          <Gift className="h-5 w-5 text-purple mr-2" />
          <h3 className="font-medium">Gift Ideas</h3>
          <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            {birthday.giftIdeas?.length || 0}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-100">
          {birthday.giftIdeas && birthday.giftIdeas.length > 0 ? (
            <div className="space-y-3">
              {birthday.giftIdeas.map((gift) => (
                <div
                  key={gift.id}
                  className={`p-3 rounded-xl flex items-start ${
                    gift.purchased ? "bg-gray-50" : "bg-white border border-gray-100"
                  }`}
                >
                  <button
                    onClick={() => toggleGiftPurchased(gift.id)}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border mr-3 mt-0.5 flex items-center justify-center ${
                      gift.purchased
                        ? "bg-purple border-purple"
                        : "border-gray-300"
                    }`}
                  >
                    {gift.purchased && <Check className="h-3 w-3 text-white" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4
                        className={`font-medium ${
                          gift.purchased ? "text-gray-400 line-through" : ""
                        }`}
                      >
                        {gift.title}
                      </h4>
                      {gift.price && (
                        <span
                          className={`text-sm ${
                            gift.purchased
                              ? "text-gray-400 line-through"
                              : "text-purple-dark"
                          }`}
                        >
                          {gift.price}
                        </span>
                      )}
                    </div>
                    {gift.description && (
                      <p
                        className={`text-sm mt-1 ${
                          gift.purchased ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {gift.description}
                      </p>
                    )}
                    {gift.link && (
                      <a
                        href={gift.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs mt-1 block ${
                          gift.purchased
                            ? "text-gray-400"
                            : "text-purple underline"
                        }`}
                      >
                        View link
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => removeGiftIdea(gift.id)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Gift className="h-10 w-10 mx-auto mb-2 text-gray-300" />
              <p>No gift ideas yet</p>
            </div>
          )}

          {isAddingGift ? (
            <div className="mt-4 p-4 border border-gray-200 rounded-xl animate-fade-in">
              <h4 className="font-medium mb-3">Add New Gift Idea</h4>
              <div className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Gift title *"
                    className="input-field"
                    value={newGift.title}
                    onChange={(e) =>
                      setNewGift({ ...newGift, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    className="input-field"
                    value={newGift.description}
                    onChange={(e) =>
                      setNewGift({ ...newGift, description: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Price (optional)"
                    className="input-field"
                    value={newGift.price}
                    onChange={(e) =>
                      setNewGift({ ...newGift, price: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Link (optional)"
                    className="input-field"
                    value={newGift.link}
                    onChange={(e) =>
                      setNewGift({ ...newGift, link: e.target.value })
                    }
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
          ) : (
            <button
              type="button"
              className="mt-4 w-full py-2 px-4 border border-dashed border-gray-300 rounded-xl text-gray-500 flex items-center justify-center hover:border-purple hover:text-purple transition-colors"
              onClick={() => setIsAddingGift(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Gift Idea
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GiftIdeasSection;
