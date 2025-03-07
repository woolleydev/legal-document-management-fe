import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
  return (
    <div
      className={`border rounded-lg shadow-md p-4 bg-white hover:shadow-lg cursor-pointer transition-all ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="p-2">{children}</div>;
};
