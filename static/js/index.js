let posts = fetch("/api/posts")
.then(response => response.ok ? response.json() : Promise.reject("error getting data"))
.then(data => {
	let posts = data.posts;
	let post_list = document.querySelector("#post_list")
		for(let i=posts.length-1; i>=0; i--) { //load in reverse order to sort by newest to oldest
			let id = posts[i].id;
			let author = posts[i].author;
			let views = posts[i].views;
			let title = posts[i].title;
			let body = posts[i].body;
			addBlogPost(post_list, id, author, views, title, body);
		}
	});

function addBlogPost(parent, id, author, views, title, body) {

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

	let viewsElement = document.createElement("p");
	viewsElement.textContent = "views: " + views;
	textContainer.appendChild(viewsElement);

	let bodyElement = document.createElement("p");
	if(body.length > 250) { //dont bother rendering html since we are slicing
		bodyElement.innerHTML = parsingEngine(body.slice(0,250)) + "... click to read more";
	}
	else { //render post as proper html
		bodyElement.innerHTML = parsingEngine(body);
	}
	textContainer.appendChild(bodyElement);

	parent.appendChild(container);

	let horizontal_bar = document.createElement("div");
	horizontal_bar.setAttribute("style","width:100%; height:1vh; background-color:#fff;margin-top:2vh;margin-bottom:2vh;");
	parent.appendChild(horizontal_bar);
}

const parsingEngine = (text) => { //templating
	const tags = ["b", "i", "1", "2", "3", "4", "5", "6"];
	const htmltags = ["b","em","h1","h2","h3","h4","h5","h6"];
    for(let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const html_tag = htmltags[i];
        const regex = new RegExp(`\\{${tag}\\}(.|\\n)*?\\{${tag}\\}`,"g");
        let matches = text.match(regex);
        if(!matches) continue;
        for(let j = 0; j < matches.length; j++) {
            const match = matches[j];
            let formatted = `<${html_tag}>`+match.substr(2+tag.length,match.length-(5+tag.length))+`</${html_tag}>`;
            text = text.replace(match,formatted);
        }
    }
    return text;
}