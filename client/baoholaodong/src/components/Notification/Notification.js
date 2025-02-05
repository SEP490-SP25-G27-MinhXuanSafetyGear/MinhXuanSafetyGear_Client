import React from 'react';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Notification = ({ message, type, duration }) => {
	const [visibleMessage, setVisibleMessage] = React.useState(message);
	
	React.useEffect(() => {
		if (message) {
			setVisibleMessage(message); // Cập nhật tin nhắn mới
			
			// Sau khi 3 giây, ẩn tin nhắn
			const timer = setTimeout(() => {
				setVisibleMessage(null); // Ẩn tin nhắn sau khi hết thời gian
			}, duration);
			
			return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount hoặc message thay đổi
		}
	}, [message, duration]);
	
	if (!visibleMessage) return null; // Nếu không có tin nhắn, không render gì
	
	return (
		<div
			className={`fixed top-20 right-5 p-4 flex items-center gap-2 rounded-lg shadow-lg text-white ${
				type === 'success' ? 'bg-green-500' : 'bg-red-500'
			}`}
		>
			{type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
			<span>{visibleMessage}</span>
		</div>
	);
};

export default Notification;
