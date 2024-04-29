// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;


import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SBTERC721 is ERC721Upgradeable {

    using Counters for Counters.Counter;

    address private _minter;
    Counters.Counter private counter;

    function initialize(address minter) public initializer {
        __ERC721_init("SBT Token", "Oneness");
        _minter = minter;
    }

    function mint(address account) external onlyMinter {
        counter.increment();
        _safeMint(account, counter.current());
    }

     function _beforeTokenTransfer(address from, address to, uint256) pure  internal {
        require(from == address(0) || to == address(0), "It cannot be transferred.");
    }


    modifier onlyMinter() {
        require(_minter == _msgSender() || _minter == tx.origin, "Caller is not the owner");
        _;
    }
}
