(function () {
  /**
   * SamplePackStore is a global store that contains
   * all the samples that we have
   *
   * @constructor
   */
  var SamplePackStore = window.SamplePackStore = Object.create({});

  Object.assign(SamplePackStore, {
    samplePacks: {},
    samplePacksData: {},
    activeSamplePack: null,
    set: function set(key) {
      if (this.samplePacks[key]) {
        this.activeSamplePack = this.samplePacks[key];
        PubSub.emitEvent('samplePackChange', [{name: key, data: this.activeSamplePack}]);
      }
    }
  });

  /**
   * Format is simple
   *
   * key: Launchpad key code
   * value: Sample URL
   */
  SamplePackStore.samplePacks.firstOfTheYear = {
    48: 'samples/firstyear/kick1.wav',
    49: 'samples/firstyear/freeze1.wav',
    50: 'samples/firstyear/freeze2.wav',
    51: 'samples/firstyear/freeze3.wav',
    33: 'samples/firstyear/freeze4.wav',
    34: 'samples/firstyear/freeze5.wav',
    35: 'samples/firstyear/freeze6.wav',
    17: 'samples/firstyear/freeze7.wav',
    18: 'samples/firstyear/freeze8.wav',
    19: 'samples/firstyear/freeze9.wav',
    2: 'samples/firstyear/freeze10.wav',
    3: 'samples/firstyear/freeze11.wav',
    0: 'samples/firstyear/snare1.wav',
    1: 'samples/firstyear/snare2.wav',
    4:  'samples/firstyear/voice1.wav',
    5:  'samples/firstyear/voice2.wav',
    6:  'samples/firstyear/voice3.wav',
    7:  'samples/firstyear/voice4.wav',
    20: 'samples/firstyear/voice5.wav',
    21: 'samples/firstyear/voice6.wav',
    22: 'samples/firstyear/voice7.wav',
    23: 'samples/firstyear/voice8.wav'
  };

  SamplePackStore.samplePacks.twerktrap = {
    0: 'samples/twerktrap/synth1.wav',
    16: 'samples/twerktrap/synth2.wav',
    3: 'samples/twerktrap/drumloop.wav',
    5: 'samples/twerktrap/sfx.wav',
    20: 'samples/twerktrap/voice.wav',
  };

  SamplePackStore.activeSamplePack = {
    name: 'firstOfTheYear',
    data: SamplePackStore.samplePacks.firstOfTheYear
  };
}());
