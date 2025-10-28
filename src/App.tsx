import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./page/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="d-flex ">
                <h1 className="text-3xl font-bold underline">Hello world!</h1>
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
