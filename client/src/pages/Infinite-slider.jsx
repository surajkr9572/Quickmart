import React, { useEffect, useRef } from 'react';

const CARD_WIDTH = 160;
const SPACING = 32;
const OFFSET = 23;
const INTERVAL = CARD_WIDTH + SPACING + OFFSET;

// Sample data
const list = [
  {
    title: 'Orange',
    img: 'images/15.png',
    price: '$5.50',
  },
  {
    title: 'Tangerine',
    img: 'images/11.webp',
    price: '$3.00',
  },
  {
    title: 'Raspberry',
    img: 'images/12.jpg',
    price: '$10.00',
  },
  {
    title: 'Lemon',
    img: 'images/13.jpg',
    price: '$5.30',
  },
  {
    title: 'Avocado',
    img: 'images/16.png',
    price: '$15.70',
  },
  {
    title: 'Lemon 2',
    img: 'images/15.png',
    price: '$8.00',
  },
  {
    title: 'Banana',
    img: 'images/16.png',
    price: '$7.50',
  },
  {
    title: 'Watermelon',
    img: 'images/13.jpg',
    price: '$12.20',
  },
];

function InfinteSlider() {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  // Scroll the carousel to the right
  const scrollRight = async () => {
    while (true) {
      const scrollLeft = containerRef.current?.scrollLeft;
      const clientWidth = containerRef.current?.clientWidth;
      const scrollWidth = containerRef.current?.scrollWidth;

      if (scrollLeft !== undefined && clientWidth !== undefined && scrollWidth !== undefined) {
        if (scrollLeft > 8 * (CARD_WIDTH + SPACING)) {
          containerRef.current?.scrollTo({
            left: scrollLeft - 8 * (CARD_WIDTH + SPACING),
            behavior: 'instant',
          });
        } else {
          containerRef.current?.scrollBy({
            left: INTERVAL,
            behavior: 'smooth',
          });
        }
      }

      // Pause for a while before the next scroll action
      await new Promise((r) => setTimeout(r, 1500));
    }
  };

  useEffect(() => {
    scrollRight();
  }, []);

  return (
    <div ref={wrapperRef} className="flex h-full items-center bg-white">
      <div
        ref={containerRef}
        className="flex p-8 overflow-hidden"
        style={{ gap: `${SPACING}px` }}
      >
        {list.concat(list).map((item, index) => (
          <div key={index} style={{ minWidth: `${CARD_WIDTH}px` }} className="flex flex-col gap-2 rounded-lg shadow-sm">
            <div className="overflow-visible p-0">
              <img
                width={CARD_WIDTH}
                height={140}
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </div>
            {/* <div className="flex justify-between">
              <b>{item.title}</b>
              <p className="text-gray-500">{item.price}</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfinteSlider;
