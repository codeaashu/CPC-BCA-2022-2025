# Password Saver

A secure password manager built with Next.js and PostgreSQL.

## Features

- Add, edit, and delete password entries
- Show/hide passwords
- Copy passwords to clipboard
- Secure storage with PostgreSQL
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL
- Git

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd password-saver
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a PostgreSQL database:

   ```bash
   psql -U postgres -c "CREATE DATABASE password_saver;"
   ```

4. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Update the database connection string in `.env`

5. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

6. Run generate table in database:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

7. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:3000

## Usage

1. Add a new password:

   - Click "Add New Password"
   - Fill in the required fields
   - Click "Save Password"

2. View passwords:

   - All passwords are displayed on the home page
   - Click the eye icon to show/hide passwords
   - Click the copy icon to copy passwords to clipboard

3. Edit a password:

   - Click the edit icon on a password card
   - Update the fields
   - Click "Update Password"

4. Delete a password:
   - Click the delete icon on a password card
   - Confirm the deletion

## Security

- Passwords are stored securely in the database
- Passwords are never displayed by default
- Copy to clipboard functionality is available for convenience
- All operations require confirmation

## Development

- Built with Next.js 14
- Uses Prisma for database operations
- Styled with Tailwind CSS
- TypeScript for type safety

## License

MIT
