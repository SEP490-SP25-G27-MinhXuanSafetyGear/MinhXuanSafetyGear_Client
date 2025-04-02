import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
    {
        name: "Anh. Minh Nhật",
        role: "Developer",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        content:
            "Tôi đã lựa chọn Sudes Sport để dành tặng cho người yêu của mình những món quà thật ý nghĩa. Tôi rất hài lòng với dịch vụ chuyên nghiệp, chất lượng sản phẩm cũng như sự tận tình của Sudes Sport.",
    },
    {
        name: "Anh. Huỳnh Tuyến",
        role: "Customer Service",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        content:
            "Rất thích đồ của Sudes Sport, trước toàn ra mua trực tiếp, lần này đặt hàng online, được 2 hôm là có hàng, chuẩn mẫu mã, ship nhanh và chất lượng bền tốt nữa.",
    },
    {
        name: "Chị. Hồng Liêm",
        role: "Marketing Manager",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        content:
            "Biết đến Sudes Sport khi định sắm một số đồ dùng camping sau mùa dịch. Hàng hóa bao la tha hồ cho các bạn lựa khi đến đây.",
    },
    {
        name: "Anh. Đỗ Văn Cường",
        role: "Designer",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        content:
            "Giao diện website đẹp, dịch vụ tốt. Tôi đã mua vài món đồ thể thao ở đây và rất ưng ý.",
    },
    {
        name: "Chị. Lê Thu",
        role: "Kế toán",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        content:
            "Hàng chuẩn, chất lượng tốt, giao nhanh. Nhân viên hỗ trợ nhiệt tình.",
    },
    {
        name: "Anh. Trịnh Hoàng",
        role: "Sales",
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        content:
            "Shop uy tín, mua lần nào cũng hài lòng. Giá hợp lý, gói hàng chắc chắn.",
    },
    {
        name: "Chị. Vũ Linh",
        role: "Freelancer",
        avatar: "https://randomuser.me/api/portraits/women/7.jpg",
        content:
            "Mình đã giới thiệu bạn bè đến shop, ai cũng khen. Mẫu mã đa dạng, dễ lựa.",
    },
    {
        name: "Anh. Hùng Nguyễn",
        role: "Giáo viên",
        avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        content:
            "Đặt hàng nhanh, giao hàng đúng hẹn. Dịch vụ chăm sóc khách hàng tuyệt vời.",
    },
];

const FeedbacksStepSlide = () => {
    const [perPage, setPerPage] = useState(4);
    const [startIndex, setStartIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setPerPage(window.innerWidth < 1024 ? 1 : 4);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const canNext = startIndex + perPage < testimonials.length;
    const canPrev = startIndex > 0;

    const handleNext = () => {
        if (canNext) {
            setDirection(1);
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (canPrev) {
            setDirection(-1);
            setStartIndex(startIndex - 1);
        }
    };

    const visibleTestimonials = testimonials.slice(startIndex, startIndex + perPage);

    return (
        <section
            className="relative py-16 px-4 text-white bg-no-repeat bg-center bg-auto"
            style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/049/033/798/non_2x/3d-black-geometric-abstract-background-overlap-layer-on-dark-space-with-waves-lines-decoration-minimalist-modern-graphic-design-element-cutout-style-concept-for-banner-flyer-card-or-brochure-cover-vector.jpg')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <div className="relative max mx-auto z-10">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold uppercase text-left mb-2 text-red-700">
                            KHÁCH HÀNG NÓI VỀ CHÚNG TÔI
                        </h2>
                        <p className="text-sm text-gray-300 max-w-xl text-left">
                            Hơn +50,000 khách hàng cảm nhận như thế nào về Bảo hộ lao động Minh Xuân.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrev}
                            disabled={!canPrev}
                            className="w-9 h-9 flex items-center justify-center bg-white text-black rounded-full disabled:opacity-50"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!canNext}
                            className="w-9 h-9 flex items-center justify-center bg-white text-black rounded-full disabled:opacity-50"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={startIndex}
                        initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                        transition={{ duration: 0.4 }}
                        className={`grid grid-cols-1 ${perPage >= 4 ? "lg:grid-cols-4" : ""} gap-6`}
                    >
                        {visibleTestimonials.map((item, idx) => (
                            <div
                                key={idx}
                                className="relative bg-white text-black p-6 rounded-lg shadow-lg text-left"
                            >
                                <div className="absolute top-6 right-6 text-6xl text-gray-200 leading-none select-none">
                                    &rdquo;
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={item.avatar}
                                        alt={item.name}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold">{item.name}</h4>
                                        <span className="text-sm text-gray-500">{item.role}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700">"{item.content}"</p>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default FeedbacksStepSlide;