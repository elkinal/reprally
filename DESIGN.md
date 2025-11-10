# Reorder Experience - Design Thinking

## The Challenge

Store owners like Carlos have too much on their plate. Two stores, staff to manage, deliveries coming in, and somehow they need to figure out what their high school customers want next. Most independent stores don't have fancy POS systems, so they're basically guessing when it comes to ordering.

Our reps currently use data from store scans, market data from big chains, Google Maps, and trend signals to pitch products. But here's the thing: how do I turn that rep's pitch into something Carlos can actually use himself, on his phone, while he's running between stores?

## Meet Carlos

Guy runs two stores in Brooklyn. One of them is right by Metro High School, so he's constantly trying to keep up with what teenagers think is cool this week. He's on his phone constantly (WhatsApp, Instagram, you name it), trying to catch trends before they pass. When he needs to order inventory, it has to be quick and he needs to trust what he's buying.

## Core Insight: From Rep Pitch to Self-Service

When a rep visits Carlos, they bring the good stuff: "This Prime drink is going viral on TikTok, stores near schools can't keep it in stock" or "You're probably running low on Takis, other stores around here reorder every couple weeks."

I needed to capture that same intelligence but make it something Carlos could browse on his own. Instead of waiting for a rep to show up, Carlos opens the app and sees recommendations organized by what actually matters:
- What's hot with his teenage customers right now
- What's probably running low
- What's selling well at similar stores

Each product tells him why he should care. Not just "buy this" but the actual reason. That transparency matters when there's no rep standing there to explain it.

## What I Built (MVP)

### 1. Dashboard - The "Smart Rep" View
No more endless scrolling through products. Carlos opens the app and boom:
- Products trending with high schoolers (pulled from market data and trend signals)
- Low stock warnings (would connect to store scan data)
- New opportunities based on what's working at nearby stores

Every recommendation has a reason. "Viral on TikTok" or "Top seller in your area." Same stuff a rep would say, but always there when he needs it.

### 2. Quick Reorder Flow
Carlos thinks in profit, not just cost. So I show:
- Profit percentage on everything
- Running profit total in the cart
- Case pricing (because that's how he orders)

Three taps and he's done: See product, add to cart, place order. Simple.

### 3. Product Discovery
When Carlos actually has a minute to browse (rare but it happens), he can:
- Filter by category
- Sort by margin, trending score, or price
- See the full story on each product

### 4. Mobile-First Everything
Bottom navigation because Carlos is using this one-handed while unpacking boxes. Big buttons he can actually hit. Fast loading. Dark mode for when he's doing inventory at night.

## Why This Works

**Trust through transparency**: Every recommendation shows its logic. Carlos sees the reasoning, just like when a rep explains it.

**Profit-focused**: Store owners live and die by margins. I put profitability right up front, not buried in some details page.

**Context-aware**: Products match his situation (near a high school), his customers (14 to 22 year olds), and local trends. Same data the reps use, just packaged differently.

**Speed**: Carlos is busy. Quick reorder, smart defaults, remembers his preferences.

## What Ships in MVP vs Later

### Shipping Now (MVP)
- Mobile web app (he's already browsing on his phone)
- Smart dashboard with personalized recommendations
- Product discovery with filters
- Shopping cart with profit calculations
- Order history
- Dark mode

### Next (2-4 weeks)
- **WhatsApp integration**: Carlos basically lives in WhatsApp. "Reply YES to reorder your usual" 
- **Smart notifications**: "Hey, you're probably low on Takis based on your usual pattern"
- **Quick restock**: One button to reorder his top 5 products

### Future (2-3 months)
- **Voice ordering**: "Order 3 cases of Prime"
- **AI assistant**: Text to ask "What energy drinks are selling right now?"
- **Auto-reorder rules**: "When Prime gets below 2 cases, order 5 more"
- **Photo recognition**: Snap a pic of a product at another store, get similar suggestions
- **Trend alerts**: "Heat wave coming, maybe stock up on cold drinks?"

## Technical Decisions

**React + Vite**: Fast to build, performs great on phones. Easy to change based on feedback.

**Tailwind CSS**: Quick styling, built for mobile. Keeps the design consistent.

**Mock data first**: I need to make sure the experience works before building expensive backend stuff. The data structure matches what I'd get from real sources (store scans, market data, trend signals).

**No authentication yet**: MVP focuses on proving the reorder flow works. I'll add login before real launch.

## Data Sources (How It Would Work in Production)

The mock data represents what I'd pull from:
1. **In-store scan data**: Track what's selling and what's running low
2. **Market data from chains**: See trends in similar demographics
3. **Google Maps + demographics**: Know Carlos is near a high school with teenage customers
4. **Trend signals**: TikTok, Instagram, social listening
5. **Rep insights**: What actually works during field visits

Right now it's static, but the structure supports real-time updates when I'm ready.

## What's Not Here (Yet)

**From the spec but pushed to later:**
- WhatsApp ordering (wanted to nail the core experience first)
- Voice interface (needs backend infrastructure)
- Smart notifications (requires push notification setup)
- Store owner interviews (would be great to validate my assumptions)
- Auto-reorder automation (good v2 feature once I see usage patterns)

**Why wait?** I need to prove the basic reorder experience works before adding complexity. Carlos needs to trust the recommendations first.

## Success Metrics (How I'd Know It Works)

- **Time to first order**: Should be under 2 minutes
- **Repeat usage**: If Carlos comes back within a week, the recommendations are hitting
- **Cart abandonment**: Low rate means pricing and value prop are clear
- **New product adoption**: Percentage of orders including stuff Carlos hasn't tried before

## Open Questions

1. How often does Carlos actually check? Every day? Once a week? Only when stuff runs out?
2. Does he trust app recommendations as much as his rep?
3. What's the sweet spot for number of recommendations? Too many vs not enough?
4. Should I show what competitors are doing? ("Store down the street is selling X")

I'd need real usage data or actual interviews to answer these.

## Bottom Line

This MVP takes what works about rep visits (personalized, contextual recommendations with clear reasoning) and makes it self-serve. Carlos gets the same intelligence, just on his schedule. I'm not trying to replace reps, I'm giving Carlos a way to reorder between visits without calling anyone.

If he can open the app, see 3 products that make sense for his store, and order them in under a minute, I've done my job.