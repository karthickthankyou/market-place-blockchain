import { Injectable } from '@nestjs/common'
import Web3 from 'web3'

import { AbiItem } from 'web3-utils'
import { abi } from 'src/util/abi'

@Injectable()
export class BlockchainService {
  private readonly web3: Web3
  private readonly contract: any // Replace with your contract type

  constructor() {
    this.web3 = new Web3(process.env.WSS_URL)

    this.contract = new this.web3.eth.Contract(
      abi as AbiItem[],
      process.env.CONTRACT_ADDRESS,
    )

    this.eventProductRegistered()
    this.eventUserRegistered()
  }
  private eventProductRegistered() {
    this.contract.events
      .ProductRegistered({
        fromBlock: 'latest',
      })
      .on('data', async (event) => {
        console.log('2. Event. Product registered: ', event)
        const { name, description, id, images, quantity, price } =
          event.returnValues
        console.log(
          'Listening ',
          name,
          description,
          event.returnValues,
          id,
          images,
          quantity,
          price,
        )
      })
      .on('changed', (changed) => console.log(changed))
      .on('error', (err) => console.error(err))
      .on('connected', (str) =>
        console.log('ProductRegistered. Connected: ', str),
      )
  }
  private eventUserRegistered() {
    this.contract.events
      .UserRegistered(
        {
          fromBlock: 'latest',
        },
        (error, event) => {
          console.log('Event. UserRegistered: ', event.returnValues, error)
          // Add your logic here
        },
      )
      .on('data', (event) => console.log(event))
      .on('changed', (changed) => console.log(changed))
      .on('error', (err) => console.error(err))
      .on('connected', (str) => console.log('UserRegistered connected.', str))
  }
}
