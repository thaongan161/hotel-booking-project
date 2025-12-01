import { useEffect, useState } from 'react';

interface ParallaxImageProps {
  src: string;
  height?: number;
  speed?: number; // tốc độ parallax
}

export default function ParallaxImage({ src, height = 500, speed = 0.5 }: ParallaxImageProps) {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY * speed);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      className="w-full bg-cover bg-center relative overflow-hidden"
      style={{
        height: `${height}px`,
        backgroundImage: `url('${src}')`,
        backgroundPositionY: `-${offsetY}px`,
        transition: 'background-position 0.1s ease-out',
      }}
    />
  );
}
