import { useEffect, type ComponentPropsWithoutRef, type FC } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export interface ModalProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center ">
      <div className="bg-white p-4 rounded-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <Button
          variant={"destructive"}
          size="sm"
          className="absolute top-2 right-2"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X />
        </Button>
      </div>
    </div>,
    document.body
  );
};
