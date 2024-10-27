import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthBg from "@/assets/AuthBg.png";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:grid grid-cols-3 p-4">
      <div
        style={{ backgroundImage: `url(${AuthBg})` }}
        className="flex flex-col justify-between items-center text-center bg-cover rounded-lg py-10 px-3 gap-4"
      >
        <div className="text-white">
          <h2 className="font-bold text-xl md:text-3xl">
            Welcome to TaskFlow{" "}
          </h2>
          <p className="">Your Gateway to Effortless Management.</p>
        </div>
        <div className="text-white">
          <h3 className="font-bold text-lg  md:text-2xl">
            Aims for seamless collaboration
          </h3>
          <p>Effortlessly work together with your team in real-time.</p>
        </div>
      </div>
      <div className="flex items-center justify-center md:col-span-2">
        <Tabs defaultValue="signIn" className="w-full max-w-lg p-4 md:p-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signIn">Sign In</TabsTrigger>
            <TabsTrigger value="signUp">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signIn">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signUp">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
