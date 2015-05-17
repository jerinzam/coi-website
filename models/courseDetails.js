var mongoose = require('mongoose')

var courseDetailsSchema = mongoose.Schema({
	
	courseName			: String,
	courseDescription 	: String,
	courseCurriculum    : String,
	courseOffers		: String,
	courseAfter			: String


	

});

// var CourseDetails = mongoose.model('CourseDetials',courseDetailsSchema);

// var courses = new CourseDetails({
// 	 "courseName": "Javascript from mongo"
// })


module.exports = mongoose.model('course', courseDetailsSchema);



// courseDescription 	: String,
// 	courseCurriculum	: String,
// 	courseFuture		: String,
// 	courseOffers		: String,