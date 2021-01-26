//helper functions
let handleFail = function(err) {
    console.log(err);
}
function addVideoStream(streamId){
    let remoteContainer = document.getElementById("remoteStream");

    let streamDiv = document.createElement("div");
    streamDiv.id = streamId;
    streamDiv.style.transform = "rotateY(180deg)"; // mirroring video
    streamDiv.style.height = "250px";
    remoteContainer.appendChild(streamDiv);
}
document.getElementById("join").onclick = function () {
    let channelName = document.getElementById("channelName").value;
    let Username = document.getElementById("username").value;
    let appId = "2025521fc5d645f7b76a0402e2fd9cb7";

    //initialize agora client
    let client = AgoraRTC.createClient({
        mode: "live", /* rtc is other option */
        code: "h264"
    })
    client.init(appId,() => console.log("AgoraRTC Client Connected"), handleFail) // check the code here

    client.join(
        null, 
        channelName, 
        Username, 
        () => {
            var localStream = AgoraRTC.createStream({
                video: true, 
                audio: true,
            })
            localStream.init(function(){
                localStream.play("SelfStream");
                console.log("App id: ${appId\nChannel} id: ${channelName}");
                client.publish(localStream);
            })
        }
    )
    client.on("stream-added", function(evt){
        client.subscribe(evt.stream,handleFail)
    })
    client.on("stream-subscribed", function(evt){
        console.log("Subscribed Stream");
        let stream = evt.stream;
        addVideoStream(stream.getId());
        stream.play(stream.getId() /* gets username */);
    })
    // creating an event listener like an onclick, on blurred
}

// 1. Initialize The Server
// 2. Add/Upload video stream from local device to agora cloud
// 3. audience needs to subscribe/receive those packages

// Homework #3 
// add multiple remote streams on web app page
// local stream is seeing myself 
// remote stream is how you see your friends - start building the page from scratch

// two instances of whatever video chat you are trying to make --> should hear audio coming thorug the device you have --> 

// only show rectangle when they join
