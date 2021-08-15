song = "";

function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("believer.mp3");
    
}
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristY = 0;
leftWristX = 0;
function setup(){
    play()
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("MobileNet initialized");
}
function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        scoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    

    fill("red");
    stroke("red");
    if(scoreLeftWrist >= 0.2){
        if(song.isPlaying()){
            song.stop();
            song2.play()
            song2.setVolume(1);
            song2.rate(1);
        }
    }
}
function play()
{
    song.play()
    song.setVolume(1);
    song.rate(1);
}
