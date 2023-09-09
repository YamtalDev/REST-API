import config from 'config';
import routes from './routes';
import express from 'express';
import log from './utils/logger';
import connect from './utils/connect';
import deserializeUser from './middleware/deserializeUser';

const port = config.get<number>("port");
const host = config.get("host") as string;

const app = express();
app.use(express.json());
app.use(deserializeUser);
app.use(express.urlencoded({extended: false}));

app.listen(port, host, async () =>
{
    log.info(`Server running at http://${host}:${port}`);
    await connect();
    routes(app);
});
