import ChatBox from "components/common/onlineClass/chatBox";
import UserBox from "components/common/onlineClass/userBox";
import VideoContainer from "components/common/onlineClass/videoContainer";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface Props {
  student?: boolean;
}
const OnlineClass = ({ student }: Props) => {
  const [messages, setMessages] = useState<
    { type: "SELF" | "OTHER"; msg: string }[]
  >([]);
  const [selfMsg, setSelfMsg] = useState<string>();
  const [users, setUsers] = useState<string[]>();
  const [skt, setSkt] = useState<Socket>();
  // ======================== WEBRTC SHITCODES ==============================
  let localStream: MediaStream;
  const remoteStreams: MediaStream[] = [];
  const peerConnections: RTCPeerConnection[] = [];
  let socket: Socket;
  let masterSocketId: string;
  const remoteSocketIds: string[] = [];
  const servers: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
  };

  useEffect(() => {
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // peerConnection = new RTCPeerConnection(servers);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // remoteStream = new MediaStream();
    peerConnections.push(new RTCPeerConnection(servers));
    remoteStreams.push(new MediaStream());

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        localStream = stream;
        // eslint-disable-next-line react-hooks/exhaustive-deps

        (document.getElementById("my-self")! as HTMLVideoElement).srcObject =
          localStream;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    socket = io("http://96efd276-ca15-4cdc-9af9-396427be7886.hsvc.ir:30196", {
      query: { token: sessionStorage.getItem("token") },
    });
    setSkt(socket);
    if (student) {
      getMasterId();
    } else {
      jointMaster();
    }
    socket.on("connect", () => {
      console.log("SOCKET INITIATED :" + socket.id);
    });
    socket.on("master_id", (data: string) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      masterSocketId = data;
      console.log(masterSocketId);
      requestOffer();
    });
    socket.on("get_message", (data: string) => {
      setMessages((prev) => [...prev, { type: "OTHER", msg: data }]);
    });
    socket.on("members", (data: string[]) => {
      console.log("MEMBERS:   " + data);
      setUsers(data);
    });
    socket.on("offer_request", (data: string) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      console.log(data);
      remoteSocketIds.push(data);
      peerConnections.push(new RTCPeerConnection(servers));
      remoteStreams.push(new MediaStream());
      automateOffer();
    });
    socket.on("candidate", (data: string) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      console.log(JSON.parse(data));
      peerConnections[peerConnections.length - 1].addIceCandidate(
        new RTCIceCandidate(JSON.parse(data))
      );
    });
    socket.on("offer", (data: string) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      console.log("offer sdp: " + data);
      peerConnections[peerConnections.length - 1].setRemoteDescription(
        new RTCSessionDescription(JSON.parse(data))
      );
      automateAnswer();
    });
    socket.on("answer", (data: string) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      console.log("answer sdp: " + data);
      peerConnections[peerConnections.length - 1].setRemoteDescription(
        new RTCSessionDescription(JSON.parse(data))
      );
    });
  }, []);
  useEffect(() => {
    if (selfMsg && skt) {
      skt.emit("send_message", {
        type: "CLIENT",
        message: selfMsg,
      });
      setMessages((prev) => [...prev, { type: "SELF", msg: selfMsg }]);
    }
  }, [selfMsg]);

  const getMasterId = () => {
    socket.emit("get_master_id", {
      type: "CLIENT",
      message: "",
    });
  };
  const requestOffer = () => {
    socket.emit("offer_request", {
      type: "CLIENT",
      message: masterSocketId,
    });
  };
  const jointMaster = () => {
    socket.emit("join_master", {
      type: "CLIENT",
      message: masterSocketId,
    });
  };
  const automateOffer = async () => {
    const newVideo = document.createElement("video") as HTMLVideoElement;
    newVideo.srcObject = remoteStreams[remoteStreams.length - 1];
    newVideo.className =
      "rounded bg-violet-100 mx-2 w-[30%] flex-grow min-w-[370px]";

    newVideo.autoplay = true;
    newVideo.playsInline = true;
    console.log(newVideo.srcObject);
    document.getElementById("video-container")?.appendChild(newVideo);
    // (
    // 	document.getElementById("remote-video")! as HTMLVideoElement
    // ).srcObject = remoteStreams[remoteStreams.length-1];

    localStream.getTracks().forEach((track: MediaStreamTrack) => {
      peerConnections[peerConnections.length - 1].addTrack(track, localStream);
    });
    peerConnections[peerConnections.length - 1].ontrack = async (
      event: RTCTrackEvent
    ) => {
      event.streams[0].getTracks().forEach((track: MediaStreamTrack) => {
        remoteStreams[remoteStreams.length - 1].addTrack(track);
      });
    };
    peerConnections[peerConnections.length - 1].onicecandidate = async (
      event: RTCPeerConnectionIceEvent
    ) => {
      if (event.candidate) {
        socket.emit("candidate", {
          type: "CLIENT",
          message: JSON.stringify({
            to: remoteSocketIds[remoteSocketIds.length - 1],
            candidate: JSON.stringify(event.candidate),
          }),
        });
      }
    };
    const offer = await peerConnections[
      peerConnections.length - 1
    ].createOffer();
    await peerConnections[peerConnections.length - 1].setLocalDescription(
      offer
    );
    socket.emit("offer", {
      type: "CLIENT",
      message: JSON.stringify({
        to: remoteSocketIds[remoteSocketIds.length - 1],
        offer: JSON.stringify(offer),
      }),
    });
  };
  const automateAnswer = async () => {
    const newVideo = document.createElement("video") as HTMLVideoElement;
    newVideo.srcObject = remoteStreams[remoteStreams.length - 1];
    newVideo.className =
      "rounded bg-violet-100 mx-2 w-[30%] flex-grow min-w-[370px]";

    newVideo.autoplay = true;
    newVideo.playsInline = true;
    console.log(newVideo.srcObject);
    document.getElementById("video-container")?.appendChild(newVideo);
    // (
    // 	document.getElementById("remote-video")! as HTMLVideoElement
    // ).srcObject = remoteStreams[remoteStreams.length-1];

    localStream.getTracks().forEach((track: MediaStreamTrack) => {
      peerConnections[peerConnections.length - 1].addTrack(track, localStream);
    });
    peerConnections[peerConnections.length - 1].ontrack = async (
      event: RTCTrackEvent
    ) => {
      event.streams[0].getTracks().forEach((track: MediaStreamTrack) => {
        remoteStreams[remoteStreams.length - 1].addTrack(track);
      });
    };
    peerConnections[peerConnections.length - 1].onicecandidate = async (
      event: RTCPeerConnectionIceEvent
    ) => {
      if (event.candidate) {
        socket.emit("candidate", {
          type: "CLIENT",
          message: JSON.stringify({
            to: masterSocketId,
            candidate: JSON.stringify(event.candidate),
          }),
        });
      }
    };
    const answer = await peerConnections[
      peerConnections.length - 1
    ].createAnswer();
    await peerConnections[peerConnections.length - 1].setLocalDescription(
      answer
    );
    socket.emit("answer", {
      type: "CLIENT",
      message: JSON.stringify({
        to: masterSocketId,
        answer: JSON.stringify(answer),
      }),
    });
  };

  // ======================== WEBRTC SHITCODES ==============================
  return (
    <div className="fixed overflow-hidden h-full w-full top-0 right-0 bottom-0 left-0  bg-gradient-to-br from-violet-300 to-white z-[1000] flex gap-3">
      <div className="w-3/12 min-w-[370px] flex flex-col gap-2 rounded my-2 mr-2 drop-shadow-xl">
        <div className=" h-[40%] bg-white rounded">
          <UserBox users={users} />
        </div>
        <div className=" h-[60%] bg-white rounded drop-shadow-xl">
          <ChatBox
            messages={messages}
            sendMessage={(msg: string) => setSelfMsg(msg)}
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
