(function () {
  var samples = {
    freeze1: '/samples/freeze1.wav',
    freeze2: '/samples/freeze2.wav',
    freeze3: '/samples/freeze3.wav',
    freeze4: '/samples/freeze4.wav',
    freeze5: '/samples/freeze5.wav',
    freeze6: '/samples/freeze6.wav',
    freeze7: '/samples/freeze7.wav',
    freeze8: '/samples/freeze8.wav',
    freeze9: '/samples/freeze9.wav',
    freeze10: '/samples/freeze10.wav',
    freeze11: '/samples/freeze11.wav',
    kick1: '/samples/kick1.wav',
    snare1: '/samples/snare1.wav',
    snare2: '/samples/snare2.wav',
    voice1: '/samples/voice1.wav',
    voice2: '/samples/voice2.wav',
    voice3: '/samples/voice3.wav',
    voice4: '/samples/voice4.wav',
    voice5: '/samples/voice5.wav',
    voice6: '/samples/voice6.wav',
    voice7: '/samples/voice7.wav',
    voice8: '/samples/voice8.wav'
  };

  var sampleBank = new SampleBank({
    samples: samples
  });

  var mapping = new MidiMapper({
    mapping: {
      48: 'kick1',
      49: 'freeze1',
      50: 'freeze2',
      51: 'freeze3',
      33: 'freeze4',
      34: 'freeze5',
      35: 'freeze6',
      17: 'freeze7',
      18: 'freeze8',
      19: 'freeze9',
      0: 'snare1',
      1: 'snare2',
      2: 'freeze10',
      3: 'freeze9',
      4: 'voice1',
      5: 'voice2',
      6: 'voice3',
      7: 'voice4',
      20: 'voice5',
      21: 'voice6',
      22: 'voice7',
      23: 'voice8'
    },
    sampleBank: sampleBank
  });

  window.midiMapping = mapping;
  window.sampleBank = sampleBank;
}());
