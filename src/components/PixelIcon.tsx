import { FC } from "react";

interface PixelIconProps {
  icon: string;
  className?: string;
}

export const PixelIcon: FC<PixelIconProps> = ({ icon, className = "" }) => {
  return (
    <span 
      className={`text-2xl md:text-3xl select-none ${className}`}
      style={{ imageRendering: "pixelated" }}
    >
      {icon}
    </span>
  );
};
