import React from "react";
import "./CertificateDetail.scss";
import { Container, Breadcrumb, Spinner } from "react-bootstrap";
import Discovers from "../../Discovers/Discovers";

import globalVar from "../../globalVar";

export class CertificateDetail extends React.Component {
  static propTypes = {};
  constructor() {
    super();
    this.state = {
      courseDetail: [],
      certificationDetail: [],
      id: window.location.pathname.split("/").pop(),
      c_url: window.location.href,
      showLoader: true,
    };

    console.log("ALAI", this.state.c_url);
  }

  componentDidMount() {
    this.loadCourses(this.state.id);
  }

  loadCourses(id) {
    const filterId = parseInt(id, 10);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vendorId: 1 }),
    };
    fetch(globalVar.url + "certificates", requestOptions)
      .then((res) => res.json())
      .then((response) => {
        console.log("RRRRRRRRR", response.data);

        this.setState({ certificatesArray: response.data }, () =>
          console.log("Certificates TRY", this.state.certificatesArray)
        );
      })
      .catch((error) => console.log(error));

    fetch(globalVar.url + "courses", {
      method: "POST",
      headers: new Headers({
        Accept: "application/vnd.github.cloak-preview",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const filteredCourses = response.data.filter(
          (course) => course.vendorId === filterId
        );

        this.setState({ courseDetail: filteredCourses[0] });

        this.state.showLoader = false;
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <>
        <section className="section section-courses inner-page">
          <Container>
            {this.state.showLoader ? (
              <>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "250px" }}
                >
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              </>
            ) : (
              <>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="/courses">Courses</Breadcrumb.Item>
                </Breadcrumb>

                <div className="mb-4">
                  <h2 className="title page-title d-flex align-items-center">
                    <span className="d-inline-flex ms-3">
                      <span className="certificateStatus-tag">Completed</span>
                    </span>
                  </h2>
                </div>
              </>
            )}
          </Container>
        </section>

        <Discovers />
      </>
    );
  }
}

export default CertificateDetail;
