# ADii - Commodity Trends and Prices Platform

This is a MERN stack application that allows users to view the prices and trends of various commodities across different states in Nigeria. The platform provides up-to-date information to help users make informed decisions based on the latest market data.

The application also includes an admin panel where authorized administrators can manage commodities, update trends and prices, and control other aspects of the platform. Additionally, users can sign up for a newsletter to receive regular updates on commodity trends and prices.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Commodity Price Listings**: View the latest prices of various commodities across different states in Nigeria.
- **Commodity Trends**: Analyze trends in commodity prices over time.
- **Admin Panel**: Manage commodities, prices, and trends (restricted to admins only).
- **User Authentication**: Secure login and registration for both users and admins.
- **Newsletter Signup**: Users can sign up for a newsletter to get regular updates on commodity trends.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EDOHWARES/ADii
   cd ADii

2. **Install server dependencies.**
    ```bash
    cd server
    npm install

3. **Install client dependencies.**
    ```bash
    cd ../frontend
    npm install

4. **Setup environment variables.**
    ```bash
    MONGO_URI=
    JWT_SECRET=
    JWT_EXPIRE=
    ADMIN_PASSWORD=
    FRONTEND_URL=

5. **Run Application.**
- Start the server:
    ```bash
    cd server
    npm run server

- Start the client"
    ```bash
    cd ../frontend
    npm run dev

6. **Access the application.**
    Open your browser and navigate to http://localhost:3003 to access the platform.

## Usage

- **User Dashboard**: View commodity prices and trends.
- **Admin Panel**: Log in as an admin to manage commodities and trends.
- **Newletter**: Sign up with your email to receive updates.

## Technologies

- **Frontend**: React.js and TailwindCSS.
- **Backend**: Node.js, Express.js and MongoDB.
- **Authentication**: JSON Web Tokens (JWT).
- **State Management**: React Context API.
- **Styling**: TailwindCSS.

## Project Structure

commodity-platform/
│
├── frontend/              # React frontend
│   ├── public/            # Public files
│   └── src/               # Source files
        |__ assets         # assets
│       ├── components/    # React components
│       ├── context/       # React context for state management
│       ├── pages/         # Application pages
│       └── main.jsx      # Application entry point
│
└── server/                # Node.js backend
    ├── config/            # Configuration files
    ├── controllers/       # Route controllers
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    ├── middleware/        # Express middleware
    └── server.js          # Application entry point

## Contributing
    Contributions are welcome! Please feel free to submit a Pull Request.

    - Fork the repository
    - Create your feature branch: git checkout -b feature/my-new-feature
    - Commit your changes: git commit -am 'Add some feature'
    - Push to the branch: git push origin feature/my-new-feature
    - Submit a pull request

## License
    This project is licensed under the MIT License. See the LICENSE file for details.