angular.module('starter.controllers', [])


// .controller('AppCtrl', function($scope) {
  
// })

// .controller('RecordlistCtrl', function($scope) {
//   $scope.shouldShowDelete = false;
//   $scope.shouldShowReorder = false;
//   $scope.listCanSwipe = true
//   var records = $scope.records = [
//     { id: 1 },
//     { id: 2 },
//     { id: 3 },
//     { id: 4 },
//     { id: 5 },
//     { id: 6 },
//     { id: 7 },
//     { id: 8 },
//     { id: 9 },
//     { id: 10 },
//     ];

//     $scope.removeRec = function(index) {
//     records.splice(index, 1);
//   };

// })

// .controller('PlaylistsCtrl', function($scope,$http,$ionicLoading) {

  
  
      
// }) 

.controller('PlayerController', function($scope,$rootScope,$ionicLoading,$ionicModal,$http,$timeout,$ionicPlatform,Schedule,$cordovaDialogs) {

      $scope.records = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 }
      ];

      $scope.shouldShowDelete = false;
      $scope.shouldShowReorder = false;
      $scope.listCanSwipe = true;

      $scope.removeRec = function(index) {
        $scope.records.splice(index, 1);
      };


     $scope.schedule = [];
     Schedule.all().then(function(items) {
          $scope.schedule = $scope.schedule.concat(items);

           $scope.cur_date = new Date();
          
    
          function mins(start) {
            t = start.split(".");
            return parseInt(t[0])*60 + parseInt(t[1]);
          }
          var cur_mins = $scope.cur_date.getHours()*60+$scope.cur_date.getMinutes();

          var i=0;
          while(cur_mins > mins($scope.schedule[i].start)) {
            i++;
          }
          $scope.next = $scope.schedule[i];
          $scope.now =  $scope.schedule[i-1];
     });
  

    $ionicPlatform.ready(function() {

        $scope.play = function() {
          $rootScope.my_media.play();
          $scope.playing = true;
        };
        $scope.stop = function() {
          $rootScope.my_media.pause();
          $scope.playing = false;
        };
        $scope.levelchange = function() {
          var level=0;
          var current_level = $scope.level / 100; 
          // my_media.setVolume(current_level);
          console.log(current_level);

        }

        $scope.startRec = function() {
          $cordovaDialogs.alert('Функция записи недоступна', 'Внимание', 'OK');
          
        };
  
    });

    $ionicModal.fromTemplateUrl('templates/timer.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.closeModal = function() {
        $scope.modal.hide();
    };


    $scope.showstart = true;
    var sec=0;
    var mytimeout = $timeout($scope.onTimeout,1000);
    $scope.counter = sec;
    $scope.counter_min = 0;
    $scope.counter_hours = 0;

    $scope.addMinute = function() {
      $scope.counter_min = $scope.counter_min + 5;
      if ($scope.counter_min > 55) {
        $scope.counter_min = 0;
      } 
    }

    $scope.removeMinute = function() {
      $scope.counter_min = $scope.counter_min - 5;
      if ($scope.counter_min < 0) {
        $scope.counter_min = 55;
      } 
    }

    $scope.addHour = function() {
      $scope.counter_hours = $scope.counter_hours + 1;
    }

    $scope.removeHour = function() {
      $scope.counter_hours = $scope.counter_hours - 1;
      if ($scope.counter_hours < 0) {
        $scope.counter_hours = 0;
      } 
    }

    function CalcCounter() {
      $scope.counter = $scope.counter_min*60 + $scope.counter_hours*3600;
    }

    $scope.startTimer = function() {    
      CalcCounter();
      if ($scope.counter > 0) {
       
        mytimeout = $timeout($scope.onTimeout,0);
        $scope.showstart = false; 
      } 
    }

   $scope.reset = function(){
        $scope.counter=0;
        mytimeout.cancel;
        
        
        $scope.counter_hours=0;
        $scope.counter_min=0;
        $scope.show_count= false;
        $scope.showstart = true;
        
    }


    $scope.onTimeout = function(){
        
        
        $scope.counter--;  

        $scope.show_count = true;
       
        $scope.seconds = parseInt($scope.counter); 
        $scope.mins = parseInt($scope.counter/60);  
        $scope.hours = parseInt($scope.mins/60);  

        $scope.seconds = $scope.seconds - $scope.mins*60;   
        $scope.mins = $scope.mins - $scope.hours*60;   
        
         if ($scope.hours < 10) {
          $scope.hours = "0"+$scope.hours;
        }
        if ($scope.mins< 10) {
          $scope.mins = "0"+$scope.mins;
        }
        if ($scope.seconds<10) {
          $scope.seconds = "0"+$scope.seconds;
          
        }
        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        else {
            $timeout.cancel($scope.onTimeout);
            $scope.show_count = false;
            $scope.stop();
            $scope.counter_hours=0;
            $scope.counter_min=0;
            $scope.counter = 0;
            $timeout.cancel($scope.onTimeout);
            $scope.showstart = true;
            
            }

        
      
    }


    // $scope.share_click = function  () { 

    //   $ionicLoading.show( {
    //     template: 'Loading..'


    //   });

    //     $scope.send_share = function() {



    //       var message = {
    //         text: "Я слушаю Радио-Ангушт",
    //         url : "http://radio-angusht.ru/",
    //         image : "https://pp.vk.me/c625223/v625223025/36cf0/FtXROXsWrWg.jpg"    
    //       };

    //       window.socialmessage.send(message);
    //     }
    //   }

})


.controller('ShareCtrl',function($scope,$ionicLoading,$cordovaSocialSharing) {

  $scope.share_click = function  () {

      $ionicLoading.show( {
        template: 'Открытие..'

      });

      $cordovaSocialSharing
        .share('Я слушаю радио Ангушт', null, 'http://cs625223.vk.me/v625223025/39651/zMRDXh3Q1ns.jpg', 'http://radio-angusht.ru/') 
        .then(function() {
          
          $ionicLoading.hide();
        }, function(err) {
          
          
      });

       
  }


  

})


.controller('VolumeCtrl',function($scope,$rootScope) {

  $scope.levelchange = function() {
          var level=0;
          var current_level = $scope.level / 100; 
          $rootScope.my_media.setVolume(current_level);
          console.log(current_level);

        }


});




