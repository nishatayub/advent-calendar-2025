import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDoor } from "./CalendarDoor";
import { Button } from "./ui/button";
import { Book } from "lucide-react";
import { calendarData } from "@/data/calendarData";

export const AdventCalendar: FC = () => {
  const navigate = useNavigate();
  // Set to true to unlock all days (as a gift), or use date logic
  const [unlockAll] = useState(true);
  
  // For date-based unlocking, you could use:
  // const today = new Date();
  // const currentDay = today.getMonth() === 11 ? today.getDate() : 0;

  const isDayUnlocked = (day: number): boolean => {
    if (unlockAll) return true;
    // For date-based: return day <= currentDay;
    return true;
  };

  // Shuffle array for random door placement (keeps it interesting!)
  const shuffledData = [...calendarData].sort(() => Math.random() - 0.5);
  // Use original order for cleaner look:
  const displayData = calendarData;

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <h1 className="font-pixel text-4xl md:text-6xl text-primary text-shadow-pixel mb-2">
          Advent Calendar
        </h1>
        <p className="font-serif text-lg md:text-xl text-muted-foreground italic">
          A special gift, just for you ♡
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <span className="text-2xl animate-float" style={{ animationDelay: "0s" }}>🌲</span>
          <span className="text-2xl animate-float" style={{ animationDelay: "0.5s" }}>⭐</span>
          <span className="text-2xl animate-float" style={{ animationDelay: "1s" }}>🌲</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6"
        >
          <Button
            onClick={() => navigate("/my-adventures")}
            className="font-pixel bg-primary hover:bg-sage-light text-primary-foreground border-4 border-deep-brown shadow-lg"
          >
            <Book className="w-4 h-4 mr-2" />
            My Adventures
          </Button>
        </motion.div>
      </motion.div>

      {/* Calendar Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-4 sm:grid-cols-6 gap-3 md:gap-4 p-4 md:p-8 bg-card/90 backdrop-blur-sm rounded-2xl border-4 border-deep-brown shadow-2xl"
      >
        {displayData.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: 0.4 + index * 0.03,
              ease: "easeOut" 
            }}
          >
            <CalendarDoor
              data={day}
              isUnlocked={isDayUnlocked(day.day)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center mt-8 font-serif text-muted-foreground text-sm"
      >
        Click on each door to reveal a special message ✨
      </motion.p>
    </div>
  );
};
