import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Layout } from '../lib/main.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Layout menu={<>
            <div>Меню</div>
            <div>Меню</div>
            <div>Меню</div>
            <div>Меню</div>
            <div>Меню</div>
        </>}>
            <App />
        </Layout>
    </React.StrictMode>,
);
