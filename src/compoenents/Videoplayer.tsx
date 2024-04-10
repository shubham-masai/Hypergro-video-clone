import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import VideoCard, { VideoCardprops } from "./VideoCard"

import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from "react-icons/fa";

const Videoplayer: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const [currentVideo, setCurrentVideo] = useState<VideoCardprops | null>(null);


  const [likeStatus, setLikeStatus] = useState<boolean>(false);
  const [dislikeStatus, setDislikeStatus] = useState<boolean>(false);

  const [likeCount, setLikeCount] = useState<number>(0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);

  const videos: VideoCardprops[] = JSON.parse(localStorage.getItem("allvideos") || "[]")

  useEffect(() => {
    const selectedVideo: VideoCardprops | undefined = videos?.find(video => video.postId === id);
    setCurrentVideo(selectedVideo || null);
    const like_store = localStorage.getItem(`likes_${id}`);
    const dislike_store = localStorage.getItem(`dislikes_${id}`);

    setLikeCount(like_store ? parseInt(like_store) : (selectedVideo?.reaction.count || 0));
    setDislikeCount(dislike_store ? parseInt(dislike_store) : 0);
    setDislikeCount(parseInt(localStorage.getItem(`dislikes_${id}`) || '0'));
    setLikeStatus(localStorage.getItem(`likeStatus_${id}`) === 'true');
    setDislikeStatus(localStorage.getItem(`dislikeStatus_${id}`) === 'true');
  }, [id])

  const handleLike = () => {
    if (likeStatus) {
      setLikeCount(prevCount => prevCount - 1);
      setLikeStatus(false);
      localStorage.setItem(`likes_${id}`, (likeCount - 1).toString());
      localStorage.setItem(`likeStatus_${id}`, 'false');
    }
    else {
      if (dislikeStatus) {
        setDislikeCount(prevCount => prevCount - 1);
        setDislikeStatus(false);
        localStorage.setItem(`dislikes_${id}`, (dislikeCount - 1).toString());
        localStorage.setItem(`dislikeStatus_${id}`, 'false');
      }
      setLikeCount(prevCount => prevCount + 1);
      setLikeStatus(true);
      localStorage.setItem(`likes_${id}`, (likeCount + 1).toString());
      localStorage.setItem(`likeStatus_${id}`, 'true');
    }
  };

  const handleDislike = () => {
    if (dislikeStatus) {
      setDislikeCount(prevCount => prevCount - 1);
      setDislikeStatus(false);
      localStorage.setItem(`dislikes_${id}`, (dislikeCount - 1).toString());
      localStorage.setItem(`dislikeStatus_${id}`, 'false');
    } else {
      if (likeStatus) {
        setLikeCount(prevCount => prevCount - 1);
        setLikeStatus(false);
        localStorage.setItem(`likes_${id}`, (likeCount - 1).toString());
        localStorage.setItem(`likeStatus_${id}`, 'false');
      }
      setDislikeCount(prevCount => prevCount + 1);
      setDislikeStatus(true);
      localStorage.setItem(`dislikes_${id}`, (dislikeCount + 1).toString());
      localStorage.setItem(`dislikeStatus_${id}`, 'true');
    }
  };
  return (
    <div className="flex flex-col sm:flex-row gap-4 px-6">
      <div className="md:w-[70%] sm:w-[100%]">
        <div className="h-[80vh]">
          {currentVideo && (
            <video
              src={currentVideo?.submission?.mediaUrl}
              className="w-full h-full"
              autoPlay
              controls
            >
            </video>
          )}
        </div>
        <div className="flex justify-between px-[1.5rem]">

          <div className="mt-2 flex items-start gap-4">
            <img src={currentVideo?.creator.pic} alt="" className="w-[2.2rem] h-[2.2rem] rounded-full" />
            <div>
              <h3 className="text-white text-start font-semibold text-[1rem]">
                {currentVideo?.creator.name ? currentVideo?.creator.name : "Shubham"}
              </h3>
              <div className="flex gap-1 text-gray-400">
                <p>{currentVideo?.creator.handle}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-1 items-center">
            <div>
              {
                likeStatus ? < FaThumbsUp className="text-white" onClick={handleLike} /> : <FaRegThumbsUp className="text-white" onClick={handleLike} />
              }
            </div>
            <span className="text-white ml-1 block">{likeCount}</span>
            <div>              {
              dislikeStatus ? <FaThumbsDown className="text-white" onClick={handleDislike} /> : <FaRegThumbsDown className="text-white" onClick={handleDislike} />
            }
            </div>
            <span className="text-white ml-1 block">{dislikeCount}</span>
          </div>
        </div>
      
      </div>

      <div className="flex-1 m-auto h-[80vh] overflow-auto sidebar">
        <div className="flex flex-col gap-4">
          {
            videos?.map((el: VideoCardprops) => {
              return <VideoCard key={el.postId} {...el} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Videoplayer