# Car Rental Website

This is a web application for managing vehicle rentals. It allows users to browse available vehicles, make rental requests, and provides an admin panel for managing vehicles, users, and rental statuses.

## Features
- **User Authentication**: Users can register, log in, and log out securely.
- **Browse Vehicles**: Users can view details of available vehicles, including title, description, price, and status.
- **Rent Vehicles**: Users can request to rent vehicles, with an option for admins to confirm or mark as not rented.
- **Admin Panel**: Administrators have access to a dashboard displaying total users, vehicles, and rentals. They can manage vehicle details, users, and rental statuses.
- **Responsive Design**: The website is designed to be responsive and accessible on various# Car Rental Website

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP (with PDO for database interaction)
- **Database**: MySQL
- **Real-time Updates**: WebSocket (Ratchet), AJAX

## Features
- Real-time vehicle status updates
- Live rental tracking
- Instant availability notifications
- Automatic UI updates

## Setup Instructions

1. Install dependencies:
```bash
composer install
```

2. Start the WebSocket server:
```bash
php websocket-server.php
```

3. Configure your web server (Apache/Nginx) to serve the application

4. Access the application through your web browser

## Real-time Features

### Vehicle Status Updates
- Instant status changes reflection
- Live availability tracking
- Real-time rental notifications

### WebSocket Integration
- Automatic reconnection on disconnection
- Event-based updates
- Efficient data synchronization

### Performance Optimization
- Cached vehicle data
- Optimized database queries
- Efficient real-time communication

## Installation
1. Clone this repository to your local machine.
2. Import the SQL file (`sl_moto.sql`) to set up the database schema.
3. Configure database connection in `Php/Conn.php` file.
4. Open `Home.php` in your web browser to access the website.

## Usage
- As a User:
  - Register or login to the website.
  - Browse available vehicles and view details.
  - Request to rent a vehicle.
- As an Admin:
  - Log in to the admin panel.
  - Manage vehicle details, users, and rental statuses.

## Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues if you encounter any bugs or have suggestions for improvements.

## License
This project is licensed under the [MIT License](LICENSE).

 
