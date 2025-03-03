const audio = document.getElementById('myAudio');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volumeControl = document.getElementById('volume');

// 播放/暂停
playBtn.addEventListener('click', () => audio.play());
pauseBtn.addEventListener('click', () => audio.pause());

// 调节音量
volumeControl.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});


const playlist = ['song1.mp3', 'song2.mp3'];
let currentTrack = 0;

function playNext() {
  if (currentTrack < playlist.length - 1) {
    currentTrack++;
    audio.src = playlist[currentTrack];
    audio.play();
  }
}

audio.addEventListener('ended', playNext); // 自动播放下一首


const sound = new Howl({
  src: ['music/your-music.mp3'],
  autoplay: false,
  volume: 0.5,
  onend: () => console.log('播放结束！')
});

// 控制播放
document.getElementById('playBtn').onclick = () => sound.play();
document.getElementById('pauseBtn').onclick = () => sound.pause();












// const audio = document.getElementById('myAudio');
//     const playBtn = document.getElementById('playBtn');
//     const pauseBtn = document.getElementById('pauseBtn');
//     const volumeControl = document.getElementById('volume');

//     playBtn.addEventListener('click', () => audio.play());
//     pauseBtn.addEventListener('click', () => audio.pause());
//     volumeControl.addEventListener('input', (e) => {
//       audio.volume = e.target.value;
//     });
