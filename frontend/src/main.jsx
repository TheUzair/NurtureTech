import { StrictMode, Suspense } from 'react'; // Import Suspense
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n.jsx'; 

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Suspense fallback='loading...'>
      <App />
    </Suspense>
  // </StrictMode>
);
