import ChatBox from "components/common/onlineClass/chatBox";
import UserBox from "components/common/onlineClass/userBox";
import VideoContainer from "components/common/onlineClass/videoContainer";

const OnlineClass = () => {
  return (
    <div className="fixed overflow-hidden h-full w-full top-0 right-0 bottom-0 left-0  bg-gradient-to-br from-violet-300 to-white z-[1000] flex gap-3">
      <div className="w-3/12 min-w-[370px] flex flex-col gap-2 rounded my-2 mr-2 drop-shadow-xl">
        <div className=" h-[40%] bg-white rounded">
          <UserBox users={["mahdi", "mmdreza", "ehsan"]} />
        </div>
        <div className=" h-[60%] bg-white rounded drop-shadow-xl">
          <ChatBox
            messages={[
              "سلام",
              "چظوری",
              "خوبیییییییخوبیییییییخوبی ییییییخوبیییی یییخوبیییییییخوبییییییی؟",
              "سلام",
              "چظوری",
              "خوبیییییییخوبیییییییخوبی ییییییخوبیییی یییخوبیییییییخوبییییییی؟",
            ]}
          />
        </div>
      </div>
      <div className="w-9/12 my-2 ml-2">
        <VideoContainer />
      </div>
    </div>
  );
};
export default OnlineClass;
