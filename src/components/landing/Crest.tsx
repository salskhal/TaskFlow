import { cn } from "@/lib/utils";
import AnimatedShinyText from "./Shiny";


export default function Crest() {
  return (
    // <div className="bg-[#e7e9f1] py-2 px-8 rounded-lg border border-[#d5d3ef]">
    //   <p className="text-lg text-[#7e7e7e]">
    //     Part of <span className="text-orange-500 font-semibold">Upskill Projects</span>{" "}
    //   </p>
    // </div>
    <div
      className={cn(
        "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
      )}
    >
      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
        <span>✨  Part of <span className="text-orange-500 font-semibold">Upskill Projects</span>{" "} </span>
      </AnimatedShinyText>
    </div>
  );
}
