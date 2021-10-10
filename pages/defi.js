import { useState, useEffect } from "react"; // State management
import { useRouter } from "next/router"; // Router
import Layout from "@components/Layout"; // Layout wrapper
import { web3 } from "@containers/index"; // Web3 container
import styles from "@styles/pages/Create.module.scss"; // Page styles
import Compound from '@compound-finance/compound-js';
import { ethers } from "ethers";
import { providers } from "ethers"; // Ethers


import erc20Abi from "../auction-house/artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";

export default function Defi() {
  const router = useRouter(); // Router navigation

  const network = 'rinkeby';//await web3.eth.net.getNetworkType();
  const [loading, setLoading] = useState(false); // Global loading state
  const [compound, setCompound] = useState(null); //Compound JS
  const [ethBalance, setEthBalance] = useState(0);
  const [cethBalance, setCethBalance] = useState(0);
  const [ethApy, setEthApy] = useState(0);
  const [ethSupply, setEthSupply] = useState(0);
  const [ethRedeem, setEthRedeem] = useState(0);

  // Global state
  const { address, web3Provider, authenticate, mintMedia } = web3.useContainer();

  /**
   * Authenticate dApp with global loading
   */
  const authenticateWithLoading = async () => {
    setLoading(true); // Toggle loading
    await authenticate(); // Authenticate
    setLoading(false); // Toggle loading
  };

//   useEffect(() => {
//     compoundData();
//   }, [cethBalance] );


  const compoundData = async () => {
        console.log('Get compound Data');
        const compound = new Compound(window.ethereum);
        setCompound(compound);
        const provider = new providers.Web3Provider(web3Provider);
        const ethBalance = await Compound.eth.getBalance(address, provider);
        setEthBalance(ethers.utils.formatEther(ethBalance,18));
        console.log('ETH Balance', + ethBalance);

        calculateApy('ETH');
        let cethBalance = 0;
        getTokenBalance(Compound.util.getAddress('cETH', network), address);
  }


  async function calculateApy(asset) {
    let address = Compound.util.getAddress('c' + asset, network);
    const srpb = await Compound.eth.read(
      address,
      'function supplyRatePerBlock() returns (uint256)',
      [],
      { provider: window.ethereum }
    ).catch(console.error);
  
    const mantissa = Math.pow(10, 18);
    const blocksPerDay = parseInt(60 * 60 * 24 / 13.15); // ~13.15 second block time
    const daysPerYear = 365;
  
    const supplyApy = (((Math.pow((+(srpb.toString()) / mantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
    setEthApy(supplyApy.toFixed(2));
  }

  async function getTokenBalance(tokenAddress, accountAddress) {
    let provider = new providers.Web3Provider(web3Provider);
    let contract = new ethers.Contract(
        tokenAddress, 
        erc20Abi.abi, 
        provider.getSigner(0));
    let balance = await contract.balanceOf(accountAddress);
    //console.log()
    setCethBalance(ethers.utils.formatEther(balance,18));
 }
  
 const deposit = async () => {
      console.log('ethSupply:', ethSupply)
      try {
        const trx = await compound.supply('ETH', ethSupply);
        console.log('Transaction Hash', trx.hash);
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    
  }

  async function redeem() {
    if (!isNaN(ethRedeem) && ethRedeem !== 0) {
      try {
        const trx = await compound.redeem('cETH', ethRedeem);
        console.log('Transaction Hash', trx.hash);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    }
  }

  return (
    <Layout>
      {!address ? (
        // If not authenticated, display unauthenticated state
        <div className={styles.create__unauthenticated}>
          <h2>Please authenticate</h2>
          <p>You must authorize before viewing the content.</p>

          {/* Authenticate dApp */}
          <button onClick={authenticateWithLoading} disabled={loading}>
            {loading ? "Connecting..." : "Connect"}
          </button>
        </div>
      ) : (
          
        // Else, if authenticated, display grid
        <div className={styles.create}>
          <div className={styles.create__grid}>
                <div className={styles.create__grid_left}>
                    <a className={styles.bio__logo}> <img src="/compound.png" alt="compound" /> <b>Compound</b></a>
                    <div className={styles.create__upload}>

                        <div>
                            <h3>ETH</h3> 
                            <button onClick={compoundData} className="btn btn-outline-warning">
                                <b>Show current Assets</b>
                            </button>
                        </div>
                        
                        <div>
                            <h5>Compound Protocol ETH APY: {ethApy}% </h5>
                        </div>
                        <div>
                            <input id="ethSupply" type="text" value={ethSupply}
                                onChange={(e) => setEthSupply(e.target.value)}  placeholder="ETH" />
                            <button onClick={deposit} id="eth-supply-button">Deposit</button>
                        </div>
                        <div>
                            <input id="ethRedeem" type="text" value={ethRedeem}
                                onChange={(e) => setEthRedeem(e.target.value)} placeholder="cETH" />
                            <button onClick={redeem} id="eth-redeem-button">Redeem</button>
                        </div>
                </div>
                </div>

                {/* Preview grid section */}
                <div className={styles.create__grid_right}>
                    <h2>Current Assets</h2>
                    <div className={styles.create__upload}>
                         <div>
                            <label>
                                <b> ETH Balance: </b><span id="ethBalance">{ethBalance}</span>
                            </label>
                         <br/>
                            <label>
                                <b>cETH Balance: </b><span id="cethBalance">{cethBalance}</span>
                            </label>
                         </div>
                        
                    </div>
                </div>
          </div>
        </div>
      )}
    </Layout>
  );
}