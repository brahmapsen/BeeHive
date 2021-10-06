import { task, HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-typechain";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";

const MAINNET_PROVIDER_URL = process.env.MAINNET_PROVIDER_URL || "";
const GOERLI_PROVIDER_URL = process.env.GOERLI_PROVIDER_URL || "";
const RINKEBY_PROVIDER_URL = process.env.RINKEBY_PROVIDER_URL || "";
const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "0000000000000000000000000000000000000000000000000000000000000000";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {version: '0.6.8'},
      {
        version: "0.7.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
    ],
  },
  mocha: { timeout: 0 },
  networks: {
    goerli: {
      url: `${GOERLI_PROVIDER_URL}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    rinkeby: {
      url: `${RINKEBY_PROVIDER_URL}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mainnet: {
      url: `${MAINNET_PROVIDER_URL}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    hardhat: {
      forking: {
      url: `${MAINNET_PROVIDER_URL}`
      },
    },
  },
};

export default config;

// export default {
//   solidity: "0.6.8",
// };