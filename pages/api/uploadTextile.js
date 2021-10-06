//uploads files to Filecoin using Textile eth.storage
//import { init, requestSignIn } from "@textile/eth-storage";



import fs from "fs"; // Filesystem
import { promisify } from "util"; // Promisify fs
import { v4 as uuid } from "uuid"; // UUID generation
import formidable from "formidable"; // Formidable form handling
//import fleekStorage from "@fleekhq/fleek-storage-js"; // Fleek storage

// Fleek authentication
// const fleekAuth = {
//   apiKey: process.env.FLEEK_API_KEY,
//   apiSecret: process.env.FLEEK_API_SECRET,
// };

//const eth = require("@textile/eth-storage");

//const { init }  = eth;

//console.log("INIT ----", init);




// Async readFile operation
const readFileAsync = promisify(fs.readFile);

export default async (req, res) => {
  
  // Setup incoming form data
  const form = new formidable.IncomingForm({ keepExtensions: true });

  console.log('FORM ');

  // Collect data from form
  const data = await new Promise((res, rej) => {
    // Parse form data
    form.parse(req, (err, fields, files) => {
      // if error, reject promise
      if (err) return rej(err);
      // Else, return fields and files
      res({ fields, files });
    });
  });

  console.log('DATA ');

  // Collect file and metadataJSON from POST request
  const { name, metadata, signer } = data.fields;

  // Collect uploaded media
  const { upload: file } = data.files;
  const fileData = await readFileAsync(file.path);

  console.log('HAVE MY FILE ');


  //await requestSignIn();
  //await window.ethereum.enable();
  //const provider = new providers.Web3Provider(window.ethereum);
  //const wallet = provider.getSigner();
  //const storage = await init(signer);

  console.log('STORAGE DEFINED ');

  //await storage.addDeposit();

  // If file, name, and metadata provided
  if (fileData && name && metadata) {
    // Upload media to Fleek
    // const { publicUrl: fileUrl } = await fleekStorage.upload({
    //   ...fleekAuth,
    //   key: uuid(),
    //   data: fileData,
    // });

    // // Upload metdata to Fleek
    // const { publicUrl: metadataUrl } = await fleekStorage.upload({
    //   ...fleekAuth,
    //   key: uuid(),
    //   data: metadata,
    // });

    // const { id, cid } = await storage.store(fileData);
    // console.log("ID: " + id + " CID: " + cid);

    // const { request, deals} = await storage.status(id);
    // console.log(request.status_code);
    // console.log([...deals]);


    // // Return fileUrl and metadataUrl
    // res.send({ fileUrl, metadataUrl });
  } else {
    // Else, return 501
    res.status(501);
  }

  // End
  res.end();
};

// Remove bodyParser from endpoint
export const config = {
  api: {
    bodyParser: false,
  },
};
