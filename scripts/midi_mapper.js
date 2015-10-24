var MidiMapper = function MidiMapper(config) {
  this.init(config);
};

MidiMapper.prototype = {
  midi: null,
  mapping: null,
  output: null,
  sampleEnabledColor: 'amber',

  init: function init(config) {
    this.mapping = config.mapping;
    this.sampleEnabledColor = this.sampleEnabledColor || config.sampleEnabledColor;
    this._initMidi(config).then(this._initOutput.bind(this));
  },

  _initMidi: function _initMidi() {
    return navigator.requestMIDIAccess({
      sysex: false
    }).then(this._onMidiSuccess.bind(this));
  },

  _initOutput: function _initOutput() {
    this.output = new LaunchpadOutput({
      midi: this.midi
    });

    this._lightSampleEnabledButtons();
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
      this._ledOn(key, 'green', true);
    } else {
      this._stopSample(sampleName);
      this._lightSampleEnabledButton(key);
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
  },

  _ledOn: function _ledOn(key, color, full) {
    this.output && this.output.ledOn(key, color, full);
  },

  _ledOff: function _ledOff(key) {
    this.output && this.output.ledOff(key)
  },

  _mappedKeys: function _mappedKeys() {
    return Object.keys(this.mapping);
  },

  _lightSampleEnabledButtons: function _lightSampleEnabledButtons() {
    this._mappedKeys().forEach(function (key) {
      this._lightSampleEnabledButton(key);
    }, this);
  },

  _lightSampleEnabledButton: function _lightSampleEnabledButton(key) {
    this._ledOn(key, this.sampleEnabledColor);
  }
};

Object.defineProperty(MidiMapper.prototype, 'constructor', {
  value: MidiMapper
});
