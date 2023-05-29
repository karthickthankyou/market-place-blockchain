import { ethers } from 'hardhat'
import fs from 'fs'
import path from 'path'

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  const unlockTime = currentTimestampInSeconds + 60

  const lockedAmount = ethers.utils.parseEther('0.001')

  const SupplyChain = await ethers.getContractFactory('SupplyChain')
  const supplyChain = await SupplyChain.deploy()

  await supplyChain.deployed()

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount,
    )}ETH and unlock timestamp ${unlockTime} deployed to ${
      supplyChain.address
    }`,
  )

  fs.writeFileSync(
    path.join(__dirname, 'contractAddress.txt'),
    supplyChain.address,
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
