import { useNavigate, useParams } from "react-router-dom";
// Test above
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useAuthStore } from "@/store/authStore";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import CreateWorkspace from "./CreateWorkspace";
import { useWorkspaceStore } from "@/store/workspaceStore";

interface ComboBoxProps {
  onWorkspaceChange: (workspaceId: string) => void;
}

interface Workspace {
  workspaceId: string;
  name: string;
  image?: string;
}

interface PersonalSpace {
  value: string;
  name: string;
  image: string;
}

type WorkspaceSelection = Workspace | PersonalSpace;

export default function ComboBox({ onWorkspaceChange }: ComboBoxProps) {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const workspaces = user.workspaces;

  const navigate = useNavigate();
  const params = useParams();

  const { currentWorkspace, setWorkspace } = useWorkspaceStore(); // Use Zustand to track the current workspace#

  // Sync workspace from URL on mount and when URL changes
  useEffect(() => {
    const workspaceId = params.workspaceId || "personal";
    if (workspaceId !== currentWorkspace) {
      setWorkspace(workspaceId);
    }
  }, [params.workspaceId, currentWorkspace, setWorkspace]);

  // Guard clause for unauthenticated state
  if (!user) {
    return null;
  }

  //   tweaking to make dynamic
  const personalSpace = {
    value: "personal",
    name: `${user.firstName} ${user.lastName}`,
    image: user.profile,
  };

  const getCurrentSelection = (): WorkspaceSelection => {
    if (currentWorkspace === "personal") return personalSpace;
    return (
      workspaces.find((w) => w.workspaceId === currentWorkspace) ||
      personalSpace
    );
  };

  const currentSelection = getCurrentSelection();

  const handleWorkspaceSelect = (workspaceId: string) => {
    setWorkspace(workspaceId); // Update workspace in Zustand store
    setOpen(false);

    // Update URL based on workspace selection
    navigate(
      workspaceId === "personal" ? "/dashboard" : `/dashboard/${workspaceId}`
    );
    onWorkspaceChange(workspaceId);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          <div className="flex items-center gap-2">
            {"image" in currentSelection ? (
              <img
                src={currentSelection.image}
                alt={currentSelection.name}
                className="w-4 h-4 rounded-full"
              />
            ) : (
              <div className="w-4 h-4 rounded-full bg-gray-300" />
            )}
            {currentSelection.name}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search Workspace..." />
          <CommandList>
            <CommandEmpty>No workspace found.</CommandEmpty>
            <CommandGroup heading="Personal Account">
              <CommandItem
                onSelect={() => handleWorkspaceSelect("personal")}
                className="flex items-center gap-2"
              >
                <img
                  src={user.profile}
                  alt={user.firstName}
                  className="w-4 h-4 rounded-full"
                />
                {user.firstName} {user.lastName}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    currentWorkspace === "personal"
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Workspaces">
              {workspaces.map((workspace) => (
                <CommandItem
                  key={workspace.workspaceId}
                  onSelect={() => handleWorkspaceSelect(workspace.workspaceId)}
                >
                  {workspace.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentWorkspace === workspace.workspaceId
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <CreateWorkspace
                  onOpenChange={(open) => {
                    if (!open) setOpen(false);
                  }}
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
