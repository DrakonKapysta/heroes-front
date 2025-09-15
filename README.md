## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Backend API** server running on `http://localhost:5000`

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd front-end
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   │   ├── auth.tsx    # Auth context and hooks
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── Profile.tsx
│   ├── Hero/           # Hero-related components
│   │   ├── HeroCard.tsx
│   │   ├── HeroList.tsx
│   │   ├── HeroFilter.tsx
│   │   ├── FullHeroInfo.tsx
│   │   └── SuperheroForm.tsx
│   ├── ui/             # shadcn/ui components
│   ├── Modal.tsx       # Modal component
│   └── Navbar.tsx      # Navigation component
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts  # Debounce hook
│   └── useMediaQuery.ts # Media query hook
├── lib/                # Utility functions
│   └── utils.ts        # Tailwind class merger
├── routes/             # File-based routing
│   ├── __root.tsx      # Root layout
│   ├── index.tsx       # Home page
│   ├── login.tsx       # Login page
│   ├── register.tsx    # Registration page
│   └── _protected/     # Protected routes
│       ├── route.tsx   # Auth guard
│       ├── create-hero.tsx
│       └── update-hero/
│           └── $heroId.tsx
├── types.ts            # TypeScript definitions
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🔐 Authentication System

The app uses JWT-based authentication with the following features:

- **Registration**: New user signup with email and password
- **Login**: Secure authentication with persistent sessions
- **Profile Management**: Update username and logout functionality
- **Route Protection**: Automatic redirection for protected routes
- **Context Provider**: Global auth state management

## 🦸‍♀️ Hero Management

### Superhero Features

- **40+ Superpowers**: Comprehensive list including flight, super strength, telepathy, etc.
- **Multiple Images**: Upload and manage multiple images per hero
- **Rich Profiles**: Nickname, real name, origin story, catch phrase

### Filtering & Search

- **Text Search**: Search by nickname or real name with debouncing
- **Superpower Filter**: Filter by any combination of superpowers
- **Sorting Options**: Sort by nickname, real name, or creation date
- **Pagination**: Configurable page sizes (5, 10, 15, 20, 50, 100)
