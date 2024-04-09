import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import VideoCard, { VideoCardprops } from "./VideoCard"
const Videoplayer: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  const [currentVideo, setCurrentVideo] = useState<VideoCardprops | null>(null);

  const videos: VideoCardprops[] = JSON.parse(localStorage.getItem("allvideos") || "[]")

  useEffect(() => {
    const selectedVideo: VideoCardprops | undefined = videos?.find(video => video.postId === id);
    setCurrentVideo(selectedVideo || null);
  }, [id, videos])

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
      </div>

      <div className="flex-1 m-auto h-[80vh] overflow-auto sidebar">
       
        <div className="grid grid-cols-1 gap-4">
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