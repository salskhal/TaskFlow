import TaskPriority from "./TaskPriority";
import { ClipboardList } from "lucide-react";
import { PersonalTask } from "@/types/PTask";
import { SheetTrigger } from "@/components/ui/sheet";

interface PTaskCardTriggerProps {
  task: PersonalTask;
}

export default function PTaskCardTrigger({ task }: PTaskCardTriggerProps) {
  

  const { title, description, priority, subTasks = [] } = task;



  return (
    <SheetTrigger asChild >
      <div className="border rounded-lg p-5 flex flex-col justify-between cursor-pointer">
        <div className="  flex flex-col space-y-2">
          <TaskPriority priority={priority} />
          <div className="space-y-2">
            <h3 className="font-semibold text-xl line-clamp-1">{title}</h3>
            <p className="text-muted-foreground line-clamp-2">{description}</p>
          </div>
        </div>
        <div className="flex pt-2 items-center justify-end mt-2 border-t">
          <div className="flex items-center space-x-2">
            <ClipboardList className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {subTasks.length} subtask{subTasks.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </SheetTrigger>
  );
}
