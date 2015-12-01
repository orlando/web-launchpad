(function () {
  window.midi = new Midi({});
  window.samplePlayer = new SamplePlayer({});
  window.uiMapper = new UIMapper({});

  initSampleSelect();

  function initSampleSelect() {
    var select = document.getElementById('samples');

    Object.keys(SamplePackStore.samplePacks).forEach(function (key) {
      var option = document.createElement("option");
      option.text = key;
      select.add(option);
    });

    select.addEventListener('change', function (event) {
      SamplePackStore.set(event.currentTarget.value);
    });
  }
}());
