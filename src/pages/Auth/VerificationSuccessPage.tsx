import Logo from "@/assets/task-flow.png";
import Sucess from "@/assets/Success1.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function VerificationSuccessPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between py-10 px-5 items-center">
      <div>
        <img src={Logo} alt="" />
      </div>
      <div className="flex flex-col items-center justify-center text-center ">
        <div className="flex flex-col items-center space-y-3">
          <img src={Sucess} alt="" />
          <h2 className="text-2xl font-semibold">
            Account Successfully Created
          </h2>
          <p className="text-[#9C9AA5] text-lg">
            Welcome aboard! Start your success journey with TaskFlow!
          </p>
        </div>
      </div>
      <Link to="/auth">
        <Button type="submit" className="  font-semibold ">
          Login
        </Button>
      </Link>
    </main>
  );
}
