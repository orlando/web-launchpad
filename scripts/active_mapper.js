var ActiveMapper = function ActiveMapper(config) {
  this.init(config);
};

ActiveMapper.prototype = Object.create(MidiMapper.prototype);

Object.assign(ActiveMapper.prototype, {
  onMidiMessage: function onMidiMessage(message) {
    var data = message.data;

    var key = data[1];
    var command = data[2];
    var sampleName = this._sampleName(key);

    if (!sampleName) {
      return;
    }

    var sample = this._getSample(sampleName);

    if (command === 127) {
      sample.rewind();
      sample.play();
      this._ledOn(key, 'green', true);
    } else {
      this._ledOff(key);
    }
  }
});
