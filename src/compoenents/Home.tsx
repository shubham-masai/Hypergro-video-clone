import React, { useEffect, useState } from 'react'
import { getAllVideos } from '../redux/action'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import VideoCard from './VideoCard'

const Home: React.FC = () => {
    const [currentpage, setCurrentpage] = useState<number>(0);

    const { videos, isLoading, isError } = useSelector((store: any) => {
        return {
            videos: store.videos,
            isLoading: store.isLoading,
            isError: store.isError
        }
    }, shallowEqual)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllVideos(currentpage))
    }, [currentpage])
    return (
        <div className="w-[94%] m-auto mt-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 bg-black">
            {videos?.map((el) => {
                return <VideoCard key={el.postId} {...el} />
            })}
        </div>
    )
}

export default Home