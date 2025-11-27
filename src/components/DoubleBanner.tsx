// components/DoubleBanner.tsx
import { ExternalLink } from 'lucide-react';

interface DoubleBannerProps {
  leftBanner: {
    image: string;
    link: string;
    alt: string;
  };
  rightBanner: {
    image: string;
    link: string;
    alt: string;
  };
}

export default function DoubleBanner({ leftBanner, rightBanner }: DoubleBannerProps) {
  return (
    <section className="w-full py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 h-[180px] sm:h-[220px] md:h-[150px]">
          {/* Left Banner */}
          <a
            href={leftBanner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-1/2 h-full block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            aria-label={leftBanner.alt}
          >
            <img
              src={leftBanner.image}
              alt={leftBanner.alt}
              className="w-full h-full object-fit"
              loading="lazy"
            />
          </a>

          {/* Right Banner */}
          <a
            href={rightBanner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-1/2 h-full block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            aria-label={rightBanner.alt}
          >
            <img
              src={rightBanner.image}
              alt={rightBanner.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </section>
  );
}