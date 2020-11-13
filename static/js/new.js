let post_submit_button = document.querySelector("#submit");
post_submit_button.addEventListener("click", () => {
	let author_input = document.querySelector("#form_name").value;
	let title_input = document.querySelector("#form_title").value;
	let body_input = document.querySelector("#form_body").value;
	if(author_input && title_input && body_input) { //valid content added, submit comment to API and reload page

	const comment = fetch('/api/createpost', {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({'author':author_input, 'title':title_input, 'body':body_input})
	  }).then(response => response.ok ? response.json() : Promise.reject("error creating comment")).then(data => window.location = "/");
	}
	else {
		console.log("invalid input, please include a name, a title, and a comment");
	}
});