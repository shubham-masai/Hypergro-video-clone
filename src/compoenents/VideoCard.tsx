import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface VideoCardprops {
    submission: {
        mediaUrl: string;
        title: string;
        thumbnail: string;
    };
    creator: {
        pic: string;
        name: string;
    };
    reaction: {
        count: number;
    };
    postId: string;
    currentPage: number;
}

const VideoCard: React.FC<VideoCardprops> = ({ postId, creator, reaction, submission }) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoHovered, setIsVideoHovered] = useState(false);

    const navigate = useNavigate();


    const startVideoPlayback = () => {
        setIsVideoHovered(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };


    const stopVideoPlayback = () => {
        setIsVideoHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            className=" cursor-pointer"

            onMouseEnter={startVideoPlayback}
            onMouseLeave={stopVideoPlayback}
        >
            <div
                className="relative overflow-hidden rounded-lg hover:rounded-none h-[237px]"
                onClick={() => navigate(`/video/${postId}`)}
            >
                {isVideoHovered ? (
                    <video
                        ref={videoRef}
                        src={submission.mediaUrl}
                        className="m-auto h-full rounded-lg"
                        loop
                        muted
                    ></video>
                ) : (
                    <img
                        src={submission.thumbnail}
                        alt="thumbnail"
                        className="w-full h-full object-cover rounded-lg"
                    />
                )}
            </div>

            <div
                className="mt-2 flex items-start gap-4"
                onClick={() => navigate(`/video/${postId}`)}
            >
                <img src={creator.pic} alt="" className="w-[2.2rem] h-[2.2rem] rounded-full" />

                <div>
                    <h3 className="text-white text-start font-semibold text-[1rem]">
                        {submission.title}
                    </h3>
                    <p className="text-gray-400">{creator.name ? creator.name : "Shubham"}</p>
                    <div className="flex gap-1 text-gray-400">
                        <p>{reaction.count} Views •</p>
                        <p>2 weeks ago</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard