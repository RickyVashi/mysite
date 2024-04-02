 <template>
<div class="m-8">
    <div class="flex w-2/5">
            <div class="flex w-1/6 px-2">
                <button @click="handlePlayClick" v-if="play " class="bg-gray-100 cursor-pointer rounded-full p-2 flex items-center" style="border: none; outline: none;">
                    <svg height="20px" viewBox="0 0 512 512" width="20px" xml:space="preserve" fill="#7367f0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g>
                            <path d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6   C218.6,448,224,442.6,224,435.8z" />
                            <path d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1   C384,69.4,378.6,64,371.8,64z" />
                        </g>
                    </svg>
                </button>
                <button @click="handlePlayClick" v-else class="bg-gray-100 rounded-full p-2 flex items-center" style="border: none; outline: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#7367f0">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M8 5v14l11-7z" /></svg>
                </button>
            </div>
            <div v-if="loading" class="ml-2">
                Loading...
            </div>
            <div class="relative w-full">
                <div :id="'waveform-' + id">
                    <vue-wave-surfer :src="mediaUri" :options="waveOptions" @ready="onWaveSurferReady"></vue-wave-surfer>
                </div>
            </div>
    </div>

    <div class="flex justify-between w-2/5" v-if="played">
        <div class="start">
            <span style="color: lightgray;">{{offset + ' / ' + duration}}</span>
        </div>

        <div class="flex">
            <div>🔊 <input v-model="sliderValue" @input="adjustVolume($event)" id="range" type="range" min="0" max="1" step="0.01" class="mr-4 -mt-4" /></div>
            <svg class="cursor-pointer float-right" @click="downloadAudio" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="#7367f0">
                <g>
                    <rect fill="none" height="24" width="24" />
                </g>
                <g>
                    <path d="M5,20h14v-2H5V20z M19,9h-4V3H9v6H5l7,7L19,9z" />
                </g>
            </svg>
        </div>
    </div>
</div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import VueWaveSurfer from "vue-wave-surfer";

export default {
    name: "HelloWorld",
    components: {
        VueWaveSurfer,
    },
    props: {
        id: {
            type: String,
            required: true
        },
        audioSrc: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            waveOptions: {
                cursorColor: 'transparent',
                progressColor: 'blue',
                waveColor: 'rgb(115,103,240,.5)',
                height: (this.played) ? 55 : 30,
                currentTrack: null
            },
            mediaUri: 'https://staskobzar.github.io/vue-audio-visual/file_example_MP3_1MG.mp3',
            waveSurfer: null,
            played: false,
            play: false,
            duration: 0,
            offset: 0,
            sliderValue: .5,
            error: false,
            loading: false
        };
    },
    methods: {
        initializeWaveSurfer() {
            this.waveSurfer = WaveSurfer.create({
                container: document.querySelector(`#waveform-${this.id}`),
                ...this.waveOptions,
            });
        },
        playAudio() {
            this.play = !this.play;
            if (!this.waveSurfer) {
                this.initializeWaveSurfer();
            }
            if (!this.played) {
                this.loadAudio();
            }
            if (this.waveSurfer) {
                this.loading = false;
                this.waveSurfer.playPause();
            }
        },
        adjustVolume(e) {
            let percentage = this.sliderValue * 100
            e.target.style.backgroundSize = percentage + '% 100%'
            this.waveSurfer.setVolume(this.sliderValue)
        },
        onWaveSurferReady(waveSurfer) {
            this.waveSurfer = waveSurfer;
        },
        loadAudio() {
            if (this.waveSurfer && this.audioSrc) {
                this.loading = true;
                this.waveSurfer.load(this.audioSrc);
            }
        },
        handlePlayClick() {
            if (this.played) {
                this.playAudio();
            } else {
                // Initialize WaveSurfer if it's not already initialized
                if (!this.waveSurfer) {
                    this.initializeWaveSurfer();
                }

                // Load audio
                this.loadAudio();

                // Listen for the ready event to ensure that the audio has been loaded
                this.waveSurfer.once('ready', () => {
                    var temp_duration = this.waveSurfer.getDuration();
                    var minutes = Math.floor(temp_duration / 60);
                    var seconds = Math.round(temp_duration - minutes * 60);
                    var formattedDuration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
                    this.duration = formattedDuration;
                    this.played = true;

                    // Attach event listeners
                    this.waveSurfer.on("finish", () => {
                        this.play = !this.play;
                    });
                    this.waveSurfer.on("audioprocess", () => {
                        var tempOffset = this.waveSurfer.getCurrentTime();
                        var minutes = Math.floor(tempOffset / 60);
                        var seconds = Math.round(tempOffset - minutes * 60);
                        var formattedOffset = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
                        this.offset = formattedOffset;
                    });

                    // Play audio
                    this.playAudio();
                });
            }
        }

    },
};
</script>

<style scoped>
input[type="range"] {
    -webkit-appearance: none;
    margin-top: -4px;
    margin-right: 15px;
    width: 85px;
    height: 6px;
    background: lightgray;
    border-radius: 5px;
    background-image: linear-gradient(#7367f0, #7367f0);
    background-size: 50% 100%;
    background-repeat: no-repeat;
}

[dir="rtl"] input[type="range"] {
    background: #7367f0;
    background-image: linear-gradient(#fff, #fff);
    background-size: 30% 100%;
    background-repeat: no-repeat;
}

/* Input Thumb */
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 14px;
    width: 14px;
    margin-top: 0px;
    border-radius: 50%;
    background: #7367f0;
    cursor: ew-resize;
    transition: background .3s ease-in-out;
}

input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
    height: 14px;
    width: 14px;
    margin-top: 0px;
    border-radius: 50%;
    background: #7367f0;
    cursor: ew-resize;
    transition: background .3s ease-in-out;
}

input[type="range"]::-ms-thumb {
    -webkit-appearance: none;
    height: 14px;
    width: 14px;
    margin-top: -4px;
    border-radius: 50%;
    background: #7367f0;
    cursor: ew-resize;
    transition: background .3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
    background: #7367f0;
}

input[type="range"]::-moz-range-thumb:hover {
    background: #7367f0;
}

input[type="range"]::-ms-thumb:hover {
    background: #7367f0;
}

/* Input Track */
input[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
}

input[type=range]::-moz-range-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
}

input[type="range"]::-ms-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
}
</style>
<!-- <template>
    <div>
      <vue-dropzone v-bind="dropzoneOptions" ref="dropzone">
        <div class="dz-message">
          <p>Drop files here or click to upload.</p>
        </div>
      </vue-dropzone>
    </div>
  </template>
  
  <script>

  import VueDropzone from 'vue2-dropzone';
  
  export default {
    components: {
      VueDropzone,
    },
    data() {
      return {
        dropzoneOptions: {
          url: '/upload',
          maxFilesize: 5, // MB
          acceptedFiles: 'image/*',
          dictDefaultMessage: 'Drop files here to upload',
        },
        dropzone: null,
      };
    },
    mounted() {
      this.dropzone = this.$refs.dropzone.$el;
    },
  };
  </script>
  
  <style>
  /* Add your dropzone styles here */
  </style> -->
  