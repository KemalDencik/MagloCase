import Exclude from "public/assets/exclude.png";

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({
  message = "Signing you in...",
}: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <img
        src={Exclude}
        alt="Logo"
        className="w-14 h-14 animate-bounce object-contain mb-3"
      />
      <p className="text-gray-700 font-medium">{message}</p>
    </div>
  );
};
