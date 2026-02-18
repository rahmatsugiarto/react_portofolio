# Rahmat Sugiarto - Personal Website

A modern, responsive personal portfolio website built with **React**, **Vite**, and **Tailwind CSS**.

## 🚀 Tech Stack

- **[React](https://react.dev/)**: JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: Fast frontend build tool.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
- **[React Router](https://reactrouter.com/)**: Standard routing library for React.
- **[Framer Motion](https://www.framer.com/motion/)**: Production-ready motion library for React.

## ✨ Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **Clean Architecture**: Component-based structure (`src/components`, `src/layouts`, `src/pages`).
- **Smooth Animations**: Interactive UI elements powered by Framer Motion.
- **Fast Performance**: Built with Vite for lightning-fast HMR and optimized production builds.

## 🛠️ Installation & Setup

1.  **Clone the repository** (if you haven't already):

    ```bash
    git clone https://github.com/StartYourFork/rahmatsugiarto.git
    cd rahmatsugiarto
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
├── components/   # Reusable UI components (Header, Footer, etc.)
├── layouts/      # Layout wrappers (MainLayout)
├── pages/        # Page components (Home, About, Projects, Contact)
├── App.jsx       # Main application component & Routing config
├── main.jsx      # Entry point
└── index.css     # Global styles & Tailwind directives
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
