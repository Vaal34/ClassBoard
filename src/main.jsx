// main.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import Tableau from "./tableau.jsx";
import { createRoot } from "react-dom/client";
import ClassSelector from "./pages/classSelector/classSelector.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
          <Route path="/classe/:path" element={<TableauPerClass />} />
          <Route path="*" element={<Navigate to="/classes" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
);
