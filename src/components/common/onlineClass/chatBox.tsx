import Button from "components/core/button";
import Input from "components/core/input";
import { UserBold } from "components/icon";
import { useState } from "react";

interface Props {
  messages: { type: "SELF" | "OTHER"; msg: string }[];
  sendMessage: (msg: string) => void;
}
const ChatBox = ({ messages, sendMessage }: Props) => {
  const [msg, setMsg] = useState("");
  return (
    <div className="w-full h-full flex flex-col divide-y">
      <div className="w-full py-3 mx-2 h-fit">
        <p className=" text-2xl font-bold text-slate-800 m-0 p-0">چت عمومی</p>
      </div>
      <div className="w-full h-[78%] overflow-scroll">
        {messages.map((m) => {
          if (m.type === "OTHER") {
            return (
              <div className="mr-auto ml-4 mt-2 py-3 w-fit max-w-xs rounded-lg px-4 bg-gradient-to-br from-white to-violet-200">
                <p className=" text-lg w-full break-words text-slate-800">
                  {m.msg}
                </p>
              </div>
            );
          } else {
            return (
              <div className="ml-auto mr-4 mt-2 py-3 w-fit max-w-xs rounded-lg px-4 bg-gradient-to-br from-white to-violet-200">
                <p className=" text-lg w-full break-words text-slate-800">
                  {m.msg}
                </p>
              </div>
            );
          }
        })}
      </div>
      <div className="w-full h-[12%] px-4 bg-violet-100 flex">
        <Input
          className="w-full my-auto"
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button
          className="w-fit my-auto mr-2 "
          onClick={() => {
            sendMessage(msg);
          }}
        >
          ارسال
        </Button>
      </div>
    </div>
  );
};
export default ChatBox;
