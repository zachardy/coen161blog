let post_id_parser = new URLSearchParams(window.location.search);
let post_id = post_id_parser.has("id") ? post_id_parser.get("id") : undefined;

if(post_id) {

}

let post = fetch(`/post/${post_id}`)
.then(response => response.ok ? response.json() : Promise.reject("error getting data"))
.then(data => {
	let parent = document.querySelector("#post_content");
	let author = data.author;
	let title = data.title;
	let body = data.body;
	addBlogPost(parent, author, title, body);
});

let comments = fetch(`/comments/${post_id}`)
.then(response => response.ok ? response.json() : Promise.reject("error getting data"))
.then(data => {
	let parent = document.querySelector("#comment_content");
	for(let i=0; i<data.length; i++) {
		let author = data[i].author;
		let body = data[i].body;
		addComment(parent, author, body);
	}
});

function addBlogPost(parent, author, title, body) {

	let textContainer = document.createElement("div");
	textContainer.setAttribute("style","padding:1%");

	let titleElement = document.createElement("h1");
	titleElement.setAttribute("style","text-decoration:bold;");
	titleElement.textContent = title;
	textContainer.appendChild(titleElement);

	let authorElement = document.createElement("h3");
	authorElement.textContent = "by "+author;
	textContainer.appendChild(authorElement);

	let bodyElement = document.createElement("p");
	bodyElement.textContent = body;
	textContainer.appendChild(bodyElement);

	parent.appendChild(textContainer);

	let horizontal_bar = document.createElement("div");
	horizontal_bar.setAttribute("style","width:100%; height:1vh; background-color:#fff;margin-top:2vh;margin-bottom:2vh;");
	parent.appendChild(horizontal_bar);

}

function addComment(parent, author, body) {
	let textContainer = document.createElement("div");
	textContainer.setAttribute("style","padding:1%");

	let bodyElement = document.createElement("p");
	bodyElement.textContent = body;
	textContainer.appendChild(bodyElement);

	let authorElement = document.createElement("p");
	authorElement.textContent = "by "+author;
	textContainer.appendChild(authorElement);

	parent.appendChild(textContainer);

	let horizontal_bar = document.createElement("div");
	horizontal_bar.setAttribute("style","width:100%; height:0.5vh; background-color:#fff;margin-top:0.5vh;margin-bottom:0.5vh;");
	parent.appendChild(horizontal_bar);

}