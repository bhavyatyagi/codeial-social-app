const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
// if log logDirectory doesnt exist then create it 
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'UGfNKox1Gwxc8QS5YiF7wuGAiICoW4VB',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail@.com',
        port: 587,
        secure: false,
        auth: {
            user: 'bhavyatyagi4@gmail.com',
            pass: '96879687'
        }
    },
    google_client_id: "966945793134-5etncgjor1ok8bkvpb2tqr4q8f2otlq7.apps.googleusercontent.com",
    google_client_secret: "wem0moYdOHR7rvHl76e3dxfs",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'CWHvZT3fpuDRyR8CKNiitBTz0IJWMINr',
    morgan: {
        mode: 'dev',
        options: { stream: accessLogStream }
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_KEY,
    db: 'codeial_production',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail@.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
}
// module.exports = development;
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);