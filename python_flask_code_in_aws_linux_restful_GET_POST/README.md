$ flask run --host=0.0.0.0

GET
$ curl -i http://localhost:5000/todo/api/v1.0/tasks/2

POST 
$ curl -i -H "Content-Type: application/json" -X POST -d '{"title":"Read a book"}' http://localhost:5000/todo/api/v1.0/tasks
