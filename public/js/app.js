angular.module('recipeApp',
  ['ngRoute', 'ngCookies']
  )
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'Main',
        templateUrl: 'templates/main.html'
      })
      .when('/recipe',{
        controller: 'Recipe',
        templateUrl: 'templates/recipe.html'
      })
      .when('/inventory',{
        controller: 'Inventory',
        templateUrl: 'templates/inventory.html'
      })
      .otherwise({
        redirectTo: '/'
      })
  })