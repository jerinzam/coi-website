angular.module('imgSliderDirective',[])
.directive('imageSlider',function(){
	return{
		restrict:'E',
		scope:{},
		transclude:false,
		link:function(){

		},
		templateUrl:'/partials/img-slider/img-slider.html'
	}
})