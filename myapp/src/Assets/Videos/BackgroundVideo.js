import React from 'react';
import '../../Assets/Videos/BackgroundVideo.css'; // Adjust path to go up to src
import videoSource from '../../Assets/Videos/1851190-uhd_3840_2160_25fps.mp4'; // Adjust path to go up to src


const BackgroundVideo = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted className="video">
        <source src={videoSource} type="video/mp4" /> {/* Use the imported video source */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
