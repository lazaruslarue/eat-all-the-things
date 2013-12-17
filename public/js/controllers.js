angular.module('recipeApp')
  .controller('Main', function($scope, $http){

    $scope.name = 'main';
    $http({
      method: 'GET',
      url: '/'
    })
    .then(function(data){
      $scope.links = data.data;
    })
  })