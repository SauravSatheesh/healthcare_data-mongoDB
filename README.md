# healthcare_data-mongoDB

## Getting Started
- Create a dotenv file , which exports your db.uri connection and jwtSecret.This file will be ignored by git so your db credentials will be kept safe when the app is deployed.

- Since this project will hold both the client application and the server application there will be node modules in two different places. First run `npm install` on both client and server side to install all the dependencies.

- Then run `npm start` on both client and server directories to run the app.


## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `authcontext and patient context ` - This folder holds all the actions and reducers.  
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!



