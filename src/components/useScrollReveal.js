import { useEffect } from 'react';

/**
 * Attaches a single shared IntersectionObserver to all `.reveal` elements.
 * When an element crosses the threshold it gains the `.revealed` class
 * (which drives the CSS transition defined in index.css).
 *
 * Supports per-element delay via  data-delay="200"  (ms).
 */
export default function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay ?? 0;
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, Number(delay));
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
