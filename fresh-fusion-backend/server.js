const app = require('./app');
const config = require('./config');

const port = config.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
