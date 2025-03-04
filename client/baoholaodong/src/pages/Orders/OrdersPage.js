import React, { useState, useEffect, useContext } from "react";
import { Eye, Trash2 } from "lucide-react";
import { OrderContext } from "../../../contexts/OrderContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

const OrdersPage = () => {
  const navigate = useNavigate();
  const { orders, loading, page, setPage, search, setSearch } = useContext(OrderContext) || {};

  const handleView = (orderId) => navigate(`/manager/order/${orderId}`);
  const handleDelete = (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      console.log("Xóa đơn hàng có ID:", orderId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <Loading isLoading={loading} />
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Quản lý đơn hàng</h3>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="p-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Mã đơn</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Khách hàng</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Ngày đặt</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Trạng thái</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tổng tiền</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">Đang tải...</td>
                </tr>
              ) : orders && orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">Không có đơn hàng nào</td>
                </tr>
              ) : (
                orders?.map(({ orderId, CustomerId, OrderDate, Status, TotalAmount }) => (
                  <tr key={orderId}>
                    <td className="px-6 py-4 text-gray-900">#{orderId}</td>
                    <td className="px-6 py-4 text-gray-900">{CustomerId}</td>
                    <td className="px-6 py-4 text-gray-900">{OrderDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${Status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {Status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">${TotalAmount}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => handleView(orderId)}>
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(orderId)}>
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>


          </table>
        </div>

        <div className="p-6 flex justify-between items-center">
          <button
            className={`px-4 py-2 border rounded-lg ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Trang trước
          </button>
          <span>Trang {page}</span>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100" onClick={() => setPage(page + 1)}>
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;