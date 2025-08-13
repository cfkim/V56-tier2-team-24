import { createPortal } from "react-dom";

export default function SuccessMessage({
  isOpen,
  onClose,
  action,
}: {
  isOpen: boolean;
  onClose: () => void;
  action: string;
}) {
  const portal = document.getElementById("portal");
  if (!portal) return null;
  if (!isOpen) return null;

  const messages: { [key: string]: { bold: string; normal: string } } = {
    add: {
      bold: "Successfully Saved.",
      normal: "Patient has been added and checked-in!",
    },
    edit: {
      bold: "",
      normal: "Patient changes saved successfully",
    },
    delete: {
      bold: "Successfully Deleted.",
      normal: "Patient information has been deleted!",
    },
  };
  const { bold, normal } = messages[action];
  return createPortal(
    <div className="fixed top-1/2 left-1/2 flex h-14 w-80 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-4 rounded-xl bg-[#E9F6ED]">
      <svg
        width="44"
        height="48"
        viewBox="0 0 44 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.2244 32.6716C18.9837 32.672 18.7453 32.625 18.5229 32.5331C18.3005 32.4413 18.0984 32.3064 17.9282 32.1362L10.1512 24.3574C9.97597 24.1884 9.83616 23.9862 9.73992 23.7626C9.64368 23.539 9.59294 23.2984 9.59066 23.055C9.58837 22.8116 9.63459 22.5702 9.72661 22.3448C9.81863 22.1194 9.95462 21.9146 10.1266 21.7424C10.2986 21.5701 10.5032 21.4338 10.7285 21.3415C10.9537 21.2492 11.1951 21.2026 11.4385 21.2045C11.682 21.2065 11.9226 21.2569 12.1463 21.3528C12.37 21.4487 12.5724 21.5882 12.7417 21.7632L19.2225 28.2441L30.8917 16.5786C31.2355 16.2345 31.7018 16.0412 32.1881 16.041C32.6744 16.0408 33.1409 16.2339 33.4849 16.5776C33.8289 16.9214 34.0223 17.3877 34.0225 17.8741C34.0226 18.3604 33.8296 18.8269 33.4859 19.1709L20.5205 32.1362C20.3503 32.3064 20.1482 32.4413 19.9258 32.5331C19.7034 32.625 19.465 32.672 19.2244 32.6716Z"
          fill="#25A249"
        />
      </svg>

      <span className="font-semibold">{bold}</span>
      {normal}
    </div>,
    portal,
  );
}
