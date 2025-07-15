import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js";

process.setMaxListeners(15); // Increase max listeners to prevent warning

// Database connection
dbConnection()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MONGODB connection FAILED!", error);
        process.exit(1);
    });

