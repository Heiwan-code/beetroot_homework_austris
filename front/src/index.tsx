import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    RouterProvider,
    Navigate,
    Outlet,
    createHashRouter
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import PageItems from "./routes/PageItems";
import PageItemTypes from "./routes/PageItemTypes";
import PageRarities from "./routes/PageRarities";
import Nav from "./components/General/Nav";
import './App.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const BaseLayout = () => (
    <div className="App">
        <header>
            <Nav />
        </header>
        <Outlet />
    </div>
);

const router = createHashRouter([
    {
        path: '',
        element: <Navigate to='items'/>
    },
    {
        path: '',
        element: <BaseLayout />,
        children: [
            {
                path: "items",
                element: <PageItems/>
            },
            {
                path: "item-types",
                element: <PageItemTypes/>,
            },
            {
                path: "rarities",
                element: <PageRarities/>,
            },
        ]
    }
])

root.render(

    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
