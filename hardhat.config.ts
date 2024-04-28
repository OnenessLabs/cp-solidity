import '@typechain/hardhat'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-change-network'
import '@openzeppelin/hardhat-upgrades'
import "@nomicfoundation/hardhat-verify"
import dotenv from 'dotenv'
import { HardhatPluginError } from 'hardhat/plugins'

import { task } from 'hardhat/config'
import config from './config.json'


import "hardhat-abi-exporter"

dotenv.config()

function accounts(){
  const privatekey = process.env.PrivateKey
  return privatekey?[privatekey]:{
    mnemonic: 'test test test test test test test test test test test junk',
  }
}



task('deploy', 'Deploy CP,SBT')
  .addParam('networkid', 'network id', '')
  .addParam('name', 'contractName', '')
  .addParam('minter', 'minter address', '')
  .addParam('proxy', 'proxy address', '')
  .addParam('cp', 'cp address', '')
  .addParam('sbt', 'sbt address', '')
  .addParam('upgradable', 'isupgrade', '')
  .setAction(async taskArgs => {
    const deployContract = require('./scripts/deploy')
    await deployContract(taskArgs.networkid,taskArgs.name,taskArgs.minter,taskArgs.proxy,taskArgs.upgradable,taskArgs.cp,taskArgs.sbt)
  })

  task('transfer', 'transfer CPT')
  .addParam('networkid', 'network id', '')
  .addParam('to', 'to address', '')
  .addParam('proxy', 'proxy address', '')
  .addParam('amount', 'transfer token amount', '')
  .setAction(async taskArgs => {
    const transfer = require('./scripts/transfer')
    await transfer(taskArgs.networkid,taskArgs.proxy,taskArgs.to,taskArgs.amount)
  })

  task('claim', 'claim SBT')
  .addParam('networkid', 'network id', '')
  .addParam('to', 'to address', '')
  .addParam('proxy', 'proxy address', '')
  .setAction(async taskArgs => {
    const claim = require('./scripts/claim721')
    await claim(taskArgs.networkid,taskArgs.proxy,taskArgs.to)
  })


export default {
  solidity: {
    version: config.compilers.solc,
    settings: {
      optimizer: config.compilers.optimizer,
      evmVersion: config.compilers.evmVersion,
      viaIR: true,
      metadata: {
        // do not include the metadata hash, since this is machine dependent
        // and we want all generated code to be deterministic
        // https://docs.soliditylang.org/en/v0.7.6/metadata.html
        bytecodeHash: 'none',
      },
    },
  },

  defaultNetwork: 'hardhat',
  networks: {
    onetestnet: {
      url: "https://rpc.devnet.onenesslabs.io",
      accounts: accounts(),
      timeout: 0,
    }
  },

  // abiExporter: {
  //   path: './artifacts/abi',
  //   runOnCompile: true,
  //   clear: true,
  //   flat: true,
  //   spacing: 2,
  //   pretty: false
  // }


}
