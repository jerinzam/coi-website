angular.module('coursesDirective',[])
.directive('courseLibrary',function(courses,$location,$anchorScroll){
	return{
		restrict:'E',
		scope:false,
		controllerAs:'coursectrl',
		controller:function($scope){
			 $scope.inputvalue2 = [];
			// courses = courses;
			$scope.levelChooser= function(x){
				if($scope.inputvalue2.indexOf(x) != -1){
				   $scope.inputvalue2.splice($scope.inputvalue2.indexOf(x), 1);
				    }
				    else{
				    $scope.inputvalue2.push(x);
				    }
				    console.log("in levelChooser: for :" + x);
				    console.log( $scope.inputvalue2)
						
			}
			 

		},
		link:function(scope,elem,attr){
			courses.list(function(data){
				console.log("got all the courses");
				console.log(data)
				scope.courses = data;
			});
			
			scope.courseDetail = function(course){
				console.log("I am in courseDetail for :")
				console.log(course);
				
					courses.find(course,function(data){
						console.log("callback is success")
						console.log(data)
						scope.selectedCourse = data;

					})
					
				
				}
			scope.gotoAnchor = function(){
				console.log("in anchoring")
				$location.hash('bottom');
				$anchorScroll();
			}	
			
			
		},
		templateUrl:'/partials/courses/courses.html'
					
	}

});