// Add the TypeScript React import
import React from "react";
import ReactDOM from "react-dom/client";
// Update import paths to .tsx if App and AppContextProvider are converted to TypeScript
import App from "./App.jsx";
import "./styles/app.scss";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./components/AppContextProvider.jsx";
import { ChakraProvider } from "@chakra-ui/react";

// Define the type for serverLink. Assuming it's a string.
export const serverLink: string = "http://localhost:3000/api/v1";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </AppContextProvider>
);
