import 'dotenv/config'
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { insert } from '../lib/database';
//import spreadsheet from "../lib/spreadsheet";
//import NodeRSA from 'node-rsa';
const NodeRSA = require('node-rsa');

function decrypt(encryptedData, privateKey){
  //const rsa = new NodeRSA(privateKey, "private", { encryptionScheme:"pkcs1", padding: 1 });
  const rsa = new NodeRSA(privateKey, "private", { encryptionScheme:"pkcs1", padding: 1 });
  //rsa.setOptions({ encryptionScheme: { scheme: "pkcs1", padding: 1 } });
  //rsa.setOptions({ environment:"browser" });
  const decryptedData = rsa.decrypt(encryptedData, "utf8");
  return {
    data: JSON.parse(decryptedData)
  };
}

export async function Payments(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http functional processed request for url "${request.url}"`);
    context.log(`Environemtn variable ${process.env.OPAY_MERCHANT_PRIVATE_KEY}`);
    //const name = request.query.get('name') || await request.text() || 'world';

    const encryptedData = 'g9tOqQtnskoq7ekC/DygnXArboo2OTV46RSoDHrA1+Do6HqnP834KtDccUTncqdW+9XWQdVQ8SvDUfnnxDrP47rANo4DIA7KFxEHYzC5szyLIsqGNgXcLoKkbmG1XISXr/fuozJliul47spiC/q/VVa4BT0RaAGTgqTTAsvpnFUHntPcRumiGB+OYMmbvX3J0I92lUcCjGrrMc27PGgQORwLIxm0L/DeWXP/VC6X4FOJ3N1H9cZUJIMoftS89Dl8Vay+JwpqSW1uLukQIBMwo69tgN+Qodu20mBMcmPaADEx5ll02cBBsu85HLOp8eocR824Cg1nxlvPx76YJc78DFdWD+nCJYimGogTbJcuDs3Un8nRg8pIKCoHwLRl6lDeWJwkJiwdJA5M9A6pZPzIJ5bK9pGytYjeXy0Xjt9j/+FON9rdpoCM466cAzl9swhCCHVj7UjYPbOX3S3y35jCf7DhNnwtspMP1j1Wso8iyNOHUSr+L54MrqB1/JyGvygpBoMIv0Yk55eHGDvdc2FUsch+Gmu+qLIXiSPqxev/K6Ej71e7FtIsADR71G0OOdonZkbLw8vQf7bsPujB3LIeiIvlPiRpSH1zG3UBC3X9Ck4x7QewgoZZUiteVxsjIOuUKfy8wYinhBjwxRHs/yeEt9f80Pr1xcW9kQkkOwznHnonyeDOTu7K9eRYZI7bca9dYHUZA2cXsSCna9syz/bs3zafAlVzMmmpB+wD50K6qtlVbEifg2jXXo9MR9CHEZlEv1kb78oTkWILjMVeasK4KF4qlmKms6YMTx0pgSiwG01Re9PG/NhhryKP8o/m90UQepKXsWVSwFG0G6qYhrafvX6XioCvAiLjXHOgV5uzXnaZShF+lg6Bpyo/k84rAHKFiDqHr2//4vBK8FMLtXypTG+caD7E8zn9MP6RAXmfQm9uUMDepkeeOUqQqxXQAcyLKcgovmUbQ5cs7WjqfbIiUSrVBgldvqBiCAhPoRAkGgmsMZPjGGmbCN1G1viKP+zQ';
    const doc = { 
        encryptedData,
        created: new Date().toString()
    };
    //const merchantPrivateKey = process.env.OPAY_MERCHANT_PRIVATE_KEY.replace(/\\n/g, '\n');
    //const { data } = decrypt(encryptedData, merchantPrivateKey);
    //context.log('Decrypted data:', data);

    // Inserting into mongo db
    const result = await insert("paynotifications", doc);
    context.log('result of mongo insert', result);

    // Insert into payment notficiation sheet
    //const newValues = [new Date().toISOString(), 'jomeno testing'];
    //const result = await spreadsheet.insert("1JUyYCV9cn2icAvSPuLHP-Ju7OEJ5p5p07kAWJPs9x58", "Pay Notifications", newValues);

    return { body: `ok` };
};

app.http('Payments', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: Payments
});
