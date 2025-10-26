import { google } from "googleapis"

export function getGoogle(){
    return google;
}

const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
const options = { 
    email: process.env.CLIENT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
}
export function getGoogleClient(){

    const client = new google.auth.JWT(options);
    return client
}

const goog = { 
    google, 
    googleClient: getGoogleClient() 
};

export default goog;