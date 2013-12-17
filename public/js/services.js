angular.module('recipeApp')
.factory('LinkService', function($q, $http){ 

  var service = {
    getInventory: function () {
      var d = $q.defer();
      $http({
        method:'GET',
        url:'/storage'
      }).success(function(data){
        d.resolve(data);
      }).error(function(reason) {
        d.reject(reason);
      });
      return d.promise;
    }
  }
  return service
})