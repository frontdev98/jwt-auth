const express = require('express');
require('dotenv').config();
const { logger } = require('./logger');

const connHandler = require('./middlewares/connection');
const errHandler  = require('./middlewares/appError');

const authRouter = require('./routers/authRouter');

async function App() {
    try {
        const app = express();

        // use json format for requests and responses
        app.use(express.json());

        // authentication router
        app.use('/auth', authRouter);

        // show each connection to the server
        app.use(connHandler);

        // application error handler
        app.use(errHandler);

        app.listen(process.env.PORT, () => {
            logger.log({
                level: 'info',
                message: `Server starts on ${process.env.PORT}`
            });
        });

    } catch (err) {
        logger.log({
            level: 'error',
            message: err.messsage
        });
    }
}

App();