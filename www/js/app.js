// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $ionicLoading,$cordovaNetwork,$cordovaDialogs) {

  

  $ionicPlatform.ready(function() {

     $rootScope.isOffline = $cordovaNetwork.isOffline();

     
      if ($rootScope.isOffline == true) {
          $cordovaDialogs.alert('Отсутствует соединение с интернетом', 'Проверьте подключение', 'OK')
            .then(function() {
               $ionicLoading.hide();
            });

      };
     



        var src = 'http://94.232.88.88:8000/angusht';
        var temp_src='http://icecast.vgtrk.cdnvideo.ru/kulturafm_mp3_192kbps';
        

        $ionicLoading.show( {
            template: 'Загрузка радио..'
        });
        var initialize = false;

         $rootScope.my_media = new Media(src,
            function() {
                // alert("playAudio():Audio Success");
            },
            function(err) {
                // alert("playAudio():Audio Error: "+err);
            },
            function(status) {
              if (status == 1) {
                initialize = true;
              } else {
                if (initialize) {
                  initialize = false;
                  $ionicLoading.hide();
                  $rootScope.my_media.pause();
                }
              }
            });

        $rootScope.my_media.play();


    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });

   
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"
    

  })

  .state('app.main', {
    url: "/main",
    views: {
      'menuContent': {
        templateUrl: "templates/main.html"
        

        
      }
    }
  })

  .state('app.playlist',{
    url:"/playlist",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html"
        
      }
    }
    
  })

  .state('app.records', {
    url: "/records",
    views: {
      'menuContent': {
        templateUrl: "templates/records.html"
        
      }
    }
    
  });
  
  $urlRouterProvider.otherwise('/app/main');
});


