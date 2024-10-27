import { Button } from "../../ui/button";
import { useEffect } from "react";
import PTaskCard from "./PTaskCard";
import { usePersonalTaskStore } from "@/store/usePersonalTaskStore";
import { Loader2 } from "lucide-react";
import { PersonalTask } from "@/types/PTask";

export default function PersonalDashboardContent() {
  const { tasks, fetchTasks, isLoading, error } = usePersonalTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-48">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-48 space-y-4">
        <p className="text-red-500">Error: {error}</p>
        <Button onClick={() => fetchTasks()} variant="outline" className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const hasCompleteTasks = Array.isArray(tasks) && tasks.length > 0;

  return (
    <div className="space-y-4 mt-3">
      {hasCompleteTasks ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task: PersonalTask, index: number) => (
            <PTaskCard key={task._id || index} task={task} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 text-gray-500">
          <p>You do not have any tasks</p>
        </div>
      )}
    </div>
  );
}
