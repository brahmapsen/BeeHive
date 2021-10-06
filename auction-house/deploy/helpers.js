const fs = require("fs");
const hre = require("hardhat");
const ethers = hre.ethers;

const DEFAULT_ARTIFACTS_PATH = "./artifacts/contracts";

function getCommunityDAOData() {
    return JSON.parse(fs.readFileSync("./contract_address.json"))
}

function getAbi(path) {
    return JSON.parse(fs.readFileSync(`${DEFAULT_ARTIFACTS_PATH}/${path}`)).abi
};

module.exports = {getAbi, getCommunityDAOData};
