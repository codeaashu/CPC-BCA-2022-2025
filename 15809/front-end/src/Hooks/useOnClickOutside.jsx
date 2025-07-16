import { useEffect } from 'react';

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Handle case when ref is not set yet
      if (!ref) return;
      
      // Handle array of refs
      if (Array.isArray(ref)) {
        // Check if click was inside any of the refs
        const isInside = ref.some(r => r?.current?.contains(event.target));
        if (!isInside) {
          handler(event);
        }
        return;
      }
      
      // Handle single ref
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      
      // Click was outside, call handler
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;