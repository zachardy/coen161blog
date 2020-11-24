let post_id_parser = new URLSearchParams(window.location.search);
let post_id = post_id_parser.has("id") ? post_id_parser.get("id") : undefined;

let post = fetch(`/api/post/${post_id}`)
.then(response => response.ok ? response.json() : Promise.reject("error getting data"))
.then(data => {
	let parent = document.querySelector("#post_content");
	let author = data.author;
	let views = data.views;
	let title = data.title;
	let body = data.body;
	addBlogPost(parent, author, views, title, body);
});

let comments = fetch(`/api/comments/${post_id}`)
.then(response => response.ok ? response.json() : Promise.reject("error getting data"))
.then(data => {
	let parent = document.querySelector("#comment_content");
	for(let i=0; i<data.length; i++) {
		let author = data[i].author;
		let body = data[i].body;
		addComment(parent, author, body);
	}
});


let comment_submit_button = document.querySelector("#submit");
comment_submit_button.addEventListener("click", () => {
	let author_input = document.querySelector("#form_name").value;
	let body_input = document.querySelector("#form_body").value;
	if(author_input && body_input) { //valid content added, submit comment to API and reload page

	const comment = fetch('/api/createcomment', {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({'id':post_id, 'author':author_input, 'body':body_input})
	  }).then(response => response.ok ? response.json() : Promise.reject("error creating comment")).then(data => window.location.reload());
	}
	else {
		console.log("invalid input, please include both a name and a comment");
	}
});


function addBlogPost(parent, author, views, title, body) {

	let textContainer = document.createElement("div");
	textContainer.setAttribute("style","padding:1%");

	let titleElement = document.createElement("h1");
	titleElement.setAttribute("style","text-decoration:bold;");
	titleElement.textContent = title;
	textContainer.appendChild(titleElement);

	let authorElement = document.createElement("h3");
	authorElement.textContent = "by "+author;
	textContainer.appendChild(authorElement);

	let viewsElement = document.createElement("p");
	viewsElement.textContent = "views: " + views;
	textContainer.appendChild(viewsElement);

	let bodyElement = document.createElement("p");
	bodyElement.innerHTML = parsingEngine(body);
	textContainer.appendChild(bodyElement);

	parent.appendChild(textContainer);

	let horizontal_bar = document.createElement("div");
	horizontal_bar.setAttribute("style","width:100%; height:0.5vh; background-color:#fff;margin-top:0.5vh;margin-bottom:0.5vh;");
	parent.appendChild(horizontal_bar);

}

function addComment(parent, author, body) {
	let textContainer = document.createElement("div");
	textContainer.setAttribute("style","padding:1%");

	let bodyElement = document.createElement("p");
	bodyElement.innerHTML = body;
	textContainer.appendChild(bodyElement);

	let authorElement = document.createElement("p");
	authorElement.textContent = "by "+author;
	textContainer.appendChild(authorElement);

	parent.appendChild(textContainer);

	let horizontal_bar = document.createElement("div");
	horizontal_bar.setAttribute("style","width:100%; height:0.5vh; background-color:#fff;margin-top:0.5vh;margin-bottom:0.5vh;");
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