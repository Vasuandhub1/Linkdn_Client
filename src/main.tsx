import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme.ts"
import { Provider } from 'react-redux'
import {store} from './Redux/store.ts'

createRoot(document.getElementById('root')!).render(
  
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </Provider>
 
)
