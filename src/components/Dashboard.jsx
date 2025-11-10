function Dashboard({ insights, products, onNavigate, onAddToCart }) {
  const trendingProducts = products.filter(p => p.trending).slice(0, 3);
  const lowStockProducts = products.filter(p => p.stockLevel < 5 && p.lastOrdered);
  const newOpportunities = products.filter(p => !p.lastOrdered);

  // Calculate some quick stats
  const avgMargin = Math.round(products.reduce((sum, p) => sum + p.margin, 0) / products.length);
  const totalInventoryValue = products
    .filter(p => p.stockLevel > 0)
    .reduce((sum, p) => sum + (p.casePrice * p.stockLevel), 0);
  const productsInStock = products.filter(p => p.stockLevel > 0).length;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 animate-fadeIn">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-sm border border-green-200 dark:border-green-800 hover:shadow-md transition-all active:scale-95">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <p className="text-[10px] sm:text-xs font-medium text-green-700 dark:text-green-400">Avg Margin</p>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 dark:bg-green-900/50 rounded-md sm:rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="text-base sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">{avgMargin}%</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-sm border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all active:scale-95">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <p className="text-[10px] sm:text-xs font-medium text-blue-700 dark:text-blue-400">In Stock</p>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/50 rounded-md sm:rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <p className="text-base sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">{productsInStock}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-sm border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all active:scale-95">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <p className="text-[10px] sm:text-xs font-medium text-purple-700 dark:text-purple-400">Inventory</p>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 dark:bg-purple-900/50 rounded-md sm:rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-base sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">${Math.round(totalInventoryValue).toLocaleString()}</p>
        </div>
      </div>

      {/* Your Store Section */}
      <div className="mb-4 sm:mb-6 animate-slideUp">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">Your Store</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Map */}
          <div className="relative h-32 sm:h-40 bg-gray-200 dark:bg-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.952343662991!2d-73.94996492346278!3d40.69364097139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzM3LjEiTiA3M8KwNTYnNTkuOSJX!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale opacity-50 pointer-events-none"
            ></iframe>
            {/* Cover the "View larger map" text */}
            <div className="absolute top-0 left-0 w-40 h-10 bg-gradient-to-br from-gray-200 to-transparent dark:from-gray-700 dark:to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/60 to-transparent dark:from-gray-800/95 dark:via-gray-800/60 pointer-events-none"></div>
            <a
              href="https://www.google.com/maps/search/Carlos'+Corner+Store/@40.693641,-73.949965,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-blue-600 dark:bg-blue-500 text-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all flex items-center gap-1 sm:gap-1.5 active:scale-95"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Map
            </a>
          </div>
          
          {/* Store Info */}
          <div className="p-3 sm:p-5">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg truncate">{insights.storeName.split(' - ')[0]}</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{insights.location}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-white/60 dark:bg-gray-800/40 rounded-lg p-2 sm:p-3">
                <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1">Weekly Traffic</p>
                <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{insights.weeklyCustomers.toLocaleString()}</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/40 rounded-lg p-2 sm:p-3">
                <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1">Top Category</p>
                <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{insights.topCategory}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Now */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Trending Now</h2>
          </div>
          <button
            onClick={() => onNavigate('discover')}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            See all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all animate-fadeIn flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-3 bg-white dark:bg-gray-700 rounded-xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain p-2"
                />
                <span className="absolute top-2 right-2 bg-gradient-to-br from-red-500 to-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-lg flex items-center gap-0.5">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Hot
                </span>
              </div>
              
              <div className="flex-1">
                <div className="mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{product.brand}</p>
                </div>
                
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{product.reason}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-lg font-semibold">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {product.margin}%
                  </span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">${product.casePrice}</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all font-semibold shadow-sm text-sm"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* New Opportunities */}
      {newOpportunities.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">New for You</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Products your customers might love based on what's working nearby
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {newOpportunities.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full font-bold">
                    New
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{product.reason}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">${product.casePrice}</span>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-semibold"
                  >
                    Try it
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Running Low</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border-2 border-amber-300 dark:border-amber-800"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{product.name}</h3>
                    <p className="text-sm text-amber-800 dark:text-amber-400 font-medium">Only {product.stockLevel} cases left</p>
                  </div>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full bg-amber-600 dark:bg-amber-700 text-white py-2.5 rounded-lg hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors text-sm font-semibold shadow-sm"
                >
                  Reorder Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What's Working Nearby</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {insights.trendingNearby.map((trend, idx) => {
            const sparklineData = [30, 35, 33, 40, 38, 45, 50];
            const maxValue = Math.max(...sparklineData);
            const points = sparklineData.map((value, i) => {
              const x = (i / (sparklineData.length - 1)) * 100;
              const y = 100 - (value / maxValue) * 100;
              return `${x},${y}`;
            }).join(' ');
            
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{trend.category}</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">{trend.growth}</span>
                </div>
                {/* Line sparkline */}
                <svg className="w-full h-8 mt-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline
                    points={points}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-green-500 dark:text-green-400"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
