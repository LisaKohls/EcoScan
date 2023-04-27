import express = require('express')
import { exampleRoutes } from './routes/exampleRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/example', exampleRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;