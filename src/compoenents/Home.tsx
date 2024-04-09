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


    const handlePrevPage = () => {
        if (currentpage > 0) {
            setCurrentpage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentpage((prevPage) => prevPage + 1);
    };

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

            <div className="flex justify-center mt-[5%]">
                <button
                    onClick={handlePrevPage}
                    disabled={currentpage === 0}
                    className="py-2 px-5 rounded-md bg-gray-800 text-white mr-4 mt-2"
                    style={{ cursor: currentpage === 0 ? 'not-allowed' : 'pointer' }}
                >
                    Previous
                </button>
                <p className="text-white mt-2 ml-1 mr-1 font-semibold py-2 px-5 bg-gray-800 rounded-lg">{currentpage + 1}</p>
                <button
                    onClick={handleNextPage}
                    disabled={currentpage === 9}
                    className="py-2 px-5 rounded-md bg-gray-800 text-white ml-4 mt-2"
                    style={{ cursor: currentpage === 9 ? 'not-allowed' : 'pointer' }}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Home