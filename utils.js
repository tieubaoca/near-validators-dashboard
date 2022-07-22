const nearApi = window.nearApi
async function getValidators(option) {
  const validators = await window.near.connection.provider.validators()

  if (!option) {
    return validators
  }
  return validators[option]
}

function NearFormat(yocto) {
  Math.floor(
    parseFloat(
      nearApi.utils.format
        .formatNearAmount(yocto)
        .replace(/,/g, ''),
    ),
  )
}

export {
  getValidators, NearFormat
}