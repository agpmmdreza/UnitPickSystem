interface Props {
  id: string;
}
const VideoElement = ({ id }: Props) => {
  return (
    <video
      id={id}
      className="rounded bg-violet-100 mx-2 w-[30%] flex-grow min-w-[300px] min-h-[170px]"
    />
  );
};
export default VideoElement;
