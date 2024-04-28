require('dotenv').config()

module.exports = async function deployContract(networkId,contractName,minterAddress,proxyAddress,isUpgrade,cpAddress,sbtAddress) {
  console.info(networkId,contractName,minterAddress,isUpgrade)
  await hre.changeNetwork(networkId)
  await hre.run('compile')

  const [owner] = await hre.ethers.getSigners();
  console.info(owner.address)
  const contractFactory = await hre.ethers.getContractFactory(contractName,owner);
  // console.info(contractFactory)
  
  let token;
  if(isUpgrade === 'true'){
    token = await upgrades.upgradeProxy(proxyAddress, contractFactory)
  }else{
    if(contractName === 'Airdrop'){
      token = await upgrades.deployProxy(contractFactory,[cpAddress,sbtAddress]);
    }else{
      token = await upgrades.deployProxy(contractFactory,[minterAddress]);
    }

    
  }

  console.log('deploy',contractName, token.address)
  
}
