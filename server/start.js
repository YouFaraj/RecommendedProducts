const app = require('./index.js');
const PORT = 3003;
require('newrelic');

app.listen(PORT, () => {
  console.log('running on port', PORT);
});
