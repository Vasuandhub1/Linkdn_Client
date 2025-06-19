import { useState, useRef, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { styled } from "styled-components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Styled Components
const CarouselWrapper = styled(Box)`
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 8px;
`;

const SlideTrack = styled(Box)`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled(Box)`
  flex: 0 0 100%;
  max-width: 100%;
`;

const ImagePreview = styled.img<{ loading?: boolean }>`
  width: 100%;
  height: 300px;
  object-fit: contain;
  border-radius: 8px;
  display: ${({ loading }) => (loading ? 'none' : 'block')};
`;

const NavButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.7);
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

const LeftButton = styled(NavButton)`
  left: 8px;
`;

const RightButton = styled(NavButton)`
  right: 8px;
`;

const DotContainer = styled(Box)`
  position: absolute;
  bottom: 10px;
  left: 50%;
  display: flex;
  gap: 8px;
  transform: translateX(-50%);
`;

const Dot = styled(Box)<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#1976d2" : "#ccc")};
  cursor: pointer;
`;

interface ImageCarouselProps {
  urls: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ urls = [] }) => {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : urls.length - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev < urls.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    intervalRef.current = setInterval(handleNext, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const pauseAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resumeAutoSlide = () => {
    intervalRef.current = setInterval(handleNext, 5000);
  };

  return (
    <CarouselWrapper
      onMouseEnter={pauseAutoSlide}
      onMouseLeave={resumeAutoSlide}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <LeftButton onClick={handlePrev}>
        <ChevronLeftIcon />
      </LeftButton>
      <RightButton onClick={handleNext}>
        <ChevronRightIcon />
      </RightButton>
      <SlideTrack sx={{ transform: `translateX(-${index * 100}%)` }}>
        {urls.map((url, idx) => (
          <Slide key={idx} style={{ textAlign: "center" }}>
            {loading && (
              <div style={{ paddingBottom: "1rem" }}>
                <DotLottieReact
                  src="https://lottie.host/dbc79905-a7c9-45db-a2c2-b6defb27385a/vMdwoDShKY.lottie"
                  loop
                  autoplay
                />
              </div>
            )}
            <ImagePreview
              src={url}
              alt={`slide-${idx}`}
              loading={loading}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </Slide>
        ))}
      </SlideTrack>

      <DotContainer>
        {urls.map((_, i) => (
          <Dot key={i} active={i === index} onClick={() => setIndex(i)} />
        ))}
      </DotContainer>
    </CarouselWrapper>
  );
};

export default ImageCarousel;
