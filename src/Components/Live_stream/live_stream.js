import React, { useEffect } from "react";
import Video from 'twilio-video';
import "./live_stream.css";
import { useSelector, useDispatch } from "react-redux";
import { endStream, startStream } from '../../Redux/Actions/live_stream';
import { useNavigate, useParams } from "react-router";
import { Navbar, Container } from "react-bootstrap";
import logo from "../../Assets/Images/myxo.png";

function LiveStream() {
    var streaming = false;
    var loading = false;
    let room;

    //Redux Dispatch:
    const dispatch = useDispatch();

    // Redux State:
    const live_stream = useSelector((state) => state.live_stream);

    //Router Params:
    const params = useParams();

    //Router navigate:
    const navigate = useNavigate();

    useEffect(() => {

        async function video() {
            const stream = document.getElementById("stream");
            const startEndButton = document.getElementById("streamStartEnd");
            startEndButton.innerHTML = "start stream";

            const videoTrack = await Video.createLocalVideoTrack({ width: 1000 });
            const trackElement = videoTrack.attach();
            stream.appendChild(trackElement);
        }

        video();

    }, [])

    useEffect(() => {
        const startEndButton = document.getElementById("streamStartEnd");
        // console.log("ACTUAL DATA", live_stream)
        if (Object.keys(live_stream.response).length > 0) {
            // console.log("here", live_stream.tokenData.token);
            Video.connect(live_stream.response.tokenData.token).then((res) => {
                // console.log("ROOM", res);
                streaming = true;
            }).catch((err) => {
                console.log(err);
                alert("Unable to start livestream.");
                startEndButton.innerHTML = "start stream";
            });
        }
    }, [live_stream])

    const startOrEndStream = () => {
        const startEndButton = document.getElementById("streamStartEnd");
        // console.log(streaming)
        if (!streaming) {
            startEndButton.innerHTML = "end stream";
            // generate random id
            var id = Math.floor(Math.random() * 100).toString();
            // console.log(params.class_id.toString());
            dispatch(startStream(id, params.class_id.toString()));
        } else {
            navigate("/trainer-profile");
            dispatch(endStream())
        }
    }

    return (
        <>
            {/* navbar */}
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#" className="m-2">
                    <img src={logo} alt="logo" />
                    React Bootstrap
                </Navbar.Brand>
            </Navbar>

            <div id="stream">
                {/* video will be added here dynamically */}
            </div>
            <div className="text-center">
                <button id="streamStartEnd" className=" mt-5 btn primary-button" onClick={startOrEndStream}></button>
            </div>
        </>
    )
}


export default LiveStream;