import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

// 1. Helper function untuk generate Numeric Spacing (1:1 Ratio)
// Mengembalikan object: { '1': '1px', '2': '2px', ... }
const generateNumericSpacing = () => {
  const spacing: Record<string, string> = {
    "0": "0px",
    px: "1px",
    "0.5": "0.5px",
  };

  // Satuan Kecil (1-20)
  for (let i = 1; i <= 20; i++) {
    spacing[i] = `${i}px`;
  }

  // Satuan Menengah & Besar
  const largerSizes = [
    24, 25, 28, 30, 32, 36, 40, 44, 48, 50, 56, 60, 64, 72, 80, 96, 100, 128,
    140, 160, 200, 256,
  ];

  largerSizes.forEach((size) => {
    spacing[size] = `${size}px`;
  });

  return spacing;
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Menambahkan Font Family Global
      fontFamily: {
        sans: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },

      // Menggabungkan Numeric Spacing + Named Spacing
      spacing: {
        ...generateNumericSpacing(),
        
        // Named Spacing (Design System)
        none: "0rem",
        xxs: "0.125rem", // 2px
        xs: "0.25rem", // 4px
        sm: "0.375rem", // 6px
        md: "0.5rem", // 8px
        lg: "0.75rem", // 12px
        xl: "1rem", // 16px
        "2xl": "1.25rem", // 20px
        "3xl": "1.5rem", // 24px
        "4xl": "2rem", // 32px
        "5xl": "2.5rem", // 40px
        "6xl": "3rem", // 48px
        "7xl": "4rem", // 64px
        "8xl": "5rem", // 80px
        "9xl": "6rem", // 96px
        "10xl": "8rem", // 128px
        "11xl": "8.75rem", // 140px
      },

      // Typography Configuration
      // Format: [FontSize, { lineHeight, letterSpacing }]
      fontSize: {
        // --- Display ---
        "display-3xl": [
          "3.75rem",
          { lineHeight: "4.5rem", letterSpacing: "-0.03em" },
        ],
        "display-2xl": [
          "3rem",
          { lineHeight: "3.75rem", letterSpacing: "-0.03em" },
        ],
        "display-xl": [
          "2.5rem",
          { lineHeight: "3rem", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "2.25rem",
          { lineHeight: "2.75rem", letterSpacing: "-0.03em" },
        ],
        "display-md": [
          "2rem",
          { lineHeight: "2.5rem", letterSpacing: "-0.03em" },
        ],
        "display-sm": [
          "1.75rem",
          { lineHeight: "2.375rem", letterSpacing: "-0.03em" },
        ],
        "display-xs": [
          "1.5rem",
          { lineHeight: "2.25rem", letterSpacing: "-0.03em" },
        ],

        // --- Body ---
        "body-xl": [
          "1.25rem",
          { lineHeight: "2.125rem", letterSpacing: "-0.03em" },
        ],
        "body-lg": [
          "1.125rem",
          { lineHeight: "2rem", letterSpacing: "-0.03em" },
        ],
        "body-md": [
          "1rem",
          { lineHeight: "1.875rem", letterSpacing: "-0.03em" },
        ],
        "body-sm": [
          "0.875rem",
          { lineHeight: "1.75rem", letterSpacing: "-0.03em" },
        ],
        "body-xs": [
          "0.75rem",
          { lineHeight: "1.5rem", letterSpacing: "-0.03em" },
        ],
      },
    },
  },
  plugins: [],
};

export default config;