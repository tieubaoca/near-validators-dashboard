const nearApi = window.nearApi
export default function StakingPool(account) {
  return new nearApi.Contract(account, methods)
}

const methods = {
  viewMethods: ['get_accounts'],
}
