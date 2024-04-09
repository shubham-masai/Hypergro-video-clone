import { GET_VIDEO_REQUEST, GET_VIDEO_SUCCESS, GET_VIDEO_FAILURE }  from "./actionType"
 
const InitialState = {
    videos: [],
    currentpage: null,
    isLoading: false,
    isError: false
}

const reducer = (state = InitialState, { type, payload }) => {
    switch (type) {
        case GET_VIDEO_REQUEST:
            return { ...state, isLoading: true }
        case GET_VIDEO_SUCCESS:
            return { ...state, videos: payload.videos, currentpage: payload.currentpage, isLoading: false, isError: false }
        case GET_VIDEO_FAILURE:
            return { ...state, isError: true, isLoading: false }
        default: return state
    }
}

export default reducer