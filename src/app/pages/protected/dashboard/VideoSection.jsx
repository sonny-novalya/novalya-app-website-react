

const data = {
  "de": "https://player.vimeo.com/progressive_redirect/playback/950751282/rendition/1080p/file.mp4?loc=external&log_user=0&signature=bcb3b744d8e474635d51d3e43972f2dbe7ec000e33ebc1f047ba01cd52ba45bb",
  "en": "https://player.vimeo.com/progressive_redirect/playback/950750969/rendition/1080p/file.mp4?loc=external&log_user=0&signature=61885627b3c72c5cd34e6f2d123f0a731647d1de768d17d173cec518657d4fc3",
  "es": "https://player.vimeo.com/video/964215446?title=0&byline=0&portrait=0&badge=0&autopause=0&app_id=58479",
  "fr": "https://player.vimeo.com/progressive_redirect/playback/950746096/rendition/1080p/file.mp4?loc=external&log_user=0&signature=ddb2bb93faab37dfcd1cc97c3feda0a4f2f3d72bd07e2b2cbbb5991f6f45c4ae",
  "pt": "https://player.vimeo.com/progressive_redirect/playback/950750969/rendition/1080p/file.mp4?loc=external&log_user=0&signature=61885627b3c72c5cd34e6f2d123f0a731647d1de768d17d173cec518657d4fc3",
}
const VideoSection = () => {
  return (
    <div className="flex flex-col w-full">
      <iframe
        className="w-full h-full rounded-md"
        src={data["en"]}
        title="Video"
        allowfullscreen=""
        
      ></iframe>
    </div>
  )
}

export default VideoSection