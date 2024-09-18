import Bargraph from "@/components/Bargraph";
import { CardDemo } from "@/components/Card";
import { SpotlightPreview } from "@/components/Spotlight";
import { Spotlight } from "@/components/ui/Spotlight";


export default function Home() {
  return (
    <>
    <SpotlightPreview/>
    <div className="bg-slate-950 h-screen">

      {/* <CardDemo/> */}
      <Bargraph/>
    </div>
    </>
  );
}
