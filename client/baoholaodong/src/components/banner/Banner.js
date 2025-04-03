import React, { useState, useEffect } from "react";

const Banner = ({ banners = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    useEffect(() => {
        if (banners.length === 0) return; // Đảm bảo có ảnh

        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [currentIndex, banners.length]); // Thêm dependency để cập nhật

    return (
        <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
            {banners.length > 0 ? (
                banners.map(({ imageUrl, postUrl }, index) => (
                    <a
                        href={postUrl}
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        <img
                            src={imageUrl}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                                e.target.src = "/fallback.jpg"; // Ảnh mặc định nếu bị lỗi
                            }}
                        />
                    </a>
                ))
            ) : (
                <p className="text-center text-gray-500">Không có banner nào để hiển thị.</p>
            )}
        </div>
    );
};

export default Banner;
