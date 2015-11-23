var MidiMapper = function MidiMapper(config) {
  this.init(config);
};

MidiMapper.prototype = Object.create({});

Object.assign(MidiMapper.prototype, {
  midi: null,
  mapping: null,
  output: null,
  sampleEnabledColor: 'amber',

  init: function init(config) {
    Object.assign(this, config);
    this._initMidi(config);
    this._initUiMapper();
  },

  _initMidi: function _initMidi() {
    Midi.init(false).then(this._onMidiSuccess.bind(this));
  },

  _initInputs: function _initInputs(midi) {
    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      // each time there is a midi message call the onMIDIMessage function
      input.value.onmidimessage = this._onMidiMessage.bind(this);
    }

    this.initInputs && this.initInputs(midi);
  },

  _initOutput: function _initOutput(midi) {
    this.output = new LaunchpadOutput({
      midi: midi
    });

    this.initOutputs && this.initOutputs(midi);
  },

  _initUiMapper: function _initUiMapper() {
    this.ui = new UIMapper({});
  },

  _onMidiSuccess: function _onMidiSuccess(midi) {
    this.midi = midi;

    this._initInputs(midi);
    this._initOutput(midi);
  },

  _onMidiMessage: function _onMidiMessage(message) {
    this.onMidiMessage && this.onMidiMessage(message);
  },

  _getSample: function _getSample(name) {
    return sampleBank.get(name);
  },

  _sampleName: function _sampleName(key) {
    return this.mapping[key];
  },

  _playSample: function _playSample(name) {
    sampleBank.play(name);
  },

  _stopSample: function _stopSample(name) {
    sampleBank.stop(name);
  },

  _ledOn: function _ledOn(key, color, full) {
    this.output && this.output.ledOn(key, color, full);
    this.ui && this.ui.buttonOn(key, color, full);
  },

  _ledOff: function _ledOff(key) {
    this.output && this.output.ledOff(key)
    this.ui && this.ui.buttonOff(key);
  },

  _mappedKeys: function _mappedKeys() {
    return Object.keys(this.mapping);
  }
});
