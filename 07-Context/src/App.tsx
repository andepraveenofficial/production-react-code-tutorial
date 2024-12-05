import React, { CSSProperties } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeToggle } from './components/ThemeToggle'
import { LoginForm } from './components/LoginForm'


const App: React.FC = () => {
  const appStyles:CSSProperties = {  display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }

  return (
    <AuthProvider>
      <ThemeProvider>
        <div style={appStyles}>
          <h1>React Context Example</h1>
          <ThemeToggle />
          <LoginForm />
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App