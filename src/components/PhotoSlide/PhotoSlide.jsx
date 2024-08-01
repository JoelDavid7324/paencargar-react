import "./photoSlider.css";
import { useState, useEffect, useMemo } from "react";

export const PhotoSlide = () => {
  const carouselImages = useMemo(
    () => [
      "https://picsum.photos/id/1003/1000/150",
      "https://picsum.photos/id/1020/1000/150",
      "https://picsum.photos/id/1013/1000/150",
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex, carouselImages]);

  const translateX = `translateX(${currentIndex * -100}%)`;

  return (
    <div>
      <figure className="images--container">
        <div className="slider--shadow"></div>
        <div className="images--pack" style={{ transform: translateX }}>
          {carouselImages.map((images, index) => {
            return <img key={index} src={images} alt="image" />;
          })}
        </div>
      </figure>
    </div>
  );
};
