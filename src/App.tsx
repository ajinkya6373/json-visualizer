import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./page/NotFound";
import Index from "./page/Index";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
