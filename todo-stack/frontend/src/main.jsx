import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { App } from './App.jsx'
import './assets/strings/ThemesStandard.css'
import {initTheme, ThemeToggleButton, setTheme} from './ThemeHandler.jsx'

initTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>    
      <App themeToggler={ThemeToggleButton}/>
    </BrowserRouter>
  </StrictMode>,
)
