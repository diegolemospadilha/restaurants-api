require('dotenv').config()
import { app } from './app'

app.listen(process.env.PORT || 3333, process.env.HOST || '0.0.0.0');
console.log('Server running in port 3333');