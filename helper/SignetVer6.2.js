// version v6.2

const InitialGuides = {
  primarySignet: 'Transition Signet - Fast increase in damage to get doubles and beat 8F. After obtaining the transition signets, enter store ASAP to replace the emblem with the Core Signets emblem.',
  coreSignet: 'Core Signet - A signet with an important stat such as breach, or when a large number of signets are needed such as Kevin1. Generally compulsory for clearing. After finishing the core signet then move on to the Reinforcement Signets',
  reinforceSignet: 'Reinforcement Signet - Select after core signet is obtained. No specific order, pick as many as possible after core is completed.',
  etc: `
Utility - usually early
Damage - usually late
Early - Start to 1st store
Mid - After 1st store to before last store
Late - Prep for 16F
  
Some battlesuits will no longer be recommended as they have been tested and their performance are not as good, so they have been excluded. If their performance improves in the future they will be added again.`
}

const JadeKnight = {
  valk: {
    name: 'Li Sushang: Jade Knight',
    type: 'PSY',
    atk: 'ICE',
    thumbnails: 'https://raw.githubusercontent.com/rizzzky78/AzusaShirasu/main/picture/sushang-jadeknight.jpg'
  },
  weapon: {
    primary: 'Nocturnal Stealth: Beam',
    secondary: 'Cosmic Duality'
  },
  stigma: {
    primary: 'Eternal Moon set',
    secondary: 'Willows set'
  },
  supportValk: {
    supportTypeA: {
      type: 'Utility',
      slot1: 'BR',
      slot2: 'LE/BKE'
    },
    supportTypeB: {
      type: 'Damage',
      slot1: 'BR',
      slot2: 'HB'
    }
  },
  emblems: {
    early: {
      emblem: 'Veil of Tears/The Lonely Moon'
    },
    mid: {
      emblem: 'Light as a Bodhi Leaf/The Lonely Moon'
    },
    late: {
      emblem: 'Key to the Deep/Dreamful Gold'
    }
  },
  mainSignets: {
    optionsA: {
      signet: 'Blessing of Great Blade 长铗 ATK consumes additional Blade Sanction in Sword Array',
      typeChoice: 'Start'
    },
    optionsB: {
      signet: 'Blessing of Cloudwalker 行云 Wild Swords and Heart Piercer deal additional Ice DMG',
      typeChoice: '1st'
    },
    optionsC: {
      signet: 'Blessing of Jade Moon 壁月 Ultimate deals additional Ice DMG',
      typeChoice: 'No'
    },
    optionsD: {
      signet: 'Blessing of Shaft 流光 Ultimate during Sword Array triggers Bolt Slash',
      typeChoice: 'No'
    },
    optionsE: {
      signet: 'Blessing of Smoky Waft 烟波 Blade Sanction built up by Basic ATKs increases',
      typeChoice: 'No'
    }
  },
  coreSignets: {
    signet: ['*Aponia Core 2*\n1st and 3rd are the key choices, unlock nexus; recommended to pick breach and vulnerability from enhanced']
  },
  reinforceSignet: {
    signet:
      [
        '*Su Core 2*\nVulnerability, +60 combo, SP recovery are the key choices, unlock nexus',
        '*Eden Core 2*\nBoth damage boosts, SP cap up are the key choices, unlock nexus',
        '*Sakura Core 2*\nMust enable Pacify Flow; Vulnerability, TDM, evasion+1 are the key choices, don\'t need nexus',
        '*Pardofelis Core 1*\nBoth damage boosts, SP cap up are the key choices, unlock nexus'
      ]
  }
}
const HerscherOfHumanEgo_typeCharge = {
  valk: {
    name: 'Elysia: Herscher of Humanity',
    type: 'PSY',
    atk: 'ICE',
    thumbnails: 'https://raw.githubusercontent.com/rizzzky78/AzusaShirasu/main/picture/elysia-hoh.jpg'
  },
  weapon: {
    primary: 'Domain of Ego: Flawless Return',
    secondary: 'High atk weapon'
  },
  stigma: {
    primary: 'Elysia: Pristine set',
    secondary: 'Ana Schariac set'
  },
  supportValk: {
    supportTypeA: {
      type: 'Utility',
      slot1: 'AE',
      slot2: 'VC'
    },
    supportTypeB: {
      type: 'Damage',
      slot1: 'AE',
      slot2: 'BR'
    }
  },
  emblems: {
    early: {
      emblem: 'Veil of Tears/Boundless Feeling'
    },
    mid: {
      emblem: 'Gold Goblet/Boundless Feeling'
    },
    late: {
      emblem: 'Key to the Deep/Dreamful Gold'
    }
  },
  mainSignets: {
    optionsA: {
      signet: 'Blessing of First Encounter 初见 Charged ATKs in Human Form pulls enemies',
      typeChoice: 'Start'
    },
    optionsB: {
      signet: 'Blessing of First Yearning 初念 In Human Form, Charged ATK Speed increases',
      typeChoice: 'Start'
    },
    optionsC: {
      signet: 'Blessing of First Bloom 初绽 In Origin Form, Ice DMG increases',
      typeChoice: 'Reinforcement'
    },
    optionsD: {
      signet: 'Blessing of First Awakening 初醒 In Origin Form, triggering Ultimate Evasion Skill restores Herrscher Charge',
      typeChoice: 'No'
    },
    optionsE: {
      signet: 'Blessing of First Journey 初程 Switching to Herrscher Form makes all enemies vulnerable',
      typeChoice: 'No'
    }
  },
  coreSignets: {
    signet:
      [
        '*Aponia Core 2*\n1st is the key choice; can pick damage reduction to pair with Hua2 enhanced; must pick at least breach and vulnerability from enhanced',
        '*Eden Core 1*\nBoth damage boosts and SP cap up are the key choices, can pick damage reduction to synergise with Hua2 enhanced, unlock nexus, pick vulnerability from enhanced'
      ]
  },
  reinforceSignet: {
    signet:
      [
        '*Hua Core 2*\nBoth damage boosts are the key choices, can pick damage reduction; recommended to pick damage reduction conversion and 60 stacks from enhanced',
        '*Pardofelis Core 2*\nBoth damage boosts and HP/SP cap up are the key choices, unlock nexus',
        '*Kalpas Core 2*\nRequires BR to reduce HP. Both damage boosts, HP cap up are the key choices, can pick damage reduction to synergise with Hua2 enhanced; don\'t need nexus'
      ]
  }
}

const HerscherOfHumanEgo_typeUltimate = {
  valk: {
    name: 'Elysia: Herscher of Humanity',
    type: 'PSY',
    atk: 'ICE',
    thumbnails: 'https://raw.githubusercontent.com/rizzzky78/AzusaShirasu/main/picture/elysia-hoh.jpg'
  },
  weapon: {
    primary: 'Domain of Ego: Flawless Return',
    secondary: 'High atk weapon'
  },
  stigma: {
    primary: 'Elysia: Pristine set',
    secondary: 'Willows set'
  },
  supportValk: {
    supportTypeA: {
      type: 'Utility',
      slot1: 'AE',
      slot2: 'VC/BKE'
    },
    supportTypeB: {
      type: 'Damage',
      slot1: 'AE',
      slot2: 'BR'
    }
  },
  emblems: {
    early: {
      emblem: 'Pseudo Miracle/Falling in Past Light'
    },
    mid: {
      emblem: 'Rainbow of Absence/Falling in Past Light'
    },
    late: {
      emblem: 'Tin Flask/Falling in Past Light'
    }
  },
  mainSignets: {
    optionsA: {
      signet: 'Blessing of First Bloom 初绽 In Origin Form, Ice DMG increases',
      typeChoice: 'Start'
    },
    optionsB: {
      signet: 'Blessing of First Awakening 初醒 In Origin Form, triggering Ultimate Evasion Skill restores Herrscher Charge',
      typeChoice: 'Start'
    },
    optionsC: {
      signet: 'Blessing of First Journey 初程 Switching to Herrscher Form makes all enemies vulnerable',
      typeChoice: '1st'
    },
    optionsD: {
      signet: 'Blessing of First Encounter 初见 Charged ATKs in Human Form pulls enemies',
      typeChoice: 'No'
    },
    optionsE: {
      signet: 'Blessing of First Yearning 初念 In Human Form, Charged ATK Speed increases',
      typeChoice: 'No'
    }
  },
  coreSignets: {
    signet:
      [
        '*Vill-V Core 2*\n2,3,5 are the key choices; recommended to pick breach and vulnerability from enhanced, try to upgrade breach to max',
        '*Griseo Core 2*\nRed Yellow Grey Blue Black are the key choices; pick at least purple and green from enhanced, if not able to upgrade Vill-V breach can also pick orange'
      ]
  },
  reinforceSignet: {
    signet:
      [
        '*Sakura Core 2*\nEvasion +1, vulnerability and TDM are the key choices, don\'t need nexus',
        '*Pardofelis Core 1*\nBoth damage boosts are the key choices, unlock nexus',
        '*Kalpas Core 2*\nCan rely on BR to reduce HP; Both damage boosts are the key choices, don\'t need nexus. Eden starting SP is also recommended to speed up the rotations'
      ]
  }
}
const Sample = {
  valk: {
    name: '',
    type: '',
    atk: '',
    thumbnails: ''
  },
  weapon: {
    primary: '',
    secondary: ''
  },
  stigma: {
    primary: '',
    secondary: ''
  },
  supportValk: {
    supportTypeA: {
      type: '',
      slot1: '',
      slot2: ''
    },
    supportTypeB: {
      type: '',
      slot1: '',
      slot2: ''
    },
    supportTypeC: {
      type: '',
      slot1: '',
      slot2: ''
    }
  },
  emblems: {
    early: {
      emblem: ''
    },
    mid: {
      emblem: ''
    },
    late: {
      emblem: ''
    }
  },
  mainSignets: {
    optionsA: {
      signet: '',
      typeChoice: ''
    },
    optionsB: {
      signet: '',
      typeChoice: ''
    },
    optionsC: {
      signet: '',
      typeChoice: ''
    },
    optionsD: {
      signet: '',
      typeChoice: ''
    },
    optionsE: {
      signet: '',
      typeChoice: ''
    }
  },
  coreSignets: {
    signet: ['']
  },
  reinforceSignet: {
    signet: ['']
  }
}



module.exports = { InitialGuides, JadeKnight, HerscherOfHumanEgo_typeCharge, HerscherOfHumanEgo_typeUltimate };
