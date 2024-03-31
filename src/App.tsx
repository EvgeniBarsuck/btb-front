import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/home";
import { LoginPage } from "./pages/login/login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { BlogsPage } from "./pages/blogs/Blogs";
import { AdminPage } from "./pages/admin/AdminPage";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
