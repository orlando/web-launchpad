var SampleBank = function SampleBank(config) {
  this.init(config);
};

SampleBank.prototype = Object.create({});

Object.assign(SampleBank.prototype, {
  audioContext: null,

  init: function init(config) {
    Object.assign(this, config);
    this.audioContext = new AudioContext();
    this.bank = {};
    this._loadSamples(config.samples);
  },

  get: function get(name) {
    return this.bank[name];
  },

  play: function play(name) {
    var sample = this.get(name);

    sample && sample.play();
  },

  stop: function stop(name) {
    var sample = this.get(name);

    sample && sample.stop();
  },

  _rewind: function _rewind(name) {
    var buffer = this.bank[name + '_buffer'];
    var sample = this._createSample(name, buffer);
    this.bank[name] = sample;
  },

  _loadSamples: function _loadSamples(samplesObject) {
    var self = this;
    var keys = Object.keys(samplesObject);
    var values = [];
    var callback = function (bufferList) {
      self._createSamples(keys, bufferList);
    };

    keys.forEach(function (key) {
      values.push(samplesObject[key]);
    });

    var bufferLoader = new BufferLoader(
      this.audioContext,
      values,
      callback
    );

    bufferLoader.load();
  },

  _createSamples: function _createSamples(keys, bufferList) {
    keys.forEach(function (key, index) {
      var buffer = bufferList[index];
      var sample = this._createSample(key, buffer);

      // Store the sample to use it later
      this.bank[key] = sample;
    }, this);
  },

  _createSample: function _createSample(name, buffer) {
    return new Sample({
      name: name,
      buffer: buffer,
      audioContext: this.audioContext
    });
  }
});
