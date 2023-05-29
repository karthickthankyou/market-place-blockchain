import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const config: HardhatUserConfig = {
  defaultNetwork: 'mumbai',
  networks: {
    hardhat: {},
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [
        '6cdd0b739323281a965268827b51dee2c190021bb0c86edcaa2a1f2883870657',
      ],
    },
  },
  solidity: '0.8.18',
}

export default config
