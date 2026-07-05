import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import TodoBoard from './pages/TodoBoard';
import { theme } from './theme';

function App() {
  // Theme state
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('todo_theme_mode');
    if (savedMode) return savedMode;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  });

  const activeTheme = theme(mode);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('todo_theme_mode', newMode);
  };

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <TodoBoard themeMode={mode} onThemeToggle={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;