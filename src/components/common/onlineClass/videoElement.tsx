interface Props {
  id: string;
}
const VideoElement = ({ id }: Props) => {
  return (
    <video
      id={id}
      autoPlay
      playsInline
      className="rounded bg-violet-100 mx-2 w-[30%] flex-grow max-h-full min-w-[370px]"
    />
  );
};
export default VideoElement;
