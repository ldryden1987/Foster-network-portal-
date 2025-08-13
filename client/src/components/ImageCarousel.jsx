import React, { useState, useEffect, useRef } from "react";

export default function ImageCarousel() {
  const images = [
    "https://images.squarespace-cdn.com/content/v1/66ec3b49803ab81bf84f89e4/1726789423907-OMC6SOD7GIZ2NLNGMGM9/house-cat-lying-on-floor-8529064-scaled.jpg?format=2500w",
    "https://placecats.com/neo_banana/800/500",
    "https://placecats.com/millie/800/500"
  ];

  // clone first image to end for seamless loop
  const extendedImages = [...images, images[0]];

  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
      setTransitioning(true);
    }, 4000); // 4 seconds per image
    return () => clearInterval(intervalRef.current);
  }, []);

  // handle seamless loop
  useEffect(() => {
    if (index === extendedImages.length - 1) {
      // when animation finishes, reset instantly to first real image
      const timeout = setTimeout(() => {
        setTransitioning(false);
        setIndex(0);
      }, 700); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [index, extendedImages.length]);

  return (
    <div className="overflow-hidden relative max-w-5xl mx-auto my-8 rounded-xl shadow-lg">
      <div
        className="flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transitioning ? "transform 0.7s ease-in-out" : "none",
        }}
      >
        {extendedImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            className="w-full h-[500px] object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
