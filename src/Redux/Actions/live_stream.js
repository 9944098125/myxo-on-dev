import { LIVE_STREAM_ERROR, LIVE_STREAM_TOKEN } from "./Types";
import api from "../Api/Api";

export const startStream = (streamerName, identity) => async (dispatch) => {
    //console.log(streamerName, identity);
    const streamData = {
        streamName: streamerName
    }
    let startStreamResponse;
    let tokenResponse;
    api.post('/class/start', streamData).then((response) => {
        //console.log(response);
        startStreamResponse = response;
        const streamDetails = startStreamResponse.data;
        const roomId = streamDetails.roomId;
        // console.log("stream", streamDetails)
        const identityData = {
            identity: identity,
            room: roomId
        }
        api.post('/class/streamerToken', identityData).then((response) => {
            console.log(response);
            tokenResponse = response;
            const tokenData = tokenResponse.data;
            // console.log("token", tokenData);
            dispatch({
                type: LIVE_STREAM_TOKEN,
                payload: { streamDetails, tokenData },
            });
        }).catch((err) => {
            console.log(err);
            const { response } = err;
            const { request, ...errorObject } = response;
            console.log(errorObject)
            dispatch({
                type: LIVE_STREAM_ERROR,
                payload: errorObject.data.message
            })
        })

    }).catch((err) => {
        console.log(err);
        const { response } = err;
        const { request, ...errorObject } = response;
        console.log(errorObject)
        dispatch({
            type: LIVE_STREAM_ERROR,
            payload: errorObject.data.message
        })
    })
}

export const endStream = (data) => async (dispatch) => {
    api.post('/class/end', data).then((response) => {
        console.log(response);

    }).catch((err) => {
        console.log(err)
    })
} 