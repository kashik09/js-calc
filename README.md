# JS Calculator - Modern JavaScript Calculator App

A feature-rich, modern calculator web application built with Next.js 14, React 18, and Tailwind CSS. Includes multiple themes, advanced operations, calculation history, and extensive customization options.

## Features

### Core Functionality (Lab Requirements)
- ✅ Four basic arithmetic operations: **addition**, **subtraction**, **multiplication**, **division**
- ✅ Each operation implemented as a separate, reusable function
- ✅ Calculation history stored with:
  - operand1 (first number)
  - operand2 (second number)
  - operator (+, -, ×, ÷) - displays × and ÷ symbols
  - result (calculated value)
  - timestamp (when calculation was performed)
- ✅ Add calculations to history
- ✅ Display calculation history
- ✅ Clear history functionality

### Visual Customizations

#### Themes (6 options)
1. **Light** - Clean and bright theme for daytime use
2. **Dark** - Easy on the eyes in low light
3. **Ocean** - Cool blue and teal palette
4. **Sunset** - Warm oranges and purples
5. **Neon** - Cyberpunk vibes with glowing colors
6. **Minimal** - Monochrome and clean

#### Button Styles
- **Rounded** (default) - Soft rounded corners
- **Square** - Sharp edges, no rounding
- **Neumorphic** - Soft 3D effect
- **Glassmorphic** - Frosted glass effect

#### Layout Variations
- **Standard** - Default calculator layout (4x4 grid)
- **Compact** - Smaller buttons, minimal spacing
- **Spacious** - Large buttons, generous padding
- **Scientific** - Advanced operations with memory functions

#### Font Options
- **Font sizes**: Small, Medium, Large
- **Display fonts**: Monospace (optimized for numbers)
- **UI fonts**: Sans-serif (clean and modern)

### Functional Customizations

#### Advanced Operations
- **Memory functions**: M+, M-, MR, MC buttons
- **Percentage** calculations (% button)
- **Decimal point** handling
- **Negative numbers** toggle (± button)
- **Backspace** for deleting last digit

#### History Features
- **Filter by operation** type (+, -, ×, ÷)
- **Search** calculations
- **Star/favorite** important calculations
- **Delete** individual history items
- **Add notes** to calculations
- **Export history** as JSON or CSV
- **Statistics** (total calculations, by operation type)

#### Keyboard Support
- **Numbers**: 0-9
- **Operations**: `+`, `-`, `*` (multiply), `/` (divide)
- **Equals**: Enter or `=`
- **Clear**: Escape
- **Backspace**: Delete last digit
- **Decimal**: `.`

### User Experience
- ✅ Responsive design (mobile-first)
- ✅ Keyboard navigation support
- ✅ ARIA labels for accessibility
- ✅ Error handling (division by zero, etc.)
- ✅ Clean, modern UI with smooth animations
- ✅ Professional calculator appearance (uses × and ÷ symbols)

### Data Persistence
- **localStorage** for calculation history
- **localStorage** for user preferences (theme, layout, etc.)
- **Export/Import** settings and history
- **Clear all data** option

## Tech Stack

- **Next.js 14+** (App Router)
- **React 18+** with hooks
- **JavaScript** (.js/.jsx files)
- **Tailwind CSS** for styling
- **localStorage** for data persistence

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd js-calc
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
js-calc/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Home page (calculator)
│   └── globals.css        # Global styles & theme variables
├── components/
│   ├── Calculator.jsx     # Main calculator component
│   ├── Display.jsx        # Calculator display
│   ├── ButtonGrid.jsx     # Calculator buttons
│   ├── History.jsx        # Calculation history
│   ├── Settings.jsx       # Settings panel
│   └── ThemeSwitcher.jsx  # Theme selector
├── lib/
│   ├── calculator.js      # Core math functions
│   ├── storage.js         # localStorage utilities
│   └── themes.js          # Theme configurations
├── hooks/
│   ├── useCalculator.js   # Calculator logic hook
│   ├── useHistory.js      # History management hook
│   └── useTheme.js        # Theme management hook
├── utils/
│   └── symbols.js         # Symbol conversion (× ÷)
└── public/
    └── sounds/            # Sound effects (optional)
```

## Core Functions

### Calculator Functions (lib/calculator.js)

```javascript
// Basic operations
add(a, b)          // Addition
subtract(a, b)     // Subtraction
multiply(a, b)     // Multiplication
divide(a, b)       // Division (throws error on division by zero)

// Advanced operations
percentage(value, percent)  // Percentage calculation
squareRoot(value)          // Square root
power(base, exponent)      // Power function
negate(value)              // Change sign
reciprocal(value)          // 1/x
```

### History Management (hooks/useHistory.js)

```javascript
addCalculation(calc)   // Add to history
clear()               // Clear all history
deleteItem(id)        // Delete single item
toggleFavorite(id)    // Star/unstar calculation
addNote(id, note)     // Add note to calculation
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Number input |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication (displays as ×) |
| `/` | Division (displays as ÷) |
| `.` | Decimal point |
| `Enter` or `=` | Equals |
| `Escape` | Clear all |
| `Backspace` | Delete last digit |

## Customization Guide

### Changing Themes
1. Click the ⚙️ (settings) button in the top right
2. Select a theme from the dropdown
3. Theme preference is saved automatically

### Button Styles
1. Open Settings
2. Choose from Rounded, Square, Neumorphic, or Glassmorphic
3. Style is applied immediately

### Layout Modes
- **Standard**: Traditional calculator (4x4)
- **Compact**: Smaller size, less spacing
- **Spacious**: Larger buttons, more padding
- **Scientific**: Includes memory functions and advanced operations

### Exporting History
1. Open Settings
2. Click "JSON" or "CSV" under Export History
3. File downloads automatically

## Accessibility

- All interactive elements have ARIA labels
- Keyboard navigation fully supported
- Screen reader friendly
- High contrast mode support
- Focus indicators on all buttons
- Semantic HTML structure

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy automatically

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Any Node.js hosting

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Currently no environment variables are required for basic functionality.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js and React**
