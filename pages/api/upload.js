import fs from "fs"; // Filesystem
import { promisify } from "util"; // Promisify fs
import { v4 as uuid } from "uuid"; // UUID generation
import formidable from "formidable"; // Formidable form handling
import { NFTStorage, Blob } from 'nft.storage';

const nftStorageToken = process.env.NFT_STORAGE_TOKEN

// Async readFile operation
const readFileAsync = promisify(fs.readFile);

export default async (req, res) => {
  // Setup incoming form data
  const form = new formidable.IncomingForm({ keepExtensions: true });

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

  // Collect file and metadataJSON from POST request
  const { name, metadata } = data.fields;

  // Collect uploaded media
  const { upload: file } = data.files;
  const fileData = await readFileAsync(file.path);

  // If file, name, and metadata provided
  if (fileData && name && metadata) {
    const client = new NFTStorage({ token: nftStorageToken })
    let cid = await client.storeBlob( new Blob([fileData]))
    //let cid = await client.storeDirectory(data.files)
    const fileUrl = `https://${cid}.ipfs.dweb.link`;
    //console.log("fileUrl: ", fileUrl);
    //let status = await client.status(cid)
    //console.log("File Status: ", status)

    cid = await client.storeBlob( new Blob([metadata]))
    const metadataUrl = `https://${cid}.ipfs.dweb.link`;

    // Return fileUrl and metadataUrl
    res.send({ fileUrl, metadataUrl });
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
