/**
 * Theme configurations for the calculator
 */

export const themes = {
  light: {
    name: 'Light',
    description: 'Clean and bright theme for daytime use',
  },
  dark: {
    name: 'Dark',
    description: 'Easy on the eyes in low light',
  },
  ocean: {
    name: 'Ocean',
    description: 'Cool blue and teal palette',
  },
  sunset: {
    name: 'Sunset',
    description: 'Warm oranges and purples',
  },
  neon: {
    name: 'Neon',
    description: 'Cyberpunk vibes with glowing colors',
  },
  minimal: {
    name: 'Minimal',
    description: 'Monochrome and clean',
  },
}

export const buttonStyles = {
  rounded: {
    name: 'Rounded',
    description: 'Soft rounded corners',
    className: 'rounded-2xl',
  },
  square: {
    name: 'Square',
    description: 'Sharp edges, no rounding',
    className: 'rounded-none',
  },
  neumorphic: {
    name: 'Neumorphic',
    description: 'Soft 3D effect',
    className: 'rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.1)]',
  },
  glassmorphic: {
    name: 'Glassmorphic',
    description: 'Frosted glass effect',
    className: 'rounded-2xl backdrop-blur-sm bg-opacity-80',
  },
}

export const layouts = {
  standard: {
    name: 'Standard',
    description: 'Default calculator layout',
  },
  compact: {
    name: 'Compact',
    description: 'Smaller buttons, minimal spacing',
  },
  spacious: {
    name: 'Spacious',
    description: 'Large buttons, generous padding',
  },
  scientific: {
    name: 'Scientific',
    description: 'Advanced operations included',
  },
}

export const fonts = {
  display: {
    mono: {
      name: 'JetBrains Mono',
      className: 'font-mono',
    },
    fira: {
      name: 'Fira Code',
      className: 'font-mono',
    },
    courier: {
      name: 'Courier New',
      className: 'font-[Courier]',
    },
  },
  ui: {
    inter: {
      name: 'Inter',
      className: 'font-sans',
    },
    poppins: {
      name: 'Poppins',
      className: 'font-sans',
    },
    roboto: {
      name: 'Roboto',
      className: 'font-sans',
    },
  },
}

export const fontSizes = {
  small: {
    name: 'Small',
    displayClass: 'text-3xl',
    buttonClass: 'text-lg',
  },
  medium: {
    name: 'Medium',
    displayClass: 'text-4xl',
    buttonClass: 'text-xl',
  },
  large: {
    name: 'Large',
    displayClass: 'text-5xl',
    buttonClass: 'text-2xl',
  },
}
