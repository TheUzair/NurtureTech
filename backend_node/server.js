// import dotenv from 'dotenv';
// // import app from './app.js';
// import { server } from './app.js';
// dotenv.config();

// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import dotenv from 'dotenv';
import { server } from './app.js'; // Import server, not app

dotenv.config();



const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
