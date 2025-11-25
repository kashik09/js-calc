# JS Calculator - Modern JavaScript Calculator App

A feature-rich, modern calculator web application built with Next.js 16, React 19, and Tailwind CSS. Features include draggable modals, multiple themes with icon-based selection, advanced operations, calculation history with search and filtering, and extensive customization options.

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

### Enhanced Display
- **Split display layout**:
  - Small text at top shows equation history (e.g., "5 +")
  - Large text at bottom shows current operand being typed (e.g., "2")
  - Clear visual separation between equation context and input
- **Smart operand switching**: When typing second operand, display immediately shows new number (not previous operand)
- **Result display**: After pressing =, shows full equation with result

### Draggable Modal Interface
- **Settings Modal** (⚙️ icon, top-left):
  - Fully draggable by title bar
  - Cursor changes to grab/grabbing
  - Position persists during theme/layout changes
  - Semi-transparent backdrop (30% opacity)
  - Stays within viewport bounds
  - Closes on ESC key or backdrop click

- **History Modal** (🕒 icon, top-right):
  - Same draggable behavior as Settings
  - Includes all history features (filters, search, favorites, notes)
  - Default position: right side of screen
  - Scrollable content area

- **Modal Features**:
  - Only one modal open at a time
  - Position resets when reopening modal
  - Smooth animations (300ms ease-in-out)
  - Accessible keyboard controls

### Visual Customizations

#### Themes (4 options with Icon Selector)
1. **Dark** 🌙 - Easy on the eyes in low light
2. **Light** ☀️ - Clean and bright theme for daytime use
3. **Ocean** 🌊 - Cool blue and teal palette
4. **Sunset** 🌅 - Warm oranges and purples

Icon-based theme selector provides visual feedback and intuitive selection.

#### Layout Variations
- **Standard** - Default calculator layout (4×5 grid)
- **Compact** - Smaller buttons, minimal spacing
- **Spacious** - Large buttons, generous padding
- **Scientific** - Advanced 5×6 grid with memory functions (M+, M-, MR, MC)

#### Font Options
- **Font sizes**: Small, Medium, Large

### Functional Customizations

#### Advanced Operations
- **Memory functions**: M+, M-, MR, MC buttons (Scientific layout)
- **Percentage** calculations (% button)
- **Decimal point** handling
- **Negative numbers** toggle (± button)
- **Backspace** for deleting last digit (⌫)
- **Clear All** (AC) - Resets calculator completely
- **Clear Entry** (CE) - Clears current display only

#### History Features
- **Filter by operation** type (+, -, ×, ÷, or all)
- **Search** calculations in real-time
- **Star/favorite** important calculations (⭐)
- **Delete** individual history items (🗑️)
- **Add notes** to calculations (📝)
- **Statistics display** (total calculations, favorites count)
- **Timestamp** for each calculation (time and date)

#### Keyboard Support
- **Numbers**: 0-9
- **Operations**: `+`, `-`, `*` (multiply), `/` (divide)
- **Equals**: Enter or `=`
- **Clear**: Escape
- **Backspace**: Delete last digit
- **Decimal**: `.`

### User Experience
- ✅ Responsive design (mobile-first, full-screen centered layout)
- ✅ Keyboard navigation fully supported
- ✅ ARIA labels for accessibility
- ✅ Error handling (division by zero displays "Error")
- ✅ Clean, modern UI with smooth animations
- ✅ Professional calculator appearance (uses × and ÷ symbols)
- ✅ Current operation indicator below calculator
- ✅ Memory indicator in display (when M ≠ 0)

### Data Persistence
- **localStorage** for calculation history (with ID, favorites, notes)
- **localStorage** for user preferences (theme, layout, font size)
- **Session persistence** for modal positions
- **Clear all data** option in Settings

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** with hooks
- **JavaScript** (.js/.jsx files - NO TypeScript)
- **Tailwind CSS v3.4** for styling
- **Lucide React** for icons
- **localStorage** for data persistence
- **CSS Variables** for theming

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

4. Open [http://localhost:3001](http://localhost:3001) in your browser
   (Note: Port 3001 is used if 3000 is already in use)

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
│   └── globals.css        # Global styles & theme CSS variables
├── components/
│   ├── Calculator.jsx     # Main calculator component
│   ├── Display.jsx        # Calculator display (split layout)
│   ├── ButtonGrid.jsx     # Calculator buttons (Standard/Scientific)
│   ├── History.jsx        # Calculation history panel
│   ├── Settings.jsx       # Settings panel (themes, layouts, fonts)
│   └── DraggableModal.jsx # Reusable draggable modal wrapper
├── lib/
│   ├── calculator.js      # Core math functions (add, subtract, multiply, divide, calculate)
│   ├── storage.js         # localStorage utilities
│   └── themes.js          # Theme configurations (layouts, fontSizes)
├── hooks/
│   ├── useCalculator.js   # Calculator state & logic hook
│   ├── useHistory.js      # History management hook
│   └── useTheme.js        # Theme management hook
├── utils/
│   └── symbols.js         # Symbol conversion (×, ÷) & number formatting
└── public/
    └── (static assets)
```

## Core Functions

### Calculator Functions (lib/calculator.js)

```javascript
// Basic operations (separate, reusable functions)
add(a, b)          // Addition: a + b
subtract(a, b)     // Subtraction: a - b
multiply(a, b)     // Multiplication: a × b
divide(a, b)       // Division: a ÷ b (throws error on division by zero)

// Main calculator function
calculate(operand1, operand2, operator)  // Performs calculation based on operator
```

### Display Component (components/Display.jsx)

- **Equation History**: Small text at top shows previous operand and operator
- **Current Display**: Large text shows current number being typed
- **Memory Indicator**: Shows "M: value" when memory is not zero
- **Error Display**: Shows "Error" in red when calculation fails

### History Management (hooks/useHistory.js)

```javascript
addCalculation(calc)   // Add calculation to history
clear()               // Clear all history
deleteItem(id)        // Delete single item by ID
toggleFavorite(id)    // Star/unstar calculation
addNote(id, note)     // Add note to calculation
setFilter(filter)     // Filter by operation type
setSearchQuery(query) // Search calculations
```

### Draggable Modal (components/DraggableModal.jsx)

```javascript
// Props
isOpen: boolean          // Controls visibility
onClose: function        // Close handler
title: string           // Modal title (draggable area)
defaultPosition: {x, y} // Initial position
children: ReactNode     // Modal content

// Features
- Drag by title bar
- Stays within viewport bounds
- Position persists during re-renders
- ESC key to close
- Backdrop click to close
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
| `Escape` | Clear all (AC) |
| `Backspace` | Delete last digit (⌫) |

## Customization Guide

### Changing Themes
1. Click the ⚙️ (settings) icon in the top-left
2. Select a theme using icon buttons (🌙 Dark, ☀️ Light, 🌊 Ocean, 🌅 Sunset)
3. Theme preference is saved automatically to localStorage

### Adjusting Layout
1. Open Settings modal
2. Choose from Standard, Compact, Spacious, or Scientific
3. Scientific layout includes memory buttons and 2-row tall + and = buttons
4. Layout is applied immediately

### Changing Font Size
1. Open Settings
2. Choose Small, Medium, or Large
3. Affects display text size

### Using Draggable Modals
- **Drag**: Click and hold the title bar ("Settings" or "History")
- **Move**: Drag modal to any position on screen
- **Position Persists**: Modal stays where you place it even when changing settings
- **Close**: Click X button, press ESC, or click backdrop
- **Reopen**: Position resets to default when reopening modal

### Viewing History
1. Click the 🕒 (history) icon in the top-right
2. History modal opens as draggable window
3. Use filters to show specific operations (+, -, ×, ÷)
4. Search calculations using search box
5. Click ⭐ to favorite, 📝 to add notes, 🗑️ to delete
6. View statistics (total calculations, favorites count)

## Accessibility

- All interactive elements have ARIA labels
- Keyboard navigation fully supported (Tab, Enter, Escape)
- Screen reader friendly with proper roles
- High contrast support through CSS variables
- Focus indicators on all buttons (ring-2 ring-offset-2)
- Semantic HTML structure (button, input, div elements)
- Live regions for display updates (aria-live="polite")

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy automatically
4. Environment: Next.js 16 with App Router

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Any Node.js hosting (requires Node 18+)

## Browser Support

- Chrome/Edge (latest) ✅
- Firefox (latest) ✅
- Safari (latest) ✅
- Mobile browsers (iOS Safari, Chrome Mobile) ✅

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes (follow existing code style)
4. Test thoroughly (calculator operations, history, modals)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Submit a pull request

## Known Features & Behavior

- **Port**: Development server uses port 3001 if 3000 is occupied
- **Display Logic**: Shows current operand being typed, not previous operand
- **Modal Position**: Resets when modal is closed and reopened
- **History**: Stored in browser localStorage (cleared on browser data clear)
- **Equation Display**: Small text shows "5 +" while typing "2" for "5 + 2"

## Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js 16 and React 19**

**Key Features**: Draggable Modals • Icon-Based Themes • Split Display • Calculation History • Full Keyboard Support
