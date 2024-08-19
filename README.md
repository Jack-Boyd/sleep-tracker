# Sleep Tracker App

This is the Sleep Tracker application.

## Run Locally

### Server

- Navigate to server application `cd /server` in terminal
- Install dependencies by running `npm i` in terminal
- Start the DB (Postgresql) container with `docker compose up`
- Create .env file and put the following definition for DB url
  ```js
  DATABASE_URL = "postgresql://root:root@localhost:5432/sleeper";
  ```
- Finally start the server with `npm run dev`

### Client

- Navigate to client application folder `cd /client`
- Install dependencies by running `npm i`
- Run `npm run dev` in terminal

## Additional Features / Improvements

### General

- Reusable components client side
- Reusable Loading & Error components for API states
- Adding a 404 Page for customers to see if a page / endpoint doesn't work
- Make the UI responsive
- Set up API to accomodate for production / dev address instead of hardcoding localhost

### Auth

- Currently the 'user' that you can click into on the entries page is any entries with the same 'name' & 'gender'
- This increases the likelihood of an error when trying to add another entry in as the same user
- Having some kind of auth and logging into the app where the user is already created & they just need to enter 'sleepTimeDuration' & 'date'
- Then building the app around having this

### Create Entry

- Some validation to stop users 'sleeping for more hours than there are in a day'

### Entries

- Have a sort dropdown to change how the table is ordered
- Clicking whole row sends user to the desired trend-chart page instead of just the name on the table

### Trend Chart

- Let BE do the work to give chart data as needed format instead of a FE helper function
- Graph has wavey behaviour going from user to user, can fix this