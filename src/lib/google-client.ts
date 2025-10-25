import { google } from "googleapis"

export function getGoogle(){
    return google;
}
const options = { 
    email: process.env.CLIENT_EMAIL,
    key: process.env.PRIVATE_KEY,
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