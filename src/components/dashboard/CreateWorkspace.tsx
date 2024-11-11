import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useToast } from "@/hooks/use-toast";
import { CreateWorkspaceInput } from "@/types/Workspace";

interface CreateWorkspaceProps {
  onOpenChange: (open: boolean) => void;
}

// export default function CreateWorkspace() {
export default function CreateWorkspace({
  onOpenChange,
}: CreateWorkspaceProps) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { addWorkspace, setWorkspace, isLoading } = useWorkspaceStore();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || isLoading) return;

    try {
      const workspaceData: CreateWorkspaceInput = {
        name: name.trim(),
      };

      const response = await addWorkspace(workspaceData);

      if (!response || !response._id) {
        throw new Error("Invalid response from server");
      }

      const workspaceId = response._id;
      setWorkspace(workspaceId);
      navigate(`/dashboard/${workspaceId}`);

      toast({
        title: "Workspace Created",
        description: `Successfully created workspace "${name}"`,
      });

      // Reset form and close dialog
      setName("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create workspace",
        variant: "destructive",
      });
    }

    // Here you would typically handle the workspace creation
    // console.log("Creating workspace:", name);
  };
  const handleCancel = () => {
    setName("");
    onOpenChange(false);
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Workspace
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] px-10">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>
              Add a new workspace to manage Projects and Members
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace Name</Label>
              <Input
                id="name"
                placeholder="Enter workspace name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                disabled={isLoading}
                maxLength={50}
                required
                autoFocus
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="mr-2"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || isLoading}
              className="min-w-[100px]"
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
