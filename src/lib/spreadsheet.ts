import { getGoogle, getGoogleClient } from "./google-client"

const insert = (spreadsheetId: string, sheetRange:string = 'Sheet1', sheetValues:string[]) => {
    
    if(sheetValues){
        const google = getGoogle()
        const client = getGoogleClient()

        //try{
            client.authorize().then(async () => {
                const sheetApi = google.sheets({version: 'v4', auth: client})
                //const spreadsheetId = '1Qk0-nXR-eZDSQiKHONx_DCWtsTJTlj8a7ZH9AuB555A'
                //const sheetRange = 'Sheet1';
                const values = [ sheetValues ]; //[['user.email', 'user.name']];
                const requestBody = { values };
                const valueInputOption = 'RAW';

                await sheetApi.spreadsheets.values.append({
                    spreadsheetId,
                    range: sheetRange,
                    valueInputOption,
                    requestBody
                  });
                })

                //return true

        //}catch(error){
            //console.log('Error while inserting new values.', error)
            //return false
        //}
    }
    return true;
}

const spreadsheet = { insert }

export default spreadsheet;