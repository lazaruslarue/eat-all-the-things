angular.module('recipeApp')
  .controller('Main', function($scope, $http, $cookieStore){
    $scope.name = 'Fridge App!';
    $scope.menu = $cookieStore.get('menu');
    $scope.items = $cookieStore.get('items');
    $scope.canMake = [];
    var itemArray = [];
    for (var i in $scope.items) {
      itemArray.push($scope.items[i].name);
    }
    var compareRecipeInventory = function(recipe) {
      var truth = true;
      for (var t in recipe.ingredients ) {
        if (itemArray.indexOf(recipe.ingredients[t].type) === -1) {
          truth = false;
        }
      }
      recipe.haveIngredients = truth;
    }

    var doAllRecipes = function(menu) {
      for (var r in menu) {
        compareRecipeInventory(menu[r], itemArray)    
      }
    }
    doAllRecipes($scope.menu);

  })
  .controller('Recipe', function($scope, $http, $cookieStore) {
    //TODO: put this in a factory service
    $scope.name = 'Recipe list!';
    $scope.menu = $cookieStore.get('menu') || [];
    var thing = $scope.recipe = {
      name: '',
      ingredients: [{name: '',amount: ''}],
      //TODO: make instructions array. 
      instructions: '',
      haveIngredients: ''
    }
    $scope.update = function(recipe) {
      $scope.menu.push( angular.copy(recipe) );
      $cookieStore.put('menu', $scope.menu);
      $scope.menu = $cookieStore.get('menu');
    };
    $scope.addItem = function(ingredient){
      $scope.recipe.ingredients.push({name: '',amount: ''});
    };
    $scope.removeItem = function(ingredient) {
      
    }
  })
  .controller('Inventory', function($scope, $http, $cookieStore) {
    //TODO: put this in a factory service
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