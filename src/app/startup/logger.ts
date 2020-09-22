require('express-async-errors');
const winston = require('winston');

export function logger() {
    console.log('Yes, logger has been called.');
    
    winston.handleExceptions(
        new winston.transports.Console({colorize:true, prettyPrint: true}),
        new winston.transports.File({filename:'uncaughtException.log'})
    );
    process.on('unhandledRejection', (ex) =>{
       throw ex;
    });

    winston.add(winston.transports.File,{filename:'logfile.log'});
}