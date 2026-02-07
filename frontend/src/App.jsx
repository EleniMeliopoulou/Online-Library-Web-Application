import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BooksByGenre from "./BooksByGenre";
import BookInformation from "./pages/BookInformation";
import LoginSignup from "./LoginSignup";
import MyBorrowedBooks from "./pages/MyBorrowedBooks";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/" element={<AppLayout />}>
          <Route path="home" element={<><Home /> <BooksByGenre groupByGenre={true} /></>} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="results/:title" element={<BookInformation />} />
          <Route path="mylist" element={<MyBorrowedBooks />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;