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
${marks}
`
/**
 * @versionReleases
 */
const versioningBot = {
  globalGroup: 'https://chat.whatsapp.com/GEbLQ62KoWRFZcbRBrQYvd',
  infos
}
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
  azusa: picture[Math.floor(Math.random() * (picture.length))]
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
    zero: 0.1,
    first: 0.5,
    second: 1,
    third: 1.5
  },
  tokens: {
    low: 100,
    mid: 300,
    high: 500,
    expert: 2000
  },
  freqPenalty: {
    optOne: 0.5,
    optTwo: 1
  },
  prePenalty: {
    optOne: 0.5,
    optTwo: 1
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
}
