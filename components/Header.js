import Link from "next/link"; // Dynamic routing
import { useState } from "react"; // State management
import { web3 } from "@containers/index"; // Global state
import styles from "@styles/components/Header.module.scss"; // Component styles
//import ENS, { getEnsAddress } from '@ensdomains/ensjs';

// Header
export default function Header() {
  const [loading, setLoading] = useState(false); // Loading state
  const [ensName, setEnsName] = useState('community.eth');
  const { address, web3Provider, authenticate } = web3.useContainer(); // Global state
  
  const authenticateWithLoading = async () => {
    setLoading(true); // Toggle loading
    await authenticate(); // Authenticate
    setLoading(false); // Toggle loading
  }

  // const getENSName = async () => {
  //   const ens = new ENS({ web3Provider, ensAddress: getEnsAddress('1') })
  //   var name = await ens.getName(address)
  //   // Check to be sure the reverse record is correct.
  //   if(address != await ens.name(name).getAddress()) {
  //     name = null;
  //   }
  //   setEnsName(name);
  // }

  return (
    <div className={styles.header}>
      {/* Logo */}
      <div className={styles.header__logo}>
        <Link href="/">
          <a>
            <img src="/cert.png" alt="community" />
          </a>
        </Link>
      </div>

      {/* Menu */}
      <div className={styles.header__menu}>
        {address ? (
          // If user is authenticated
          <>
            <Link href={`/profile/${address}`}>
              <a className={styles.header__menu_button_black}><h6><b>
                {"Account " + address.substr(0, 3) + "..." + address.slice(address.length - 3)}
                </b></h6>
              </a>
            </Link>
            <Link href={`/auction`}>
              <a className={styles.header__menu_button_black}><h6><b>Marketplace</b></h6></a>
            </Link>
            <Link href={`/funding`}>
              <a className={styles.header__menu_button_black}><h6><b>Fund</b></h6></a>
            </Link>
            <Link href={`/bio`}>
              <a className={styles.header__menu_button_black}><h6><b>Validate</b></h6></a>
            </Link>
            <Link href={`/create`}>
              <a className={styles.header__menu_button_black}><h6><b>Reward</b></h6></a>
            </Link>
            
            <Link href={`/list`}>
              <a className={styles.header__menu_button_black}><h6><b>Awards</b></h6>
              </a>
            </Link>
          </>
        ) : (
          // Else if user is not authenticated
          <button  className={styles.header__menu_button_black}
            onClick={authenticateWithLoading} disabled={loading}
          >
            {loading ? "Connecting..." : "Connect"}
          </button>
        )}
      </div>

    </div>
  )
  
}
