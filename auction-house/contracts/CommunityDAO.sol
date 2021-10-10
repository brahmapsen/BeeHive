//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.8;
pragma experimental ABIEncoderV2;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract CommunityDAO is ChainlinkClient {
    string public communityName = "BeeHive";
    mapping(address => mapping(string => bool)) public mentionIndex;
    mapping(address => uint256) public reputationIndex;

    using Chainlink for Chainlink.Request;
    uint256 public volume;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() public {
        setPublicChainlinkToken();
        oracle = 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e;
        jobId = "6d1bfe27e7034b1d87b5270556b1727";
        fee = 0.1 * 10**18; // (Varies by network and job)
    }

    function getCommunityName() public view returns (string memory name) {
        return communityName;
    }

    function checkSocialApp(address user, string calldata socialApp) external {
        if (!mentionIndex[user][socialApp]) {
            reputationIndex[user] = reputationIndex[user] + 1;
            mentionIndex[user][socialApp] = true;
        }
    }

    function getSocialApp(address user, string memory socialApp) public view returns(bool status) {
        return mentionIndex[user][socialApp];
    }

    function getReputationIndex(address user) public view returns(uint reputation) {
        return reputationIndex[user];
    }

    function unCheckSocialApp(address user, string calldata socialApp)
        external
    {
        if (!mentionIndex[user][socialApp]) {
            return;
        } else {
            reputationIndex[user] = reputationIndex[user] - 1;
            mentionIndex[user][socialApp] = false;
        }
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestVolumeData() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        // Set the URL to perform the GET request on
        request.add(
            "get",
            "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD"
        );

        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        request.add("path", "RAW.ETH.USD.VOLUME24HOUR");

        // Multiply the result by 1000000000000000000 to remove decimals
        int256 timesAmount = 10**18;
        request.addInt("times", timesAmount);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _volume)
        public
        recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
    }
}
