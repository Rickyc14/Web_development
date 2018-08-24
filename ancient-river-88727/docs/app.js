var express            = require("express");
var app                = express();
var bodyParser         = require("body-parser");
var mongoose           = require("mongoose");
var passport           = require("passport");
var LocalStrategy      = require("passport-local");
var User               = require("./models/user");
var Content            = require("./models/content");
var expressSanitizer = require("express-sanitizer");

 
//***********
//mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/harmonic');
//***********

app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Jerry is the cutest dog in the world!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//***************************************************************************************
//ROOT & login route are the same
app.get("/", function(req, res){ // ROOT ROUTE(cant past this route without login in)
   res.render("landing"); 
});

app.post("/", passport.authenticate("local",
{
    successRedirect: "/content", failureRedirect: "/"})
    ,function(req, res){
});
//***************************************************************************************
app.get("/content", isLoggedIn,function(req, res){ // first after root route
    Content.find({}, function(err, allContent){
      if(err){
          console.log(err);
      }else{
          res.render("content", {contents: allContent});
      }
      
  });
});

//***************************
//-> add image?? if/else
//***************************


app.post("/content", isLoggedIn, function(req, res){
     req.body.content.content = req.sanitize(req.body.content.content);
    var title = req.body.title;
    var content = req.body.content;
    
   /// var image = req.body.new_image;
    var newContent = {title: title, content: content};
    
    Content.create(newContent, function(err, newlyContent){
        if(err){
            console.log(err);
        }else{
            
            res.redirect("/content");
        }
    });
    
});

app.get("/content/new", isLoggedIn,function(req, res){ // first after root route
    res.render("addcontent");
});





//***************************************************************************************


//***************************************************************************************
app.get("/explore", isLoggedIn,function(req, res){ // first after root route
   res.render("explore");
});
//*********************************************** REGISTER PAGE IS KEPT OUT
//app.get("/register", function(req, res){
//   res.render("register"); 
//});
//
//app.post("/register", function(req, res){
//var newUser = new User({username:req.body.username});
//    
//   User.register(newUser, req.body.password, function(err, user){
//       if(err){
//            console.log(err);
//          return res.render("register")       }else{
//           passport.authenticate("local")(req, res, function(){
//               res.redirect("/content");
//          });
//      }
//   });
//});

//LOGOUT**
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

//**
app.get('*', isLoggedIn,function(req, res){
  res.render("error");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/");
    }
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started");
});