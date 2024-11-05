"use client"
import { useEffect, useState } from 'react';

export function GridPattern() {
  const [dimensions, setDimensions] = useState({
    columns: 0,
    rows: 0
  });

  // Calculate grid dimensions based on viewport and cell size
  useEffect(() => {
    const calculateDimensions = () => {
      const cellSize = window.innerWidth >= 1024 ? 48 : // lg
                      window.innerWidth >= 768 ? 40 : // md
                      window.innerWidth >= 640 ? 24 : // sm
                      16; // default
      
      const columns = Math.ceil(window.innerWidth / cellSize);
      const rows = Math.ceil(window.innerHeight / cellSize);
      
      setDimensions({ columns, rows });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-neutral-600 overflow-hidden">
      <div className="w-full h-full flex flex-wrap justify-start items-start gap-x-px gap-y-px">
        {Array.from({ length: dimensions.rows }).map((_, row) =>
          Array.from({ length: dimensions.columns }).map((_, col) => {
            const index = row * dimensions.columns + col;
            return (
              <div
                key={`${col}-${row}`}
                className={`
                  w-4 h-4 
                  sm:w-6 sm:h-6 
                  md:w-10 md:h-10 
                  lg:h-12 lg:w-12 
                  flex-shrink-0 
                  rounded-[2px]
                  ${index % 2 === 0
                    ? "bg-gray-50 dark:bg-neutral-950"
                    : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                  }
                `}
              />
            );
          })
        )}
      </div>
    </div>
  );
}