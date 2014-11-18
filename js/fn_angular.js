//-----ANGULARJS
angular.module('RedShark', [])
  .controller('listado_controller', ['$scope', function($scope) {
    	$scope.audios=getSongs();
    };
  }]);