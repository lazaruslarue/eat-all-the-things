angular.module('recipeApp',
  ['ngRoute']
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
      .otherwise({
        redirectTo: '/'
      })
  })