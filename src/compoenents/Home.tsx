import React, { useEffect, useState } from 'react'
import { getAllVideos } from '../redux/action'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import VideoCard from './VideoCard'
import { VideoCardprops } from "./VideoCard"
import Loading from './Loading'
const Home: React.FC = () => {
    const [currentpage, setCurrentpage] = useState<number>(0);

    const { videos, isLoading } = useSelector((store: any) => {
        return {
            videos: store.videos as VideoCardprops[],
            isLoading: store.isLoading,
            isError: store.isError
        }
    }, shallowEqual)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllVideos(currentpage) as any)
    }, [currentpage])

    return (
        <div>
            <div className="w-[94%] m-auto mt-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 bg-black">

                {
                    isLoading ? Array.from({ length: 9 }).map((_, index) => (
                        <Loading key={index} />
                    )) : videos?.map((el: VideoCardprops) => {
                        return <VideoCard key={el.postId} {...el} />
                    })
                }
            </div>
        </div>

    )
}

export default Home