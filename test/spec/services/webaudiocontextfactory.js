'use strict';

describe('Service: webAudioContextFactory', function () {

  var webAudioContextFactory,
      windowMock,
      oscillatorMock,
      contextMock;

  oscillatorMock = {
    type: 'sine',
    frequency: { value: 0 },
    connect: function() {},
    start: function() {},
    stop: function() {}
  }

  function contextMock() {
    this.createOscillator = function() {
      return oscillatorMock;
    };
    this.destication = 'speakers';
  }

  windowMock = {
    AudioContext: contextMock,
    webkitAudioContext: contextMock,
    alert: function(text) {
      return text;
    }
  };
  
  beforeEach(function() {
    module('appApp', function($provide) {
      $provide.value('$window', windowMock);
    });

    inject(function(_webAudioContextFactory_) {
      webAudioContextFactory = _webAudioContextFactory_;
    });

  });


  it('should be able to get an instance of the factory', function () {
    expect(!!webAudioContextFactory).toBe(true);
  });

  describe('When getInstance is called, it', function() {
    it('should return a new instance of AudioContext', function() {
      var newInstance = webAudioContextFactory.getInstance();
      expect(newInstance).not.toEqual(windowMock.context);
    });

    it('should only create a single instance', function() {
      var newInstance = webAudioContextFactory.getInstance(),
          shouldBeSameInstance = webAudioContextFactory.getInstance();
      expect(newInstance).toBe(shouldBeSameInstance);
    });

    it('should be able to get Web Audio API context from webkit', function() {
      delete windowMock.AudioContext;

      var newInstance = webAudioContextFactory.getInstance();
      expect(newInstance).toBeDefined(); 

      windowMock.AudioContext = contextMock;
    });

    it('should alert the user if the browser is incompatible', function() {
      delete windowMock.AudioContext;
      delete windowMock.webkitAudioContext;

      var newInstance = webAudioContextFactory.getInstance;
      expect(newInstance).toThrow(jasmine.anything());
      windowMock.AudioContext = contextMock;
      windowMock.webkitAudioContext = contextMock;
    })
  });
});
