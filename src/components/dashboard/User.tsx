import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/authStore";

export default function User() {
  const { user, logoutUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logoutUser(); // Call the logout API
    navigate("/"); // Redirect to login page after successful logout
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <img src={user.profile} alt={user.firstName} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44" >
        <DropdownMenuLabel >
          <span className="text-xs font-light">Signed in as</span>
          <p>{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
