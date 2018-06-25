 var express= require('express'),
	 app= express(),
	 cors= require('cors'),
	 bodyParser= require('body-parser'),
	 jwt= require('jsonwebtoken'),
	 mongoose= require('mongoose'),
	 Schema= mongoose.Schema;

 mongoose.connect('mongodb://localhost:27017/post', function(error){
 	if(error){
 		console.log(error);
 	}else{
 		console.log("success!!!");
 	}
 });

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: false}));


 app.use(cors({
 	origin: 'http://localhost:4200',
 	optionsSuccessStatus: 200
 })); 

 //schema for creating users
 var Users= mongoose.model('Users', {
 	email: {
 		type: String,
 		required: [true, 'Email required!']
 	},
 	password:{
 		type: String,
 		required: [true, 'Password Required!!!']
 	}
 });

//schema for posts
 var Posts= mongoose.model('Posts', {
 	userId:{
 		type: String,
 		required: [true]
 	},
 	username: {
		type: String,
		required: [true, 'username required!!!']
	},
 	title: {
 	 	type: String,
 	 	required: [true, 'title required!!!']
 	},
 	description: {
 	 	type: String,
 	 	required: [true, 'Description required!!!']
 	}
 });

//schema for comments
var Comments= mongoose.model('Comments', {
	userId: {
		type: String,
		required: [true, 'title required!!!']
	},
	postId: {
		type: String,
		required:[true, 'postid required']
	},
	comment: {type: String, required:true}
});

//schema for likes
var likes= mongoose.model('likes', {
	userId: {
		type: String,
		required: [true, 'title required!!!']
	},
	username: {
		type: String,
		required: [true, 'username required!!!']
	},
	postId: {
		type: String,
		required:[true, 'postid required']
	},
	like: {type: Number, required: true}
})

//create posts
app.post('/createpost', (req,res)=>{
	console.log(req.body);
	var newPost= new Posts(req.body);
	newPost.save().then((doc)=>{
		res.json({
			success: true,
			msg: "Successfully added!!!"
		});
	}).catch((error)=>{
		res.json({
			success:false,
			msg: 'Failed to add!!'
		});
	});
});

//find posts
app.get('/posts/:id', (req, res)=>{
	console.log(req.params.id);
	Posts.find({}, (err, docs)=>{
		console.log(docs);
		if(!err){
			res.send(docs);
		}
		else{
			res.json(err);
		}
	});
});

//get posts for id in edit posts
app.get('/getposts/:id', (req, res)=>{
	console.log("find post id: ",req.params.id);
	Posts.findOne({ '_id' : req.params.id }).then((err, docs)=>{
		console.log("post response ",docs);
		if(!err){
			res.send(docs);
		}
		else{
			res.json(err);
		}
	});
});

//edit the posts
app.put('/editpost/:id', (req, res, next)=>{
	Posts.findByIdAndUpdate({'_id': req.params.id}, {title:req.body.title, description:req.body.description, userId: req.body.userId}).then((docs, err)=>{
		console.log(docs);
		if(err) return next(err);
		res.json(docs._id);
	});
});

//delete posts
app.delete('/delete/:postid', function( req, res, next) {
    console.log(req.params.postid);
    Posts.find({ _id: req.params.postid}, function(err) {
      if(err) {
        req.status(504);
        req.end();
        console.log(err);
      }
    }).remove(function (err) {
      console.log(err);
      if (err) {
        res.end(err);            
      } else {
        res.end();
      }
    });
});

//delete comments
app.delete('/deletecmnts/:cmntid', function( req, res, next) {
    console.log(req.params.cmntid);
    Comments.find({ _id: req.params.cmntid}, function(err) {
      if(err) {
        req.status(504);
        req.end();
        console.log(err);
      }
    }).remove(function (err) {
      console.log(err);
      if (err) {
        res.end(err);            
      } else {
        res.end();
      }
    });
});

//create comments
app.post('/comments', (req,res)=>{
	console.log(req.body.comment);
		var newComment= new Comments(req.body);
		newComment.save().then((doc)=>{
			res.json({
				success:true,
				msg: "Successfully addedd!!"
			});
		}).catch((err)=>{
			res.json({
				success: false,
				msg: "Comments adding failed!!"
			});
		});
});

//adding the like
app.post('/likes', (req,res)=>{
	likes.find({'userId': req.body.userId, 'postId': req.body.postId}).then((docs, err)=>{
		if(docs.length==0){
	var newLike= new likes(req.body);
			newLike.save().then((docs)=>{
				res.json(docs);
			}).catch((err)=>{
				res.json({
					success: false,
					msg: "Likes adding failed!!"
				});
			});
		}else{
			res.send("fail!!");
		}
	})
	
});


//get likes
app.get('/getlikes/:postId', (req, res)=>{
	console.log("params postid:",req.params.postId);
	likes.find({'postId': req.params.postId},{'username':1, '_id':0}, (err, docs)=>{
		if(!err){
			console.log("getting docs",docs);
			res.json(docs);
		}
	});
});


//deleting the like
app.get('/unlikes/:userId/:postId', (req,res, next)=>{
	console.log("likeid",req.params.likeid);
	console.log("postid",req.params.postId);
	likes.find({postId: req.params.postId, userId:req.params.userId}, (err)=>{
		if(err) {
        req.status(504);
        req.end();
        console.log(err);
      }
    }).remove(function (err) {
      console.log(err);
      if (err) {
        res.end(err);            
      } else {
        res.end();
      }
    });
})

//for the view comments
app.get('/viewcomments/:userid/:postid', (req,res)=>{
	console.log(req.params.userid);
	Comments.find({userId: req.params.userid, postId:req.params.postid}).then((docs, err)=>{
		if(!err){
			console.log(docs);
			res.send(docs);
		}else{
			res.json(err);
		}
	});
});

//register user
app.post('/register', (req, res)=>{
	var newUser= new Users(req.body);
	newUser.save().then((doc)=>{
		res.json({
			success: true,
			msg: "Successfully Addedd!!"
		});
	}).catch((err)=>{
		res.json({
			success: false,
			msg:"Registration Failed!!!"
		});
	});
});

//authenticating and creating token
app.post('/authenticate', function(req,res){
	Users.findOne({'email':req.body.email, 'password':req.body.password}).then((docs)=>{
		console.log(docs);
		if(docs.length==0){
			res.json({
				isLoggedin: false,
				email: null
			});
		}
		else{
			if(docs.password==req.body.password){ 
				var token= jwt.sign({
					email: req.body.email
				},
				'marlabs-secret-key',
				{expiresIn: '1h'}
				);
				res.send({
					isLoggedIn: true,
					msg: 'Logged in Successfully',
					docs: docs,
					token: token
				});
			}
			else{
				res.send({
					isLoggedIn: false,
					msg: 'Log In fail!!!'
				});
			}
		}
	});
});

app.use(function(req, res, next){
	var token= req.body.token || req.query.token || req.headers.token;
	if(token){
		jwt.verify(token, 'marlabs-secret-key', function(err, decoded){
			if(!err){
				req.decoded = decoded;
				console.log(decoded);
				next();
			}else{
				res.send({
					msg: 'Invalid Request',
					isLoggedIn: false
				});
			}
		});
	}else{
		res.send({
			msg:'Invalid request',
			isLoggedIn: false
		});
	}
});



app.listen(3000, function(){
	console.log('Server running @localhost:3000');
});
