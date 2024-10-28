import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  size?: "small" | "medium" | "large"; // changed to ize prop
  className?: string;
}

const Container = ({
  children,
  size = "large", // default value
  className = "",
}: ContainerProps) => {
  const getWidthClass = () => {
    switch (size) {
      case "small":
        return "max-w-xs sm:max-w-sm";
      case "medium":
        return "max-w-md sm:max-w-lg";
      case "large":
      default:
        return "max-w-lg sm:max-w-xl";
    }
  };

  const baseClasses = "mx-auto p-4 sm:p-6 lg:p-8";
  const widthClass = getWidthClass();

  return (
    <div className={`${baseClasses} ${widthClass} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
