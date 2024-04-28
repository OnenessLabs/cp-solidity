require('dotenv').config()

module.exports = async function claim721(networkId,proxyAddress,toAddress) {
  console.info(networkId,proxyAddress)
  await hre.changeNetwork(networkId)
  await hre.run('compile')

  const [owner] = await hre.ethers.getSigners();
  console.info(owner.address)
  const contract = await ethers.getContractAt("SBTERC721", proxyAddress)
  // console.info(contractFactory)
  tx = await(await contract.mint(toAddress)).wait()

  let abi = [ "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)" ];
  let iface = new hre.ethers.utils.Interface(abi);
  let log = iface.parseLog(tx.logs[0]);
  // console.info(log.args)
  const {from, to, tokenId} = log.args;

  console.info(from,to,tokenId)
  
}
