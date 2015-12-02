(function () {
  window.Base = {
    /**
     * Listen to events defined in events object
     *
     * @returns {Void} returns void
     */
    _listenEvents: function _listenEvents() {
      Object.keys(this.events || {}).forEach(function (eventName) {
        var methodName = this.events[eventName];
        var handler = this[methodName];

        PubSub.addListener(eventName, handler);
      }, this);
    },

    /**
     * Binds all methods in 'this' to 'this'
     *
     * @returns {Void} returns void
     */
    _bindAll: function _bindAll() {
      for (var name in this) {
        var method = this[name];

        if (method && method.call) {
          this[name] = method.bind(this);
        }
      }
    }
  };
}());
