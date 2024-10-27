import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

function App() {
  const { loadAuthFromStorage } = useAuthStore();

  useEffect(() => {
    loadAuthFromStorage();
  }, [loadAuthFromStorage]);

  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
