# Reprally - Smart Reordering Platform

**Live Demo:** https://reprally-8t7ijk6i7-alexey-elkins-projects.vercel.app

## What I Built

I took the onboarding challenge and expanded on it. Instead of building just a 2-step signup form, I built the full product experience that a store owner would see after onboarding. I wanted to demonstrate what makes this platform valuable, since the actual product context makes the value proposition clearer.

The logic here is straightforward: showing someone the actual product is more compelling than showing them a form. Reprally is a working reorder platform for independent store owners, with Carlos' Corner Store in Brooklyn as the reference implementation.

## The Approach

### Why a Full Platform vs. Just Onboarding?

I focused on what would actually matter to a store owner. It's not the form fields, it's demonstrating that the platform understands their business, customers, and local market. I built:

**Dashboard** - Displays trending products, low stock alerts, local market trends, and profit margins. This creates the sense of being part of a connected ecosystem. The owner sees immediately that the platform knows their area (high school students, after-school rush, trends among teens).

**Product Discovery** - Smart search with natural language processing ("trending for teens", "high margin snacks"), category filtering, and real-time insights. This demonstrates local market intelligence.

**Order History & Cart** - Shows the simplicity of reordering with built-in profit calculations. Store owners focus on margins, so every product card displays exact profit.

**AI ChatBot** - Powered by OpenAI GPT-4, it understands store inventory, local trends, and makes intelligent recommendations. It functions like a business advisor.

### The Data Story

The assignment mentioned using a NJ stores dataset. I incorporated that concept into the product itself. Carlos' Corner Store is near Metro High School in Brooklyn, with specific demographics (ages 14-22 primary, ages 25-45 secondary). The product catalog reflects what works in that context:

- Energy drinks showing +24% growth nearby
- Spicy snacks at +18% growth  
- Better-for-you products at +12% growth

Every product includes a "reason" field explaining why it's trending, usually tied to TikTok, Instagram, or local demand patterns. When the owner sees "Prime Energy - Ice Pop" is out of stock with a "Viral on TikTok, 200% sales increase" note, the value is immediately clear.

### Mobile-First Design

Since store owners are constantly moving, I prioritized the mobile experience. Full-screen chatbot on mobile, touch-optimized buttons, proper tap targets, responsive typography. The analytics would be useless if users bounced due to poor mobile UI.

## Analytics & Metrics

I didn't implement PostHog or Mixpanel in the available time. Here's how I would instrument this for production:

### Key Events to Track

**Onboarding Events** (for the actual form):
```javascript
// Step 1 completion
analytics.track('Onboarding Step 1 Complete', {
  store_type: storeType,
  zip_code: zip,
  has_hours: hasHours,
  time_spent: timeSpent
})

// Step 2 completion  
analytics.track('Onboarding Step 2 Complete', {
  shared_products: productsCount,
  selected_contact_method: method,
  wrote_custom_note: hasNote,
  total_onboarding_time: totalTime
})
```

**Product Discovery Events**:
```javascript
// Search behavior
analytics.track('Product Searched', {
  query: searchQuery,
  results_count: resultsCount,
  used_natural_language: isNaturalLanguage,
  filters_applied: filters
})

// Product interactions
analytics.track('Product Added to Cart', {
  product_id: id,
  product_name: name,
  margin: margin,
  is_trending: trending,
  source: 'discovery' | 'dashboard' | 'chatbot'
})
```

**AI Chatbot Events**:
```javascript
analytics.track('Chatbot Message Sent', {
  message_length: length,
  is_first_message: isFirst,
  session_message_count: count
})

analytics.track('Chatbot Recommendation Clicked', {
  product_recommended: productId,
  recommendation_type: type,
  converted_to_cart: didAdd
})
```

**Conversion Funnels**:
```javascript
analytics.track('Order Placed', {
  order_total: total,
  items_count: items,
  estimated_profit: profit,
  used_chatbot: usedBot,
  time_to_convert: timeFromLogin
})
```

### Optimization Based on Drop-offs

**If Step 1 to Step 2 drop-off is high:**
- Shorten Step 1. ZIP code and store type might be sufficient to start
- Show preview of insights available in Step 2
- Add "Skip for now" option with reminder to complete later

**If Product Discovery engagement is low:**
- Natural language search might not be obvious
- Add more example queries
- Surface trending products more prominently

**If Chatbot usage is low:**
- Value proposition needs clarification
- Make first message more action-oriented
- Add quick action buttons with pre-filled queries

**If Add-to-Cart to Checkout conversion is low:**
- Likely trust or logistics issue
- Add clearer delivery estimates
- Show testimonials from local stores
- Make profit calculation more prominent

### Metrics Dashboard Requirements

Key metrics to track:
- **Cohort retention**: Percentage of stores placing orders in Week 1, Week 2
- **Time-to-value**: Duration from signup to first order
- **Engagement patterns**: Peak activity times (likely weekday mornings during inventory)
- **Product mix**: Trending items vs. staple restocks
- **Chatbot effectiveness**: Conversion rate for recommended vs. organically discovered products
- **Mobile vs. Desktop**: Order size and completion rate differences

## Technical Decisions

**React + Vite** - Fast, modern development experience. Vite's HMR enables rapid iteration.

**Tailwind CSS** - Utility-first approach simplified mobile responsiveness. Every component uses mobile-first sizing patterns.

**Express + OpenAI** - Simple chatbot backend. Single endpoint processes messages and returns AI responses with comprehensive system prompt containing store context and product catalog.

**Vercel** - Serverless deployment. Express server converts to serverless function automatically, CDN provides global performance.

**Dark Mode** - Implemented for store owners working late hours.

## Development Roadmap

### Short Term (Week 1-2)
1. **Complete onboarding flow** - The 2-step form from the original assignment, leading to this product experience
2. **Analytics integration** - PostHog for privacy-friendly session recording
3. **Local market insights** - API integration for demographic data, nearby store data, trending products by ZIP
4. **Communication preferences** - Capture email/SMS preferences during onboarding

### Medium Term (Month 1)
1. **Personalized recommendations** - Use order history for predictive suggestions
2. **Price alerts** - Notifications for price drops on frequently-ordered products
3. **Delivery tracking** - Real-time order status updates
4. **Supplier integration** - Auto-sync inventory levels and real-time pricing

### Long Term (Quarter 1)
1. **Network effects** - Anonymized data on what similar stores are ordering
2. **Bulk buying groups** - Connect nearby stores for volume discounts
3. **Demand forecasting** - ML model predicting local trends
4. **Sales analytics** - POS integration for business intelligence

## Iteration Strategy Based on User Feedback

### Feedback Loop Implementation

**Week 1-2: Observation Phase**
- Analyze session recordings for interaction patterns
- Deploy in-app feedback widget
- Conduct 5-10 user interviews with early adopters
- Track primary question: "What were you trying to do when you got stuck?"

**Week 3-4: Quick Wins**
Based on patterns from initial weeks:
- Make frequently clicked non-interactive elements functional
- Improve chatbot onboarding if confusion exists
- Fix mobile-specific flow issues
- Address cart abandonment causes

**Month 2+: Data-Driven Decisions**
Prioritization framework:

```
Impact Score = (Users Affected × Frequency × Business Impact) / Engineering Effort

Example:
- "Chatbot doesn't suggest quantities" 
  = (80% of users × Daily use × Medium order size impact) / 2 days = High priority
  
- "Dark mode for product images"
  = (20% dark mode users × Daily use × Low impact) / 3 days = Low priority
```

### Anticipated Improvements Based on Common Feedback

**"I don't know what to order"**
- Add "Smart Reorder" analyzing sales velocity
- Build location-based "Starter Packs"
- Implement proactive chatbot reminders

**"I want to compare prices"**
- Add competitor pricing data
- Show historical price trends
- Highlight deals and bulk discounts

**"Insights aren't relevant to my store"**
- Add preference center for customization
- Implement "not relevant" marking with learning
- Increase segmentation by store type

**"This is too complicated"**
- Simplify interface, remove non-essential features
- Add one-click reorder for previous orders
- Consider Simple/Advanced mode toggle

**"I don't trust the profit calculations"**
- Display calculation breakdown explicitly
- Add transparency documentation
- Allow custom pricing overrides

### A/B Testing Plan

Once sufficient volume exists:

1. **Onboarding variations:**
   - Minimal (ZIP + type) vs. detailed forms
   - Insights-first vs. form-first flow
   - Progress indicators vs. standard forms

2. **Product discovery:**
   - Grid vs. list view
   - Prominent vs. hidden margins
   - Natural language vs. traditional search

3. **ChatBot positioning:**
   - Always visible vs. minimized
   - Proactive vs. reactive messaging
   - Different initial messages

4. **Pricing display:**
   - Profit dollars vs. percentage vs. both
   - Bulk savings emphasis
   - Per-unit vs. per-case pricing

5. **Cart & checkout:**
   - Delivery date visibility
   - Minimum order requirements
   - One-click vs. cart review

### Key Performance Indicators

Signals that would change approach:

**Mobile conversion <50% of desktop:**
- Indicates critical mobile issues
- Requires additional mobile testing
- May need completely different mobile flow

**High chatbot usage but <10% conversion:**
- Feature interest without value delivery
- Recommendations need improvement
- Potential approach rethink needed

**Time-to-first-order >3 days:**
- Value proposition not landing quickly
- Need urgency creation or earlier value proof
- Consider first-order incentive

**Month 2 repeat order rate <30%:**
- Insufficient stickiness
- Product selection or experience issues
- Focus on retention mechanics

**NPS below 40:**
- Fundamental issue exists
- Requires qualitative research
- Consider pivot or major changes

### Feature Prioritization Framework

**Must-haves** (adoption blockers):
- Accurate product catalog
- Reliable fulfillment
- Correct pricing/availability
- Functional mobile experience

**Should-haves** (retention drivers):
- Smart reordering/reminders
- Profit calculations/insights
- Chatbot assistance
- Easy reordering

**Nice-to-haves** (differentiation):
- Network effects/community
- Bulk buying groups
- Demand forecasting
- Advanced analytics

**Won't-haves** (currently):
- Proprietary delivery network
- Credit/financing products
- Full POS integration
- White-label solutions

### Feedback Collection Channels

1. **In-app feedback widget** - Continuous passive collection
2. **Post-order surveys** - Experience rating after orders
3. **Monthly user calls** - 30-minute sessions with active users
4. **Churn outreach** - Contact users who become inactive
5. **Feature request board** - Public voting system
6. **Support ticket analysis** - Identify problem patterns

## The Core Challenge

The difficulty wasn't technical implementation. It was understanding what makes store owners engage. They're busy, concerned about margins, and don't have time for products that don't immediately demonstrate value.

I focused on making insights immediately actionable. When they see "Prime Energy is viral on TikTok and you're out of stock," that drives action. When the chatbot identifies products for their after-school rush, that provides value. When profit margins appear on every product, that speaks their language.

The onboarding form is necessary but basic. The real product is the ongoing relationship and daily value delivery that creates retention.

## Running Locally

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Add OPENAI_API_KEY to .env

# Run both frontend and backend
npm run dev:all

# Or run separately:
npm run dev      # Vite frontend on :5173
npm run server   # Express backend on :3001
```

## Deployment

Auto-deploys to Vercel on main branch push. Express server runs as serverless function at `/api/index.js`.

Environment variables:
- `OPENAI_API_KEY` - For chatbot functionality (optional, app functions without it)

---

This project expanded beyond the original scope to demonstrate comprehensive product thinking beyond just forms and flows. I wanted to show how I approach the entire value proposition and user journey. I'm happy to discuss any of these decisions in more detail.