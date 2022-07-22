import getConfig from './config.js'
import { Validators, PreviousEpochKickout, NextValidators } from './component.js'

const nearApi = window.nearApi

const initContract = async () => {
  window.near = await nearApi.connect(getConfig('shardnet', nearApi))

  window.walletConnection = new nearApi.WalletConnection(window.near)

}

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
  .then(async () => {
    render(await Validators())
    document.querySelector('#current').addEventListener('click', async () => {
      render(await Validators())
    })
    document.querySelector('#kickout').addEventListener('click', async () => {
      render(await PreviousEpochKickout())
    }
    )
    document.querySelector('#next').addEventListener('click', async () => {
      render(await NextValidators())
    })
  })
  .catch(console.error)


export default function render(element) {
  document.querySelector('.body').innerHTML = ''
  document.querySelector('.body').appendChild(element)
}
