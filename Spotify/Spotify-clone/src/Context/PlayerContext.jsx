import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/images/assets";
import style from 'react'

 export const PlayerContext=createContext()
const PlayerContextProvider=(props)=>{
    const audioRef=useRef()
    const seekBg=useRef()
    const seekbar=useRef()
    const [track,setTrack]=useState(songsData[0])
    const[playStatus,setPlaystatus]=useState(false)
    const [time,setTime]=useState({
        currentTime:{
            second:0,
            minute:0,
        },
        totalTime:{
            second:0,
            minute:0,

        }
    })
    const play=()=>{
      audioRef.current.play();
      setPlaystatus(true)
    }
    const pause=()=>{
      audioRef.current.pause();
      setPlaystatus(false)
    }
    const PlayWithId=async(id)=>{
  await setTrack(songsData[id])
  await audioRef.current.play()
  setPlaystatus(true)

    }
    const Previous=async()=>{
        if (track.id>0) {
            await setTrack(songsData[track.id-1])
            await audioRef.current.play()
            setPlaystatus(true)
            
        }
    }
    const Next=async()=>{
        if (track.id<songsData.length-1) {
            await setTrack(songsData[track.id+1])
            await audioRef.current.play()
            setPlaystatus(true)
            
        }
    }
    const seekSong=async(e)=>{
audioRef.current.currentTime=((e.nativeEvent.offsets/seekBg.current.offsetswidth)*audioRef.current.duration)

        

    }
    useEffect(()=>{
        setTimeout(()=>{
         audioRef.current.ontimeupdate=()=>{
            // seekbar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%";

            setTime({
                currentTime:{
                    second:Math.floor(audioRef.current.currentTime % 60),
                    minute:Math.floor(audioRef.current.currentTime / 60),
                },
                totalTime:{
                    second:Math.floor(audioRef.current.duration % 60),
                    minute:Math.floor(audioRef.current.duration / 60),

        
                }
            })
         }
        },1000)
    },[audioRef])
 const contextValue={
audioRef,
seekbar,
seekBg,
track,setTrack,
playStatus,setPlaystatus,
time,setTime,
play,pause,
PlayWithId,
Previous,
Next,
seekSong
 }
 return(

    <PlayerContext.Provider value={contextValue}>
{props.children}
    </PlayerContext.Provider>
    
 )
}
export default PlayerContextProvider