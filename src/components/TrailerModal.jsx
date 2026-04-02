import React, { useEffect } from "react"
import { FaTimes } from "react-icons/fa"

const TrailerModal = ({ videoKey, onClose }) => {
  if (!videoKey) return null

  // ESC key to close
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-4xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-white/40 text-xs uppercase tracking-widest font-semibold">
            Now Playing
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-white/40 hover:text-white transition text-xs
              font-semibold uppercase tracking-widest"
          >
            <FaTimes size={12} />
            <span>Close</span>
          </button>
        </div>

        {/* Video frame */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)]"
          style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
            title="Trailer"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        </div>

        {/* ESC hint */}
        <p className="text-center text-white/20 text-xs mt-3">
          Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/30 font-mono">ESC</kbd> or click outside to close
        </p>
      </div>
    </div>
  )
}

export default TrailerModal
