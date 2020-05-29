# Comment_App
May Be this will be work
https://gultion.github.io/Comment_App/build/

also you can try 
``` 
 npm install 
 npm start
 ```

There is two part of Work
  1. Front View and 
  2. Server

And Server is like json-server which is really easy to use
Whose api is call by 

https://glacial-chamber-51444.herokuapp.com/comments



And App consist of some function 
like :
``` 
commentAdd()  # run when the change in the comment textarea
nameAdd()      # run when the change in the name input
uploadData()  # run when post add button is fired
voteChange()  # run when changes in the vote

```


Axios is used to fetch data from the server and database is hosted on the heroku.
For styling BootStrap is used 

the app is full easy just like when the words in the name and commentbox is added the then after the pressing of the button axios call for api and post the data to server with the increasing the id

When upvote or downvote button is fired the the function voteChange() is run and the fuction first get the data from the server and after that changes of upvode by plus 1 then data is posted to back the server and also like for downvote


**Note :** i only for the project and i know that this readme is very bad but what type of contain should be written on the this readme 
