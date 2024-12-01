
import React, { useContext } from "react";
import { assets } from "../assets/images/assets";
import { PlayerContext } from "../Context/PlayerContext";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    Previous,
    Next,
    seekSong,
  } = useContext(PlayerContext);


  const progress =
    (time.currentTime.minute * 60 + time.currentTime.second) /
    (time.totalTime.minute * 60 + time.totalTime.second || 1);

  const progressColor = `linear-gradient(to right, #4caf50 ${progress * 100}%, #ccc 0%)`;

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt=""
          />
          <img
            onClick={Previous}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt=""
          />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt=""
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt=""
            />
          )}
          <img
            onClick={Next}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt=""
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.loop_icon}
            alt=""
          />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] mx-w-[500px] bg-gray-300 rounded-full cursor-pointer relative"
          >
            <hr
              ref={seekBar}
              style={{
                width: `${progress * 100}%`,
                background: progressColor,
                transition: "width 0.1s linear, background 0.1s linear",
              }}
              className="h-1 border-none rounded-full absolute top-0 left-0"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.play_icon} alt="" />
        <img className="w-4" src={assets.mic_icon} alt="" />
        <img className="w-4" src={assets.queue_icon} alt="" />
        <img className="w-4" src={assets.speaker_icon} alt="" />
        <img className="w-4" src={assets.volume_icon} alt="" />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img className="w-4" src={assets.mini_player_icon} alt="" />
        <img className="w-4" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  );
};

export default Player;
