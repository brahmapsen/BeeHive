const hre = require("hardhat");
const fs = require("fs");

async function main() {
//   [signer] = await ethers.getSigners();
//   console.log(`Deploying contracts using ${signer.address}`);

   let data = JSON.parse(fs.readFileSync("./contract_address.json"));
   console.log('parse ');
//   const bytecodeHash = ethers.utils.solidityKeccak256(["bytes"], [data.trancheBytecode],{ gasLimit : 10});
//   const balVault = data.balancerVault;
//   const trancheFactory = data.trancheFactory;

  const DAO = await hre.ethers.getContractFactory("CommunityDAO");
  const dao_contract = await DAO.deploy();
  await dao_contract.deployed();
  console.log("Community DAO deployed to:", dao_contract.address);

   //data["yieldTokenCompoundingAddress"] = ytc_contract;
   data["CommunityDAOContractAddress"] = dao_contract.address;
   fs.writeFileSync("./contract_address.json", JSON.stringify(data, null, 2));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
