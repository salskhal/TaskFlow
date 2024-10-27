import PersonalDashboardContent from "@/components/dashboard/Personal/PersonalDashboardContent";
import PersonalDashboardHeader from "@/components/dashboard/Personal/PersonalDashboardHeader";

export default function PersonalDashboard() {
  return (
    <main className="p-10">
      <PersonalDashboardHeader />
      <PersonalDashboardContent />
    </main>
  );
}
