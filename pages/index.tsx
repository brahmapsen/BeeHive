import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import Layout from "@components/Layout"; // Layout

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
            <title>Community</title>
            <meta name="description" content="A Decentralized application" />
            <link rel="icon" href="/cert.png" />
        </Head>
        <main className={styles.main}>
            <h2 className={styles.title}>
               <a href="http://localhost:3000">Community - making an Impact!</a>
            </h2>
            <p className={styles.description}>
              Build a community with funding for Impactful activities {' '}
              <code className={styles.code}>add certificates of achievement</code>
            </p>

            <div className={styles.grid}>
              
              <a href="http://localhost:3000/create" className={styles.card}>
                <h2>Rewards for good work done &rarr;</h2>
              </a>
              <a href="http://localhost:3000/bio" className={styles.card}>
                <h4>Validate Achievements &rarr;</h4>
                <p>Digital ID, Personal bio, Reputation index crowd sourced.</p>
              </a>
              <a href="http://localhost:3000/mktplace" className={styles.card}>
                <h2>Marketplace to auction NFTs&rarr;</h2>
              </a>
              <a href="http://localhost:3000/funding"  className={styles.card}  >
                <h4>Fund and Grow &rarr;</h4>
                <p>
                  Funding for the good work and grow with DeFi.
                </p>
              </a>
              <span>
                <Image src="/community.jpg" alt="NFT value creation" width={550} height={400} />
              </span>
            </div>
        </main>

        <footer className={styles.footer}>
            <a href="http://localhost:3000/"  target="_blank"  rel="noopener noreferrer"  >
              Powered by{' '}
              <span className={styles.logo}>
                <Image src="/zora.png" alt="ZORA" width={82} height={46}/>
                <Image src="/nft-storage.jpeg" alt="IPFS Filecoin NFT.Storage" width={72} height={46}/>
                <Image src="/ceramic.png" alt="Ceramics" width={82} height={46}/>
                <Image src="/superfluid.png" alt="Superfluid" width={200} height={46}/>
              </span>
            </a>
        </footer>

      </div>
    </Layout>
  )
}
