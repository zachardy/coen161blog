let stats = fetch("/api/stats")
.then(response => response.ok ? response.json() : Promise.reject("error fetching stats"))
.then(data => {
    document.querySelector("#total_posts").innerText = "total posts: " + data.total_posts;
    document.querySelector("#total_comments").innerText = "total comments: " + data.total_comments;
    document.querySelector("#total_views").innerText = "total views: " + data.total_views;
    const most_viewed = data.most_viewed;
    const most_commented = data.most_commented;
    const post_list = document.querySelector("#post_list");
    addStatsBlogPost(post_list, most_viewed.id, most_viewed.author, most_viewed.views, "most viewed post:", data.most_viewed.title, data.most_viewed.body);
    addStatsBlogPost(post_list, most_commented.id, most_commented.author, most_commented.views, `most commented post (${most_commented.comments.length} comments):`, most_commented.title, most_commented.body);
});

function addStatsBlogPost(parent, id, author, views, header,title, body) {
    
    let container = document.createElement("a");
    container.setAttribute("style","text-decoration:none;");
    container.href=`post.html?id=${id}`;
    
    let textContainer = document.createElement("div");
    textContainer.setAttribute("style","padding:1%");
    textContainer.classList.add("clickable");
    container.appendChild(textContainer);
    
    let headerElement = document.createElement("h1");
    headerElement.setAttribute("style","text-decoration:bold;");
    headerElement.textContent = header;
    textContainer.appendChild(headerElement);

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
        bodyElement.innerText = body.slice(0,250) + "... click to read more";
    }
    else { //render post as proper html
        bodyElement.innerHTML = body;
    }
    textContainer.appendChild(bodyElement);
    
    parent.appendChild(container);
    
    let horizontal_bar = document.createElement("div");
    horizontal_bar.setAttribute("style","width:100%; height:1vh; background-color:#fff;margin-top:2vh;margin-bottom:2vh;");
    parent.appendChild(horizontal_bar);
}