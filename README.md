# Zaptalk

Zaptalk is a real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Socket.IO for real-time communication.

## Features

- One-to-one real-time messaging
- Emoticon support in chat
- Secure and reliable communication
- User authentication (optional)
- User-friendly interface

## Tech Stack

- **Client**: React.js, Socket.IO, HTML, CSS, JavaScript
- **Server**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB
- **Real-time communication**: Socket.IO

## Prerequisites

Make sure you have the following installed:

- **Node.js** v14+ (for running the client and server)
- **MongoDB** (for the database)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/zaptalk.git
    cd zaptalk
    ```

2. Install dependencies for both client and server:

    **Server**:
    ```bash
    cd server
    npm install
    ```

    **Client**:
    ```bash
    cd ../client
    npm install
    ```

3. Create a `.env` file in the `server` folder and configure the environment variables:

    ```
    MONGO_URI=<your-mongodb-uri>
    PORT=5000
    ```

4. Run the server and client:

    **Server**:
    ```bash
    cd server
    npm run start
    ```

    **Client**:
    ```bash
    cd ../client
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.

2. Enter the chat room and start messaging in real-time. Each message is transmitted instantly using Socket.IO.

## License

This project is licensed under the MIT License.
