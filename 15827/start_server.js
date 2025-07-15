const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Library Management System Server...');

// Check if server is already running
const checkServer = async () => {
  try {
    const response = await fetch('http://localhost:5000/');
    if (response.ok) {
      console.log('✅ Server is already running on port 5000');
      return true;
    }
  } catch (error) {
    console.log('❌ Server is not running, starting it now...');
    return false;
  }
};

// Start the server
const startServer = () => {
  const serverProcess = spawn('node', ['index.js'], {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit'
  });

  serverProcess.on('error', (error) => {
    console.error('❌ Failed to start server:', error.message);
  });

  serverProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ Server process exited with code ${code}`);
    }
  });

  console.log('✅ Server process started');
  return serverProcess;
};

// Main execution
const main = async () => {
  const isRunning = await checkServer();
  
  if (!isRunning) {
    const serverProcess = startServer();
    
    // Wait a bit for server to start
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:5000/');
        if (response.ok) {
          console.log('✅ Server is now running successfully!');
          console.log('🌐 You can access the API at: http://localhost:5000');
          console.log('📚 Frontend should be accessible at: http://localhost:3000 (if running)');
        }
      } catch (error) {
        console.log('❌ Server might still be starting up...');
      }
    }, 3000);
  }
};

// Run the main function
main().catch(console.error); 