import sqlite3

# Connect to the database
conn = sqlite3.connect('attendance.db')
cursor = conn.cursor()

# Fetch all rows from the attendance table
cursor.execute("SELECT * FROM attendance")
rows = cursor.fetchall()

# Print the records
print("Attendance Records:")
for row in rows:
    print(row)

conn.close()