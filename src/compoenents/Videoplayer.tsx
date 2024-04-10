import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import VideoCard, { VideoCardprops } from "./VideoCard"

import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown} from "react-icons/fa";

const Videoplayer: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  
  const [currentVideo, setCurrentVideo] = useState<VideoCardprops | null>(null);


  const [likeStatus, setLikeStatus] = useState<boolean>(false);
  const [dislikeStatus, setDislikeStatus] = useState<boolean>(false);

  const [likeCount, setLikeCount] = useState<number>(0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);

  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState<string>('');

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

    const storedComments = localStorage.getItem(`comments_${id}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
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


  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
      setNewComment('');
    }
  };

  const handleCancleComment = () => {
    setNewComment("");
  }


  const handleEdit = (index: number) => {
    setEditingCommentIndex(index);
    setEditedComment(comments[index]);
  };

  const handleSaveEdit = (index: number) => {
    const updatedComments = [...comments];
    updatedComments[index] = editedComment;
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    setEditingCommentIndex(null);
    setEditedComment('');
  };

  const handleDelete = (index: number) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
  };

  const handleEditCancle = () => {
    setEditedComment("");
    setEditingCommentIndex(null);
  }

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
                likeStatus ? < FaThumbsUp className="text-white zoom-animation" onClick={handleLike} /> : <FaRegThumbsUp className="text-white" onClick={handleLike} />
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

        <div className="px-[1.5rem] mt-[0.4rem]">
          <h1 className='text-white text-[1rem] font-semibold md:text-[1.2rem]'>Description</h1>
          <p className='text-white opacity-75 text-[0.8rem] md:text-[1rem]'>
            {currentVideo?.submission.description}
          </p>
        </div>

        <div className='mt-2 flex flex-col gap-[1rem] px-[1.2rem]'>
          <h1 className='text-white text-[1rem] font-semibold md:text-[1.2rem]'>
            {comments ? comments.length : 0} Comments
          </h1>
          <textarea
            placeholder="Add a comment..."
            className="w-full border-b border-gray-600 h-10 text-white bg-black outline-none "
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          {
            newComment && (<div className='flex justify-end text-white gap-2'>
              <button className='btn' onClick={handleCancleComment}>Cancle</button>
              <button className='btn' onClick={handleAddComment}>Comment</button>
            </div>)
          }

          <div className="text-white">
            {comments.map((comment, index) => (
              <div key={index} className="comment flex justify-between">
                {index === editingCommentIndex ? (
                  <textarea
                    className="w-[85%] border-b h-8 text-white bg-transparent outline-none"
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                ) : (
                  <h2>{comment}</h2>
                )}
                <div className='flex gap-2'>
                  {index === editingCommentIndex ? (
                    <div className='flex gap-2'>
                      <button  onClick={() => handleSaveEdit(index)}>Save</button>
                      <button  onClick={() => handleEditCancle()}>Cancel</button>
                    </div>

                  ) : (
                    <div className='flex gap-2'>
                      <button  onClick={() => handleEdit(index)}>Edit</button>
                      <button  onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 m-auto h-screen overflow-auto sidebar mt-0">
        <div className="flex flex-col gap-4">
          {
            videos?.map((el: VideoCardprops) => {
              return <VideoCard key={el.postId} {...el} />
            })
          }
        </div>
      </div>
    </div >
  )
}

export default Videoplayer