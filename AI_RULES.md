# AI Agent Rules for HealthDash App Development

This document outlines the technical stack and development guidelines for the HealthDash application, intended for AI agents contributing to its codebase.

## Tech Stack Overview

*   **Framework:** React for building dynamic and interactive user interfaces.
*   **Language:** TypeScript for robust type checking, improved code quality, and better developer tooling.
*   **Routing:** React Router is used for client-side navigation, with all primary application routes defined within `src/App.tsx`.
*   **Styling:** Tailwind CSS is the exclusive utility-first CSS framework for all styling, ensuring responsive and consistent design across the application.
*   **UI Components:** shadcn/ui provides a collection of accessible and customizable UI components, built on Radix UI primitives.
*   **Icons:** lucide-react is used for all vector icons throughout the application.
*   **Component Foundation:** Radix UI serves as the unstyled, accessible foundation for `shadcn/ui` components.
*   **Project Structure:** All source code resides in the `src/` directory. Pages are located in `src/pages/`, and reusable components are in `src/components/`.
*   **Main Entry Point:** The default application page is `src/pages/Index.tsx`.

## Library Usage Guidelines

*   **UI Components:** Always prioritize using components from `shadcn/ui`. If a required component is not available or needs significant modification, create a new, dedicated component file in `src/components/` and style it using Tailwind CSS. **Do not modify `shadcn/ui`'s original source files.**
*   **Styling:** All styling must be implemented using `Tailwind CSS` utility classes. Avoid custom CSS files or inline styles unless explicitly instructed.
*   **Icons:** Use icons exclusively from the `lucide-react` library.
*   **Routing:** Manage all application navigation using `react-router-dom`.
*   **New Components/Hooks:** Every new component or custom hook must be created in its own dedicated file within `src/components/` or `src/hooks/` (if hooks are introduced).
*   **Responsiveness:** All designs and components must be responsive, adapting gracefully to various screen sizes using Tailwind's responsive utilities.
*   **User Feedback:** Utilize a toast notification system (e.g., `react-hot-toast` if installed, or similar) to provide users with important feedback on actions and events.
*   **Error Handling:** Avoid implementing `try/catch` blocks for error handling unless specifically requested. Errors should generally bubble up for centralized handling.
*   **Simplicity:** Strive for simple, elegant, and maintainable code. Avoid over-engineering solutions.
*   **File Naming:** Directory names must be all lower-case (e.g., `src/pages`, `src/components`). File names may use mixed-case (e.g., `UserProfile.tsx`).