import Alert from "@/components/Alert";
import Bargraph from "@/components/Bargraph";
import { CardDemo } from "@/components/Card";
import { SpotlightPreview } from "@/components/Spotlight";
import { Spotlight } from "@/components/ui/Spotlight";
// import "./styles.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
    <SpotlightPreview/>
    <div className="bg-slate-950 h-screen">
      <Alert/>
      <ToastContainer />
      {/* <CardDemo/> */}
      <Bargraph/>

    </div>
    </>
  );
}
