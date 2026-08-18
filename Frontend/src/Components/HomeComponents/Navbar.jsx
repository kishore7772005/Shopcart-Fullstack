import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import shopcartImg from "../../assets/HomeImages/image.png";
import { CartContext } from "../../ContextProvider";
import { AuthContext } from "../../AuthContext";   // ✅ NEW
import { Link } from "react-router-dom";
import {
  products,
  popularProducts,
  bestProducts,
  sellingProducts,
} from "../../assets/Asset";

const MyNavbar = () => {
  const { getTotalItems, showAlert, alertMessage } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext); // ✅ NEW

  const cartCount = getTotalItems();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const categories = [
    { name: "Furniture", items: 240 },
    { name: "Hand Bag", items: 240 },
    { name: "Shoe", items: 240 },
    { name: "Headphone", items: 240 },
    { name: "Laptop", items: 240 },
    { name: "Book", items: 240 },
  ];

  const allProducts = [
    ...products,
    ...popularProducts,
    ...bestProducts,
    ...sellingProducts,
  ];

  const leftCategories = categories.slice(0, 3);
  const rightCategories = categories.slice(3, 6);

  const searchResults =
    searchQuery.trim() === ""
      ? []
      : allProducts
          .filter((p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 8);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.trim() !== "");
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    setShowSearchResults(false);
  };

  return (
    <header>
      {/* Alert Message */}
      {showAlert && (
        <div
          className="alert-notification position-fixed top-0 start-50 translate-middle-x mt-3"
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 9999,
            animation: "slideDown 0.3s ease-in-out",
          }}
        >
          {alertMessage}
        </div>
      )}

      {/* --- TOP STRIP --- */}
      <div className="top-strip d-flex align-items-center justify-content-between px-4">
        <div className="d-flex align-items-center top-left">
          <span className="phone-badge">📞</span>
          <span className="phone-number">+00123456789</span>
        </div>

        <div className="top-center">
          <span className="promo me-3">Get 50% Off on Selected Items</span>
          <a href="/" className="shop-now-link">
            Shop Now
          </a>
        </div>

        <div className="d-flex align-items-center gap-4 top-right">
          <div className="lang-selector">
            <span>Eng</span>
            <span className="ms-1">▼</span>
          </div>
          <div className="location-selector">
            <span>Location</span>
            <span className="ms-1">▼</span>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <Navbar expand="lg" className="main-navbar">
        <Container>
        <div className="d-flex align-items-center brand-wrap">
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Image src={shopcartImg} height={40} alt="logo" />
          </Link>
        </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="align-items-center main-links">
              <NavDropdown
                title="Category"
                id="category-dropdown"
                className="me-4"
              >
                <div className="category-dropdown-content">
                  <div className="category-column">
                    {leftCategories.map((cat, idx) => (
                      <div key={idx} className="category-item">
                        <a
                          href={`#${cat.name.toLowerCase()}`}
                          className="category-link"
                        >
                          {cat.name}
                        </a>
                        <span className="category-count">
                          {cat.items} Item Available
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="category-column">
                    {rightCategories.map((cat, idx) => (
                      <div key={idx} className="category-item">
                        <a
                          href={`#${cat.name.toLowerCase()}`}
                          className="category-link"
                        >
                          {cat.name}
                        </a>
                        <span className="category-count">
                          {cat.items} Item Available
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </NavDropdown>

              <Nav.Link as={Link} to="/deals" className="me-4">
                Deals
              </Nav.Link>
              <Nav.Link as={Link} to="/bestproducts" className="me-4">
                Best Products
              </Nav.Link>
              <Nav.Link href="/whatsnew" className="me-4">
                What's New
              </Nav.Link>
              <Nav.Link href="/orderpage" className="me-4">
                Your Order
              </Nav.Link>
            </Nav>

            {/* SEARCH BAR */}
            <Form className="d-flex mx-auto search-form" role="search">
              <div className="search-input-wrap d-flex align-items-center">
                <FormControl
                  type="search"
                  placeholder="Search Product"
                  aria-label="Search"
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />

                {searchQuery ? (
                  <button
                    type="button"
                    className="search-icon-btn"
                    onClick={handleSearchClear}
                    style={{ cursor: "pointer" }}
                  >
                    ✕
                  </button>
                ) : (
                  <button type="button" className="search-icon-btn">
                    🔍
                  </button>
                )}
              </div>

              {/* SEARCH RESULTS */}
              {showSearchResults && searchResults.length > 0 && (
                <div
                  className="search-results-dropdown position-absolute"
                  style={{
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    width: "500px",
                    maxHeight: "400px",
                    overflowY: "auto",
                    zIndex: 1000,
                    padding: "10px",
                  }}
                >
                  {searchResults.map((product, idx) => (
                    <div
                      key={idx}
                      className="search-result-item p-2 mb-2 d-flex align-items-center rounded-2"
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#f8f9fa",
                      }}
                      onClick={handleSearchClear}
                    >
                      <img
                        src={product.img}
                        alt={product.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          marginRight: "12px",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h6
                          className="mb-0"
                          style={{ fontSize: "14px", fontWeight: "600" }}
                        >
                          {product.title}
                        </h6>
                        <small className="text-muted">{product.price}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Form>

            {/* LOGIN / LOGOUT + CART */}
            <div className="nav-actions d-flex align-items-center gap-4">

              {/* LOGIN / LOGOUT BUTTON */}
              {user ? (
                <button
                  onClick={logout}
                  className="btn btn-danger btn-sm"
                >
                  Logout
                </button>
              ) : (
                <Link className="btn btn-primary btn-sm" to="/login">
                  Login
                </Link>
              )}

              {/* CART */}
              <Link
                to="/cart"
                className="cart-link position-relative"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                🛒 Cart
                {cartCount > 0 && (
                  <Badge
                    bg="danger"
                    className="position-absolute"
                    style={{ top: "-8px", right: "-8px" }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default MyNavbar;
