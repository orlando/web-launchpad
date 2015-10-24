var Sample = function Sample(config) {
  this.init(config);
};

Sample.prototype = Object.create({});

Object.assign(Sample.prototype, {
  buffer: null,
  node: null,

  init: function init(config) {
    Object.assign(this, config);
    this._initNode();

    return this;
  },

  play: function play(position) {
    position || (position = 0);

    this.node.start(0);
    return this;
  },

  stop: function stop(position) {
    postion || (position = 0);

    this.node.stop(0);
    return this;
  },

  rewind: function rewind() {
    this._initNode();
    return this;
  },

  _initNode: function _initNode() {
    this.node = this._createBufferSource();
    this.node.buffer = this.buffer;
    this.node.onended = this._onended.bind(this);
    this.node.connect(this.audioContext.destination);
  },

  _onended: function _onended() {
    this.onended && this.onended();
  },

  _createBufferSource: function _createBufferSource() {
    return this.audioContext.createBufferSource();
  },
});
