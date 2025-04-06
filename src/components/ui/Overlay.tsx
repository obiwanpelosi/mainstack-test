import { useEffect } from "react";

interface OverlayProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Overlay = ({
  isVisible,
  onClose,
  children,
  className = "",
}: OverlayProps) => {
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const navbar = document.querySelector("header");

    if (isVisible) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      if (navbar) {
        navbar.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "0";
      if (navbar) {
        navbar.style.paddingRight = "0";
      }
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.paddingRight = "0";
      if (navbar) {
        navbar.style.paddingRight = "0";
      }
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-20 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div className={className} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
