<template>
  <div class="audio-recorder">
      <div v-if="dialouge" class="box w-1/2 bg-gray-100 pt-4 px-4 rounded-lg">
          <div class="flex justify-between px-4">
              <p class="text-2xl p-2 inline-block">Record Audio</p>
              <p class="pt-4"><i class="material-icons material-symbols-outlined" role="button" @click="dialouge = !dialouge">close</i></p>
          </div>
          <div v-if="!showSavedAudio" class="h-16 border-2 border-gray-400 bg-white m-2 mb-8 mx-4 rounded-lg flex justify-between px-4">
              <p class="pt-[1.2rem]">{{ formattedTime }}</p>
              <div v-if="!isRecording" class="svg mt-4" role="button" @click="startRecording">
                  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                      <g fill="#800ef1">
                          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                          <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                      </g>
                  </svg>
              </div>
              <div v-else class="svg mt-4" role="button" @click="stopRecording">
                  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32">
                      <path fill="red" d="M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16m10-6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2z" />
                  </svg>
              </div>
          </div>
          <div v-else class="box bg-gray-100 p-4 rounded-lg">
              <div class="audio mx-4">
                  <button v-if="!playaudio" @click="wave">
                      <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 32 32">
                          <path fill="black" d="M11 23a1 1 0 0 1-1-1V10a1 1 0 0 1 1.447-.894l12 6a1 1 0 0 1 0 1.788l-12 6A1.001 1.001 0 0 1 11 23m1-11.382v8.764L20.764 16Z" />
                          <path fill="black" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2" />
                      </svg>
                      <p>{{this.elapsedTime}}</p>
                  </button>
                  <div class="audioDisplay" v-else>
                      <vue-wave-surfer :src="savedAudioUrl" :options="waveOptions" @ready="onWaveSurferReady"></vue-wave-surfer>
                      <button class="px-4 py-2 bg-blue-200 rounded-md" @click="playCall">Play/Pause</button>
                  </div>
                  <div id="waveform"></div>
              </div>
              <div class="flex justify-end">
                  <button class="px-4 py-2  text-lg rounded-md hover:border-2 border-[#800ef1] hover:text-[#800ef1]" @click="showSavedAudio = !showSavedAudio">Retry</button>
                  <button class="px-4 py-2  text-lg rounded-md hover:border-2 border-[#800ef1] hover:text-[#800ef1]">Next</button>
              </div>
          </div>
      </div>
  </div>
  
  </template>
  
  <script>
  import WaveSurfer from "wavesurfer.js";
  import VueWaveSurfer from "vue-wave-surfer";
  
  export default {
      components: {
          VueWaveSurfer,
      },
      data() {
          return {
              mediaRecorder: null,
              audioChunks: [],
              isRecording: false,
              dialouge: true,
              startTime: null,
              elapsedTime: 0,
              timerInterval: null,
              showSavedAudio: false,
              savedAudioUrl: null,
              savedTime: null,
              playaudio: false,
              waverOptions: {
                  cursorColor: 'transparent',
                  progressColor: 'rgb(115,103,240)',
                  waveColor: 'rgb(115,103,240,.5)',
                  height: (this.savedAudioUrl) ? 55 : 30,
                  currentTrack: null,
              },
          };
      },
  
      computed: {
          formattedTime() {
              const hours = Math.floor(this.elapsedTime / 3600);
              const minutes = Math.floor((this.elapsedTime % 3600) / 60);
              const seconds = Math.floor(this.elapsedTime % 60);
              return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
          }
      },
      methods: {
          wave() {
              this.initializeWaveSurfer();
              this.playaudio = !this.playaudio
  
          },
          initializeWaveSurfer() {
              this.waveSurfer = WaveSurfer.create({
                  container: document.querySelector("#waveform"),
                  ...this.waveOptions,
              });
              this.waveSurfer.load(this.savedAudioUrl);
          },
          playCall() {
              console.log("Play button clicked");
              if (this.waveSurfer) {
                  console.log("WaveSurfer instance found, playing...");
                  this.waveSurfer.playPause();
              } else {
                  console.log("WaveSurfer instance not found");
              }
          },
          onWaveSurferReady(waveSurfer) {
              this.waveSurfer = waveSurfer;
          },
          async startRecording() {
              try {
                  const stream = await navigator.mediaDevices.getUserMedia({
                      audio: true
                  });
                  this.mediaRecorder = new MediaRecorder(stream);
                  this.isRecording = true;
                  this.playaudio = false;
                  this.startTime = Date.now();
                  this.timerInterval = setInterval(() => {
                      this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
                  }, 1000);
  
                  this.mediaRecorder.ondataavailable = event => {
                      this.audioChunks.push(event.data);
                  };
  
                  this.mediaRecorder.onstop = () => {
                      const audioBlob = new Blob(this.audioChunks, {
                          type: 'audio/wav'
                      });
                      this.savedAudioUrl = URL.createObjectURL(audioBlob);
                      this.showSavedAudio = true;
                      this.audioChunks = [];
                      this.elapsedTime = 0;
                      this.savedTime = this.elapsedTime;
  
                      clearInterval(this.timerInterval);
                  };
  
                  this.mediaRecorder.start();
              } catch (error) {
                  console.error('Error accessing microphone:', error);
              }
          },
          stopRecording() {
              if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
  
                  this.mediaRecorder.stop();
                  this.isRecording = false;
  
                  const tracks = this.mediaRecorder.stream.getTracks();
                  tracks.forEach(track => track.stop());
              }
          }
      }
  };
  </script>
  
  <style>
  .audio-recorder {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
  }
  
  .record-btn,
  .stop-btn {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      margin-bottom: 10px;
  }
  
  .record-btn {
      background-color: #4CAF50;
      color: white;
  }
  
  .stop-btn {
      background-color: #f44336;
      color: white;
  }
  
  .audio-player {
      width: 100%;
      margin-top: 20px;
  }
  </style>
  