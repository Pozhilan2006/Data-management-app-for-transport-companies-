import type React from "react"

export const WorldMapBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M250,150 Q400,50 550,150 T850,150 Q700,250 850,350 T550,450 Q400,550 250,450 T-50,350 Q100,250 -50,150 T250,150"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="250" cy="150" r="5" fill="currentColor" />
        <circle cx="550" cy="150" r="5" fill="currentColor" />
        <circle cx="850" cy="150" r="5" fill="currentColor" />
        <circle cx="850" cy="350" r="5" fill="currentColor" />
        <circle cx="550" cy="450" r="5" fill="currentColor" />
        <circle cx="250" cy="450" r="5" fill="currentColor" />
        <circle cx="-50" cy="350" r="5" fill="currentColor" />
        <circle cx="-50" cy="150" r="5" fill="currentColor" />
      </svg>
    </div>
  )
}

