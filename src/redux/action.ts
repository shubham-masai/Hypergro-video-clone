import { Dispatch } from "redux";
import { GET_VIDEO_REQUEST, GET_VIDEO_SUCCESS, GET_VIDEO_FAILURE } from "./actionType"
import axios from "axios"

export const getAllVideos = (page:number) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: GET_VIDEO_REQUEST });
        const res = await axios.get(`https://internship-service.onrender.com/videos?page=${page}&limit=9`);
        console.log(res.data.data.posts);

        dispatch({
            type: GET_VIDEO_SUCCESS, payload: {
                videos: res.data.data.posts,
                page: res.data.data.page
            }
        })
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_VIDEO_FAILURE })
    }
}