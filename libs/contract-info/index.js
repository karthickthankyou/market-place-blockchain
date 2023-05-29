const path = require('path')
const fs = require('fs')

// Define the path to the artifact file
const artifactPath = path.resolve(
  __dirname,
  '../../apps/smart-contract/artifacts/contracts/SupplyChain.sol/SupplyChain.json',
)

// Read the file and parse the JSON
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf-8'))
const contractAddress = fs.readFileSync(
  path.join(__dirname, '../../apps/smart-contract/scripts/contractAddress.txt'),
  'utf-8',
)

// Export the ABI
module.exports.contractAbi = artifact.abi
module.exports.contractAddress = contractAddress
