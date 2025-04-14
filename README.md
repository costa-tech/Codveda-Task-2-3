# ReactSPA - Modern React Single Page Application

A feature-rich, responsive single page application built with React, featuring smooth animations, dark/light theme support, and a modular component architecture.

![ReactSPA](https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80)

## Features

- 🎨 **Light/Dark Theme Support**: Seamless theme switching with styled-components
- ✨ **Advanced Animations**: Various animation types using Framer Motion
- 📱 **Responsive Design**: Works on all screen sizes from mobile to desktop
- ♿ **Accessibility**: Focus management, semantic HTML, and reduced motion support
- 🧩 **Modular Components**: Clean, reusable component architecture
- 🔄 **Client-side Routing**: Smooth page transitions with React Router
- 🎭 **Animation Library**: Customizable animations for text, scrolling, and transitions

## Animation Components

The project includes several reusable animation components:

- `AnimatedText` - Text animation effects (wave, typewriter, reveal, bounce, color)
- `ScrollReveal` - Elements that animate when they enter the viewport
- `ParallaxSection` - Parallax scrolling effects
- `StaggeredReveal` - Sequential animations for multiple elements
- `PageTransition` - Transitions between pages
- `CustomCursor` - An interactive custom cursor
- `Loader` - Various loading animations

## Technologies Used

- React 19.1.0
- React Router 7.5.0
- Styled Components 6.1.17
- Framer Motion 12.6.5
- React Helmet 6.1.0
- Context API for state management

## Project Structure

```
src/
  ├── animations/       # Animation components and hooks
  ├── components/       # Reusable UI components
  ├── context/          # React Context for state management
  ├── pages/            # Application pages
  └── styles/           # Global styles and theme definitions
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/react-spa.git
   cd react-spa
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Accessibility

This project prioritizes accessibility with:

- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Support for reduced motion preferences
- Semantic HTML structure
- ARIA attributes where necessary

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
