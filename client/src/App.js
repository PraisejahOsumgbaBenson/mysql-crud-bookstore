import { BrowserRouter, Routes, Route } from "react-router-dom";
import Book from "./pages/books";
import Add from "./pages/add";
import Update from "./pages/update";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Book />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:book_id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
