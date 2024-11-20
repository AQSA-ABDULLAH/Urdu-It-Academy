import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import globalVar from "../../../globalVar";

export class Certificate extends React.Component {
  static propTypes = {
    certificationId: PropTypes.number.isRequired,
    certification_Name: PropTypes.string.isRequired,
    vendorId: PropTypes.number.isRequired,
    vendorName: PropTypes.string, // Add vendorName as a prop
    certificateDetail: PropTypes.string, // Optional
    status: PropTypes.string, // Optional
  };

  handleCertificateClick = async (certificationId, vendorId) => {
    console.log("Clicked Certificate ID:", certificationId);
    console.log("Vendor ID:", vendorId); // Log vendorId to the console

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ certificationId }),
    };

    try {
      const response = await fetch(
        globalVar.url + "available_exam",
        requestOptions
      );
      const data = await response.json();
      console.log(
        "Available Exams for Certificate ID",
        certificationId,
        ":",
        data
      );
    } catch (error) {
      console.log("Error fetching available exams:", error);
    }
  };

  render() {
    const {
      certificationId,
      certification_Name,
      certificateDetail,
      vendorId,
      vendorName,
      status,
    } = this.props;

    return (
      <div className="course-box" key={certificationId}>
        <Link
          to={`/exam-availability/${certificationId}?vendorId=${vendorId}&certificationName=${encodeURIComponent(
            certification_Name
          )}&certificateDetail=${encodeURIComponent(
            certificateDetail || ""
          )}&status=${encodeURIComponent(
            status || ""
          )}&vendorName=${encodeURIComponent(vendorName)}`} // Ensure vendorName is included
          onClick={() => this.handleCertificateClick(certificationId, vendorId)}
        >
          <div className="course-thumbnail">
            <Image
              className="w-100"
              src={"/assets/images/courses/coumbnail.jpg"}
              alt="certificate thumbnail"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "/assets/images/courses/course-thumbnail.jpg";
              }}
            />
          </div>
          {certification_Name && (
            <div className="course-title">{certification_Name}</div>
          )}
        </Link>
      </div>
    );
  }
}

export default Certificate;
