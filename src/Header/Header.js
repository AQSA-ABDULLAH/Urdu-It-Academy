import "./Header.scss";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

function Header() {
  const location = useLocation();

  // Function to check if the current path matches any of the "courses" related paths
  const isCoursesPageActive = () => {
    const { pathname } = location;
    return (
      pathname === "/courses" ||
      pathname.startsWith("/course/") ||
      pathname.startsWith("/exam-availability/") ||
      pathname.startsWith("/lecture/")
    );
  };

  return (
    <>
      <div className="header">
        <Navbar expand="lg" className="nav-menu">
          <Container>
            <Navbar.Brand href="/">
              <Image src={"./assets/images/logo.svg"} alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                navbarScroll
              >
                <Nav.Link href="/" className={location.pathname === "/" ? "active" : ""}>
                  Home
                </Nav.Link>
                <Nav.Link href="/courses" className={isCoursesPageActive() ? "active" : ""}>
                  Courses
                </Nav.Link>
                <Nav.Link href="https://www.urduitacademy.com/quiz/" className={location.pathname === "/aboutus" ? "active" : ""} target="_blank" rel="noopener noreferrer">
                  Quiz
                </Nav.Link>
                <Nav.Link href="/aboutus" className={location.pathname === "/aboutus" ? "active" : ""}>
                  About
                </Nav.Link>
                <Nav.Link href="/help" className={location.pathname === "/help" ? "active" : ""}>
                  Help
                </Nav.Link>
                <Nav.Link href="/blogs" className={location.pathname === "/blogs" ? "active" : ""}>
                  Blog
                </Nav.Link>
              </Nav>
              <Form className="d-flex menu-search">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </Form>
            </Navbar.Collapse>

          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default Header;
