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
    $scope.menu = $cookieStore.get('menu') || [];
    //TODO: put this in a service
    var thing = $scope.recipe = {
      name: '',
      ingredients: [{name: '',amount: ''}],
      instructions: ''
    }
    // $scope.count = [3,2,1]; 
    $scope.update = function(recipe) {
      $scope.menu.push( angular.copy(recipe) );
      $cookieStore.put('menu', $scope.menu);
      $scope.menu = $cookieStore.get('menu');
    };
    $scope.addItem = function(ingredient){
      $scope.recipe.ingredients.push({name: '',amount: ''});
    } 
  })
  .controller('Inventory', function($scope, $http, $cookieStore) {
    $scope.name = 'Your inventory list!';
    $scope.foods = $cookieStore.get('items') || [];
    //TODO: put this in a service that handles 
    // duplicate ingredients 
    $scope.update = function(ingredient) {
      $scope.foods.push( angular.copy(ingredient) );
      $cookieStore.put('items', $scope.foods);
      $scope.foods = $cookieStore.get('items');
    };
  }).
  controller('Ingredient', function($scope, $http, $cookieStore) {
    $scope.name = 'Show me the ingredients';
  })