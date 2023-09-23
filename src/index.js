
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Create a QueryClient instance
const queryClient = new QueryClient();



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
);
reportWebVitals();
