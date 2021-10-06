const hre = require("hardhat");
const ethers = hre.ethers;
const {getAbi, getCommunityDAOData} = require("./helpers")

async function main() {
    const signer = (await ethers.getSigners())[0]
    //console.log("Signer ", signer);

    //Get ABIs
    const daoAbi = getAbi("CommunityDAO.sol/CommunityDAO.json")
    let data = getCommunityDAOData();
    const communityDAOContractAddress = data["CommunityDAOContractAddress"];
    
    // Load DAO contract
    const dao = new ethers.Contract(communityDAOContractAddress, daoAbi, signer);
    const result = await dao.getCommunityName();
    console.log(' Results: ' + result)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});