import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import Layout from "@components/Layout"; // Layout

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
            <title>BeeHive Community</title>
            <meta name="description" content="A Decentralized application" />
            <link rel="icon" href="/beehive.jpeg" />
        </Head>
        <main className={styles.main}>
            <h2 className={styles.title}>
               <a href="http://localhost:3000">BeeHive - a community for public good</a>
            </h2>
            <p className={styles.description}>
              Build a community with funding for Impactful activities {' '}
              <code className={styles.code}>add certificate of achievements</code>
            </p>

            <div className={styles.grid}>
              <a href="http://localhost:3000/create" className={styles.card}>
                <h4>Rewards for good work done &rarr;</h4>
              </a>
              <a href="http://localhost:3000/bio" className={styles.card}>
                <h4>Validate Achievements &rarr;</h4>
              </a>
              <a href="http://localhost:3000/mktplace" className={styles.card}>
                <h4>Marketplace to auction NFTs&rarr;</h4>
              </a>
              <a href="http://localhost:3000/funding"  className={styles.card}  >
                <h4>Funding & Growth with DeFi &rarr;</h4>
              </a>
            </div>
        </main>

        <footer className={styles.footer}>
            <a href="http://localhost:3000/"  target="_blank"  rel="noopener noreferrer"  >
              Powered by{' '}
              <span className={styles.logo}>
                <Image src="/superfluid.png" alt="Superfluid" width={180} height={46}/>
                <Image src="/zora.png" alt="ZORA" width={82} height={46}/>
                <Image src="/compound.png" alt="ZORA" width={82} height={46}/>&nbsp;&nbsp;
                <Image src="/chainlink.jpeg" alt="ZORA" width={82} height={46}/>&nbsp;&nbsp;
                <Image src="/nft-storage.jpeg" alt="IPFS Filecoin NFT.Storage" width={72} height={46}/>
                &nbsp;&nbsp;
                <Image src="/ipfs.png" alt="ENS" width={62} height={46}/>  &nbsp;&nbsp;
                <Image src="/ens.png" alt="ENS" width={62} height={46}/> 
                <Image src="/ceramic.png" alt="Ceramics" width={82} height={46}/>
                
              </span>
            </a>
        </footer>

      </div>
    </Layout>
  )
}
