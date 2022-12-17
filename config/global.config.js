/*

    Global Configuration Variables

*/

/**
 * @newRegister `for who has new Register`
 * @limitAwal `value as Number`
 */
const makeLimitAwal = 40

/**
 * @apikeys
 * Global Apikeys
 */
const MyApikeys = {
  LoLHumanApikeys: "rizzzuchi78apikey",

}
/**
 * MongoDB Atlas
 * @user as Username
 * @key as Passwords
 */
const ATLAS = {
  user: 'rizzzky',
  key: 'PRODS',
}
/**
 * @Database
 * Lists of all databases from mongodb atlas cloud
 */
const ATLAS_DB = {
  azusaDatabase: 'AzusaBot'
}
/**
 * @collections
 * Lists of all colections from mongodb atlas cloud
 */
const ATLAS_COLLECTION = {
  azusaUsers: 'users',
  azusaSticker: 'sticker',
  azusaTotalcmd: 'totalcmd',
  azusaCloud: 'azusa-cloud-data',
  azusaCloudUserStorage: 'user-data-store'
}

module.exports = { MyApikeys, ATLAS, ATLAS_DB, ATLAS_COLLECTION, makeLimitAwal }