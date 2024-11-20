// LectureDetail.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Spinner,
  Breadcrumb,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useParams, useLocation, Link } from "react-router-dom";
import globalVar from "../../globalVar";
import "../../LectureDetail.css"; // Import the CSS file

const truncateText = (text, maxWords) => {
  if (!text) return "";

  const words = text.split(" ");
  if (words.length <= maxWords) return text;

  return words.slice(0, maxWords).join(" ") + "...";
};

const LectureDetail = () => {
  const { lectureId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const examName = queryParams.get("examName");
  const certificationName = queryParams.get("certificationName");
  const certificateDetail = queryParams.get("certificateDetail");
  const status = queryParams.get("status");

  const [lectureDetails, setLectureDetails] = useState([]);
  const [activeLecture, setActiveLecture] = useState(null);
  const [exams, setExams] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [loadingExams, setLoadingExams] = useState(true);
  const [error, setError] = useState(null);
  const vendorNameQuery = queryParams.get("vendorName");
  const [vendorName, setVendorName] = useState(vendorNameQuery || "Unknown Vendor");

  useEffect(() => {
    if (!vendorNameQuery) {
      // Fetch vendor name as shown earlier
    }
  }, [vendorNameQuery]);

  useEffect(() => {
    const fetchLectureDetails = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId: lectureId }),
      };

      try {
        const response = await fetch(
          `${globalVar.url}related_lectures`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Failed to fetch lecture details");
        }
        const data = await response.json();
        setLectureDetails(data.data);

        if (data.data.length > 0) {
          setActiveLecture(data.data[0]);
        }

        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching lecture details:", error);
        setError(error);
        setShowLoader(false);
      }
    };

    const fetchExamAvailability = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certificationId: lectureId }),
      };

      try {
        const examsResponse = await fetch(
          globalVar.url + "available_exam",
          requestOptions
        );
        if (!examsResponse.ok) throw new Error("Exams fetch failed");
        const examsData = await examsResponse.json();
        setExams(examsData.data);
        setLoadingExams(false);
      } catch (error) {
        setError(error);
        setLoadingExams(false);
      }
    };

    fetchLectureDetails();
    fetchExamAvailability();
  }, [lectureId]);

  useEffect(() => {
    if (activeLecture) {
      console.log("Currently playing:", activeLecture.video_Name);
      const videoContainer = document.getElementById("videoContainer");
      if (videoContainer) {
        videoContainer.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [activeLecture]);

  const handleLectureClick = (lecture) => {
    // Set the clicked lecture as the active one
    setActiveLecture(lecture);
    console.log("Lecture clicked:", lecture.video_Name);
  };

  useEffect(() => {
    if (examName) {
      const videoContainer = document.getElementById("videoContainer");
      if (videoContainer) {
        videoContainer.scrollIntoView({ behavior: "smooth" });
      }

      // Update page title
      document.title = `${examName} || Urdu IT Academy`;
    }
  }, [examName]);

  const handleCopyLink = () => {
    if (activeLecture?.video_url) {
      navigator.clipboard.writeText(activeLecture.video_url);
      alert("Lecture link copied to clipboard!");
    }
  };

  // Determine overall loading and error states
  const isLoading = showLoader || loadingExams;
  const combinedError = error;

  return (
    <section className="section section-lecture-detail inner-page">
      <Container>
        {isLoading ? (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "250px" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : combinedError ? (
          <div className="alert alert-danger">
            Error fetching data: {combinedError.message}
          </div>
        ) : (
          <>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/courses">Courses</Breadcrumb.Item>
              <Breadcrumb.Item href="/courses">
                {vendorNameQuery ? vendorNameQuery : "Unknown Vendor"}
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/courses">{certificationName}</Breadcrumb.Item>
              <Breadcrumb.Item active>{examName}</Breadcrumb.Item>
            </Breadcrumb>

            <div className="lecture-details">
              <h2 className="title page-title d-flex align-items-center mb-4">
                <span>
                  {certificationName}: {examName}
                </span>
                <span className="d-inline-flex ms-3">
                  <span className="certificateStatus-tag">
                    {status || "Completed"}
                  </span>
                </span>
              </h2>
              <p className="mb-3">Certificate Details: {certificateDetail}</p>

              {activeLecture && (
                <div className="active-lecture mb-3" id="videoContainer">
                  <h4 className={`my-3 ${activeLecture.video_Name ? 'active' : ''}`}>
                    {activeLecture.video_Name}
                  </h4>

                  {/* Display full description here */}
                  <p className="my-3">
                    {activeLecture.video_PresentaionName} {/* Show full description instead of truncated */}
                  </p>

                  <div
                    className="video-container"
                    dangerouslySetInnerHTML={{
                      __html: activeLecture.video_Url,
                    }}
                  />
                  <div className="d-flex justify-content-between">
                    <div className="d-flex  justify-content-between mt-3">
                      <div className="d-flex flex-column flex-md-rowsocial-share">
                        <h5 className="pe-3">Share:</h5>
                        <div className="d-flex">
                          <span>
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                activeLecture?.video_url || window.location.href
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="social-icon"
                            >
                              <img src="../assets/images/facebookLogo.png" alt="Facebook Logo" />
                            </a>
                          </span>
                          <span>
                            <a
                              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                activeLecture?.video_url || window.location.href
                              )}&text=${encodeURIComponent("Check this out!")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="social-icon"
                            >
                              <img src="../assets/images/TwitterLogo.png" className="px-1" alt="Twitter Logo" />
                            </a>
                          </span>
                          <span>
                            <a
                              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                                activeLecture?.video_url || window.location.href
                              )}&title=${encodeURIComponent("Check this out!")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="social-icon"
                            >
                              <img src="../assets/images/linkedinLogo.png" className="px-1" alt="LinkedIn Logo" />
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="useful-links mt-3">
                      <div className="flex flex-column flex-md-row">
                        <h5>Useful Links:</h5>
                        <span onClick={handleCopyLink} style={{ cursor: "pointer" }}>
                          <img src="../assets/images/LinkSimple.png" className="px-1" alt="LinkSimple" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="related-lectures mt-5">
                <h5 className="fs-4 fw-bold mb-3">
                  More Lectures in this Series
                </h5>
                {lectureDetails && lectureDetails.length > 1 ? (
                  <table
                    className="table"
                    style={{
                      borderCollapse: "separate",
                      borderSpacing: "0 10px",
                    }}
                  >
                    <tbody>
                      {lectureDetails.map((lecture) => (
                        <tr
                          style={{
                            padding: "15px 0px"
                          }}
                          key={lecture.videoId}
                          onClick={() => handleLectureClick(lecture)}
                          className={
                            activeLecture?.videoId === lecture.videoId
                              ? "active-lecture-row py-3 "
                              : "py-3"
                          }
                        >
                          <td className="cursor-pointer" style={{ padding: "0" }}>
                            <div className="d-flex flex-column flex-md-row justify-content-between gap-0 gap-md-5">
                              <h6
                                className={`cursor-pointer heading_title pt-2 py-md-2 ${activeLecture?.videoId === lecture.videoId ? "active" : ""}`}
                              >
                                {lecture.video_Name}{" "}
                                {activeLecture?.videoId === lecture.videoId && (
                                  <span className="badge bg-success ms-2">Playing</span>
                                )}
                              </h6>

                              {/* Show description with max-width 300px on mobile */}
                              <p
                                className="text-muted mb-0 text-truncate pb-3 py-md-0"
                                style={{ maxWidth: "100%", width: "100%", maxWidth: "700px" }}
                              >
                                {lecture.video_Description}
                              </p>
                            </div>
                          </td>



                        </tr>
                      ))}
                    </tbody>

                  </table>
                ) : (
                  <p>No related lectures found.</p>
                )}
              </div>

              <div className="related-exams mt-5">
                <h5 className="fs-4 fw-bold mb-5">Related Exams</h5>
                {loadingExams ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : error ? (
                  <p>Error loading exams: {error.message}</p>
                ) : exams.length > 0 ? (
                  <Row>
                    {exams.slice(0, 4).map((exam) => (
                      <Col sm={6} lg={4} xl={3} key={exam.examId}>
                        <Link
                          className="text-decoration-none"
                          to={{
                            pathname: `/lecture/${exam.examId}`,
                            search: `?examName=${encodeURIComponent(exam.exam_Name)}&certificationName=${encodeURIComponent(certificationName)}&certificateDetail=${encodeURIComponent(certificateDetail)}&status=${encodeURIComponent(status)}`,
                            state: { vendorName: vendorName || "Unknown Vendor" }
                          }}
                        >
                          <Card className="">
                            <div className="course-thumbnail">
                              <Card.Img
                                className="w-100"
                                src={
                                  "/assets/images/courses/course-thumbnail.jpg"
                                }
                                alt="certificate thumbnail"
                              />
                            </div>
                          </Card>
                          <h5 className="card-title course-title no-underline mb-3 mt-1 fw-bold text-black text-decoration-none">
                            {exam.exam_Name}
                          </h5>
                        </Link>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No related exams found.</p>
                )}
              </div>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default LectureDetail;
