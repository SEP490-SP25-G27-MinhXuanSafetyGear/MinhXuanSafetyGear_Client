// src/components/Input.js
import React from 'react';

const Input = ({ type, value, onChange, placeholder, name, required, className ,style}) => {
	return (
		<div className="mb-4"> {/* Thêm khoảng cách dưới mỗi input */}
			<input
				type={type || 'text'}  // Mặc định kiểu 'text' nếu không cung cấp type
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				name={name}
				required={required}
				style={style}
				className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
			/>
		</div>
	);
};

export default Input;
