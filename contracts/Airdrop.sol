// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IToken.sol";

contract AirdropStorage{

    mapping (address => bool) public receiverMap;
    address public cpAddress;
    address public sbtAddress;

}


contract Airdrop is OwnableUpgradeable,AirdropStorage {

     function initialize (address _cpAddress,address _sbtAddress) public initializer {
        cpAddress = _cpAddress;
        sbtAddress = _sbtAddress;
        __Ownable_init();
    }

    function mint(address user,uint256 cpAmount) external{
           IToken cpToken =  IToken(cpAddress);
           IToken sbtToken = IToken(sbtAddress);
           
           require(receiverMap[user]==false,"The user has already minted it");
           
            cpToken.mint(user,cpAmount);
            sbtToken.mint(user);
            receiverMap[user] = true;
           
    }


}