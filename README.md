## The IVS Event Registration

### Project Description

This is a project for user to register to an event with name and email

### Database Description

- Supported DB Servers: PostgreSQL
- Schema: 
    - Table `registrations`:
        - id: uuid 
        - name: varchar
        - email: varchar
        - created_at: timestamp
        - updated_at: timestamp

### Setup to run in local

#### Backend

##### Requirements

- node version >=14.19.1

##### Setup

1. Go to backend folder: `cd backend`
2. Copy file `.env.sample` to `.env`: `cp .env.sample .env`
3. Fill in all environment variables
4. Run `npm install` to install dependencies
5. Run `npm run migration:run` to migrate database
5. Run `docker build -t ivs-backend .`
6. Run `docker run --env-file=.env -p 3000:80 ivs-backend`
7. Go to browser, visit `http://localhost:3000`, should see 404 not found message

##### Api docs and testing

1. Visit `http://localhost:3000/docs` to view api docs of this project
2. Click `Registrations` section, should see the apis
3. Click api `Sign up new registration` and click `Try it out` button
4. Fill in `name` and `email` then click `Execute` button, should return `201` status code and response will include `accessToken`
5. Use the `acessToken` in `step 4` for `Authorize` (above Registrations section) to test `Fetch registrations` and `Fetch registration by id` apis

#### Frontend

1. Go to frontend folder `cd frontend`
2. Open file `index.html` in browser, should see the register form
3. Enter valid `name` and `email`, should see the successful message


