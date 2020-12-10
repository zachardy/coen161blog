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

# Interacting with the API

## GETS
### endpoint #1 - /api/posts
- returns all posts stored on the server
- example:
```shell
curl localhost:3000/api/posts
```
- returns (with the repo's included data set):
```javascript
{"posts":[{"id":1,"author":" Cartan06","title":"I can’t believe someone broke into our garage and stole our limbo stick. Seriously, how low can you go?","body":"{1}I saw someone pole vaulting in the park{1} with a {i}stripey{i} yellow stick, which I remember thinking looked {b}very similar{b} to the limbo stick at your party last year... if this is the case then I think {2}Harriet{2} is your culprit.\n","comments":[{"author":"Extremiel","body":"Harriet is a copycat, she probably just recreated it when she saw it at the party last year.\nShe painted her car red a few weeks ago when she saw my new red subaru.\n(DO NOT COPY THIS COMMENT AS WELL HARRIET I AM WATCHING YOU.)"},{"author":"triplewhammy2","body":"I saw someone pole vaulting in the park with a stripey yellow stick, which I remember thinking looked very similar to the limbo stick at your party last year... if this is the case then I think Harriet is your culprit."},{"author":"Gabenfoodle","body":"Harriet is a copycat, she probably just recreated it when she saw it at the party last year.\nShe painted her car red a few weeks ago when she saw my new red subaru.\n(DO NOT COPY THIS COMMENT AS WELL HARRIET I AM WATCHING YOU.)"},{"author":"Extremiel","body":"Harriet I swear to god."},{"author":"NineSidedEnneagon","body":"Sorry to interject, but since actually everything that has ever been written or said has already been said or written because expression is limited, then who really is the copycat?\n"}],"views":17},{"id":3,"author":"nick5734324","title":"whoever keeps blowdrying our cows, could you PLEASE stop.","body":"{3}Hahaha{3} I think that was cousin {b}Lou{b} and his {i}skater mates{i}! {b}LEGENDS{b}!!","comments":[{"author":"taco","body":"that's crazy, I can't believe someone would do that"},{"author":"also taco","body":"this is another comment (i ran out of ideas)"},{"author":"not taco","body":"I'm a third comment!"}],"views":9},{"id":2,"author":"champagnejani","title":"To whoever’s been anonymously cyber bullying my cat, I WILL find you.","body":"{i}see the title{i}","comments":[{"author":"Kuronekostories","body":"I overheard Bill talking negatively about felines in the shop just a few days ago."}],"views":24},{"id":4,"views":3,"author":"Z","title":"Formatting Test","body":"{1}a large introduction{1} to a {b}bold{b} statement, and now, it is time for some {i}italics{i}. Lastly, here is some {6}small{6} text.","comments":[{"author":"Z","body":"worth noting that the templating engine only runs on the bodies of posts, not titles or comments ¯\\_(ツ)_/¯"}]}]}
```

### endpoint #2 - api/post/<number>
- parameters: number is the id of the post you want to retrieve
- returns a single post from the server with the given id, if the post exists
- example:
```shell
curl localhost:3000/api/post/1
```
- returns (with the repo's included data set):
```javascript
{"id":1,"author":" Cartan06","title":"I can’t believe someone broke into our garage and stole our limbo stick. Seriously, how low can you go?","body":"{1}I saw someone pole vaulting in the park{1} with a {i}stripey{i} yellow stick, which I remember thinking looked {b}very similar{b} to the limbo stick at your party last year... if this is the case then I think {2}Harriet{2} is your culprit.\n","comments":[{"author":"Extremiel","body":"Harriet is a copycat, she probably just recreated it when she saw it at the party last year.\nShe painted her car red a few weeks ago when she saw my new red subaru.\n(DO NOT COPY THIS COMMENT AS WELL HARRIET I AM WATCHING YOU.)"},{"author":"triplewhammy2","body":"I saw someone pole vaulting in the park with a stripey yellow stick, which I remember thinking looked very similar to the limbo stick at your party last year... if this is the case then I think Harriet is your culprit."},{"author":"Gabenfoodle","body":"Harriet is a copycat, she probably just recreated it when she saw it at the party last year.\nShe painted her car red a few weeks ago when she saw my new red subaru.\n(DO NOT COPY THIS COMMENT AS WELL HARRIET I AM WATCHING YOU.)"},{"author":"Extremiel","body":"Harriet I swear to god."},{"author":"NineSidedEnneagon","body":"Sorry to interject, but since actually everything that has ever been written or said has already been said or written because expression is limited, then who really is the copycat?\n"}],"views":18}
```

### endpoint #3 - api/comments/<number>
- parameters: number is the id of the post you want to retrieve comments for
- returns just the comments of a single post from the server with the given id, if the post exists
- example:
```shell
curl localhost:3000/api/comments/1
```
- returns (with the repo's included data set):
```javascript
[{"author":"Extremiel","body":"Harriet is a copycat, she probably just recreated it when she saw it at the party last year.\nShe painted her car red a few weeks ago when she saw my new red subaru.\n(DO NOT COPY THIS COMMENT AS WELL HARRIET I AM WATCHING YOU.)"},{"author":"triplewhammy2","body":"I saw someone pole vaulting in the park with a stripey yellow stick, which I remember thinking looked very similar to the limbo stick at your party last year... if this is the case then I think Harriet is your culprit."},{"author":"Gabenfoodle","body":"Harriet is a copycat, she probably just recreated it when she saw it at the party last year.\nShe painted her car red a few weeks ago when she saw my new red subaru.\n(DO NOT COPY THIS COMMENT AS WELL HARRIET I AM WATCHING YOU.)"},{"author":"Extremiel","body":"Harriet I swear to god."},{"author":"NineSidedEnneagon","body":"Sorry to interject, but since actually everything that has ever been written or said has already been said or written because expression is limited, then who really is the copycat?\n"}]
```

### endpoint #4 - api/stats
- returns statistics from the server including the most commented post, the most viewed post, and the total number of posts, comments, and views, respectively.
- example:
```shell
curl localhost:3000/api/stats
```
- returns (with the repo's included data set):
```javascript
{"most_viewed":{"id":2,"author":"champagnejani","title":"To whoever’s been anonymously cyber bullying my cat, I WILL find you.","body":"{i}see the title{i}","comments":[{"author":"Kuronekostories","body":"I overheard Bill talking negatively about felines in the shop just a few days ago."}],"views":24},"most_commented":{"id":1,"author":" Cartan06","title":"I can’t believe someone broke into our garage and stole our limbo stick. Seriously, how low can you go?","body":"{1}I saw someone pole vaulting in the park{1} with a {i}stripey{i} yellow stick, which I remember thinking looked {b}very similar{b} to the limbo stick at your party last year... if this is the case then I think {2}Harriet{2} is your culprit.\n","comments":[{"author":"Extremiel","body":"Harriet is a copycat, she probably just recreated it when she saw it at the party last year.\nShe painted her car red a few weeks ago when she saw my new red subaru.\n(DO NOT COPY THIS COMMENT AS WELL HARRIET I AM WATCHING YOU.)"},{"author":"triplewhammy2","body":"I saw someone pole vaulting in the park with a stripey yellow stick, which I remember thinking looked very similar to the limbo stick at your party last year... if this is the case then I think Harriet is your culprit."},{"author":"Gabenfoodle","body":"Harriet is a copycat, she probably just recreated it when she saw it at the party last year.\nShe painted her car red a few weeks ago when she saw my new red subaru.\n(DO NOT COPY THIS COMMENT AS WELL HARRIET I AM WATCHING YOU.)"},{"author":"Extremiel","body":"Harriet I swear to god."},{"author":"NineSidedEnneagon","body":"Sorry to interject, but since actually everything that has ever been written or said has already been said or written because expression is limited, then who really is the copycat?\n"}],"views":18},"total_posts":4,"total_views":54,"total_comments":10}
```

### endpoint #5 - stats
- this endpoint is identical to api/stats, I just included it for completeness since the assignment description said the endpoint should be /stats but I thought it should be /api/stats
- example:
```shell
curl localhost:3000/stats
```
- returns (with the repo's included data set):
```javascript
{"most_viewed":{"id":2,"author":"champagnejani","title":"To whoever’s been anonymously cyber bullying my cat, I WILL find you.","body":"{i}see the title{i}","comments":[{"author":"Kuronekostories","body":"I overheard Bill talking negatively about felines in the shop just a few days ago."}],"views":24},"most_commented":{"id":1,"author":" Cartan06","title":"I can’t believe someone broke into our garage and stole our limbo stick. Seriously, how low can you go?","body":"{1}I saw someone pole vaulting in the park{1} with a {i}stripey{i} yellow stick, which I remember thinking looked {b}very similar{b} to the limbo stick at your party last year... if this is the case then I think {2}Harriet{2} is your culprit.\n","comments":[{"author":"Extremiel","body":"Harriet is a copycat, she probably just recreated it when she saw it at the party last year.\nShe painted her car red a few weeks ago when she saw my new red subaru.\n(DO NOT COPY THIS COMMENT AS WELL HARRIET I AM WATCHING YOU.)"},{"author":"triplewhammy2","body":"I saw someone pole vaulting in the park with a stripey yellow stick, which I remember thinking looked very similar to the limbo stick at your party last year... if this is the case then I think Harriet is your culprit."},{"author":"Gabenfoodle","body":"Harriet is a copycat, she probably just recreated it when she saw it at the party last year.\nShe painted her car red a few weeks ago when she saw my new red subaru.\n(DO NOT COPY THIS COMMENT AS WELL HARRIET I AM WATCHING YOU.)"},{"author":"Extremiel","body":"Harriet I swear to god."},{"author":"NineSidedEnneagon","body":"Sorry to interject, but since actually everything that has ever been written or said has already been said or written because expression is limited, then who really is the copycat?\n"}],"views":18},"total_posts":4,"total_views":54,"total_comments":10}
```

## POSTS

### endpoint #6 - api/createpost
- parameters: the body of the request requires three properties to be set: "author", "title", and "body". If any of these are not included, the post request will fail.
- used to add a new blog post to the server
- example:
```shell
curl -X POST -H "content-type: application/json" -d '{"author":"not a writer","title":"here is a new post everyone!","body":"and here is the body to my post"}' localhost:3000/api/createpost
```
- returns (with the repo's included data set):
```javascript
{"status":"post created!"}
```

### endpoint #7 - api/createcomment
- parameters: the body of the request requires three properties to be set: "id", "author", and "body". If any of these are not included, the post request will fail.
- used to add a new comment to the post with the given id, if that post exists
- example:
```shell
curl -X POST -H "content-type: application/json" -d '{"id":1, "author":"just a commentor","body":"i am responding to your post"}' localhost:3000/api/createcomment
```
- returns (with the repo's included data set):
```javascript
{"status":"comment created!"}
```

## UPDATES

### endpoint #8 - api/updatepost/<num>
- parameters: the body of the request requires three properties to be set: "author", "title", and "body". Additionally, the route of the request requires the "num" id of the post being updated to be specified. If any of these are not included, the update request will fail.
- used to update an existing post on the server (note: this route is never used on the front-end, as it wasn't applicable to the project, I just included it for completeness)
- example:
```shell
curl -X PUT -H "content-type: application/json" -d '{"author":"different person","title":"updated post title","body":"the body changed too!"}' localhost:3000/api/updatepost/1
```
- returns (with the repo's included data set):
```javascript
{"status":"post updated!"}
```

### endpoint #9 - api/updatecomment/<post_num>/comments/<comment_num>
- parameters: the body of the request requires three properties to be set: "id", "author", and "body". Additionally, the route of the request requires the "post_num" id of the post with the comment and the "comment_num" id of the comment being updated to be specified. If any of these are not included, the update request will fail.
- used to update an existing comment on the server (note: this route is never used on the front-end, as it wasn't applicable to the project, I just included it for completeness)
- example:
```shell
curl -X PUT -H "content-type: application/json" -d '{"author":"a new person","body":"the body changed again! (comment body this time)"}' localhost:3000/api/updatecomment/1/comments/0
```
- returns (with the repo's included data set):
```javascript
{"status":"comment updated!"}
```

## DELETES

### endpoint #10 - api/deletepost/<num>
- parameters: "num" id of the post to be deleted
- used to delete a post from the server, if it exists. (note: this route is never used on the front-end, as it wasn't applicable to the project, I just included it for completeness)
- example:
```shell
curl -X DELETE localhost:3000/api/deletepost/3
```
- returns (with the repo's included data set):
```javascript
{"status":"post deleted!"}
```

### endpoint #11 - api/deletecomment/<post_num>/comments/<comment_num>
- parameters: "post_num" id of the post with the comment and "commend_num" id of the comment to be deleted, if both exist. (note: this route is never used on the front-end, as it wasn't applicable to the project, I just included it for completeness)
- example:
- example:
```shell
curl -X DELETE localhost:3000/api/deletecomment/1/comments/2
```
- returns (with the repo's included data set):
```javascript
{"status":"comment deleted!"}
```