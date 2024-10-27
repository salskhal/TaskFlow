import Logo from "@/assets/task-flow.png";
// import { verifyOTP } from "../../services/auth";

import OTPForm from "@/components/Auth/OTPForm";

export default function OTPVerifyPage() {
  return (
    
      <main className="min-h-screen flex flex-col justify-between py-10 px-5 items-center">
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center text-center ">
          <div>
            <h2 className="text-2xl font-semibold">OTP Verification</h2>
            <p className="text-[#9C9AA5] text-lg">
              An email containing your One Time Pin (OTP) has been sent to your
              email address
            </p>
          </div>
          <OTPForm />
        </div>
        <div></div>
      </main>
    
  );
}
