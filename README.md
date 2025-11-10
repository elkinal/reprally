# Reprally - Smart Reordering Platform

**Live Demo:** https://reprally-8t7ijk6i7-alexey-elkins-projects.vercel.app

## What I Built

So here's the thing - I took the onboarding challenge and ran with it in a slightly different direction. Instead of building just a 2-step signup form, I built out the entire product experience that a store owner would see *after* onboarding. The idea was to show what makes this platform valuable in the first place, and honestly, I think the full context makes the value prop way more clear.

Think of it like this: if you're trying to get someone excited about joining a platform, showing them the actual product is more compelling than showing them a form. So Reprally is a working reorder platform for independent store owners, focused on Carlos' Corner Store in Brooklyn as the reference implementation.

## The Approach

### Why a Full Platform vs. Just Onboarding?

When I started thinking about the assignment, I kept coming back to this question: what actually makes a store owner care? It's not the form fields - it's seeing that you understand their business, their customers, and their local market. So I built:

**Dashboard** - Shows trending products, low stock alerts, local market trends, and profit margins. This is where the "you're part of a living ecosystem" feeling comes from. The owner sees immediately that we know their area (high school students, after-school rush, TikTok trends among teens).

**Product Discovery** - Smart search with natural language ("trending for teens", "high margin snacks"), filtering by category, and real-time insights on what's working. This is the "we have insight into what's working locally" piece.

**Order History & Cart** - Shows how easy reordering actually is, with profit calculations built in. Store owners care about margins, so every product card shows the exact profit they'll make.

**AI ChatBot** - Powered by OpenAI GPT-4, this thing actually understands the store's inventory, local trends, and can make smart recommendations. It's the closest thing to having a business advisor in your pocket.

### The Data Story

The assignment mentioned using a NJ stores dataset. I took that concept and built it into the product itself - Carlos' Corner Store is near Metro High School in Brooklyn, with specific demographics (ages 14-22 primary, ages 25-45 secondary), and the product catalog reflects what actually works in that context:

- Energy drinks are +24% growth nearby
- Spicy snacks are +18% growth  
- Better-for-you products are +12% growth

Every product has a "reason" field that explains *why* it's trending - usually tied to TikTok, Instagram, or local demand patterns. So when the owner sees "Prime Energy - Ice Pop" is out of stock with a "Viral on TikTok, 200% sales increase" note, they immediately get it.

### Mobile-First Design

Given that store owners are busy people, I optimized the hell out of the mobile experience. Full-screen chatbot on mobile, touch-optimized buttons, proper tap targets, responsive typography - the whole nine yards. The analytics would be useless if half the users bounced because the UI was broken on their phone.

## Analytics & Metrics (The Honest Take)

Okay, so I didn't implement PostHog or Mixpanel in the time I had. But here's exactly how I'd instrument this if I were launching it:

### Key Events to Track

**Onboarding Events** (if we built the actual form):
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
// This would be huge for understanding value
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
// The money metric
analytics.track('Order Placed', {
  order_total: total,
  items_count: items,
  estimated_profit: profit,
  used_chatbot: usedBot,
  time_to_convert: timeFromLogin
})
```

### What I'd Optimize Based on Drop-offs

**If Step 1 → Step 2 drop-off is high:**
- Make Step 1 shorter. Maybe ZIP code and store type are enough to start.
- Show a preview of the insights they'll get in Step 2 to create pull-through
- Add a "Skip for now" option with a reminder to complete later

**If people aren't engaging with Product Discovery:**
- The natural language search might not be obvious enough
- Add more example queries, maybe animated ones that cycle through
- Surface trending products more prominently

**If Chatbot usage is low:**
- The value prop isn't clear enough. Add a tooltip: "Ask me 'what should I order for high school students?'"
- Make the first message from the bot more action-oriented
- Add quick action buttons that auto-fill queries

**If Add-to-Cart → Checkout is low:**
- Probably a trust or logistics issue
- Add clearer delivery time estimates
- Show testimonials from other local stores
- Make the profit calculation more prominent

### The Metrics Dashboard I'd Build

I'd want to see:
- **Cohort retention**: What % of stores who onboard place an order in Week 1? Week 2?
- **Time-to-value**: How long from signup to first order?
- **Engagement patterns**: When are stores most active? (Probably weekday mornings when they're doing inventory)
- **Product mix**: Are stores ordering mostly trending items or restocking staples?
- **Chatbot effectiveness**: Conversion rate for chatbot-recommended products vs. organic discovery
- **Mobile vs. Desktop**: Given the mobile optimization, curious if there's a difference in order size or completion rate

## Technical Decisions

**React + Vite** - Fast, modern, great DX. Vite's HMR is unbeatable for rapid iteration.

**Tailwind CSS** - Utility-first made the mobile responsiveness way easier to manage. Every component has mobile-first sizing (`text-xs sm:text-sm` pattern throughout).

**Express + OpenAI** - The chatbot backend is deliberately simple. It's a single endpoint that takes messages and returns AI responses, with a huge system prompt that contains all the store context and product catalog.

**Vercel** - Serverless deployment was the obvious choice. The Express server converts to a serverless function automatically, and the CDN makes it fast globally.

**Dark Mode** - Honestly just wanted to build it properly. Store owners working late nights will appreciate it.

## What I'd Build Next

### Short Term (Week 1-2)
1. **Actual onboarding flow** - The 2-step form the assignment asked for, but now it would lead into this rich product experience
2. **Analytics integration** - PostHog would be my choice. Open source, privacy-friendly, and the session recording would be invaluable
3. **Local market insights** - Real API integration with demographic data, nearby store data, trending products by ZIP
4. **Email/SMS preferences** - Capture communication preferences during onboarding and actually respect them

### Medium Term (Month 1)
1. **Personalized recommendations** - Use order history to predict what they'll need before they know it
2. **Price alerts** - Notify when a frequently-ordered product drops in price
3. **Delivery tracking** - Real-time updates on order status
4. **Supplier integration** - Auto-sync inventory levels, get real-time pricing

### Long Term (Quarter 1)
1. **Network effects** - Show what other similar stores are ordering, anonymized
2. **Bulk buying groups** - Connect nearby stores for volume discounts
3. **Demand forecasting** - ML model that predicts what'll trend next in their area
4. **Sales analytics** - Help them understand their own business better with POS integration

## How I'd Iterate Based on User Feedback

Here's the reality - you can't build this stuff in a vacuum. The roadmap above is great, but it'll change the second real users touch it. Here's how I'd systematically improve based on what we learn:

### The Feedback Loop

**Week 1-2: Observation Phase**
- Watch session recordings religiously. Where do people click expecting something to happen? Where do they get confused?
- Set up a simple in-app feedback widget (something like Canny or even just a "Feedback" button that opens a form)
- Do 5-10 user interviews with early adopters. Phone calls, not surveys. Ask them to walk through their workflow.
- Track the key question: "What were you trying to do when you got stuck?"

**Week 3-4: Quick Wins**
Based on patterns from the first two weeks, ship fast fixes:
- If people keep clicking non-interactive elements, make them interactive or remove them
- If the chatbot confuses people, add better onboarding (maybe a tour: "Try asking me 'what's trending'")
- If mobile users struggle with specific flows, instrument those specifically and fix them
- If people abandon cart, figure out why - is it shipping costs? Unclear delivery? Trust issues?

**Month 2+: Data-Driven Decisions**
Now we have real data. Build a prioritization framework:

```
Impact Score = (Users Affected × Frequency × Business Impact) / Engineering Effort

Example:
- "Chatbot doesn't suggest quantities" 
  = (80% of users × Use daily × Medium impact on order size) / 2 days = High priority
  
- "Dark mode for product images"
  = (20% use dark mode × Use daily × Low impact) / 3 days = Low priority
```

### Specific Improvements Based on Likely Feedback

**If users say: "I don't know what to order"**
- Add a "Smart Reorder" button that analyzes their sales velocity and suggests quantities
- Build a "Starter Pack" for new stores based on their type and location
- Make the chatbot more proactive - have it ping them: "You usually order on Tuesdays, need help?"

**If users say: "I want to compare prices"**
- Add competitor pricing (if we can get it)
- Show historical price trends - "Takis were $45/case last month, now $47.76"
- Surface deals and bulk discounts more prominently

**If users say: "The insights aren't relevant to my store"**
- Add a preference center where they can tune what they see
- Let them mark products as "not relevant" and learn from it
- Segment insights by store type more aggressively (bodega vs. convenience store vs. deli)

**If users say: "I can't find what I need"**
- Expand the catalog (obviously)
- But also: improve search. Maybe they're searching for brands we carry but using different terms
- Add a "Request Product" feature that feeds into our supplier conversations

**If users say: "This is too complicated"**
- Brutal simplification time. Remove features. Make the happy path more obvious.
- Maybe most people just want to reorder what they ordered last time - make that one click
- Consider a "Simple Mode" vs "Advanced Mode" toggle

**If users say: "I don't trust the profit calculations"**
- Show the math more explicitly: "Your retail: $1.99, Your cost: $0.99, Your margin: $1.00 (50%)"
- Add a link to "How we calculate margins" with transparency
- Let them override with their own pricing if they want

**If users say: "I'm ordering too frequently / not frequently enough"**
- Build smart reminders based on their actual sales velocity
- Add low-stock alerts that actually work (integrate with POS if possible)
- Predictive ordering: "Based on your sales, you'll run out of Prime Energy in 4 days"

### A/B Tests I'd Run

Once we have enough volume, systematic testing:

1. **Onboarding variations:**
   - Short form (just ZIP + type) vs. detailed form (all the fields)
   - Show insights first, capture data second vs. traditional form-first
   - Gamified onboarding ("Complete your profile: 60%") vs. standard

2. **Product discovery:**
   - Grid view vs. list view for products
   - Show margins prominently vs. hide them in a tooltip
   - Natural language search front-and-center vs. traditional filters first

3. **ChatBot positioning:**
   - Always visible vs. minimized by default
   - Proactive messages vs. wait for user to initiate
   - Different first messages to test which creates more engagement

4. **Pricing display:**
   - Show profit $ vs. profit % vs. both
   - Highlight savings on bulk orders vs. just show the price
   - Display price per unit vs. price per case vs. both

5. **Cart & checkout:**
   - Show estimated delivery date vs. don't show it
   - Require minimum order vs. no minimum
   - One-click reorder vs. always review cart first

### The Metrics That Would Change My Mind

I have hypotheses, but I'd change course based on these signals:

**If mobile conversion is <50% of desktop:**
- Something's broken on mobile that I'm not seeing
- Probably need more mobile user testing
- Maybe the mobile flow needs to be completely different, not just responsive

**If chatbot usage is >50% but conversion from chatbot is <10%:**
- People like the idea but it's not actually helpful
- Recommendations are off or too generic
- Maybe need to rethink the whole approach

**If time-to-first-order is >3 days:**
- The value prop isn't landing fast enough
- Need to create urgency or prove value earlier
- Maybe offer a first-order discount to get them over the hump

**If repeat order rate is <30% in month 2:**
- We're not sticky enough
- Either the product selection is wrong, or the experience isn't better than alternatives
- Need to double down on retention mechanics (reminders, personalization, loyalty)

**If NPS is below 40:**
- Something fundamental is wrong
- Probably need to do more qual research to understand what's missing
- Consider a pivot or major rethink

### How I'd Actually Prioritize

Real talk: you can't build everything. Here's the framework I'd use:

**Must-haves** (blockers to adoption):
- Product catalog that actually matches what stores need
- Reliable delivery and fulfillment
- Accurate pricing and availability
- Mobile experience that works

**Should-haves** (improve retention):
- Smart reordering and reminders
- Profit calculations and insights
- Chatbot for help and recommendations
- Order history and easy reordering

**Nice-to-haves** (differentiation):
- Network effects and community features
- Bulk buying groups
- Demand forecasting
- Advanced analytics

**Won't-haves** (at least not yet):
- Building our own delivery network
- Credit/financing products
- POS system integration (maybe later)
- White-label solution for distributors

The key is being ruthless about what actually moves the needle. A feature that 5% of users love but 95% ignore is probably not worth building, no matter how cool it is.

### Feedback Channels I'd Set Up

1. **In-app feedback widget** - Constant passive collection
2. **Post-order survey** - "How was your experience?" after each order
3. **Monthly store owner calls** - Rotate through active users, 30-min sessions
4. **Usage-triggered outreach** - If someone's been active then goes quiet, reach out
5. **Feature request board** - Public voting on what to build next (but we keep final say)
6. **Support ticket analysis** - What are people asking for help with? That's where we're failing.

The goal is to create a culture where user feedback directly influences the roadmap. Not in a "we'll build whatever you ask for" way, but in a "we deeply understand your problems and solve them thoughtfully" way.

## The Real Challenge

The hardest part of this wasn't the code - it was figuring out what makes a store owner actually care. They're busy, they're stressed about margins, and they definitely don't have time for another SaaS product that doesn't immediately prove its value.

That's why I focused on making the insights *immediately* useful. When they see "Prime Energy is viral on TikTok and you're out of stock," that's actionable. When the chatbot tells them exactly which products will work for their after-school rush, that's valuable. When they see the profit margin on every product, that speaks their language.

The onboarding form is important, but it's table stakes. The real product is the ongoing relationship and the value you deliver day after day. That's what keeps them coming back.

## Running Locally

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Add your OPENAI_API_KEY to .env

# Run both frontend and backend
npm run dev:all

# Or run them separately:
npm run dev      # Vite frontend on :5173
npm run server   # Express backend on :3001
```

## Deployment

The app auto-deploys to Vercel on push to main. The Express server runs as a serverless function at `/api/index.js`.

Environment variables needed:
- `OPENAI_API_KEY` - For the chatbot (optional, app works without it)

---

**Final thought:** This was a fun challenge. I know I went beyond the scope, but I wanted to show how I think about products holistically - not just the forms and flows, but the entire value proposition and user journey. If you have feedback or questions about any of my choices, I'm all ears.
