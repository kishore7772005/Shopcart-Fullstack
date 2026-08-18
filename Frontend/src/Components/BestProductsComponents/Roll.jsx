import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Assets
import HandImg from "../../assets/Animations/Hand.png";

import P1 from "../../assets/BestProduct/P1.png";
import P2 from "../../assets/BestProduct/P2.png";
import P3 from "../../assets/BestProduct/P3.png";
import P4 from "../../assets/BestProduct/P4.png";
import P5 from "../../assets/BestProduct/P5.png";

const products = [P1, P2, P3, P4, P5];

const Roll = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % products.length);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[520px] h-[520px]">

        {/* SVG MASK (INLINE – NO FILE IMPORT) */}
        <svg
          viewBox="0 0 520 520"
          width="520"
          height="520"
          className="absolute inset-0"
        >
          <defs>
            <mask id="palmMask">
              {/* BLACK = hidden */}
              <rect width="520" height="520" fill="black" />

              {/* WHITE = palm area (adjust if needed) */}
              <ellipse
                cx="260"
                cy="310"
                rx="95"
                ry="75"
                fill="white"
              />
            </mask>
          </defs>

          {/* PRODUCT INSIDE PALM */}
          <foreignObject
            width="520"
            height="520"
            mask="url(#palmMask)"
          >
            <div className="w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={products[index]}
                  initial={{ opacity: 0, y: 70, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -70, scale: 0.7 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                  }}
                  className="w-44 h-64 object-contain"
                />
              </AnimatePresence>
            </div>
          </foreignObject>
        </svg>

        {/* HAND IMAGE ON TOP */}
        <img
          src={HandImg}
          alt="Hand"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
      </div>
    </div>
  );
};

export default Roll;
