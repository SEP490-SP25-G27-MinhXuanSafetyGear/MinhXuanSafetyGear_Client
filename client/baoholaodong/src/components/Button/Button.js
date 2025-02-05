// src/components/Button.js
import React from 'react';

const Button = ({ text, onClick, type, className, disabled }) => {
	return (
		<button
			type={type || 'button'}
			onClick={onClick}
			className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300
        ${disabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none'}
        ${className}`}
			disabled={disabled}
		>
			{text}
		</button>
	);
};

export default Button;
