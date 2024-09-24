import React from 'react';

function MapHighlight() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative inline-block">
        <img src="map.png" alt="Delhi Map" className="w-full h-auto" />
        <div 
          className="absolute bg-red-500 opacity-50 rounded-full"
          style={{ width: '100px', height: '100px', top: '50px', left: '100px' }} // Adjust top and left values
        ></div>
      </div>
    </div>
  );
}

export default MapHighlight;
