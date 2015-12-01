var LaunchpadOutput = function LaunchpadOutput(config) {
  this.init(config);
};

LaunchpadOutput.COLOR_CODES = {
  'red': 13,
  'redFull': 15,
  'amber': 29,
  'amberFull': 63,
  'yellow': 62,
  'yellowFull': 62,
  'green': 28,
  'greenFull': 60
};

LaunchpadOutput.OFF_CODE = 12;

LaunchpadOutput.prototype = Object.create(Base);

Object.assign(LaunchpadOutput.prototype, {
  init: function init(config) {
    this.midi = config.midi;
    this._storeOutput();
  },

  _storeOutput: function _getOutput() {
    this.output = this.midi.outputs.values().next().value;
  },

  ledOn: function ledOn(key, color, full) {
    if (full) {
      color = color + 'Full';
    }

    code = LaunchpadOutput.COLOR_CODES[color];
    var message = [144, key, code];

    if (code) {
      this._sendMessage(message);
    }
  },

  ledOff: function ledOff(key) {
    var message = [144, key, LaunchpadOutput.OFF_CODE];
    this._sendMessage([144, key, LaunchpadOutput.OFF_CODE]);
  },

  _sendMessage: function _sendMessage(message) {
    this.output.send(message);
  }
});
