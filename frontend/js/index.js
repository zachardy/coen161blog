let posts = fetch("/posts")
.then(response => response.ok ? response.json() : Promise.reject("error getting data"))
.then(data => {
	let posts = data.posts;
	let post_list = document.querySelector("#post_list")
		for(let i=posts.length-1; i>=0; i--) { //load in reverse order to sort by newest to oldest
			let id = posts[i].id;
			let author = posts[i].author;
			let title = posts[i].title;
			let body = posts[i].body;
			addBlogPost(post_list, id, author, title, body);
		}
	});

function addBlogPost(parent, id, author, title, body) {

	let container = document.createElement("a");
	container.setAttribute("style","text-decoration:none;");
	container.href=`post.html?id=${id}`;

	let textContainer = document.createElement("div");
	textContainer.setAttribute("style","padding:1%");
	textContainer.classList.add("clickable");
	container.appendChild(textContainer);

	let titleElement = document.createElement("h1");
	titleElement.setAttribute("style","text-decoration:bold;");
	titleElement.textContent = title;
	textContainer.appendChild(titleElement);

	let authorElement = document.createElement("p");
	authorElement.textContent = "by "+author;
	textContainer.appendChild(authorElement);

	let bodyElement = document.createElement("p");
	if(body.length > 250) {
		bodyElement.textContent = body.slice(0,250) + "... click to read more";
	}
	else {
		bodyElement.textContent = body;
	}
	textContainer.appendChild(bodyElement);

	parent.appendChild(container);

	let horizontal_bar = document.createElement("div");
	horizontal_bar.setAttribute("style","width:100%; height:1vh; background-color:#fff;margin-top:2vh;margin-bottom:2vh;");
	parent.appendChild(horizontal_bar);
}