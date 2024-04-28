// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

interface IToken {
    function ownerOf(uint tokenId) external view returns (address);
    function balanceOf(address owner) external view returns (uint256 balance);
    function mintWithData(address to, uint256 tokenId, bytes calldata _data) external returns (bool);
    function mint(address to, uint256 tokenId) external;
    function mint(address to) external;
    function transferFrom(address from,address to,uint256 tokenId) external;
    function burn(uint256 tokenId) external;
    function totalSupply() external view returns (uint256);
}