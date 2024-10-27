// DashboardImage.tsx

import DashboardPNG from "@/assets/Dashboard.png";

export default function DashboardImage() {
  return (
    <div className="flex justify-center items-center my-10 max-w-[1280px] mx-auto px-6" id="features">
      <img
        src={DashboardPNG}
        alt="dashboard"
        className="w-full max-w-6xl  h-auto object-contain shadow-xl rounded-lg"
      />
    </div>
  );
}
