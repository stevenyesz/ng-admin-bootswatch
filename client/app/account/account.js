'use strict';

angular.module('ngAdminBootswatchApp')
  .config(function($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer || $state.current.referrer || 'login';
          
          Auth.logout();
          $state.go(referrer);
         
        }
      })
      .state('customers', {
        url: '/customers',
        templateUrl: 'app/account/customers/customers.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('transactions', {
        url: '/transactions',
        templateUrl: 'app/account/transactions/transactions.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      });
  })
  .run(function($rootScope, $state, $window, $timeout, Auth) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      
      var user = Auth.getCurrentUser();
      // redirect user to login page if not logged in
      $timeout(function() {
         var storedTheme = $window.localStorage.getItem('theme');
            
        if(!user.email) {
          if(storedTheme) {
            
              $('#bootstrap_theme').attr('href','https://bootswatch.com/'+storedTheme+'/bootstrap.min.css');
          }
          event.preventDefault();
          $state.go('login');
          $timeout(function() {  $rootScope.userPage = true; }, 500);
         
        }
      }, 1000);    
           

      
      
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
