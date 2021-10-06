//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.8;
pragma experimental ABIEncoderV2;

contract CommunityDAO {

    string public communityName = "BlueRidge";

    constructor() public {

    }


    function getCommunityName() public view returns (string memory name)
    {
       return communityName;
    }

    

}