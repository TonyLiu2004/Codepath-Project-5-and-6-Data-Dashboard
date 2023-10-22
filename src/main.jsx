import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Layout from "../routes/Layout.jsx";
import DetailView from '../routes/DetailView.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index={true} element={<App />} />
      <Route index={false} path="/dish/:id" element={<DetailView />} />
      <Route path="*"
        element={
          <main>
            <h2>Where are you?</h2>
            <Link to="/">
              Back to Home
            </Link>
          </main>
        }
      />
      </Route>
    </Routes>
  </BrowserRouter>
</React.StrictMode>
)
