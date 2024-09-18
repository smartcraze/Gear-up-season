"use client";
import { cn } from "@/lib/utils";

const cardData = [
  {
    backgroundImage:
      "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
    description: "This is the first description for the card.",
  },
  {
    backgroundImage:
      "https://images.unsplash.com/photo-1495567225838-407140eaf58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjYzMTF8MHwxfGFsbHwxfHx8fHx8fHwxNjE2NTQ0NzY1&ixlib=rb-1.2.1&q=80&w=1080",
    description: "This is the second description for the card.",
  },
  // Add more objects as needed
];

export function CardDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center mx-auto max-w-5xl px-4">
      {cardData.map((card, index) => (
        <div key={index} className="max-w-xs w-full group/card">
          <div
            className={cn(
              "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4"
            )}
            style={{
              backgroundImage: `url(${card.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
            <div className="text content">
              <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
