import { FC } from "react";
import { motion } from "framer-motion";

interface SnowflakeProps {
  delay: number;
  duration: number;
  left: string;
  size: number;
}

export const Snowflake: FC<SnowflakeProps> = ({ delay, duration, left, size }) => {
  return (
    <motion.div
      className="fixed pointer-events-none text-snow/80 font-pixel"
      style={{ 
        left, 
        top: -20,
        fontSize: size,
      }}
      animate={{
        y: ["0vh", "105vh"],
        rotate: [0, 360],
        opacity: [0.8, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      ❄
    </motion.div>
  );
};

export const SnowfallEffect: FC = () => {
  const snowflakes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 8,
    left: `${Math.random() * 100}%`,
    size: 12 + Math.random() * 16,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} {...flake} />
      ))}
    </div>
  );
};
