import styled from "@emotion/styled";
import Head from "../components/auction/head";
import { PageWrapper } from "../styles/comps";
import { GetStaticProps } from "next";
import Layout from "@components/Layout"; // Layout wrapper

import { AuctionsList } from "../components/auction/AuctionsList";

import {
  FetchStaticData,
  MediaFetchAgent,
  NetworkIDs,
} from "@zoralabs/nft-hooks";

export default function Home({ tokens } : { tokens: any }) {
  return (
    <Layout>
      <IndexWrapper>
        <Head />
        <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
        <AuctionsList tokens={tokens} />
      </IndexWrapper>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );
  // const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
  //   curatorAddress: process.env.NEXT_PUBLIC_CURATORS_ID as string,
  //   collectionAddress: process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS as string,
  //   limit: 1,
  //   offset: 0,
  // });

  const tokens = await FetchStaticData.fetchUserOwnedNFTs(fetchAgent, {
    collectionAddress: process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS as string,
    userAddress: process.env.NEXT_PUBLIC_CURATORS_ID as string,
    limit: 6,
    offset: 0,
  });

  return {
    props: {
      tokens,
    },
    revalidate: 60,
  };
};

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;



