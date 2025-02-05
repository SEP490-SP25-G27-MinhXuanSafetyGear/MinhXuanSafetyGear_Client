import { motion, AnimatePresence } from "framer-motion";

const SlideInPanel = ({ isPanelOpen, onClose, children }) => {
	return (
		<AnimatePresence>
			{isPanelOpen && (
				<>
					{/* Overlay background */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 bg-black z-40"
						onClick={onClose}
					/>
					{/* Sliding panel */}
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ duration: 0.3 }}
						className="fixed inset-y-0 right-0 left-1/4 w-3/4 bg-white shadow-xl z-50 overflow-y-auto"
					>
						<div className="flex items-center justify-between p-4 border-b">
							<h3 className="text-lg font-semibold">Add New Product</h3>
							<button
								onClick={onClose}
								className="text-gray-500 hover:text-black focus:outline-none"
							>
								✕
							</button>
						</div>
						<div className="p-4">{children}</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default SlideInPanel;
