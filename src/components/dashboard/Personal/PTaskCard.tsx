import { Sheet } from "@/components/ui/sheet";

import { PersonalTask } from "@/types/PTask";
import PTaskCardTrigger from "./PTaskCardTrigger";
import PTaskCardContent from "./PTaskCardContent";

interface PTaskCardProps {
  task: PersonalTask;
}

export default function PTaskCard({ task }: PTaskCardProps) {
  return (
    <Sheet>
      <PTaskCardTrigger task={task} />
      <PTaskCardContent task={task} />
    </Sheet>
  );
}
