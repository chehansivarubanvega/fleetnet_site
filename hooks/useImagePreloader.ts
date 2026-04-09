'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useImagePreloader(urls: string[]) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const urlsKey = urls.join(',');

  useEffect(() => {
    if (urls.length === 0) {
      setImages([]);
      setProgress(100);
      setIsLoaded(true);
      return;
    }

    let isMounted = true;
    let loaded = 0;
    const total = urls.length;
    const loadedImages: HTMLImageElement[] = new Array(total);

    setIsLoaded(false);
    setProgress(0);

    urls.forEach((url, index) => {
      const img = new Image();
      img.src = url;

      const onDone = () => {
        if (!isMounted) return;
        loaded += 1;
        setProgress((loaded / total) * 100);
        if (loaded === total) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      img.onload = onDone;
      img.onerror = onDone;
      loadedImages[index] = img;
    });

    return () => {
      isMounted = false;
    };
  }, [urlsKey]);

  return { images, progress, isLoaded };
}
