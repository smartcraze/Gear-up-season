import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/Spotlight";

export function SpotlightPreview() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/bgvideo.mp4"  // Adjust the path to your local video file
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Spotlight effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* Text Content */}
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Electricity <br /> Demand Projection.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Accurate electricity demand projections are essential for balancing
          supply and demand in energy grids. With real-time monitoring and forecasting
          technology, power suppliers can ensure efficiency, reduce waste, and
          maintain a reliable energy supply.
        </p>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          By forecasting future energy demands, providers can prepare for
          peak loads, avoid blackouts, and optimize resource use—ensuring sustainability
          and cost-effectiveness in energy management.
        </p>
      </div>
    </div>
  );
}
