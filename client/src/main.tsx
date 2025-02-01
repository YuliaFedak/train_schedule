import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
        <App />
      <AppRouter />
  </BrowserRouter>,
)
