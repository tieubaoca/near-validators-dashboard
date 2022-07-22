import render from './main.js'
import StakingPool from './stakingPool.js'
import { getValidators } from './utils.js'

const nearApi = window.nearApi
const near = window.near

async function Validators() {
  const element = document.createElement('div')
  element.classList.add('validators')
  element.innerHTML = `
  <h1> Current Validators </h1>
  `

  const current_validators = await getValidators('current_validators')
  const table = document.createElement('table')
  table.innerHTML = `
        <tr>
            <th>Account Id</th>
            <th>Is Slashed</th>
            <th>Expected blocks</th>
            <th>Produced blocks</th>
            <th>Expected chunks</th>
            <th>Produced chunks</th>
            <th>Shards</th>
            <th>Staked</th>
        </tr>
  `
  for (let i = 0; i < current_validators.length; i++) {
    const validatorElement = Validator(current_validators[i])
    table.appendChild(validatorElement)
  }
  element.appendChild(table)
  return element
}

function Validator(validator) {
  const element = document.createElement('tr')
  element.classList.add('validator')
  element.id = validator.account_id
  element.innerHTML = `

            <td>${validator.account_id}</td>
            <td>${validator.is_slashed}</td>
            <td>${validator.num_expected_blocks}</td>
            <td>${validator.num_produced_blocks}</td>
            <td>${validator.num_expected_chunks}</td>
            <td>${validator.num_produced_chunks}</td>
            <td>${validator.shards}</td>
            <td>${Math.floor(
    parseFloat(
      nearApi.utils.format
        .formatNearAmount(validator.stake)
        .replace(/,/g, ''),
    ),
  )}</td>

    `

  element.addEventListener('click', async () => {
    console.log(validator.account_id)
    const contract = new nearApi.Contract(
      window.walletConnection.account(),
      validator.account_id, // contract's account
      {
        viewMethods: ['get_accounts'],
        changeMethods: [],
      },
    )

    const res = await contract.get_accounts({

      from_index: 0,
      limit: 1000

    }).catch(alert)
    console.log(res)
    render(await Delegators(validator.account_id, res))
  })
  return element
}

async function PreviousEpochKickout() {
  const element = document.createElement('div')
  element.classList.add('validators')
  element.innerHTML = `
  <h1> Previous Epoch Kickout Validators </h1>
  `

  const kickoutValidators = await getValidators('prev_epoch_kickout')
  const table = document.createElement('table')
  table.innerHTML = `
          <tr>
              <th>Account Id</th>
              <th>Reason</th>
          </tr>
    `

  for (let i = 0; i < kickoutValidators.length; i++) {
    const validatorElement = KickoutValidator(kickoutValidators[i])
    table.appendChild(validatorElement)
  }
  element.appendChild(table)
  return element
}

function KickoutValidator(validator) {
  const element = document.createElement('tr')
  element.classList.add('validator')
  element.id = validator.account_id

  element.innerHTML = `

              <td>${validator.account_id}</td>
              <td>${JSON.stringify(validator.reason)}</td>


      `
  element.addEventListener('click', async () => {
    console.log(validator.account_id)
    const contract = new nearApi.Contract(
      window.walletConnection.account(),
      validator.account_id, // contract's account
      {
        viewMethods: ['get_accounts'],
        changeMethods: [],
      },
    )

    const res = await contract.get_accounts({

      from_index: 0,
      limit: 1000

    }).catch(alert)
    console.log(res)
    render(await Delegators(validator.account_id, res))
  })
  return element
}

async function NextValidators() {
  const element = document.createElement('div')
  element.classList.add('validators')
  element.innerHTML = `
  <h1> Current Validators </h1>
  `

  const nextValidators = await getValidators('next_validators')
  console.log(nextValidators)
  const table = document.createElement('table')
  table.innerHTML = `
        <tr>
            <th>Account Id</th>
            <th>Shards</th>
            <th>Staked</th>
        </tr>
  `
  for (let i = 0; i < nextValidators.length; i++) {
    const validatorElement = NextValidator(nextValidators[i])
    table.appendChild(validatorElement)
  }
  element.appendChild(table)
  return element
}

function NextValidator(validator) {
  const element = document.createElement('tr')
  element.classList.add('validator')
  element.id = validator.account_id

  element.innerHTML = `

              <td>${validator.account_id}</td>
              <td>${validator.shards}</td>
              <td>${Math.floor(
    parseFloat(
      nearApi.utils.format
        .formatNearAmount(validator.stake)
        .replace(/,/g, ''),
    ),
  )}</td>


      `
  element.addEventListener('click', async () => {
    console.log(validator.account_id)
    const contract = new nearApi.Contract(
      window.walletConnection.account(),
      validator.account_id, // contract's account
      {
        viewMethods: ['get_accounts'],
        changeMethods: [],
      },
    )

    const res = await contract.get_accounts({

      from_index: 0,
      limit: 1000

    }).catch(alert)
    console.log(res)
    render(await Delegators(validator.account_id, res))
  })
  return element
}

async function Delegators(validator, delegators) {


  const element = document.createElement('div')
  element.classList.add('validators')
  element.innerHTML = `
  <h1> ${validator} </h1>
  `

  const table = document.createElement('table')
  table.innerHTML = `
        <tr>
            <th>Account Id</th>
            <th>Can Withdraw</th>
            <th>Staked Balance</th>
            <th>Unstaked Balance</th>
        </tr>
  `
  for (let i = 0; i < delegators.length; i++) {
    const delegatorsElement = Delegator(delegators[i])
    table.appendChild(delegatorsElement)
  }
  element.appendChild(table)
  return element




}

function Delegator(delegator) {
  const element = document.createElement('tr')
  element.classList.add('validator')
  element.id = delegator.account_id
  element.innerHTML = `

            <td>${delegator.account_id}</td>
            <td>${delegator.can_withdraw}</td>
            <td>${Math.floor(
    parseFloat(
      nearApi.utils.format
        .formatNearAmount(delegator.staked_balance)
        .replace(/,/g, ''),
    ),
  )
    }</td>
            <td>${Math.floor(
      parseFloat(
        nearApi.utils.format
          .formatNearAmount(delegator.unstaked_balance)
          .replace(/,/g, ''),
      ),
    )}</td>
</td>`

  return element
}



export { Validators, PreviousEpochKickout, NextValidators }
