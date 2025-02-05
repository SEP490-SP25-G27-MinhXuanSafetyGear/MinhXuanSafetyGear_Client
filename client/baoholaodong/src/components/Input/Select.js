// src/components/Select.js
import React from 'react';

const Select = ({ value, onChange, options, placeholder }) => {
	return (
		<div className="select-container">
			<select
				value={value} // Giá trị của select
				onChange={onChange} // Hàm thay đổi giá trị khi chọn
				className="form-select" // Lớp CSS của select
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				
				{/* Lặp qua các options và hiển thị các lựa chọn */}
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
