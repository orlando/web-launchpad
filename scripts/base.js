(function () {
  window.Base = {
    _listenEvents: function _listenEvents() {
      Object.keys(this.events || {}).forEach(function (eventName) {
        var methodName = this.events[eventName];
        var handler = this[methodName];

        PubSub.addListener(eventName, handler);
      }, this);
    },

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
