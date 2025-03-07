import React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-[2px] z-50">
        <div className="bg-white rounded-lg shadow-lg w-[1000px] p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => onOpenChange(false)}
          >
            ✖
          </button>
          {children}
        </div>
      </div>
    );
  };

interface DialogContentProps {
  children: React.ReactNode;
}

export const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
  return <div className="mt-4">{children}</div>;
};

interface DialogHeaderProps {
  children: React.ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return <div className="text-lg font-semibold">{children}</div>;
};

interface DialogTitleProps {
  children: React.ReactNode;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};
