var exec = require('cordova/exec');

var HeadsetDetection = {
  detect: function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, "HeadsetDetection", "detect", []);
  },
  registerRemoteEvents: function(actionCallback) {
    // Need to call a native function to start recieve events on android
    exec(null, null, "HeadsetDetection", "registerRemoteEvents", []);
    this.actionCallback = actionCallback;
  },
  remoteHeadsetRemoved: function() {
    this.actionCallback && this.actionCallback('headsetRemoved');
  },
  remoteHeadsetAdded: function() {
    this.actionCallback && this.actionCallback('headsetAdded');
  },
  remoteHeadsetRemovedBT: function() {
    this.actionCallback && this.actionCallback('headsetRemovedBT');
  },
  remoteHeadsetAddedBT: function() {
    this.actionCallback && this.actionCallback('headsetAddedBT');
  }
};

require('cordova/channel').onCordovaReady.subscribe(function() 
{
  require('cordova/exec')(win, null, 'HeadsetDetection', 'cordovaReady', []); 
   
  function win(message)
  {
    if (message == "headsetRemoved")
    {
      HeadsetDetection.remoteHeadsetRemoved ();
    }
    else if (message == "headsetAdded")
    {
      HeadsetDetection.remoteHeadsetAdded ();
    }
    else if (message == "headsetAddedBT")
    {
      HeadsetDetection.remoteHeadsetAddedBT ();
    }
    else if (message == "headsetRemovedBT")
    {
      HeadsetDetection.remoteHeadsetRemovedBT ();
    }
  } 
    
});

module.exports = HeadsetDetection;

