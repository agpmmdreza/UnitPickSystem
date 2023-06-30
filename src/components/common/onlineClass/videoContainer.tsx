import VideoElement from "./videoElement";

const VideoContainer = () => {
  return (
    <div className="w-full h-full rounded drop-shadow-xl bg-white flex flex-wrap py-10 gap-3">
      <VideoElement id="my-self" />
    </div>
  );
};
export default VideoContainer;
