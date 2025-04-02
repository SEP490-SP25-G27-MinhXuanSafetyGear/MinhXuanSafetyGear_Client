import React, { useState, useEffect } from "react";

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const banners = [
        {
            image: "http://baoholaodongminhxuan.com/images/common/slider1.jpg",
            link: "/product/1"
        },
        {
            image: "http://baoholaodongminhxuan.com/images/common/slider2.jpg",
            link: "/product/2"
        },
        {
            image: "http://baoholaodongminhxuan.com/images/common/slider3.jpg",
            link: "/product/3"
        },
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
            {banners.map((banner, index) => (
                <a
                    href={banner.link}
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <img
                        src={banner.image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover object-center"
                    />
                </a>
            ))}


        </div>
    );
};

export default Banner;