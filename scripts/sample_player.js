(function () {
  var SamplePlayer = function SamplePlayer(config) {
    this.init(config);
  };

  SamplePlayer.prototype = Object.create(Base);

  Object.assign(SamplePlayer.prototype, {
    events: {
      'onMidiMessage': '_onMidiMessageHandler',
      'samplePackChange': '_loadSamples'
    },
    loop: false,
    samplePackName: null,
    samples: null,
    buffers: null,

    init: function init(config) {
      Object.assign(this, config);
      this._bindAll();
      this.samples = {};
      this.buffers = {};
      this.audioContext = new AudioContext();
      this._loadSamples(SamplePackStore.activeSamplePack);
      this._listenEvents();
    },

    _loadSamples: function _loadSamples(samplePack) {
      var samplePlayer = this;
      var name = this.samplePackName = samplePack.name;
      var data = samplePack.data;
      var urls = [];

      if (this.samples[name]) {
        return this.samples[name];
      }

      this.samples[name] = {};
      this.buffers[name] = {};

      Object.keys(data).forEach(function (key) {
        var url = data[key];
        urls.push(url);
      });

      new BufferLoader(this.audioContext, urls, function (bufferList) {
        var keys = Object.keys(data);

        keys.forEach(function (key, index) {
          var buffer = bufferList[index];

          // Store the buffer to use it later
          samplePlayer.buffers[name][key] = buffer;
        });
      }).load();
    },

    _onMidiMessageHandler: function _onMidiMessageHandler(message) {
      var data = message.data;

      var key = data[1];
      var command = data[2];

      var samplePackName = this.samplePackName;

      if (command === 127) {
        var buffer = this.buffers[samplePackName][key];

        if (buffer) {
          var sample = this._createNode(buffer, this.loop);
          this.samples[samplePackName][key] = sample;

          sample.start(0);
        }

        this._ledOn(key, 'green', true);
      } else {
        var sample = this.samples[samplePackName][key];

        sample && sample.stop(0);

        this._ledOff(key);
      }
    },

    _createNode: function _createNode(buffer, loop) {
      var node = this.audioContext.createBufferSource();
      node.buffer = buffer;
      node.loop = loop;
      node.connect(this.audioContext.destination);

      return node;
    },

    _ledOn: function _ledOn(key, color, full) {
      PubSub.emitEvent('ledOn', [key, color, full]);
    },

    _ledOff: function _ledOff(key) {
      PubSub.emitEvent('ledOff', [key]);
    }
  });

  window.SamplePlayer = SamplePlayer;
}());
