import express, {Application, Request, Response, NextFunction} from 'express';
import {boostrap} from './startup/bootstrap';
const app: Application = express();

boostrap(app);
const port = process.env.PORT||5000;
app.listen(port, () => console.log('Server running ...@'+ port));
