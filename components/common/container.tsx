import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  size?: "small" | "medium" | "large" | "extra-large"; // Yeni boyut seçeneği eklendi
  className?: string;
}

const Container = ({
  children,
  size = "extra-large", // Varsayılan değer daha geniş yapıldı
  className = "",
}: ContainerProps) => {
  const getWidthClass = () => {
    switch (size) {
      case "small":
        return "max-w-xs sm:max-w-sm";
      case "medium":
        return "max-w-md sm:max-w-lg";
      case "large":
        return "max-w-lg sm:max-w-xl lg:max-w-2xl";
      case "extra-large": // Yeni genişlik seçeneği
      default:
        return "max-w-4xl sm:max-w-5xl lg:max-w-6xl";
    }
  };

  const baseClasses = "mx-auto p-4 sm:p-6 lg:p-8"; // Boşluk ayarları korundu
  const widthClass = getWidthClass();

  return (
    <div className={`${baseClasses} ${widthClass} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
