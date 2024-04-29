const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers, network } = require("hardhat");

const bn = ethers.BigNumber.from;

describe("airdrop CPToken", function () {
  let proxy, cpProxy,sbtProxy, airdropProxy;
  let cpToken, nft, c1, c2, r1, r2;
  let owner, alice, addr2;

  before(async function(){
    [owner, alice, addr2, ...addrs] = await ethers.getSigners();
    console.log("owner", owner.address)
    console.log("alice",alice.address)

    
  })

  beforeEach(async function(){
    factory = await ethers.getContractFactory("CPToken")
    cpProxy = await upgrades.deployProxy(factory, [owner.address]);

    factory = await ethers.getContractFactory("SBTERC721")
    sbtProxy = await upgrades.deployProxy(factory, [owner.address]);

    factory = await ethers.getContractFactory("Airdrop")
    airdropProxy = await upgrades.deployProxy(factory, [cpProxy.address,sbtProxy.address]);

    console.info("cpProxy",cpProxy.address)
    console.info("sbtProxy",sbtProxy.address)
    console.info("airdropProxy",airdropProxy.address)
  })

  it("airdrop", async function(){
    const cpAmount = ethers.utils.parseUnits('2',18)
    user = ethers.Wallet.createRandom();
    console.info("user:",user.address)
    await expect(airdropProxy.mint(user.address,cpAmount)).to.be.emit(cpProxy,"Transfer")

    expect(await cpProxy.balanceOf(user.address)).to.be.equal(cpAmount)
    expect(await sbtProxy.ownerOf(BigNumber.from("1"))).to.be.equal(user.address)


    await expect(airdropProxy.mint(user.address,cpAmount)).to.be.revertedWith("The user has already minted it")
    
  })

  it.skip("transferFrom", async function(){
    const totalSupply = ethers.utils.parseUnits('100000000',18)
    await cpProxy.mint(owner.address,totalSupply)
    const t = await cpProxy.totalSupply()
    await cpProxy.approve(owner.address,totalSupply)
    await expect(cpProxy.transferFrom(owner.address,alice.address,ethers.utils.parseUnits('100',18)))
    .to.be.emit(cpProxy,"Transfer")
  
 
  })


  it("non-transfer", async function(){
    await sbtProxy.mint(owner.address)
    expect(await sbtProxy.transferFrom(owner.address,alice.address,BigNumber.from("1"))).to.be.revertedWith("It cannot be transferred.")
  })
});