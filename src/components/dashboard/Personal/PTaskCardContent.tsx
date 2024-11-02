import {
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { PersonalTask } from "@/types/PTask";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Tag, CircleDot, SquareMenu, Trash2 } from "lucide-react";
import TaskPriority from "./TaskPriority";
import SubTaskProgress from "./SubTaskProgress";
import { Button } from "@/components/ui/button";

import { usePersonalTaskStore } from "@/store/usePersonalTaskStore";
import { CreateSubTask } from "./CreateSubTask";

interface PTaskCardContentProps {
  task: PersonalTask;
}

export default function PTaskCardContent({ task }: PTaskCardContentProps) {
  const { title, description, subTasks = [], status, date, priority } = task;

  const { deleteSubtask, toggleSubtask, deletePTask } = usePersonalTaskStore();

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSubTaskToggle = async (subtaskId: string) => {
    await toggleSubtask(task._id, subtaskId);
  };

  const handleDeleteSubtask = async (subtaskId: string) => {
    await deleteSubtask(task._id, subtaskId);
  };

  const handleDeletePTask = async () => {
    await deletePTask(task._id);
  };

  return (
    <SheetContent side="right">
      <SheetHeader className="text-left">
        <SheetTitle className="text-2xl">{title}</SheetTitle>
      </SheetHeader>

      <div className="my-5">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CircleDot className="w-4 text-[#71717A]" />
              <span className="font-medium">Status</span>
            </div>
            <span className="text-muted-foreground capitalize">{status}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 text-[#71717A]" />
              <span className="font-medium">Due Date</span>
            </div>
            <span className="text-muted-foreground">{formattedDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-4 text-[#71717A]" />
              <span className="font-medium">Tag</span>
            </div>
            <TaskPriority priority={priority} />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <SquareMenu className="w-4 text-[#71717A]" />
              <span className="font-medium">Description</span>
            </div>
            <Textarea
              placeholder="Type your message here."
              value={description}
              className="h-30"
              aria-describedby=""
            />
          </div>

          <div className="flex items-center justify-between  ">
            <p className="">Subtasks</p>
            <SubTaskProgress subTasks={subTasks} />
          </div>

          <div className="space-y-2">
            {subTasks.map((subtask) => (
              <div
                key={subtask._id}
                className="flex items-center gap-2 rounded-lg border p-3 hover:bg-slate-50"
              >
                <Checkbox
                  id={subtask._id}
                  checked={subtask.isChecked}
                  onCheckedChange={() => handleSubTaskToggle(subtask._id)}
                  className="h-4 w-4"
                />
                <label
                  htmlFor={subtask._id}
                  className={`flex-1 cursor-pointer text-sm ${
                    subtask.isChecked
                      ? "text-muted-foreground line-through"
                      : ""
                  }`}
                >
                  {subtask.title}
                </label>

                <div
                  onClick={() => handleDeleteSubtask(subtask._id)}
                  className="cursor-pointer"
                >
                  <Trash2 className="w-4 text-red-600" />
                </div>
              </div>
            ))}
          </div>

          <CreateSubTask taskId={task._id} />
        </div>
      </div>

      <SheetFooter>
        <Button className="bg-red-700 hover:bg-red" onClick={handleDeletePTask}>
          Delete
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
