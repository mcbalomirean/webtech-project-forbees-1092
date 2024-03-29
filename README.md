# NoteBee

## Project - Student Notes

## Introduction

- What is the main necessity this product meets? <br />
  NoteBee gives students a way to create and share notes with each other, either individually or in study groups. The main problem it solves is one of organization and information sharing, aiming to make it as easy and streamlined as possible.
- To whom is this product addressed? <br />
  Our app is destined only for students, as it is a niche application, designed in order to help students organize their notes more efficiently.
- What other similar existing products are there on the market? <br />
  StuDocu: an app where you can share and download study-related resources to help you save time and study efficiently. <br />
  You can find it [here](https://www.studocu.com/). <br />
  Evernote: a powerful tool that can help executives, entrepreneurs and creative people capture and arrange their ideas. "All you have to do is use it." - Forbes <br />
  You can find it [here](https://evernote.com/). <br />

## Interface

- Login Page <br />
  ![alt text](docs/img/mockup_1.jpg "Login Page")
- Personal Notes View <br />
  ![alt text](docs/img/mockup_2.jpg "Personal Notes View")
- Group Notes View <br />
  ![alt text](docs/img/mockup_3.jpg "Group Notes View")
- Note Editor View <br />
  ![alt text](docs/img/mockup_4.jpg "Note Editor View")

## Components

1. Login/Registration form
2. Note form
3. Personal Notes view
4. Group Notes view
5. Note Editor view
6. Edit/Delete note button
7. Share note button
8. Save note button
9. Add to notebook button
10. Add new note button

## API Calls

- GET api/notes
- GET api/notes/:id
- GET api/notes/:id/contents
- PUT api/notes/:id
- POST api/notes
- POST api/notes/:id/share/students/:email
- DELETE api/notes/:id/share/groups/:name
- GET api/groups
- GET api/groups/:id
- GET api/groups/:id/members
- POST api/groups
- POST api/groups/:id/members/:email
- DELETE api/groups/:id
- DELETE api/groups//:id/members/:email

## User Actions

- Login/Register
- View Groups & Notes
- Add note
- Edit Note
- Share note
- Delete note
- Add group
- Add group member
- Remove group member
- Delete group

# Instructions

- clone project with `git clone`
- run `npm install` in both the `/api` and the `/notebee` directories
- configure .env files in both the `/api` and the `/notebee` directories according to the .env.sample files
- send a `GET` request to `${API}/api/test/db/creation` to create the database
- run `npm start` in both the `/api` and the `/notebee` directories
