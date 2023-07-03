# BackLuzAcademy

HOW USE Course API

First execute npm install and the following table lists the different end points that you can use:

| Route          | HTTP Verb | Description              |
|----------------|-----------|--------------------------|
| user           | POST      | Create user              |
| User/:id       | POST      | Add course to user       |
| User/:id       | GET       | Get courses of user      |
| Course         | POST      | Create a course          |
| Course         | GET       | Get all courses          |
| Course/:id     | GET       | Get course by id         |
| Course/:id     | PUT       | Update course by id      |
| Course:/id     | DELETE    | Delete course by id      |
| class          | POST      | Create new class         |
| class          | GET       | Get all class            |
| Class/:id      | GET       | Get class by course id   |












Prior to any end point you must put the previously indicated URL (in this moment is localhost) and in header have put de authorization Bearer and token. 

In order to make correct use of the api it is necessary to have the database started, in this case with mongo DB.
