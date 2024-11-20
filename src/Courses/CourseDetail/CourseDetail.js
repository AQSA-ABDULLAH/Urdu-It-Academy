import React from "react";
import { Container, Breadcrumb, Spinner } from "react-bootstrap";
import Discovers from "../../Discovers/Discovers";
import Certificates from "../Certificates/Certificates";

import globalVar from "../../globalVar";

export class CourseDetail extends React.Component {
  static propTypes = {};
  constructor() {
    super();
    this.state = {
      courseDetail: [],
      id: window.location.pathname.split("/").pop(),
      showLoader: true,
    };
  }

  componentDidMount() {
    this.loadCourses(this.state.id);
  }

  loadCourses(id) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vendorId: id }),
    };
    fetch(globalVar.url + "courses_details", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ courseDetail: response.data }, () =>
          console.log("Course Model Data", this.state.courseDetail)
        );
        this.state.showLoader = false;
      })
      .catch((error) => console.log(error));

    console.log("courseDetail", this.state.courseDetail);
  }

  render() {
    return (
      <>
        <section className="section section-courses inner-page">
          <Container>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/courses">Courses</Breadcrumb.Item>
              <Breadcrumb.Item active>
                {this.state.courseDetail.vendor_Name}
              </Breadcrumb.Item>
            </Breadcrumb>

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
                <div className="mb-4">
                  <h2 className="title page-title">
                    {this.state.courseDetail.vendor_Name}
                  </h2>
                  <p>{this.state.courseDetail.detail}</p>
                </div>
              </>
            )}
          </Container>
        </section>

        <Certificates id={this.state.id} courseName={this.state.courseDetail} />

        <Discovers />
      </>
    );
  }
}

export default CourseDetail;
