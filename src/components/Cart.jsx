import { useState, useEffect } from 'react';

function Cart({ cart, onClose, onUpdateQuantity, onRemove, onClear }) {
  const [orderNotes, setOrderNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsOpen(true), 10);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Wait for animation to finish
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.casePrice * item.quantity), 0);
  const estimatedProfit = cart.reduce((sum, item) => sum + (item.casePrice * item.quantity * item.margin / 100), 0);

  const handleCheckout = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      onClear();
      handleClose();
    }, 2000);
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-sm w-full text-center animate-scaleIn">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Order Placed!</h3>
          <p className="text-gray-600 dark:text-gray-400">Your supplier will confirm delivery time shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}
      onClick={handleClose}
    >
      <div 
        className={`absolute right-0 top-0 bottom-0 w-full sm:max-w-md bg-white dark:bg-gray-800 shadow-xl flex flex-col transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
          <button
            onClick={handleClose}
            className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors active:scale-95"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2.5 sm:p-3">
                    <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-700 rounded flex items-center justify-center p-1 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm line-clamp-1">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${item.casePrice} per case</p>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 active:scale-95"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500 active:scale-95 text-sm sm:text-base font-medium"
                        >
                          -
                        </button>
                        <span className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base text-gray-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500 active:scale-95 text-sm sm:text-base font-medium"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                          ${(item.casePrice * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-[10px] sm:text-xs text-green-600 dark:text-green-400">
                          +${((item.casePrice * item.quantity * item.margin) / 100).toFixed(2)} profit
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                  Order notes (optional)
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Special instructions, delivery preferences..."
                  className="w-full px-2.5 sm:px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  rows="3"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900">
            <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600 dark:text-gray-400">Est. Profit Margin</span>
                <span className="font-semibold text-green-600 dark:text-green-400">${estimatedProfit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg font-bold border-t border-gray-300 dark:border-gray-600 pt-1.5 sm:pt-2">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white py-2.5 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all font-bold text-base sm:text-lg shadow-lg hover:shadow-xl active:scale-95"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
