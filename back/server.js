import app from './src/app.js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
