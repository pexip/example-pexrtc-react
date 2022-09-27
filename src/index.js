import React from 'react';
import ReactDOM from 'react-dom/client';

import Pexip from './Pages/Pexip/Pexip';
import PexipProvider, { usePexip } from './Providers/Pexip/PexipProvider';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PexipProvider>
      <Pexip />
    </PexipProvider>
  </React.StrictMode>
);
