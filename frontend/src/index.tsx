import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import useAuthStore from './stores/AuthStore';

console.log(useAuthStore.getState().token);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
