/*

    Global Configuration Variables

*/
let marks = '```'
let infos = `
${marks}
Shirasu Azusa @WhatsAppBot

Version: v4.0
Deploy: 22 Dec 2022

Server: VPS Client
Monitored: PM2 IO
AutoRestart: Yes


Open Group Azusa Bot:
https://chat.whatsapp.com/GEbLQ62KoWRFZcbRBrQYvd
anyone can join & discuss
${marks}
`
/**
 * @versionReleases
 */
const versioningBot = {
  globalGroup: 'https://chat.whatsapp.com/GEbLQ62KoWRFZcbRBrQYvd',
  infos
};
/**
 * @newRegister `for who has new Register`
 * @limitAwal `value as Number`
 */
const makeLimitAwal = 50

/**
 * @apikeys
 * Global Apikeys
 */
const MyApikeys = {
  LoLHumanApikeys: "rizzzuchi78apikey",
  OpenAi: "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"
};
/**
 * @interface
 * @menu
 */
const interfaces = {
  upper: '┏━',
  side: '┃',
  lower: '┗━',
  marker: '⌬'
};
let picture = [
  'https://raw.githubusercontent.com/rizzzky78/rizzzkyRepo/main/picture/img-azusa-main.jpeg',
  'https://raw.githubusercontent.com/rizzzky78/rizzzkyRepo/main/picture/img-azusa-secondary.jpeg'
]
const imgPlaceholder = {
  azusa: picture[Math.floor(Math.random() * (picture.length))],
  saweria: 'https://raw.githubusercontent.com/rizzzky78/rizzzkyRepo/main/shoujoBot1.0/qrcode-saweria.png'
};
/**
 * MongoDB Atlas
 * @user as Username
 * @key as Passwords
 */
const ATLAS = {
  user: 'rizzzky',
  key: 'PRODS',
};
/**
 * @Database
 * Lists of all databases from mongodb atlas cloud
 */
const ATLAS_DB = {
  azusaDatabase: 'AzusaBot'
};
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
};
/**
 * @openAi
 * @settings
 */
const OpenAiConfig = {
  model: {
    davinci: "text-davinci-003",
    curie: "text-curie-001",
    babbage: "text-babbage-001",
    ada: "text-ada-001"
  },
  temperature: {
    zero: 0.3,
    first: 0.5,
    second: 0.7,
    third: 1
  },
  tokens: {
    low: 500,
    mid: 700,
    high: 1800,
    expert: 4000
  },
  freqPenalty: {
    optOne: 0.7,
    optTwo: 0.2
  },
  prePenalty: {
    optOne: 0.8,
    optTwo: 1.5
  }
};

module.exports = {
  versioningBot,
  MyApikeys,
  ATLAS,
  ATLAS_DB,
  ATLAS_COLLECTION,
  OpenAiConfig,
  makeLimitAwal,
  interfaces,
  imgPlaceholder
};
