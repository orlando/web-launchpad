(function () {
  var Midi = function Midi(config) {
    this.init(config);
  };

  Midi.prototype = Object.create(Base);

  Object.assign(Midi.prototype, {
    events: {
      'ledOn': '_ledOnHandler',
      'ledOff': '_ledOffHandler',
    },

    init: function init() {
      this._bindAll();
      this._listenEvents();
      this._initMidi();
    },

    _initMidi: function () {
      navigator.requestMIDIAccess({
        sysex: false
      }).then(this._onMidiSuccessHandler);
    },

    _onMidiMessageHandler: function _onMidiMessageHandler(message) {
      console.log(message.data);
      PubSub.emitEvent('onMidiMessage', [message]);
    },

    _onMidiSuccessHandler: function _onMidiSuccessHandler(midi) {
      var inputs = midi.inputs.values();
      // loop over all available inputs and listen for any MIDI input
      for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = this._onMidiMessageHandler;
      }

      this.output = new LaunchpadOutput({
        midi: midi
      });
    },

    _ledOnHandler: function _ledOnHandler(key, color, full) {
      this.output && this.output.ledOn(key, color, full);
    },

    _ledOffHandler: function _ledOffHandler(key) {
      this.output && this.output.ledOff(key);
    },

    ledOff: function ledOff() {
    }
  });

  window.Midi = Midi;
}());
