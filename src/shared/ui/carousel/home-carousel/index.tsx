import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { IMAGE_PATHS } from "@/shared/constants/assets-path";
import { URL_PATHS } from "@/shared/constants/url-path";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel";
import { cn } from "@/shared/utils/cn";

// ------------------------------------------------------------

const HOME_BANNER_ITEMS = [
  {
    id: "banner-kindergarten",
    src: IMAGE_PATHS.BANNER.KINDERGARTEN,
    alt: "유치원 찾기 배너",
    href: URL_PATHS.KINDERGARTEN,
  },
  {
    id: "banner-review-guide",
    src: IMAGE_PATHS.BANNER.REVIEW_GUIDE,
    alt: "리뷰 작성 가이드 배너",
    href: URL_PATHS.REVIEW,
  },
  {
    id: "banner-share-guide",
    src: IMAGE_PATHS.BANNER.SHARE_GUIDE,
    alt: "공유 가이드 배너",
    href: URL_PATHS.COMMUNITY,
  },
];

const AUTOPLAY_DELAY = 4000;

// ------------------------------------------------------------

const HomeCarousel = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    };

    onSelect();
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const startAutoplay = () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }

      autoplayTimerRef.current = setInterval(() => {
        if (carouselApi.canScrollNext()) {
          carouselApi.scrollNext();
        } else {
          carouselApi.scrollTo(0);
        }
      }, AUTOPLAY_DELAY);
    };

    const stopAutoplay = () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };

    startAutoplay();

    carouselApi.on("pointerDown", stopAutoplay);
    carouselApi.on("pointerUp", startAutoplay);

    return () => {
      stopAutoplay();
      carouselApi.off("pointerDown", stopAutoplay);
      carouselApi.off("pointerUp", startAutoplay);
    };
  }, [carouselApi]);

  const handlePointerEnter = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  const handlePointerLeave = () => {
    if (!carouselApi) {
      return;
    }

    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    autoplayTimerRef.current = setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, AUTOPLAY_DELAY);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onTouchStart={handlePointerEnter}
      onTouchEnd={handlePointerLeave}
    >
      <Carousel
        opts={{
          loop: true,
        }}
        setApi={setCarouselApi}
      >
        <CarouselContent className="-ml-0">
          {HOME_BANNER_ITEMS.map((banner, index) => {
            const isActive = currentSlide === index + 1;

            return (
              <CarouselItem key={banner.id} className="px-0.5">
                <Link
                  to={banner.href}
                  className={cn(
                    "block overflow-hidden rounded-xl transition-all duration-500 ease-out xl:rounded-3xl",
                    isActive ? "opacity-100" : "opacity-40"
                  )}
                >
                  <img
                    src={banner.src}
                    alt={banner.alt}
                    width={335}
                    height={190}
                    className={cn(
                      "h-full w-full object-cover transition-all duration-500 ease-out",
                      isActive ? "opacity-100" : "opacity-75"
                    )}
                    loading="lazy"
                  />
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <div className="pointer-events-none absolute bottom-3 right-4 z-10 flex flex-col items-end gap-1">
        <div className="flex gap-1">
          {HOME_BANNER_ITEMS.map((banner, index) => {
            const isActive = currentSlide === index + 1;
            return (
              <span
                key={`${banner.id}-dot`}
                className={cn(
                  "h-2 w-2 rounded-full bg-white/40 transition-all duration-300",
                  isActive ? "w-4 bg-white" : "opacity-70"
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
