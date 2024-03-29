pokemon_song ="";
hedwig_song = "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
scoreleftWrist = 0;
song = "";

function setup(){
    canvas = createCanvas(600, 530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function preload(){
    pokemon_song = loadSound("Pokemon Stand Tall.mp3");
    hedwig_song = loadSound("Harry-Potter-Theme.mp3");
}

function draw(){
    image(video, 0, 0, 600, 530);

    fill("#00ff00");
    stroke("#ff0000");

    song = pokemon_song.isPlaying();
    console.log(song);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x, leftWrist_y, 20);
        hedwig_song.stop();
        if(song == false){
            pokemon_song.play();
        }
        else{
            console.log("Song Name: Pokemon Song");
            document.getElementById("song_id").innerHTML = "Song Name: Pokemon Song";
        }
    }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
         
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x + " leftWrist_y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x + " rightWrist_y = " + rightWrist_y);
    }
}