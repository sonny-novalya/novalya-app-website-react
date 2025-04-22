import { useEffect, useState } from "react";

const data = {
  "de-GE": "https://player.vimeo.com/progressive_redirect/playback/950751282/rendition/1080p/file.mp4?loc=external&log_user=0&signature=bcb3b744d8e474635d51d3e43972f2dbe7ec000e33ebc1f047ba01cd52ba45bb",
  "en-US": "https://player.vimeo.com/progressive_redirect/playback/950750969/rendition/1080p/file.mp4?loc=external&log_user=0&signature=61885627b3c72c5cd34e6f2d123f0a731647d1de768d17d173cec518657d4fc3",
  "es-ES": "https://player.vimeo.com/video/964215446?title=0&byline=0&portrait=0&badge=0&autopause=0&app_id=58479",
  "fr-FR": "https://player.vimeo.com/progressive_redirect/playback/950746096/rendition/1080p/file.mp4?loc=external&log_user=0&signature=ddb2bb93faab37dfcd1cc97c3feda0a4f2f3d72bd07e2b2cbbb5991f6f45c4ae",
  "pt-PT": "https://player.vimeo.com/progressive_redirect/playback/950750969/rendition/1080p/file.mp4?loc=external&log_user=0&signature=61885627b3c72c5cd34e6f2d123f0a731647d1de768d17d173cec518657d4fc3",
};

const VideoSection = () => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const selectedLocale = localStorage.getItem("selectedLocale") || "en-US";
    if (data[selectedLocale]) {
      setVideoUrl(data[selectedLocale]);
    } else {
      setVideoUrl(data["en-US"]); 
    }
  }, []);

  return (
    <div className="relative pt-[40%] rounded-[10px] overflow-hidden">
      <iframe 
        className="absolute w-full h-full top-0 left-0"
        src={videoUrl}
        title="Video"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoSection;
