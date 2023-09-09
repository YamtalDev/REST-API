import config from 'config';
import routes from './routes';
import express from 'express';
import logger from './utils/logger';
import connect from './utils/connect';
import deserializeUser from './middleware/deserializeUser';

const port = config.get<number>("port");

const app = express();
app.use(express.json());
app.use(deserializeUser);
app.use(express.urlencoded({extended: false}));

app.listen(port, async () =>
{
    logger.info(`Server running at http://localhost:${port}`);
    await connect();
    routes(app);
});
