const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const littlePlay = document.querySelector(".little-play");
const videoProgress = document.querySelector(".video-progress");
const volume = document.querySelector(".volume-progress");
const mute = document.querySelector(".volume")
const toggleVolume =document.querySelector(".volume")
const time = document.querySelector(".time-progress")
const scale = document.querySelector(".scaling")

window.addEventListener('DOMContentLoaded', () =>{
    for (let elem of ['.volume-progress']){
        document.querySelector(elem).addEventListener('input', function handler(){
let value = this.value;
this.style.background = `linear-gradient(to right, #753b24 0%, #753b24 ${value}%, #fff ${value}%, white 100%)`;
        })
    }
})

function setVolume(){
    let vol = volume.value / 100
    video.volume = vol
}

function playVideo(){
    if (video.paused){
        video.play(); 
    }
    else {
        video.pause();
    }
}

function updateButton()
{
    const icon = this.paused ? 'continue' : 'stop';
    littlePlay.textContent = icon;
}

function videoTime(time) { //Рассчитываем время в секундах и минутах

    time = Math.floor(time);
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    var minutesVal = minutes;
    var secondsVal = seconds;
    if(minutes < 10) {
    minutesVal = '0' + minutes;
    }
    if(seconds < 10) {
    secondsVal = '0' + seconds;
    }
    return minutesVal + ':' + secondsVal;
    }

    function videoChangeTime(e) { 
    var mouseX = Math.floor(e.pageX - videoProgress.offsetLeft);
    var progress = mouseX / (videoProgress.offsetWidth / 100);
    video.currentTime = video.duration * (progress / 100);
    }

    function fillTheGradient(elem, newVideoLoad) {

        if (elem === videoProgress && video.dataset.state === 'pre-play') {
            elem.value = video.currentTime * 100 / video.duration;
        }
    
        if (newVideoLoad === true) {
            elem.value = 0;
        }
    
        let value = elem.value;
        elem.style.background = `linear-gradient(to right, #753b24 0%, #753b24 ${value}%, #fff ${value}%, white 100%)`;
    }
    
function videoProgressTime() 
{ 
progress = (Math.floor(video.currentTime) / (Math.floor(video.duration) / 100));  
videoProgress.value = progress;    
}

function setMute() {
    if (mute.dataset.state === 'no-mute') {
        video.muted = true;
        mute.dataset.state = 'mute';
        
    } else {
        video.muted = false
        mute.dataset.state = 'no-mute';
    }
}

document.addEventListener('keydown', (event) => keydownHandler(event));

    function keydownHandler(event) {

        if (video.dataset.focus === 'active' && event.keyCode === 32) {
            playAndStop(event);
        }

        if (event.keyCode === 77) {
            setMute();
        }

        if (event.keyCode === 37) {
            video.playbackRate -= 0.25;
        }

        if (event.keyCode === 39) {
            video.playbackRate += 0.25;
        }
        
        if (event.keyCode === 75) 
        {
            playVideo();
        }

        if (event.keyCode === 32) 
        {
            playVideo();
        }

        if (event.keyCode === 70) {

            if (video.requestFullscreen() === 'active') {
                video.exitFullscreen();
            } else {
                video.requestFullscreen();
            }
        }

    }

function openFullscreen() {
      video.webkitRequestFullscreen();
  }

mute.addEventListener('click', function() {
    mute.innerHTML =
      (mute.innerHTML === 'volume') ? mute.innerHTML = 'mute' : mute.innerHTML = 'volume';
  })
video.addEventListener('timeupdate',videoProgressTime);
videoProgress.addEventListener('input', () => {
    fillTheGradient(videoProgress);
});
video.addEventListener('timeupdate', () => {
    fillTheGradient(videoProgress);
})
volume.addEventListener('mousemove', setVolume);
mute.addEventListener('click', setMute);
videoProgress.addEventListener('click',videoChangeTime);
video.addEventListener('click', playVideo);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
littlePlay.addEventListener('click', playVideo);
scale.addEventListener('click',openFullscreen);