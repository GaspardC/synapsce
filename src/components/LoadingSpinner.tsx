
import React from 'react';

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  message = "Recherche en cours..." 
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 rounded-full animate-ping bg-synapsce opacity-20"></div>
        <div className="absolute inset-1 rounded-full animate-pulse-light bg-gradient-to-r from-synapsce to-synapsceGreen"></div>
        <div className="absolute inset-3 rounded-full bg-white"></div>
      </div>
      
      {message && (
        <p className="text-synapsce font-medium text-center animate-pulse-light">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
