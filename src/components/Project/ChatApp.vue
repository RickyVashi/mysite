<template>
  <div class="mx-8 p-8">
    <div class="relative" style="padding-top: 56.25%;">
      <video
        ref="videoPlayer"
        class="absolute inset-0 w-full h-full"
        controls
      >
        <source src="../../assets/chatapp.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="mt-4 flex justify-center">
      <button
        @click="play"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Play
      </button>
      <button
        @click="pause"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Pause
      </button>
      <button
        @click="stop"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Stop
      </button>
      <button
        @click="setSpeed(0.5)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        0.5x
      </button>
      <button
        @click="setSpeed(1)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        1x
      </button>
      <button
        @click="setSpeed(1.5)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        1.5x
      </button>
      <button
        @click="setSpeed(2)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        2x
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    play() {
      this.$refs.videoPlayer.play();
    },
    pause() {
      this.$refs.videoPlayer.pause();
    },
    stop() {
      const { videoPlayer } = this.$refs;
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    },
    setSpeed(speed) {
      this.$refs.videoPlayer.playbackRate = speed;
    },
  },
};
</script>
