import React, { useState } from "react";
import { Building2 } from "lucide-react";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = "",
  fallbackTitle,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackTitle || "Dokumentasi Madrasah"}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#14532d] via-[#15803d] to-[#166534] text-white/90 p-6 text-center ${className}`}
      >
        <Building2 className="w-8 h-8 mb-2 text-amber-300" aria-hidden="true" />
        <span className="text-xs font-medium leading-snug max-w-[20ch]">
          {fallbackTitle || alt || "Dokumentasi Madrasah"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
