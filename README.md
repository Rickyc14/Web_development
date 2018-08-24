# Web_development
Web development side projects using node.js, mongoDB, and express! 


This is a side project intended to implement the most fundamental concepts of web development and communication between client/server.<br>

Some of the critical tools used in it: 
- Node.js: it allows server-side scripting using Javascript
- Express.js: the most popular framework for Node.js
- MongoDB: non-relational database(a.k.a. NoSQL)
- Mongoose: useful MongoDB library
- JQuery: handy Javascript library
- Bootstrap: front-end framework

Despite its simplicity, it handles most of the expected functionality of a website, such as GET and POST requests. 
It also makes use of a Node.js middleware called Passport. It limits users to make requests without being logged on. The register page
has been taken down, and outside users can use the following login/password:<br>
```
login: demousername
password: demokey
```
<br>
Once users are logged on they can post articles on the site and read pre-existing placeholder articles. <br>

[Link to website](https://glacial-savannah-18161.herokuapp.com/)


It's currently being hosted on Heroku's cloud plataform. Their free-hosting services are good, but it comes with some limitations.
If the application being hosted doesn't get any traffic within an hour it goes to "sleep" and this causes some expected delays, but 
everything will work correctly.
