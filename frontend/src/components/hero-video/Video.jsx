import React from 'react';
import './Video.css'; // Link to the CSS file for styling


const Video = () => {
  return (
    <>
      <div className="vid">
  <video autoPlay loop muted playsInline>
    <source src='https://videos.pexels.com/video-files/9861741/9861741-uhd_2732_1440_25fps.mp4' type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

    <div className="bg-light py-5 text-center">
      <div className="container">
        {/* Title */}
        <h2 className="fw-bold mb-4">MORE TO EXPLORE</h2>

        {/* Image Grid */}
        <div className="row justify-content-center">
          {/* Image 1 */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <img
              src="https://www.anitadongre.com/on/demandware.static/-/Sites-AD-INDIA-Library/default/dwf198252b/images/Home%20page/Oct%202024/23_Oct_2024/Lehenga_Sets_02_Web.jpg"
              alt="In The Press"
              className="img-fluid rounded"
            />
            <p className="mt-3 fw-semibold">IN THE PRESS</p>
          </div>

          {/* Image 2 */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <img
              src="https://www.anitadongre.com/on/demandware.static/-/Sites-AD-INDIA-Library/default/dw96cf4bd9/images/Home%20page/Oct%202024/23_Oct_2024/03_TIMELESS_REDS_Web.jpg"
              alt="Runway"
              className="img-fluid rounded"
            />
            <p className="mt-3 fw-semibold">RUNWAY</p>
          </div>

          {/* Image 3 */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <img
              src="https://www.anitadongre.com/on/demandware.static/-/Sites-AD-INDIA-Library/default/dw88dcd3ee/images/Home%20page/Nov%202024/Modern_Heirlooms_Desktop1.jpg"
              alt="Sustaining Crafts"
              className="img-fluid rounded"
            />
            <p className="mt-3 fw-semibold">SUSTAINING CRAFTS</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Video;

