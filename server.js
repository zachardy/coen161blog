const express = require('express');
const fs = require('fs').promises;

const getAllPosts = (req, res) => {
	let status_code = 200;
	const postsJSON = res.app.locals.postsJSON;
	res.status(status_code).send(postsJSON);
	//logging
	req.logs.resource = `getAllPosts`;
};

const getSinglePost = (req, res) => {
	let status_code = 200;
	const postsJSON = res.app.locals.postsJSON;
	let id = req.params.id;
	if(!id) { //no id parameter set, 400 bad request
		status_code = 400;
		res.status(status_code).send({"status":"error 400 bad request, no id parameter included in query"});
	}
	let post = getPostFromId(res.app.locals.postsJSON, id);
	if(!post) { //no post with that id, 204 no content
		staus_code = 204;
		res.status(status_code).send({"status":"error 204 no content, no post exists with that id"});
	}
	//else, return the post to the client
	//delete post.comments; //not sure if we want to do this to fully separate the comments and the post or not (this was a bad idea)
	//increment views of post by one
	post.views++;
	res.status(status_code).send(post);
	commitChanges(res.app.locals.postsJSON);
	//logging
	req.logs.resource = `getSinglePost/${id}`;
};

const getCommentsFromPost = (req, res) => {
	let status_code = 200;
	const postsJSON = res.app.locals.postsJSON;
	let id = req.params.id;
	if(!id) { //no id parameter set, 400 bad request
		status_code = 400;
		res.status(status_code).send({"status":"error 400 bad request, no id parameter included in query"});
	}
	let comments = getCommentsFromId(res.app.locals.postsJSON, id);
	if(!comments) { //no post with that id, 204 no content
		staus_code = 204;
		res.status(status_code).send({"status":"error 204 no content, no post exists with that id"});
	}
	//else, return the coments to the client
	res.status(status_code).send(comments);
	//logging
	req.logs.resource = `getCommentsFromPost/${id}`;
}

const getStats = (req, res) => {
	let posts = req.app.locals.postsJSON["posts"];
	posts.sort((a,b) => {
	if(a.views > b.views) return -1;
	else return 1;
	});
	const most_viewed = posts[0];
	
	posts.sort((a,b) => {
	if(a.comments.length > b.comments.length) return -1;
	else return 1;
	});
	const most_commented = posts[0];
	
	const total_views = posts.reduce((views_sum, post) => views_sum + post.views, 0);
	
	const total_comments = posts.reduce((comments_sum, post) => comments_sum + post.comments.length, 0);
	
	const stats = {
		"most_viewed":most_viewed,
		"most_commented":most_commented,
		"total_posts":posts.length,
		"total_views": total_views,
		"total_comments":total_comments
	};
	console.log(stats);
	res.status(200).send(stats);
	req.logs.resource = `getStats`;
}

const createPost = (req, res) => {
	let status_code = 200;
	let id = nextPostId(req.app.locals.postsJSON);
	let author = req.body.author;
	let title = req.body.title;
	let body = req.body.body;
	let comments = [];
	if(!author || !title || !body) { //one or more parameters are not set, 400 bad request
		status_code = 400;
		res.status(status_code).send({"status":"error 400 bad request, necessary parameters are 'author' 'title' and 'body'"});
	}
	else {
		res.app.locals.postsJSON["posts"].push({"id":id, "views":0, "author":author, "title":title, "body":body, "comments":comments});
		res.status(status_code).send({"status": "post created!"});
		commitChanges(res.app.locals.postsJSON);
	}
	//logging
	req.logs.resource = `createPost`;
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
	let comments = getCommentsFromId(res.app.locals.postsJSON, id);
	if(!comments) {
		staus_code = 204;
		res.status(status_code).send({"status":"error 204 no content, no post exists with that id"});
	}
	else {
		comments.push({"author":author, "body":body});
		res.status(status_code).send({"status": "comment created!"});
		commitChanges(res.app.locals.postsJSON);
	}
	//logging
	req.logs.resource = `createComment`;
}

const updatePost = (req, res) => {
	let status_code = 200;
	let id = req.params.id;
	let author = req.body.author;
	let title = req.body.title;
	let body = req.body.body;
	if(!id || !author || !title || !body) { //one or more parameters are not set, 400 bad request
		status_code = 400;
		res.status(status_code).send({"status":"error 400 bad request, necessary parameters are 'id' (in route path) 'author' 'title' and 'body'"});
	}
	else {
		let post = getPostFromId(res.app.locals.postsJSON, id);
		if(!post) { //invalid id
			status_code = 404;
			res.status(status_code).send({"status":"error 404 not found, no post exists with that id"});
		}
		else {
			post.author = author;
			post.title = title;
			post.body = body;
			res.status(status_code).send({"status": "post updated!"});
			commitChanges(res.app.locals.postsJSON);
		}
	}
	//logging
	req.logs.resource = `updatePost`;
}

const updateComment = (req, res) => {
	let status_code = 200;
	let post_id = req.params.post_id;
	let comment_id = req.params.comment_id;
	let author = req.body.author;
	let body = req.body.body;
	if(!post_id || !comment_id || !author || !body) { //one or more parameters are not set, 400 bad request
		status_code = 400;
		res.status(status_code).send({"status":"error 400 bad request, necessary parameters are 'post_id' and 'comment_id' (from route path) and 'author' and 'body'"});
	}
	else {
		let post = getPostFromId(res.app.locals.postsJSON, post_id);
		if(!post) { //invalid id
			status_code = 404;
			res.status(status_code).send({"status":"error 404 not found, no post exists with that id"});
		}
		else {
			let comment = getCommentFromIds(res.app.locals.postsJSON, post_id, comment_id);
			if(!comment) {
				status_code = 404;
				res.status(status_code).send({"status":"error 404 not found, no comment exists with that id"});
			}
			else {
				comment.author = author;
				comment.body = body;
				res.status(status_code).send({"status": "comment updated!"});
				commitChanges(res.app.locals.postsJSON);
			}
		}
	}
	//logging
	req.logs.resource = `updateComment`;
}

const deletePost = (req, res) => {
	let status_code = 200;
	let id = req.params.id;
	if(!id) { //one or more parameters are not set, 400 bad request
		status_code = 400;
		res.status(status_code).send({"status":"error 400 bad request, necessary parameters is 'id' (from route path)"});
	}
	else {
		let post = getPostFromId(res.app.locals.postsJSON, id);
		if(!post) { //invalid id
			status_code = 404;
			res.status(status_code).send({"status":"error 404 not found, no post exists with that id"});
		}
		else {
			let deletion_index = res.app.locals.postsJSON["posts"].indexOf(post);
			res.app.locals.postsJSON["posts"].splice(deletion_index, 1);
			res.status(status_code).send({"status": "post deleted!"});
			commitChanges(res.app.locals.postsJSON);
		}
	}
	//logging
	req.logs.resource = `deletePost`;
}

const deleteComment = (req, res) => {
	let status_code = 200;
	let post_id = req.params.post_id;
	let comment_id = req.params.comment_id;
	if(!post_id || !comment_id) { //one or more parameters are not set, 400 bad request
		status_code = 400;
		res.status(status_code).send({"status":"error 400 bad request, necessary parameters are 'post_id' and 'comment_id' (both from route path)"});
	}
	else {
		let post = getPostFromId(res.app.locals.postsJSON, post_id);
		if(!post) { //invalid id
			status_code = 404;
			res.status(status_code).send({"status":"error 404 not found, no post exists with that id"});
		}
		else {
			let comment = getCommentFromIds(res.app.locals.postsJSON, post_id, comment_id);
			if(!comment) {
				status_code = 404;
				res.status(status_code).send({"status":"error 404 not found, no comment exists with that id"});
			}
			else {
				let deletion_index = post.comments.indexOf(comment);
				post.comments.splice(deletion_index, 1); //remove just the one comment
				res.status(status_code).send({"status": "comment deleted!"});
				commitChanges(res.app.locals.postsJSON);
			}
		}
	}
	//logging
	req.logs.resource = `deleteComment`;
}

//call this function with res.app.locals.postsJSON as the parameter to save changes made to the data on the server
const commitChanges = (data) => {
	try {
		fs.writeFile("./blog_posts.json", JSON.stringify(data));
	} catch (err) {
		console.error(err);
	}
}

//Internal Functions, not attached to any route
const getPostFromId = (postsJSON, id) => {
	let post = postsJSON["posts"].filter(post => post.id === Number(id))[0];
	return post;
}

const getCommentsFromId = (postsJSON, id) => {
	let post = getPostFromId(postsJSON, id);
	let comments = post["comments"];
	return comments;
}

const getCommentFromIds = (postsJSON, post_id, comment_id) => {
	let comments = getCommentsFromId(postsJSON, post_id);
	let comment = comments[comment_id];
	return comment;
}

const nextPostId = (postsJSON) => {
    let max_id = 0;
    for(let i = 0; i < postsJSON["posts"].length; i++) {
        max_id = Math.max(max_id, postsJSON["posts"][i].id)
    }
    return max_id + 1;
}

//Writes Access Logs
const loggingHandler = (req, res, next) => {
	req.logs = {ip:req.connection.remoteAddress, time:Date(Date.now())};
	next();
	if(req.logs.resource) { //non-static requests only
		try {
			fs.appendFile("./logs.txt", JSON.stringify(req.logs)+"\n");
		} catch (err) {
			console.error(err);
		}
	}
}

const main = () => {
	const app = express();
	const port = 3000;

	app.use(express.json());

	//get routes of API
	app.get("/api/posts", loggingHandler, getAllPosts);
	app.get("/api/post/:id", loggingHandler, getSinglePost);
	app.get("/api/comments/:id", loggingHandler, getCommentsFromPost);
	app.get("/api/stats/", loggingHandler, getStats);

	//post routes of API
	app.post("/api/createpost", loggingHandler, createPost);
	app.post("/api/createcomment", loggingHandler, createComment);


	//update routs of API (unused in front-end but included for CRUD completeness)
	app.put("/api/updatepost/:id", loggingHandler, updatePost);
	app.put("/api/updatecomment/:post_id/comments/:comment_id", loggingHandler, updateComment); //yes, this url does blow up slightly but i think it's okay
	
	//delete routes of API (also unused in front-end but included for CRUD completeness)
	app.delete("/api/deletepost/:id", loggingHandler, deletePost);
	app.delete("/api/deletecomment/:post_id/comments/:comment_id", loggingHandler, deleteComment);

	app.use(express.static('static'));

	fs.readFile("./blog_posts.json", "utf-8")
	.then((fileContents) => JSON.parse(fileContents))
	.then((data) => {
		app.locals.postsJSON = data;

		app.listen(port, () => {
			console.log(`Blogging Engine started on http://localhost:${port}`);
		});
	});
};

main();

/* tests

GETS
curl localhost:3000/api/posts
curl localhost:3000/api/post/1
curl localhost:3000/api/comments/1

POSTS
curl -X POST -H "content-type: application/json" -d '{"author":"writer","title":"here is a new post everyone!","body":"and here is the body to my post"}' localhost:3000/api/createpost
curl -X POST -H "content-type: application/json" -d '{"id":1, "author":"commentor","body":"i am responding to your post"}' localhost:3000/api/createcomment

UPDATES
curl -X PUT -H "content-type: application/json" -d '{"author":"zebbe","title":"updated_post_title","body":"the body changed too!"}' localhost:3000/api/updatepost/1
curl -X PUT -H "content-type: application/json" -d '{"author":"not zebbe","body":"the body changed again!"}' localhost:3000/api/updatecomment/1/comments/1

DELETES
curl -X DELETE localhost:3000/api/deletepost/5
curl -X DELETE localhost:3000/api/deletecomment/1/comments/2
*/