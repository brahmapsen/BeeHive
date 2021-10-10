import { useState, useEffect } from "react"; // State management
import Layout from "@components/Layout"; // Layout wrapper
import { web3 } from "@containers/index"; // Web3 container
import styles from "@styles/pages/Create.module.scss"; // Page styles
import { useRouter } from "next/router"; // Router 
import axios from "axios"; // axios requests

import Progressbar from "@components/Progress_bar";

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

//const twitterUID = process.env.TWITTER_ID;

export default function bio() {
  const {  address, ensName,web3Provider } = web3.useContainer();
  const router = useRouter(); // Router navigation
  // Global state
  const [modal, setModal] = useState(null); //Web3Modal
  const [ceramic, setCeramic] = useState(null);
  const [userIDX, setUserIDX] = useState(null);
  const [userDID, setUserDID] = useState('');
  const [oDID, setODID] = useState(null);  //object DID

  const [authorName, setAuthorName] = useState('');
  const [approval, setApproval] = useState(null);
  const [rating, setRating] = useState(null);
  const [profileMessage, setProfileMessage] = useState(null)
  const [twitterMention, setTwitterMention] = useState(false);
  
  // useEffect(() => {
  //   socialWebData();
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

  const socialWebData = async () => {
    await axios.post("/api/tweet", { id: '0'})
        .then( (response) => {
            console.log("Response:", response);
            const _data = response.data.data;
            _data.map( (row) => { 
              row.text == address ? setTwitterMention(true) : '';
            })
    });
  }

  return (
    <Layout>
      <div>
        <div>
            <h1>Reputation Index</h1>
             {twitterMention && <Progressbar bgcolor="orange" progress='55'  height={20} />}
        </div>
        <br/>
        <div className={styles.bio__logo}>
          <label htmlFor="userDid"><b>User DID </b></label>  &nbsp;&nbsp;
          <input id="userDid" size="75" type="text" value={userDID} disabled/>
          <a> <img src="/ceramic.png" alt="ceramics" /> ceramics</a>
        </div>
        <div className={styles.bio__logo}>
          <label htmlFor="ENS"><b>ENS Registration </b></label> &nbsp;&nbsp;
          <input id="ENS Name" type="text" value={ensName} disabled/>
          <a> <img src="/ens.png" alt="ens" /></a>
        </div>
        <div className={styles.bio__logo}>
          <label htmlFor="Twitter"><b>Twitter Mention </b></label> &nbsp;&nbsp;
          <input id="twitter-ch" type="checkbox" checked={twitterMention} disabled/>
          <a> <img src="/twitter.jpeg" alt="twitter" /> Twitter</a>
        </div>
        
        <div>
        <label htmlFor="profileMessage"><h4>{profileMessage}</h4> </label>  &nbsp;&nbsp;
        </div>
        <br/>
        <div>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <button onClick={socialWebData} className="btn btn-outline-warning">
            <b>Social Web Profile</b>
          </button>  &nbsp;&nbsp;
          <button onClick={IDConnect} className="btn btn-outline-warning">
            <b>Show Profile</b>
          </button>
        </div>
        
      </div>
    </Layout>
  );

}
