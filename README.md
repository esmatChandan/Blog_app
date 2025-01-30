# Social Media App

A simple social media application built using **Node.js, Express.js, MongoDB, and EJS** that allows users to authenticate, create/edit/delete posts, comment on posts, and like posts.

## Features

- **User Authentication**: Sign up, log in, and log out securely.
- **CRUD Operations**: Users can create, edit, and delete their posts.
- **Comments**: Users can comment on posts.
- **Likes**: Users can like/unlike posts.
- **Authorization**: Users can only modify or delete their own posts.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Templating Engine**: EJS
- **Authentication**: Passport.js for authentication and session management

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/esmatChandan/Blog_app
   cd social-media-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     MONGO_URI=your-mongodb-connection-string
     SESSION_SECRET=your-session-secret
     ```

4. Start the development server:
   ```sh
   npm start
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Project Structure
```
/social-media-app
│── models/       # Database models (User, Post, Comment)
│── routes/       # Routes for authentication, posts, comments
│── views/        # EJS templates
│── public/       # Static assets (CSS, JS, images)
│── server.js     # Main entry point
│── .env          # Environment variables
│── package.json  # Dependencies
```

## API Routes

### Authentication
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /signup` - Signup page
- `POST /signup` - Register a new user
- `GET /logout` - Log out user

### Posts
- `GET /posts` - View all posts
- `POST /posts` - Create a new post
- `GET /posts/:id` - View a single post
- `PUT /posts/:id` - Edit a post
- `DELETE /posts/:id` - Delete a post

### Comments
- `POST /posts/:id/comments` - Add a comment
- `DELETE /comments/:id` - Delete a comment

### Likes
- `POST /posts/:id/like` - Like or unlike a post

## Future Enhancements
- Add user profiles with bio and profile pictures
- Implement real-time notifications
- Enhance UI with better styling and animations

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

