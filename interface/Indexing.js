//
const RandomLewd_type1 = ['randomhentai', 'chiisaihentai', 'trap', 'blowjob', 'yaoi', 'ecchi', 'hentai', 'ahegao', 'hololewd', 'sideoppai', 'animefeets', 'animebooty', 'animethighss', 'hentaiparadise', 'animearmpits', 'hentaifemdom', 'lewdanimegirls', 'biganimetiddies', 'animebellybutton', 'hentai4everyone', 'neko', 'waifu', 'loli', 'milf']
const RandomLewd_type2 = ['randomhentai2', 'bj', 'ero', 'cum', 'feet', 'yuri', 'trap', 'lewd', 'feed', 'eron', 'solo', 'gasm', 'poke', 'anal', 'holo', 'tits', 'kuni', 'kiss', 'erok', 'smug', 'baka', 'solog', 'feetg', 'lewdk', 'waifu', 'pussy', 'femdom', 'cuddle', 'hentai', 'eroyuri', 'cum_jpg', 'blowjob', 'erofeet', 'holoero', 'classic', 'erokemo', 'fox_girl', 'futanari', 'lewdkemo', 'wallpaper', 'pussy_jpg', 'kemonomimi', 'nsfw_avatar', 'lewd', 'keta', 'femdom', 'futanari', 'anal']

const MakeCaptionX = []

//randomhentai2
module.exports = { RandomLewd_type1, RandomLewd_type2 }

// send a buttons message with image header!
const buttons = [
  {buttonId: 'id1', buttonText: {displayText: 'Button 1'}, type: 1},
  {buttonId: 'id2', buttonText: {displayText: 'Button 2'}, type: 1},
]
const buttonMessage = {
    image: {url: 'https://example.com/image.jpeg'},
    caption: "Hi it's button message",
    footer: 'Hello World',
    buttons: buttons,
    headerType: 4
}

