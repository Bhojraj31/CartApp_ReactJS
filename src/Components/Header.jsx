import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const count = useSelector((state) => state.total);
  return (
    <Container fluid>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Cart-app
          </a>
          <Link
            className="nav-link "
            style={{ color: "white" }}
            aria-current="page"
            to="/"
          >
            Product
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link "
                  style={{ color: "white" }}
                  aria-current="page"
                  to="/cart"
                >
                  <button
                    type="button"
                    className="btn btn-primary position-relative"
                  >
                    Cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {count}+
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                   
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Container>
  );
}
