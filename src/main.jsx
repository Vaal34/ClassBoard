// main.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Tableau from "./tableau.jsx";
import ClassSelector from "./pages/classSelector/classSelector.jsx";
import SettingsData from "./pages/settingsData/settingsData.jsx";
import "./main.css"

function TableauPerClass() {
  // récupere :path de l'url /classe/:path
  const { path } = useParams();
  return <Tableau key={path} classePath={path} />;
}

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/class" replace />} />
          <Route path="/classes" element={<ClassSelector />} />
          <Route path="/setting-class" element={<SettingsData />} />
          <Route path="/classe/:path" element={<TableauPerClass />} />
          <Route path="*" element={<Navigate to="/classes" replace />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
