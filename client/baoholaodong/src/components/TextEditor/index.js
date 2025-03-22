import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS cho Quill
import DOMPurify from "dompurify";
const TextEditor = ({ width = "100%", height = "300px" ,value="",setValue}) => {

    // ✅ Cấu hình toolbar đầy đủ
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"], // Chữ đậm, nghiêng, gạch chân
            [{ list: "ordered" }, { list: "bullet" }], // Danh sách có thứ tự và không thứ tự
            ["blockquote", "code-block"], // Blockquote, code block
            [{ align: [] }], // Căn lề trái, phải, giữa
            [{ color: [] }, { background: [] }], // Màu chữ và nền chữ
            ["link", "image", "video"], // Chèn liên kết, ảnh, video
            ["clean"], // Xóa định dạng
        ],
    };

    // ✅ Cho phép các kiểu định dạng văn bản
    const formats = [
        "header", "bold", "italic", "underline", "strike",
        "list", "bullet", "blockquote", "code-block",
        "align", "color", "background", "link", "image", "video"
    ];

    return (
        <div style={{ width ,height }}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
                style={{ height }}
            />
        </div>
    );
};
const DisplayContent = ({ content }) => {
    // Lọc mã độc XSS để đảm bảo an toàn
    const safeContent = DOMPurify.sanitize(content);

    return (
        <div dangerouslySetInnerHTML={{ __html: safeContent }} />
    );
};
export  {TextEditor,DisplayContent};
