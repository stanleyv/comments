angular.module('comment', [])
.controller('MainCtrl', [
	'$scope',
  '$http',
	function($scope, $http){
		$scope.candidates = [];

		$scope.addCandidate = function () {
			if ($scope.candidateName === '') { return; }
			var candidate = {
				name: $scope.candidateName,
				votes: 0
			}
			$scope.create(candidate);
		};
		$scope.create = function(candidate) {
		    return $http.post('/candidates', candidate).success(function(data){
		      $scope.candidates.push(data);
					$scope.candidateName = '';
		    });
		  };
			$scope.delete = function(candidate) {
		    $http.delete('/candidates/' + candidate._id )
		      .success(function(data){
		        console.log("delete worked");
		      });
		    $scope.getAll();
		  };

			$scope.submitBallot = function() {
				angular.forEach($scope.candidates, function(candidate) {
					if (value.selected) {
						$scope.upVote(candidate);
						$scope.ballot.push(candidate);
					}
			});
		};
		$scope.upVote = function(candidate) {
			return $http.put('/candidates/' + candidate._id + '/upvote')
				.success(function(data){
					console.log("upvote worked");
					candidate.votes += 1;
				});
		};
		$scope.getAll = function() {
			return $http.get('/candidates').success(function(data){
				angular.copy(data, $scope.candidates);
			});
		};
		$scope.getAll();






// 		$scope.comments = [];
//
// 		$scope.addComment = function() {
// 			//$scope.comments.push({title:$scope.formContent,upvotes:0});
//       if($scope.formContent === '') { return; }
//       console.log("In addComment with "+$scope.formContent);
//       $scope.create({
//         title: $scope.formContent,
//         upvotes: 0,
//       });
//       $scope.formContent = '';
// 		};
//
//     $scope.incrementUpvotes = function(comment) {
//       $scope.upvote(comment);
// 		};
//     $scope.upvote = function(comment) {
//       return $http.put('/comments/' + comment._id + '/upvote')
//         .success(function(data){
//           console.log("upvote worked");
//           comment.upvotes += 1;
//         });
//     };
//     $scope.getAll = function() {
//   return $http.get('/comments').success(function(data){
//     angular.copy(data, $scope.comments);
//   });
// };
// $scope.getAll();
// $scope.create = function(comment) {
//     return $http.post('/comments', comment).success(function(data){
//       $scope.comments.push(data);
//     });
//   };
//   $scope.delete = function(comment) {
//     $http.delete('/comments/' + comment._id )
//       .success(function(data){
//         console.log("delete worked");
//       });
//     $scope.getAll();
//   };
	}

]);
