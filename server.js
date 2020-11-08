const express = require('express')
const fs = require('fs').promises

const getAllPosts = (req, res) => {
	let status_code = 200;
	const postsJSON = res.app.locals.postsJSON;
	res.status(status_code).send(postsJSON);
};

const getSinglePost = (req, res) => {
	let status_code = 200;
	const postsJSON = res.app.locals.postsJSON;
	let id = req.params.id;
	if(!id) { //no id parameter set, 400 bad request
		status_code = 400;
		res.status(status_code).send({"status":"error 400 bad request, no id parameter included in query"});
	}
	let post = postsJSON["posts"][id-1]; //fix array offset by one
	if(!post) { //no post with that id, 204 no content
		staus_code = 204;
		res.status(status_code).send({"status":"error 204 no content, no post exists with that id"});
	}
	//else, return the post to the client
	//delete post.comments; //not sure if we want to do this to fully separate the comments and the post or not (this was a bad idea)
	res.status(status_code).send(post);
};

const getCommentsFromPost = (req, res) => {
	let status_code = 200;
	const postsJSON = res.app.locals.postsJSON;
	let id = req.params.id;
	if(!id) { //no id parameter set, 400 bad request
		status_code = 400;
		res.status(status_code).send({"status":"error 400 bad request, no id parameter included in query"});
	}
	let comments = postsJSON["posts"][id-1]["comments"]; //fix array offset by one
	console.log(postsJSON["posts"][id-1]["comments"]);
	if(!comments) { //no post with that id, 204 no content
		staus_code = 204;
		res.status(status_code).send({"status":"error 204 no content, no post exists with that id"});
	}
	//else, return the coments to the client
	res.status(status_code).send(comments);
}	

const createPost = (req, res) => {
	let status_code = 200;
	let id = req.app.locals.postsJSON["posts"].length + 1;
	let author = req.body.author;
	let title = req.body.title;
	let body = req.body.body;
	let comments = [];
	if(!author || !title || !body) { //one or more parameters are not set, 400 bad request
		status_code = 400;
		res.status(status_code).send({"status":"error 400 bad request, necessary parameters are 'author' 'title' and 'body'"});
	}
	else {
		res.app.locals.postsJSON["posts"].push({"id":id, "author":author, "title":title, "body":body, "comments":comments});
		res.status(status_code).send({"status": "post created!"});
		commitChanges(res.app.locals.postsJSON);
	}
}

const createComment = (req, res) => {
	let status_code = 200;
	let id = req.body.id;
	let author = req.body.author;
	let body = req.body.body;
	if(!id || !author || !body) { //one or more parameters are not set, 400 bad request
		status_code = 400;
		res.status(status_code).send({"status":"error 400 bad request, necessary parameters are 'id' 'author' and 'body'"});
	}
	let comments = res.app.locals.postsJSON["posts"][id-1]["comments"]; //fix array offset by one
	if(!comments) {
		staus_code = 204;
		res.status(status_code).send({"status":"error 204 no content, no post exists with that id"});
	}
	else {
		comments.push({"author":author, "body":body});
		res.status(status_code).send({"status": "comment created!"});
		commitChanges(res.app.locals.postsJSON);
	}
}

//call this function with res.app.locals.postsJSON as the parameter to save changes made to the data on the server
const commitChanges = (data) => {
	try {
		fs.writeFile("./blog_posts.json", JSON.stringify(data));
	} catch (err) {
		console.error(err);
	}
}

const main = () => {
	const app = express();
	const port = 3000;

	app.use(express.json());

	//get routes of API
	app.get("/posts", getAllPosts);
	app.get("/post/:id", getSinglePost);
	app.get("/comments/:id", getCommentsFromPost);

	//post routes of API
	app.post("/createpost", createPost);
	app.post("/createcomment", createComment);
	//app.post("/gif/:mood", addNewGif);

	//delete routes of API (so far none)
	//app.delete("/mood/:mood", deleteMood);
	//app.delete("/gif/:mood", deleteGif);

	app.use(express.static('frontend'));

	fs.readFile("./blog_posts.json", "utf-8")
	.then((fileContents) => JSON.parse(fileContents))
	.then((data) => {
		app.locals.postsJSON = data;

		app.listen(port, () => {
			console.log(`Reaction gifs started on http://localhost:${port}`);
		});
	});
};

main();
