import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children ,title}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
