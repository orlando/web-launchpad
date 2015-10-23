var SampleBank = function SampleBank(config) {
  this.init(config);
};

SampleBank.prototype = {
  audioContext: null,

  init: function init(config) {
    this.audioContext = new AudioContext();
    this.bank = {};
    this._loadSamples(config.samples);
  },

  get: function get(name) {
    return this.bank[name];
  },

  play: function play(name) {
    var self = this;
    var sample = this.get(name);

    if (sample) {
      sample.start(0);
    }
  },

  stop: function stop(name) {
    var sample = this.get(name);

    if (sample) {
      sample.stop(0);
      this._rewind(name);
    }
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

      // Store the buffer to recreate it later
      this.bank[key + '_buffer'] = buffer;
    }, this);
  },

  _createSample: function _createSample(key, buffer) {
    // Create a sound source
    var source = this.audioContext.createBufferSource();

    // Add the buffer to the source
    source.buffer = buffer;

    // Connect the source to the audioContext destination (output)
    source.connect(this.audioContext.destination);

    return source;
  }
};

Object.defineProperty(SampleBank.prototype, 'constructor', {
  value: SampleBank
});
