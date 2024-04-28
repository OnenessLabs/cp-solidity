require('dotenv').config()

module.exports = async function transfer(networkId,proxyAddress,toAddress,amount) {
  console.info(networkId,proxyAddress,amount)
  await hre.changeNetwork(networkId)
  await hre.run('compile')

  const [owner] = await hre.ethers.getSigners();
  console.info(owner.address)
  const contract = await ethers.getContractAt("OUsd", proxyAddress)
  // console.info(contractFactory)
  const approveAmount = hre.ethers.utils.parseUnits('100000000',18)
  await contract.approve(owner.address,approveAmount)
  const _amount = hre.ethers.utils.parseUnits(amount,18)
  console.info("transfer amount:",_amount)
  await (await contract.mint(toAddress,_amount)).wait()

  const balance = await contract.balanceOf(toAddress)
  console.info(toAddress,"balance:",balance)
  
}
