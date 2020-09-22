import express, {Application} from 'express';
const cors = require('cors'),
bodyParser = require('body-parser');

const config = require('config');

export function init_configs (app: Application) {
    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not set.');        
    }
    if(!config.get('DB_HOST')){
        throw new Error('FATAL ERROR: DB_HOST is not set.');
    }
    app.use(express.json());
    //app.use(express.body)
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    
}
