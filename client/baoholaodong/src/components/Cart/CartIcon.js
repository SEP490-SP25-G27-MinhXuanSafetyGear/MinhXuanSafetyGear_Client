import React from 'react';

const CartIcon = ({ onClick }) => {
	const [itemCount, setItemCount] = React.useState(12);
	
	return (
		<div
			className="relative cursor-pointer flex items-center"
			onClick={onClick}
			title="Giỏ hàng"
		>
			{/* Biểu tượng giỏ hàng */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={2}
				stroke="currentColor"
				className="w-7 h-7 text-gray-600 hover:text-gray-800 transition-colors"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 6h14M7 13l4-8h6m-4 16a2 2 0 11-4 0 2 2 0 014 0z"
				/>
			</svg>
			
			{/* Số lượng sản phẩm */}
			{itemCount > 0 && (
				<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
					{itemCount}
				</span>
			)}
		</div>
	);
};

export default CartIcon;
