# coen161blog
Final Project for COEN161 Fall 2020

### Running the Server
use the following command to run the server on its default port (3000)
```shell
npm start
```
to specify a port, use the following command instead, replacing "number" with the port of your choosing
```shell
node server.js --port=number
```

### Interacting with the API

## GETS
# endpoint #1 - /api/posts
- returns all posts stored on the server
- example:
```shell
curl localhost:3000/api/posts
```

# endpoint #2 - api/post/<number>
- parameters: number is the id of the post you want to retrieve
- returns a single post from the server with the given id, if the post exists
- example:
```shell
curl localhost:3000/api/post/1
```

# endpoint #3 - api/comments/<number>
- parameters: number is the id of the post you want to retrieve comments for
- returns just the comments of a single post from the server with the given id, if the post exists
- example:
```shell
curl localhost:3000/api/comments/1
```

# endpoint #4 - api/stats
- returns statistics from the server including the most commented post, the most viewed post, and the total number of posts, comments, and views, respectively.
- example:
```shell
curl localhost:3000/api/stats
```

# endpoint #5 - stats
- this endpoint is identical to api/stats, I just included it for completeness since the assignment description said the endpoint should be /stats but I thought it should be /api/stats
- example:
```shell
curl localhost:3000/stats
```

## POSTS

# endpoint #6 - api/createpost
- parameters: the body of the request requires three properties to be set: "author", "title", and "body". If any of these are not included, the post request will fail.
- used to add a new blog post to the server
- example:
```shell
curl -X POST -H "content-type: application/json" -d '{"author":"not a writer","title":"here is a new post everyone!","body":"and here is the body to my post"}' localhost:3000/api/createpost
```

# endpoint #7 - api/createcomment
- parameters: the body of the request requires three properties to be set: "id", "author", and "body". If any of these are not included, the post request will fail.
- used to add a new comment to the post with the given id, if that post exists
- example:
```shell
curl -X POST -H "content-type: application/json" -d '{"id":1, "author":"just a commentor","body":"i am responding to your post"}' localhost:3000/api/createcomment
```

## UPDATES

# endpoint #8 - api/updatepost/<num>
- parameters: the body of the request requires three properties to be set: "author", "title", and "body". Additionally, the route of the request requires the "num" id of the post being updated to be specified. If any of these are not included, the update request will fail.
- used to update an existing post on the server (note: this route is never used on the front-end, as it wasn't applicable to the project, I just included it for completeness)
- example:
```shell
curl -X PUT -H "content-type: application/json" -d '{"author":"different person","title":"updated post title","body":"the body changed too!"}' localhost:3000/api/updatepost/1
```

# endpoint #9 - api/updatecomment/<post_num>/comments/<comment_num>
- parameters: the body of the request requires three properties to be set: "id", "author", and "body". Additionally, the route of the request requires the "post_num" id of the post with the comment and the "comment_num" id of the comment being updated to be specified. If any of these are not included, the update request will fail.
- used to update an existing comment on the server (note: this route is never used on the front-end, as it wasn't applicable to the project, I just included it for completeness)
- example:
```shell
curl -X PUT -H "content-type: application/json" -d '{"author":"not zebbe","body":"the body changed again!"}' localhost:3000/api/updatecomment/1/comments/1
```

## DELETES

# endpoint #10 - api/deletepost/<num>
- parameters: "num" id of the post to be deleted
- used to delete a post from the server, if it exists. (note: this route is never used on the front-end, as it wasn't applicable to the project, I just included it for completeness)
- example:
```shell
curl -X DELETE localhost:3000/api/deletepost/3
```

# endpoint #11 - api/deletecomment/<post_num>/comments/<comment_num>
- parameters: "post_num" id of the post with the comment and "commend_num" id of the comment to be deleted, if both exist. (note: this route is never used on the front-end, as it wasn't applicable to the project, I just included it for completeness)
- example:
- example:
```shell
curl -X DELETE localhost:3000/api/deletecomment/1/comments/2
```