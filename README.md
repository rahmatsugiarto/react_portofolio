# Rahmat Sugiarto - Mobile Developer Portfolio

A minimalist, high-performance personal portfolio website built with modern web technologies. This project showcases a clean design aesthetic, fluid animations, and interactive elements.

## 🚀 Tech Stack

- **[React](https://react.dev/)**: Frontend framework for building the UI.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for styling.
- **[GSAP](https://gsap.com/)**: GreenSock Animation Platform for robust animations (ScrollTrigger, Tweening).
- **[Framer Motion](https://www.framer.com/motion/)**: Used for layout transitions and simple gesture animations.

## ✨ Key Features

- **Minimalist Aesthetics**: typography-driven design with a monochromatic color scheme and subtle blue accents.
- **Scroll Sequence Hero**: A highly optimized, customized image sequence animation controlled by scroll (powered by GSAP ScrollTrigger).
- **Magnetic Interactivity**: Custom `Magnetic` component for buttons and links that gravitate towards the cursor.
- **Pinned Scroll Projects**: A horizontal scrolling section for showcasing projects, offering a unique navigational experience.
- **Infinite Marquee**: Seamlessly looping skills section using GSAP.
- **Custom Cursor**: A custom-implemented cursor that interacts with clickable elements.
- **Dark/Light Mode**: Fully responsive theme switching.

## 🛠️ Installation & Setup

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/rahmatsugiarto/portfolio-v2.git
    cd portfolio-v2
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` directory, ready for deployment to Vercel, Netlify, or GitHub Pages.

## 📂 Project Structure

```
src/
├── components/
│   ├── sections/    # Page sections (Home, About, Projects, etc.)
│   ├── ui/          # Reusable UI components (Magnetic, ScrollSequence, etc.)
│   └── ...
├── layouts/         # Layout wrappers (MainLayout)
├── pages/           # Page components
├── assets/          # Static assets
└── ...
public/
├── sequence/        # Image sequence frames for Hero section
└── ...
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
