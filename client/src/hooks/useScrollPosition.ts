import { useState, useEffect, useRef } from 'react';

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        setScrollY(mainRef.current.scrollTop);
      }
    };

    if (!mainRef.current) {
      mainRef.current = document.getElementsByTagName('main')[0] as HTMLElement;
    }
    if (mainRef.current) {
      mainRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mainRef.current) {
        mainRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return { scrollY, mainRef };
};

export default useScrollPosition;
