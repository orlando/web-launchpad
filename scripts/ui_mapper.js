var UIMapper = function UIMapper(config) {
  this.init(config);
};

UIMapper.COLOR_CODES = {
  'red': '#ff0000',
  'redFull': '#ff0000',
  'amber': '#0000ff',
  'amberFull': '#ff00ff',
  'yellow': '#0000ff',
  'yellowFull': '#0000ff',
  'green': '#00ff00',
  'greenFull': '#00ff00'
};

UIMapper.mapping = {
  8: [1,8],
  24: [2,8],
  40: [3,8],
  56: [4,8],
  72: [5,8],
  88: [6,8],
  104: [7,8],
  120: [8,8],

  0: [1,0],
  1: [1,1],
  2: [1,2],
  3: [1,3],
  4: [1,4],
  5: [1,5],
  6: [1,6],
  7: [1,7],
  16: [2,0],
  17: [2,1],
  18: [2,2],
  19: [2,3],
  20: [2,4],
  21: [2,5],
  22: [2,6],
  23: [2,7],
  32: [3,0],
  33: [3,1],
  34: [3,2],
  35: [3,3],
  36: [3,4],
  37: [3,5],
  38: [3,6],
  39: [3,7],
  48: [4,0],
  49: [4,1],
  50: [4,2],
  51: [4,3],
  52: [4,4],
  53: [4,5],
  54: [4,6],
  55: [4,7],
  64: [5,0],
  65: [5,1],
  66: [5,2],
  67: [5,3],
  68: [5,4],
  69: [5,5],
  70: [5,6],
  71: [5,7],
  80: [6,0],
  81: [6,1],
  82: [6,2],
  83: [6,3],
  84: [6,4],
  85: [6,5],
  86: [6,6],
  87: [6,7],
  96: [7,0],
  97: [7,1],
  98: [7,2],
  99: [7,3],
  100: [7,4],
  101: [7,5],
  102: [7,6],
  103: [7,7],
  112: [8,0],
  113: [8,1],
  114: [8,2],
  115: [8,3],
  116: [8,4],
  117: [8,5],
  118: [8,6],
  119: [8,7]
};

UIMapper.prototype = Object.create(Base);

Object.assign(UIMapper.prototype, {
  events: {
    'ledOn': '_ledOnHandler',
    'ledOff': '_ledOffHandler',
  },

  init: function init(config) {
    this._bindAll();
    this._listenEvents();
    this._initElement();
  },

  /**
   * Store a reference to element
   *
   * @returns {Void} returns void
   */
  _initElement: function _initElement() {
    this.element = document.getElementById('ui');
  },

  /**
   * Colors up a place in the grid
   *
   * @param {Integer} key key code
   * @param {String} color color code
   * @param {Boolean} full color modifer
   *
   * @returns {Void} returns void
   */
  buttonOn: function buttonOn(key, color, full) {
    var position = UIMapper.mapping[key];
    var columnElement = this._findButton(position);
    var color = UIMapper.COLOR_CODES[color];

    columnElement.style.background = color;
  },

  /**
   * Removes color from a place in the grid
   *
   * @param {Integer} key key code
   *
   * @returns {Void} returns void
   */
  buttonOff: function buttonOff(key) {
    var position = UIMapper.mapping[key];
    var columnElement = this._findButton(position);

    columnElement.style.background = 'none';
  },

  /**
   * Gets the place in the grid given a position
   *
   * @param {Array<Integer>} position [x,y] array
   *
   * @returns {HTMLNode} returns a DOM element
   */
  _findButton: function _findButton(position) {
    var row = position[0];
    var column = position[1];

    var rowElement = this.element.children[row];
    var columnElement = rowElement.children[column];

    return columnElement;
  },

  _ledOnHandler: function _ledOnHandler(key, color, full) {
    this.buttonOn(key, color, full);
  },

  _ledOffHandler: function _ledOffHandler(key) {
    this.buttonOff(key);
  }
});
