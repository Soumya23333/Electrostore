// src/components/Hero.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const slides = [
    {
      text: "Limited Time Offer 30% Off",
      heading: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      img: "https://purepng.com/public/uploads/large/purepng.com-headphoneelectronics-headset-headphone-941524669594jcbtd.png",
    },
    {
      text: "Exclusive Launch Deal 20% Off",
      heading: "Smartphones with Next-Gen Technology!",
      img: "https://english.onlinekhabar.com/wp-content/uploads/2023/09/all_colors__eppfcocn9mky_large-removebg-preview-1_clipdrop-enhance.png",
    },
    {
      text: "Special Discount 40% Off On Pc",
      heading: "Performance you need, price you love!",
      img: "https://www.gigabyte.com/FileUpload/Global/KeyFeature/1530/innergigabyteimages/bg1.png",
    },
  ];

  return (
    <section className="hero">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="hero-slide">
            <div className="hero-content">
              {/* ✅ Left: Text */}
              <div className="hero-text">
                <p>{slide.text}</p>
                <h1>{slide.heading}</h1>
                <div className="hero-buttons">
                  <button className="buy-btn">Buy now</button>
                  <button className="find-btn">Find more →</button>
                </div>
              </div>

              {/* ✅ Right: Image box */}
              <div className="hero-image">
                <img src={slide.img} alt={'Slide ${index + 1}'} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Hero;