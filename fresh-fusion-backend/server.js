const app = require('./app');
const config = require('./utils/config');
const cors = require('cors');

app.use(cors({
  origin: [
    'https://lachesism0609.github.io',
    'http://localhost:3000', 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const port = config.PORT || 5000;

// Server Listen
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

