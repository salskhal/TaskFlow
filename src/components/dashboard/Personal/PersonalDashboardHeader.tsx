// import CreatePTask from "./CreatePTask";
import CreatePTask from "./CreatePTask";

export default function PersonalDashboardHeader() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-4xl">Personal Dashboard</h1>
          <p>This is your personal space. Manage your personal tasks here.</p>
        </div>
        <CreatePTask />
      </div>
    </div>
  );
}
