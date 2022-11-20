//

function ValkSignets(selectValks) {
  let valk = selectValks
  let coreSignets = valk.coreSignets.signet
  let reinforceSignets = valk.reinforceSignet.signet

  function CoreSignet() {
    for (let signet of coreSignets) {
      let CoreSignet = `# ${signet}\n`
      return CoreSignet
    }
  }
  function ReinforcementSignet() {
    for (let reinSignet of reinforceSignets) {
      let ReinforcementSignet = `# ${reinSignet}\n`
      return ReinforcementSignet
    }
  }

const DisplayDataSignet = `
*_${valk.valk.name}_*
Valk Type : ${valk.valk.type}
ATK : ${valk.valk.atk}

*_Recommended Weapon:_*
${valk.weapon.primary}
${valk.weapon.secondary}

*_Recommended Stigma_*
${valk.stigma.primary}
${valk.stigma.secondary}

*_Recommended Support_*
*${valk.supportValk.supportTypeA.type}*
${valk.supportValk.supportTypeA.slot1}
${valk.supportValk.supportTypeA.slot2}

*${valk.supportValk.supportTypeB.type}*
${valk.supportValk.supportTypeB.slot1}
${valk.supportValk.supportTypeB.slot2}

*_Emblems / Sigils_*
*Early* : ${valk.emblems.early.emblem}
*Mid* : ${valk.emblems.mid.emblem}
*Late* : ${valk.emblems.late.emblem}

*_Exclusive Signets_*
# ${valk.mainSignets.optionsA.signet}
Pick : ${valk.mainSignets.optionsA.typeChoice}

# ${valk.mainSignets.optionsB.signet}
Pick : ${valk.mainSignets.optionsB.typeChoice}

# ${valk.mainSignets.optionsC.signet}
Pick : ${valk.mainSignets.optionsC.typeChoice}

# ${valk.mainSignets.optionsD.signet}
Pick : ${valk.mainSignets.optionsD.typeChoice}

# ${valk.mainSignets.optionsE.signet}
Pick : ${valk.mainSignets.optionsE.typeChoice}

*_Core Signets_*
${CoreSignet()}

*Reinforcement Signets*
${ReinforcementSignet()}


- - - - - - - - _end_ - - - - - - - - 
`
  return DisplayDataSignet;
}

module.exports = { ValkSignets }