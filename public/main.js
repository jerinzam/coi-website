


angular.module("myApp",['ui.bootstrap.carousel','ngAnimate','imgSliderDirective','coursesDirective','ui.bootstrap'])
.factory('mySharedService', function($rootScope) {
    // var sharedService = {};
    
    // sharedService.fromDate = '';

    return{

    prepForBroadcast:function(msg) {
				        // this.fromDate = msg;
				        $rootScope.$broadcast('handleBroadcast');
    			     },

    broadcastItem:function() {
				        $rootScope.$broadcast('handleBroadcast');
				    }
    }

    // return sharedService;
})
.controller('DatepickerDemoCtrl',function($scope,mySharedService) {
	
    $scope.today = function() {
    $scope.dt = new Date();
  }; 



  $scope.$on('handleBroadcast', function() {
 	console.log("caught the event in date controller");
    $scope.fromDate = '';
    $scope.toDate = '';
  });


  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event,x) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope[x] = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
     showWeeks:'false'
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    $scope.trial = function(){
    	console.log('in datepikrDEMO')
    }

    return '';
  };
}) 
.filter("myfilter", function($filter) {

  return function(list, from, to,type,col) {

  	console.log("filtering for:"+type)
  	var from2 = new Date(from)
  	var fd = $filter('date')(from2,'dd-MM-yyyy')
  	var td = new Date(to);

  	
  	return $filter("filter")(list, function(listItem) {
  		// console.log(listItem[col],fd,listItem[col] >= fd)

  		if (type==="after")
        return !from || listItem[col] >= fd;
    	if (type==="before")
        return !from || listItem[col] < fd;
    	if (type==="between")
        return !from || listItem[col] >= fd || listItem[col] <= td;
      });           
        
  };
})
.factory('domains',function($http){
	return{
		list:function(userType,callback){
			console.log("in domain factory,..........................")
			$http({
				method:'GET',
				url:'/domainList/papa'
				
			}).success(callback)
			.error(function(error){
				console.log("In ajax error: "+error)
			})
		}
	}
})
.factory('courses',function($http){
	return{
		list:function(callback){
			$http({
				method:'GET',
				url:'/courses'	
				
			})
			.success(callback)
			.error(function(error){
				console.log('I am in error of AJAX,allCourses')
			})
			
		},

		find:function(course,callback){
			$http({
				method:'GET',
				url:'/course/'+ course.courseName	
				
			})
			.success(callback)
			.error(function(error){
				console.log('I am in error of AJAX,courseFind')
			})
		}
	}
})
.factory('userTypes',function(){
	return{
		list:function(){
			var userTypes = [{
								"type":'Parent',
								"placeholder":'Are you here for your son or yourself ?',
								"options":[	"I am here for my child",
											"I am here for myself",
										  ]
							},
							{
								"type":'Student',
								"placeholder":'Do you know the course you want ? ',
								"options":[	"I want to join for a course",											
											"I want to learn something new"]
							}]
			return userTypes;
		}
	}
})
.directive('fixedHeader',function($window,$location){
	return{
		restrict:'E',
		templateUrl:'/partials/fixed-header/fixed-header.html',
		link:function(scope,elem,attr){
			angular.element($window).bind("scroll", function() {
				console.log($location.path() === '' );
				if($location.path() === '' | $location.hash() === 'home' ){

		             if (this.pageYOffset <= 10) {
		             	elem.removeClass('header-final');
		                
		                 console.log('Scrolled below header.');
		             } else {
		                  elem.addClass('header-final')
		                 
		                 console.log('Header is in view.');
		             }
				}
        	});

		}
	}
})
.directive('userOptions',function(userTypes,domains){
	return{
		restrict:'E',
		scope:{},

		transclude:true,
		bindToController:true,
		controllerAs:'optionsCtrl',
		controller:function($scope){
			var self = this;

			self.getDomainList = function getDomainList(userType){
				
					domains.list(userType,function(data){
						console.log(data.msg)
						self.domainList = data.msg ;
						console.log(self.domainList)
						$scope.domainList2 = data.msg ;
						console.log($scope.domainList)
						
					});
				
			}
			self.users = userTypes.list();
			// self.domainList = ["a","b"]


		},
		templateUrl:'partials/tabset/user-options-index.html'
	}
})
.directive('tab2',function(){
	return{
		restrict:'E',
		require:'^tabset2',
		transclude:true,
		scope:{
			heading:"@"
		},
		template:'<div ng-show="active" ng-transclude></div>',
		link:function(scope,elem,attr,tabsetCtrl){
			scope.active = false;
			tabsetCtrl.add(scope);
		}
	}
})
.directive('tabset2',function($window){
	return{
		restrict:'E',
		scope:{
			item:"=",
			newvar:"@",
			activestyle:"@",
			inactivestyle:"@"			
		},
		transclude:true,
		// require:'^userOptions',
		templateUrl:'/partials/tabset/tabset.html',
		// require:'imageSlider',
		bindToController:true,
		controllerAs:'tabset',
		controller:function(){

			var self = this;
			self.tabs = []
			self.add = function add(tab){
				self.tabs.push(tab);
				if(self.tabs.length === 1){
					tab.active = true;
					}
			}
			
			self.click = function click(selectedTab){
				angular.forEach(self.tabs,function(tab){
					 if(tab.active && tab !== selectedTab) 
      		 			tab.active = false;				
			    })
			selectedTab.active = true;
			}
		},
		link:function(scope,element,attr,ctrl){
			console.log(ctrl.newvar	)
				
			scope.resetInput = function(){
				console.log("in resetInput")
				ctrl.firstBox = "e"
				scope.item = "";
			}
			
			}
}
})

.directive('courseTabStyle',function(){
	return{
		restrict:'A',
		scope:false,
		link:function(scope,elem,attr){
			
			elem.addClass('courseTab');
		}
	}
})

.controller('mainctrl',function($scope,mySharedService,$window,$location,$anchorScroll,$interval){
$scope.slider = 0 ;

$scope.searcher = function(value){
	$scope.inputvalue = [value];
	$scope.searchValue = '';
	console.log("I am  in searcher",$scope.inputvalue )
}
 function slideChanger(){
	console.log("I am in slide CHanger "+ $scope.slider )
	$scope.slider = ($scope.slider + 1) % 2;
	
}
$interval(slideChanger,5000)

	$scope.gotoTop = function(location){
		
		console.log("in gotoTop"+$location.url());
		$location.url('')
		$location.hash(location);
		$location.replace();

         console.log("in gotoTop"+$location.hash()+","+$location.url());
        $anchorScroll();

	}
angular.element($window).bind("scroll",function() {

	var y=$(this).scrollTop();
     console.log("in teseter" +y) 
    if( y > 700)
    $('.container .row .filter-box').stop().animate({'marginTop':y-700},500);
	else
    $('.container .row .filter-box').stop().animate({'marginTop':0},500);

});
	$scope.filterType="after";
	$scope.resetter = function(){
		console.log('in resetter')
		mySharedService.prepForBroadcast();
		$scope.fd = '';
	}
	// var testCtrl = $controller('DatepickerDemoCtrl')
	$scope.dateValue = function(x,y){
		
			$scope.td=y
		
			$scope.fd=x	
		
		console.log("Chosen date value is");
		console.log($scope.fd);

	}
	
	$scope.detailshide = true;
	$scope.detailshider = function(detailshide){
		console.log('in mainctrl,detailshider'+detailshide)

		$scope.detailshide = detailshide;
	}
})


.filter('inArray', function($filter) {
    return function(list, arrayFilter, element) {
      return $filter("filter")(list, function(listItem) {
        return !arrayFilter || arrayFilter.length == 0 || arrayFilter.indexOf(listItem[element]) != -1;
      });
    };
  }); 