# CRAV - Artisan Smashed Burgers Storefront

This repository hosts the official front-end implementation of the CRAV Smashed Burgers storefront, powering the experience at https://www.cravburgers.shop/.

## Project Structure and Goals
The storefront is designed as an immersive, motion-driven e-commerce landing experience that breaks away from traditional block-based retail layouts.

Key highlights of the architecture include:
- A high-impact, pop-art visual brand style utilizing bold typography, thick text stroke offsets, and dynamic organic shapes.
- Snappy, responsive micro-interactions (like realistic sticker peeling and slide transition loaders) that feel organic and react fluidly to user inputs.
- A fully responsive codebase that ensures fluid layouts across varying viewports (from mobile screens to ultra-wide desktop monitors) without sacrificing design ratios.
- High performance, low Cumulative Layout Shift (CLS), and optimal paint times during complex motion sequences.

## Detailed Technical Implementations

### Interactive Physics-Based Sticker Peeling
The custom sticker component (`Sticker.tsx`) replicates the tactile physical behavior of vinyl stickers being peeled off a surface.
- **Spring Physics**: Utilizes Framer Motion's `useSpring` to drive the animation. By tuning stiffness (90) and damping (12), the component avoids linear transition curves, providing a snappy, physical bounce.
- **Custom Properties & Performance**: Instead of directly modifying heavy CSS attributes via JS layout loops, the spring binds to a custom CSS variable (`--peel-amount`). This delegates the clip-path calculations and rendering to the browser's hardware-accelerated composition layer.
- **Clip-Path Geometry**: The component renders the sticker in two overlapping layers. The base layer uses a dynamic polygon clip-path representing the remaining stuck portion, while the flap layer uses an inverted clip-path, flipped vertically (`scaleY(-1)`) and offset on the Y-axis.
- **Lighting Filters**: Employs SVG filter primitives (`feSpecularLighting`, `fePointLight`) to cast realistic highlights on the peeled flap and soft shadows beneath it, giving the sticker a true 3D aesthetic.

### Layered Stage-Transition Loader
The initial loading sequence provides a premium brand introduction by choreographing multiple full-screen sliding overlays.
- **Choreographed Timelines**: State synchronization matches the loading progress bar to the translation animations.
- **Color Overlay Transitions**: Three structural panels in Deep Maroon, Orange, and Red slide up sequentially.
- **Asset Warm-up**: While the intro executes, critical visual assets (like the high-resolution smashed burger and stickers) pre-load in the background to ensure instantaneous rendering upon page entry.

### Pop-Art Typography & Layout Constraints
- **Double Outlined Text**: Headers use the bubble-shaped Google Font Modak. To ensure maximum readability, text outlines are declared using `-webkit-text-stroke` coupled with `paint-order: stroke fill`. This draws the dark borders beneath the colored text fills, preventing the borders from eating into thin characters.
- **Fluid Layout Dimensions**: Incorporates viewport width (`vw`) font sizes and padding structures to preserve the asymmetrical design ratio regardless of the viewport dimensions.
- **Zero-Stagger Grid Alignment**: Product cards are aligned on a clean, single horizontal plane to facilitate scannability while retaining their striking pop-art border weights and flat offset block shadows.

## Tech Stack & Architecture
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS, PostCSS, Custom Utility Layers
- **Motion**: Framer Motion (State-driven transitions, exit animations, spring physics), GSAP (QuickTo coordinates)
- **Smooth Scroll**: Lenis Scroll (interpolated kinetic scroll to ensure GSAP animations sync with physical trackpad inputs)
- **Asset Storage**: WebP formats optimized for high-density screens



3. Open http://localhost:3001 in your browser.

Website URL: https://www.cravburgers.shop/
