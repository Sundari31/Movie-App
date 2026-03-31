import React from "react";

const TrailerModal = ({ videoKey, onClose }) => {
  if (!videoKey) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[999]"
      onClick={onClose} // click outside to close
    >

      {/* Stop closing when clicking video */}
      <div 
        className="relative w-[90%] md:w-[800px]"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button
          className="absolute -top-10 right-0 text-white text-3xl z-[1000] hover:text-red-500"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Video */}
        <iframe
          className="w-full h-[400px] md:h-[450px] rounded-lg"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>

      </div>
    </div>
  );
};

export default TrailerModal;