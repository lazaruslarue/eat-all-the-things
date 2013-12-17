angular.module('recipeApp')
  .controller('Main', function($scope, $http, $cookieStore){
    $scope.name = 'Fridge App!';
    // $http({
    //   method: 'GET',
    //   url: '/storage'
    // })
    // .then(function(data) {
    //   $scope.items = data.data;
    // })
  })
  .controller('Recipe', function($scope, $http, $cookieStore) {
    $scope.name = 'Recipe list!';
    $scope.recipes = $cookieStore.get('recipes') || [];
    //TODO: put this in a service 
    $scope.update = function(recipe) {
      $scope.recipes.push( angular.copy(recipe) );
      $cookieStore.put('recipes', $scope.recipes)
      $scope.recipes = $cookieStore.get('recipes')
    };

  })
  .controller('Inventory', function($scope, $http, $cookieStore) {
    $scope.name = 'Your inventory list!';
    $scope.foods = $cookieStore.get('items') || [];
    //TODO: put this in a service that handles 
    // duplicate ingredients 
    $scope.update = function(ingredient) {
      $scope.foods.push( angular.copy(ingredient) );
      $cookieStore.put('items', $scope.foods)
      $scope.foods = $cookieStore.get('items')
    };
  }).
  controller('Ingredient', function($scope, $http, $cookieStore) {
    $scope.name = 'Show me the ingredients';
  })