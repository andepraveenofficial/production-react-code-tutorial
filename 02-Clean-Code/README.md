# Clean Code setup

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

## Clean Code Setup

1. Git
2. Husky
3. Eslint
4. Prettier
5. Lint-staged
6. Commitlint

### 1. Git Setup

- `git init`

```bash .gitignore
# Dependencies
node_modules
dist

# Environment
.env
.env.local

# IDE
.vscode
.idea

# Build
dist
build

# Logs
*.log
npm-debug.log*

# Testing
coverage

# Misc
.DS_Store
```

### 2. Husky & Lint-staged Setup

```bash
# Install husky and lint-staged
npm install --save-dev husky lint-staged

# Initialize husky
npx husky-init

# Modify package.json to add lint-staged configuration
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}


# Update pre-commit hook in .husky/pre-commit
npx husky set .husky/pre-commit "echo 'Husky is working!'"
npx husky set .husky/pre-commit "npx lint-staged"

# Checking After All Setup
git commit -m "Test commit"
```

### 3. ESLint Setup

```bash
# Install ESLint and TypeScript dependencies
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# ESLint to understand TypeScript syntax : @typescript-eslint/parser
# linting rules specific to TypeScript : @typescript-eslint/eslint-plugin

# Install React ESLint plugins
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks

npm run typescript-eslint

# Create .eslintrc.json
touch .eslintrc.json
```

#### Manual eslint bash command
```bash
1. How would you like to use ESLint?
Select: To check syntax and find problems

2. What type of modules does your project use?
Choose : JavaScript modules (import/export).

3. Which framework does your project use?
Choose : React

4. Does your project use TypeScript?
Choose : Yes.

5. Where does your code run?
Choose :  Browser.

6. Would you like to install them now?
Choose : Yes

7.  Which package manager do you want to use? ...
Choose : npm
```



### 4. Prettier Setup

```bash
# Install Prettier and ESLint integration
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

# eslint-config-prettier : disables ESLint rules that conflict with Prettier.
# eslint-plugin-prettier : Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.

# Create .prettierrc
touch .prettierrc
```

## Configuration Files

### .eslintrc.json

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": ["error", {}, { "usePrettierrc": true }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  },
  "settings": {
    "react": {
      "version": "18.2"
    }
  }
}
```

### 5. Update package.json scripts

Add these scripts to your package.json:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,css,md,json}\"",
    "type-check": "tsc --noEmit",
    "prepare": "npx husky-init"
  }
}
```

### 6. Verification Steps

```bash
# 1. Install dependencies
npm install

# 2. Run type check
npm run type-check

# 3. Run linting
npm run lint

# 4. Format code
npm run format

# 5. Test git hooks
git add .
git commit -m "test: verify clean code setup"
```

### 7. Commitlint Setup

Commitlint helps enforce consistent commit message formats across your team.

```bash
# Install commitlint
npm install --save-dev @commitlint/cli @commitlint/config-conventional --legacy-peer-deps

# Create commitlint config file => check in commitlint.config.js
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

# Add husky hook for commit messages
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

#### Commit Message Format

Follow these rules for commit messages:

- Format: `type(scope): subject`
- Types:
  - `feat`: New feature
  - `fix`: Bug fix
  - `docs`: Documentation changes
  - `style`: Code style changes (formatting, etc)
  - `refactor`: Code refactoring
  - `test`: Adding or updating tests
  - `chore`: Maintenance tasks

Examples:

```
feat(auth): add login functionality
fix(api): handle null response from server
docs(readme): update installation steps
```

## Troubleshooting

If you encounter any errors:

1. Delete node_modules and package-lock.json
2. Run `npm install` again
3. Make sure all configuration files are in the root directory
4. Check that tsconfig.json exists and is properly configured
5. Run `npm run prepare` to reinstall husky hooks

## Next Steps

After setup is complete:

1. Your code will be automatically formatted on save (if your editor is configured)
2. Git commits will trigger linting and formatting
3. TypeScript errors will be caught during development
4. ESLint will help maintain code quality
