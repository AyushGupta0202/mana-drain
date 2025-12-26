# 🎮 Mana Drain - RPG Finance Tracker

A personal finance tracker that treats spending like a chaotic RPG game. Level up, earn XP, unlock achievements, and track your budget with style.

## 🚀 Tech Stack

- **Framework:** Next.js 16.1.1 (App Router) with TypeScript 5
- **Styling:** Tailwind CSS v4 + Custom Design System (CSS Variables)
- **Motion:** Framer Motion
- **State:** Zustand
- **Icons:** Lucide React
- **Charts:** Recharts
- **Date Handling:** date-fns
- **Utilities:** clsx, tailwind-merge (className utilities)

## 🎨 Design System

### Color Palette
- **Common (Food/Transport):** Cyan (#00D9FF)
- **Rare (Entertainment/Health):** Purple (#A855F7)
- **Epic (Shopping):** Orange (#FF6B35)
- **Legendary (Bills):** Gold (#FFD700)

### Typography
- **Headings:** Orbitron (Bold, game-like)
- **Body:** Inter (Readable, modern)

### Motion
- Standard transitions: 200ms ease-out
- Framer Motion variants: fadeInUp, scaleIn, slideInRight, staggerContainer, cardHover
- Animated progress bars, number counting, card hovers

## 📁 Project Structure

```
mana-drain/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Dashboard/landing page
│   └── globals.css        # Design system CSS
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── stat-card.tsx
│   │   ├── progress-bar.tsx
│   │   └── achievement-badge.tsx
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── level-display.tsx
│   │   └── streak-display.tsx
│   ├── transactions/      # Transaction components
│   │   ├── transaction-form.tsx
│   │   └── transaction-list.tsx
│   └── charts/            # Chart components
│       └── spending-chart.tsx
├── lib/
│   ├── utils.ts           # Utility functions
│   └── motion-variants.ts # Framer Motion variants
├── store/
│   └── game-store.ts      # Zustand game state
├── types/
│   └── index.ts           # TypeScript definitions
└── .cursorrules           # Development rules
```

## 🎯 Features

### ✅ Core Features (Implemented)

- **Level System:** XP progression with automatic level-ups
- **Budget Tracking:** Real-time budget health bar visualization
- **Transaction Logging:** Add transactions with category selection
- **Transaction History:** View, edit, and delete past transactions
- **Edit Transactions:** Click edit button on any transaction to modify amount, description, or category
- **Spending Charts:** Pie chart visualization by category
- **Achievement System:** 5 unlockable achievements with automatic detection
- **Streak System:** Daily transaction streak tracking
- **Category Management:** 6 default categories (Food, Entertainment, Shopping, Bills, Transport, Health)
- **Stat Cards:** Animated cards with glow effects
- **Responsive Design:** Mobile-first responsive layout
- **Glassmorphic UI:** Neon accents with backdrop blur effects
- **Smooth Animations:** Framer Motion transitions throughout

### 🎮 Game Mechanics

- **XP System:** 
  - +10 XP per transaction logged
  - +5 XP bonus for staying under budget
  - +20 XP bonus for 7-day streaks
- **Leveling:** Automatic level-up when XP threshold reached (Level × 100 XP)
- **Achievements:** 
  - **First Transaction** (Common): Log your first expense
  - **Budget Master** (Rare): Maintain >50% budget remaining with 5+ transactions logged
  - **Level Up!** (Epic): Reach level 5
  - **XP Collector** (Legendary): Earn 1000 XP
  - **7 Day Streak** (Epic): Log transactions for 7 consecutive days
- **Budget Health:** Visual health bar with color-coded warnings
- **Rarity System:** Spending categories mapped to RPG rarity colors
- **Streak Tracking:** Daily consecutive transaction logging

### 📊 Transaction Features

- **Add Transactions:** Floating action button with modal form
- **Category Selection:** Visual category picker with emoji icons
- **Transaction List:** Chronological list with category badges
- **Edit Transactions:** Click edit icon to modify transaction details inline
- **Delete Transactions:** Hover to reveal delete button
- **Spending Analysis:** Pie chart showing spending distribution by category

### 🏆 Achievement System

Achievements automatically unlock based on:
- Transaction count
- Level progression
- XP milestones
- Streak duration
- Budget management

## 🚧 Future Enhancements

- [ ] Supabase integration for data persistence
- [ ] User authentication
- [ ] Daily/weekly challenges
- [ ] Budget alerts and notifications
- [ ] Export transactions (CSV/PDF)
- [ ] Monthly/yearly reports
- [ ] Custom category creation
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Dark/Light theme toggle

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## 💡 Usage Guide

### Adding Transactions
1. Click the floating "+" button (bottom-right)
2. Enter amount and description
3. Select a category
4. Click "Add Transaction"

### Editing Transactions
1. Hover over any transaction in the list
2. Click the edit icon (pencil) that appears
3. Modify amount, description, or category
4. Click "Update Transaction"

### Viewing Spending
- **Dashboard:** Overview stats and budget health
- **Spending Chart:** Visual breakdown by category
- **Transaction List:** Chronological history

### Earning XP & Leveling Up
- Log transactions to earn XP
- Stay under budget for bonus XP
- Maintain daily streaks for streak bonuses
- Level up automatically at XP thresholds

### Unlocking Achievements
Achievements unlock automatically when conditions are met. Check the Achievements section to see progress.

## 📝 Development Rules

See `.cursorrules` for detailed development guidelines:
- No unstyled HTML elements
- Always use lucide-react for icons
- Mobile-first responsive design
- TypeScript strict mode
- Framer Motion for all animations
- Glassmorphic cards with neon borders

## 🛠️ Technical Details

### State Management
- Zustand store handles all game state
- Transactions stored in memory (ready for persistence)
- Real-time updates across components
- `resetAllData()` function available for testing/debugging

### Performance
- Optimized re-renders with Zustand selectors
- Memoized chart calculations
- Efficient animation rendering

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Color contrast compliance

---

Built with ❤️ and excessive amounts of neon glow effects.
