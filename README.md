# Barbell Weight Visualizer

A clean and modern web tool that visualizes barbell weight plate configurations. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🎯 Real-time weight calculation as you type
- 📊 Visual representation of barbell with colored weight plates
- ⚖️ Optimal plate selection using a greedy algorithm
- 🎨 Color-coded plates for easy identification
- 📱 Responsive design

## Plate Colors

- **45 lbs** - Red
- **35 lbs** - Blue
- **25 lbs** - Yellow
- **10 lbs** - Green
- **5 lbs** - Dark Gray
- **2.5 lbs** - Dark Gray

## How It Works

1. Enter a target weight in pounds
2. The app calculates the optimal plate configuration
3. Uses as many 45 lb plates as possible first, then fills with smaller plates
4. Shows both a visual representation and a breakdown of plates per side
5. Displays if exact weight can't be matched

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technical Details

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Standard Barbell**: 45 lbs
- **Available Plates**: 45, 35, 25, 10, 5, 2.5 lbs

## Algorithm

The plate calculator uses a greedy algorithm that prioritizes larger plates:
1. Subtracts barbell weight (45 lbs) from target
2. Divides remaining weight by 2 (for both sides)
3. Iterates through plates from largest to smallest
4. Uses maximum possible of each plate size
5. Returns configuration with actual achievable weight

## Project Structure

```
src/
├── components/
│   ├── BarbellVisualizer.tsx  # Main visual component
│   ├── Plate.tsx              # Individual plate component
│   └── WeightInput.tsx        # Input and info display
├── utils/
│   └── calculatePlates.ts     # Core algorithm
├── App.tsx                    # Main app component
└── main.tsx                   # Entry point
```

## License

MIT
