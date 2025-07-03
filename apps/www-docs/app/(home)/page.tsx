import Homepage from "@/components/home/home";
import { Spotlight } from "@unlogg/ui/components/spotlight";

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col justify-center overflow-hidden text-center">
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .1) 0, hsla(210, 100%, 55%, .04) 50%, hsla(210, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .07) 0, hsla(210, 100%, 55%, .04) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 45%, .04) 80%, transparent 100%)"
      />
      <Homepage />

      <>
        <h1 className="text-3xl">Cooming Soon!</h1>
      </>
    </main>
  );
}
