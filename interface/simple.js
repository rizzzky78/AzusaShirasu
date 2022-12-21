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