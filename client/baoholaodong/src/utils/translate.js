import axios from "axios";

export const translateText = async (text, targetLang) => {
    try {
        const response = await axios.post(
            "http://localhost:5001/translate",
            {
                q: text,
                source: "auto",
                target: targetLang,
                format: "text",
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        console.log(`✅ Kết quả dịch: "${text}" → "${response.data.translatedText}"`);
        return response.data.translatedText; // Trả về kết quả thay vì gọi setState
    } catch (error) {
        console.error("❌ Lỗi dịch:", error);
        return text;
    }
};
