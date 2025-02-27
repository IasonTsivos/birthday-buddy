
import React, { useState } from "react";
import { ICON_COLORS, ICON_EMOJIS, IconOption } from "@/types";

interface IconSelectorProps {
  selectedIcon: IconOption;
  onSelectIcon: (icon: IconOption) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({ selectedIcon, onSelectIcon }) => {
  const [showSelector, setShowSelector] = useState(false);

  const toggleSelector = () => {
    setShowSelector(!showSelector);
  };

  const handleSelectIcon = (emoji: string) => {
    onSelectIcon({ ...selectedIcon, emoji });
    setShowSelector(false);
  };

  const handleSelectColor = (color: string) => {
    onSelectIcon({ ...selectedIcon, color });
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Friend Icon</label>
      
      <div className="flex items-center">
        <button
          type="button"
          onClick={toggleSelector}
          className={`${selectedIcon.color} birthday-icon mr-4 border-2 border-transparent hover:border-purple/30 transition-all duration-200`}
        >
          {selectedIcon.emoji}
        </button>
        
        <div className="flex-1">
          <p className="text-sm text-gray-500">Choose an emoji and color for your friend</p>
          <div className="flex flex-wrap mt-2 gap-1">
            {ICON_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-6 h-6 rounded-full ${color} ${
                  selectedIcon.color === color ? "ring-2 ring-purple ring-offset-2" : ""
                }`}
                onClick={() => handleSelectColor(color)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {showSelector && (
        <div className="mt-4 p-3 bg-white rounded-xl border shadow-sm animate-fade-in">
          <div className="grid grid-cols-5 gap-2">
            {ICON_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleSelectIcon(emoji)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl hover:bg-gray-100 transition-colors ${
                  selectedIcon.emoji === emoji ? "bg-purple/10 text-purple" : ""
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconSelector;
