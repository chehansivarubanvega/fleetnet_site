'use client';

import { useState, useEffect, useRef } from 'react';

export function useImagePreloader(urls: string[]) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const loadedCount = useRef(0);

  useEffect(() => {
    if (urls.length === 0) {
      setIsLoaded(true);
      return;
    }

    const loadedImages: HTMLImageElement[] = [];
    let isMounted = true;

    urls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (!isMounted) return;
        loadedCount.current += 1;
        setProgress((loadedCount.current / urls.length) * 100);
        
        if (loadedCount.current === urls.length) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
        if (!isMounted) return;
        loadedCount.current += 1;
        setProgress((loadedCount.current / urls.length) * 100);
        if (loadedCount.current === urls.length) {
          setIsLoaded(true);
        }
      };
      loadedImages[index] = img;
    });

    setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, [urls]);

  return { images, progress, isLoaded };
}
