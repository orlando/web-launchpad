/**
 * Returns a MIDIAccess object
 *
 * @property {MIDIAccess} midi midi interface
 */
Midi = {
  init: function init(sysex) {
    return navigator.requestMIDIAccess({
      sysex: sysex
    });
  }
};
