export default function getConfig(env, nearApi) {
  switch (env) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        explorerUrl: 'https://explorer.mainnet.near.org',
        deps: { keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore() },
      }
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        deps: { keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore() },
      }
    case 'shardnet':
      return {
        networkId: 'shardnet',
        nodeUrl: 'https://rpc.shardnet.near.org',
        walletUrl: 'https://wallet.shardnet.near.org',
        helperUrl: 'https://helper.shardnet.near.org',
        explorerUrl: 'https://explorer.shardnet.near.org',
        deps: { keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore() },
      }
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in src/config.js.`,
      )
  }
}
