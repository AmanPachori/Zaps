import { Appbar } from "./components/Appbar";
import { Hero } from "./components/Hero";
import { HeroVideo } from "./components/Herovideo";

export default function Home() {
  return (
    <div className="">
      <Appbar />
      <Hero />
      <div className="flex pt-8 w-full justify-center">
        <HeroVideo />
      </div>
    </div>
  );
}
