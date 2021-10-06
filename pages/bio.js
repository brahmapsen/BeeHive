import { useState, useEffect } from "react"; // State management
import Layout from "@components/Layout"; // Layout wrapper
import { web3 } from "@containers/index"; // Web3 container
import styles from "@styles/pages/Create.module.scss"; // Page styles
import { useRouter } from "next/router"; // Router 

//Ceramic imports
import CeramicClient from '@ceramicnetwork/http-client';
import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { DID } from 'dids';

//3ID connect imports
import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';
//Document creation imports
import { TileDocument } from '@ceramicnetwork/stream-tile';

//IDX
import { IDX } from '@ceramicstudio/idx';
//import type { CeramicApi } from '@ceramicnetwork/common';

const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Reward",
  "type": "object",
  "properties": {
    "title": {"type": "string"},
    "message": {"type": "string"},
    "rating": {"type": "number" }
  },
  "required": ["message", "title"]
}

export default function bio() {
  const {  address, web3Provider } = web3.useContainer();
  const router = useRouter(); // Router navigation
  // Global state
  const [modal, setModal] = useState(null); //Web3Modal
  const [ceramic, setCeramic] = useState(null);
  const [userIDX, setUserIDX] = useState(null);
  const [userDID, setUserDID] = useState(null);
  const [oDID, setODID] = useState(null);  //object DID

  const [authorName, setAuthorName] = useState(null);
  const [approval, setApproval] = useState(null);
  const [rating, setRating] = useState(null);
  const [profileMessage, setProfileMessage] = useState(null)
  
  // useEffect(() => {
  //   IDConnect();
  // }, [] );

  const IDConnect = async () => {

    //const API_URL = "https://localhost:7007";

    const API_URL = 'https://ceramic-clay.3boxlabs.com';
    const ceramic = new CeramicClient(API_URL);
    setCeramic(ceramic);

    const resolver = { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) }
    const did = new DID({ resolver });
    ceramic.did = did;
    
    const threeIdConnect = new ThreeIdConnect();
    const authProvider = new EthereumAuthProvider(web3Provider, address);
    await threeIdConnect.connect(authProvider);

    const didProvider = await threeIdConnect.getDidProvider()
    ceramic.did.setProvider(didProvider);
    await ceramic.did.authenticate();
    console.log("After ceramic.did.authenticate()")
   
    //set user IDX
    const userIDX = new IDX({ ceramic })
    setUserIDX(userIDX);

    const userDID = userIDX.id
    setUserDID(userDID);

    const profile = await userIDX.get('basicProfile', userDID);
    if(!profile){
      setProfileMessage("No profile exist for this user. Please create one.")
    } else {
      setAuthorName(profile.name);
      setApproval(profile.description.split('|')[0]);
      setRating(profile.description.split('|')[1]);
    }

  }

  const createProfile = async () => {
    const metadata = {
      controllers: [ceramic.did.id] // this will set yourself as the controller of the schema
    }
    const rewardSchema = await TileDocument.create(ceramic, schema, metadata);
    const reward = await TileDocument.create(ceramic, {
      title: 'Ceramics',
      message: 'Approved',
      rating: 5
    }, {
      controllers: [ceramic.did.id],
      family: 'Rewards',
      schema: rewardSchema.commitId.toString(),
    })

    //userIDX.set('basicProfile', {name, description})
  }

  return (
    <Layout>
      <div>
        <div className={styles.bio__logo}>
            <a> <img src="/ceramic.png" alt="DID" /> <h2>User Profile</h2></a>
        </div>
        <br/>
        <div>
          <label htmlFor="Author"><b>User DID </b></label>  &nbsp;&nbsp;
          <input id="author" size="75" type="text" value={userDID} disabled/>
        </div>
        <div>
          <label htmlFor="authorName"><b>Name </b></label>  &nbsp;&nbsp;
          <input id="authorName" size="75" type="text" value={authorName} disabled/>
        </div>
        <div>
          <label htmlFor="Approval"><b>Status </b> </label>  &nbsp;&nbsp;
          <input id="approval" type="text" value={"Project Completed"} disabled/>
        </div>
        <div>
          <label htmlFor="Rating"><b>Reputation Index </b></label>  &nbsp;&nbsp;
          <input id="rating" type="text" value={rating} disabled/>
        </div>
        <br/>
        <div>
        <label htmlFor="profileMessage"><h4>{profileMessage}</h4> </label>  &nbsp;&nbsp;
        </div>
        <br/>
        <div>
          &nbsp;&nbsp;
          <button onClick={createProfile} className="btn btn-outline-warning">
            <b>Create/Update Profile</b>
          </button>  &nbsp;&nbsp;
          <button onClick={IDConnect} className="btn btn-outline-warning">
            <b>Show Profile</b>
          </button>
        </div>
        
      </div>
    </Layout>
  );

}
