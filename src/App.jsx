import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./routes/Router";
import { LoadingProvider } from "./contexts/Loading/Loading";
import BackToTop from "./components/BackToTop/BackToTop";

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <Router />
        <BackToTop />
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
