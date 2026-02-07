import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './App.css';

function AppLayout() {
  const [showMenu, setShowMenu] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const nav = useNavigate();
  const searchRef = useRef(null); 
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);


  const fetchData = (value) => {
    fetch(`http://localhost:8080/searchbook/${encodeURIComponent(value)}`)
      .then((response) => {
        if (!response.ok) throw new Error("Book not found");
        return response.json();
      }).then(json => {
        setResults(Array.isArray(json) ? json : [json]); 
      })
      .catch(error => {
        console.error("Error:", error);
        setResults([]);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim() !== "") {
      fetchData(value);
    }else{
      setResults([]);
    }
};

const handleSearchClick = () => {
  if (input.trim()) {
    nav(`/results/${encodeURIComponent(input.trim())}`);
    setResults([]);
  }
};

  const toggleMenu = () => {
    setShowMenu(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {username && (
        <>
          <div className="header">
            <img className="icon" src="/lion.png" alt="lion_image" />
              <div className="header-right">
                <div>
                {username && (
                  <p className="label">Logged in as <strong>{username}</strong></p>
                )}
                  
                </div>
                <button onClick={() => {
                    localStorage.removeItem("username");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("email");
                    setUsername(null);
                    nav("/");
                    setShowMenu(false);
                    setInput("");
                    setResults([]);
                  }} className="logoutButton">
                    <strong>Logout</strong>
                  </button>
                  <button className="menuButton" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars alt-icon"></i>
                  </button>
                  <Link to="/profile" className="userButton">
                    <i className="bi bi-person big-icon"></i>
                  </Link>
              </div>

              {showMenu && (
                <div className="dropdownMenu" style={{position:"fixed",marginTop:"15px"}}>
                  <Link to="/home" onClick={() => setShowMenu(false)}><strong>Home</strong></Link>
                  <Link to="/mylist" onClick={() => setShowMenu(false)}><strong>My Books</strong></Link>
                  <Link to="/about" onClick={() => setShowMenu(false)}><strong>About</strong></Link>
                  <Link to="/contact" onClick={() => setShowMenu(false)}><strong>Contact</strong></Link>
                </div>
              )}

              <div className="searchBox" ref={searchRef}>
                <input type="text" placeholder="Search" value={input} onChange={handleChange} />
                <button className="searchButton" onClick={handleSearchClick}>
                  <i className="fa-solid fa-magnifying-glass alt-icon"></i>
                </button>

                {results.length > 0 && (
                  <div className="dropdown">
                    {results.filter((book) => 
                      book.title.toLowerCase().includes(input.toLowerCase())
                    ).slice(0,5).map((book) => {
                      const imageUrl = (!book.image || book.image.trim() === "" || book.image === "null")
                        ? "/default.jpg"
                        : book.image;
                      return (
                        <div key={book.id} className="dropdown_row" onClick={() => {
                          nav(`/results/${encodeURIComponent(book.title)}`);
                          setInput(book.title);
                          setResults([]);
                        }}>
                          <img src={imageUrl} alt="cover" className="dropdown-cover" />
                          <span className="dropdown-title">
                            {book.title.length > 50 ? book.title.slice(0, 50) + "..." : book.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}    
  <Outlet />
</>
);
}

export default AppLayout;  
          
     

       