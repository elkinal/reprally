import { useState } from 'react';

function ProductDiscovery({ products, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Natural language search processing
  const processNaturalLanguageQuery = (query) => {
    const lower = query.toLowerCase();
    
    // Intent detection
    const intents = {
      trending: ['trending', 'hot', 'viral', 'popular', 'tiktok', 'new'],
      teens: ['teen', 'teenagers', 'high school', 'students', 'young', 'gen-z', 'genz'],
      healthy: ['healthy', 'health', 'zero sugar', 'diet', 'low calorie', 'better for you'],
      energy: ['energy', 'energizing', 'boost', 'caffeine'],
      spicy: ['spicy', 'hot', 'flamin'],
      cheap: ['cheap', 'affordable', 'budget', 'low price', 'value'],
      profit: ['high margin', 'profitable', 'best margin'],
      drinks: ['drink', 'beverage', 'liquid', 'soda', 'water'],
      snacks: ['snack', 'food', 'eat', 'chip', 'candy'],
      athletes: ['athlete', 'sports', 'fitness', 'workout', 'gym']
    };

    const detectedIntents = [];
    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lower.includes(keyword))) {
        detectedIntents.push(intent);
      }
    }

    return detectedIntents;
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    if (searchQuery === '') return matchesCategory;
    
    const lower = searchQuery.toLowerCase();
    const intents = processNaturalLanguageQuery(searchQuery);
    
    // Basic text match
    const textMatch = 
      product.name.toLowerCase().includes(lower) ||
      product.brand.toLowerCase().includes(lower) ||
      product.reason.toLowerCase().includes(lower) ||
      product.category.toLowerCase().includes(lower);
    
    // Intent-based matching
    let intentMatch = false;
    
    if (intents.includes('trending') && product.trending) intentMatch = true;
    if (intents.includes('teens') && (product.reason.toLowerCase().includes('teen') || 
        product.reason.toLowerCase().includes('student') || 
        product.reason.toLowerCase().includes('gen-z') ||
        product.reason.toLowerCase().includes('high school'))) intentMatch = true;
    if (intents.includes('healthy') && (product.reason.toLowerCase().includes('health') || 
        product.name.toLowerCase().includes('zero') ||
        product.reason.toLowerCase().includes('sugar'))) intentMatch = true;
    if (intents.includes('energy') && product.name.toLowerCase().includes('energy')) intentMatch = true;
    if (intents.includes('spicy') && (product.name.toLowerCase().includes('hot') || 
        product.name.toLowerCase().includes('flamin'))) intentMatch = true;
    if (intents.includes('cheap') && product.price < 2) intentMatch = true;
    if (intents.includes('profit') && product.margin > 38) intentMatch = true;
    if (intents.includes('drinks') && product.category === 'Beverages') intentMatch = true;
    if (intents.includes('snacks') && product.category === 'Snacks') intentMatch = true;
    if (intents.includes('athletes') && (product.reason.toLowerCase().includes('athlete') ||
        product.reason.toLowerCase().includes('sport') ||
        product.reason.toLowerCase().includes('fitness'))) intentMatch = true;
    
    return matchesCategory && (textMatch || intentMatch);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.trendScore - a.trendScore;
      case 'margin':
        return b.margin - a.margin;
      case 'price':
        return a.casePrice - b.casePrice;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Discover Products</h1>

      {/* Search Bar */}
      <div className="mb-3 sm:mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Try: trending drinks for teens, healthy snacks..."
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-9 sm:pl-10 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <svg className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {/* Quick search suggestions */}
        {!searchQuery && (
          <div className="flex gap-1.5 sm:gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
            {['trending for teens', 'energy drinks', 'healthy options', 'high margin snacks', 'spicy'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchQuery(suggestion)}
                className="text-[11px] sm:text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors active:scale-95"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="mb-4 sm:mb-6">
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">Category</label>
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap active:scale-95 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="trending">Trending Score</option>
            <option value="margin">Best Margin</option>
            <option value="price">Lowest Price</option>
          </select>
        </div>
      </div>

      {/* Product Count */}
      <div className="mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {sortedProducts.map((product, index) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all animate-fadeIn active:scale-[0.98]"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
                <div className="relative bg-white dark:bg-gray-700 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 sm:h-48 object-contain p-2 sm:p-3"
                  />
                  {product.trending && (
                    <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-500 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold shadow-lg">
                      Hot
                    </span>
                  )}
                  {product.stockLevel > 0 && (
                    <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-blue-500 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold shadow-lg">
                      {product.stockLevel} in stock
                    </span>
                  )}
                </div>
            
            <div className="p-3 sm:p-4">
              <div className="mb-2 sm:mb-3">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-0.5 sm:mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2">{product.reason}</p>
              
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold">
                  {product.margin}% margin
                </span>
                <span className="text-[10px] sm:text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  {product.unitsPerCase} units
                </span>
              </div>

              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    ${product.casePrice}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                    ${product.price} per unit
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-semibold shadow-sm text-sm sm:text-base active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

export default ProductDiscovery;
