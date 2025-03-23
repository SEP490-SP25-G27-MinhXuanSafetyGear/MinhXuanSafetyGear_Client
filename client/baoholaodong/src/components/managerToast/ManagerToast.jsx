// src/components/managerToast/ManagerToast.jsx
import React, { useEffect } from "react";
import "./style.css";

const ManagerToast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="manager-toast bottom-right">
            <p>{message}</p>
        </div>
    );
};

export default ManagerToast;