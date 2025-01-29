const express = require('express');
const { checkAndSyncDatabase } = require('./models'); 

const app = express();
app.use(express.json());

(async () => {
  try {
    const db = await checkAndSyncDatabase();  
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  } catch (error) {
    console.error('Error during initialization, server not started:', error);
  }
})();
