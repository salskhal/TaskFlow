import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Crest from "./Crest";

export default function Hero() {
  return (
    <section
      className="max-w-[1280px] mx-auto px-3 min-h-[60vh] md:min-h-[90vh] flex flex-col items-center justify-center space-y-10"
      id="home"
    >
      <Crest />
      <div className="flex flex-col items-center text-center space-y-5 w-[90%] mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold">
          Simplified Task Management, Increase your{" "}
          <span className="bg-gradient bg-clip-text text-transparent">
            Productivity
          </span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-50">
          Create workspace, collaborate, plan projects, stay on track, and
          deliver on time without overworking your team
        </p>
        <Link to="/auth">
          <Button className="text-base md:text-lg lg:text-xl px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5">
            Get started
          </Button>
        </Link>
      </div>
    </section>
  );
}
