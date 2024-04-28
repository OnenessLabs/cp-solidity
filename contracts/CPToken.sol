// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract CPToken is ERC20Upgradeable {

    address private _minter;

    function initialize(address minter) public initializer {
        __ERC20_init("CP Token", "Oneless");
        _minter = minter;
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

    function mint(address account, uint256 amount) external onlyMinter {
        _mint(account, amount);
    }


    modifier onlyMinter() {
        require(_minter == _msgSender() || _minter == tx.origin, "Caller is not the owner");
        _;
    }
}
