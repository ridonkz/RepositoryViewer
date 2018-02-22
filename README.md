Project Description :

This project displays git repositories for Netflix organization and commits unser each repository.

Technology stack used:
1. ES6 for all Javascript Code
1. create-react-app as the basis for the application's presentation layer
2. Express.js & Node.js framework as web server platform
3. react-bootstrap and react-boostrap-table for components.


Versions:
1. Node -> 8.9.1
2. yarn -> 1.3.2

Steps to start the server:

1. Under the project directory install nodemon  'npm i nodemon -g'
2. You might have to install the javascript request library under the main folder  'npm install request' (have been seeing issues when I try to run the project on a different laptop) 
3. Install server and client dependencies, under the project directory
  ->  yarn
  ->  cd client
  ->  yarn
4. To start the server and client at the same time run 'yarn dev' and go to http://localhost:3000


Testing:
Testing for server calls:
 -> Under the main folder, run 'Node server.js'
 -> Go to http://localhost:5000/api/list-repos to get a list of repositories for netflix organization
 -> Go to http://localhost:5000/api/commits/:repo_name where repo_name is any one of the the repositories and get a list of commits under the repo.

 Testing components:

 Display repository:
 1. react-bootstrap-table used to display repositories.
 2. Sorting: By default repositories are sorted based on highest number of forks. But repositories can be sorted based on lowest-to-highest forks or repository name.
 3. Pagination: Repository table is paginated, you can choose to changes the number of rows to display on a page.
 4. Clicking on a row opens up a modal for commits under that repository.

 Display commits for a repository:
 1. react-bootstrap Modal and react-bootstrap-table used to display commits.
 2. Sorting: by default commits are sorted from most recent to least recent. Sorting can be applied on Date column from least recent to most recent and also by author.
 3. Pagination: Commits table is paginated, you can choose to changes the number of rows to display on a page.

 Limitations and improvements:

 1. This project only displays repository for one organization, can be further improved to have a selection upfront for user to select different organizations and see repositories underneath them.

 2. For displaying list of commits I have used a modal from react-bootstrap that pops up, would like to investigate more to have a sidepanel instead which doesn't pop up and disable the screen on the back.

 3. Haven't used a state container such as Redux for now, because there weren't much state changes and did not want to add overhead. As the application grows and if there are CRUD operations, redux will be required for state changes.

