-- Fix database schema for the new rental system
-- Run this in phpMyAdmin or MySQL command line

USE sl_moto;

-- Add missing columns to Rentals table
ALTER TABLE Rentals 
ADD COLUMN IF NOT EXISTS start_date DATE NOT NULL DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS end_date DATE NOT NULL DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS customer_name VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS customer_phone VARCHAR(15) NOT NULL DEFAULT '';

-- Add missing columns to Payments table
ALTER TABLE Payments 
ADD COLUMN IF NOT EXISTS rental_id INT NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS transaction_id VARCHAR(100) NULL,
ADD COLUMN IF NOT EXISTS receipt_file VARCHAR(255) NULL;

-- Add Status column to Vehicles table if it doesn't exist
ALTER TABLE Vehicles 
ADD COLUMN IF NOT EXISTS Status VARCHAR(50) DEFAULT 'not rented yet';

-- Update existing records to have valid dates
UPDATE Rentals 
SET start_date = rental_date, 
    end_date = DATE_ADD(rental_date, INTERVAL duration DAY)
WHERE start_date = '0000-00-00' OR end_date = '0000-00-00';

-- Update existing records to have customer information
UPDATE Rentals 
SET customer_name = 'Customer', 
    customer_phone = '0000000000'
WHERE customer_name = '' OR customer_phone = '';

-- Show the updated table structures
DESCRIBE Rentals;
DESCRIBE Payments;
DESCRIBE Vehicles; 