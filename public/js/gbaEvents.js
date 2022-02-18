// If clicked, simulate click on the File Select input to load a ROM
document.getElementById("select").addEventListener("click", function () {
  document.getElementById("loader").click();
}, false);

// Run the emulator with the loaded ROM
document.getElementById("loader").addEventListener("change", function () {
  var ROM = this.files[0];
  run(ROM);
}, false);

// If clicked, simulate click on the File Select Input to load the savegame file
document.getElementById("select-savegame-btn").addEventListener("click", function () {
  document.getElementById('saveloader').click();
}, false);

// Load the savegame to the emulator
document.getElementById("saveloader").addEventListener("change", function () {
  var SAVEGAME = this.files[0];
  uploadSavedataPending(SAVEGAME);
}, false);

// Pause/Resume game
document.getElementById("pause").addEventListener("click", function () {
  togglePause();
}, false);

// Reset game
document.getElementById("reset-btn").addEventListener("click", function () {
  reset();
}, false);

// Download the savegamefile
document.getElementById("download-savegame").addEventListener("click", function () {
  gba.downloadSavedata();
}, false);

// Mute/Unmute emulator
document.getElementById("audio-enabled-checkbox").addEventListener("change", function () {
  gba.audio.masterEnable = this.checked;
}, false);

// Handle volume level slider
document.getElementById("volume-level-slider").addEventListener("change", function () {
  var volumeLevel = this.value;
  setVolume(volumeLevel);
}, false);
document.getElementById("volume-level-slider").addEventListener("input", function () {
  var volumeLevel = this.value;
  setVolume(volumeLevel);
}, false);

// In order to pause/resume the game when the user changes the website tab in the browser
// add the 2 following listeners to the window !
// 
// This feature is problematic/tricky to handle, so you can make it better if you need to
window.onblur = function () {
  if (gba.hasRom()) {
    var e = document.getElementById('pause');

    if (!gba.paused) {
      gba.pause();
      e.textContent = "UNPAUSE";

      console.log("Window Focused: the game has been paused");
    }
  }
};

window.onfocus = function () {
  if (gba.hasRom()) {
    var e = document.getElementById('pause');

    if (gba.paused) {
      gba.runStable();
      e.textContent = "PAUSE";

      console.log("Window Focused: the game has been resumed");
    }
  }
};