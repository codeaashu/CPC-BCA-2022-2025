# Borrow Buddy

Borrow Buddy is a full-stack application for renting and lending products. It features a React frontend and a Node.js/Express backend with MongoDB.

## Project Structure

- `client/` – React frontend
- `server/` – Node.js/Express backend

## Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or cloud)
- Cloudinary account (for image uploads)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Borrow-Buddy
```

### 2. Environment Variables
Create a `.env` file in the `server/` directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000 # or any port you prefer
```
**Do not commit your `.env` file.**

### 3. Install Dependencies
#### Client
```bash
cd client
npm install
```
#### Server
```bash
cd ../server
npm install
```

### 4. Running the Application
#### Start the server
```bash
cd server
npm run dev
```
#### Start the client
Open a new terminal:
```bash
cd client
npm start
```

The client will run on [http://localhost:3000](http://localhost:3000) and the server on [http://localhost:5000](http://localhost:5000) by default.

## Testing
- Client: `npm test` in the `client/` directory
- Server: Manual testing via API endpoints (consider adding automated tests)

## Additional Notes
- Ensure MongoDB and Cloudinary credentials are correct.
- For production, review security and deployment best practices. 