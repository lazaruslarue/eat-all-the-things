angular.module('recipeApp',
  ['ngRoute']
  )
  .config(['$routeProvider',function($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'Main',
        templateURL: 'templates/main.html'
      })
      .when('/recipe',{
        controller: 'Recipe',
        templateURL: 'templates/recipe.html'
      })
  }])