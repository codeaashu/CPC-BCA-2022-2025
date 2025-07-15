#!/bin/bash

# Create the database
psql -U postgres -c "CREATE DATABASE password_saver;"

# Run Prisma migrations
npx prisma migrate dev --name init 