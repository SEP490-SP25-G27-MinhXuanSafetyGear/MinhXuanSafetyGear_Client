const getUserLanguage = async () => {
    try {
        const response = await fetch("https://ipinfo.io/json");
        const data = await response.json();
        console.log("🌍 Dữ liệu IP:", data);

        const countryCode = data.country || "VN"; // Mặc định VN nếu không có dữ liệu

        const languageMap = {
            "VN": "vi",
            "US": "en",
            "FR": "fr",
            "DE": "de",
            "JP": "ja",
            "CN": "zh",
        };

        const lang = languageMap[countryCode] || "vi";
        console.log("🌍 Ngôn ngữ sử dụng:", lang);
        return lang;
    } catch (error) {
        console.error("❌ Lỗi khi lấy địa chỉ IP:", error);
        return "vi"; // Nếu lỗi, mặc định tiếng Việt
    }
};

export default getUserLanguage;
