var MidiMapper = function MidiMapper(config) {
  this.init(config);
};

MidiMapper.prototype = {
  midi: null,
  mapping: null,

  init: function init(config) {
    this._initMidi(config);
    this.mapping = config.mapping;
  },

  _initMidi: function _initMidi() {
    navigator.requestMIDIAccess({
      sysex: false
    }).then(this._onMidiSuccess.bind(this));
  },

  _onMidiSuccess: function _onMidiSuccess(midiAccess) {
    this.midi = midiAccess;

    var inputs = this.midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      // each time there is a midi message call the onMIDIMessage function
      input.value.onmidimessage = this._onMidiMessage.bind(this);
    }
  },

  _onMidiMessage: function _onMidiMessage(message) {
    var data = message.data;

    console.log(data);

    var key = data[1];
    var command = data[2];
    var sampleName = this._sampleName(key);

    if (!sampleName) {
      return;
    }

    if (command === 127) {
      this._playSample(sampleName);
    } else {
      this._stopSample(sampleName);
    }
  },

  _sampleName: function _sampleName(key) {
    return this.mapping[key];
  },

  _playSample: function _playSample(name) {
    sampleBank.play(name);
  },

  _stopSample: function _stopSample(name) {
    sampleBank.stop(name);
  }
};

Object.defineProperty(MidiMapper.prototype, 'constructor', {
  value: MidiMapper
});
