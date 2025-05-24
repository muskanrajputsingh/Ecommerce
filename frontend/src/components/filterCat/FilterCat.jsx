import React from "react";

const FilterCat = () => {
  return (
    <div className="container-fluid bg-light d-flex justify-content-center align-items-center min-vh-100 px-4">
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left Side - Video */}
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <video
              autoPlay
              loop
              muted
              className="img-fluid rounded shadow-lg"
              style={{ width: "600px", height: "300px" }} // Fixed size for desktop
            >
              <source
                src="https://videos.pexels.com/video-files/8512362/8512362-sd_640_360_25fps.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Right Side - Text */}
          <div className="col-md-6 text-center text-md-start">
            <h2 className="text-danger fw-bold mb-3">
              THOUGHTFULLY CRAFTED GIFTS
            </h2>
            <p className="text-muted mb-4">
              Rooted in Rajasthan & meticulously handcrafted by master artisans,
              these modern-day keepsakes make the perfect gifts.
            </p>
            <a href="#" className="btn btn-outline-dark fw-bold px-4 py-2">
              SHOP NOW →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCat;
