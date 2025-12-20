import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDay } from "@/data/calendarData";
import { PixelIcon } from "./PixelIcon";

interface CalendarDoorProps {
  data: CalendarDay;
  isUnlocked: boolean;
}

export const CalendarDoor: FC<CalendarDoorProps> = ({ data, isUnlocked }) => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`task-${data.day}`);
    if (saved) {
      const entry = JSON.parse(saved);
      setIsCompleted(entry.completed);
    }
  }, [data.day]);

  const handleClick = () => {
    if (isUnlocked) {
      navigate(`/task/${data.day}`);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={!isUnlocked}
      className={`
        relative w-full aspect-square
        rounded-lg overflow-hidden
        border-4 border-deep-brown
        transition-all duration-300
        ${isUnlocked 
          ? "cursor-pointer hover:scale-105 hover:shadow-lg" 
          : "cursor-not-allowed opacity-60"
        }
        ${isCompleted ? "ring-4 ring-honey ring-offset-2 ring-offset-background" : ""}
      `}
      style={{
        background: isCompleted 
          ? "linear-gradient(145deg, hsl(120 20% 45%) 0%, hsl(120 25% 35%) 100%)"
          : "linear-gradient(145deg, hsl(30 40% 50%) 0%, hsl(25 35% 35%) 100%)",
      }}
      whileHover={isUnlocked ? { rotate: [-1, 1, -1, 0] } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
    >
      {/* Door number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-pixel text-2xl md:text-4xl text-cream text-shadow-pixel">
          {data.day}
        </span>
      </div>

      {/* Door handle */}
      {!isCompleted && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-honey rounded-full shadow-md" />
      )}

      {/* Completed indicator */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1 right-1"
        >
          <PixelIcon icon="✓" className="text-cream text-lg" />
        </motion.div>
      )}

      {/* Lock icon for locked doors */}
      {!isUnlocked && (
        <div className="absolute bottom-1 right-1">
          <span className="text-sm opacity-70">🔒</span>
        </div>
      )}

      {/* Decorative snow on top */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-snow/80 rounded-t-sm" />
    </motion.button>
  );
};
