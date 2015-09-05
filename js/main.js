(function(){
  var timerApp = angular.module("timer", []);
  document.timerApp = timerApp;
  timerApp.controller("TimerController", function($scope) {
    var self = this;
    var defaultSettings = {
      durationInSeconds: 100,
      intervalInMilliseconds:1000,
      warning:{
        start:15, end:0
      },
      vibrateSettings:[200]
    };
    $scope.state = {
      secondsRemaining:defaultSettings.durationInSeconds,
      ticking:false,
      intervalHandle:null,
      warning:false
    };
    $scope.start = function() {
      self.resetSecondsRemaining();
      self.startCountdown();
    };
    $scope.stop = function() {
      self.stopCountdown();
    };
    this.resetSecondsRemaining = function() {
      $scope.state.secondsRemaining = defaultSettings.durationInSeconds;
    };
    this.stopCountdown = function() {
      console.log("stop countdown");
      clearInterval($scope.state.intervalHandle);
      $scope.state.ticking = false;
      $scope.stopWarning();
    };
    $scope.beginWarning = function() {
      $scope.state.warning = true;
      console.log("begin warning");
    };
    $scope.stopWarning = function() {
      $scope.state.warning = false;
      console.log("stop warning");
      if(window.navigator.vibrate) {
        window.navigator.vibrate(pattern)
      }
    }
    this.startCountdown = function() {
      console.log("start countdown");
      if ($scope.state.intervalHandle) {
        self.stopCountdown();
      }
      function tick() {
        console.log("tick");
        if ($scope.state.secondsRemaining === 0) {
          self.stopCountdown();
          return;
        }
        $scope.state.ticking = true;
        $scope.state.secondsRemaining = $scope.state.secondsRemaining - 1;

        if($scope.state.secondsRemaining <= defaultSettings.warning.start &&
          $scope.state.secondsRemaining >= defaultSettings.warning.end &&
          !$scope.state.warning) {
            $scope.beginWarning();
        }
        $scope.$apply();
      }
      $scope.state.intervalHandle = setInterval(tick, defaultSettings.intervalInMilliseconds);
      // For some reason angular doesn't like when you just call tick(), but it works
      // fine when put into a setInterval or setTimeout. Probably something about
      // Javascript scope quirkiness.
      setTimeout(tick, 0);
    };
  });
})();
