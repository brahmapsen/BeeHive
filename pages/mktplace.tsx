import * as React from 'react';
import { useState, useEffect } from "react"; // State management
import Layout from "@components/Layout"; // Layout wrapper
import { web3 } from "@containers/index"; // Web3 container
import styles from "@styles/pages/Create.module.scss"; // Page styles
import { useRouter } from "next/router"; // Router
import Image from 'next/image';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Fade from 'react-bootstrap/Fade';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { createMarketplace } from "../auction/test/createMarket";
//import { BsQuestionCircle } from 'react-icons/bs';

export default function MarketPlace() {
  const {  address, web3Provider } = web3.useContainer();
  const router = useRouter(); // Router navigation
  const [auctionMessage, setAuctionMessage] = useState("");
  // Global state
  
  // useEffect(() => {
  //   IDConnect();
  // }, [] );

  const IDConnect = async () => {

  }

  const createMarket = async () => {
    console.log('Create Auction Market');
    alert('Create MArket');
    const auctionHouse =  await createMarketplace();
    
  }

  return (
    <Layout>
        <Container>
          <Row className="my-5">
            <Card>
              <Card.Body>
              <div className={styles.bio__logo}>
                <a> <Image src="/auction.jpg" alt="DID" width="300" height="200" /> <h2>Certificate NFT Auction</h2></a>
              </div>
                <Form>
                  <Form.Group>
                    <Form.Label className="text-muted small">Reputation Index</Form.Label>
                    <Form.Control type="text" disabled value={"rating"} />
                  </Form.Group>
                  <Button onClick={createMarket} variant="primary" block size="lg" >
                    🕵🏻‍♂️ Create Auction Market
                  </Button>
              </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
    </Layout>
  );

}
