function OrderHistory({ orders, products, onAddToCart }) {
  const getProductById = (productId) => {
    return products.find(p => p.id === productId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'in-transit':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const handleReorder = (order) => {
    order.products.forEach((orderProduct) => {
      const product = getProductById(orderProduct.productId);
      if (product) {
        onAddToCart(product, orderProduct.quantity);
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Order History</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow active:scale-[0.99]">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-200 dark:border-gray-700">
              {/* Order Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">#{order.id}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{formatDate(order.date)}</p>
                  </div>
                </div>
                <span className={`text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              {/* Order Summary */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3">
                  <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1">Total Amount</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3">
                  <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1">Items</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{order.items}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-3 sm:mb-4">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Products</h4>
                <div className="space-y-1.5 sm:space-y-2">
                  {order.products.slice(0, 3).map((orderProduct, idx) => {
                    const product = getProductById(orderProduct.productId);
                    if (!product) return null;

                    return (
                      <div key={idx} className="flex items-center gap-2 sm:gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-1.5 sm:p-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-gray-700 rounded flex items-center justify-center p-0.5 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">{product.name}</h4>
                          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                            {orderProduct.quantity}x ${orderProduct.price}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {order.products.length > 3 && (
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center">
                      +{order.products.length - 3} more items
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleReorder(order)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white py-2.5 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all font-semibold text-xs sm:text-sm shadow-sm active:scale-95"
              >
                Reorder These Items
              </button>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">No orders yet</p>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
