var express        = require('express');
var router         = express.Router();
var db1  = require('../models/courseDetails.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.get('/domainList/papa', function(req, res) {
	console.log("AJAX is working")
  res.json({msg:["J.School","H.School","Web-development"]});
});

router.get('/course/:courseName', function(req, res) {
	
	console.log("I am from /course/:courseName");
	
	
            db1.find({courseName:req.params.courseName},function(err,data){
		if(err){
			console.log("I am in trouble from NODEJS")
		}else{
			console.log("coming back with the DATA:");
			console.log(data);
  			res.json(data[0]);
		}
	});
        
});

router.get('/courses',function(req,res){
	db1.find({},function(err,data){
		if(err){
			console.log("I am in trouble from NODEJS")
		}else{
			console.log("coming back with the DATA for all courses:");
			console.log(data[0]);
			console.log("Have complete data...................................");
  			res.json(data);
		}

	})
	
});

module.exports = router;
