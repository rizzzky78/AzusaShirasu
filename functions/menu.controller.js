const { interfaces } = require('../config/global.config');
const { ObjectCmd } = require('../interface/Indexing');
/**
 * 
 * @param {*} stringQuery match to Results
 * @param {*} information input Informations as headers
 * @param {*} footer input footers on end of documents
 * @returns `String`
 */
const CategorySelector = (stringQuery, information, footer) => {
  const ObjCommand = ObjectCmd.commands;
  const header = information;
  const foot = footer;
  let ArraySetter;

  switch (stringQuery) {
    case 'ownermenu':
      ArraySetter = ObjCommand.owner;
      break;
    case 'cloudstore':
      ArraySetter = ObjCommand.cloudstore;
      break;
    case 'open404ai':
      ArraySetter = ObjCommand.openai;
      break;
    case 'groupmenu':
      ArraySetter = ObjCommand.group;
      break;

    case 'anonymous':
      ArraySetter = ObjCommand.anonymous;
      break;
    case 'rpggames':
      ArraySetter = ObjCommand.rpg;
      break;
    case 'quizmenu':
      ArraySetter = ObjCommand.quiz;
      break;

    case 'downloadermenu':
      ArraySetter = ObjCommand.downloader;
      break;
    case 'searchmenu':
      ArraySetter = ObjCommand.searcher;
      break;
    case 'islamicmenu':
      ArraySetter = ObjCommand.islamic;
      break;

    case 'animanga':
      ArraySetter = ObjCommand.animanga;
      break;
    case 'animepicture':
      ArraySetter = ObjCommand.animes;
      break;
    case 'nsfwmenu':
      ArraySetter = ObjCommand.nsfw;
      break;
    case 'lewdmenu':
      ArraySetter = ObjCommand.lewd;
      break;

    case 'memes':
      ArraySetter = ObjCommand.memes;
      break;
    case 'movie':
      ArraySetter = ObjCommand.movie;
      break;
    case 'story':
      ArraySetter = ObjCommand.story;
      break;
    case 'quotes':
      ArraySetter = ObjCommand.quotes;
      break;
    case 'asupan':
      ArraySetter = ObjCommand.asupan;
      break;
    case 'randomcewe':
      ArraySetter = ObjCommand.rancewe;
      break;
    case 'telesticker':
      ArraySetter = ObjCommand.telestick;
      break;

    case 'convertermenu':
      ArraySetter = ObjCommand.converter;
      break;
    case 'imageeffect':
      ArraySetter = ObjCommand.imgeffect;
      break;
    case 'stickeffect':
      ArraySetter = ObjCommand.stickeffect;
      break;
    case 'primbonmenu':
      ArraySetter = ObjCommand.primbon;
      break;
    case 'ephoto':
      ArraySetter = ObjCommand.ephoto;
      break;
    case 'textpro':
      ArraySetter = ObjCommand.textpro;
      break;
    case 'logomaker':
      ArraySetter = ObjCommand.logomaker;
      break;
    case 'voicechanger':
      ArraySetter = ObjCommand.voice;
      break;

    case 'other':
      ArraySetter = ObjCommand.other;
      break;
  }

  return `${header}\n\n${interfaces.upper + interfaces.marker}\n${ArraySetter.map(value => `${interfaces.side} ${value}\n`).join('')}${interfaces.lower + interfaces.marker}\n\n${foot}`;
};

module.exports = { CategorySelector }
