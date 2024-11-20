import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header/Header";
import Home from "./HomePage/Home";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import NotFound from "./NotFound/NotFound";
import Footer from "./Footer/Footer";
import CoursesPage from "./CoursesPage/CoursesPage";
import LicenceAggrement from "./LicenceAggrement/LicenceAggrement";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import CourseDetail from "./Courses/CourseDetail/CourseDetail";
import CertificateDetail from "./Courses/CertificateDetail/CertificateDetail";
import LectureDetail from "./Courses/LectureDetail/LectureDetail";
import { HelmetProvider } from "react-helmet-async";
import BlogDetail from "./Blogs/BlogDetail/BlogDetail";
import { BlogsPage } from "./BlogsPage/BlogsPage";
import HelpPage from "./HelpPage/HelpPage";
import FAQ from "./FAQ/FAQ";
import ExamAvailability from "./ExamAvailability/ExamAvailability"; // Import the new component

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Router> {/* Router should wrap around the entire app */}
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/courses" element={<CoursesPage />} />
            <Route exact path="/blogs" element={<BlogsPage />} />
            <Route exact path="/blogpost/:blogpostId" element={<BlogDetail />} />
            <Route exact path="/course/:courseId" element={<CourseDetail />} />
            <Route exact path="/course/:courseId/certificate/:certificateId" element={<CertificateDetail />} />
            <Route path="/exam-availability/:certificationId" element={<ExamAvailability />} />
            <Route exact path="/lecture/:lectureId" element={<LectureDetail />} />
            <Route exact path="/aboutus" element={<AboutUs />} />
            <Route exact path="/contactus" element={<ContactUs />} />
            <Route exact path="/licence-aggrement" element={<LicenceAggrement />} />
            <Route exact path="/help" element={<HelpPage />} />
            <Route exact path="/faq" element={<FAQ />} />
            <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
