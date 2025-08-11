import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Sidebar({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const sidebarPortal = document.getElementById("sidebar");
  if (!sidebarPortal) return null;

  return createPortal(
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-30 bg-black/40 sm:hidden"
      />
      <aside
        aria-modal="true"
        className="bg-background fixed top-0 left-0 z-50 h-full w-3/4 overflow-y-auto p-4 shadow-xl sm:hidden"
      >
        {children}
      </aside>
    </>,
    sidebarPortal,
  );
}
