var url="http://sitepro.shreewebs.com/Abhilasha/login-webservice/webservice.php?function="
var app=angular.module('starter.controllers', [])

app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

    
  });

app.controller('LoginCtrl', function($scope,$http,$state,$rootScope) {

      $scope.signup1 = function() {
     $state.go('app.signup');
       };
  $scope.loginData={};

  $scope.doLogin = function() {
   
      if(!$scope.loginData.username && !$scope.loginData.password){


      //alert("a");
        alert("please enter username and password");
        return;

       // $state.go('app.browse');
      }
      if(!$scope.loginData.username){
        alert("please enter username");
        return;
      }

       if(!$scope.loginData.password){
        alert("please enter password");
        return;
      }    
      else{
        $rootScope.showLoad();
      $http({
                    method: "GET",
                    url:url+"login&email="+$scope.loginData.username+"&password="+$scope.loginData.password
                  }).then(function(response){
          
                    console.log("sign res"+JSON.stringify(response.data))
                    if(response.data.result=="failure"){
                        alert("Invalid username or password");
                        $rootScope.hideLoad();
                        //showAlert.showAlert("Failure","Invalid Credentials").then(function() {
                        //});
                    }
                    else if(response.data.result=="Success"){
      
                        alert("Success");
                        $rootScope.hideLoad();
                        $state.go('app.timer');
                        
                    }
                    else{
                            alert("some error");//$rootScope.hideLoad();
                            $rootScope.hideLoad();
                            }
                    
                    }, function(error){ 
                      alert("Connection to server is failing, please try again after some time")
                      //  $rootScope.hideLoad();
                    }); 
      
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
   }
  }

  });  
 
app.controller('SignUpCtrl', function($scope,$http,$state) {
    $scope.data ={
    fname:"",
    lname:"",
    pass:"",
    email:"",
    num:""
  };          


$scope.reset1 = function() {
    $scope.data ={
      fname:"",
      lname:"",
      pass:"",
      email:"",
      num:""
    };
  }

   $scope.signup = function() {
   // alert("inside signup");

    if(!$scope.data.fname){
        alert("Enter Firstname");
        return;
      }

       if(!$scope.data.lname){
        alert("Enter Lastname");
        return;
      }    

       if(!$scope.data.email){
        alert("Enter Email");
        return;
      }    
       if(!$scope.data.phone){
        alert("Enter Phone Number");
        return;
      }    
       if(!$scope.data.pass){
        alert("Enter Password");
        return;
      }    
       if(!$scope.data.cpass){
        alert("Enter Confirm Password ");
        return;
      }    
      else {
          $scope.showLoad();
          $http({
                  method: "GET",
                  url:url+"sign-up&fname="+$scope.data.fname+"&lname="+$scope.data.lname+"&email="+$scope.data.email+"&mob="+$scope.data.phone+"&pswd="+$scope.data.pass+"&cpswd="+$scope.data.cpass
                }).then(function(response){
                  console.log("sign res"+JSON.stringify(response.data))
                 
                        if(response.data.result=="failure"){
                          console.log(response.data);
                          $scope.hideLoad();
                          alert(response.data.message);
                          return;
                         
                        }
                        
                        if(response.data.result1=="failure1"){
                          console.log(response.data);
                          $scope.hideLoad();
                          alert(response.data.message1);
                          return;
                         
                        }
                      
                       if($scope.data.pass!=$scope.data.cpass)
                           {
                                  $scope.hideLoad();
                                  alert("Password Do not match");
                    //$state.go('app.signup1');
                  }
                        if(response.data.result=="Success"){
                         $scope.hideLoad();
                          alert("success");
                                  $scope.data ={
                                  fname:"",
                                  lname:"",
                                  email:"",
                                  phone:"",
                                  pass:"",
                                  cpass:""
                              };
                              $state.go('app.timer'); 
                           // });
                        }
                        else{
                          $scope.hideLoad();
                         }
                  
                  }, function(error){ 
                     $scope.hideLoad();
                    alert("Connection to server is failing, please try again after some time")
                     // $rootScope.hideLoad();
                  });
          
      }
  };

});

app.controller('TimerCtrl', function($scope,$http,$state,$timeout,$rootScope) {
  var $time;
 
  $scope.mytimer={};
      $scope.mytimer.msecond=0;  
      $scope.mytimer.second=0;
      $scope.mytimer.minute=2 ;
      $scope.mytimer.hour=0;


      $scope.mytimer.startbtn= false;
      $scope.mytimer.stopbtn= true;
      $scope.mytimer.pausebtn= true;
      $scope.mytimerfixed = 0;
      $scope.radius = 100;
       var timervariable ;

      $scope.mycustomtimer =function() {
        $scope.mytimer.second--;
        if($scope.mytimer.second == -1)
      {  
          $scope.mytimer.minute=$scope.mytimer.minute -1;
          $scope.mytimer.second=59;
        
         if($scope.mytimer.minute == -1)
            { 
             $scope.mytimer.second=0; 
             $scope.mytimer.minute=0;
            }
      }
          if($scope.mytimer.minute !=-1)
            {
              $scope.mytimer.second -1;
            }
         timervariable = $timeout($scope.mycustomtimer, 1000);  
      }
      $scope.start =function() {
       
          $scope.mytimer.startbtn=true;
          $scope.mytimer.stopbtn=false;
           $scope.mytimer.pausebtn=false;
           timer=$scope.mytimer.value;
          timervariable = $timeout($scope.mycustomtimer, 1000);
             };
          $scope.stop =function()  {
         $scope.mytimer.startbtn=false;
         $scope.mytimer.stopbtn=true;
          $scope.mytimer.pausebtn=true;     
          $timeout.cancel(timervariable);
             complete(true);
            };


        var complete =function(forcefulabort)
           {
             if(forcefulabort) 
                {
                 // alert('You stop the timer ');
                }  
              else 
                  {
                  alert('Timer completed!');
                  $scope.mytimer.startbtn=true;
                  $scope.mytimer.stopbtn=true;
                  $scope.mytimer.pausebtn=true;
                 }    
                 
                // $scope.mytimer.stopbtn=true; 
          }

          $scope.reset=function() {
           
            //var a=mytimer.value;
                  $scope.mytimer.second=0;
                  $scope.mytimer.minute=0;
                  $scope.mytimer.startbtn=false;
                  $scope.mytimer.stopbtn=false;
                  $scope.mytimer.pausebtn=false;   
                 //var res=mytimer.value;
                //$timeout.reset=res;
                //alert('mytimer.value'); 
               /// console.log($scope.mytimer.value);
                  };

       $scope.pause =function()  {
         
          $scope.mytimer.startbtn=false;
          $scope.mytimer.stopbtn=true;
          $scope.mytimer.pausebtn=true;  

          $timeout.cancel(timervariable);
            complete(true);
           };

/*  $scope.getStyle =function() {
   return {
    'top': '26%',
      'bottom': '26%',
      'height' :'50%', 
      'left': '20%',
      'right':'20%',
      'font-size' :$scope.radius/3   + 'px'

         };

      };*/


 });
