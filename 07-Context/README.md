# Context

### Tech Stack

- UI Layer: React
- Language: Typescript
- Build Tool: Vite

### Setup

1. `npm install -g npm`
2. `npx create-vite .`
3. Select React
4. Select Typescript

### Installation

- `npm install`

### Start the Application

- `npm run dev`

### Avoid Errors

- I added "incremental": true to the compilerOptions
- Incremental compilation helps TypeScript compile only the files that have changed since the last compilation, which can significantly speed up build times

```json tsconfig.app.json
 "incremental": true,
```

### Context

#### Application Architecture

```mermaid
graph TD
    A[App.tsx] --> B[ThemeProvider]
    B --> C[AuthProvider]
    C --> D[Components]
    D --> E[LoginForm]
    D --> F[ThemeToggle]
    B -- "Provides" --> G[Theme Context<br/>- theme<br/>- toggleTheme<br/>- styles]
    C -- "Provides" --> H[Auth Context<br/>- user<br/>- login<br/>- logout<br/>- isLoading<br/>- error]
    E -- "Consumes" --> G
    E -- "Consumes" --> H
    F -- "Consumes" --> G
```

#### Data Flow

```mermaid
graph LR
    A[themeConstants.ts] --> B[ThemeContext.tsx]
    B --> C[ThemeProvider]
    C --> D[theme state]
    D --> E[Components]
    F[AuthContext.tsx] --> G[AuthProvider]
    G --> H[auth state]
    H --> E
```

#### Authentication Flow Sequence

```mermaid
sequenceDiagram
    participant User
    participant LoginForm
    participant AuthProvider
    User->>LoginForm: Submits credentials
    LoginForm->>AuthProvider: Calls login()
    AuthProvider->>AuthProvider: Validates credentials
    AuthProvider->>AuthProvider: Updates user state
    AuthProvider->>LoginForm: New auth context
    LoginForm->>LoginForm: Re-renders with user info
```
