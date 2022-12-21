

switch (command) {

  /** = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
   * @Commands
   * Type of
   * @OwnerCMD
   *  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
   */

  case 'setcmd': {
    db.data.cmd = db.data.cmd || {}
    if (!m.quoted) return reply(lang.SetCmd(prefix, command))
    if (!m.quoted.fileSha256) return reply(lang.HashCmd())
    if (!text) return reply(lang.CmdApa())
    let sticker = db.data.cmd
    let hash = m.quoted.fileSha256.toString('base64')
    if (sticker[hash] && sticker[hash].locked) return reply(lang.UCmd())
    sticker[hash] = {
      q,
      mentionedJid: m.mentionedJid,
      creator: m.sender,
      at: + new Date,
      locked: false,
    }
    reply(`Done!`)
  } break

  case 'deletecmd': case 'delcmd': {
    let hash = m.quoted.fileSha256.toString('base64')
    if (!hash) return reply(lang.HashCmd())
    let sticker = db.data.cmd
    if (sticker[hash] && sticker[hash].locked) return reply(lang.UCmd())
    delete sticker[hash]
    reply(lang.DelCmd())
  } break

  case 'listcmd': {
    let teks = `
  *List Hash*
  Info: *bold* hash is Locked
  
  *Hash :*
  ${Object.entries(db.data.cmd).map(([key, value], index) => `${index + 1}. ${value.locked ? `*${key}*` : key} 
  *Command: ${value.q}*
  *Creator : @${value.creator.split("@")[0]}*
  *Create Time : ${moment(value.at * 1).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}*
  *Locked : ${value.locked}*
  `).join('\n')}
  `.trim()
    alpha.sendTextWithMentions(m.chat, teks, m)
  } break
  case 'lockcmd': {
    if (!isCreator) return reply(lang.ownerOnly())
    if (!m.quoted) return reply(lang.LockCmd())
    if (!m.quoted.fileSha256) return reply(lang.HashCmd())
    let sticker = db.data.cmd
    let hash = m.quoted.fileSha256.toString('base64')
    if (!(hash in sticker)) return reply(lang.NoCmd())
    sticker[hash].locked = !/^un/i.test(command)
    reply(lang.ok())
  } break

  case 'antiviewonce': case 'antionce':
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    if (args[0] === "on") {
      if (db.data.chats[m.chat].antionce) return reply(lang.OnBef())
      db.data.chats[m.chat].antionce = true
      reply(lang.OkOn(command))
    } else if (args[0] === "off") {
      if (!db.data.chats[m.chat].antionce) return reply(lang.OffYaBef())
      db.data.chats[m.chat].antionce = false
      reply(lang.OffBef())
    } else {
      alpha.sendButMessage(from, 'Mode Anti View Once', `© ${ownername}`, [{ buttonId: 'antionce on', buttonText: { displayText: 'ON' }, type: 1 }, { buttonId: 'antionce off', buttonText: { displayText: 'OFF' }, type: 1 }], { quoted: fgif })
    } break

  case 'autobio': {
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    if (args[0] === "on") {
      if (db.data.settings[botNumber].autobio === true) return reply(lang.OnBef())
      db.data.settings[botNumber].autobio = true
      reply(lang.OkOn(command))
    } else if (args[0] === "off") {
      if (db.data.settings[botNumber].autobio === false) return reply(lang.OffYaBef())
      db.data.settings[botNumber].autobio = false
      reply(lang.OffBef('Autobio'))
    } else {
      alpha.sendButMessage(from, 'Mode Autobio', `© ${ownername}`, [{ buttonId: 'autobio on', buttonText: { displayText: 'ON' }, type: 1 }, { buttonId: 'autobio off', buttonText: { displayText: 'OFF' }, type: 1 }], { quoted: fgif })
    }
  } break

  case 'autorespond': case 'autorespon': {
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    if (args[0] === "on") {
      if (db.data.settings[botNumber].autorespond) return reply(lang.OnBef())
      db.data.settings[botNumber].autorespond = true
      reply(lang.OkOn(command))
    } else if (args[0] === "off") {
      if (!db.data.settings[botNumber].autorespond) return reply(lang.OffBef())
      db.data.settings[botNumber].autorespond = false
      reply(lang.OffBef('Auto Respond'))
    } else {
      alpha.sendButMessage(from, 'Mode Auto Respond', `© ${ownername}`, [{ buttonId: 'autorespond on', buttonText: { displayText: 'ON' }, type: 1 }, { buttonId: 'autorespond off', buttonText: { displayText: 'OFF' }, type: 1 }], { quoted: fgif })
    }
  } break

  case 'unbanchats': case 'unbanchat': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    if (!db.data.chats[m.chat].mute) return reply(lang.NoMute())
    db.data.chats[m.chat].mute = false
    reply(lang.OkUnBanC())
  } break

  case 'banchat': case 'banchats': case 'mute':
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    if (args[0] === "on") {
      if (db.data.chats[m.chat].mute) return reply(lang.OnBef())
      db.data.chats[m.chat].mute = true
      reply(lang.OkMute())
    } else if (args[0] === "off") {
      if (!db.data.chats[m.chat].mute) return reply(lang.OffYaBef())
      db.data.chats[m.chat].mute = false
      reply(lang.OkUnMute())
    } else {
      alpha.sendButMessage(from, 'Mode Mute', `© ${ownername}`, [{ buttonId: 'mute on', buttonText: { displayText: 'ON' }, type: 1 }, { buttonId: 'mute off', buttonText: { displayText: 'OFF' }, type: 1 }], { quoted: fgif })
    } break

  case 'banned': case 'ban': {
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    if (!m.quoted && !text) return reply(lang.NoTagBan(prefix, command))
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    let banUser = db.data.users[users]
    banUser.banned = true
    reply(lang.ok())
  } break

  case 'unban': case 'unbanned': {
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    if (!m.quoted && !text) return reply(lang.NoTagBan(prefix, command))
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    let banUser = db.data.users[users]
    banUser.banned = false
    reply(lang.ok())
  } break

  case 'setmenu': {
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    const listhades = ['templateLocation', 'templateTenor', 'list', 'document', 'katalog', 'katalog2']
    if (!listhades.includes(text)) {
      alpha.sendList(from, lang.SetAh(), `© ${ownername}`, salam + ' ' + pushname, 'Click Here', [
        { "title": "Set Menu-1", "rows": [{ "title": "Template Button Location", "rowId": "setmenu templateLocation" }] }, { "title": "Set Menu-2", "rows": [{ "title": "Template Button Tenor", "rowId": "setmenu templateTenor" }] }, { "title": "Set Menu-3", "rows": [{ "title": "Menu Katalog", "rowId": "setmenu katalog" }] }, { "title": "Set Menu-4", "rows": [{ "title": "Menu Katalog Diskon", "rowId": "setmenu katalog2" }] }, {
          "title": "Set Menu-5", "rows": [{ "title": "Menu List Message", "rowId": "setmenu list" }]
        }, {
          "title": "Set Menu-6",
          "rows": [
            {
              "title": "Menu Document",
              "rowId": "setmenu document"
            }
          ]
        }], { quoted: fgif })
    } else {
      typemenu = text
      reply(lang.ok())
    }
  } break

  case 'setwm': case 'setexif': {
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    if (!text) return reply(lang.NoToStik(prefix, command))
    if (!text.includes('|')) return reply(lang.NoToStik(prefix, command))
    global.packname = text.split("|")[0]
    global.author = text.split("|")[1]
    reply(lang.DoneExif(global.packname, global.author))
  } break

  case 'checkapikey': {
    await fetchJson(`https://api.lolhuman.xyz/api/checkapikey?apikey=${lol}`)
      .then(async data => {
        let res = data.result
        let txt = `*Dasboard API Azusa Bot*\n\n`
        txt += `Username: ${res.username}\n`
        txt += `Total Request: ${res.requests}\n`
        txt += `Today Request: ${res.today}\n`
        txt += `Account Type: ${res.account_type}\n`
        txt += `Expired: ${res.expired}\n`
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'join': {
    if (!isCreator) return reply('Mau masukin Bot ke Grup?, Silahkan Chat Owner...\nwa.me/6281329585825')
  }
    break
  case 'recruit': {
    if (!isCreator) return reply('Mau masukin Bot ke Grup?, Silahkan Chat Owner...\nwa.me/6281329585825')
    //if (!text) return reply(lang.JoinGc())
    //if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply(lang.erorLink())
    reply(lang.wait())
    let result = args[0].split('https://chat.whatsapp.com/')[1]
    await alpha.groupAcceptInvite(result).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
  } break

  case 'public': {
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    alpha.public = true
    reply(lang.BotPublic())
  } break
  case 'self': {
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    alpha.public = false
    reply(lang.BotSelf())
  } break

  case 'owner': case 'creator': {
    alpha.sendContact(m.chat, global.owner, m)
  } break

  /**
   * @endsHere
   */

  /** = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 * @Commands
 * Type of
 * @Management
 *  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
 */

  case 'absen': {
    // if (m.isGroup?) {  return reply("Grup Only!")
    //if (!(isGroupAdmins || isCreator))return reply(lang.adminOnly())
    db.data.absen = db.data.absen || {}
    if (!(from in db.data.absen)) return alpha.send1ButMes(m.chat, lang.noAbsen(), `© ${ownername}`, `absenstart`, lang.StartAbsen(), m)
    let absen = db.data.absen[from][1]
    const wasVote = absen.includes(m.sender)
    if (wasVote) return reply(lang.DahAbsen())
    absen.push(m.sender)
    let d = new Date
    let date = d.toLocaleDateString('id', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let list = absen.map((v, i) => `• ${i + 1}. @${v.split`@`[0]}`).join('\n')
    let caption = `Tanggal: ${date}
    ${db.data.absen[from][2] ? db.data.absen[from][2] + '\n' : ''}
    *--------「 LIST ABSEN 」--------*
    ${list}
    
    Total: ${absen.length}
    `.trim()
    await alpha.send2ButMes(m.chat, caption, `© ${ownername}`, `absen`, `Absen`, `cekabsen`, `Check Absen`, m, absen)
  } break
  case 'cekabsen': {
    if (m.isGroup) {
      if (!(isGroupAdmins || isCreator)) return reply(lang.adminOnly())
    }
    db.data.absen = db.data.absen || {}
    if (!(from in db.data.absen)) return alpha.send1ButMes(m.chat, lang.noAbsen(), `© ${ownername}`, `absenstart`, lang.StartAbsen(), m)

    let dd = new Date
    let datee = dd.toLocaleDateString('id', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let absenn = db.data.absen[from][1]
    let listt = absenn.map((v, i) => `• ${i + 1}. @${v.split`@`[0]}`).join('\n')
    let captionn = `Tanggal: ${datee}
    ${db.data.absen[from][2] ? db.data.absen[from][2] + '\n' : ''}
    *--------「 LIST ABSEN 」--------*
    ${listt}
    
    Total: ${absenn.length}
    `.trim()
    alpha.send2ButMes(m.chat, captionn, `© ${ownername}`, `absen`, `Absen`, `deleteabsen`, `Delete Absen`, m, absenn)
  } break

  case 'delabsen': case 'deleteabsen': {
    if (m.isGroup) {
      if (!(isGroupAdmins || isCreator)) return reply(lang.adminOnly())
    }
    db.data.absen = db.data.absen || {}
    if (!(from in db.data.absen)) return alpha.send1ButMes(m.chat, lang.noAbsen(), `© ${ownername}`, `absenstart`, lang.StartAbsen(), m)

    delete db.data.absen[from]
    reply(lang.DelAbsen())
  }
    break
  case 'absenstart': case 'mulaiabsen': {
    if (m.isGroup) {
      if (!(isGroupAdmins || isCreator)) return reply(lang.adminOnly())
    }
    db.data.absen = db.data.absen || {}
    if (from in db.data.absen) return alpha.send2ButMes(m.chat, lang.adaAbsen(), `© ${ownername}`, `cekabsen`, `Check Absen`, `deleteabsen`, `Delete Absen`, m)

    db.data.absen[from] = [
      await alpha.send1ButMes(m.chat, lang.SAbsen(), `© ${ownername}`, `absen`, `Absen`, m),

      [], q ? q : '']
  } break



  case 'nsfw':
    if (!isGroupAdmins && !isGroupOwner && !m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    if (args[0] === "on") {
      if (db.data.chats[m.chat].nsfw) return reply(lang.OnBef())
      db.data.chats[m.chat].nsfw = true
      reply(lang.OkOn('Nsfw'))
    } else if (args[0] === "off") {
      if (!db.data.chats[m.chat].nsfw) return reply(lang.OffYaBef())
      db.data.chats[m.chat].nsfw = false
      reply(lang.OffBef('Nsfw'))
    } else {
      alpha.sendButMessage(from, 'Mode Nfsw', `© ${ownername}`, [{ buttonId: 'nsfw on', buttonText: { displayText: 'ON' }, type: 1 }, { buttonId: 'nsfw off', buttonText: { displayText: 'OFF' }, type: 1 }], { quoted: fgif })
    }
    break
  case 'antilink':
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    if (!isBotAdmins) return reply(lang.botNotAdmin())
    if (args[0] === "on") {
      if (db.data.chats[m.chat].antilink) return reply(lang.OnBef())
      db.data.chats[m.chat].antilink = true
      reply(lang.OkOn('Antilink'))
    } else if (args[0] === "off") {
      if (!db.data.chats[m.chat].antilink) return reply(lang.OffYaBef())
      db.data.chats[m.chat].antilink = false
      reply(lang.OffBef('Antilink'))
    } else {
      alpha.sendButMessage(from, 'Mode Antilink', `© ${ownername}`, [{ buttonId: 'antilink on', buttonText: { displayText: 'ON' }, type: 1 }, { buttonId: 'antilink off', buttonText: { displayText: 'OFF' }, type: 1 }], { quoted: fgif })
    }
    break
  case 'detectpromote': case 'promotedetect':
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    if (!isBotAdmins) return reply(lang.botNotAdmin())
    if (args[0] === "on") {
      if (db.data.chats[m.chat].promote) return reply(lang.OnBef())
      db.data.chats[m.chat].promote = true
      reply(lang.OkOn('Detect Promote'))
    } else if (args[0] === "off") {
      if (!db.data.chats[m.chat].promote) return reply(lang.OffYaBef())
      db.data.chats[m.chat].promote = false
      reply(lang.OffBef('Detect Promote'))
    } else {
      alpha.sendButMessage(from, 'Mode Detect Promote', `© ${ownername}`, [{ buttonId: 'detectpromote on', buttonText: { displayText: 'ON' }, type: 1 }, { buttonId: 'detectpromote off', buttonText: { displayText: 'OFF' }, type: 1 }], { quoted: fgif })
    }
    break
  case 'detectdemote': case 'demotedetect':
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    if (!isBotAdmins) return reply(lang.botNotAdmin())
    if (args[0] === "on") {
      if (db.data.chats[m.chat].demote) return reply(lang.OnBef())
      db.data.chats[m.chat].demote = true
      reply(lang.OkOn('Detect Demote'))
    } else if (args[0] === "off") {
      if (!db.data.chats[m.chat].demote) return reply(lang.OffYaBef())
      db.data.chats[m.chat].demote = false
      reply(lang.OffBef('Detect Demote'))
    } else {
      alpha.sendButMessage(from, 'Mode Detect Promote', `© ${ownername}`, [{ buttonId: 'detectdemote on', buttonText: { displayText: 'ON' }, type: 1 }, { buttonId: 'detectdemote off', buttonText: { displayText: 'OFF' }, type: 1 }], { quoted: fgif })
    }
    break
  case 'updatewelcome': case 'setwelcome': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    if (!text) return reply(`Contoh penggunaan: ${prefix + command} Welcome @user\n\n- @user (Tag user)\n- @number (Nomor user)\n- @group (Nama group)\n- @bio (Bio user)\n- @members (Total member)\n- @day (Hari)\n- @date (Tanggal)\n- @time (Jam)\n- @desc (Deskripsi group)`)
    db.data.chats[m.chat].setWelcome = text
    alpha.sendButMessage(m.chat, lang.ok() + ' ' + command + '\n\n' + text, `© ${ownername}`, [{ buttonId: 'cekwelcome', buttonText: { displayText: 'Check Welcome' }, type: 1 }], { quoted: fgif })
  }
    break
  case 'updatepromote': case 'setpromote': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    if (!text) return reply(`Contoh penggunaan: ${prefix + command} Promote @user\n\n- @user (Tag user)\n- @number (Nomor user)\n- @group (Nama group)\n- @bio (Bio user)\n- @members (Total member)\n- @day (Hari)\n- @date (Tanggal)\n- @time (Jam)\n- @desc (Deskripsi group)`)
    db.data.chats[m.chat].setPromote = text
    alpha.sendButMessage(m.chat, lang.ok() + ' ' + command + '\n\n' + text, `© ${ownername}`, [{ buttonId: 'cekpromote', buttonText: { displayText: 'Check Promote' }, type: 1 }], { quoted: fgif })
  }
    break
  case 'updatedemote': case 'setdemote': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    if (!text) return reply(`Contoh penggunaan: ${prefix + command} Demote @user\n\n- @user (Tag user)\n- @number (Nomor user)\n- @group (Nama group)\n- @bio (Bio user)\n- @members (Total member)\n- @day (Hari)\n- @date (Tanggal)\n- @time (Jam)\n- @desc (Deskripsi group)`)
    db.data.chats[m.chat].setDemote = text
    alpha.sendButMessage(m.chat, lang.ok() + ' ' + command + '\n\n' + text, `© ${ownername}`, [{ buttonId: 'cekdemote', buttonText: { displayText: 'Check Demote' }, type: 1 }], { quoted: fgif })
  }
    break
  case 'updateproses': case 'setproses': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    if (!text) return reply(`Contoh penggunaan: ${prefix + command} Proses @user\n\n- @user (Tag user)\n- @tanggal (tanggal)\n- @jam (jam)\n- @catatan (catatan pesanan)`)
    db.data.chats[m.chat].setProses = text
    alpha.sendButMessage(m.chat, lang.ok() + ' ' + command + '\n\n' + text, `© ${ownername}`, [{ buttonId: 'cekpromote', buttonText: { displayText: 'Check Proses' }, type: 1 }], { quoted: fgif })
  }
    break
  case 'updatedone': case 'setdone': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    if (!text) return reply(`Contoh penggunaan: ${prefix + command} Done @user\n\n- @user (Tag user)\n- @tanggal (tanggal)\n- @jam (jam)\n- @catatan (catatan pesanan)`)
    db.data.chats[m.chat].setDone = text
    alpha.sendButMessage(m.chat, lang.ok() + ' ' + command + '\n\n' + text, `© ${ownername}`, [{ buttonId: 'cekdone', buttonText: { displayText: 'Check Done' }, type: 1 }], { quoted: fgif })
  }
    break
  case 'cekproses': {
    if (!m.isGroup) return reply(lang.groupOnly())
    defaultwel = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : @tanggal\n⌚ JAM     : @jam\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan :\n@catatan\n\nPesanan @user sedang di proses!`
    textwel = (db.data.chats[m.chat].setProses || defaultwel)
    reply('Text proses in group ' + groupName + `\n\n` + textwel)
  }
    break
  case 'cekdone': {
    if (!m.isGroup) return reply(lang.groupOnly())
    defaultwel = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : @tanggal\n⌚ JAM     : @jam\n✨ STATUS  : Berhasil\`\`\`\n\n📝 Catatan :\n@catatan\n\nTerimakasih @user Next Order ya🙏`
    textwel = (db.data.chats[m.chat].setDone || defaultwel)
    reply('Text done in group ' + groupName + `\n\n` + textwel)
  }
    break
  case 'deldone': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    db.data.chats[m.chat].setDone = ''
    alpha.sendButMessage(m.chat, lang.ok(), `© ${ownername}`, [{ buttonId: 'cekdone', buttonText: { displayText: 'Check Done' }, type: 1 }], { quoted: fgif })
  }
    break
  case 'delproses': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    db.data.chats[m.chat].setProses = ''
    alpha.sendButMessage(m.chat, lang.ok(), `© ${ownername}`, [{ buttonId: 'cekproses', buttonText: { displayText: 'Check Proses' }, type: 1 }], { quoted: fgif })
  }
    break
  case 'delpromote': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    db.data.chats[m.chat].setPromote = ''
    alpha.sendButMessage(m.chat, lang.ok(), `© ${ownername}`, [{ buttonId: 'cekpromote', buttonText: { displayText: 'Check Promote' }, type: 1 }], { quoted: fgif })
  }
    break
  case 'deldemote': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    db.data.chats[m.chat].setDemote = ''
    alpha.sendButMessage(m.chat, lang.ok(), `© ${ownername}`, [{ buttonId: 'cekdemote', buttonText: { displayText: 'Check Demote' }, type: 1 }], { quoted: fgif })
  }
    break
  case 'cekpromote': {
    if (!m.isGroup) return reply(lang.groupOnly())
    defaultwel = `@user Promote From @group`
    textwel = (db.data.chats[m.chat].setPromote || defaultwel)
    reply('Text promote in group ' + groupName + `\n\n` + textwel)
  }
    break
  case 'cekdemote': {
    if (!m.isGroup) return reply(lang.groupOnly())
    defaultwel = `@user Demote From @group`
    textwel = (db.data.chats[m.chat].setDemote || defaultwel)
    reply('Text demote in group ' + groupName + `\n\n` + textwel)
  }
    break
  case 'cekwelcome': {
    if (!m.isGroup) return reply(lang.groupOnly())
    defaultwel = `*Welcome to @group*\n\n📛 : _@user_\n🔢 : _@number_\n💌 : _@bio_\n🏅 : _@members Members_\n📆 : _@day, @date_\n⏰ : _@time Asia/Jakarta_`
    textwel = (db.data.chats[m.chat].setWelcome || defaultwel)
    reply('Text welcome in group ' + groupName + `\n\n` + textwel)
  }
    break
  case 'cekleft': case 'cekgoodbye': {
    if (!m.isGroup) return reply(lang.groupOnly())
    defaultwel = `◪ Goodbye @user\n◪ Leave from group: \n@group\n\n└─ ❏ Nomor: @number\nGoodBye~~`
    textwel = (db.data.chats[m.chat].setLeave || defaultwel)
    reply('Text googbye in group ' + groupName + `\n\n` + textwel)
  }
    break
  case 'delgoodbye': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    db.data.chats[m.chat].setLeave = ''
    alpha.sendButMessage(m.chat, lang.ok(), `© ${ownername}`, [{ buttonId: 'cekleft', buttonText: { displayText: 'Check Welcome' }, type: 1 }], { quoted: fgif })
  }
    break
  case 'delwelcome': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    db.data.chats[m.chat].setWelcome = ''
    alpha.sendButMessage(m.chat, lang.ok(), `© ${ownername}`, [{ buttonId: 'cekwelcome', buttonText: { displayText: 'Check Welcome' }, type: 1 }], { quoted: fgif })
  }
    break
  case 'updategoodbye': case 'setgoodbye': case 'setleft': case 'setleave': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    if (!text) return reply(`Contoh penggunaan: ${prefix + command} Goodbye @user\n\n- @user (Tag user)\n- @number (Nomor user)\n- @group (Nama group)\n- @bio (Bio user)\n- @members (Total member)\n- @day (Hari)\n- @date (Tanggal)\n- @time (Jam)\n- @desc (Deskripsi group)`)
    db.data.chats[m.chat].setLeave = text
    alpha.sendButMessage(m.chat, lang.ok() + '\n' + text, `© ${ownername}`, [{ buttonId: 'cekleft', buttonText: { displayText: 'Check Welcome' }, type: 1 }], { quoted: fgif })

  }
    break
  case 'welcome':
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    if (args[0] === "on") {
      if (db.data.chats[m.chat].welcome) return reply(lang.OnBef())
      db.data.chats[m.chat].welcome = true
      reply(lang.OkOn('Welcome'))
    } else if (args[0] === "off") {
      if (!db.data.chats[m.chat].welcome) return reply(lang.OffYaBef())
      db.data.chats[m.chat].welcome = false
      reply(lang.OffBef('Welcome'))
    } else {
      alpha.sendButMessage(from, 'Mode Welcome Msg', `© ${ownername}`, [{ buttonId: 'welcome on', buttonText: { displayText: 'ON' }, type: 1 }, { buttonId: 'welcome off', buttonText: { displayText: 'OFF' }, type: 1 }], { quoted: fgif })
    }
    break
  case 'goodbye': case 'left':
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    if (args[0] === "on") {
      if (db.data.chats[m.chat].goodbye) return reply(lang.OnBef())
      db.data.chats[m.chat].goodbye = true
      reply(lang.OkOn('Goodbye'))
    } else if (args[0] === "off") {
      if (!db.data.chats[m.chat].goodbye) return reply(lang.OffYaBef())
      db.data.chats[m.chat].goodbye = false
      reply(lang.OffBef('Goodbye'))
    } else {
      alpha.sendButMessage(from, 'Mode Goodbye Msg', `© ${ownername}`, [{ buttonId: 'left on', buttonText: { displayText: 'ON' }, type: 1 }, { buttonId: 'left off', buttonText: { displayText: 'OFF' }, type: 1 }], { quoted: fgif })
    }
    break
  case 'linkgroup': case 'linkgrup': case 'linkgc': {
    if (!m.isGroup) return reply(lang.groupOnly())
    let response = await alpha.groupInviteCode(m.chat)
    alpha.sendText(m.chat, `Link Group : *${groupMetadata.subject}*\nhttps://chat.whatsapp.com/${response}`, m, { detectLink: true })
  }
    break
  case 'delete': case 'del': {
    //if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    if (!m.quoted) throw false
    let { chat, fromMe, id, isBaileys } = m.quoted
    if (!isBaileys) return reply(lang.NoMsgBot())
    alpha.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
  }
    break

  case 'infochat': case 'sider': {
    if (!m.quoted) return reply(lang.LockCmd())
    let msg = await m.getQuotedObj()
    if (!m.quoted.isBaileys) return reply(lang.NoMsgBot())
    let teks = ''
    for (let i of msg.userReceipt) {
      let read = i.readTimestamp
      let unread = i.receiptTimestamp
      let waktu = read ? read : unread
      teks += `⭔ @${i.userJid.split('@')[0]}\n`
      teks += ` ┗━⭔ *Waktu :* ${moment(waktu * 1000).format('DD/MM/YY HH:mm:ss')} ⭔ *Status :* ${read ? 'Dibaca' : 'Terkirim'}\n\n`
    }
    alpha.sendTextWithMentions(m.chat, teks, m)
  }
    break
  case 'q': case 'quoted': {
    if (!m.quoted) return reply(lang.LockCmd())
    let wokwol = await alpha.serializeM(await m.getQuotedObj())
    if (!wokwol.quoted) return reply(lang.NoQouted())
    await wokwol.quoted.copyNForward(m.chat, true)
  }
    break
  case 'listchat': case 'listpc': {
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
    let teks = `⬣ *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`
    for (let i of anu) {
      let nama = store.messages[i].array[0].pushName
      teks += `⬡ *Nama :* ${nama}\n⬡ *User :* @${i.split('@')[0]}\n⬡ *Chat :* https://wa.me/${i.split('@')[0]}\n\n────────────────────────\n\n`
    }
    alpha.sendTextWithMentions(m.chat, teks, m)
  }
    break
  case 'liston': case 'listonline': {
    if (!isGroupAdmins && !isGroupOwner) return reply(lang.adminOnly())
    let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
    let online = [...Object.keys(store.presences[id]), botNumber]
    alpha.sendText(m.chat, 'List Online:\n\n' + online.map(v => '⭔ @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
  }
    break
  case 'olistgc': {
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    let getGroups = await alpha.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let anu = groups.map(v => v.id)
    let teks = `⬣ *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`
    for (let i of anu) {
      let metadata = await alpha.groupMetadata(i)
      teks += `🐥 *Nama :* ${metadata.subject}\n👤 *Owner :* @${groupMetadata.owner.split('@')[0]}\n♨️ *ID :* ${metadata.id}\n🗓️ *Dibuat :* ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n👥 *Member :* ${metadata.participants.length}\n\n────────────────────────\n\n`
    }
    alpha.sendTextWithMentions(m.chat, teks, m)
  }
    break
  case 'listgroup': case 'listgc': {
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
    let teks = `⬣ *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`
    for (let i of anu) {
      let metadata = await alpha.groupMetadata(i)
      teks += `⬡ *Nama :* ${metadata.subject}\n⬡ *Owner :* ${metadata.owner !== undefined ? '@' + metadata.owner.split`@`[0] : '-'}\n⬡ *ID :* ${metadata.id}\n⬡ *Dibuat :* ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n⬡ *Member :* ${metadata.participants.length}\n\n────────────────────────\n\n`
    }
    alpha.sendTextWithMentions(m.chat, teks, m)
  }
    break
  case 'setname': case 'setsubject': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!(isGroupAdmins || isGroupOwner)) return reply(lang.adminOnly())
    if (!isBotAdmins) return reply(lang.botNotAdmin())
    if (!text) return reply(lang.SetGcName(prefix, command))
    await alpha.groupUpdateSubject(m.chat, text).then((res) => m.reply(lang.ok())).catch((err) => m.reply(jsonformat(err)))
  }
    break
  case 'setdesc': case 'setdesk': case 'setdeskripsi': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!(isGroupAdmins || isGroupOwner)) return reply(lang.adminOnly())
    if (!isBotAdmins) return reply(lang.botNotAdmin())
    if (!text) return reply(lang.SetGcName(prefix, command))
    alpha.groupUpdateDescription(m.chat, `${args.join(" ")}`)
    reply(lang.ok())
  }
    break
  case 'setppgrup': case 'setppgc': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isBotAdmins) return reply(lang.botNotAdmin())
    if (!isGroupAdmins && !isGroupOwner && !isBotAdmins) return reply(lang.adminOnly())
    if (!quoted) return reply(lang.SetPpGc(prefix, command))
    if (!/image/.test(mime)) return reply(lang.SetPpGc(prefix, command))
    let media = await alpha.downloadAndSaveMediaMessage(quoted)
    await alpha.updateProfilePicture(groupId, { url: media }).catch((err) => fs.unlinkSync(media))
    reply(lang.ok())
  }
    break

  case 'tagall': case 'infoall':
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!(isGroupAdmins || isGroupOwner)) return reply(lang.adminOnly())
    let tekss = `══✪〘 *👥 Mention All* 〙✪══\n\n➲ *Message : ${q ? q : 'Nothing'}*\n\n`
    for (let mem of participants) {
      tekss += `🏅 @${mem.id.split('@')[0]}\n`
    }
    tekss += `\n⋙ *${botname}* ⋘`
    alpha.sendMessage(from, { text: tekss, mentions: participants.map(a => a.id) }, { quoted: fkontak })
    break
  case 'hidetag':
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!(isGroupAdmins || isGroupOwner)) return reply(lang.adminOnly())
    alpha.sendMessage(from, { text: q ? q : '', mentions: participants.map(a => a.id) }, { quoted: fkontak })
    break

  case 'kick': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isBotAdmins) return reply(lang.botNotAdmin())
    if (!(isGroupAdmins || isGroupOwner)) return reply(lang.adminOnly())
    if (!m.quoted && !text) return reply(lang.MauKick())
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    await alpha.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
  }
    break
  case 'add': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isBotAdmins) return reply(lang.botNotAdmin())
    if (!(isGroupAdmins || isGroupOwner)) return reply(lang.adminOnly())
    if (!m.quoted && !text) return reply(lang.MauAdd())
    let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    await alpha.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
  }
    break
  case 'promote': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isBotAdmins) return reply(lang.botNotAdmin())
    if (!(isGroupAdmins || isGroupOwner)) return reply(lang.adminOnly())
    if (!m.quoted && !text) return reply(lang.NakPm())
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    await alpha.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
  }
    break
  case 'demote': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isBotAdmins) return reply(lang.botNotAdmin())
    if (!(isGroupAdmins || isGroupOwner)) return reply(lang.adminOnly())
    if (!m.quoted && !text) return reply(lang.NakDm())
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    await alpha.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
  }
    break
  case 'revoke':
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isBotAdmins) return reply(lang.botNotAdmin())
    if (!(isGroupAdmins || isGroupOwner)) return reply(lang.adminOnly())
    let link = await alpha.groupRevokeInvite(from)
    await reply(lang.ok() + `\n\n*New Link for ${groupName}* :\n https://chat.whatsapp.com/${link}`)
    break
  case 'out':
    // if (!m.isGroup) return reply(lang.groupOnly())
    if (!m.key.fromMe && !isCreator) return reply(lang.ownerOnly())
    reply('Bye 👋').then(async res => await alpha.groupLeave(from))
    break
  case 'group': case 'grup':
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isBotAdmins) return reply(lang.botNotAdmin())
    if (!(isGroupAdmins || isGroupOwner)) return reply(lang.adminOnly())
    if (args[0] === 'open') {
      await alpha.groupSettingUpdate(from, 'not_announcement')
      reply(lang.ok())
    } else if (args[0] === 'close') {
      await alpha.groupSettingUpdate(from, 'announcement')
      reply(lang.ok())
    } else {
      alpha.sendButMessage(from, 'GROUP SETTING', `© ${ownername}`, [{ buttonId: 'group open', buttonText: { displayText: 'Open' }, type: 1 }, { buttonId: 'group close', buttonText: { displayText: 'Close' }, type: 1 }], { quoted: fgif })
    }
    break
  case 'afk': {
    if (!m.isGroup) return reply(lang.groupOnly())
    let user = db.data.users[m.sender]
    user.afkTime = + new Date
    user.afkReason = text
    reply(lang.TbAfk(pushname, text))
  }
    break

  case 'ping': case 'tes': case 'runtime':
    reply(`Runtime : ${runtime(process.uptime())}`)
    break

  /**
   * @endsHere
   */

  /** = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 * @Commands
 * Type of
 * @GameGuides
 *  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
 */

  case 'unreg': case 'unregister': {
    if (!db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
    if (!text) return reply(`${prefix + command} 8kapqlPnapQp`)
    if (db.data.users[m.sender].serialNumber !== args[0]) return alpha.send1ButMes(m.chat, lang.Noseri(), `© ${ownername}`, `ceksn`, 'Check SN', m)
    user.registered = false
    reply(lang.NoseriOk())
  }
    break
  case 'ceksn': case 'serialnumber': {
    if (!db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
    alpha.send1ButMes(m.chat, 'Serial Number 👇\n\n' + db.data.users[m.sender].serialNumber, `© ${ownername}`, `unreg db.data.users[m.sender].serialNumber`, 'Unreg Now', m)
  }
    break
  case 'regbeta': {
    if (db.data.users[m.sender].registered) return reply(lang.DoneReg())
    if (!text && !text.includes('|')) return reply(lang.ExReg(prefix))
    arg = args.join(' ')
    namax = arg.split('|')[0]
    umurx = arg.split('|')[1]
    genderx = arg.split('|')[2]
    hobix = arg.split('|')[3]
    if (namax.length > 15) return reply(lang.NamaReg())
    if (hobix.length > 10) return reply(lang.HobiReg())
    if (isNaN(umurx)) return reply(lang.UmurReg())
    if (parseInt(umurx) > 99) return reply(lang.UmurXReg())
    if (parseInt(umurx) < 3) return reply('Shit')
    if (!['male', 'female', 'cewe', 'cowo', 'pria', 'wanita'].includes(genderx)) return reply(lang.genderReg(lang.ExReg(prefix)))
    const cryptoRandomString = require('crypto-random-string');
    let user = db.data.users[m.sender]
    user.registered = true
    user.name = namax.trim()
    user.age = umurx
    user.gender = genderx
    user.hobi = hobix
    user.regTime = + new Date
    user.serialNumber = cryptoRandomString(20);
    alpha.sendButImage(m.chat, m.sender, [
      { buttonId: 'sewabot', buttonText: { displayText: 'Sewa Bot' }, type: 1 },
      { buttonId: '.menu', buttonText: { displayText: '✅ Command' }, type: 1 },
      { buttonId: 'rules', buttonText: { displayText: 'Rules 📝' }, type: 1 }], lang.RegReg(cryptoRandomString(20), tanggal(new Date()), namax.trim(), umurx, hobix, m.sender.split('@')[0], prefix, prefix, Object.keys(global.db.data.users).length), `© ${ownername}`, [m.sender], { quoted: m })
    // setTimeout(() => { reply('*New Register Method Available!*\nMetode Daftar secara baru tersedia!\n\nperintah _!betaregist Nama|gender|umur|hobi\n\nBantu developer untuk mengembangkan fitur ini agar User tidak perlu mendaftar ulang karena database ter reset, tengkiu') }, 5000)
  } break

  case 'daftar': case 'regist': case 'register': {
    // reply(lang.wait())
    let arg = args.join(' ')
    let name = arg.split('|')[0]
    let genders = arg.split('|')[1]
    let ages = arg.split('|')[2]
    let hobbys = arg.split('|')[3]
    let makeDate = new Date(new Date + 3600000)
    let date = makeDate.toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })
    let day = makeDate.toLocaleDateString('id', { weekday: 'long' })

    let registerDate = day + " " + date
    let serialNumber = cryptoRandomString(15)
    let phoneNumber = m.sender.split('@')[0]
    let linkPhoneNumber = 'wa.me/' + phoneNumber
    let premium = false
    let limitAwal = makeLimitAwal

    if (!text && !text.includes('|')) return reply('Contoh: daftar Budi|cowo|25|turu')
    if (name.length > 20) return reply(lang.NamaReg())
    if (hobbys.length > 20) return reply(lang.HobiReg())
    if (isNaN(ages)) return reply(lang.UmurReg())
    if (parseInt(ages) > 60) return reply("Umur lo terlalu tua buat pakai Bot ini!")
    if (parseInt(ages) < 12) return reply('Yang bener aja, bocil gausah maenan bot... nyusu aja sana')
    if (!['male', 'female', 'cewe', 'cowo', 'pria', 'wanita'].includes(genders)) return reply("Gender hanya bisa: *cewe* atau *cowo*\ncontoh: daftar Finda Bersari|cewe|17|nyanyi sambil nangis")

    let appendUsers = {
      userName: name,
      gender: genders,
      age: parseInt(ages),
      hobby: hobbys,
      userID: parseInt(phoneNumber),
      linkID: linkPhoneNumber,
      isPremium: premium,
      limit: limitAwal,
      registeredOn: registerDate,
      userSerial: serialNumber
    }

    try {
      let user_id = m.sender.split('@')[0]
      let parseId = parseInt(user_id)
      await atlasData(parseId).then(async result => {
        let user = result.userID
        if (user == parseId) { return reply("Kamu sudah terdaftar sebelumnya!, cek profilmu di *!myprofile*") };
      })
    } catch {
      MainCollection.insertOne(appendUsers,
        async (error, result) => {
          if (error) {
            return reply("error adding the data") && console.log(error);
          }
          let txt = `*Register Berhasil!*\n\n`
          txt += `Nama : ${name}\n`
          txt += `Gender : ${genders}\n`
          txt += `Umur : ${ages}\n`
          txt += `Hobi : ${hobbys}\n\n`
          txt += `ID kamu\n`
          txt += `Nomor : wa.me/${phoneNumber}\n`
          txt += `Limit Awal : ${limitAwal}\n`
          txt += `Status Premium : ${premium ? 'Yes' : 'No'}\n`
          txt += `Serials : ${serialNumber}\n`
          txt += `Kamu terdaftar pada :\n${registerDate}\n\n`
          txt += `_Thankyou for Registering!_\n\n`
          txt += `_Kamu bisa cek Profilmu lewat perintah !myprofile atau klik tombol di bawah ini_\n`
          txt += `_also tersedia penyimpanan cloud pribadi (premium user only), check at !mycloud_`
          // alpha.send1ButMes(m.chat, txt, `${foo}`, `myprofile`, `Cek Profil Saya`, m)
          alpha.sendButImage(m.chat, sender, [
            { buttonId: 'myprofile', buttonText: { displayText: 'My Profile' }, type: 1 },
            { buttonId: 'mycloud', buttonText: { displayText: 'My Cloud' }, type: 1 }],
            txt, { quoted: m })
          // setTimeout(() => { reply("Note: terdapat beberapa fitur yang belum terhubung dengan data register Kamu, jadi tidak bisa pakai fitur nya walopun Kamu udah daftar\nHarap sabar ya, Owner selagi fixing fitur tersebut, sorry for incovenience :("); }, 3000)
          console.log(result);
        })
    }
  } break

  case 'myprofile': {
    (async () => {
      let user_id = m.sender.split('@')[0]
      let parseId = parseInt(user_id)
      try {
        await atlasData(parseId).then(async result => {
          let user = result
          let txt = `*Data Diri Kamu*\n\n`
          txt += `Username : ${user.userName}\n`
          txt += `Gender : ${user.gender}\n`
          txt += `Umur : ${user.age}\n`
          txt += `Hobi : ${user.hobby}\n\n`
          txt += `Nomor : ${user.linkID}\n`
          txt += `Limit : ${user.limit}\n`
          // txt += `Status Premium : ${user.isPremium ? '🤤 Yes' : '🥺 No'}\n`
          txt += `Serials : ${user.userSerial}\n`
          txt += `Terdaftar pada :\n${user.registeredOn}`
          let txtt = "Azusa Chan"
          // command
          // reply(txt);
          alpha.send1ButMes(m.chat, txt, `${txtt}`, `mystore`, `Cek Penyimpanan Saya`, m)
        })
      } catch {
        reply(NotRegistered);
      }
    })();
  } break

  case 'makestore': {
    (async () => {
      try {
        let setUsername = args[0]
        let phoneNumber = m.sender.split('@')[0]
        let user = parseInt(phoneNumber);
        if (args.length == 0) return reply(`Contoh: ${prefix + command} Budi`)
        await atlasMakeStore(user, setUsername).then(async res => {
          let data = res
          let txt = `*Pembuatan Cloud Storage Berhasil!*\n\n`
          txt += `${data}\n\n`
          txt += `id : ${user}\n`
          txt += `username : ${setUsername}\n\n`
          txt += `Kamu sekarang bisa menambah data ke cloud, dengan perintah *!newstore [namaKey]|[data yang mau kamu simpan]*\ncontoh *!newstore nomorayah|08123456789 dan 08123456789\n_Key tidak boleh ada spasi, tetapi nomor dibolehkan, tipe Data dibebaskan bisa berupa angka/kata dan memiliki batasan panjang 1000 kata_`
          console.log(data);
          reply(txt).catch(() => { reply(lang.err()) });
        });
      } catch {
        reply(__storeHelp);
      }
    })();
  } break

  case 'newstore': {
    (async () => {
      try {
        let arg = args.join(' ')
        let Key = arg.split('|')[0]
        let Doc = arg.split('|')[1]
        let usernumber = m.sender.split('@')[0]
        let user = parseInt(usernumber);
        await atlasUseStore(user, Key, Doc).then(async data => {
          console.log(data)
          let txt = `*Sukses menambahkan Data!*\n`
          txt += `Key : ${Key}\n`
          txt += `Data : ${Doc}\n\n`
          txt += `Untuk menampilkan Data yang telah Kamu simpan bisa menggunakan perintah *!mystore* atau ketuk tombol dibawah`
          alpha.send1ButMes(m.chat, txt, `© ${ownername}`, `mystore`, `My Store`, m)
        });
      } catch {
        reply(__storeHelp);
      }
    })();
  } break
  //  nodemon zeeone.js --ignore '*.js' --ignore '*.json'
  case 'mystore': {
    (async () => {
      try {
        let usernumber = m.sender.split('@')[0]
        let user = parseInt(usernumber);
        await atlasSetStore(user).then(async result => {
          let data = result
          let dataStore = data.Store
          let txt = `*My Cloud Store*\n\n`
          txt += `User ID : ${data.userID}\n`
          txt += `Username : ${data.userName}\n\n`
          txt += `*List Key* :\n`
          for (let store of dataStore) {
            txt += `- ${store.Key ? store.Key : 'Kamu belum pernah mengupload data\nUntuk mengupload data baru gunakan perintah !newstore [Key]|[Data text yang mau kamu simpan], contoh !newstore emak|Mau beliin hadiah buat emak tercintah'}\n`
            // txt += `dibuat: ${store.Created ? store.Created : '-'}\n\n`
          }
          txt += `\n\nuntuk mengakses data bisa menggunakan perintah\n*!getstore [nama key]*`
          reply(txt).catch(() => { reply(lang.err()) });
        });
      } catch {
        reply(__storeHelp);
      }
    })();
  } break

  case 'getstore': {
    (async () => {
      try {
        let queryDoc = args[0]
        let usernumber = m.sender.split('@')[0]
        let user = parseInt(usernumber);
        let ResultDoc = await atlasGetStore(user, queryDoc);
        reply(ResultDoc).catch(() => { reply(lang.err()) });
      } catch {
        reply(__storeHelp);
      }
    })();
  } break

  case 'howtolimit': {
    let txt = __bundleLimit
    reply(txt);
  } break

  case 'setprem': case 'setpremium': {
    reply(lang.wait())
    if (!isCreator) return reply('Fitur ini hanya khusus untuk Owner sama tercintahh ...')
      (async () => {
        let setUser = args.split('@')[0]
        let setPrem = true
        await atlasUpdatePrem(setUser, setPrem)
          .then(async data => {
            let user = data
            let txt = `*Penambahan Premium Berhasil!*\n`
            txt += `Nama : ${user.userName}\n`
            txt += `ID : wa.me/${user.userID}\n`
            txt += `Status Premium : ${user.isPremium ? '🤤 Yes' : '🥺 No'}\n\n`
            txt += `Benefit Premium?\nWeekly Limit UP to 999 LIMIT!\nPremium Features access! _(soon!)_`
            reply(txt);
          })
      })();
  } break
  case 'delprem': case 'delpremium': {
    reply(lang.wait())
    if (!isCreator) return reply('Fitur ini hanya khusus untuk Owner sama tercintahh ...')
      (async () => {
        let setUser = args.split('@')[0]
        let setPrem = false
        await atlasUpdatePrem(setUser, setPrem)
          .then(async data => {
            let user = data
            let txt = `*Penghapusan Premium Berhasil!*\n`
            txt += `Nama : ${user.userName}\n`
            txt += `ID : wa.me/${user.userID}\n`
            txt += `Status Premium : ${user.isPremium ? '🤤 Yes' : '🥺 No'}\n`
            reply(txt);
          })
      })();
  } break

  case 'setlimit': {
    reply(lang.wait())
    if (!isCreator) return reply('Fitur ini hanya khusus untuk Owner sama tercintahh ...');
    (async () => {
      try {
        let arg = args.join(' ')
        let setUser = arg.split('|')[0]
        let getUser = parseInt(setUser);
        let setLimit = arg.split('|')[1]
        let getLimit = parseInt(setLimit);
        await atlasUpdate(getUser, getLimit)
        let txt = `*Change Limit Sucess!*\n\n`
        txt += `User ID : ${getUser}\n`
        txt += `Limit Changes : ${getLimit}`
        reply(txt)
      } catch {
        reply("Error!")
      }
    })();
  } break

  case 'getdatabase': {
    reply(lang.wait())
    if (!isCreator) return reply('Fitur ini hanya khusus untuk Owner sama tercintahh ...')
    MainCollection.find().toArray((error, result) => {
      if (error) {
        return reply(error);
      }
      let datas = result
      let totalData = datas.length

      let txt = `*Databse Azusa Bot*\nFrom MongoDB Atlas\nTotal : ${totalData}\n\n`
      for (let data of datas) {
        let userNum = data.userID
        let strNum = userNum.toString()
        var mainStr = strNum, vis = mainStr.slice(-4), countNum = '';
        for (var i = (mainStr.length) - 4; i > 0; i--) { countNum += '*'; }
        txt += `Nama : ${data.userName}\n`
        txt += `Gender : ${data.gender}\n`
        txt += `Umur : ${data.age}\n`
        txt += `Hobi : ${data.hobby}\n`
        txt += `Nomor : ${countNum + vis}\n`
        txt += `- - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n`
      }
      reply(txt);
    });
  } break

  case 'getmongodata': {
    reply(lang.wait())
    if (!isCreator) return reply('Fitur ini hanya khusus untuk Owner sama tercintahh ...')
    MainCollection.find().toArray((error, result) => {
      if (error) {
        return reply(error);
      }
      let datas = result
      let totalData = datas.length
      let txt = `*Databse Azusa Bot*\nFrom MongoDB Atlas\nTotal : ${totalData}\n\n`
      for (let data of datas) {
        txt += `Nama : ${data.userName}\n`
        txt += `Gender : ${data.gender}\n`
        txt += `Umur : ${data.age}\n`
        txt += `Hobi : ${data.hobby}\n`
        txt += `Nomor : ${data.linkID}\n`
        txt += `Limit : ${data.limit}\n`
        txt += `Status Premium : ${data.isPremium}\n`
        txt += `Terdaftar Pada Tanggal :\n${data.registeredOn}\n`
        txt += `- - - - - - - - - - - - - - - - - - - - - - - - - - -\n`
      }
      reply(txt);
    });
  } break

  case 'statistic': {
    (async () => {
      await totalData().then((result, error) => {
        if (error) {
          return reply(error)
        };
        let data = result
        let txt = `Total sticker processed : ${data}`
        reply(txt);
      })
    })();
  } break

  case 'guide': case 'panduan': {
    reply(lang.wait())
    let txt = __userGuide
    let thumb = 'https://raw.githubusercontent.com/rizzzky78/rizzzkyRepo/main/profile/azusa-main.jpg'
    await sendFileFromUrl(from, thumb, txt, m)
  } break

  case 'help': case 'panel': case 'menu': {
    try {
      hit_total = await fetchJson('https://api.countapi.xyz/hit/api-alphabot.herokuapp.com/visits')
    } catch {
      hit_total = {
        value: "-"
      }
    }
    hitall = `${hit_total.value == undefined ? '-' : hit_total.value}`
    let bio = await alpha.getBio(m.sender)
    let { exp, limit, level, money, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let dnew = new Date(new Date + 3600000)
    let user = db.data.users[m.sender]
    let week = dnew.toLocaleDateString('id', { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(dnew / 84600000) % 5]
    let date = dnew.toLocaleDateString('id', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat('id' + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(dnew)
    //Creator : @${ownernya.split('@')[0]}
    let ownernya = ownernomer + '@s.whatsapp.net'
    var ini_anu = `Hi ${user.name}
  
  ╭─❒ 「 Bot Info 」 
  ├ Creator :  @Rizu
  ├ Powered  : @${ini_mark.split('@')[0]}
  ├ Prefix :   ${prefix}
  ├ Speed : ${latensii.toFixed(4)} Second
  ├ Hit today : ${hit_today.length}
  ├ Memory Used : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
  ├ Hostname : ${os.hostname()}
  ├ Platform : ${os.platform()}
  ├ Private chat : ${(Object.keys(db.data.chats).filter(v => v.endsWith('@s.whatsapp.net')).map(v => v).length)}
  ├ Group chat : ${(Object.keys(db.data.chats).filter(v => v.endsWith('@g.us')).map(v => v).length)}
  ├ Total chats :  ${(Object.keys(db.data.chats).filter(v => v.endsWith('@s.whatsapp.net')).map(v => v).length) + (Object.keys(db.data.chats).filter(v => v.endsWith('@g.us')).map(v => v).length)} 
  ├ Runtime : ${runtime(process.uptime())}
  ╰❒ 
  
  ╭─❒ 「 Date Info 」 
  ├ Masehi : ${week}, ${date}
  ├ Hijriah : ${dateIslamic}
  ╰❒
  
  ╭─❒ 「 Additional Info 」 
  ├ Alternatif List Menu & Panduan Bot
  ├ *!semuamenu*
  ├ *!panduan*
  ╰❒
  `
    /*
    ├ Total hit : ${hitall}.
    ├ User In Database : ${Object.keys(global.db.data.users).length} Users
    ├ User Registered : ${(Object.values(global.db.data.users).filter(user => user.registered == true).length)}
    ╭─❒ 「 User Info 」 
    ├ Register: ${user.registered ? `✅\n├ Name : ${user.name}\n├ Age : ${user.age} years\n├ Gender : ${user.gender}\n├ Hobby : ${user.hobi}\n├ Registered on : ${tanggal(user.regTime)}` : '❌'}
    ├ Bio : ${bio}
    ├ Nomor : @${m.sender.split('@')[0]}
    ├ Limit : ${limit} limit
    ├ XP : ${exp}
    ├ Premium : ${isPremium ? '✅' : '❌'}
    ├ Me : ${m.key.fromMe ? 'True' : 'False'}
    ╰❒ Owner : ${isCreator ? 'True' : `False`}
    */
    const buttojns = [
      { buttonId: 'command', buttonText: { displayText: '📖 List Menu' }, type: 1 },
      { buttonId: 'owner', buttonText: { displayText: '🙍‍♂️ Owner' }, type: 1 },
      { buttonId: 'howtolimit', buttonText: { displayText: '💰 Buy Limit' }, type: 1 }
    ]
    if (typemenu == 'document') {
      if (db.data.users[m.sender].registered) {
        alpha.sendButDoC(m.chat, ini_anu, '© ' + ownername, botname, ownername, `WhatsApp Bot Multi Device`, time, pp_bot, pp_bot, buttojns, [ownernya, ini_mark, m.sender], { quoted: ftroli })
      } else alpha.sendButDoc(m.chat, ini_anu, '© ' + ownername, botname, ownername, `WhatsApp Bot Multi Device`, time, pp_bot, pp_bot, buttojns, [ownernya, ini_mark, m.sender], { quoted: ftroli })
    }
    if (typemenu == 'templateLocation') {
      await alpha.send5ButLoc(m.chat, lang.menunya(salam, pushname, botname), `© ${ownername}`, pp_bot, [{ "urlButton": { "displayText": "Sewa Bot -> Chat Owner", "url": `${youtube}` } }, { "urlButton": { "displayText": "WebSite", "url": `${myweb}` } }, { "quickReplyButton": { "displayText": "Donasi", "id": 'donate' } }, { "quickReplyButton": { "displayText": "Owner", "id": 'owner' } }, { "quickReplyButton": { "displayText": "List Command", "id": 'command' } }], { userJid: m.chat, quoted: m })
    }
    if (typemenu == 'templateTenor') {
      alpha.send5ButGif(m.chat, lang.menunya(salam, pushname, botname), `© ${ownername}`, pp_bot, [{ "urlButton": { "displayText": "Sewa Bot -> Chat Owner", "url": `${youtube}` } }, { "urlButton": { "displayText": "WebSite", "url": `${myweb}` } }, { "quickReplyButton": { "displayText": "Donasi", "id": 'donate' } }, { "quickReplyButton": { "displayText": "Owner", "id": 'owner' } }, { "quickReplyButton": { "displayText": "List Command", "id": 'command' } }], { quoted: m })
    }
    if (typemenu == 'katalog') {
      alpha.sendKatalog(m.chat, "ALL MENU BOT", lang.listMenu(time, salam, pushname, prefix), pp_bot, { quoted: m })
    }
    if (typemenu == 'katalog2') {
      alpha.sendKatalog2(m.chat, "ALL MENU BOT", lang.listMenu(time, salam, pushname, prefix), pp_bot, { quoted: m })
    }
    if (typemenu == 'list') {
      alpha.sendListMenu(m.chat, `╭─⬣「 _*INFO USER*_ 」⬣\n│  *Name* : ${pushname}\n│  *Number* : ${sender.split("@")[0]}\n│  *Status* : ${isCreator ? ` Owner️ ${botname}` : `User ${botname}`}\n╰─⬣\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : ${ownername}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣\n\n╭─⬣「 _*INDONESIAN TIME*_ 」⬣\n│ *Wib* : ${time}\n│ *Wita* : ${wita}\n│ *Wit* : ${wit}  \n╰─⬣`, `© ${ownername}`, `Selamat ${salam} ${pushname} ☺️`, `CLICK HERE`, { quoted: fgif })
    }
  }
    break
  case 'allmenu': {
    await alpha.send5ButLoc(from, `Hai kak ${pushname} 👋, saya *${botname}* ` + '\n\n' + lang.listMenu(time, salam, pushname, prefix), `© ${ownername}`, pp_bot, [
      { "quickReplyButton": { "displayText": "Sewa Bot", "id": 'sewaBot' } },
      { "quickReplyButton": { "displayText": "Owner", "id": 'owner' } },
      { "quickReplyButton": { "displayText": "Rules", "id": 'rules' } }
    ])
  }
    break
  case 'allmenux': {
    await alpha.sendButImg(from, pp_bot, `Hai kak ${pushname} 👋, saya *${botname}* ` + '\n\n' + lang.listMenu(time, salam, pushname, prefix), `© ${ownername}`, [
      { "quickReplyButton": { "displayText": "Sewa Bot", "id": 'sewaBot' } },
      { "quickReplyButton": { "displayText": "Owner", "id": 'owner' } },
      { "quickReplyButton": { "displayText": "Rules", "id": 'rules' } }
    ])
  } break

  case 'infocmd': case 'infomenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.info(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'storecmd': case 'storemenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.storemenu(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'rpgcmd': case 'rpgmenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.rpgmenu(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'storagecmd': case 'storagemenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.storagemenu(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'voicecmd': case 'voicemenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.voiceChange(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'anoncmd': case 'anonmenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.anonchat(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'ownercmd': case 'ownermenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.ownermenu(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'databasecmd': case 'databasemenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.database(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'groupcmd': case 'groupmenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.group(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'animecmd': case 'animemenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.anime(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'tagcmd': case 'tagmenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.tag(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'stalkcmd': case 'stalkmenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.stalk(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'searchcmd': case 'searchmenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.search(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'convertercmd': case 'convertmenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.converter(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'stickercmd': case 'stickermenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.effect(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'stickercmd2': case 'stickermenu2': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.effect2(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'downloadercmd': case 'downloadmenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.download(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'ranimecmd': case 'animemenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.ranime(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'nsfwcmd': case 'nsfwcommand': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.nsfw(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'textprocmd': case 'textpromenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.textpro(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'othercmd': case 'othermenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.other(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'gamecmd': case 'gamemenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.game(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'soundcmd': case 'soundmenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.soundmenu(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'logocmd': case 'logomenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.logomenu(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'islamcmd': case 'islammenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.islammenu(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'asupancmd': case 'asupanmenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.asupan(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'cecancmd': case 'cecanmenu': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.cecan(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'primbonmenu': case 'primboncmd': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.primbonmenu(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'telestc': case 'telecmd': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.stcmenu(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'ephotomenu': case 'ephotocmd': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.ephotomenu(prefix), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  case 'thanksto': case 'tqto': {
    alpha.sendButImage(m.chat, sender,
      [{
        buttonId: '.command', buttonText: { displayText: '༺ Back' }, type: 1
      },
      {
        buttonId: 'owner', buttonText: { displayText: 'Owner ༻' }, type: 1
      }], `Selamat ${salam} @${sender.split('@')[0]} 😊\n\n╭─⬣「 _*INFO BOT*_ 」⬣\n│ *Prefix* :  ${prefix} \n│ *Name* : ${botname}\n│ *Owner* : @${ownernomer.split("@")[0]}\n│ *Mode* : ${alpha.public ? 'Public-Mode' : 'Self-Mode'}\n│ *Runtime* : ${runtime(process.uptime())}\n│ *Lib* : Baileys-Md@4.0.0\n╰─⬣` + '\n\n' + lang.tqto(), `© ${ownername}`, [sender, ownernomer + '@s.whatsapp.net'], { quoted: m })
  } break

  /**
   * @endsHere
   */

  /** = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 * @Commands
 * Type of
 * @Custom
 *  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
 */

  case 'nick': {
    alpha.sendButMessage(from, 'Silahkan ketuk tombol di bawah\nBuat yg udh pake nick dan udh ngajuin, nanti otomatis di acc sama vice/admiral\n\njgn lupass profil kirim ke grub stlh pake nick ya.. kalo enggak nanti mimpimu disepong Dina chan sampe kering... hihihi', `© ${ownername}`, [
      { buttonId: 'ambilidarmada', buttonText: { displayText: 'Salin ID Armada' } },
      { buttonId: 'ambilnick', buttonText: { displayText: 'Salin Nick' } }])
  } break
  //await alpha.send5ButImg(from, lang.armada(prefix), `© ${ownername}`,gem, butNick , { userJid: m.chat, quoted: m })
  case 'ambilnick': {
    let iniNick = "H᭄ꦿ• YourNick"
    alpha.sendText(m.chat, iniNick, m)
  } break
  case 'ambilidarmada': {
    let iniIDArmada = "1051147"
    alpha.sendText(m.chat, iniIDArmada, m)
  } break

  case 'changelog': {
    let thumb = 'https://raw.githubusercontent.com/rizzzky78/rizzzkyRepo/main/shoujoBot1.0/picture/shirasu_azusa.png'
    let txt = __changelog
    await sendFileFromUrl(from, thumb, txt, m)
  } break

  case 'donasi': case 'donate': {
    reply(lang.wait())
    let thumb = saweria
    await sendFileFromUrl(from, thumb, lang.tos(ownernomer), m)
    setTimeout(() => {
      alpha.send1ButMes(m.chat, 'Dashboard Donasi\nLihat siapa saja yang sudah mendukung Bot ini\nTengkiu,...',
        `© ${ownername}`, `dashboarddonasi`, `Supporter Bot`, m)
    }, 4000)
  } break

  case 'dashboarddonasi': case 'boarddonasi': case 'listdonasi': {
    reply(lang.wait())
    let thumb = 'https://raw.githubusercontent.com/rizzzky78/rizzzkyRepo/main/profile/azusa-main.jpg'
    let txt = __myDonationsBoards
    await sendFileFromUrl(from, thumb, txt, m)
  } break

  case 'semuamenu': {
    reply(lang.wait())
    let thumb = 'https://raw.githubusercontent.com/rizzzky78/rizzzkyRepo/main/profile/azusa-main.jpg'
    await sendFileFromUrl(from, thumb, lang.listMenu(time, salam, pushname, prefix), m)
  } break

  case 'rules': {
    let gam = await getBuffer(picak + 'Terms and Conditions')
    var but = [
      {
        "urlButton": {
          "displayText": "Website",
          "url": `${myweb}`
        }
      }
    ]
    await alpha.send5ButImg(from, lang.rules(prefix), `© ${ownername}`, gam, but, { userJid: m.chat, quoted: m })
  } break
  case 'sewabot': {
    let gum = await getBuffer(picak + 'Sewa Bot')
    var but = [
      {
        "urlButton": {
          "displayText": "Chat Owner",
          "url": `${youtube}`
        }
      }
    ]
    await alpha.send5ButImg(from, lang.sewaBot(prefix), `© ${ownername}`, gum, but, { userJid: m.chat, quoted: m })
  } break

  case 'random50': {
    let ran50 = Math.floor((Math.random() * 50) + 1);
    let timerSay = 'Selamat bagi yang memilih angka tersebut,\njika tidak ada angka yang cocok silahkan gunakan perintah random number lagi.'
    setTimeout(() => { reply('Random Number -- diantara angka 0 sampai ..') }, 3000);
    setTimeout(() => { reply('Angka akan muncul dalam waktu...') }, 6000);
    setTimeout(() => { reply('Kurang dari ... 5 detik') }, 9000);
    setTimeout(() => { reply('Kurang dari ... 4 detik') }, 12000);
    setTimeout(() => { reply('Kurang dari ... 3 detik') }, 15000);
    setTimeout(() => { reply('Kurang dari ... 2 detik') }, 18000);
    setTimeout(() => { reply('Kurang dari ... 1 detik') }, 21000);
    setTimeout(() => { reply('Angka yang muncul adalah angka...') }, 24000);
    let txt = `Angka *${ran50}*`
    setTimeout(() => {
      reply(txt)
    }, 27000);
    setTimeout(() => {
      reply(timerSay)
    }, 28000);
  } break

  case 'random100': {
    let ran100 = Math.floor((Math.random() * 100) + 1);
    let timerSay = 'Selamat bagi yang memilih angka tersebut,\njika tidak ada angka yang cocok silahkan gunakan perintah random number lagi.'
    setTimeout(() => { reply('Random Number -- diantara angka 0 sampai ..') }, 3000);
    setTimeout(() => { reply('Angka akan muncul dalam waktu...') }, 6000);
    setTimeout(() => { reply('Kurang dari ... 5 detik') }, 9000);
    setTimeout(() => { reply('Kurang dari ... 4 detik') }, 12000);
    setTimeout(() => { reply('Kurang dari ... 3 detik') }, 15000);
    setTimeout(() => { reply('Kurang dari ... 2 detik') }, 18000);
    setTimeout(() => { reply('Kurang dari ... 1 detik') }, 21000);
    setTimeout(() => { reply('Angka yang muncul adalah angka...') }, 24000);
    let txt = `Angka *${ran100}*`
    setTimeout(() => {
      reply(txt)
    }, 27000);
    setTimeout(() => {
      reply(timerSay)
    }, 28000);
  } break

  case 'random200': {
    let ran200 = Math.floor((Math.random() * 200) + 1);
    let timerSay = 'Selamat bagi yang memilih angka tersebut,\njika tidak ada angka yang cocok silahkan gunakan perintah random number lagi.'
    setTimeout(() => { reply('Random Number -- diantara angka 0 sampai ..') }, 3000);
    setTimeout(() => { reply('Angka akan muncul dalam waktu...') }, 6000);
    setTimeout(() => { reply('Kurang dari ... 5 detik') }, 9000);
    setTimeout(() => { reply('Kurang dari ... 4 detik') }, 12000);
    setTimeout(() => { reply('Kurang dari ... 3 detik') }, 15000);
    setTimeout(() => { reply('Kurang dari ... 2 detik') }, 18000);
    setTimeout(() => { reply('Kurang dari ... 1 detik') }, 21000);
    setTimeout(() => { reply('Angka yang muncul adalah angka...') }, 24000);
    let txt = `Angka *${ran200}*`
    setTimeout(() => {
      reply(txt)
    }, 27000);
    setTimeout(() => {
      reply(timerSay)
    }, 28000);
  } break

  case 'budi': {
    alpha.send1ButMes(m.chat, 'Yg ngeklik kayak Kontol', `© ${ownername}`, `inibudi`, `Pecahkan Biji Budi`, m)
  } break
  case 'inibudi': {
    setTimeout(() => { reply('Mengeluarkan Budi dalam hitung waktu mundur...') }, 1000)
    setTimeout(() => { reply('dalam waktu...') }, 3000)
    setTimeout(() => { reply('Tiga - 3') }, 5000)
    setTimeout(() => { reply('Dua - 2') }, 7000)
    setTimeout(() => { reply('Satu - 1') }, 9000)
    setTimeout(() => { reply('Bakso kontol Bakso Kontol........') }, 20000)
    setTimeout(() => { reply('Kamu Nanya ????????????') }, 23000)
    let users = m.sender.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    setTimeout(() => {
      //alpha.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      reply('Eitsss, kagak gw kick yee :)')
    }, 25000)
    setTimeout(() => { reply('Apaansih cok, gajelas bet\n...humphh >///<') }, 27000)
  } break

  /**
   * @endsHere
   */

  /** = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
* @Commands
* Type of
* @ImageProcess
*  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
*/

  case 'toimage': case 'toimg': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))*/
    /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!quoted) return reply(lang.NoToImg())
    if (!/webp/.test(mime)) return reply(lang.NoToImg())
    reply(lang.wait())
    let media = await alpha.downloadAndSaveMediaMessage(quoted)
    let ran = await getRandom('.png')
    exec(`ffmpeg -i ${media} ${ran}`, (err) => {
      fs.unlinkSync(media)
      if (err) return reply(lang.ToimgErr())
      let buffer = fs.readFileSync(ran)
      alpha.sendMessage(m.chat, { image: buffer }, { quoted: m })
      fs.unlinkSync(ran)
    })
    /*db.data.users[m.sender].limit -= 1*/
  } break

  case 'stikerin': case 'sticker': case 'stiker': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          // --- command here -- start
          if (!quoted) return reply(lang.NoToStik(prefix, command))
          if (/image/.test(mime)) {
            let media = await quoted.download()
            let encmedia = await alpha.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
            await fs.unlinkSync(encmedia)
            reply("_-1 limit digunakan..._")
          } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11) return reply(lang.NoToStik(prefix, command))
            let media = await quoted.download()
            let encmedia = await alpha.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
            await fs.unlinkSync(encmedia)
            reply("_-1 limit digunakan..._")
          } else { reply(lang.NoToStik(prefix, command)) }
          // --- command here -- end

          let getChange = await value - 1; await atlasUpdate(getID, getChange);

          await atlasGetTotalCmd("sticker").then(async datas => {
            let result = datas; let value = await result.value; let valueChanges = await value + 1;
            await atlasUpdateTotalCmd("sticker", valueChanges).then(async result => { console.log(result) });
          });
        });
      } catch {
        return reply(NotRegistered);
      }
    })();
  } break

  case 'take': case 'wm': {
    if (!quoted) return reply(lang.NoToStik(prefix, command))
    if (!text) return reply(lang.NoWm(prefix, command))
    if (!text.includes('|')) return reply(lang.NoWm(prefix, command))
    if (/image/.test(mime)) {
      let media = await quoted.download()
      let encmedia = await alpha.sendImageAsSticker(m.chat, media, m, { packname: text.split("|")[0], author: text.split("|")[1] })
      await fs.unlinkSync(encmedia)
    } else if (/video/.test(mime)) {
      if ((quoted.msg || quoted).seconds > 11) return reply(lang.NoToStik(prefix, command))
      let media = await quoted.download()
      let encmedia = await alpha.sendVideoAsSticker(m.chat, media, m, { packname: text.split("|")[0], author: text.split("|")[1] })
      await fs.unlinkSync(encmedia)
    } else { reply(lang.NoToStik(prefix, command)) }
  } break

  /**
   * @endsHere
   */

  /** = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
* @Commands
* Type of
* @Quiz
*  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
*/

  case 'tebakgambar': {
    if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    alpha.sendMedia(m.chat, result.img, '', m, { caption: lang.TbGambar(result.deskripsi, '60s') }).then(() => {
      console.log("Jawaban: " + result.jawaban)
      tebakgambar[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
    })
    await sleep(60000)
    if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) {
      alpha.sendButtonText(m.chat, [{ buttonId: 'tebakgambar', buttonText: { displayText: lang.TbGam() }, type: 1 }], lang.TbGambar_(result.jawaban), `© ${ownername}`, m)
      delete tebakgambar[m.sender.split('@')[0]]
    }
  } break
  case 'tebakkata': {
    if (tebakkata.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    alpha.sendText(m.chat, lang.TbKata(result.soal, '60s'), m).then(() => {
      console.log("Jawaban: " + result.jawaban)
      tebakkata[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
    })
    await sleep(60000)
    if (tebakkata.hasOwnProperty(m.sender.split('@')[0])) {
      alpha.sendButtonText(m.chat, [{ buttonId: 'tebakkata', buttonText: { displayText: lang.TbKa() }, type: 1 }], lang.TbGambar_(result.jawaban), `© ${ownername}`, m)
      delete tebakkata[m.sender.split('@')[0]]
    }
  } break
  case 'tebakbendera': {
    if (tebakbendera.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    alpha.sendMedia(m.chat, result.img, '', m, { caption: lang.TbBendera('60s') }).then(() => {
      console.log("Jawaban: " + result.name)
      tebakbendera[m.sender.split('@')[0]] = result.name.toLowerCase()
    })
    await sleep(60000)
    if (tebakbendera.hasOwnProperty(m.sender.split('@')[0])) {
      alpha.sendButtonText(m.chat, [{ buttonId: 'tebakbendera', buttonText: { displayText: lang.TbBe() }, type: 1 }], lang.TbGambar_(result.name), `© ${ownername}`, m)
      delete tebakbendera[m.sender.split('@')[0]]
    }
  } break
  case 'tebakkalimat': {
    if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkalimat.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    alpha.sendText(m.chat, lang.TbKata(result.soal, '60s'), m).then(() => {
      console.log("Jawaban: " + result.jawaban)
      tebakkalimat[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
    })
    await sleep(60000)
    if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) {
      alpha.sendButtonText(m.chat, [{ buttonId: 'tebakkalimat', buttonText: { displayText: lang.TbAt() }, type: 1 }], lang.TbGambar_(result.jawaban), `© ${ownername}`, m)
      delete tebakkalimat[m.sender.split('@')[0]]
    }
  } break
  case 'tebaksiapa': {
    if (siapaaku.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    alpha.sendText(m.chat, lang.TbKata(result.soal, '60s'), m).then(() => {
      console.log("Jawaban: " + result.jawaban)
      siapaaku[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
    })
    await sleep(60000)
    if (siapaaku.hasOwnProperty(m.sender.split('@')[0])) {
      alpha.sendButtonText(m.chat, [{ buttonId: 'tebaksiapa', buttonText: { displayText: lang.TbSi() }, type: 1 }], lang.TbGambar_(result.jawaban), `© ${ownername}`, m)
      delete siapaaku[m.sender.split('@')[0]]
    }
  } break
  case 'tebakkabupaten': {
    if (tebakkabupaten.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkabupaten.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    alpha.sendImage(m.chat, result.url, lang.TbKabupaten('60s'), m).then(() => {
      console.log("Jawaban: " + result.title)
      tebakkabupaten[m.sender.split('@')[0]] = result.title.toLowerCase()
    })
    await sleep(60000)
    if (tebakkabupaten.hasOwnProperty(m.sender.split('@')[0])) {
      alpha.sendButtonText(m.chat, [{ buttonId: 'tebakkabupaten', buttonText: { displayText: lang.TbEn() }, type: 1 }], lang.TbGambar_(result.title), `© ${ownername}`, m)
      delete tebakkabupaten[m.sender.split('@')[0]]
    }
  } break
  case 'tebakkimia': {
    if (tebakkimia.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    alpha.sendText(m.chat, lang.TbKimia(result.lambang, '60s'), m).then(() => {
      console.log("Jawaban: " + result.unsur)
      tebakkimia[m.sender.split('@')[0]] = result.unsur.toLowerCase()
    })
    await sleep(60000)
    if (tebakkimia.hasOwnProperty(m.sender.split('@')[0])) {
      alpha.sendButtonText(m.chat, [{ buttonId: 'tebakkimia', buttonText: { displayText: lang.TbKi() }, type: 1 }], lang.TbGambar_(result.unsur), `© ${ownername}`, m)
      delete tebakkimia[m.sender.split('@')[0]]
    }
  } break
  case 'tebaklirik': {
    if (tebaklirik.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    alpha.sendText(m.chat, lang.TbLirik(result.soa, '60s'), m).then(() => {
      alpha.sendButtonText(m.chat, [{ buttonId: 'tebaklirik', buttonText: { displayText: lang.TbLi() }, type: 1 }], lang.TbGambar_(result.jawaban), `© ${ownername}`, m)
      tebaklirik[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
    })
    await sleep(60000)
    if (tebaklirik.hasOwnProperty(m.sender.split('@')[0])) {
      reply(lang.TbGambar_(result.jawaban))
      delete tebaklirik[m.sender.split('@')[0]]
    }
  } break
  case 'tebaktebakan': {
    if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    alpha.sendText(m.chat, lang.TbKata(result.soal, '60s'), m).then(() => {
      console.log("Jawaban: " + result.jawaban)
      tebaktebakan[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
    })
    await sleep(60000)
    if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0])) {
      alpha.sendButtonText(m.chat, [{ buttonId: 'tebak tebakan', buttonText: { displayText: lang.TbKan() }, type: 1 }], lang.TbGambar_(result.jawaban), `© ${ownername}`, m)
      delete tebaktebakan[m.sender.split('@')[0]]
    }
  } break
  case 'caklontong': {
    reply('Maintenance')/*
if (caklontong.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
let anu = await fetchJson('https://fatiharridho.my.id/database/games/caklontong.json')
let result = anu[Math.floor(Math.random() * anu.length)]
alpha.sendText(m.chat, lang.TbKata(result.soal, '60s'), m).then(() => {
console.log("Jawaban: " + result.jawaban)


caklontong[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
})
await sleep(60000)
if (caklontong.hasOwnProperty(m.sender.split('@')[0])) {
alpha.sendButtonText(m.chat, [{ buttonId: 'caklontong', buttonText: { displayText: lang.TbCak() }, type: 1 }], lang.TbGambar__(result.jawaban, result.deskripsi) , `© ${ownername}`, m)
delete caklontong[m.sender.split('@')[0]]
}*/
  } break

  case 'susunkata': {
    if (susunkata.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    alpha.sendText(m.chat, lang.TbSusun(result.soal, result.tipe, '60s'), m).then(() => {
      console.log("Jawaban: " + result.jawaban)
      susunkata[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
    })
    await sleep(60000)
    if (susunkata.hasOwnProperty(m.sender.split('@')[0])) {
      alpha.sendButtonText(m.chat, [{ buttonId: 'susunkata', buttonText: { displayText: lang.TbSu() }, type: 1 }], lang.TbGambar_(result.jawaban), `© ${ownername}`, m)
      delete susunkata[m.sender.split('@')[0]]
    }
  } break

  case 'kuismath': case 'math': {
    if (kuismath.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
    let { genMath, modes } = require('./lib/math')
    if (!text) return reply(lang.TbMath(Object.keys(modes).join(' | '), prefix, command))
    let result = await genMath(text.toLowerCase())
    alpha.sendText(m.chat, lang.TbMath_(result.soal.toLowerCase(), (result.waktu / 1000).toFixed(2)), m).then(() => {
      console.log("Jawaban: " + result.jawaban)
      kuismath[m.sender.split('@')[0]] = [result.jawaban, result.hadiah]
    })
    await sleep(result.waktu)
    if (kuismath.hasOwnProperty(m.sender.split('@')[0])) {
      reply(lang.TbGambar_(result.jawaban))
      delete kuismath[m.sender.split('@')[0]]
    }
  } break

  case 'tekateki': {
    if (tekateki.hasOwnProperty(m.sender.split('@')[0])) return reply(lang.Family())
    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json')
    let result = anu[Math.floor(Math.random() * anu.length)]
    alpha.sendText(m.chat, lang.TbKata(result.soal, '60s'), m).then(() => {
      console.log("Jawaban: " + result.jawaban)
      tekateki[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
    })
    await sleep(60000)
    if (tekateki.hasOwnProperty(m.sender.split('@')[0])) {
      alpha.sendButtonText(m.chat, [{ buttonId: 'tekateki', buttonText: { displayText: lang.Tbte() }, type: 1 }], lang.TbGambar_(result.jawaban), `© ${ownername}`, m)
      delete tekateki[m.sender.split('@')[0]]
    }
  } break

  /**
   * @endsHere
   */

  /** = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 * @Commands
 * Type of
 * @MyFeatures
 *  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
 */

  case 'randomhentai': case 'chiisaihentai': case 'trap': case 'blowjob': case 'yaoi': case 'ecchi': case 'hentai': case 'ahegao': case 'hololewd':
  case 'sideoppai': case 'animefeets': case 'animebooty': case 'animethighss': case 'hentaiparadise': case 'animearmpits': case 'hentaifemdom': case 'lewdanimegirls':
  case 'biganimetiddies': case 'animebellybutton': case 'hentai4everyone': case 'neko': case 'waifu': case 'loli': case 'milf': {

    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = await result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let captx = ['Tuh dasar wibu sangean', 'Done kack', 'Tuh kack', 'Jangan lupa bilang makasih kack..']
          let capt = captx[Math.floor(Math.random() * (captx.length))]
          let thisLewd = (`https://api.lolhuman.xyz/api/random/nsfw/${command}?apikey=${lol}`)
          const buttons = [
            { buttonId: 'randomlewdgen1', buttonText: { displayText: 'Random Lewd 1' }, type: 1 },
            { buttonId: 'randomlewdgen2', buttonText: { displayText: 'Random Lewd 2' }, type: 1 },
          ]
          const buttonMessage = {
            image: { url: thisLewd },
            caption: capt,
            footer: ownername,
            buttons: buttons,
            headerType: 4
          }
          await alpha.sendMessage(m.chat, buttonMessage, { quoted: m }).catch((err) => { reply(lang.err()) })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'randomhentai2': case 'bj': case 'ero': case 'cum': case 'feet': case 'yuri': case 'trap': case 'lewd': case 'feed': case 'eron': case 'solo':
  case 'gasm': case 'poke': case 'anal': case 'holo': case 'tits': case 'kuni': case 'kiss': case 'erok': case 'smug': case 'baka': case 'solog':
  case 'feetg': case 'lewdk': case 'waifu': case 'pussy': case 'femdom': case 'cuddle': case 'hentai': case 'eroyuri': case 'cum_jpg':
  case 'blowjob': case 'erofeet': case 'holoero': case 'classic': case 'erokemo': case 'fox_girl': case 'futanari': case 'lewdkemo': case 'wallpaper':
  case 'pussy_jpg': case 'kemonomimi': case 'nsfw_avatar': case 'lewd': case 'keta': case 'femdom': case 'futanari': case 'anal': {

    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let captx = ['Tuh dasar wibu sangean', 'Done kack', 'Tuh kack', 'Jangan lupa bilang makasih kack..']
          let capt = captx[Math.floor(Math.random() * (captx.length))]
          let thisLewd = await (`https://api.lolhuman.xyz/api/random2/${command}?apikey=${lol}`)
          const buttons = [
            { buttonId: 'randomlewdgen1', buttonText: { displayText: 'Random Lewd 1' }, type: 1 },
            { buttonId: 'randomlewdgen2', buttonText: { displayText: 'Random Lewd 2' }, type: 1 },
          ]
          const buttonMessage = {
            image: { url: thisLewd },
            caption: capt,
            footer: ownername,
            buttons: buttons,
            headerType: 4
          }
          await alpha.sendMessage(m.chat, buttonMessage, { quoted: m }).catch((err) => { reply(lang.err()) })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'randomlewdgen1': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let selectedLewd = RandomLewd_type1[Math.floor(Math.random() * (RandomLewd_type1.length))]
          let thisLewd = (`https://api.lolhuman.xyz/api/random/nsfw/${selectedLewd}?apikey=${lol}`)
          const buttons = [
            { buttonId: 'randomlewdgen1', buttonText: { displayText: 'Random Lewd 1' }, type: 1 },
            { buttonId: 'randomlewdgen2', buttonText: { displayText: 'Random Lewd 2' }, type: 1 },
          ]
          const buttonMessage = {
            image: { url: thisLewd },
            caption: `*${selectedLewd}*\n\nKetuk tombol di bawah untuk me-request gambar lewd secara acak.`,
            footer: ownername,
            buttons: buttons,
            headerType: 4
          }

          await alpha.sendMessage(m.chat, buttonMessage, { quoted: m }).catch(() => {
            alpha.send1ButMes(m.chat, 'Yahh terjadi Error kak :(', `© ${ownername}`, `randomlewdgen1`, `Coba Lagi`, m)
          });
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'randomlewdgen2': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let selectedLewd = RandomLewd_type2[Math.floor(Math.random() * (RandomLewd_type2.length))]
          let thisLewd = (`https://api.lolhuman.xyz/api/random/nsfw/${selectedLewd}?apikey=${lol}`)
          const buttons = [
            { buttonId: 'randomlewdgen1', buttonText: { displayText: 'Random Lewd 1' }, type: 1 },
            { buttonId: 'randomlewdgen2', buttonText: { displayText: 'Random Lewd 2' }, type: 1 },
          ]
          const buttonMessage = {
            image: { url: thisLewd },
            caption: `*${selectedLewd}*\n\nKetuk tombol di bawah untuk me-request gambar lewd secara acak.`,
            footer: ownername,
            buttons: buttons,
            headerType: 4
          }
          await alpha.sendMessage(m.chat, buttonMessage, { quoted: m }).catch(() => {
            alpha.send1ButMes(m.chat, 'Yahh terjadi Error kak :(', `© ${ownername}`, `randomlewdgen2`, `Coba Lagi`, m)
          });
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break


  case 'waifuu': case 'art': case 'bts': case 'exo': case 'elf': case 'loli': case 'shota': case 'husbu': case 'sagiri':
  case 'shinobu': case 'megumin': case 'wallnime': {

    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let anu1 = `Nih kack, jangan lupa bilang makasih...`
          let queryanu = await (`https://api.lolhuman.xyz/api/random/${command}?apikey=${lol}`)
          await sendFileFromUrl(from, queryanu, anu1, m).catch((err) => { reply(lang.err()) })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'nhentaisearch': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          if (args.length == 0) return reply(`Contoh: ${prefix + command} Budi`)
          let query = args.join(" ")
          reply(lang.wait())
          await fetchJson(`https://api.lolhuman.xyz/api/nhentaisearch?apikey=${lol}&query=${query}`)
            .then(async nhSearch => {
              thisResult = nhSearch.result
              let ini_txt = "Result : \n"
              for (var x of thisResult) {
                ini_txt += `Id : #${x.id}\n`
                ini_txt += `Title English : ${x.title_english}\n`
                ini_txt += `Title Japanese : ${x.title_japanese}\n`
                ini_txt += `Native : ${x.title_native}\n`
                ini_txt += `Upload : ${x.date_upload}\n`
                ini_txt += `Page : ${x.page}\n`
                ini_txt += `Favourite : ${x.favourite}\n\n`
                ini_txt += `- - - \n`
              }
              azusa.sendText(m.chat, ini_txt, m).catch((err) => { reply(lang.err()) })
            })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'nhentaipdf': case 'nhpdf': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          if (args.length == 0) return reply(`Contoh: ${prefix + command} 12345`)
          reply(lang.wait())
          let henid = args[0]
          await fetchJson(`https://api.lolhuman.xyz/api/nhentaipdf/${henid}?apikey=${lol}`)
            .then(async getResult => {
              // async API source
              var getResult = getResult.result
              try {
                await sendFileFromUrl(from, getResult, { mimetype: document, filename: `${henid}.pdf` }, m)
                reply('Done kack!')
              } catch {
                await sendFileFromUrl(from, getResult, henid, m)
                reply('Done kack!').catch((err) => { reply(lang.err()) })
              }
            })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'doujindesu': case 'doudesu': {
    reply(lang.wait())
    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://doujindesu.xxx/2021/01/18/queen-bee-chapter-33/`)
    reply(lang.wait())
    let links = args[0]
    try {
      await fetchJson(`https://api.lolhuman.xyz/api/doujindesu?apikey=${lol}&url=${links}`).then(
        async doudesu => {
          let txtresult = `Title: ${doudesu.title}\n`
          txtresult += `Link Download: ${doudesu.link_dl}`
          reply(txtresult)
        }
      )
    } catch {
      await getBuffer(`https://api.lolhuman.xyz/api/doujindesu?apikey=${lol}&url=${links}`).then(
        async doudesux => {
          let buffer = doudesux.link_dl
          await sendFileFromUrl(from, buffer, m).catch((err) => { reply(lang.err()) })
        }
      )
    }
  } break

  case 'doujindesulatest': {
    reply(lang.wait())
    await fetchJson(`https://api.lolhuman.xyz/api/doujindesulatest?apikey=${lol}`).then(async doudesuLts => {
      doudesuLts = doudesuLts.result
      let ini_txt = "Result : \n"
      for (var x of doudesuLts) {
        ini_txt += `Title : #${x.title}\n`
        ini_txt += `Link : ${x.link}\n`
        ini_txt += `Thumbnail : ${x.thumbnail}\n`
        ini_txt += `Episode : ${x.episode}\n\n`
        ini_txt += `- - - - - - - - - - - - - - - - - - - - - - - - \n`
      }
      alpha.sendText(m.chat, ini_txt, m).catch((err) => { reply(lang.err()) })
    })
  } break

  case 'doujindesusearch': {
    let query = args.join(" ")
    reply(lang.wait())
    if (args.length == 0) return reply(`Contoh: ${prefix + command} metamorphosis`)
    await fetchJson(`https://api.lolhuman.xyz/api/doujindesusearch?apikey=${lol}&query=${query}`).then(async doudesuSearch => {
      doudesuSearch = doudesuSearch.result
      let ini_txt = "Result : \n"
      for (var x of doudesuSearch) {
        ini_txt += `Title : #${x.title}\n`
        ini_txt += `Link : ${x.link}\n`
        ini_txt += `Thumbnail : ${x.thumbnail}\n`
        ini_txt += `Status : ${x.type}\n`
        ini_txt += `- - - \n`
      }
      alpha.sendText(m.chat, ini_txt, m).catch((err) => { reply(lang.err()) })
    })
  } break

  case 'nekopoisearch': {
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} isekai harem monogatari`)
    reply(lang.wait())
    await fetchJson(`https://api.lolhuman.xyz/api/nekopoisearch?apikey=${lol}&query=${query}`).then(async data => {
      let result = data.result
      let thumb = result[0].thumbnail
      let txt = `*Hasil Pencarian :*\n\n`
      for (let res of result) {
        txt += `*${res.title}*\n`
        txt += `Link : ${res.link}\n\n`
      }
      await sendFileFromUrl(from, thumb, txt, m).catch((err) => { reply(lang.err()) })
    });
  } break

  case 'nekopoi': {
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://nekopoi.care/isekai-harem-monogatari-episode-4-subtitle-indonesia/`)
    reply(lang.wait())
    await fetchJson(`https://api.lolhuman.xyz/api/nekopoi?apikey=${lol}=${query}`).then(async data => {
      let result = data.result
      let thumb = result.thumbnail
      let txt = `*${result.title}*\n`
      txt += `Studio : ${result.producers}\n`
      txt += `Durasi : ${result.duration}\n`
      let genres = result.genre
      txt += `Genre :\n`
      for (let genre of genres) {
        txt += `- ${genre}\n`
      }
      txt += `*Sinopsis*\n${result.sinopsis}\n`
      txt += `Link Download :\n`
      let links = result.link
      txt += JSON.stringify(links);
      await sendFileFromUrl(from, thumb, txt, m).catch((err) => { reply(lang.err()) })
      // reply(txt)
    });
  } break

  case 'neonime': {
    reply(lang.wait())
    await fetchJson(`https://api.lolhuman.xyz/api/neonimelatest?apikey=${lol}`).then(async neolatest => {
      neolatest = neolatest.result
      let ini_txt = "Result : \n"
      for (var x of neolatest) {
        ini_txt += `Title : ${x.title}\n`
        ini_txt += `Link : ${x.link}\n`
        ini_txt += `Thumbnail : ${x.thumbnail}\n`
        ini_txt += `Episode : ${x.episode}\n`
        ini_txt += `Date : ${x.date}\n`
        ini_txt += `Description : ${x.desc}\n\n`
        ini_txt += `- - - - - - - - - - - - - - - - - - - - - - - - \n\n`
      }
      alpha.sendText(m.chat, ini_txt, m).catch((err) => { reply(lang.err()) })
    })
  } break

  /* Anime */

  case 'anime': case 'animesearch': case 'searchanime': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} classroom elite`)
    await fetchJson(`https://api.lolhuman.xyz/api/anime?apikey=${lol}&query=g${query}`)
      .then(async data => {
        let datas = data.result
        let txt = `Hasil Pencarian...\n\n`
        txt += `*Judul Anime*\n`
        txt += `*ID MAL*: ${datas.idMal}\n\n`
        txt += `*Score*: ${datas.averageScore}\n\n`
        txt += `Romaji : ${datas.title.romaji}\n\n`
        txt += `English : ${datas.title.english}\n\n`
        txt += `Japan : ${datas.title.native}\n\n`
        txt += `*Anime Details*\n`
        txt += `Rilis : ${datas.format}\n`
        txt += `Episode : ${datas.episodes}\n`
        txt += `Durasi : ${datas.duration} m/j\n`
        txt += `Status : ${datas.status}\n`
        txt += `Musim : ${datas.season}\n`
        txt += `Tahun Musim : ${datas.seasonYear}\n`
        txt += `Sumber Adaptasi : ${datas.source}\n`
        txt += `Genre\n`
        let thisGenre = datas.genres
        for (var x of thisGenre) {
          txt += `- ${x}\n`
        }
        txt += `Tahun Rilis:\n${datas.startDate.year} ${datas.startDate.month} ${datas.startDate.day}\n`
        txt += `Tahun Selesai:\n${datas.endDate.year} ${datas.endDate.month} ${datas.endDate.day}\n`
        txt += `\n\n`
        txt += `*Sinopsis:*\n${datas.description}\n\n`
        txt += `*Karakter:*\n`
        let chara = datas.characters.nodes
        for (var char of chara) {
          txt += `- ${char.name.full}\n`
          txt += `- ${char.name.native}\n`
          txt += `- - - - - - - - - - - - -\n`
        }
        txt += `\n\n`
        txt += `Next Season : ${datas.nextAiringEpisode}`
        txt += `\n\n\n`
        txt += `*_Anime Search By Azusa Bot_* :)`

        let thumb = datas.coverImage.large
        await sendFileFromUrl(from, thumb, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'manga': case 'mangasearch': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} classroom elite`)
    await fetchJson(`https://api.lolhuman.xyz/api/manga?apikey=${lol}&query=${query}`)
      .then(async data => {
        let datas = data.result
        let txt = `_Hasil Pencarian..._\n\n`
        txt += `ID Manga / MAL : ${datas.id} / ${datas.idMal}\n`
        txt += `Average Score on MAL : ${datas.averageScore}`
        txt += `Judul Manga :\n`
        txt += `Romaji : ${datas.title.romaji}\n`
        txt += `English : ${datas.title.english}\n`
        txt += `Romaji : ${datas.title.native}\n`
        txt += `Type : ${datas.format}\n`
        txt += `Chapters : ${datas.chapters}`
        txt += `Volumes : ${datas.volumes}\n`
        txt += `Status : ${datas.status}\n`
        txt += `Source : ${datas.source}\n`
        txt += `Genre :\n`
        let Genres = datas.genres
        for (var gen of Genres) {
          txt += `- ${gen}\n`
        }
        txt += `Start Date :\n`
        txt += `${datas.startDate.day} - ${datas.startDate.month} ${datas.startDate.year}\n`
        txt += `End Date :\n`
        txt += `${datas.endDate.day} - ${datas.endDate.month} ${datas.endDate.year}\n`
        txt += `Description :\n`
        txt += `${datas.description}\n\n`
        txt += `Character :\n`
        let characterManga = datas.characters.nodes
        for (var karakter of characterManga) {
          txt`- ${karakter.name.full}\n`
          txt`- ${karakter.name.native}\n\n`
        }
        txt += `..\n\n\n`
        txt += `*_Manga Search By Azusa Bot_*`
        let thumb = datas.coverImage.large
        await sendFileFromUrl(from, thumb, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'charactersearch': case 'character': case 'karakter': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} naruto`)
    await fetchJson(`https://api.lolhuman.xyz/api/character?apikey=${lol}&query=${query}`)
      .then(async data => {
        let datas = data.result
        let txt = `_Hasil Pencarian..._\n\n`
        txt += `ID character: ${datas.id}\n`
        txt += `Karakter poll favorit: ${datas.favourites}\n\n`
        txt += `Nama : ${datas.name.full}\n`
        txt += `Native : ${datas.name.native}\n\n`
        txt += `Deskripsi Karakter:\n`
        txt += `${datas.description}`
        let thumb = datas.image.medium
        await sendFileFromUrl(from, thumb, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'storyanime': {
    reply(lang.wait())
    await fetchJson(`https://api.lolhuman.xyz/api/storynime?apikey=${lol}`).then(async storyAnime => {
      let getResult = storyAnime.result
      try {
        await sendFileFromUrl(from, getResult, lang.ok(), m)
      } catch {
        reply(`Lu download sendiri gih, lemot di gua, nih link nya\n${getResult}`).catch((err) => { reply(lang.err()) })
      }
    })
  } break

  case 'otakudesusearch': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} classroom elite`)
    await fetchJson(`https://api.lolhuman.xyz/api/otakudesusearch?apikey=${lol}&query=${query}`)
      .then(async datas => {
        let Result = datas.result
        let thisText = `Hasil Pencarian`
        thisText += `Judul: ${Result.title}`
        thisText += `Japanese: ${Result.japanese}`
        thisText += `Title: ${Result.judul}`
        thisText += `Tipe: ${Result.type}`
        thisText += `Total Episode: ${Result.episodes}`
        thisText += `Aired: ${Result.aired}`
        thisText += `Produser: ${Result.producers}`
        thisText += `Genre: ${Result.genres}`
        thisText += `Durasi: ${Result.duration}`
        thisText += `Studio: ${Result.studios}`
        thisText += `Rating: ${Result.rating}`
        thisText += `Credits: ${Result.credit}\n`
        thisText += `Link Download dibawah ini:`
        let linkDownload = Result.link_dl
        for (var link of linkDownload) {
          thisText += `Title: ${link.title}`
        } let linkSource = Result.link_dl.link_dl
        for (var sourcelink of linkSource) {
          thisText += `Resolution: ${sourcelink.reso}`
          thisText += `Size: ${sourcelink.size}`
          thisText += `Link Download:`
          thisText += `ZippyShare: ${sourcelink.ZippyShare}`
          thisText += `Fileism: ${sourcelink.Filesim}`
          thisText += `LetsUp: ${sourcelink.LetsUp}`
          thisText += `DesuFiles: ${sourcelink.DesuFiles}`
          thisText += `Mega: ${sourcelink.Mega}`
          thisText += `- - - - - - - - - - - - - - - - - - - - - - `
        }
        reply(thisText).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'wait': {
    reply(lang.wait())
    let link = args[0]
    if (args.length == 0) return reply(`Contoh: ${prefix + command} link gambar`)
    await fetchJson(`https://api.lolhuman.xyz/api/wait?apikey=${lol}&img=${link}`)
      .then(async wait => {
        let result = wait.result
        let txt = `Anilist id : ${result.anilist_id}
      MAL id : ${result.mal_id}
      Title Romaji : ${result.title_romaji}
      Title Native : ${result.title_native}
      Title English : ${result.title_english}
      at : ${result.at}
      Episode : ${result.episode}\n
      Similarity : ${result.similarity}`
        reply(from, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'wmit': {
    reply(lang.wait())
    let imagelink = args[0]
    if (args.length == 0) return reply(`Contoh: ${prefix + command} link gambar`)
    await(`https://api.lolhuman.xyz/api/wmit?apikey=${lol}&img=${imagelink}`)
      .then(async data => {
        let datas = data.result
        let txt = `Hasil Analisis gue:...`
        for (var thisData of datas) {
          txt += `Title: ${thisData.title}`
          txt += `Part: ${thisData.part}`
          txt += `Urls: ${thisData.urls[0]}`
          txt += `Similarity: ${thisData.similarity}`
        }
        reply(from, result, m).catch((err) => { reply(lang.err()) })
      })
  } break

  /* Movie & Story  */

  case 'cerpen': {
    await fetchJson(`https://api.lolhuman.xyz/api/cerpen?apikey=${lol}`).then(async cerpen => {
      cerpenResult = cerpen.result
      let ini_txt = `Judul : #${cerpenResult.title}\n`
      ini_txt += `Pendongeng : ${cerpenResult.creator}\n`
      ini_txt += `Cerita : ${cerpenResult.cerpen}\n`
      alpha.sendText(m.chat, ini_txt, m).catch((err) => { reply(lang.err()) })
    })
  } break

  case 'ceritahoror': {
    await fetchJson(`https://api.lolhuman.xyz/api/ceritahoror?apikey=${lol}`).then(async data => {
      cerResult = data.result
      let thumb = data.result.thumbnail
      let ini_txt = `Judul : #${cerResult.title}\n`
      ini_txt += `Deskripsi : ${cerResult.desc}\n\n`
      ini_txt += `Cerita : ${cerResult.story}\n`
      sendFileFromUrl(from, thumb, ini_txt, m).catch((err) => { reply(lang.err()) })
    })
  } break

  case 'lk21': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} Kungfu Panda 3`)
    await fetchJson(`https://api.lolhuman.xyz/api/lk21?apikey=${lol}&query=${query}`)
      .then(async film => {
        let data = film.result
        let thumb = data.thumbnail
        let txt = `*_LK21 MOVIE_*\n\n`
        txt += `Judul Film:\n${data.title}\n`
        txt += `Rating: ${data.rating}\n`
        txt += `Genre:\n${data.genre}\n`
        txt += `Views:\n${data.views}\n`
        txt += `Durasi:\n${data.duration}\n`
        txt += `Tahun Rilis:\n${data.date_release}\n`
        txt += `Link Streaming:\n${data.link}\n`
        txt += `Link Download:\n${data.link_dl}\n`
        txt += `Sinopsis:\n${data.desc}\n`
        txt += `Pemain Film:\n`
        let pemain = data.actors
        for (var player of pemain) {
          txt += `- ${player}\n`
        }
        await sendFileFromUrl(from, thumb, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'filmapik': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} Kungfu Panda 3`)
    await fetchJson(`https://api.lolhuman.xyz/api/filmapik?apikey=${lol}&query=${query}`)
      .then(async filmapik => {
        let data = filmapik.result
        let thumb = data[0].thumbnailPotrait
        let txt = `_Hasil Pencarian..._\n\n`
        for (var apik of data) {
          txt += `ID Film: ${apik.movieId}\n`
          txt += `Judul Film:\n${apik.title}\n`
          txt += `Rating: ${apik.rating}\n`
          txt += `Kualitas: ${apik.quality}\n`
          txt += `Episode: ${apik.episode}\n`
          txt += `Official Web:\n${apik.officialWeb}\n`
          txt += `\n`
          txt += `- - - - - - - - - - - - - - - - - - - - - - -\n`
          txt += `\n`
        }
        await sendFileFromUrl(from, thumb, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'drakorsearch': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} Kungfu Panda 3`)
    await fetchJson(`https://api.lolhuman.xyz/api/drakor?apikey=${lol}&query=${query}`)
      .then(async drakor => {
        let data = drakor.result
        let thumb = data.thumbnail
        let genres = data.genre
        let artists = data.casts
        let txt = `_Hasil Pencarian..._\n\n`
        txt += `*Judul Drakor:*\n${data.title}\n`
        txt += `*Durasi:*\n${data.duration}\n`
        txt += `*Genre:*\n`
        for (var genre of genres) {
          txt = `- ${genre}\n`
        }
        txt += `*Artists/Aktor:*\n`
        for (var artist of artists) {
          txt = `- ${artist}\n`
        }
        txt += `\n*Sinopsis:*\n${data.synopsis}\n`
        await sendFileFromUrl(from, thumb, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'drakorongoing': {
    reply(lang.wait())
    await fetchJson(`https://api.lolhuman.xyz/api/drakorongoing?apikey=${lol}`)
      .then(async data => {
        let datas = data.result
        let thumb = datas[0].thumbnail
        let txt = `*_Drama Korea Ongoing ....-*\n\n`
        for (var drakor of datas) {
          txt += `*Judul Drakor:*\n${datas.title}\n\n`
          txt += `*Tahun Rilis:*\n${datas.year}\n`
          txt += `*Total Episode:*\n${datas.total_episode}\n`
          txt += `*Genre:*\n`
          txt += `- ${drakor.genre[0]}\n`
          txt += `- ${drakor.genre[1]}\n`
          txt += `- ${drakor.genre[2]}\n`
          txt += `- ${drakor.genre[3]}\n`
          txt += `- ${drakor.genre[4]}\n`
          txt += `- ${drakor.genre[5]}\n`
          txt += `*Link:*\n${datas.link}\n`
        }
        await sendFileFromUrl(from, thumb, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  /* Meme */

  case 'cmm': { // change my mind memes
    reply(lang.wait())
    let query = args.join(" ")
    let process = (`https://api.lolhuman.xyz/api/creator/changemymind?apikey=${lol}&text=${query}`)
    await sendFileFromUrl(from, process, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'memes': {
    let caption = '_Memes Feature_\n\nSilahkan ketuk tombol dibawah:'
    alpha.sendButMessage(from, caption, `© ${ownername}`, [
      { buttonId: 'meme', buttonText: { displayText: 'Meme' } },
      { buttonId: 'memeindo', buttonText: { displayText: 'Meme Indo' } },
      { buttonId: 'darkjoke', buttonText: { displayText: 'Darkjokes' } }
    ])
  } break
  case 'darkjoke': {
    reply(lang.wait())
    let djokes = await(`https://api.lolhuman.xyz/api/meme/darkjoke?apikey=${lol}`)
    await sendFileFromUrl(from, djokes, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'meme': {
    reply(lang.wait())
    let memes = await(`https://api.lolhuman.xyz/api/random/meme?apikey=${lol}`)
    await sendFileFromUrl(from, memes, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'memeindo': {
    reply(lang.wait())
    let memindo = await(`https://api.lolhuman.xyz/api/meme/memeindo?apikey=${lol}`)
    await sendFileFromUrl(from, memindo, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  /* Random Asupan */

  case 'asupan': {
    reply(lang.wait())
    await fetchJson(`https://api.lolhuman.xyz/api/asupan?apikey=${lol}`)
      .then(async data => {
        let datas = data.result
        await sendFileFromUrl(from, datas, lang.ok(), m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'cecan': {
    reply(lang.wait())
    let ccn = await(`https://api.lolhuman.xyz/api/random/cecan?apikey=${lol}`)
    await sendFileFromUrl(from, ccn, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'cogan': {
    reply(lang.wait())
    let cgn = await(`https://api.lolhuman.xyz/api/random/cogan?apikey=${lol}`)
    await sendFileFromUrl(from, cgn, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'ppcouple': {
    reply(lang.wait())
    let ppcpl = await(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${lol}`)
    await sendFileFromUrl(from, ppcpl, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'esteticpicture': {
    reply(lang.wait())
    let este = await(`https://api.lolhuman.xyz/api/random/estetic?apikey=${lol}`)
    await sendFileFromUrl(from, este, lang, ok(), m).catch((err) => { reply(lang.err()) })
  } break

  /* Ensiklopedia */

  case 'wikipedia': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          if (args.length == 0) return reply(`Example: ${prefix + command} Tahu`)
          let query = args.join(" ")
          await fetchJson(`https://api.lolhuman.xyz/api/wiki?apikey=${lol}&query=${query}`).then(
            async get_result => {
              let txt = `${get_result.result}`
              alpha.sendText(m.chat, txt, m)
            })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'kbbi': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          let query = args.join(" ")
          if (args.length == 0) return reply(`Example: ${prefix + command} kursi`)
          await fetchJson(`https://api.lolhuman.xyz/api/kbbi?apikey=${lol}&query=${query}`).then(
            async get_result => {
              let lila = get_result.result
              let ini_txt = `\`\`\`Kata : ${lila[0].nama}\`\`\`\n`
              ini_txt += `\`\`\`Kata Dasar : ${lila[0].kata_dasar}\`\`\`\n`
              ini_txt += `\`\`\`Pelafalan : ${lila[0].pelafalan}\`\`\`\n`
              ini_txt += `\`\`\`Bentuk Tidak Baku : ${lila[0].bentuk_tidak_baku}\`\`\`\n\n`
              for (var x of lila) {
                ini_txt += `\`\`\`Kode : ${x.makna[0].kelas[0].kode}\`\`\`\n`
                ini_txt += `\`\`\`Kelas : ${x.makna[0].kelas[0].nama}\`\`\`\n`
                ini_txt += `\`\`\`Artinya : \n${x.makna[0].kelas[0].deskripsi}\`\`\`\n\n`
                ini_txt += `\`\`\`Makna Lain : \n${x.makna[0].submakna}\`\`\`\n `
                ini_txt += `\`\`\`Contoh Kalimat : \n${x.makna[0].contoh}\`\`\`\n`
              }
              alpha.sendText(m.chat, ini_txt, m).catch((err) => { reply(lang.err()) })
            }
          )
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  /* Search */

  case 'kanachansearch': { // Search image from Konachan	
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} azur lane`)
    let kana = await(`https://api.lolhuman.xyz/api/konachan?apikey=${lol}&query=${query}`)
    await sendFileFromUrl(from, kana, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'danboorusearch': { // Search image from Danbooru ( NSFW )	
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} azur lane`)
    let danbooru = await(`https://api.lolhuman.xyz/api/danbooru?apikey=${lol}&query=${query}`)
    await sendFileFromUrl(from, danbooru, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'walppsearch1': { // Search image from Wallpaper Search	
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} azur lane`)
    await(`https://api.lolhuman.xyz/api/wallpaper2?apikey=${lol}&query=${query}`).then(
      async wpp1 => {
        Result = wpp1.result
        await sendFileFromUrl(from, Result, lang.ok(), m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'walppsearch2': { // Search image from Wallpaper Search	
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} azur lane`)
    await fetchJson(`https://api.lolhuman.xyz/api/wallpaper3?apikey=${lol}&query=${query}`).then(
      async wpp1 => {
        Result = wpp1.result
        await sendFileFromUrl(from, Result, lang.ok(), m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'gimagesearch': { // Search image from Google	
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} lolipai gede banget`)
    await fetchJson(`https://api.lolhuman.xyz/api/gimage?apikey=${lol}&query=${query}`)
    await sendFileFromUrl(from, gimage, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'shopee': case 'shopeeproduct': { // Search shopee product	
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} alat kesehatan pria`)
    await fetchJson(`https://api.lolhuman.xyz/api/shopee?apikey=${lol}&query=${query}`).then(
      async shopeeproduct => {
        let Result = shopeeproduct.result
        let thisText = `_Hasil Pencarian...._\n\n`
        for (var shopee of Result) {
          thisText += `\n`
          thisText += `*Nama Produk:*\n${shopee.name}\n\n`
          thisText += `*Harga:*\n${shopee.price}\n\n`
          thisText += `*Terjual:*\n${shopee.sold}\n\n`
          thisText += `*Stok:*\n${shopee.stock}\n\n`
          thisText += `*Lokasi Toko:*\n${shopee.shop_loc}\n\n`
          thisText += `*Link:\n${shopee.link_produk}\n\n`
          thisText += `Gambar:\n${shopee.image_cover}\n\n`
          thisText += `*Deskripsi Produk:*\n${shopee.desc}\n\n`
          thisText += `\n`
          thisText += `*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*\n`
        }
        let thumb = Result[0].image_cover
        await sendFileFromUrl(from, thumb, thisText, m).catch((err) => { reply(lang.err()) })
      }
    )
  } break

  case 'pixiv': case 'pixivsearch': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${command} pixiv raiden shogun`)
    let pixiv = await(`https://api.lolhuman.xyz/api/pixiv?apikey=${lol}&query=${query}`)
    await sendFileFromUrl(from, pixiv, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'pixivid': {
    reply(lang.wait())
    let query = args[0]
    if (args.length == 0) return reply(`Contoh: ${command} 12345`)
    let pixivid = await(`https://api.lolhuman.xyz/api/pixivdl/${query}?apikey=${lol}`)
    await sendFileFromUrl(from, pixivid, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'pinterestsearch': { // Search image from Pinterest	
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} azur lane`)
    await fetchJson(`https://api.lolhuman.xyz/api/pinterest?apikey=${lol}&query=${query}`).then(
      async pinter => {
        let Result = pinter.result
        await sendFileFromUrl(from, Result, lang.ok(), m).catch((err) => { reply(lang.err()) })
      }
    )
  } break

  case 'unsplashsearch': { // Search image from unsplash	
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} skyfall`)
    await fetchJson(`https://api.lolhuman.xyz/api/unsplash?apikey=${lol}&query=${query}`).then(
      async unsplash => {
        let Result = unsplash.result
        let thisText = `Hasil Pencarian:\n\nLink:`
        for (var x of Result) {
          thisText = + `${x}`
        }
        alpha.sendText(m.chat, thisText, m).catch((err) => { reply(lang.err()) })
      }
    )
  } break

  case 'grubwasearch': { // Search whatsapp group	
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} forum genshin impact`)
    await fetchJson(`https://api.lolhuman.xyz/api/groupwhatsapp2?apikey=${lol}&query=${query}`).then(
      async gcsearch => {
        let Result = gcsearch.result
        let thisText = `Hasil Pencarian:\n\n`
        for (var grub of Result) {
          thisText += `Nama Grub: ${grub.title}\n`
          thisText += `Link Grub: ${grub.link}\n`
          thisText += `- - - - - - - - - - - -`
        }
        alpha.sendText(m.chat, thisText, m).catch((err) => { reply(lang.err()) })
      }
    )
  } break

  case 'searchplace': { // Search place by name	
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} yogyakarta`)
    await fetchJson(`https://api.lolhuman.xyz/api/searchplace?apikey=${lol}&query=${query}`).then(
      async search => {
        let Result = search.result
        let thisText = `Hasil Pencarian:\n\n`
        for (var place of Result) {
          thisText += `Nama Tempat: ${place.display_name}\n`
          thisText += `Latitude: ${place.latitude}\n`
          thisText += `Longitude: ${place.longitude}\n`
          thisText += `Railway: ${place.full.railway}\n`
          thisText += `Jalan: ${place.full.road}\n`
          thisText += `Suburb: ${place.full.suburb}\n`
          thisText += `Distrik: ${place.full.city_district}\n`
          thisText += `Kota: ${place.full.city}\n`
          thisText += `State: ${place.full.state}\n`
          thisText += `Kode Pos: ${place.full.postcode}\n`
          thisText += `Negara: ${place.full.country}\n`
          thisText += `Kode Negara: ${place.full.country_code}\n`
          thisText += `- - - - - - - - - - - - -`
        }
        alpha.sendText(m.chat, thisText, m).catch((err) => { reply(lang.err()) })
      }
    )
  } break

  case 'searchquote': { // Search kata bijak	
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Contoh: ${prefix + command} patah hati`)
    await fetchJson(`https://api.lolhuman.xyz/api/searchbijak?apikey=${lol}&query=${query}`).then(
      async quotes => {
        let Result = quotes.result
        let thisText = `Hasil....\n`
        for (var quote of Result) {
          thisText += `Quote: ${quote.quote}\n`
          thisText += `\n`
          thisText += `Author: ${quote.author}`
          thisText += `- - - - - - - - -`
        }
        alpha.sendText(m.chat, thisText, m).catch((err) => { reply(lang.err()) })
      }
    )
  } break

  /* Sticker Features */

  case 'stickerpatrick': {
    reply(lang.wait())
    axios.get(`https://api.lolhuman.xyz/api/sticker/patrick?apikey=${lol}`)
      .then(({ data }) => {
        alpha.sendMediaAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
      })
  } break

  case 'stickerdadu': {
    reply(lang.wait())
    axios.get(`https://api.lolhuman.xyz/api/sticker/dadu?apikey=${lol}`)
      .then(({ data }) => {
        alpha.sendMediaAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
      })
  } break

  case 'stickeramongus': {
    let data = await(`https://api.lolhuman.xyz/api/sticker/amongus?apikey=${lol}`)
    alpha.sendMediaAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
  } break

  case 'stickergawgura': {
    reply(lang.wait())
    axios.get(`https://api.lolhuman.xyz/api/sticker/gawrgura?apikey=${lol}`)
      .then(({ data }) => {
        alpha.sendMediaAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
      })
  } break

  case 'stickeranjing': {
    reply(lang.wait())
    axios.get(`https://api.lolhuman.xyz/api/sticker/anjing?apikey=${lol}`)
      .then(({ data }) => {
        alpha.sendMediaAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
      })
  } break

  case 'stickerbucin': {
    reply(lang.wait())
    axios.get(`https://api.lolhuman.xyz/api/sticker/bucinstick?apikey=${lol}`)
      .then(({ data }) => {
        alpha.sendMediaAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
      })
  } break

  /* Quotes */

  case 'quotes': {
    await fetchJson(`https://api.lolhuman.xyz/api/random/quotes?apikey=${lol}`)
      .then(async quote => {
        let Result = quote.result
        let thisText = `_${Result.quote}_\n\nBy: ${Result.by}`
        alpha.send1ButMes(m.chat, `${thisText}`, `© ${ownername}`, `quotes`, `Random Quotes`, m)
          .catch((err) => { reply(lang.err()) })
      })
  } break

  case 'quotesislami': {
    await fetchJson(`https://api.lolhuman.xyz/api/quotes/islami?apikey=${lol}`)
      .then(async quote => {
        let Result = quote.result
        let thisText = `_${Result}_`
        alpha.send1ButMes(m.chat, `${thisText}`, `© ${ownername}`, `quotesislami`, `Quotes Islami`, m)
          .catch((err) => { reply(lang.err()) })
      })
  } break

  case 'quotesdilan': {
    await fetchJson(`https://api.lolhuman.xyz/api/quotes/dilan?apikey=${lol}`)
      .then(async quote => {
        let Result = quote.result
        let thisText = `_${Result}_`
        alpha.send1ButMes(m.chat, `${thisText}`, `© ${ownername}`, `quotesdilan`, `Quotes Dilan`, m)
          .catch((err) => { reply(lang.err()) })
      })
  } break

  case 'quotesanime': {
    await fetchJson(`https://api.lolhuman.xyz/api/random/quotesnime?apikey=${lol}`)
      .then(async quote => {
        let Result = quote.result
        let thisText = `_${Result.quote}_\n\n\n\n`
        thisText += `${Result.character}\n`
        thisText += `${Result.anime}\n`
        thisText += `${Result.episode}\n`
        alpha.send1ButMes(m.chat, `${thisText}`, `© ${ownername}`, `quotesanime`, `Quotes Anime`, m)
          .catch((err) => { reply(lang.err()) })
      })
  } break

  case 'quotesimage': {
    let qimage = await(`https://api.lolhuman.xyz/api/random/quotesimage?apikey=${lol}`)
    await sendFileFromUrl(from, qimage, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  /* Random text */

  case 'faktaunik': {
    await fetchjson(`https://api.lolhuman.xyz/api/random/faktaunik?apikey=${lol}`)
      .then(async data => {
        let Result = data.result
        alpha.send1ButMes(m.chat, `${Result}`, `© ${ownername}`, `faktaunik`, `Fakta Unik lainnya`, m)
          .catch((err) => { reply(lang.err()) })
      })
  } break

  case 'katabijak': {
    await fetchjson(`https://api.lolhuman.xyz/api/random/katabijak?apikey=${lol}`)
      .then(async data => {
        let Result = data.result
        alpha.send1ButMes(m.chat, `${Result}`, `© ${ownername}`, `katabijak`, `Kata Bijak lainnya`, m)
          .catch((err) => { reply(lang.err()) })
      })
  } break

  case 'pantun': {
    await fetchjson(`https://api.lolhuman.xyz/api/random/pantun?apikey=${lol}`)
      .then(async data => {
        let Result = data.result
        alpha.send1ButMes(m.chat, `${Result}`, `© ${ownername}`, `pantun`, `Pantun lainnya`, m)
          .catch((err) => { reply(lang.err()) })
      })
  } break

  case 'puisi': {
    await fetchjson(`https://api.lolhuman.xyz/api/random/puisi?apikey=${lol}`)
      .then(async data => {
        let Result = data.result
        alpha.send1ButMes(m.chat, `${Result}`, `© ${ownername}`, `puisi`, `Puisi lainnya`, m)
          .catch((err) => { reply(lang.err()) })
      })
  } break

  case 'katabucin1': {
    reply(lang.wait())
    let bcn = await(`https://api.lolhuman.xyz/api/random/bucin?apikey=${lol}`)
    await sendFileFromUrl(from, bcn, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'katabucin2': {
    let bcn1 = await(`https://api.lolhuman.xyz/api/random/katabucin?apikey=${lol}`)
    await sendFileFromUrl(from, bcn1, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  /* Islami */

  case 'niatsholat': {
    let select = args[0]
    if (args.length == 0) return reply(`Contoh: ${prefix + command} available enpoint is subuh, dzuhur, ashar, maghrib, isya"\n\nContoh pengunaan: !niatsholat subuh`)
    await fetchJson(`https://api.lolhuman.xyz/api/niatsholat/${select}?apikey=${lol}`)
      .then(async niat => {
        let data = niat.result
        let txt = `${data.name}\n`
        txt += `Niat: ${data.ar}\n`
        txt += `Latin: ${data.latin}\n`
        txt += `Arti: ${data.id}\n`
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'kisahnabi': {
    let query = args[0]
    if (args.length == 0) return reply(`Contoh: ${prefix + command} isa`)
    await fetchJson(`https://api.lolhuman.xyz/api/kisahnabi/${query}?apikey=${lol}`)
      .then(async data => {
        let datas = data.result
        let txt = `Nama Nabi: ${datas.name}\n`
        txt += `Tahun Kelahiran: ${datas.thn_kelahiran}\n`
        txt += `Umur: ${datas.age}\n`
        txt += `Tempat: ${datas.place}\n\n`
        txt += `Story: ${datas.story}`
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  /* Downloader */

  case 'fbdl': case 'facebook': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let link = args[0]
          if (args.length == 0) return reply(`${command} https://web.facebook.com/watch/?v=892725951575913`)
          try {
            await fetchJson(`https://api.lolhuman.xyz/api/facebook?apikey=${lol}&url=${link}`)
              .then(async data => {
                let datas = data.result
                await sendFileFromUrl(from, datas, lang.ok(), m).catch((err) => { reply(lang.err()) })
              })
          } catch {
            await fetchJson(`https://api.lolhuman.xyz/api/facebook2?apikey=${lol}&url=${link}`)
              .then(async data => {
                let datas = data.result
                await sendFileFromUrl(from, datas, lang.ok(), m).catch((err) => { reply(lang.err()) })
              })
          }
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'jooxplay': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let query = args.join(" ")
          if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
          await fetchJson(`https://api.lolhuman.xyz/api/jooxplay?apikey=${lol}&query=${query}`)
            .then(async data => {
              let datas = data.result
              let txt = `Jooxplay Queue ...\n_By Azusa Bot_\n\n`
              txt += `*Singer*:\n${datas.info.singer}\n\n`
              txt += `*Song:*\n${datas.info.song}\n\n`
              txt += `*Album:*\n${datas.info.album}\n\n`
              txt += `*Date:*\n${datas.info.date}\n\n`
              txt += `*Duration:*\n${datas.info.duration}\n\n`
              txt += `*Details Selected Audio Song:*\n_Bitrate: ${datas.audio[0].reso}_\n_Size: ${datas.audio[0].size} kb_\n\n`
              txt += `*Lyrics:* ${datas.lirik}`
              let thumb = datas.image
              await sendFileFromUrl(from, thumb, txt, m)
              let jooxAudio = datas.audio[0].link
              alpha.sendMessage(from, { audio: { url: jooxAudio }, mimetype: 'audio/mpeg' }, { quoted: m }).catch((err) => { reply(lang.err()) })
            })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'spotify': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let url = args[0]
          if (args.length == 0) return reply(`Example: ${prefix + command} https://open.spotify.com/track/0ZEYRVISCaqz5yamWZWzaA`)
          await fetchJson(`https://api.lolhuman.xyz/api/spotify?apikey=${lol}&url=${url}`)
            .then(async data => {
              let datas = data.result
              let txt = `Spotify Queue ...\n_By Azusa Bot_\n\n`
              txt += `_Artists :_ ${datas.artists}\n\n`
              txt += `_Duration :_ ${datas.duration}\n\n`
              txt += `_Popularity :_ ${datas.popularity}\n\n`
              let thumb = datas.thumbnail
              await sendFileFromUrl(from, thumb, txt, m)
              await reply(`Mohon tunggu sebentar, file audio sedang dikirim...`)
              let propSongs = datas.link
              alpha.sendMessage(from, { audio: { url: propSongs }, mimetype: 'audio/mpeg' }, { quoted: m }).catch((err) => { reply(lang.err()) })
            })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'spotifysearch': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let query = args.join(" ")
          if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
          await fetchJson(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${lol}&query=${query}`)
            .then(async data => {
              let datas = data.result
              let txt = `Hasil Pencarian...\n_Silahkan copy/salin Link Spotify yang dipilih, kemudian gunakan perintah " !spotify link-spotify " untuk mendownload audio/musik Spotify_\n\n`
              for (var x of datas) {
                txt += `Title : ${x.title}\n\n`
                txt += `Artists : ${x.artists}\n\n`
                txt += `Duration : ${x.duration}\n\n`
                txt += `Link Spotify :\n${x.link}\n\n`
                txt += `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n`
              }
              alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
            })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'twtimage': {
    reply(lang.wait())
    let query = args[0]
    if (args.length == 0) return reply(`Example: ${prefix + command} https://twitter.com/memefess/status/1385161473232543747`)
    await fetchJson(`https://api.lolhuman.xyz/api/twitterimage?apikey=${lol}&url=${query}`)
      .then(async data => {
        let datas = data.result
        let txt = `Nama: ${datas.user.name}\n`
        txt += `Username: ${datas.user.username}\n`
        txt += `Photo: ${datas.user.photo}\n`
        txt += `Title: ${datas.title}\n`
        txt += `Publish on: ${datas.publish}\n`
        txt += `Link: ${datas.link}\n`
        let resultImg = datas.link
        await sendFileFromUrl(from, resultImg, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'twtvideo': {
    reply(lang.wait())
    let query = args[0]
    if (args.length == 0) return reply(`Example: ${prefix + command} https://twitter.com/memefess/status/1385161473232543747`)
    await fetchJson(`https://api.lolhuman.xyz/api/twitter?apikey=${lol}&url=${query}`)
      .then(async data => {
        let datas = data.result
        let txt = `Title: ${datas.title}\n`
        txt += `Link:\n`
        let thisLink = datas.link
        for (var varyLink of thisLink) {
          txt += `Media Type: ${varyLink.type}\n`
          txt += `Media Resolution: ${varyLink.resolution}\n`
          txt += `Media Link: ${varyLink.link}\n\n`
        }
        txt += `Untuk mendownload silahkan menggunakan command !twtvideodl link_video_twiter_diatas`
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'twtvideodl': {
    reply(lang.wait())
    let link = args[0]
    if (args.length == 0) return reply(`Silahkan menggunakan command !twtvideo untuk mendapatkan link_video`)
    let thisQuery = (`${link}`)
    await sendFileFromUrl(from, thisQuery, lang.ok(), m).catch((err) => { reply(lang.err()) })
  } break

  case 'igdl': case 'instagram': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let link = args[0]
          if (args.length == 0) return reply(`Example: ${command} https://www.instagram.com/p/CU0MhPjBZO2/`)
          await fetchJson(`https://api.lolhuman.xyz/api/instagram?apikey=${lol}&url=${link}`)
            .then(async data => {
              let datas = data.result
              let result = datas[0]
              let moreResult = datas[1]
              try {
                await sendFileFromUrl(from, result, lang.ok(), m)
              } catch {
                await sendFileFromUrl(from, moreResult, lang.ok(), m).catch((err) => { reply(lang.err()) })
              }
            })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'xnxxsearch': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Example: ${prefix + command} Japanese`)
    await fetchJson(`https://api.lolhuman.xyz/api/xnxxsearch?apikey=${lol}&query=${query}`)
      .then(async data => {
        let datas = data.result
        let txt = ``
        for (var x of datas) {
          txt += `Title : ${x.title}\n`
          txt += `Views : ${x.views}\n`
          txt += `Duration : ${x.duration}\n`
          txt += `Uploader : ${x.uploader}\n`
          txt += `Link : ${x.link}\n`
          txt += `Thumbnail : ${x.thumbnail}\n\n`
        }
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break
  case 'xnxx': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Example: ${prefix + command} https://www.xnxx.com/video-uy5a73b/mom_is_horny_-_brooklyn`)
    await fetchJson(`https://api.lolhuman.xyz/api/xnxx?apikey=${lol}&url=${query}`)
      .then(async data => {
        let datas = data.result
        let txt = `Title : ${datas.title}\n`
        txt += `Duration : ${datas.duration}\n`
        txt += `View : ${datas.view}\n`
        txt += `Rating : ${datas.rating}\n`
        txt += `Like : ${datas.like}\n`
        txt += `Dislike : ${datas.dislike}\n`
        txt += `Comment : ${datas.comment}\n`
        txt += `Tag : ${datas.tag.join(", ")}\n`
        txt += `Description : ${datas.description}\n`
        txt += "Link : \n"
        let thisLink = datas.link
        for (var x of thisLink) {
          txt += `${x.type} - ${x.link}\n\n`
        }
        let thumb = datas.thumbnail
        await sendFileFromUrl(from, thumb, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'xhamstersearch': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Example: ${prefix + command} Japanese`)
    await fetchJson(`https://api.lolhuman.xyz/api/xhamstersearch?apikey=${lol}&query=${query}`)
      .then(async data => {
        let datas = data.result
        let txt = `Hasil Pencarian...\n\n`
        for (var x of datas) {
          txt += `Title : ${x.title}\n`
          txt += `Views : ${x.views}\n`
          txt += `Duration : ${x.duration}\n`
          txt += `Link : ${x.link}\n\n`
        }
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'xhamster': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Example: ${prefix + command} https://xhamster.com/videos/party-with-friends-end-in-awesome-fucking-5798407`)
    await fetchJson(`https://api.lolhuman.xyz/api/xhamster?apikey=${lol}&url=${query}`)
      .then(async data => {
        let datas = data.result
        let txt = `Results...`
        txt = `Title : ${datas.title}\n`
        txt += `Duration : ${datas.duration}\n`
        txt += `Uploader : ${datas.author}\n`
        txt += `Upload : ${datas.upload}\n`
        txt += `View : ${datas.views}\n`
        txt += `Rating : ${datas.rating}\n`
        txt += `Like : ${datas.likes}\n`
        txt += `Dislike : ${datas.dislikes}\n`
        txt += `Comment : ${datas.comments}\n`
        txt += "Link : \n"
        let thisLink = datas.link
        for (var x of thisLink) {
          txt += `${x.type} - ${x.link}\n\n`
        }
        let thumb = datas.thumbnail
        await sendFileFromUrl(from, thumb, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'zippyshare': {
    reply(lang.wait())
    let query = args[0]
    if (args.length == 0) return reply(`Example: ${prefix + command} https://www90.zippyshare.com/v/hvaR97k3/file.html`)
    fetchJson(`https://api.lolhuman.xyz/api/zippyshare?apikey=${lol}&url=${query}`)
      .then(async data => {
        let datas = data.result
        let txt = `Link Source: ${query}\n`
        txt += `Nama File: ${datas.name_file}\n`
        txt += `Size: ${datas.size}\n`
        txt += `Tanggal Upload: ${datas.date_upload}\n`
        txt += `Link Download: ${datas.download_url}\n`
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      }
      )
  } break

  case 'apkdownloader': {
    reply(lang.wait())
    let query = args[0]
    if (args.length == 0) return reply(`Example: ${prefix + command} com.whatsapp\n\nCari nama package aplikasi di detail aplikasi pada playstore/app store`)
    fetchJson(`https://api.lolhuman.xyz/api/apkdownloader?apikey=rizzzuchi78apikey&package=com.whatsapp`)
      .then(async apk => {
        let data = apk.result
        let txt = `Nama Aplikasi: ${data.apk_name}\n`
        txt += `Versi: ${data.apk_version}\n`
        txt += `Pengembang: ${data.apk_author}\n`
        txt += `Link Download: ${data.apk_link}\n`
        let thumb = data.apk_icon
        await sendFileFromUrl(from, thumb, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'play': case 'ytplay': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let query = args.join(" ")
          if (args.length == 0) return await reply(`Example: ${prefix + command} melukis senja`)
          await fetchJson(`https://api.lolhuman.xyz/api/ytplay?apikey=${lol}&query=${query}`)
            .then(async data => {
              let datas = data.result
              let thumb = await datas.info.thumbnail
              let mediaAudio = datas.audio.link
              let txt = `\n`
              txt += `*Judul:*\n${datas.info.title}\n\n`
              txt += `*Channel:*\n${datas.info.channel}\n\n`
              txt += `*Duration:*\n${datas.info.duration}\n\n`
              txt += `*Viewers:*\n${datas.info.view}\n\n`
              txt += `*Size Audio:* ${datas.audio.size}\n`
              txt += `*Size Video:* ${datas.video.size}\n`
              txt += `_Untuk mendownload file video gunakan perintah !ytmp4_`
              await sendFileFromUrl(from, thumb, txt, m);
              alpha.sendMessage(from, { audio: { url: mediaAudio }, mimetype: 'audio/mpeg' }, { quoted: m })
            });
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'ytsearch': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
    await fetchJson(`https://api.lolhuman.xyz/api/ytsearch?apikey=${lol}&query=${query}`)
      .then(async data => {
        let dataVideo = data.result
        let ini_txt = ""
        let thumb = dataVideo[0].thumbnail
        for (var x of dataVideo) {
          ini_txt += `*Title :* ${x.title}\n\n`
          ini_txt += `*Views :* ${x.views}\n`
          ini_txt += `*Published :* ${x.published}\n`
          ini_txt += `*Link :* https://www.youtube.com/watch?v=${x.videoId}\n\n`
          ini_txt += `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n`
        }
        await sendFileFromUrl(from, thumb, ini_txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'youtubemp3': case 'ytmp3': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `How to Get Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let ini_link = args[0]
          if (args.length == 0) return reply(`Example: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
          await fetchJson(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lol}&url=${ini_link}`)
            .then(async data => {
              let dataAudio = data.result
              let caption = `❖ Title    : *${dataAudio.title}*\n`
              caption += `❖ Size     : *${dataAudio.size}*`
              let thumb = dataAudio.thumbnail
              await sendFileFromUrl(from, thumb, caption, m)
              await reply('Mohon tunggu sebentar, file audio sedang dikirim...')
              let thisAudio = dataAudio.link
              alpha.sendMessage(from, { audio: { url: thisAudio }, mimetype: 'audio/mpeg' }, { quoted: m })
                .catch((err) => { reply(lang.err()) })
            })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'youtubemp4': case 'ytmp4': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `How to Get Limit`, m); };

          /* Start Process */
          reply(lang.wait())
          let ini_link = args[0]
          if (args.length == 0) return reply(`Example: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
          await fetchJson(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lol}&url=${ini_link}`)
            .then(async data => {
              let dataVideo = data.result
              let txt = `Title: ${dataVideo.title}\n`
              txt += `Size: ${dataVideo.size}\n`
              let thumb = dataVideo.thumbnail
              await sendFileFromUrl(from, thumb, txt, m)
              await reply('Mohon tunggu sebentar, file video sedang dikirim...')
              let video = dataVideo.link
              await sendFileFromUrl(from, video, txt, m).catch(() => { reply(lang.err()) })
            })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(lang.err())
      }
    })();
  } break

  case 'tiktok': case 'tiktokwm': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `How to Get Limit`, m); };

          /* Start Process */
          reply(lang.wait());
          if (args.length == 0) return reply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
          let query = args[0]
          let video = `https://api.lolhuman.xyz/api/tiktokwm?apikey=${lol}&url=${query}`
          let txt = `Done!\nOther features available: tiktoknowm`
          await sendFileFromUrl(from, video, txt, m).catch(() => { reply(lang.err()) })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  case 'tiktoknowm': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `How to Get Limit`, m); };

          /* Start Process */
          reply(lang.wait());
          let query = args[0]
          if (args.length == 0) return reply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
          await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=${lol}&url=${query}`)
            .then(async data => {
              let video = data.result
              let thumb = video.thumbnail
              let vids = video.link
              let txt = `Tiktok No WM Downloader\n`
              txt += `Title\n${video.title}\n`
              txt += `Duration\n${video.duration}\n`
              txt += `Author/Nickname\n${video.author.username} / ${video.author.nickname}\n`
              txt += `Played\n${video.statistic.play_count}\n\n`
              txt += `_Mohon tunggu sebentar, video sedang dikirim..._`
              await sendFileFromUrl(from, thumb, txt, m);
              await sendFileFromUrl(from, vids, lang.ok(), m).catch(() => { reply(lang.err()) })
            })
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break

  /* Other */
  // pilhan ekspedisi: jnt, jne, pos, sicepat, dll
  case 'cekresi': {
    reply(lang.wait());
    if (args.length == 0) return reply(`Example: ${prefix + command} sicepat|003102532494\n\nPilihan Ekspedisi:\nJNE\nSICEPAT\nJNT/J&T\nTIKI\nJDL`)
    try {
      let user_id = m.sender.split('@')[0]
      let parseId = parseInt(user_id)
      await atlasData(parseId).then(async result => {
        let user = result.userID
        let getID = result.userID
        let value = result.limit
        console.log("Nomor user:", parseId, "ID user:", user)
        if (!user == parseId) { return reply(NotRegistered) }
        if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `How to Get Limit`, m); };
        //
        let setQuery = args[0]
        let query = setQuery.replace('|', '/')
        await fetchJson(`https://api.lolhuman.xyz/api/resi/${query}?apikey=${lol}`)
          .then(async result => {
            let data = result
            let txt = `Hasil Cek Resi\n\n*Info*`
            txt += `No Resi\n${data.no_resi}\n`
            txt += `Status: *${data.status}\n`
            txt += `Asal:\n${data.from}\n`
            txt += `Tujuan:\n${data.to}\n\n`
            txt += `*Pengirim*\n${data.pengirim.name}\n`
            txt += `Lokasi : ${data.pengirim.addres}\n\n`
            txt += `*Penerima*\n${data.penerima.name}\n`
            txt += `Lokasi : ${data.penerima.addres}\n\n`
            txt += `*Lokasi Pengiriman Terkini*\n> ${data.current_position} <\n\n`
            txt += `*Riwayat Perjalanan Paket*\n`
            let historys = data.history
            for (let datas of historys) {
              txt += `Waktu : ${datas.time}\n`
              txt += `Posisi : ${datas.position}\n`
              txt += `Deskripsi :\n${datas.desc}\n`
              txt += `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n`
            }
            reply(txt).catch(() => { reply(lang.err()) });
          });
        let getChange = await value - 1
        await atlasUpdate(getID, getChange);
        let logChanges = user.limit;
        console.log("Limit changes -1:", logChanges);
      });
    } catch {
      return reply(NotRegistered);
    }
  } break

  case 'shorturl1': {
    let link = args[0]
    fetchJson(`https://api.lolhuman.xyz/api/shortlink?apikey=${lol}&url=${link}`)
      .then(async data => {
        datas = data.result
        alpha.sendText(m.chat, datas, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'shorturl2': {
    let link = args[0]
    fetchJson(`https://api.lolhuman.xyz/api/shortlink2?apikey=${lol}&url=${link}`)
      .then(async data => {
        datas = data.result
        alpha.sendText(m.chat, datas, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'shorturl3': {
    let link = args[0]
    fetchJson(`https://api.lolhuman.xyz/api/shortlink3?apikey=${lol}&url=${link}`)
      .then(async data => {
        datas = data.result
        alpha.sendText(m.chat, datas, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'shorturl4': {
    let link = args[0]
    fetchJson(`https://api.lolhuman.xyz/api/shortlink4?apikey=${lol}&url=${link}`)
      .then(async data => {
        datas = data.result
        alpha.sendText(m.chat, datas, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'shortouo': {
    let link = args[0]
    fetchJson(`https://api.lolhuman.xyz/api/ouoshortlink?apikey=${lol}&url=${link}`)
      .then(async data => {
        let res = data.result
        let txt = `Link Origin: ${link}\nLink Shortened: ${res}`
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      })
  }

  case 'ouo': {
    let link = args[0]
    fetchJson(`https://api.lolhuman.xyz/api/ouo?apikey=${lol}&url=${link}`)
      .then(async data => {
        let res = data.result
        let txt = `Link Origin: ${link}\nLink Bypassed: ${res}`
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'filetobase64': {
    let link = args[0]
    fetchJson(`https://api.lolhuman.xyz/api/filetobase64?apikey=${lol}&file=${link}`)
      .then(async dataenc => {
        let res = dataenc.result
        let txt = `File Link Origin:\n${link}\n\nConverted to base64:\n${res}`
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'texttomorse': {
    let text = args.join(" ")
    fetchJson(`https://api.lolhuman.xyz/api/morse/encrypt?apikey=${lol}&text=${text}`)
      .then(async data => {
        let res = data.result
        let txt = `Text:\n${text}\n\nMorse:\n${res}`
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  case 'morsetotext': {
    let query = args.join(" ")
    fetchJson(`https://api.lolhuman.xyz/api/morse/decrypt?apikey=${lol}&text=${query}`)
      .then(async data => {
        let res = data.result
        let txt = `Text:\n${text}\n\nMorse:\n${res}`
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  /* Azusa Bot New Patch 
    added some features & guide / panduan untuk user awam alias gaptek :) */

  case 'ransoomer': case 'rangkum': case 'ringkasan': {
    reply(lang.wait())
    let query = args.join(" ")
    if (args.length == 0) return reply(`Example: ${prefix + command} Seringkali kita mendengar ungkapan “masa remaja adalah masa abu-abu, labil, emosional, dan ekspresif” benar, kan? Nah, Remaja didefinisikan merupakan masa peralihan dari masa kanak-kanak menuju masa dewasa. Menurut WHO (badan PBB untuk kesehatan dunia) batasan usia remaja adalah 12 sampai 24 tahun. Khusus pada kalangan SMA atau sederajat yang berada dalam usia 15 sampai 17 tahun. Wah, rentan sekali! Selain itu, manusia merupakan makhluk sosial yang berarti dalam kesehariannya memerlukan orang lain, dan hubungan antar manusia dibina melalui suatu pergaulan (interpersonal relationship). Pergaulan juga merupakan salah satu HAM (Hak Asasi Manusia) yang perlu dibebaskan, sehingga setiap manusia tidak boleh dibatasi dalam pergaulan, apalagi melakukan diskriminasi (pembedaan hak bagi manusia didasarkan perbedaan agama, ras, suku, dsb). Jadi, pergaulan antar manusia harusnya bebas, tetapi tetap berpedoman pada norma-norma manusia dan tidak menimbulkan pelanggaran hukum dan HAM.`)
    fetchJson(`https://api.lolhuman.xyz/api/resoomer?apikey=${lol}&text=${query}`)
      .then(async data => {
        let datas = data.result
        let txt = `*Kata-Kata Sebelum di Rangkum:*\n\n${query}`
        txt += `*Kata-Kata setelah di Rangkum:*\n\n${datas}`
        alpha.sendText(m.chat, txt, m).catch((err) => { reply(lang.err()) })
      })
  } break

  /**
   * @endsHere
   */

  /** = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 * @Commands
 * Type of
 * @GameGuides
 *  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
 */

  case 'er': case 'signet': {
    let query = args[0]
    let process = HonkaiGuides(query)
    try {
      await sendFileFromUrl(from, process, CreditsCaptions, m)
    } catch {
      alpha.sendMessage(m.chat, makeListValkyrie, { quoted: m })
    }
  } break
  case 'sheet': case 'genshin': {
    let query = args[0]
    let process = GenshinGuides(query)
    try {
      await sendFileFromUrl(from, process, CreditsCaptions, m)
    } catch {
      alpha.sendMessage(m.chat, makeListCharacter, { quoted: m })
    }
  } break

  case 'sheet2': case 'gibuild': {
    let query = args[0]
    let process = GenshinBuild(query)
    try {
      await sendFileFromUrl(from, process, CreditsCaptions, m)
    } catch {
      alpha.sendMessage(m.chat, makeListBuild, { quoted: m })
    }
  } break

  /**
   * @endsHere
   */

  /** = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 * @Commands
 * Type of
 * @Original
 *  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
 */

  case 'sound71': case 'sound72': case 'sound73': case 'sound74': case 'sound75': case 'sound1': case 'sound2': case 'sound3': case 'sound4': case 'sound5': case 'sound6': case 'sound7': case 'sound8': case 'sound9': case 'sound10': case 'sound11': case 'sound12': case 'sound13': case 'sound14': case 'sound15': case 'sound16': case 'sound17': case 'sound18 ': case 'sound19': case 'sound20': case 'sound21': case 'sound22': case 'sound23': case 'sound24': case 'sound25': case 'sound26': case 'sound27': case 'sound28': case 'sound29': case 'sound30': case 'sound31': case 'sound32': case 'sound33': case 'sound34': case 'sound35': case 'sound36': case 'sound37': case 'sound38': case 'sound39': case 'sound40': case 'sound41': case 'sound42': case 'sound43': case 'sound44': case 'sound45': case 'sound46': case 'sound47': case 'sound48': case 'sound49': case 'sound50': case 'sound51': case 'sound52': case 'sound53': case 'sound54': case 'sound55': case 'sound56': case 'sound57': case 'sound58': case 'sound59': case 'sound60': case 'sound61': case 'sound62': case 'sound63': case 'sound64': case 'sound65': case 'sound66': case 'sound67': case 'sound68': case 'sound69': case 'sound70': {
    reply(lang.wait())
    let sound1 = await(global.api('alfa', '/api/sound/' + command, {}, 'apikey'))
    alpha.sendMessage(from, { audio: { url: sound1 }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
      .catch((e) => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'coverbannerlol': {
    if (!text) return reply(lang.CoverBanLol(prefix, command))
    if (!text.includes('|')) return reply(lang.CoverBanLol(prefix, command))
    arg = args.join(' ')
    atas = arg.split('|')[0]
    bawah = arg.split('|')[1]
    const style = ['jinx7', 'jinx-8', 'kassadin-5', 'nissfortune-5', 'pyke-7', 'riven-8', 'sylas-5', 'vayne-9', 'kassadin-4', 'qiyana-5', 'renataglasc', 'shen-5', 'heimerdinger-3', 'nunu-5', 'orianna-4', 'ziggs-4', 'soraka-9', 'soraka-10', 'xayah-3', 'zeri-2', 'ahri-9', 'akshan-2', 'amumu-4', 'annie-3', 'bard-3', 'brand-5', 'diana-4', 'draven-3', 'ekko-6', 'elise-4', 'ezreal-7', 'gwen-3', 'janna-6', 'kindred-3', 'leblanc-7', 'leona-7', 'lissandra-4', 'lux-8', 'lux-9', 'nalzahar-4', 'nasteryi-7', 'reksai-3', 'sett-3', 'sivir-6', 'teemo-5', 'tristana-6', 'vladimir-5', 'xinzhao-5', 'zed-7', 'zeri', 'caitlyn-6', 'caitlyn-7', 'caitlyn-8', 'caitlyn-9', 'caitlyn-10', 'caitlyn-11', 'jayce-5', 'kaisa-8', 'karma-7', 'thresh-6', 'vi-5', 'yasuo-8', 'yasuo-9', 'fiora-8', 'norgana-7', 'nami-5', 'poppy-4', 'syndra-5', 'yuumi-4', 'jarvaniv-6', 'kayn-4', 'kayle-5', 'lillia-2', 'norgana-6', 'tryndamere-3', 'vex', 'vex-2', 'yone-4', 'tristana-5', 'viego-2', 'akali-10', 'anivia-4', 'darius-5', 'graves-6', 'seraphine-5', 'shaco-2', 'twistedfate-4', 'xayah-2', 'zyra-5', 'ahri-8', 'ashe-6', 'cassiopeia-4', 'evelynn-6', 'leblanc-6', 'nalphite-4', 'warwick-5', 'akshan', 'graves-5', 'nissfortune-5', 'pyke-6', 'rengar-6', 'thresh-5', 'diana-3', 'relia-11', 'olaf-3', 'pantheon-6', 'pantheon-7', 'riven-7', 'vayne-8', 'corki-4', 'naokai-2', 'rammus-4', 'veigar-4', 'zed-6', 'camille-4', 'drmundo-3', 'lucian-6', 'nordekaiser-4', 'renekton-4', 'sejuani-5', 'senna-3', 'sylas-4', 'varus-5', 'xerath-3', 'damwon', 'galio-3', 'gwen', 'gwen-2', 'jax-5', 'jinx-6', 'kayle-5', 'sion-2', 'twitch-4', 'velkoz-4', 'blitzcrank-3', 'leona-6', 'lulu-3', 'lulu-4', 'lux-7', 'nasus-5', 'nunu-4', 'rumble-2', 'samira-3', 'aphelios-2', 'blitzcrank-2', 'caitlyn-5', 'garen-6', 'kogmaw-4', 'leona-5', 'alzahar-3', 'syndra-4', 'wukong-4', 'yone-3', 'yuumi-3', 'zyra-4', 'alistar-4', 'chogath-2', 'draven-2', 'fiora-7', 'jarvan-5', 'jhin-5', 'karma-6', 'nautilus-2', 'neeko-5', 'shyvana-3', 'viego', 'azir-4', 'diana-4', 'gragas-2', 'janna-5', 'kalista-3', 'katarina-6', 'ornn-2', 'qiyana-4', 'quinn-3', 'rell', 'xinzhao-4', 'anivia-3', 'hecarim-4', 'illaoi-2', 'jayce-4', 'lissandra-3', 'nami-4', 'nasus-4', 'nidalee-5', 'seraphine-4', 'singed-2', 'skarner-2', 'soraka-7', 'varus-4', 'vladimir-4', 'yorick-4', 'zac', 'riven-8', 'ahri-7', 'akali-9', 'evelynn-5', 'kaisa-7', 'lucian-5', 'seraphine', 'seraphine-2', 'seraphine-3', 'aatrox-6', 'amumu-3', 'lise-3', 'fizz-5', 'karma-5', 'zeri-2', 'kassadin-3', 'khazix-4', 'sivir-5', 'twistedfate-3', 'ashe-5', 'brand-4', 'leesin-5', 'olaf-2', 'sett-2', 'kayle-4', 'leblanc-5', 'pyke-5', 'samira', 'samira-2', 'viktor-2', 'yasuo-7', 'zed-5', 'ezreal-6', 'nasteryi-6', 'shen-4', 'sona-4', 'vi-4', 'yone', 'yone-2', 'ziggs-3', 'ahri-6', 'cassiopeia-3', 'kindred-2', 'riven-6', 'kennen-2', 'kogmaw-3', 'lillia', 'syndra-3', 'teemo-4', 'thresh-4', 'vayne-7', 'velkoz-3', 'yasuo-6', 'zoe-4', 'bard-2', 'gnar-3', 'irelia-10', 'nocturne-4', 'poppy-3', 'enna-2', 'volibear-3', 'volibear-4', 'ekko-5', 'fiora-6', 'lucian-4', 'pantheon-5', 'leblanc-4', 'norgana-5', 'urgot-4', 'zyra-3', 'jinx-5', 'sett', 'alistar-3', 'katarina-5', 'lux-5', 'lux-6', 'nasteryi-5', 'nalphite-3', 'nordekaiser-3', 'reksai-2', 'sejuani-4', 'tryndamere-2', 'xerath-2', 'aphelios', 'garen-5', 'jax-4', 'karma-4', 'leesin-4', 'leona-4', 'nidalee-4', 'rengar-5', 'soraka-5', 'soraka-6', 'swain-4', 'sylas-3', 'trundle-2', 'vladimir-3', 'aatrox-5', 'akali-8', 'ekko-4', 'qiyana-3', 'senna', 'yasuo-5', 'ashe-4', 'darius-4', 'hecarim-3', 'norgana-4', 'nami-3', 'riven-4', 'riven-5', 'ryze-3', 'neeko-3', 'eeko-4', 'xayahrakan', 'zoe-3', 'airi-6', 'noctune-3', 'pantheon-3', 'pantheon-4', 'rammus-3', 'udyr-2', 'veigar-3', 'akali-7', 'garen-4', 'irelia-8', 'irelia-9', 'jinx-4', 'lucian-3', 'pyke-4', 'warwick-4', 'caitlyn-3', 'caitlyn-4', 'kaisa-6', 'qiyana', 'qiyana-2', 'yasuo-4', 'jhin-3', 'karma-3', 'nordekaiser-2', 'tristana-4', 'nami', 'poppy-3', 'aatrox', 'lulu', 'braum', 'camille', 'karma', 'kindred', 'hecarim', 'norgana', 'renekton', 'kennen', 'akali', 'varus', 'orianna', 'blitzcrank', 'bloodmoonjhin', 'bloodmoontalon', 'arcaderiven', 'udyr', 'rumble', 'gnar', 'shaco', 'twitch', 'veigar', 'tryndamere', 'viktor', 'trundle', 'ezreal', 'poppy', 'lissandra', 'jax', 'vi', 'vellkoz', 'darius', 'diana', 'corki', 'sivir', 'ryze', 'azir', 'tristana', 'kled', 'volibear', 'twisterfate', 'anivia', 'zyra', 'quinn', 'nissfortune', 'kalista', 'ezrealandshen', 'gangplank', 'hextachannie', 'elementalistlux', 'xinzhao', 'vayne', 'jhin', 'reksai', 'graves', 'kogmaw', 'garen', 'porojinx', 'warwick', 'fizz', 'caitlyn', 'rengar', 'talon', 'nidalee', 'lux', 'jinx', 'thresh', 'wukong', 'sona', 'ahri', 'riven', 'zed', 'leesin', 'janna', 'katarina', 'leblanc', 'leona', 'fiora', 'lucian', 'shen', 'ziggs', 'yasuo', 'ekko', 'draven', 'ashe', 'ekko-5', 'teemo', 'khazix', 'nasteryi', 'brand', 'taliyah', 'nocturne', 'cassiopeia', 'xayah', 'rakan', 'syndra', 'irelia', 'leesingf', 'yasuobm', 'aurelionsol', 'pantheon', 'bard', 'singed', 'soraka', 'taric', 'naokai', 'xerath', 'gragas', 'jayce', 'riven3', 'nalphite', 'naster_yi2', 'chogath', 'zed2', 'darius2', 'talon2', 'kayle', 'drmundo', 'rammus', 'vladimir', 'ahri-2', 'karma-2', 'jarvan', 'nidalee-2', 'vayner-2', 'warwick-2', 'rengar-2', 'yasuo-3', 'galio', 'pantheon-2', 'jinx-2', 'nalzahar', 'olaf', 'shyvana', 'thresh-2', 'sion', 'caitlyn-2', 'swain', 'kassadin', 'heimerdinger', 'amumu', 'alistar', 'nasus', 'sejuani', 'ezreal3', 'nautilus', 'fiddlesticks', 'sona2', 'karthus', 'ekko2', 'orianna2', 'velkoz-2', 'xinzhao2', 'garen2', 'annie-2', 'yasuonb', 'rivendb', 'kayn', 'kaisa', 'veigar-2', 'vayne-3', 'twitch-2', 'tristana-2', 'rhaast', 'nalzahar-2', 'kayle-2', 'illaoi', 'fizz-2', 'elise', 'brand-2', 'syndra-2', 'soraka-2', 'nissfortune-2', 'hecarim-2', 'ezreal-2', 'ahri-3', 'yorick', 'z-2', 'tahmkench', 'shen-2', 'ornn', 'cassiopeia-2', 'renekton-2', 'nasus-2', 'jarvan-2', 'fiora-2', 'alistar-2', 'taric-2', 'zac-2', 'yorick-2', 'varus-2', 'nordekaiser', 'nasteryi-3', 'katarina-2', 'janna-2', 'fiora-3', 'evelynn', 'elise-2', 'ashe-2', 'annie', 'zoe', 'vi-2', 'vayne-4', 'rengar-3', 'jhin-2', 'graves-2', 'xayahrakan', 'warwick-3', 'nissfortune-3', 'lux-2', 'kaisa', 'jarvaniv', 'zoe-2', 'swain-2', 'sivir-2', 'nissfortune-4', 'jax-2', 'galio-2', 'varus-3', 'urgot', 'twistedfate-2', 'taric-3', 'swain-3', 'shen-3', 'rammus-2', 'pyke-2', 'pyke', 'nasus-3', 'talon', 'khazix-2', 'kayn-2', 'irelia-2', 'evelynn-2', 'akali-2', 'vladimir-2', 'jayce-2', 'janna-3', 'irelia-4', 'irelia-3', 'diana-2', 'zed-3', 'teemo-2', 'taliyah-2', 'shyvana-2', 'poppy-2', 'katarina-3', 'jax-3', 'garen-3', 'darius-3', 'chogath-2', 'aatrox-2', 'soraka-3', 'sona-3', 'sivir-3', 'kaisa-2', 'akali-4', 'akali-3', 'xinzhao-3', 'urgot-3', 'urgot-2', 'tristana-3', 'talon-3', 'sejuani-2', 'nunu-2', 'lulu-2', 'lucian-2', 'irelia-6', 'irelia-5', 'ashe-3', 'ziggs-2', 'yasuo-2', 'sona-4', 'nalphite-2', 'khazix-3', 'kayn-3', 'jinx-3', 'orianna-3', 'kaisa-4', 'kaisa-3', 'heimerdinger-2', 'ezreal-4', 'evelynn-3', 'akali-5', 'ahri-4', 'thresh-3', 'ryze-2', 'kled-2', 'janna-4', 'graves-3', 'fiddlesticks-2', 'ekko-3', 'amumu-2', 'nami-2', 'lulusoraka', 'lissandra-2', 'leona-3', 'leona-2', 'leblanc-2', 'ezrealmissfortune', 'camille-2', 'twitch-3', 'soraka-4', 'renekton-3', 'neeko-2', 'neeko', 'nasteryi-4', 'drmundo-2', 'akali-6', 'zyra-2', 'zilean', 'wukong-3', 'wukong-2', 'teemo-3', 'skarner', 'sivir-4', 'riven-2', 'quinn-2', 'pyke-3', 'nocturne-2', 'nidalee-3', 'norgana-2', 'leesin-3', 'kogmaw-2', 'kassadin-2', 'karthus-2', 'kalista-2', 'gnar-2', 'gangplank-2', 'corki-2', 'azir-3', 'azir-2', 'aatrox-4', 'aatrox-3', 'vi-3', 'vayne-6', 'vayne-5', 'tahmkench-2', 'sylas-2', 'sylas', 'sejuani-3', 'fiora-4', 'nunu-3', 'norgana-3', 'kayle-3', 'brand-3', 'anivia-2', 'ahri-5', 'yorick-3', 'rengar-4', 'fizz-4', 'fizz-3', 'corki-3', 'zed-4', 'rakan-2', 'leblanc-3', 'kaisa-5', 'jarvaniv', 'ivern', 'irelia-7', 'fiora-5', 'evelynn-4', 'camille-3', 'yuumi-2', 'yuumi', 'lux-4', 'lux-3', 'katarina-4', 'jayce-3', 'graves-4', 'ezreal-5']
    if (!style.includes(m2)) {
      let listt = `${lang.coverbannerlol(style.length)}`
      no = 0

      for (var i = 0; i < style.length; i++) {
        no += 1

        listt += no.toString() + '.  ' + style[i] + '\n'

      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: atas, heroes: bawah }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'pubglogomaker': {
    if (!text) return reply(lang.pubglogomaker(prefix, command))
    if (!text.includes('|')) return reply(lang.pubglogomaker(prefix, command))
    arg = args.join(' ')
    atas = arg.split('|')[0]
    bawah = arg.split('|')[1]
    const style = ['women', 'nen']
    if (!style.includes(m2)) {
      let listt = `${lang.pubglogomaker_(style.length)}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, style: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'colorfulpubg': {
    if (!text) return reply(lang.colorfulpubg(prefix, command))
    if (!text.includes('|')) return reply(lang.colorfulpubg(prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['gold', 'green-blue', 'pink-yellow', 'green-yellow', 'cyan-purple', 'orange-red']
    if (!style.includes(m2)) {
      let listt = `${lang.colorfulpubg_(style.length)}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, color: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'astronotspace': {
    if (!text) return reply(lang.astronotspace(prefix, command))
    if (!text.includes('|')) return reply(lang.astronotspace(prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['anubis', 'dragon', 'duck', 'gorilla', 'panda', 'panther', 'shark', 'squirrel', 'tiger', 'wolf', 'bull', 'rhino', 'rooster', 'pikachu', 'parrot', 'boar', 'bee', 'hurricane', 'deer', 'horse', 'crocodile', 'pitbull']
    if (!style.includes(m2)) {
      let listt = `${lang.pubglogomaker_(style.length)}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, style: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'wallpaperaov': {
    if (!text) return reply(lang.wallpaperaov(prefix, command))
    if (!text.includes('|')) return reply(lang.wallpaperaov(prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['allain', 'allain-2', 'kahlii-3', 'nakroth-4', 'preyta-2', 'skud-2', 'taara-4', 'valhein-4', 'arum-4', 'butterfly-6', 'capheny-3', 'elandorr-2', 'ilumia-3', 'ishar-4', 'lauriel-6', 'laville', 'liliana-5', 'nurad-8', 'quillen-5', 'rouie', 'rouie-2', 'taara-3', 'telannas-5', 'yena-4', 'yena-5', 'zata', 'ata', 'lauriel-5', 'qi-3', 'roxie-3', 'wukong-5', 'aleister-2', 'amily-3', 'arthur-3', 'arum-3', 'astrid-2', 'dirak', 'dirak-2', 'grakk-5', 'hayate-4', 'ishar-2', 'ishar-3', 'jinna-2', 'keera', 'keera-3', 'lauriel-4', 'nax', 'natalya-5', 'quillen-4', 'raz-3', 'richter-2', 'ryoma-4', 'telannas-4', 'ulen-6', 'valhein-3', 'violet-7', 'yorn-4', 'zill-3', 'ignis-2', 'lubu-2', 'naloch-2', 'sephera-3', 'butterfly-5', 'diaochan-4', 'elandoor', 'krizzix-2', 'nina-2', 'natalya-3', 'veera-3', 'violet-6', 'yena-2', 'yena-3', 'krizziz', 'nurad-7', 'volkath', 'volkath-2', 'airi-4', 'arduin-3', 'enzo-3', 'hayate-3', 'krixi-3', 'nurad-6', 'quillen-3', 'telannas-3', 'wisp-2', 'zip-2', 'gildur-2', 'ishar', 'tulen-5', 'amily-2', 'annette-3', 'arthur-2', 'butterfly-4', 'errol-2', 'joker', 'kahlii-2', 'kilgroth', 'lauriel-3', 'nurad-5', 'arduin-2', 'darcy-2', 'florentino-3', 'noren', 'quillen-2', 'ryoma-5', 'sephera-3', 'violet-5', 'airi-3', 'diaochan-3', 'diaochanlubu', 'elsuroxie', 'lindis-3', 'taara-2', 'toro-2', 'tulen-4', 'violet-4', 'wonderwoman', 'ybneth', 'zill-2', 'arum-2', 'florentino-2', 'liliana-4', 'nurad-4', 'yorn-3', 'zip', 'annette-2', 'qi', 'qi-2', 'celica', 'capheny-2', 'diaochan-2', 'elsu-2', 'ilumia-2', 'krixi-2', 'narja-2', 'nurad-3', 'preyta', 'telannas-2', 'valhein', 'veera-2', 'veres-2', 'yorn-2', 'zephys-2', 'airi-2', 'annette', 'baldum', 'butterfly-3', 'elsu-2', 'errol', 'fennik', 'lauriel-2', 'liliana-2', 'liliana-3', 'lindis-2', 'nurad-2', 'nakroth-2', 'nakroth-3', 'natalya-2', 'raz-2', 'ryoma-2', 'slimz', 'teemee', 'tulen-2', 'tulen-3', 'violet-3', 'wiro', 'wukong-3', 'wukong-4', 'zill', 'aleister', 'alice', 'arduin', 'arthur', 'azzenka', 'batman', 'butterfly-2', 'cresh', 'darcy', 'diaochan', 'enzo-2', 'hayate-2', 'jinna', 'lubu', 'nganga', 'violet-2', 'wukong-2', 'zanis-2', 'florentino', 'gildur', 'ignis', 'naloch', 'narja', 'nakroth', 'omen', 'payna', 'raz', 'rourke', 'roxie', 'ryoma', 'skud', 'taara', 'toro', 'valhein', 'veres', 'violet', 'wisp', 'wukong', 'wonderwoman', 'xeniel', 'yorn', 'zanis', 'elsu', 'flash', 'hayate', 'ilumia', 'kahlii', 'krixi', 'lauriel', 'liliana', 'lindis', 'nina', 'nurad', 'natalya', 'quillen', 'richter', 'sephera', 'superman', 'telannas', 'thane', 'airi', 'amily', 'arum', 'astrid', 'butterfly', 'capheny', 'enzo', 'tulen', 'veera', 'yena', 'ryoma-4', 'zephys', 'zuka']
    if (!style.includes(m2)) {
      let listt = `${lang.coverbannerlol(style.length)}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, heroes: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'maketeamlogo': {
    if (!text) return reply(lang.maketeamlogo('style', 'anubis', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('style', 'anubis', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['anubis', 'cowgirl', 'dragon', 'duck', 'ghost', 'gorilla', 'panda', 'panther', 'shark', 'squirrel', 'tiger', 'wolf', 'bee', 'crocodile', 'deer', 'pitbull', 'horse', 'hurricane', 'indian', 'assassin', 'boar', 'rapid', 'raven', 'warrior', 'pikachu', 'pubg', 'ninja', 'drift', 'yasuo', 'rhino', 'phoenix', 'bull', 'hornet', 'eagle', 'hunter', 'parrot', 'rooster', 'lion', 'skull', 'wolver', 'wolf', 'cobra', 'dragon', 'panther', 'owl', 'tiger', 'reaper', 'warrior']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Style')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, style: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'circlemarcotteam': {
    if (!text) return reply(lang.maketeamlogo('logo', 'lionsnake', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('logo', 'lionsnake', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['panther', 'rhino', 'squirrel', 'unicorn', 'zebra', 'lionsnake', 'bear', 'bull', 'dragon', 'eagle', 'fox', 'griffin', 'hawk', 'lion', 'peacock', 'phoenix', 'tiger', 'wolver']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Logo')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, logo: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'wallpaperml': {
    if (!text) return reply(lang.maketeamlogo('heroes', 'aldous', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('heroes', 'aldous', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['aldous', 'alice-2', 'angela-2', 'argus-2', 'chou', 'chou-2', 'estes', 'eudora', 'eudora-2', 'granger', 'granger-2', 'gusion-3', 'hanabi-2', 'hanzo', 'helcurt', 'layla-3', 'lesley-4', 'lunox-2', 'odette-3', 'saber', 'thamuz', 'vexana', 'argus', 'dyrroth', 'esmeralda-2', 'kadita-2', 'lancelot', 'leomord-2', 'lylia', 'vale', 'valir', 'xborg', 'zhask', 'alice', 'alpha', 'athena', 'badang', 'balmond', 'bane', 'diggie', 'trunks', 'fanny-2', 'fanny-3', 'freya', 'guinevere', 'gusion', 'gusion-2', 'hanabi', 'harith', 'harith-2', 'hayabusa-2', 'kadita', 'kagura-2', 'kagura-3', 'karina-2', 'kimmy', 'layla-2', 'leomord', 'lesley-2', 'lesley-3', 'lunox', 'nartis', 'niya-2', 'nana', 'nana-2', 'natalia', 'natalia-2', 'odette-2', 'pharsa', 'rafaela-2', 'selena-2', 'zilong', 'alucard', 'angela', 'bruno', 'change', 'claude', 'fanny', 'hayabusa', 'hilda', 'hylos', 'kagura', 'karina', 'karrie', 'layla', 'lesley', 'lolita', 'ninotaur', 'ninsittar', 'niya', 'noskov', 'odette', 'rafaela', 'selena']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Heroes')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, heroes: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'dragonballfb': {
    if (!text) return reply(lang.maketeamlogo('character', 'aldous', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('character', 'aldous', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['cabba', 'caulifla', 'cooler', 'cumber', 'hit', 'kale', 'kaminoren', 'gokuui', 'xenogokuss3', 'xenogokuss4', 'xenovegeta', 'xenovegito', 'android-18', 'blackgoku', 'bulma', 'frieza', 'gotenks-2', 'kaio', 'krillinandroid-18', 'launch', 'nutenroshi-2', 'oldkai', 'oolong', 'pilaf', 'tienshinhan', 'trunks-3', 'bardock', 'gotenks', 'nutenroshi', 'piccolo', 'songoku-2', 'songoku-3', 'songoten', 'trunks-2', 'vegeta-2', 'vegito', 'krillin', 'najinbuu', 'songohan', 'songoku', 'trunks', 'vegeta']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Character')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, character: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'bannerofaov': {
    if (!text) return reply(lang.maketeamlogo('character', 'aphelios', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('character', 'aphelios', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['aphelios', 'karma', 'leesin-2', 'nidalee-2', 'soraka-2', 'soraka-3', 'swain', 'akali-4', 'ekko-2', 'qiyana', 'senna', 'yasuo-3', 'ahri-2', 'akali-3', 'ashe-3', 'caitlyn', 'camille', 'darius', 'draven', 'evelynn-2', 'kaisa', 'kayle', 'pantheon', 'rengar', 'sivir-2', 'sona', 'vayne-3', 'wukong', 'zoe-2', 'zyra', 'azir', 'garen', 'jinx-3', 'katarina-3', 'lux-3', 'nasus', 'nidalee', 'sejuani', 'sylas', 'vayner-2', 'vi-2', 'warwick-2', 'fiora-2', 'irelia-3', 'janna-2', 'jax', 'leesin', 'nasteryi-2', 'norgana', 'nami', 'riven-2', 'riven-3', 'talon-2', 'neeko', 'neeko-2', 'xayahrakan', 'zoe', 'ahri', 'ezreal-2', 'janna', 'jinx-2', 'lulu', 'lux-2', 'nissfortune', 'poopy', 'soraka', 'syndra', 'ezreal', 'graves', 'jayce', 'katarina-2', 'lux', 'yuumi', 'aatrox', 'akali-2', 'diana', 'elise', 'evelynn', 'jhin-2', 'kalista-2', 'kennen', 'pyke-2', 'shen', 'sivir', 'talon', 'twistedfate', 'thresh-2', 'yasuo-2', 'zilean', 'ashe-2', 'kalista', 'khazix', 'riven', 'riven', 'shyvana', 'thresh', 'zed-2', 'akali', 'ashe', 'ekko', 'fiora', 'irelia', 'irelia-2', 'jhin', 'jinx', 'katarina', 'leona', 'lucian', 'nasteryi', 'pyke', 'vayne', 'vi', 'warwick', 'yasuo', 'zed']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Character')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, character: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'effect3donbeach': {
    if (!text) return reply(lang.maketeamlogo('background', 'beach-1', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('background', 'beach-1', prefix, command))
    const style = ['beach-1', 'beach-2', 'beach-3', 'beach-4', 'beach-5', 'beach-6']
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Background')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, background: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'cutegirlgamer': {
    if (!text) return reply(lang.maketeamlogo('logo', 'style-1', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('logo', 'style-1', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['style-1', 'style-2', 'style-3', 'style-4', 'style-5', 'style-6', 'style-7', 'style-8', 'style-9', 'style-10', 'style-11', 'style-12']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Logo')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, logo: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'footballteam': {
    if (!text) return reply(lang.maketeamlogo('logo', 'nau-6', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('logo', 'nau-6', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['nau-1', 'nau-2', 'nau-3', 'nau-4', 'nau-5', 'nau-6']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Logo')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, logo: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'beautifulshimmering': {
    if (!text) return reply(lang.maketeamlogo('champion', 'kahlii', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('champion', 'kahlii', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['aleister', 'alice', 'butterfly', 'diaochan', 'kahlii', 'krixi', 'nina', 'nakroth', 'natalya', 'taara', 'thane', 'violet', 'zanis', 'zata', 'airi', 'annette', 'arthur', 'arum', 'astrid', 'elandorr', 'gildur', 'gildur', 'hayate', 'ilumia', 'ishar', 'lauriel', 'lindis', 'nurad', 'quillen', 'rouie', 'sephera', 'yena', 'yorn']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Champion')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, champion: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'pubgcutelogo': {
    if (!text) return reply(lang.maketeamlogo('logo', 'soldier', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('logo', 'soldier', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['chicken', 'soldier']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Logo')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, logo: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'elegantrotation': {
    if (!text) return reply(lang.maketeamlogo('logo', 'dragon', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('logo', 'dragon', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['bull', 'dragon', 'eagle', 'lion', 'rhino', 'tiger']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Logo')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, logo: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'logogamingassasin': {
    if (!text) return reply(lang.maketeamlogo('logo', 'style-2', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('logo', 'style-2', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['style-1', 'style-2', 'style-3', 'style-4', 'style-5', 'style-6', 'style-7', 'style-8', 'style-9', 'style-10', 'style-11', 'style-12', 'style-13', 'style-14', 'style-15', 'style-16', 'style-17', 'style-18', 'style-19', 'style-20', 'style-21', 'style-22', 'style-23', 'style-24']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Logo')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, logo: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'introvideomaker': {
    if (!text) return reply(lang.maketeamlogo('logo', 'tiger', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('logo', 'tiger', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['bull', 'dragon', 'eagle', 'lion', 'tiger', 'skull']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Logo')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, logo: m2 }, 'apikey'))
      alpha.sendMessage(from, { video: { url: textpro2 }, mimetype: 'video/mp4', caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'gaminglogo4fvs': {
    if (!text) return reply(lang.maketeamlogo('logo', 'soldier', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('logo', 'soldier', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['girl', 'ghost', 'soldier-2', 'swat', 'woman', 'soldier', 'sniper', 'raccoon', 'rabbit', 'panda', 'chicken']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Logo')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, logo: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'blueneon': {
    if (!text) return reply(lang.maketeamlogo('logo', 'dugong', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('logo', 'dugong', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['tiger', 'shark', 'dugong', 'bull', 'cheetah', 'lion']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Logo')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, logo: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'metalmascot': {
    if (!text) return reply(lang.maketeamlogo('logo', 'dragon', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('logo', 'dragon', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['snakelion', 'dragon', 'ragon-2', 'eagle', 'falcon', 'fox', 'lion', 'panther', 'phoenix', 'phoenix', 'rhino', 'squirrel', 'tiger', 'unicorn', 'wolf', 'zebra']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Logo')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, logo: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'anonymous2': {
    if (!text) return reply(lang.maketeamlogo('style', 'style1', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('style', 'style1', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['style1', 'style2', 'style3']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Style')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = (api('alfa', '/api/ephoto360/anonymous' + command, { text: m1, style: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'lolpentakill': {
    if (!text) return reply(lang.maketeamlogo('style', 'kassadin', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('style', 'kassadin', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['jhin', 'syndra', 'olaf', 'nocturne', 'chogath', 'kassadin', 'nidalee', 'fiora', 'fiddlesticks', 'garen', 'irelia-2', 'janna', 'lissandra', 'ezreal', 'riven', 'nalphite', 'khazix', 'nasteryi', 'irelia', 'alista', 'jayce', 'singed', 'galio', 'velkoz', 'yi', 'yasuo', 'sona', 'nidalee-2', 'teemo', 'leesin', 'jinx', 'zed', 'camille', 'brand', 'warwick', 'rengar', 'vayne', 'leona', 'ashe', 'ezreal', 'annie', 'xerath', 'ahri', 'kayle', 'nissfortune', 'caitlyn', 'vi', 'leesin', 'darius', 'fizz', 'bloodyasuo', 'ekko', 'lucian', 'rakanandayah']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Style')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, style: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'avatarleagueofking': {
    if (!text) return reply(lang.maketeamlogo('style', 'ishar-4', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('style', 'ishar-4', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['arum-6', 'baldum-3', 'elandorr-3', 'hayate-5', 'ilumia-5', 'ishar-4', 'lauriel-8', 'nax-5', 'nurad-9', 'quillen-6', 'teemee-3', 'telannas-8', 'volkath-3', 'yena-4', 'yena-5', 'butterfly-10', 'laville', 'yuumi', 'laville-2', 'nakroth-7', 'omen-6', 'rouie-2', 'taara-4', 'zanis-8', 'zata', 'zata-2', 'yasuo', 'elsu-6', 'fennik-5', 'liliana-7', 'paine', 'paine-2', 'rouie', 'astrid-4', 'ata', 'ata-2', 'lauriel-8', 'omen-5', 'qi-3', 'roxie-5', 'taara-5', 'violet-12', 'wukong-7', 'wukong-8', 'hayate-4', 'ishar-3', 'jinna-5', 'keera-2', 'lauriel-7', 'quillen-5', 'richter-4', 'ryoma-6', 'telannas-8', 'tulen-9', 'yorn-8', 'aleister-4', 'dirak-2', 'grakk-5', 'kerra', 'raz-5', 'amily-5', 'athur-7', 'arum-5', 'ishar-2', 'nax-4', 'natalya-6', 'natalya-7', 'zill-5', 'diaochan-6', 'ignis-4', 'lubu-8', 'naloch-7', 'sephera-4', 'elandorr', 'elandorr-2', 'krizziz-2', 'violet-11', 'yena-3', 'arduin-4', 'enzo-3', 'errol-3', 'hayate-3', 'krixi-7', 'krizziz', 'nurad-8', 'volkath', 'volkath-2', 'wisp-4', 'wukong-6', 'celica', 'gildur-4', 'ishar', 'nurad-7', 'quillen-4', 'tulen-8', 'lauriel-6', 'qi', 'qi-2', 'darcy-3', 'florentino-3', 'noren-3', 'ryoma-5', 'sephera-3', 'annette-4', 'capheny-3', 'elsu-5', 'narja', 'veres-3', 'violet-10', 'zip', 'zip-2', 'diaochan-5', 'enzo-2', 'lubu-7', 'nganga-4', 'payna-3', 'roxie-4', 'violet-9', 'zanis-7', 'zephys-6', 'enzo', 'liliana-6', 'lindis-5', 'xeniel-5', 'airi-9', 'errol-2', 'yena-2', 'zuka-8', 'notos', 'chaugnar', 'kahlii', 'lubo', 'nina', 'krixi', 'zanis-3', 'jinna', 'fennik', 'airi', 'ormarr', 'toro', 'butterfly', 'nakroth', 'gildur', 'omega', 'natalya', 'lumburr', 'yorn', 'dieu-thuyen', 'nganga', 'grankk-2', 'azzenka', 'alice', 'violet', 'violet2', 'butterfly2', 'krixi2', 'natalya2', 'taara', 'ormarr2', 'valhein', 'zephys', 'nakroth2', 'aleister', 'payna', 'wukong', 'naloch', 'kricnak', 'slimz2', 'cresht', 'slimz', 'dieu-thuyen2', 'thane-2', 'preyta', 'fennik-2', 'raz', 'preyta-2', 'payna-2', 'illumia', 'nortos-2', 'yorn-2', 'violet-3', 'valhein-2', 'taara-2', 'skud-1', 'skud', 'natalya-3', 'lu-bu', 'jinna-2', 'illumia-2', 'butterfly-4', 'batman', 'zuka-2', 'airi-2', 'zanis', 'nurad', 'nurad-2', 'nina-2', 'lauriel-2', 'ignis-2', 'ignis', 'grakk', 'airi-3', 'zill-2', 'zill', 'zanis-2', 'yorn-3', 'veera-3', 'veera-2', 'telannas', 'superman', 'naloch-2', 'krixi-3', 'butterfly-5', 'violet-5', 'veera-4', 'telannas-2', 'illumia-3', 'batman-2', 'arduin-2', 'arduin', 'wukong-2', 'nakroth-3', 'arthur', 'ryoma-2', 'ryoma', 'raz-2', 'nganga-2', 'astrid-2', 'astrid', 'zanis-4', 'xeniel', 'wukong-3', 'noren', 'lauriel-3', 'joker', 'xeniel-2', 'telannas-3', 'nurad-3', 'lubu-4', 'lubu-3', 'kriknak-2', 'kahlii-2', 'diaochanlubu', 'chaugnar-2', 'azzenka-2', 'alice-2', 'aleister-2', 'noren-2', 'lubu-5', 'lauriel-4', 'kilgoth', 'gildur-2', 'fennik-3', 'zephys-3', 'wonderwoman', 'superman-2', 'slimz-3', 'natalya-4', 'krixi-5', 'krixi-4', 'zephys-2', 'zanis-5', 'yorn-4', 'xeniel-3', 'wonderwoman-2', 'violet-4', 'naloch-3', 'airi-4', 'telannas-4', 'ormarr-4', 'ormarr-3', 'nakroth-4', 'kilgroth-2', 'kahlii-3', 'grakk-3', 'natalya-5', 'fennik-4', 'valhein-3', 'teemee-2', 'teemee', 'lindis', 'zuka-3', 'tulen', 'toro-2', 'nina-3', 'naloch-4', 'lumburr-2', 'lindis-2', 'joker-2', 'grakk-4', 'gildur-3', 'aleister-3', 'tulen-2', 'toro-3', 'taara-3', 'omen-2', 'omen', 'zill-3', 'arthurtelannas', 'zuka-4', 'nakroth-5', 'nax', 'liliana', 'raz-3', 'liliana-2', 'nax-2', 'krixnak-3', 'joker-3', 'chaugnar-3', 'wisp', 'ryoma-3', 'batman-3', 'airi-6', 'tulen-3', 'cresht-3', 'cresht-2', 'astris-3', 'flash', 'arum-2', 'arum', 'butterfly-6', 'alice-3', 'xeniel-4', 'valhein-4', 'tulen-4', 'rourke-2', 'rourke', 'nurad-4', 'nax-3', 'wisp-2', 'narja-2', 'narja', 'zuka-5', 'jinna-3', 'butterfly-7', 'arthur-5', 'valhein-5', 'superman-3', 'liliana-3', 'kilgroth', 'wirosabaleng', 'roxie-2', 'roxie', 'wukong-4', 'baldum-2', 'baldum', 'zephys-4', 'annette-2', 'annette', 'telannas-6', 'raz-4', 'nurad-6', 'nurad-5', 'jinna-4', 'amily', 'ybneth-2', 'ybneth', 'ilumia-4', 'amily-2', 'xeniel-5', 'veera-5', 'liliana-4', 'flash-2', 'arthur-2', 'omen-3', 'lindis-3', 'elsu-2', 'elsu', 'richter-2', 'richter', 'nina-4', 'thane-3', 'ryoma-4', 'quillen-2', 'quillen', 'lauriel-5', 'arum-3', 'wisp-3', 'violet-7', 'sephera-2', 'sephera', 'naloch-5', 'krixi-6', 'alice-4', 'tulen-5', 'skud-3', 'rourke-3', 'nakroth-6', 'florentino-2', 'florentino', 'elsu-3', 'butterfly-8', 'amily-3', 'zuka-7', 'zuka-6', 'yorn-7', 'yorn-6', 'veres-2', 'veres', 'naloch-6', 'cresht-4', 'azzenka-3', 'airi-7', 'zephys-5', 'yorn-5', 'violet-8', 'valhein-6', 'thane-4', 'roxie-3', 'nakroth-7', 'kahlii-4', 'elsu-4', 'darcy-2', 'darcy', 'capheny', 'zill-4', 'hayate-2', 'hayate', 'cresht-5', 'annette-3', 'amily-4', 'tulen-7', 'telannas-7', 'omen-4', 'lindis-4', 'liliana-5', 'ignis-3', 'errol', 'capheny-2', 'arum-4', 'zanis-6', 'wukong-5', 'thane-5', 'slimz-4', 'skud-4', 'richter-3', 'quillen-3', 'azzenka-4', 'arduin-3', 'airi-8']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Style')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, style: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'avatarff': {
    if (!text) return reply(lang.maketeamlogo('character', 'antonio', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('character', 'antonio', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['a124', 'alok', 'alvaro', 'andrew', 'antonio', 'caroline', 'ford', 'hayato', 'joseph', 'kelly', 'kla', 'laura', 'naxim', 'niguel', 'nisa', 'noco', 'nikita', 'notora', 'olivia', 'paloma', 'rafael', 'shani', 'steffie', 'wukong']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Character')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, character: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'overwatchwallpaper': {
    if (!text) return reply(lang.maketeamlogo('character', 'brigitte', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('character', 'brigitte', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['ana', 'ashe', 'ashe-2', 'baptiste', 'baptiste-2', 'brigitte', 'dva', 'dva-2', 'genji', 'hanzo', 'junkrat', 'lucio', 'nccree', 'nei', 'nercy', 'nercy-2', 'nercy-3', 'noira', 'pharah', 'reaper', 'roadhog', 'soldier-76', 'sombra', 'sombra-2', 'symmetra', 'tracer', 'tracer-2', 'widowmaker', 'widowmaker-2', 'zarya']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Character')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, character: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'rovwallpaperhd': {
    if (!text) return reply(lang.maketeamlogo('hero', 'keera', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('hero', 'keera', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['alice-5', 'arthur-8', 'dirak-3', 'errol', 'grakk-6', 'keera', 'lorion', 'nina-6', 'tulen-10', 'yena', 'zip-3', 'zuka-9', 'arum-6', 'baldum-3', 'elandorr-3', 'hayate-5', 'ilumia-5', 'ishar-4', 'lauriel-8', 'nax-5', 'nurad-9', 'quillen-6', 'teemee-3', 'telannas-8', 'yena-4', 'yena-5', 'butterfly-10', 'laville', 'laville-2', 'nakroth-7', 'omen-6', 'rouie-2', 'taara-5', 'zanis-8', 'zata', 'zata-2', 'capheny-4', 'elsu-6', 'fennik-5', 'liliana-7', 'paine', 'paine-2', 'rouie', 'astrid-4', 'ata', 'ata-2', 'lauriel-8', 'omen-5', 'qi-3', 'roxie-5', 'taara-5', 'violet-12', 'wukong-7', 'wukong-8', 'hayate-4', 'ishar-3', 'jinna-5', 'lauriel-7', 'quillen-5', 'richter-4', 'ryoma-6', 'telannas-8', 'tulen-9', 'yorn-7', 'aleister-4', 'dirak', 'dirak-2', 'grakk-5', 'kerra', 'raz-4', 'athur-7', 'arum-5', 'ishar-2', 'nax-4', 'natalya-7', 'valhein-7', 'zill-5', 'diaochan-6', 'ignis-4', 'lubu-8', 'naloch-7', 'sephera-4', 'elandorr', 'elandorr-2', 'krizzix', 'krizzix-2', 'violet-11', 'yena-3', 'arduin-4', 'enzo-3', 'errol-3', 'hayate-3', 'krixi-7', 'nurad-8', 'volkath', 'volkath-2', 'wisp-4', 'wukong-6', 'gildur-4', 'ishar', 'nurad-7', 'quillen-4', 'tulen-8', 'lauriel-6', 'qi', 'qi-2', 'darcy-3', 'florentino-3', 'noren-3', 'ryoma-5', 'sephera-3', 'annette-4', 'capheny-3', 'elsu-5', 'narja-3', 'veres-3', 'violet-10', 'zip-2', 'zip-3', 'diaochan-5', 'enzo-2', 'lubu-7', 'payna-4', 'roxie-4', 'violet-9', 'zanis-7', 'zephys-6', 'enzo', 'liliana-6', 'lindis-5', 'xeniel-5', 'airi-9', 'errol-2', 'yena-2', 'zuka-8', 'zephys-3', 'zephys-2', 'zephys', 'zanis-5', 'zanis-4', 'zanis-3', 'zanis-2', 'zanis', 'violet-5', 'violet-4', 'violet-3', 'violet-2', 'violet', 'veera-4', 'veera-3', 'veera-2', 'valhein-3', 'valhein-2', 'valhein', 'thane-2', 'thane', 'nina-3', 'nina-2', 'nina', 'nganga-2', 'nganga', 'lubu-5', 'lubu-4', 'lubu-3', 'lubu-2', 'lubu', 'krixi-5', 'krixi-4', 'krixi-3', 'krixi-2', 'krixi', 'kahlii-3', 'kahlii-2', 'kahlii', 'diaochan-3', 'diaochan-2', 'diaochan', 'chaugnar', 'butterfly-5', 'butterfly-4', 'butterfly-2', 'butterfly', 'yorn-4', 'yorn-3', 'yorn-2', 'yorn', 'wukong-3', 'wukong-2', 'wukong', 'toro-2', 'toro', 'taara-2', 'taara', 'slimz-3', 'slimz-2', 'slimz', 'payna-2', 'payna', 'ormarr-4', 'ormarr-3', 'ormarr-2', 'kaisa-2', 'ormarr', 'natalya-5', 'natalya-4', 'natalya-3', 'natalya-2', 'natalya', 'nakroth-4', 'nakroth-3', 'nakroth-2', 'nakroth', 'naloch-3', 'naloch-2', 'naloch', 'lumburr', 'kriknak-2', 'kriknak', 'jinna-2', 'jinna', 'grakk-3', 'grakk-2', 'grakk', 'gildur-2', 'gildur', 'fennik-4', 'fennik-3', 'fennik-2', 'fennik', 'cresht', 'azzenka-2', 'azzenka', 'arthur-3', 'arthur-2', 'arthur', 'alice-2', 'alice', 'aleister-2', 'aleister', 'zuka-2', 'zuka', 'zill-2', 'zill', 'xeniel-2', 'xeniel', 'wonderwoman-2', 'wonderwoman', 'telannas-4', 'telannas-3', 'telannas-2', 'telannas', 'superman-2', 'superman', 'skud-2', 'skud', 'ryoma-2', 'ryoma', 'preyta-3', 'preyta-2', 'preyta', 'nurad-3', 'nurad-2', 'nurad', 'noren-2', 'noren', 'lauriel-4', 'lauriel-3', 'lauriel-2', 'lauriel', 'kilgroth-2', 'kilgroth', 'joker', 'illumia-3', 'illumia-2', 'illumia', 'ignis-2', 'ignis', 'batman-2', 'batman', 'astrid-2', 'astrid', 'arduin-2', 'arduin', 'airi-5', 'airi-4', 'airi-3', 'airi-2', 'airi', 'teemee-2', 'teemee', 'zuka-3', 'tulen', 'raz-2', 'raz', 'naloch-4', 'lumburr-2', 'lindis-2', 'joker-2', 'grakk-4', 'gildur-3', 'toro-3', 'omen-2', 'omen', 'zuka-4', 'tulen-2', 'nakroth-5', 'nax', 'liliana', 'zill-3', 'raz-3', 'liliana-2', 'tulen-3', 'telannas-5', 'taara-3', 'ryoma-3', 'nax-2', 'kriknak-3', 'flash', 'cresht-3', 'cresht-2', 'arthur-4', 'aleister-3', 'airi-6', 'arum-2', 'arum', 'wisp-2', 'wisp', 'rourke-2', 'rourke', 'narja-2', 'narja', 'butterfly-6', 'batman-3', 'astris-3', 'jinna-3', 'butterfly-7', 'arthur-5', 'valhein-4', 'superman-3', 'liliana-3', 'kilgroth-3', 'roxie-2', 'roxie', 'wukong-4', 'baldum-2', 'baldum', 'zephys-4', 'annette-2', 'annette', 'alice-3', 'telannas6', 'raz-4', 'nurad-6', 'nurad-5', 'jinna-4', 'amily', 'ybneth-2', 'ybneth', 'ilumia-4', 'amily-2', 'xeniel-3', 'veera-5', 'liliana4', 'flash-2', 'arthur-6', 'omen-3', 'lindis-3', 'elsu-2', 'elsu', 'richter-2', 'richter', 'nina-4', 'wirosableng', 'thane-3', 'ryoma-4', 'quillen-2', 'quillen', 'lauriel-5', 'arum-3', 'wisp-3', 'violet-7', 'sephera-2', 'sephera', 'naloch-5', 'krixi-6', 'alice-4', 'tulen-5', 'skud-3', 'rourke-3', 'nakroth-6', 'florentino-2', 'florentino', 'elsu-3', 'butterfly-8', 'amily-3', 'zuka-7', 'zuka-6', 'yorn-6', 'yorn-5', 'veres-2', 'veres', 'naloch-6', 'cresht-4', 'azzenka-3', 'airi-7', 'zephys-5', 'yorn-7', 'violet-8', 'valhein-5', 'tulen-6', 'thane-4', 'roxie-3', 'nakroth-7', 'kahlii-4', 'elsu-4', 'darcy-2', 'darcy', 'capheny', 'zill-4', 'hayate-2', 'hayate', 'cresht-5', 'annette-3', 'amily-4', 'tulen-7', 'telannas-7', 'omen-4', 'lindis-4', 'liliana-5', 'ignis-3', 'errol', 'capheny-2', 'arum-4', 'zanis-6', 'wukong-5', 'thane-5', 'slimz-4', 'skud-4', 'richter-3', 'quillen-3', 'azzenka-4', 'arduin-3', 'airi-8']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Hero')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, hero: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'rovwallpaper': {
    if (!text) return reply(lang.maketeamlogo('avatar', 'lorion', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('avatar', 'lorion', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['alice-5', 'arthur-8', 'dirak-3', 'errol', 'grakk-6', 'keera-2', 'lorion', 'grakk-6', 'keera-2', 'lorion', 'nina-6', 'tulen-10', 'yena', 'zip-3', 'zuka-9', 'dextra', 'dextra-2', 'lindis-6', 'nurad-10', 'nakroth-9', 'quillen-7', 'sephera-5', 'yorn-8', 'airi-10', 'amily-6', 'astrid-6', 'ata-3', 'capheny-5', 'darcy-4', 'diaochan-8', 'hayate-6', 'lauriel-10', 'laville-3', 'rourke-4', 'ryoma-7', 'sinestrea', 'sinestrea-2', 'telannas-9', 'thorne', 'thorne-2', 'veres-4', 'yena-6', 'zephys-7', 'allain', 'allain-2', 'butterfly-12', 'kahlii-6', 'nakroth-8', 'preyta-4', 'taara-7', 'valhein-8', 'arum-6', 'baldum-3', 'elandorr-3', 'hayate-5', 'ilumia-5', 'ishar-4', 'lauriel-8', 'nax-5', 'nurad-9', 'quillen-6', 'teemee-3', 'telannas-8', 'yena-4', 'yena-5', 'butterfly-10', 'laville', 'laville-2', 'nakroth-7', 'omen-6', 'rouie-2', 'taara-6', 'zanis-8', 'zata', 'zata-2', 'capheny-4', 'elsu-6', 'fennik-5', 'liliana-7', 'paine', 'paine-2', 'rouie', 'astrid-4', 'ata', 'ata-2', 'lauriel-8', 'omen-5', 'qi-3', 'taara-5', 'violet-12', 'wukong-7', 'wukong-8', 'hayate-4', 'ishar-3', 'jinna-5', 'kerra-2', 'lauriel-7', 'quillen-5', 'richter-4', 'ryoma-6', 'telannas-8', 'tulen-9', 'yorn-7', 'aleister-4', 'dirak', 'dirak-2', 'grakk-5', 'keera', 'raz-4', 'ishar-2', 'nax-4', 'valhein-7', 'zill-5', 'arthur-7', 'rum-5', 'lubu-8', 'naloch-7', 'sephera-4', 'diaochan-6', 'ignis-4', 'elandorr', 'elandorr-2', 'krizzix', 'krizzix-2', 'violet-11', 'yena-3', 'arduin-4', 'enzo-3', 'errol-3', 'hayate-3', 'nurad-8', 'volkath', 'volkath-2', 'wisp-4', 'wukong-6', 'celica', 'gildur-4', 'ishar', 'nurad-7', 'quillen-4', 'tulen-8', 'qi', 'qi-2', 'darcy-3', 'florentino-3', 'noren-3', 'ryoma-5', 'sephera-3', 'elsu-5', 'narja-3', 'annette-4', 'capheny-3', 'veres-3', 'zip-2', 'zip', 'diaochan-5', 'enzo-2', 'lubu-7', 'payna-3', 'roxie-4', 'violet-9', 'zanis-7', 'zephys-6', 'enzo', 'liliana-6', 'lindis-5', 'xeniel-5', 'errol', 'yena-2', 'zuka-8', 'valhein', 'violet', 'airi', 'skud', 'zanis', 'zephis', 'butterfly', 'wukong', 'taara', 'nakroth', 'prayta', 'yorn', 'natalya', 'thane', 'toro', 'ormarr', 'omega', 'nina', 'nganga', 'lubu2', 'lubu', 'kahlii-2', 'kahlii', 'fennik-2', 'fennik', 'diaochan', 'cresht', 'azzenka', 'aleister', 'zuka2', 'zuka', 'payna-2', 'payna', 'nakroth-2', 'nortos-2', 'nortos', 'kriknak', 'jinna-2', 'jinna', 'batman', 'airi-2', 'violet-3', 'violet-2', 'skud-2', 'raz-2', 'raz', 'ignis-2', 'ignis', 'gildur', 'butterfly-4', 'butterfly-3', 'zanis-2', 'nurad', 'yorn-2', 'slimz', 'ormarr-2', 'nurad-2', 'nina-2', 'lauriel-2', 'grakk-2', 'grakk', 'diaochan-2', 'airi-3', 'zill-2', 'zill', 'zanis-3', 'yorn-3', 'veera-3', 'veera-2', 'thane-2', 'telannas', 'superman', 'naloch-2', 'krixi-3', 'butterfly-5', 'violet-5', 'veera-4', 'telannas-2', 'taara-2', 'joker', 'ilumia-2', 'batman-2', 'arduin-2', 'arduin', 'wukong-2', 'nakroth-3', 'ilumia-3', 'arthur', 'ryoma-2', 'ryoma', 'astrid-2', 'astrid', 'zephis-2', 'natalya-3', 'natalya-2', 'ubu-3', 'chaugnar', 'azzenka-2', 'zanis-4', 'wukong-3', 'noren', 'lubu-4', 'lauriel-3', 'aleister-2', 'nurad-3', 'noren-2', 'lubu-5', 'kilgroth', 'gildur-2', 'fennik-3', 'lauriel-4', 'zephys-3', 'xeniel-2', 'wonderwomen', 'superman-2', 'slimz-2', 'natalya-4', 'krixi-5', 'krixi-4', 'zanis-5', 'yorn-4', 'xeniel', 'wonderwoman-2', 'violet-4', 'preyta2', 'diaochan-3', 'airi-4', 'valhein-4', 'preyta-3', 'nina-3', 'alice-2', 'airi-5', 'telannas-3', 'ormarr-4', 'ormarr-3', 'nakroth-4', 'kilgroth-2', 'kahlii-3', 'grakk-3', 'natalya-5', 'fennik-4', 'teemee-2', 'teemee', 'lindis', 'zuka-3', 'valhein-2', 'tulen', 'toro-2', 'naloch-4', 'naloch-3', 'lumburr', 'lindis-2', 'grakk-4', 'gildur-3', 'toro-3', 'omen-2', 'omen', 'zill-3', 'telannas-', 'athur-4', 'zuka-4', 'tulen-2', 'nakroth-5', 'nax', 'liliana', 'raz-3', 'liliana-2', 'tulen-3', 'nax-2', 'flash', 'cresht-3', 'cresht-2', 'chaugnar-2', 'aleister-3', 'ryoma-3', 'kriknak-3', 'airi-6', 'wisp-2', 'wisp', 'batman-3', 'arum-2', 'arum', 'butterfly-6', 'rourke-2', 'rourke', 'narja-2', 'narja', 'taara-3', 'jinna-3', 'butterfly-7', 'arthur-4', 'arthur-3', 'arthur-2', 'valhein-3', 'superman-3', 'liliana-3', 'kilgroth-3', 'roxie-2', 'roxie', 'wukong-4', 'baldum-2', 'baldum', 'zephys-4', 'annette-2', 'annette', 'alice-3', 'telannas6', 'raz-4', 'nurad-6', 'nurad-5', 'jinna-4', 'amily', 'ybneth-2', 'ybneth', 'ilumia-4', 'astrid-3', 'amily-2', 'liliana-4', 'xeniel-5', 'veera-5', 'flash-2', 'athur-5', 'omen-3', 'lindis-3', 'elsu-2', 'elsu', 'richter-2', 'richter', 'nina-4', 'wirosableng', 'thane-3', 'ryoma-4', 'quillen-2', 'quillen', 'lauriel-5', 'arum-3', 'wisp-3', 'violet-7', 'sephera-2', 'sephera', 'naloch-5', 'krixi-6', 'alice-4', 'tulen-5', 'skud-3', 'rourke-3', 'nakroth-6', 'florentino-2', 'florentino', 'elsu-3', 'utterfly-8', 'amily-3', 'zuka-7', 'zuka-6', 'yorn-6', 'yorn-5', 'veres-2', 'veres', 'naloch-6', 'cresht-4', 'azzenka-3', 'airi-7', 'zephys-5', 'yorn-7', 'violet-8', 'valhein-5', 'tulen-6', 'thane-4', 'roxie-3', 'nakroth-7', 'kahlii-4', 'elsu-4', 'darcy2', 'darcy', 'capheny', 'zill-4', 'hayate-2', 'hayate', 'cresht-5', 'annette-3', 'amily-4', 'tulen-7', 'telannas-7', 'omen-4', 'lindis-4', 'liliana-5', 'ignis-3', 'errol', 'capheny-2', 'arum-4', 'zanis-6', 'wukong-5', 'thane-5', 'slimz-4', 'skud-4', 'richter-3', 'quillen-3', 'azzenka-4', 'arduin-3', 'airi-8']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Avatar')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, avatar: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'beautifulgalaxylol': {
    if (!text) return reply(lang.maketeamlogo('style', 'akali-2', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('style', 'akali-2', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['ashe-2', 'darius-2', 'hecarim-2', 'akali-2', 'jhin-2', 'jinx-2', 'kaisa-2', 'khazix-2', 'nordekaiser-2', 'pantheon-2', 'qiyana', 'rammus-2', 'renekton-2', 'tahmkench-2', 'teemo-2', 'udyr-2', 'yasuo-2', 'yuumi', 'drmundo', 'zyra', 'zoe', 'zilean', 'ziggs', 'zed', 'zac', 'yorick', 'yasuo', 'xinzhao', 'xerath', 'xayah', 'wukong', 'warwick', 'volibear', 'vladimir', 'viktor', 'vi', 'velkoz', 'veigar', 'vayne', 'varus', 'urgot', 'udyr', 'twitch', 'twistedfate', 'tryndamere', 'trundle', 'tristana', 'thresh', 'teemo', 'taric', 'talyah', 'talon', 'tahmkench', 'syndra', 'swain', 'soraka', 'sona', 'skarner', 'sivir', 'sion', 'singed', 'shyvana', 'shen', 'shaco', 'sejuani', 'ryze', 'rumble', 'riven', 'rengar', 'renekton', 'reksai', 'rammus', 'rakan', 'quinn', 'poppy', 'pantheon', 'ornn', 'orianna', 'olaf', 'nunu', 'nocturne', 'nidalee', 'nautilus', 'nasus', 'nami', 'norgana', 'norderkaiser', 'nissfortune', 'nasteryi', 'nalzahar', 'nalphite', 'lux', 'lulu', 'lucian', 'lissandra', 'leona', 'leesin', 'leblanc', 'kogmaw', 'kled', 'kindred', 'khazix', 'kennen', 'kayn', 'kayle', 'katarina', 'kassadin', 'karthus', 'karma', 'kalista', 'kaisa', 'jinx', 'jhin', 'jayce', 'jax', 'jarvaniv', 'janna', 'ivern', 'irelia', 'illaoi', 'heimerdinger', 'hecarim', 'graves', 'gragas', 'gnar', 'garen', 'gangplank', 'galio', 'fizz', 'fiora', 'fiddlesticks', 'ezreal', 'evelynn', 'elise', 'ekko', 'draven', 'diana', 'darius', 'corki', 'chogath', 'cassiopeia', 'camille', 'caitlyn', 'braum', 'brand', 'blitzcrank', 'bard', 'azir', 'aurelionsol', 'ashe', 'annie', 'anivia', 'amumu', 'alistar', 'akali', 'ahri', 'aatrox', 'sylas', 'pyke', 'nunuwillump', 'neeko', 'norgana-2', 'kayle-2', 'akali-2', 'aatrox-2']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Style')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, style: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'crossfirecover': {
    if (!text) return reply(lang.maketeamlogo('character', 'blthefates', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('character', 'blthefates', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['spop', 'swat', 'switcher', 'redpower', 'whitenurse', 'blthefates', 'jns', 'natahari', 'dx', 'nursezombie', 'omohswat', 'sfg', 'fox', 'bllaswat', 'bljtf', 'grjtf', 'blarch', 'hero-4', 'gsg9', 'hero-3', 'opes', 'abf', 'shadows', 'devilhunter']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Character')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, character: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'lolwallpaper': {
    if (!text) return reply(lang.maketeamlogo('wallpaper', 'braum', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('wallpaper', 'braum', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['aatrox-2', 'arhi-2', 'akali-3', 'akali-2', 'braum', 'camille', 'evelynn-5', 'ezreal-2', 'fizz', 'graves-2', 'irelia-3', 'irelia-2', 'jayce-2', 'jhin-2', 'jinx-2', 'kaisa', 'katarina-2', 'lux-2', 'neeko', 'orianna-2', 'pantheon', 'pyke', 'qiyana', 'riven-2', 'sylas', 'teemo-2', 'viktor', 'vladimir', 'warwick-2', 'yasuo-3', 'yasuo-2', 'zoe', 'nasteryi', 'lux', 'lulu', 'leesin', 'jinx', 'jhin', 'ezreal', 'janna', 'ashe', 'arhi', 'poppy', 'nissfortune', 'soraka', 'syndra', 'zyra', 'yasuo', 'vi', 'vayne', 'taliyah', 'sona', 'sivir', 'shyvana', 'riven', 'quinn', 'nidalee', 'norgana', 'leblanc', 'kennen', 'karma', 'irelia', 'fiora', 'elise', 'diana', 'caitlyn', 'zed', 'xayah', 'tristana', 'talon', 'shen', 'rakan', 'orianna', 'nami', 'kayn', 'kayle', 'katarina', 'kalista', 'ekko', 'azir', 'udyr', 'thresh', 'tf', 'teemo', 'ryze', 'nocturne', 'lucian', 'khazik', 'graves', 'darius', 'annie', 'akali', 'zilean', 'ziggs', 'yorick', 'warwick', 'nasteryi-2', 'janna-2', 'hecarim', 'gangplank', 'fiora-2', 'draven', 'brand', 'aatrox', 'velkoz', 'shaco', 'rengar', 'reksai', 'ornn', 'leona', 'kindred', 'jayce', 'jax', 'jarvan-iv', 'garen', 'xinzhao', 'nasus', 'kled', 'evelynn-4', 'evelynn-3', 'evelynn-2', 'evelynn', 'cassiopeia', 'zac', 'xerath', 'wukong', 'velkoz-2', 'veigar', 'varus', 'urgot', 'twich', 'kassadin', 'elise-2', 'annie-2', 'alistar']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Wallpaper')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, wallpaper: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'coverdota2': {
    if (!text) return reply(lang.maketeamlogo('heroes', 'warlord', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('heroes', 'warlord', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['void', 'riki', 'lycan', 'ursa', 'zeus', 'dragonkinght', 'warlord', 'phantomassassin', 'bountyhunter', 'antimage', 'spectre', 'luna', 'vengerfulspirit', 'undying', 'tusk', 'tinker', 'shadowfiend', 'sandking', 'nightstalker', 'nagasiren', 'nirana', 'neepo', 'lina', 'juggernaut', 'huskar', 'emberspirit', 'emberspirit', 'emberspirit', 'earthshaker', 'drowranger', 'clockwerk', 'bristleback', 'bloodseeker', 'axe']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Heroes')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, heroes: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'coverleagueofking': {
    if (!text) return reply(lang.maketeamlogo('character', 'ngangar', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('character', 'ngangar', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['thane', 'orrmarr', 'omega', 'nakroth', 'nina', 'ngangar', 'gildur', 'dieuthuyen', 'chaugnar', 'butterfly', 'azzenka', 'alice', 'lubo', 'kriknak-2', 'natalya-2', 'trieu-van', 'taara-2', 'naloch', 'kriknak', 'natalya', 'taara', 'ngo-khong', 'airi', 'butterfly-2', 'butterfly-3', 'kahlii', 'krixi', 'toro', 'grakk', 'ilumia', 'zephys', 'veera-2', 'violet', 'preyta-2', 'violet-2', 'valhein', 'yorn', 'veera', 'notos', 'valhein-2', 'preyta', 'illumia-2', 'fennik-2', 'lumburr', 'fennik', 'nakroth-2', 'krixi-2', 'gildur2']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Character')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, character: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'avatar3q360': {
    if (!text) return reply(lang.maketeamlogo('avatar', 'truong_phi', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('avatar', 'truong_phi', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['tieu_kieu', 'luu_bi', 'truong_oanh_oanh', 'truong_phi', 'tu_ma_y', 'van_uong', 'hoang_nguyet_anh', 'hoang_nguyet_anh2', 'hoang_trung', 'hua_chu', 'truong_giac', 'dieu_thuyen', 'renekton', 'tahmkench', 'teemo', 'udyr', 'yasuo', 'yuumi', 'drmundo', 'zyra', 'zoe', 'zilean', 'ziggs', 'zed', 'zac', 'yorick', 'yasuo', 'xinzhao', 'xerath', 'xayah', 'wukong', 'warwick', 'volibear', 'vladimir', 'viktor', 'vi', 'velkoz', 'veigar', 'vayne', 'varus', 'urgot', 'udyr', 'twitch', 'twistedfate', 'tryndamere', 'trundle', 'tristana', 'thresh', 'teemo', 'taric', 'talyah', 'talon', 'tahmkench', 'syndra', 'swain', 'soraka', 'sona', 'skarner', 'sivir', 'sion', 'singed', 'shyvana', 'shen', 'shaco', 'sejuani', 'ryze', 'rumble', 'riven', 'rengar', 'renekton', 'reksai', 'rammus', 'rakan', 'quinn', 'poppy', 'pantheon', 'ornn', 'orianna', 'olaf', 'nunu', 'nocturne', 'nidalee', 'nautilus', 'nasus', 'nami', 'norgana', 'norderkaiser', 'nissfortune', 'nasteryi', 'nalzahar', 'nalphite', 'lux', 'lulu', 'lucian', 'lissandra', 'leona', 'leesin', 'leblanc', 'kogmaw', 'kled', 'kindred', 'khazix', 'kennen', 'kayn', 'kayle', 'katarina', 'kassadin', 'karthus', 'karma', 'kalista', 'kaisa', 'jinx', 'jhin', 'jayce', 'jax', 'jarvaniv', 'janna', 'ivern', 'irelia', 'illaoi', 'heimerdinger', 'hecarim', 'graves', 'gragas', 'gnar', 'garen', 'gangplank', 'galio', 'fizz', 'fiora', 'fiddlesticks', 'ezreal', 'evelynn', 'elise', 'ekko', 'draven', 'diana', 'darius', 'corki', 'chogath', 'cassiopeia', 'camille', 'caitlyn', 'braum', 'brand', 'blitzcrank', 'bard', 'azir', 'aurelionsol', 'ashe', 'annie', 'anivia', 'amumu', 'alistar', 'akali', 'ahri', 'aatrox', 'sylas', 'pyke', 'nunuwillump', 'neeko', 'norgana', 'kayle', 'akali', 'aatrox']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Avatar')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, avatar: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'coverofwarface': {
    if (!text) return reply(lang.maketeamlogo('character', 'warface', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('character', 'warface', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['warface-4', 'warface-3', 'warface-2', 'warface', 'sniper-3', 'sniper-2', 'sniper', 'rifleman', 'nedic-2', 'nedic', 'exosuit', 'engineer']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Character')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, character: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'newlolavatar': {
    if (!text) return reply(lang.maketeamlogo('avatar', 'teemo', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('avatar', 'teemo', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['udyr', 'twitch', 'twistedfate', 'trundle', 'teemo', 'swain', 'shyvana', 'shen', 'sejuani', 'renekton', 'reksai', 'rammus', 'zyra', 'zilean', 'ziggs', 'zac', 'xerath', 'warwick', 'vladimir', 'viktor', 'vi', 'velkoz', 'veigar', 'vayne', 'volibear', 'tristana', 'taliyah', 'shaco', 'leblanc', 'jinx', 'graves', 'fizz', 'ekko', 'corki', 'cassiopeia', 'caitlyn', 'blitzcrank', 'bard', 'alistar', 'akali', 'aatrox', 'janna', 'wukong', 'thresh', 'taric', 'talon', 'ryze', 'nordekaiser', 'karma', 'kalista', 'irelia', 'gnar', 'garen', 'galio', 'soraka', 'sona', 'sivir', 'riven', 'quinn', 'nocturne', 'nami', 'lux', 'kindred', 'khazix', 'katarina', 'jarvan', 'fiora', 'diana', 'aurelionsol', 'ashe', 'ahri', 'varus', 'syndra', 'nidalee', 'kennen', 'jhin', 'zed', 'yasuo', 'rengar', 'lucian', 'ezreal', 'azir', 'annie', 'leesin', 'nasteryi', 'poppy', 'pantheon', 'orianna', 'nasus', 'norgana', 'nissfortune', 'naokai', 'nalzaha', 'lulu', 'lissandra', 'leona', 'kled', 'jayce', 'jax', 'illaoi', 'xayah', 'rakan', 'gangplank', 'naster_yi2', 'riven2', 'elise', 'darius', 'xayah_rakan', 'katarina2', 'nauthilus', 'hecarim', 'thresh2', 'ashe2', 'xinzhao', 'tryndamere', 'syndra-2', 'sivir-2', 'lissandra2', 'karma-2', 'draven']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Avatar')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, avatar: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'csgocover': {
    if (!text) return reply(lang.maketeamlogo('background', 'famas', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('background', 'famas', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['ump45', 'tec9', 'n4a1', 'xm1014', 'famas', 'np9', 'pp-bizon', 'p2000', 'negev', 'usps', 'dualberettas', 'np5', 'karambit', 'awpdragonlore', 'np7', 'galilar', 'ak-47', 'glock', 'sg-553', 'ak47', 'r8revolver', 'aug', 'butterflyknife', 'deserteagle', 'gsg9', 'p90asiimov', 'awphawking', 'n4a4', 'sas', 'awpasiimov', 'ssg08bitw', 'sg553ds', 'r8fade', 'p90ed', 'n4a1sdecimator', 'n4a1howl', 'karambitds', 'flipknifemf', 'awmmedusa', 'augaa', 'ak47vulcan', 'ak47fs']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Background')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, background: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'coverloknew': {
    if (!text) return reply(lang.maketeamlogo('hero', 'hayate-5', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('hero', 'hayate-5', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['arum-6', 'baldum-3', 'elandorr-3', 'hayate-5', 'ilumia-5', 'ishar-4', 'lauriel-8', 'nax-5', 'nurad-9', 'quillen-5', 'teemee-3', 'telannas-6', 'volkath-3', 'yena-4', 'yena-5', 'butterfly-10', 'laville', 'laville-2', 'nakroth-7', 'omen-6', 'rouie-2', 'taara-4', 'zanis-8', 'zata', 'zata-2', 'capheny-4', 'lsu-6', 'fennik-5', 'liliana-7', 'paine', 'paine-2', 'rouie', 'astrid-4', 'ata', 'ata-2', 'lauriel-8', 'omen-5', 'qi-3', 'roxie-5', 'taara-5', 'violet-12', 'wukong-7', 'wukong-8', 'hayate-4', 'ishar-4', 'jinna-5', 'kerra-2', 'lauriel-7', 'nina-5', 'quillen-5', 'richter-4', 'ryoma-6', 'telannas-8', 'tulen-9', 'yorn-8', 'aleister-4', 'dirak', 'dirak-2', 'grakk-5', 'kerra', 'raz-4', 'amily-5', 'athur-7', 'arum-5', 'ishar-2', 'nax-4', 'natalya-7', 'valhein-7', 'zill-5', 'diaochan-6', 'ignis-4', 'lubu-8', 'naloch-7', 'sephera-4', 'elandorr', 'elandorr-2', 'krizzix', 'krizzix-2', 'violet-11', 'yena-3', 'arduin-4', 'enzo-3', 'errol-3', 'hayate-3', 'krixi-7', 'nurad-7', 'volkath', 'volkath', 'volkath-2', 'wisp-4', 'wukong-6', 'celica', 'gildur-4', 'ishar', 'nurad-7', 'quillen-4', 'tulen-8', 'lauriel-6', 'qi', 'qi-2', 'darcy', 'florentino-3', 'noren-3', 'ryoma-5', 'sephera-3', 'annettte-4', 'capheny-3', 'elsu-5', 'narja-3', 'vilolet-10', 'violet-10', 'zip-2', 'zip-2a', 'airi-9', 'diaochan-5', 'enzo-2', 'lubu-7', 'nganga-4', 'payna-3', 'roxie-4', 'violet-9', 'zanis-7', 'zephys-6', 'enzo', 'liliana-6', 'lindis-5', 'xeniel-5', 'airi-9', 'errol-2', 'yena', 'yena-2', 'zuka-8', 'yorn', 'violet', 'zanis', 'thane', 'slimz', 'skud', 'preyta', 'payna', 'nakroth', 'nina', 'naloch', 'illumia', 'krixi', 'diaochan', 'butterfly', 'veera', 'valhein', 'toro', 'taara', 'raz', 'ormarr', 'nganga', 'lubu', 'kriknak', 'kahlil', 'grakk', 'gildur', 'alice', 'omega', 'wukong', 'natalya', 'nortos', 'cresht', 'airi', 'aleister', 'lumburr', 'zephis', 'violet-2', 'jinna', 'chaugnar', 'azzenka', 'valhein-2', 'zanis-2', 'skud-2', 'payna-2', 'natalya-3', 'natalya-2', 'nortos-2', 'krixi-2', 'jinna-2', 'illumia-2', 'butterfly-3', 'butterfly-2', 'yorn-2', 'taara-2', 'nakroth-2', 'lubu2', 'lauriel', 'kahlii-2', 'zuka-2', 'zuka', 'batman', 'airi-2', 'airi-3', 'butterfly-4', 'diaochan-2', 'grakk-2', 'ignis', 'ignis-2', 'lauriel2', 'nina-2', 'nurad', 'nurad-2', 'ormarr-2', 'raz-2', 'slimz2', 'violet-3', 'zill-2', 'zill', 'zanis-3', 'yorn-3', 'veera-3', 'veera-2', 'thane-2', 'telannas', 'superman', 'naloch-2', 'krixi-3', 'butterfly-5', 'violet-5', 'veera-4', 'telannas-2', 'joker', 'illumia-3', 'batman-2', 'arduin-2', 'arduin', 'zephis-2', 'wukong-2', 'ryoma-2', 'ryoma', 'nakroth-3', 'nganga-2', 'azzenka-2', 'astrid-2', 'astrid', 'arthur', 'zanis-4', 'wukong-3', 'noren', 'lubu-4', 'lauriel-3', 'lubu-3', 'chaugnar-2', 'aleister-2', 'xeniel', 'telannas-3', 'preyta-2', 'nurad-3', 'kriknak-2', 'fennik-2', 'diaochanlubu', 'alice-2', 'noren-2', 'lubu-5', 'lauriel-4', 'kilgroth', 'gildur-2', 'fennik-3', 'zephys-3', 'xeniel-2', 'xeniel-2', 'wonderwoman', 'supeman-2', 'slimz-3', 'natalya-4', 'krixi-5', 'krixi-4', 'zanis-5', 'yorn-4', 'wonderwoman-2', 'violet-4', 'prayta-3', 'naloch-3', 'airi-4', 'telannas-4', 'ormarr-4', 'ormarr-3', 'nakroth-4', 'kilgroth-2', 'kahlii-3', 'grakk-3', 'airi-5', 'natalya-5', 'fennik-4', 'valhein-4', 'teemee-2', 'teemee', 'lindis', 'zuka-3', 'tulen', 'toro-2', 'nina-3', 'naloch-4', 'lumburr-2', 'lindis-2', 'joker-2', 'grakk-4', 'gildur-3', 'aleister-3', 'tulen-2', 'toro-3', 'taara-3', 'omen-2', 'omen', 'zill-3', 'telannas-5', 'athur-2', 'zuka-4', 'nakroth-5', 'nax', 'liliana', 'raz-3', 'liliana-2', 'nax-2', 'kriknak-3', 'joker-3', 'chaugnar-3', 'wisp', 'ryoma-3', 'batman-3', 'airi-6', 'tulen-3', 'flash', 'cresht-3', 'cresht-2', 'astris-3', 'arum-2', 'arum', 'butterfly-6', 'lice-3', 'xeniel-3', 'valhein-4', 'tulen-4', 'rourke-2', 'rourke', 'nurad-4', 'nax-3', 'wisp-2', 'narja-2', 'narja', 'zuka-5', 'jinna-3', 'butterfly-7', 'arthur-2', 'violet-6', 'valhein-5', 'superman-3', 'liliana-3', 'kilgroth-3', 'diaochan-3', 'wirosabaleng-3', 'roxie-2', 'roxie', 'wukong-4', 'baldum-2', 'baldum', 'zephys-4', 'annette-2', 'annette', 'telannas-6', 'raz-4', 'nurad-6', 'nurad-5', 'jinna-4', 'amily', 'ybneth-2', 'ybneth', 'ilumia-4', 'amily-2', 'xeniel-4', 'veera-5', 'liliana-4', 'flash-2', 'arthur-3', 'omen-3', 'lindis-3', 'elsu-2', 'elsu', 'richter-2', 'richter', 'nina-4', 'thane-3', 'ryoma-4', 'quillen-2', 'quillen', 'lauriel-5', 'arum-3', 'wisp-3', 'violet-7', 'sephera-2', 'sephera', 'naloch-5', 'krixi-6', 'alice-4', 'tulen-5', 'skud-3', 'rourke-3', 'nakroth-6', 'florentino-2', 'florentino', 'elsu-3', 'butterfly-8', 'amily-3', 'zuka-7', 'zuka-6', 'yorn-6', 'yorn-5', 'veres-2', 'veres', 'naloch-6', 'cresht-4', 'azzenka-3', 'airi-7', 'zephys-5', 'yorn-7', 'violet-8', 'valhein-6', 'tulen-6', 'thane-4', 'roxie-3', 'nakroth-7', 'kahlii-4', 'elsu-4', 'darcy-2', 'darcy', 'capheny', 'zill-4', 'hayate-2', 'hayate', 'cresht-5', 'annette-3', 'amily-4', 'veera-6', 'tulen-7', 'telannas-7', 'omen-4', 'lindis-4', 'liliana-5', 'ignis-3', 'errol', 'capheny-2', 'arum-4', 'zanis-6', 'wukong-5', 'thane-5', 'slimz-4', 'skud-4', 'richter-3', 'quillen-3', 'azzenka-4', 'arduin-3', 'airi-8']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Hero')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, hero: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'coverfblol': {
    if (!text) return reply(lang.maketeamlogo('letters', 'pantheon', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('letters', 'pantheon', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['yasuo', 'shen', 'riven', 'pantheon', 'orianna', 'nocturne', 'nami', 'norgana', 'naster-yi', 'lux', 'lucian', 'katarina', 'kalista', 'jinx', 'jhin', 'irelia', 'hecarim', 'graves', 'garen', 'fizz', 'fiora', 'ezreal', 'ekko', 'diana', 'darius', 'cassiopeia', 'caitlyn', 'braum', 'azir', 'ashe', 'warwick', 'thresh', 'leblanc', 'khazix', 'kayn', 'draven', 'zyra', 'zed', 'xayah', 'taric', 'talon', 'sona', 'sivir', 'rengar', 'rakan', 'leesin', 'gnar', 'elise']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Letters')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, letters: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'overwatchcover': {
    if (!text) return reply(lang.maketeamlogo('hero', 'zwidowmaker', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('hero', 'zwidowmaker', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['zwinston', 'zjunkrat', 'zwidowmaker', 'ztracer', 'ztorbjorn', 'zsymmetra', 'zsombra', 'zsoldier76', 'zroadhog', 'zreinhardt', 'zreaper', 'zpharah', 'zorisa', 'zmercy', 'zmei', 'zmccree', 'zlucio', 'zhanzo', 'zgenji', 'zenyatta', 'zdva', 'zbastion', 'zarya', 'zana', 'yzenyatta', 'yzarya', 'ywinston', 'ywidowmaker', 'ytracer', 'ytorbjorn', 'ysymmetra', 'ysombra', 'ysoldier76', 'yroadhog', 'yreinhardt', 'yreaper', 'ypharah', 'yorisa', 'ymercy', 'ymei', 'ymccree', 'ylucio', 'yjunkrat', 'yhanzo', 'ygenji', 'ydva', 'ybastion', 'yana', 'xzenyatta', 'xzarya', 'xwinston', 'xwidowmaker', 'xtracer', 'xtorbjorn', 'xsymmetra', 'xsombra', 'xsoldier76', 'xroadhog', 'xreinhardt', 'xreaper', 'xpharah', 'xorisa', 'xmercy', 'xmei', 'xmccree', 'xlucio', 'xjunkrat', 'xhanzo', 'xgenji', 'xdva', 'xbastion', 'xana', 'wzenyatta', 'wzarya', 'wtracer', 'wtorbjorn', 'wsymmetra', 'wsombra', 'wsoldier76', 'wroadhog', 'wreinhardt', 'wreaper', 'wpharah', 'worisa', 'wmercy', 'wmei', 'wmccree', 'wlucio', 'wjunkrat', 'winston', 'widowmaker', 'whanzo', 'wgenji', 'wdva', 'wbastion', 'wana', 'vzenyatta', 'vzarya', 'vwinston', 'vwidowmaker', 'vtracer', 'vtorbjorn', 'vsymmetra', 'vsombra', 'vsoldier76', 'vroadhog', 'vreinhardt', 'vreaper', 'vpharah', 'vorisa', 'vmercy', 'vmei', 'vmccree', 'vlucio', 'vjunkrat', 'vhanzo', 'vgenji', 'vdva', 'vbastion', 'vana', 'uzenyatta', 'uzarya', 'uwinston', 'uwidowmaker', 'utracer', 'utorbjorn', 'usymmetra', 'usombra', 'usoldier76', 'uroadhog', 'ureinhardt', 'ureaper', 'upharah', 'uorisa', 'umercy', 'umei', 'umccree', 'ulucio', 'ujunkrat', 'uhanzo', 'ugenji', 'udva', 'ubastion', 'uana', 'tzenyatta', 'tzarya', 'twinston', 'twidowmaker', 'tsymmetra', 'tsombra', 'tsoldier76', 'troadhog', 'treinhardt', 'treaper', 'tracer', 'tpharah', 'torisa', 'torbjorn', 'tmercy', 'tmei', 'tmccree', 'tlucio', 'tjunkrat', 'thanzo', 'tgenji', 'tdva', 'tbastion', 'tana', 'szenyatta', 'szarya', 'symmetra', 'swinston', 'swidowmaker', 'stracer', 'storbjorn', 'sroadhog', 'sreinhardt', 'sreaper', 'spharah', 'sorisa', 'sombra', 'soldier76', 'smercy', 'smei', 'smccree', 'slucio', 'sjunkrat', 'shanzo', 'sgenji', 'sdva', 'sbastion', 'sana', 'rzenyatta', 'rzarya', 'rwinston', 'rwidowmaker', 'rtracer', 'rtorbjorn', 'rsymmetra', 'rsombra', 'rsoldier76', 'rrmei', 'rpharah', 'rorisa', 'roadhog', 'rmercy', 'rmccree', 'rlucio', 'rjunkrat', 'rhanzo', 'rgenji', 'reinhardt', 'reaper', 'rdva', 'rbastion', 'rana', 'qzenyatta', 'qzarya', 'qwinston', 'qwidowmaker', 'qtracer', 'qtorbjorn', 'qsymmetra', 'qsombra', 'qsoldier76', 'qroadhog', 'qreinhardt', 'qreaper', 'qpharah', 'qorisa', 'qmercy', 'qmei', 'qmccree', 'qlucio', 'qjunkrat', 'qhanzo', 'qgenji', 'qdva', 'qbastion', 'qana', 'pzenyatta', 'pzarya', 'pwinston', 'pwidowmaker', 'ptracer', 'ptorbjorn', 'psymmetra', 'psombra', 'psoldier76', 'proadhog', 'preinhardt', 'preaper', 'porisa', 'pmercy', 'pmei', 'pmccree', 'plucio', 'pjunkrat', 'pharah', 'phanzo', 'pgenji', 'pdva', 'pbastion', 'pana', 'ozenyatta', 'ozarya', 'owinston', 'owidowmaker', 'otracer', 'otorbjorn', 'osymmetra', 'osombra', 'osoldier76', 'oroadhog', 'orisa', 'oreinhardt', 'oreaper', 'opharah', 'omercy', 'omei', 'omccree', 'olucio', 'ojunkrat', 'ohanzo', 'ogenji', 'odva', 'obastion', 'oana', 'nzenyatta', 'nzarya', 'nwinston', 'nwidowmaker', 'ntracer', 'ntorbjorn', 'nsymmetra', 'nsombra', 'nsoldier76', 'nroadhog', 'nreinhardt', 'nreaper', 'npharah', 'norisa', 'nmercy', 'nmei', 'nmccree', 'nlucio', 'njunkrat', 'nhanzo', 'ngenji', 'ndva', 'nbastion', 'nana', 'mzenyatta', 'mzarya', 'mwinston', 'mwidowmaker', 'mtracer', 'mtorbjorn', 'msymmetra', 'msombra', 'msoldier76', 'mroadhog', 'mreinhardt', 'mreaper', 'mpharah', 'morisa', 'mlucio', 'mjunkrat', 'mhanzo', 'mgenji', 'mercy', 'mei', 'mdva', 'mccree', 'mbastion', 'mana', 'lzenyatta', 'lzarya', 'lwinston', 'lwidowmaker', 'lucio', 'ltracer', 'ltorbjorn', 'lsymmetra', 'lsombra', 'lsoldier76', 'lroadhog', 'lreinhardt', 'lreaper', 'lpharah', 'lorisa', 'lmercy', 'lmei', 'lmccree', 'ljunkrat', 'lhanzo', 'lgenji', 'ldva', 'lbastion', 'lana', 'kzenyatta', 'kzarya', 'kwinston', 'kwidowmaker', 'ktracer', 'ktorbjorn', 'ksymmetra', 'ksombra', 'ksoldier76', 'kroadhog', 'kreinhardt', 'kreaper', 'kpharah', 'korisa', 'kmercy', 'kmei', 'kmccree', 'klucio', 'kjunkrat', 'khanzo', 'kgenji', 'kdva', 'kbastion', 'kana', 'jzenyatta', 'jzarya', 'jwinston', 'jwidowmaker', 'junkrat', 'jtracer', 'jtorbjorn', 'jsymmetra', 'jsombra', 'jsoldier76', 'jroadhog', 'jreinhardt', 'jreaper', 'jpharah', 'jorisa', 'jmercy', 'jmei', 'jmccree', 'jlucio', 'jhanzo', 'jgenji', 'jdva', 'jbastion', 'jana', 'izenyatta', 'izarya', 'iwinston', 'iwidowmaker', 'itracer', 'itorbjorn', 'isymmetra', 'isombra', 'isoldier76', 'iroadhog', 'ireinhardt', 'ireaper', 'ipharah', 'iorisa', 'imercy', 'imei', 'imccree', 'ilucio', 'ijunkrat', 'ihanzo', 'igenji', 'idva', 'ibastion', 'iana', 'hzenyatta', 'hzarya', 'hwinston', 'hwidowmaker', 'htracer', 'htorbjorn', 'hsymmetra', 'hsombra', 'hsoldier76', 'hroadhog', 'hreinhardt', 'hreaper', 'hpharah', 'horisa', 'hmercy', 'hmei', 'hmccree', 'hlucio', 'hjunkrat', 'hgenji', 'hdva', 'hbastion', 'hanzo', 'hana', 'gzenyatta', 'gzarya', 'gwinston', 'gwidowmaker', 'gtracer', 'gtorbjorn', 'gsymmetra', 'gsombra', 'gsoldier76', 'groadhog', 'greinhardt', 'greaper', 'gpharah', 'gorisa', 'gmercy', 'gmei', 'gmccree', 'glucio', 'gjunkrat', 'genji', 'gdva', 'gbastion', 'ganafzenyatta', 'fzarya', 'fwinston', 'fwidowmaker', 'ftracer', 'ftorbjorn', 'fsymmetra', 'fsombra', 'fsoldier76', 'froadhog', 'freinhardt', 'freaper', 'fpharah', 'forisa', 'fmercy', 'fmei', 'fmccree', 'flucio', 'fjunkrat', 'fhanzo', 'fgenji', 'fdva', 'fbastion', 'fana', 'ezenyatta', 'ezarya', 'ewinston', 'ewidowmaker', 'etracer', 'etorbjorn', 'esymmetra', 'esombra', 'esoldier76', 'eroadhog', 'ereinhardt', 'ereaper', 'epharah', 'eorisa', 'emercy', 'emei', 'emccree', 'elucio', 'ejunkrat', 'ehanzo', 'egenji', 'edva', 'ebastion', 'eana', 'dzenyatta', 'dzarya', 'dwinston', 'dwidowmaker', 'dva', 'dtracer', 'dtorbjorn', 'dsymmetra', 'dsombra', 'dsoldier76', 'droadhog', 'dreinhardt', 'dreaper', 'dpharah', 'dorisa', 'dmercy', 'dmei', 'dmccree', 'dlucio', 'djunkrat', 'dhanzo', 'dgenji', 'dbastion', 'dana', 'czenyatta', 'czarya', 'cwinston', 'cwidowmaker', 'ctracer', 'ctorbjorn', 'csymmetra', 'csombra', 'csoldier76', 'croadhog', 'creinhardt', 'creaper', 'cpharah', 'corisa', 'cmercy', 'cmei', 'cmccree', 'clucio', 'cjunkrat', 'chanzo', 'cgenji', 'cdva', 'cbastion', 'cana', 'bzenyatta', 'bzarya', 'bwinston', 'bwidowmaker', 'btracer', 'btorbjorn', 'bsymmetra', 'bsombra', 'bsoldier76', 'broadhog', 'breinhardt', 'breaper', 'bpharah', 'borisa', 'bmercy', 'bmei', 'bmccree', 'blucio', 'bjunkrat', 'bhanzo', 'bgenji', 'bdva', 'bastion', 'bana', 'azenyatta', 'azarya', 'awinston', 'awidowmaker', 'atracer', 'atorbjorn', 'asymmetra', 'asombra', 'asoldier76', 'aroadhog', 'areinhardt', 'areaper', 'apharah', 'aorisa', 'ana', 'amercy', 'amei', 'amccree', 'alucio', 'ajunkrat', 'ahanzo', 'agenji', 'adva', 'abastion', 'zdoomfist', 'ydoomfist', 'xdoomfist', 'wdoomfist', 'vdoomfist', 'udoomfist', 'tdoomfist', 'sdoomfist', 'rdoomfist', 'qdoomfist', 'pdoomfist', 'odoomfist', 'ndoomfist', 'mdoomfist', 'ldoomfist', 'kdoomfist', 'jdoomfist', 'idoomfist', 'hdoomfist', 'gdoomfist', 'fdoomfist', 'edoomfist', 'doomfist', 'cdoomfist', 'bdoomfist', 'adoomfist']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Hero')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, hero: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'crossfirestyle': {
    if (!text) return reply(lang.maketeamlogo('avatar', 'switcher', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('avatar', 'switcher', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['spop', 'switcher', 'switcher-2', 'switcher-3 ', 'thefates', 'thefates-2', 'thefates-3', 'swat', 'fox', 'star', 'omoh', 'sabel', 'sas', 'sia', 'navy-seals', 'jtf', 'jns', 'laswat', 'sraf', 'shadow', 'nemesis', 'nocha', 'ixions', 'gsg-9', 'ghosty', 'hermes', 'foxu', 'dh', 'angelapt', 'ac']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Avatar')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, avatar: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'avatarlolbyname': {
    if (!text) return reply(lang.maketeamlogo('style', 'katarina-0', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('style', 'katarina-0', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['katarina-0', 'zyra-4', 'zyra-3', 'zyra-2', 'zyra-1', 'zyra-0', 'zilean-5', 'zilean-4', 'zilean-3', 'zilean-2', 'zilean-1', 'zilean-0', 'ziggs-5', 'ziggs-4', 'ziggs-3', 'ziggs-2', 'ziggs-1', 'ziggs-0', 'zed-3', 'zed-2', 'zed-10', 'zed-1', 'zed-0', 'zac-2', 'zac-1', 'zac-0', 'yorick-2', 'yorick-1', 'yorick-0', 'yasuo-4', 'yasuo-3', 'yasuo-2', 'yasuo-1', 'yasuo-0', 'xinzhao-6', 'xinzhao-13', 'xinzhao-5', 'xinzhao-4', 'xinzhao-3', 'xinzhao-2', 'xinzhao-1', 'xinzhao-0', 'xerath-4', 'xerath-3', 'xerath-2', 'xerath-1', 'xerath-0', 'xayah-1', 'xayah-0', 'warwick-8', 'warwick-7', 'warwick-6', 'warwick-5', 'warwick-4', 'warwick-3', 'warwick-2', 'warwick-1', 'warwick-0', 'volibear-5', 'volibear-4', 'volibear-3', 'volibear-2', 'volibear-1', 'volibear-0', 'vladimir-7', 'vladimir-6', 'vladimir-5', 'vladimir-4', 'vladimir-3', 'vladimir-2', 'vladimir-1', 'vladimir-0', 'viktor-2', 'viktor-1', 'viktor-0', 'vi-5', 'vi-4', 'vi-3', 'vi-2', 'vi-1', 'vi-0', 'velkoz-3', 'velkoz-2', 'velkoz-1', 'velkoz-0', 'veigar-8', 'veigar-7', 'veigar-6', 'veigar-5', 'veigar-4', 'veigar-3', 'veigar-2', 'veigar-1', 'veigar-0', 'vayne-6', 'vayne-5', 'vayne-4', 'vayne-3', 'vayne-2', 'vayne-1', 'vayne-0', 'vayne-10', 'varus-6', 'varus-5', 'varus-4', 'varus-3', 'varus-2', 'varus-1', 'varus-0', 'urgot-3', 'urgot-2', 'urgot-1', 'urgot-0', 'udyr-4', 'udyr-3', 'udyr-2', 'udyr-1', 'udyr-0', 'twitch-7', 'twitch-6', 'twitch-5', 'twitch-4', 'twitch-3', 'twitch-2', 'twitch-1', 'twitch-0', 'twistedfate-9', 'twistedfate-10', 'twistedfate-8', 'twistedfate-7', 'twistedfate-6', 'twistedfate-5', 'twistedfate-4', 'twistedfate-3', 'twistedfate-2', 'twistedfate-1', 'twistedfate-0', 'tryndamere-9', 'tryndamere-8', 'tryndamere-7', 'tryndamere-6', 'tryndamere-5', 'tryndamere-4', 'tryndamere-3', 'tryndamere-2', 'tryndamere-1', 'tryndamere-0', 'trundle-5', 'trundle-4', 'trundle-3', 'trundle-2', 'trundle-1', 'trundle-0', 'tristana-6', 'tristana-5', 'tristana-4', 'tristana-3', 'tristana-2', 'tristana-1', 'tristana-0', 'tristana-10', 'tristana-11', 'thresh-5', 'thresh-4', 'thresh-3', 'thresh-2', 'thresh-1', 'thresh-0', 'teemo-8', 'teemo-7', 'teemo-6', 'teemo-5', 'teemo-4', 'teemo-3', 'teemo-2', 'teemo-1', 'teemo-0', 'teemo-14', 'taric-4', 'taric-3', 'taric-2', 'taric-1', 'taric-0', 'talon-5', 'talon-4', 'talon-3', 'talon-2', 'talon-1', 'talon-0', 'taliyah-1', 'taliyah-0', 'tahmkench-2', 'tahmkench-1', 'tahmkench-0', 'syndra-4', 'syndra-3', 'syndra-2', 'syndra-1', 'syndra-0', 'swain-3', 'swain-2', 'swain-1', 'swain-0', 'soraka-6', 'soraka-5', 'soraka-4', 'soraka-3', 'soraka-2', 'soraka-1', 'soraka-0', 'sona-6', 'sona-5', 'sona-4', 'sona-3', 'sona-2', 'sona-1', 'sona-0', 'skarner-4', 'skarner-3', 'skarner-2', 'skarner-1', 'skarner-0', 'sivir-7', 'sivir-6', 'sivir-5', 'sivir-4', 'sivir-3', 'sivir-2', 'sivir-1', 'sivir-0', 'sion-5', 'sion-4', 'sion-3', 'sion-2', 'sion-1', 'sion-0', 'singed-8', 'singed-7', 'singed-6', 'singed-5', 'singed-4', 'singed-3', 'singed-2', 'singed-1', 'singed-0', 'shyvana-6', 'shyvana-5', 'shyvana-4', 'shyvana-3', 'shyvana-3', 'shyvana-2', 'shyvana-1', 'shyvana-0', 'shen-6', 'shen-5', 'shen-4', 'shen-3', 'shen-2', 'shen-1', 'shen-0', 'shaco-7', 'shaco-6', 'shaco-5', 'shaco-4', 'shaco-3', 'shaco-2', 'shaco-1', 'shaco-0', 'sejuani-7', 'sejuani-6', 'sejuani-5', 'sejuani-4', 'sejuani-3', 'sejuani-2', 'sejuani-1', 'sejuani-0', 'ryze-10', 'ryze-9', 'ryze-8', 'ryze-7', 'ryze-6', 'ryze-5', 'ryze-4', 'ryze-3', 'ryze-2', 'ryze-1', 'ryze-0', 'rumble-3', 'rumble-2', 'rumble-1', 'rumble-0', 'riven-8', 'riven-7', 'riven-6', 'riven-5', 'riven-4', 'riven-3', 'riven-2', 'riven-1', 'riven-0', 'rengar-3', 'rengar-2', 'rengar-1', 'rengar-0', 'renekton-9', 'renekton-8', 'renekton-7', 'renekton-6', 'renekton-5', 'renekton-4', 'renekton-3', 'renekton-2', 'renekton-1', 'renekton-0', 'reksai-1', 'reksai-2', 'reksai-0', 'rammus-7', 'rammus-6', 'rammus-5', 'rammus-4', 'rammus-3', 'rammus-2', 'rammus-1', 'rammus-0', 'rakan-1', 'rakan-0', 'quinn-4', 'quinn-3', 'quinn-2', 'quinn-1', 'quinn-0', 'poppy-7', 'poppy-6', 'poppy-5', 'poppy-4', 'poppy-3', 'poppy-2', 'poppy-1', 'poppy-0', 'pantheon-8', 'pantheon-7', 'pantheon-6', 'pantheon-5', 'pantheon-4', 'pantheon-3', 'pantheon-2', 'pantheon-1', 'pantheon-0', 'orianna-7', 'orianna-6', 'orianna-5', 'orianna-4', 'orianna-3', 'orianna-2', 'orianna-1', 'orianna-0', 'olaf-6', 'olaf-5', 'olaf-4', 'olaf-3', 'olaf-2', 'olaf-1', 'olaf-0', 'nunu-7', 'nunu-6', 'nunu-5', 'nunu-4', 'nunu-3', 'nunu-2', 'nunu-1', 'nunu-0', 'nocturne-6', 'nocturne-5', 'nocturne-4', 'nocturne-3', 'nocturne-2', 'nocturne-1', 'nocturne-0', 'nidalee-8', 'nidalee-7', 'nidalee-6', 'nidalee-5', 'nidalee-4', 'nidalee-3', 'nidalee-2', 'nidalee-1', 'nidalee-0', 'nautilus-5', 'nautilus-4', 'nautilus-3', 'nautilus-2', 'nautilus-1', 'nautilus-0', 'nasus-6', 'nasus-5', 'nasus-4', 'nasus-3', 'nasus-2', 'nasus-1', 'nasus-0', 'nasus-10', 'nami-7', 'nami-6', 'nami-5', 'nami-4', 'nami-3', 'nami-2', 'nami-1', 'nami-0', 'norgana-6', 'norgana-5', 'norgana-4', 'norgana-3', 'norgana-2', 'norgana-1', 'norgana-0', 'norgana-10', 'norgana-11', 'nordekaiser-4', 'nordekaiser-3', 'nordekaiser-2', 'nordekaiser-1', 'nordekaiser-0', 'nonkeyking-5', 'nonkeyking-4', 'nonkeyking-3', 'nonkeyking-2', 'nonkeyking-1', 'nonkeyking-0', 'nissfortune-9', 'nissfortune-8', 'nissfortune-7', 'nissfortune-6', 'nissfortune-5', 'nissfortune-4', 'nissfortune-3', 'nissfortune-2', 'nissfortune-1', 'nissfortune-0', 'nasteryi-3', 'nasteryi-2', 'nasteryi-1', 'nasteryi-0', 'nasteryi-9', 'nasteryi-5', 'nasteryi-4', 'nasteryi-10', 'naokai-7', 'naokai-6', 'naokai-5', 'naokai-4', 'naokai-3', 'naokai-2', 'naokai-1', 'naokai-0', 'nalzahar-5', 'nalzahar-4', 'nalzahar-3', 'nalzahar-2', 'nalzahar-1', 'nalzahar-0', 'nalphite-7', 'nalphite-6', 'nalphite-5', 'nalphite-4', 'nalphite-3', 'nalphite-2', 'nalphite-1', 'nalphite-0', 'lux-7', 'lux-6', 'lux-5', 'lux-4', 'lux-3', 'lux-2', 'lux-1', 'lux-0', 'lulu-6', 'lulu-5', 'lulu-4', 'lulu-3', 'lulu-2', 'lulu-1', 'lulu-0', 'lucian-6', 'lucian-7', 'lucian-2', 'lucian-1', 'lucian-0', 'lissandra-3', 'lissandra-2', 'lissandra-1', 'lissandra-0', 'leona-9', 'leona-8', 'leona-7', 'leona-6', 'leona-5', 'leona-4', 'leona-3', 'leona-2', 'leona-1', 'leona-0', 'leesin-6', 'leesin-5', 'leesin-4', 'leesin-3', 'leesin-2', 'leesin-1', 'leesin-0', 'leesin-10', 'leesin-11', 'leblanc-5', 'leblanc-4', 'leblanc-3', 'leblanc-2', 'leblanc-1', 'leblanc-0', 'kogmaw-9', 'kogmaw-8', 'kogmaw-7', 'kogmaw-6', 'kogmaw-5', 'kogmaw-4', 'kogmaw-3', 'kogmaw-2', 'kogmaw-1', 'kogmaw-0', 'kled-1', 'kled-0', 'kindred-2', 'kindred-1', 'kindred-0', 'khazix-4', 'khazix-3', 'khazix-2', 'khazix-1', 'khazix-0', 'kennen-7', 'kennen-6', 'kennen-5', 'kennen-4', 'kennen-3', 'kennen-2', 'kennen-1', 'kennen-0', 'kayle-8', 'kayle-7', 'kayle-6', 'kayle-5', 'kayle-4', 'kayle-3', 'kayle-2', 'kayle-1', 'kayle-0', 'katarina-9', 'katarina-8', 'katarina-7', 'katarina-5', 'katarina-6', 'katarina-4', 'katarina-3', 'katarina-2', 'katarina-1', 'kassadin-4', 'kassadin-3', 'kassadin-2', 'kassadin-1', 'kassadin-0', 'karthus-9', 'karthus-5', 'karthus-4', 'karthus-3', 'karthus-2', 'karthus-1', 'karthus-0', 'karma-7', 'karma-6', 'karma-5', 'karma-4', 'karma-3', 'karma-2', 'karma-1', 'karma-0', 'kalista-3', 'kalista-2', 'kalista-1', 'kalista-0', 'jinx-4', 'jinx-3', 'jinx-2', 'jinx-1', 'jinx-0', 'jayce-4', 'jayce-3', 'jayce-2', 'jayce-1', 'jayce-0', 'jax-9', 'jax-8', 'jax-7', 'jax-6', 'jax-5', 'jax-4', 'jax-3', 'jax-2', 'jax-1', 'jax-0', 'jarvaniv-6', 'jarvaniv-5', 'jarvaniv-4', 'jarvaniv-3', 'jarvaniv-2', 'jarvaniv-1', 'jarvaniv-0', 'janna-7', 'janna-6', 'janna-5', 'janna-4', 'janna-3', 'janna-2', 'janna-1', 'ivern-1', 'ivern-0', 'irelia-5', 'irelia-4', 'irelia-3', 'irelia-2', 'irelia-1', 'irelia-0', 'illaoi-1', 'illaoi-0', 'heimerdinger-5', 'heimerdinger-4', 'heimerdinger-3', 'heimerdinger-2', 'heimerdinger-1', 'heimerdinger-0', 'hecarim-6', 'hecarim-5', 'hecarim-4', 'hecarim-3', 'hecarim-2', 'hecarim-1', 'hecarim-0', 'graves-7', 'graves-6', 'graves-5', 'graves-4', 'graves-3', 'graves-2', 'graves-1', 'graves-0', 'gragas-9', 'gragas-8', 'gragas-7', 'gragas-6', 'gragas-5', 'gragas-4', 'gragas-3', 'gragas-3', 'gragas-2', 'gragas-1', 'gragas-0', 'gnar-4', 'gnar-3', 'gnar-2', 'gnar-1', 'gnar-0', 'garen-6', 'garen-5', 'garen-4', 'garen-3', 'garen-2', 'garen-1', 'garen-0', 'garen-10', 'garen-11', 'gangplank-8', 'gangplank-7', 'gangplank-6', 'gangplank-5', 'gangplank-4', 'gangplank-3', 'gangplank-2', 'gangplank-1', 'gangplank-0', 'galio-5', 'galio-4', 'galio-3', 'galio-2', 'galio-1', 'galio-0', 'fizz-9', 'fizz-8', 'fizz-4', 'fizz-3', 'fizz-2', 'fizz-1', 'fizz-0', 'fiora-5', 'fiora-4', 'fiora-3', 'fiora-2', 'fiora-1', 'fiora-0', 'fiddlesticks-7', 'fiddlesticks-6', 'fiddlesticks-5', 'fiddlesticks-4', 'fiddlesticks-3', 'fiddlesticks-2', 'fiddlesticks-1', 'fiddlesticks-0', 'ezreal-9', 'ezreal-8', 'ezreal-7', 'ezreal-6', 'ezreal-5', 'ezreal-4', 'ezreal-3', 'ezreal-2', 'ezreal-1', 'ezreal-0', 'evelynn-4', 'evelynn-3', 'evelynn-2', 'evelynn-1', 'evelynn-0', 'elise-4', 'elise-3', 'elise-2', 'elise-1', 'elise-0', 'ekko-3', 'ekko-2', 'ekko-1', 'ekko-0', 'draven-6', 'draven-5', 'draven-4', 'draven-3', 'draven-2', 'draven-1', 'draven-0', 'drmundo-9', 'drmundo-8', 'drmundo-7', 'drmundo-6', 'drmundo-5', 'drmundo-4', 'drmundo-3', 'drmundo-2', 'drmundo-1', 'drmundo-0', 'diana-3', 'diana-2', 'diana-1', 'diana-0', 'diana-11', 'darius-8', 'darius-4', 'darius-3', 'darius-2', 'darius-1', 'darius-0', 'darius-14', 'corki-8', 'corki-7', 'corki-6', 'corki-5', 'corki-4', 'corki-3', 'corki-2', 'corki-1', 'corki-0', 'chogath-6', 'chogath-5', 'chogath-4', 'chogath-3', 'chogath-2', 'chogath-1', 'chogath-0', 'cassiopeia-4', 'cassiopeia-3', 'cassiopeia-2', 'cassiopeia-1', 'cassiopeia-0', 'camille-1', 'camille-0', 'caitlyn-6', 'caitlyn-5', 'caitlyn-4', 'caitlyn-3', 'caitlyn-2', 'caitlyn-1', 'caitlyn-0', 'caitlyn-10', 'caitlyn-11', 'braum-3', 'braum-2', 'braum-1', 'braum-0', 'braum-10', 'brand-5', 'brand-4', 'brand-3', 'brand-2', 'brand-1', 'brand-0', 'blitzcrank-7', 'blitzcrank-6', 'blitzcrank-5', 'blitzcrank-4', 'blitzcrank-3', 'blitzcrank-2', 'blitzcrank-1', 'blitzcrank-0', 'blitzcrank-11', 'bard-6', 'bard-5', 'bard-4', 'bard-3', 'bard-2', 'bard-1', 'bard-0', 'azir-4', 'azir-3', 'azir-2', 'azir-1', 'azir-0', 'aurelionsol-1', 'aurelionsol-0', 'ashe-8', 'ashe-7', 'ashe-6', 'ashe-5', 'ashe-4', 'ashe-3', 'ashe-2', 'ashe-1', 'ashe-0', 'annie-9', 'annie-8', 'annie-7', 'annie-6', 'annie-5', 'annie-4', 'annie-3', 'annie-2', 'annie-1', 'annie-0', 'annie-10', 'anivia-7', 'anivia-6', 'anivia-5', 'anivia-4', 'anivia-3', 'anivia-2', 'anivia-1', 'anivia-0', 'amumu-8', 'amumu-7', 'amumu-6', 'amumu-5', 'amumu-4', 'amumu-3', 'amumu-2', 'amumu-1', 'amumu-0', 'alistar-9', 'alistar-8', 'alistar-7', 'alistar-6', 'alistar-5', 'alistar-4', 'alistar-3', 'alistar-2', 'alistar-1', 'alistar-0', 'akali-8', 'akali-7', 'akali-6', 'akali-5', 'akali-4', 'akali-3', 'akali-2', 'akali-1', 'akali-0', 'ahri-7', 'ahri-6', 'ahri-5', 'ahri-4', 'ahri-3', 'ahri-2', 'ahri-1', 'ahri-0', 'aatrox-3', 'aatrox-2', 'aatrox-1', 'aatrox-0', 'zacskt', 'teemoskt', 'olafskt', 'namiskt', 'syndraskt', 'jhinskt', 'ekkoskt', 'urgot-8', 'urgot-7', 'urgot-6', 'urgot-5', 'kayn-2', 'kayn', 'sona-8', 'veigaros', 'twitchos', 'tristanaos', 'fizzos', 'zigg', 'nalzah01', 'kayle', 'hecarim', 'brand', 'ornn2', 'ornn', 'syndra', 'soraka', 'nissfortune', 'ezreal', 'ahri', 'yorick', 'singed', 'nasteryi', 'janna', 'fiora', 'cassiopeia', 'ashe', 'zed', 'viktor', 'nidalee', 'katarina', 'gnar', 'evelynn-7', 'evelynn-6', 'evelynn-5', 'evelynn', 'elise', 'annie', 'rengar', 'blitzcrank-9', 'blitzcrank-8', 'zoe-2', 'zoe', 'vi', 'vayne', 'varus', 'poppy', 'kogmaw', 'jinx', 'jhin', 'jax', 'graves', 'draven', 'xinzhao', 'warwick', 'swain-8', 'swain-7', 'swain-6', 'swain-5', 'swain-4', 'rakan', 'nasus', 'nissfortune-15', 'nissfortune-14', 'nissfortune-13', 'nissfortune-12', 'nissfortune-11', 'nissfortune-10', 'lux', 'kaisa-2', 'kaisa', 'jarvan-iv', 'illaoi', 'gragas', 'wukong', 'sivir', 'nissfortune-16', 'irelia-11', 'irelia-10', 'irelia-9', 'irelia-8', 'irelia-7', 'irelia-6', 'galio', 'alistar', 'varus-7', 'twistedfate', 'teemo', 'shen', 'rumble', 'riven', 'evelynn-8', 'zoe3', 'xinzhao-7', 'urgot', 'thresh', 'talon', 'taliya', 'pyke-2', 'pyke', 'poppy-8', 'nunu-15', 'nunu-14', 'nunu-13', 'nunu-12', 'nunu-11', 'nunu-10', 'nunu-9', 'nunu-8', 'lulu', 'lucian', 'jarvan-iv-7', 'irelia-12', 'garen', 'gangplank', 'darius', 'caitlyn', 'braum', 'aurelionsol-2', 'ashe-9', 'akali-18', 'akali-17', 'akali-16', 'akali-15', 'akali-14', 'akali-13', 'akali-12', 'akali-11', 'akali-10', 'akali-9', 'aatrox-7', 'aatrox-6', 'aatrox-5', 'aatrox-4', 'ziggs-6', 'yasuo', 'sona', 'nalphite', 'khazix', 'kayn-3', 'jinx-5']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Style')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, style: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'lolcoverbyname': {
    if (!text) return reply(lang.maketeamlogo('avatar', 'yorick', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('avatar', 'yorick', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['zyra', 'zilean', 'ziggs', 'zed', 'zac', 'yorick', 'yasuo', 'xinzhao', 'xerath', 'xayah', 'wukong', 'warwick', 'volibear', 'vladimir', 'viktor', 'vi', 'velkoz', 'veigar', 'vayne', 'varus', 'urgot', 'udyr', 'twictch', 'tryndamere', 'trundle', 'tristana', 'thresh', 'twistedfate', 'teemo', 'taric', 'talon', 'taliyah', 'tahmkench', 'syndra', 'swain', 'soraka', 'sona', 'skarner', 'sivir', 'sion', 'singed', 'shyvana', 'shen', 'shaco', 'sejuani', 'ryze', 'rumble', 'riven', 'rengar', 'renekton', 'reksai', 'rammus', 'rakan', 'quinn', 'poppy', 'pantheon', 'orianna', 'olaf', 'nunu', 'nasteryi', 'naokai', 'nalzahar', 'nalphite', 'lux', 'lulu', 'lucian', 'nocturne', 'nedalee', 'nautilus', 'nasus', 'nami', 'norgana', 'noderkaiser', 'nissfortune', 'lissandra', 'leona', 'leesin', 'leblanc', 'kogmaw', 'kled', 'kindred', 'khazix', 'kennen', 'kayn', 'kayle', 'katarina', 'kassadin', 'karthus', 'karma', 'kalista', 'jinx', 'jhin', 'jayce', 'jax', 'jarvan', 'janna', 'ivern', 'irelia', 'illaoi', 'heimerdinger', 'hecarim', 'graves', 'gragas', 'gnar', 'garen', 'gangplank', 'galio', 'fizz', 'fiora', 'fiddlesticks', 'ezreal', 'drmundo', 'evelynn', 'elise', 'ekko', 'draven', 'diana', 'darius', 'corki', 'chogath', 'cassiopeia', 'camille', 'caitlyn', 'braum', 'brand', 'blitzcrank', 'bard', 'azir', 'aurelionsol', 'ashe', 'annie', 'anivia', 'amumu', 'alistar', 'akali', 'ahri', 'aatrox', 'zoe', 'sylas', 'swain-2', 'pyke', 'nunu-2', 'neeko', 'norgana2', 'kayle-2', 'kaisa', 'evelynn-2', 'aatrox-2']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Avatar')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, avatar: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'cyberhunterfb': {
    if (!text) return reply(lang.maketeamlogo('character', '10', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('character', '10', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Character')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, character: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'coverfreefirefb': {
    if (!text) return reply(lang.maketeamlogo('character', 'kelly', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('character', 'kelly', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['a124', 'alok', 'alvaro', 'andrew', 'antonio', 'caroline', 'hayato', 'kapella', 'kelly', 'kla', 'laura', 'naxim', 'niguel', 'nisa', 'noco', 'nikita', 'notora', 'olivia', 'paloma', 'rafael', 'shani', 'steffie']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Character')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, character: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'gamingmascot': {
    if (!text) return reply(lang.maketeamlogo('style', 'reaper', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('style', 'reaper', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['bear-2', 'dragon-2', 'hydra', 'lion', 'reaper', 'wolf-2', 'bear', 'eagle', 'iguana', 'shark', 'snake', 'spartan', 'griffin', 'owl', 'wolf', 'tiger', 'wolver', 'dragon']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Style')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, style: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'coveronepiecefb': {
    if (!text) return reply(lang.maketeamlogo('character', 'franky', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('character', 'franky', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['ace', 'brook', 'chopper', 'franky', 'garp', 'jinbei', 'law', 'luffy', 'nerry', 'nami', 'rayleigh', 'robin', 'sabo', 'sanji', 'shanks', 'sunny', 'usopp', 'zoro']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Character')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, character: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'bannerytcsgo': {
    if (!text) return reply(lang.maketeamlogo('banner', 'banner-3', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('banner', 'banner-3', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['banner-1', 'banner-2', 'banner-3', 'banner-4', 'banner-5', 'banner-6', 'banner-7']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Banner')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, banner: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'fbgamepubgcover': {
    if (!text) return reply(lang.maketeamlogo('template', 'cover-4', prefix, command))
    if (!text.includes('|')) return reply(lang.maketeamlogo('template', 'cover-4', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    const style = ['cover-1', 'cover-2', 'cover-3', 'cover-4', 'cover-5', 'cover-6', 'cover-7', 'cover-8', 'cover-9', 'cover-10', 'cover-11', 'cover-12']
    if (!style.includes(m2)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Template')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, template: m2 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'banneroflol': {
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'banner', 'veigar', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'banner', 'veigar', 'zeeone', 'ofc', prefix, command))
    var memek = args.join(" ").split("|")
    var m1 = memek[0]
    var m2 = memek[1]
    var m3 = memek[2]
    const style = ['ahri-2', 'neeko', 'nocturne', 'shen-2', 'veigar', 'rakanayah-2', 'zoe-2', 'pantheon-2', 'rammus', 'udyr', 'darius-2', 'ekko-2', 'lablanc', 'leona', 'nissfotune', 'poppy', 'quinn', 'talon-2', 'akali-2', 'irelia-2', 'jinx-2', 'nordekaiser', 'pyke-2', 'renekton', 'rengar', 'sivir', 'sona', 'soraka', 'tristana', 'warwick', 'yuumi', 'ziggs', 'leesin', 'lulu', 'lux', 'naster-yi', 'norgana', 'nasus', 'pantheon', 'pyke', 'qiyana', 'rakan', 'rakanxayah', 'riven', 'shen', 'sylas', 'talon', 'teemo', 'thresh', 'tryndamere', 'varus', 'vayne', 'velkoz', 'vladimir', 'yasuo', 'zed', 'zoe', 'hecarim', 'heimerdinger', 'illaoi', 'irelia', 'ivern', 'janna', 'jarvan-iv', 'jax', 'jayce', 'jhin', 'jinx', 'kaisa', 'kalista', 'karma', 'karthus', 'kassadin', 'katarina', 'kayle', 'kayn', 'kennen', 'khazix', 'kindred', 'kled', 'kogmaw', 'aatrox', 'ahri', 'akali', 'alistar', 'amumu', 'anivia', 'annie', 'ashe', 'aurelionsol', 'azir', 'bard', 'blitzcrank', 'brand', 'braum', 'caitlyn', 'camille', 'cassiopeia', 'chogath', 'corki', 'darius', 'diana', 'drmundo', 'draven', 'ekko', 'elise', 'evelynn', 'ezreal', 'fiddlesticks', 'fiora', 'fizz', 'galio', 'gangplank', 'garen', 'gnar', 'gragas', 'graves']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Banner')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, banner: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'bannerofaov2': {
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'banner', 'ishar', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'banner', 'ishar', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.MaketeamlogoT('teks', 'teks2', 'banner', 'ishar', 'zeeone', 'ofc', prefix, command))
    const style = ['airi-2', 'aleister', 'astrid-2', 'ata', 'butterfly-2', 'dirak', 'ignis-2', 'ishar', 'jinna', 'lauriel-3', 'nina-2', 'natalya-2', 'omen-2', 'qi-2', 'quillen3', 'raz', 'roxie-2', 'ryoma-2', 'taara-2', 'violet-3', 'wukong-4', 'wukong-3', 'krixi-2', 'krizziz', 'nurad-5', 'volkath', 'wisp-2', 'wukong-2', 'enzo-2', 'hayate-2', 'annette-2', 'capheny-2', 'celica', 'gildur-2', 'lauriel-2', 'nurad-4', 'quillen-2', 'sephera-2', 'qi', 'nurad-3', 'nurad-2', 'nakroth-2', 'zip', 'diao-chan-2', 'enzo', 'errol', 'joker', 'payna', 'slimz', 'thane', 'toro', 'veres', 'violet-2', 'wisp', 'yena', 'zill', 'arduin', 'arthur', 'batman', 'capheny', 'darcy', 'elsu', 'florentino', 'gildur', 'ignis', 'wukong', 'yena', 'zanis', 'violet', 'tulen', 'sephera', 'nurad', 'nina', 'lindis', 'liliana', 'lauriel', 'krixi', 'kahlii', 'hayate', 'diao-chan', 'butterfly', 'astrid', 'arum', 'annette', 'amily', 'airi', 'zuka', 'zephys', 'zanis', 'yorn', 'xeniel', 'veres', 'veera', 'tel-annas', 'taara', 'superman', 'skud', 'ryoma', 'roxie', 'quillen', 'omen', 'natalya', 'nakroth', 'lubu']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Banner')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, banner: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'teamlogo': {
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'buffalo', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'buffalo', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'buffalo', 'zeeone', 'ofc', prefix, command))
    const style = ['cobra', 'dragon', 'eagle2', 'falcon', 'lion2', 'tiger2', 'bear', 'buffalo', 'eagle', 'lion', 'tiger', 'wolf']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Background')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, background: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'companylogo2': {
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', '16', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', '16', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', '16', 'zeeone', 'ofc', prefix, command))
    const style = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Background')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, background: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'companylogo': {
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', '20', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', '20', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', '20', 'zeeone', 'ofc', prefix, command))
    const style = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Background')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, background: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'gradientlogo': {
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', '3', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', '3', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', '3', 'zeeone', 'ofc', prefix, command))
    const style = ['1', '2', '3', '4', '5', '6']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Background')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, background: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'pencilsketch': {
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'icon', 'panda', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'icon', 'panda', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.MaketeamlogoT('teks', 'teks2', 'icon', 'panda', 'zeeone', 'ofc', prefix, command))
    const style = ['bird', 'butterfly', 'coffee', 'dove', 'leaf', 'like', 'lotus', 'milk-tea', 'panda', 'tree', 'woman', 'bear', 'bull', 'dragon', 'eagle', 'hawk', 'ninja', 'paw', 'rooster', 'sabertooth', 'skull', 'warrior', 'zebra']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Icon')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, icon: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'gunlogogaming': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
    /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'm14ebr', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'm14ebr', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'm14ebr', 'zeeone', 'ofc', prefix, command))
    const style = ['ak47', 'ak47-s', 'an94', 'ar15', 'aug', 'awm', 'g36k', 'm4a1', 'm4-s', 'm14ebr', 'm16', 'm60', 'm82a1', 'mp5', 'scar', 'svd', 'xm8', 'xm1014']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Background')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, background: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'banneroffreefire': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
/*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'misha', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'misha', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'misha', 'zeeone', 'ofc', prefix, command))
    const style = ['andrew', 'caroline', 'kelly', 'laura', 'maxim', 'miguel', 'misha', 'moco', 'nikita', 'notora', 'olivia', 'steffi']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Background')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, background: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'letterlogos': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
/*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'thumb', 'w', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'thumb', 'w', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.MaketeamlogoT('teks', 'teks2', 'thumb', 'w', 'zeeone', 'ofc', prefix, command))
    const style = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'z']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Background')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, thumb: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'bannerofoverwatch': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
/*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'reinhardt', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'reinhardt', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'reinhardt', 'zeeone', 'ofc', prefix, command))
    const style = ['widowmaker', 'tracer', 'symmetra', 'sombra', 'soldier76', 'reinhardt', 'reaper', 'orisa', 'mercy', 'mei', 'genji', 'dva', 'doomfist', 'ashe', 'ana']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Background')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, background: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'bannerofapex': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
/*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'bg3', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'bg3', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'bg3', 'zeeone', 'ofc', prefix, command))
    const style = ['bg6', 'bg5', 'bg4', 'bg3', 'bg2', 'bg1']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Background')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, background: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'bannerofpubg': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
/*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'bg3', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'bg3', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.MaketeamlogoT('teks', 'teks2', 'background', 'bg3', 'zeeone', 'ofc', prefix, command))
    const style = ['bg11', 'bg10', 'bg9', 'bg8', 'bg7', 'bg6', 'bg5', 'bg4', 'bg3', 'bg2', 'bg1']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Background')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, background: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'mascotstyle': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly ??`, m)*/
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'thumb', 'dragon-4', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'thumb', 'dragon-4', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.maketeamlogo('teks', 'teks2', 'thumb', 'dragon-4', 'zeeone', 'ofc', prefix, command))
    const style = ['dragon-5', 'jet', 'knight', 'skull-3', 'skull-cyborg', 'tiger-4', 'bee-3', 'dragon-4', 'fox-3', 'goat-2', 'kitsune', 'octopus-2', 'piranha', 'wolf', 'bear-2', 'cat', 'ceberus', 'crocodile', 'dinosaur', 'dragon-3', 'eagle-3', 'horse-2', 'husky', 'kraken', 'lynx', 'sabertooh', 'assassin', 'bee', 'cat2', 'demon', 'fox', 'gorilla', 'horus', 'octopus', 'rounin', 'scorpion', 'skull2', 'tiger3', 'tiger2', 'tiger', 'shark', 'sabertooth', 'rooster', 'rhino', 'puma', 'phoenix', 'panther', 'owl', 'lion', 'horse', 'hornet', 'griffin', 'goat', 'fox', 'eagle', 'dragon2', 'dragon', 'devil', 'cobra', 'bull', 'bear', 'monkey', 'warrior', 'rabbit', 'pirates', 'owl2', 'neonwolf', 'lionking', 'godzilla', 'flashwolf', 'fire', 'eagle2', 'dog', 'mask', 'team', 'pubg', 'drift', 'bee2']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Thumb')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, thumb: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'logoaccording': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
/*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'thumb', 'dragon3', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'thumb', 'dragon3', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.maketeamlogo('teks', 'teks2', 'thumb', 'dragon3', 'zeeone', 'ofc', prefix, command))
    const style = ['bear2', 'cat2', 'ceberus', 'crocodile', 'dinosaur', 'dragon3', 'eagle3', 'horse2', 'husky', 'kraken', 'lynx', 'sabertooh', 'assassin', 'bee', 'cat', 'demon', 'fox-2', 'gorilla', 'horus', 'octopus', 'rounin', 'scorpion', '-2', 'tiger-3', 'bg-tiger', 'bg-buffalo', 'chicken', 'bull', 'bg-wolf', 'jaguar', 'horse', 'eagle', 'dragon', 'wolver', 'shark', 'sabertooth', 'rhino', 'phoenix', 'lion', 'hornet', 'griffin', 'bear', 'tiger2', 'panther', 'owl', 'monkey', 'goat', 'fox', 'dragon2', 'devil', 'cobra', 'reaper', 'pirates', 'owl2', 'mask', 'fire', 'eagle2', 'chamois', 'neptune', 'parrots', 'samurai']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Thumb')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, thumb: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'avataroverwatch': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
/*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.MaketeamlogoT('teks', 'teks2', 'thumb', 'zenyatta', 'zeeone', 'ofc', prefix, command))
    if (!text.includes('|')) return reply(lang.MaketeamlogoT('teks', 'teks2', 'thumb', 'zenyatta', 'zeeone', 'ofc', prefix, command))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var m3 = mon.split("|")[2]
    if (!m3) return reply(lang.maketeamlogo('teks', 'teks2', 'thumb', 'zenyatta', 'zeeone', 'ofc', prefix, command))
    const style = ['mccree', 'mercy', 'zenyatta', 'zarya', 'winston', 'widowmaker', 'tracer', 'torbjorn', 'symmetra', 'sombra', 'soldier76', 'soldier_76', 'roadhog', 'reinhardt', 'reaper2', 'reaper', 'pharah', 'orisa', 'mei', 'lucio', 'junkrat', 'hanzo', 'genji', 'dva', 'bastion', 'ana2', 'ana', 'doomfist', 'bg-1']
    if (!style.includes(m3)) {
      let listt = `${lang.maketeamlogo_(style.length, 'Thumb')}`
      no = 0
      for (var i = 0; i < style.length; i++) {
        no += 1
        listt += no.toString() + '.  ' + style[i] + '\n'
      }
      reply(listt)
    } else {
      reply(lang.wait())
      let textpro2 = await(api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2, thumb: m3 }, 'apikey'))
      alpha.sendMessage(from, { image: { url: textpro2 }, caption: lang.ok() }, { quoted: m })
    }
    /*db.data.users[m.sender].limit -= 1*/
  }

    break

  case 'asmaulhusna': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
  /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    var asma = await fetchJson(api('alfa', '/api/islam/' + command, {}, 'apikey'))
      .then(async data => {
        let txt = '*Asmaul Husna*\n\n'
        txt += `• Latin : ${data.result.latin}\n`
        txt += `• Arabic : ${data.result.arabic}\n`
        txt += `• Tr id : ${data.result.translation_id}\n`
        txt += `• Tr en : ${data.result.translation_en}`
        reply(txt)
      })
      .catch(e => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'kisahnabi': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
  /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.KisahNabi(prefix, command, 'Adam'))
    var asma = await fetchJson(api('alfa', '/api/islam/' + command, { nabi: q }, 'apikey'))
      .then(async data => {
        let txt = '*Kisah Nabi*\n\n'
        txt += `• Name : ${data.result.name}\n`
        txt += `• Birth : ${data.result.birth}\n`
        txt += `• Death Age : ${data.result.death_age}\n`
        txt += `• Country : ${data.result.country_from}\n`
        txt += `• Story : ${data.result.story}\n`
        reply(txt)
      })
      .catch(e => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'jadwalshalat': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
  /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.KisahNabi(prefix, command, 'Makassar'))
    var asma = await fetchJson(api('alfa', '/api/islam/' + command, { daerah: q }, 'apikey'))
      .then(async data => {
        let txt = '*Jadwal Shalat *\n\n'
        txt += `• Daerah : ${q}\n\n`
        txt += `• Date : ${moment(new Date()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss DD/MM/YYYY')}\n`
        txt += `• Subuh : ${data.result.today.Shubuh}\n`
        txt += `• Zuhur : ${data.result.today.Dzuhur}\n`
        txt += `• Ashr : ${data.result.today.Ashr}\n`
        txt += `• Magrib : ${data.result.today.Maghrib}\n`
        txt += `• Isya : ${data.result.today.Isya}\n`
        reply(txt)
      })
      .catch(e => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'randomquran': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
  /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    var asma = await fetchJson(api('alfa', '/api/islam/' + command, {}, 'apikey'))
      .then(async data => {
        let short = data.result.resources
        let txt = '*Random Quran*\n\n'
        txt += `• Surah : ${short.nameOfSurah.short} (${short.nameOfSurah.transliteration.en})\n`
        txt += `• Surah ke : ${short.numberOfSurah}\n`
        txt += `• Total ayat : ${short.totalAyah}\n`
        txt += `• Ayat ke : ${short.numberOfAyah}\n`
        txt += `• Arab : ${short.ayah.text.arab}\n`
        txt += `• Latin : ${short.ayah.text.transliteration.en}\n`
        txt += `• Tr en : ${short.ayah.translation.en}\n`
        txt += `• Tr id : ${short.ayah.translation.id}\n\n`
        txt += `_*Audio sedang dalam di proses pengiriman*_`
        reply(txt)
        let buff = await getBuffer(short.ayah.audio.primary)
        alpha.sendMessage(from, { audio: { url: short.ayah.audio.primary }, mimetype: 'audio/mpeg' }, { quoted: m })
      })
      .catch(e => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'randomquran2': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
  /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.quran2(prefix, commad, 'Juz', '1'))
    if (isLimit(sender, isPremium, isCreator, isOwner, limitawal, limit)) return sendButMessage(from, lang.limit(prefix), `© ${ownername}`, [{ buttonId: 'limit', buttonText: { displayText: `Check Limit`, }, type: 1, }]);
    var asma = await fetchJson(api('alfa', '/api/islam/' + command, { juz: q }, 'apikey'))
      .then(async data => {
        let short = data.result.resources
        let txt = '*Random Quran*\n\n'
        txt += `• Surah : ${short.nameOfSurah.short} (${short.nameOfSurah.transliteration.en})\n`
        txt += `• Surah ke : ${short.numberOfSurah}\n`
        txt += `• Total ayat : ${short.totalAyah}\n`
        txt += `• Ayat ke : ${short.numberOfAyah}\n`
        txt += `• Arab : ${short.ayah.text.arab}\n`
        txt += `• Latin : ${short.ayah.text.transliteration.en}\n`
        txt += `• Tr en : ${short.ayah.translation.en}\n`
        txt += `• Tr id : ${short.ayah.translation.id}\n\n`
        txt += `_*Audio sedang dalam di proses pengiriman*_`
        reply(txt)
        alpha.sendMessage(from, { audio: { url: short.ayah.audio.primary }, mimetype: 'audio/mpeg' }, { quoted: m })
      })
      .catch(e => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'listsurah': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
  /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    var asma = await fetchJson(api('alfa', '/api/islam/' + command, {}, 'apikey'))
      .then(async data => {
        listt = '*List Surah*\n\n'
        no = 0
        for (var i = 0; i < data.result.listsurah.length; i++) {
          no += 1
          listt += no.toString() + '.  ' + data.result.listsurah[i] + '\n'
        }
        reply(listt)
      })
      .catch(e => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'tafsirsurah': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
  /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.quran2(prefix, command, 'Surah', 'Al-fatihah'))
    var asma = await fetchJson(api('alfa', '/api/islam/' + command, { surah: q }, 'apikey'))
      .then(async data => {
        let listt = '*Tafsir Surah*\n\n'
        let no = 0
        for (var i = 0; i < data.result.length; i++) {
          no += 1
          listt += `• Surah : ${data.result[i].surah}\n`
          listt += `• Tafsir : ${data.result[i].tafsir}\n\n-----------------------------------\n\n`
        }
        reply(listt)
      })
      .catch(e => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'alquranaudio': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
  /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (!text) return reply(lang.quran3(prefix, command, 'Surah', 'ayat', '1', '2'))
    var mon = args.join(' ')
    var m1 = mon.split("|")[0]
    var m2 = mon.split("|")[1]
    var asma = await fetchJson(api('alfa', '/api/islam/alquran-audio2', { ayat: m2, surah: m1 }, 'apikey'))
    let short = asma.result.data
    let listt = '*Alquran Audio*\n\n'
    listt += `• Surah : ${short.surah.name.short} (${short.surah.name.transliteration.en})\n`
    listt += `• Arti : ${short.surah.name.translation.en} (${short.surah.name.translation.id})\n`
    listt += `• Surah ke : ${short.surah.number}\n`
    listt += `• Urutan : ${short.surah.sequence}\n`
    listt += `• Total ayat : ${short.surah.numberOfVerses}\n`
    listt += `• Wahyu : ${short.surah.revelation.arab} (${short.surah.revelation.id})\n`
    listt += `• Tafsir : ${short.surah.tafsir.id}\n\n~~~~~~~~~~~~~~~~~~~\n\n`
    listt += `• Juz : ${short.meta.juz}\n`
    listt += `• Page : ${short.meta.page}\n`
    listt += `• Manzil : ${short.meta.manzil}\n`
    listt += `• Ruku : ${short.meta.ruku}\n`
    listt += `• Quarte : ${short.meta.hizbQuarter}\n`
    listt += `• Arab : ${short.text.arab}\n`
    listt += `• Latin : ${short.text.transliteration.en}\n`
    listt += `• Tr en : ${short.translation.en}\n`
    listt += `• Tr id : ${short.translation.id}\n`
    listt += `• Tafsir short : ${short.tafsir.id.short}\n`
    listt += `• Tafsir long : ${short.tafsir.id.long}\n\n-----------------------------------\n\n`
    let aud_nya = await getBuffer(short.audio.primary)
    alpha.sendMessage(from, { audio: { url: short.audio.primary }, mimetype: 'audio/mpeg' }, { quoted: m })
    reply(listt)
      .catch(e => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'awoawo': case 'benedict': case 'chat': case 'dbfly': case 'dino_kuning': case 'doge': case 'gojosatoru': case 'hope_boy': case 'jisoo': case 'kr_robot': case 'kucing': case 'lonte': case 'manusia_lidi': case 'menjamet': case 'meow': case 'nicholas': case 'patrick': case 'popoci': case 'sponsbob': case 'kawan_sponsbob': case 'tyni': {
    /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
  /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    reply(lang.wait())
    let lp = api('alfa', '/api/telegram-sticker/' + command, {}, 'apikey')
    alpha.sendImageAsSticker(m.chat, lp, m, { packname: global.packname, author: global.author })
      .catch(e => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'google': {
    if (!text) return reply(lang.KisahNabi(prefix, command, 'Indonesia'))
    google({ 'query': text }).then(res => {
      let teks = `*Google Search*\n_Query : ${text}_\n\n`
      for (let g of res) {
        teks += `*Title* : ${g.title}\n`
        teks += `*Description* : ${g.snippet}\n`
        teks += `*Link* : ${g.link}\n\n----------------------------------------\n\n`
      }
      reply(teks)
    })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'nulis':
    reply(`*Pilihan Fitur Nulis*
  1. ${prefix}nuliskiri
  2. ${prefix}nuliskanan
  3. ${prefix}foliokiri
  4. ${prefix}foliokanan
  
  Contoh:
  ${prefix}nuliskiri Subscribe Ya https://youtube.com/c/zeeoneofc`)
    break
  case 'nuliskiri': {
    if (db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
    /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (text.length < 2) return reply(lang.KisahNabi(prefix, command, 'Support Bot WhatsApp'))
    reply(lang.wait())
    const tulisan = body.slice(11)
    const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
    const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
    spawn('convert', [
      './image/nulis/images/buku/sebelumkiri.jpg',
      '-font',
      './image/nulis/font/Indie-Flower.ttf',
      '-size',
      '960x1280',
      '-pointsize',
      '22',
      '-interline-spacing',
      '2',
      '-annotate',
      '+140+153',
      fixHeight,
      './image/nulis/images/buku/setelahkiri.jpg'
    ])
      .on('error', () => reply(mess.error.api))
      .on('exit', () => {
        alpha.sendMessage(from, { caption: lang.ok(), image: fs.readFileSync('./image/nulis/images/buku/setelahkiri.jpg') }, { quoted: m, thumbnail: Buffer.alloc(0) })

      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'nuliskanan': {
    if (db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
    /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (text.length < 2) return reply(lang.KisahNabi(prefix, command, 'Support Bot WhatsApp'))
    reply(lang.wait())
    const tulisan = body.slice(12)
    const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
    const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
    spawn('convert', [
      './image/nulis/images/buku/sebelumkanan.jpg',
      '-font',
      './image/nulis/font/Indie-Flower.ttf',
      '-size',
      '960x1280',
      '-pointsize',
      '23',
      '-interline-spacing',
      '2',
      '-annotate',
      '+128+129',
      fixHeight,
      './image/nulis/images/buku/setelahkanan.jpg'
    ])
      .on('error', () => reply(mess.error.api))
      .on('exit', () => {
        alpha.sendMessage(from, { caption: lang.ok(), image: fs.readFileSync('./image/nulis/images/buku/setelahkanan.jpg') }, { quoted: m, thumbnail: Buffer.alloc(0) })

      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'foliokiri': {
    if (db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
    /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (text.length < 2) return reply(lang.KisahNabi(prefix, command, 'Support Bot WhatsApp'))
    reply(lang.wait())
    const tulisan = body.slice(11)
    const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
    const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
    spawn('convert', [
      './image/nulis/images/folio/sebelumkiri.jpg',
      '-font',
      './image/nulis/font/Indie-Flower.ttf',
      '-size',
      '1720x1280',
      '-pointsize',
      '23',
      '-interline-spacing',
      '4',
      '-annotate',
      '+48+185',
      fixHeight,
      './image/nulis/images/folio/setelahkiri.jpg'
    ])
      .on('error', () => reply(mess.error.api))
      .on('exit', () => {
        alpha.sendMessage(from, { caption: lang.ok(), image: fs.readFileSync('./image/nulis/images/folio/setelahkiri.jpg') }, { quoted: m, thumbnail: Buffer.alloc(0) })

      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'foliokanan': {
    if (db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))
    /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
    if (text.length < 2) return reply(lang.KisahNabi(prefix, command, 'Support Bot WhatsApp'))
    reply(lang.wait())
    const tulisan = body.slice(12)
    const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
    const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
    spawn('convert', [
      './image/nulis/images/folio/sebelumkanan.jpg',
      '-font',
      './image/nulis/font/Indie-Flower.ttf',
      '-size',
      '960x1280',
      '-pointsize',
      '23',
      '-interline-spacing',
      '3',
      '-annotate',
      '+89+190',
      fixHeight,
      './image/nulis/images/folio/setelahkanan.jpg'
    ])
      .on('error', () => reply(mess.error.api))
      .on('exit', () => {
        alpha.sendMessage(from, { caption: lang.ok(), image: fs.readFileSync('./image/nulis/images/folio/setelahkanan.jpg') }, { quoted: m, thumbnail: Buffer.alloc(0) })

      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'tupai':
    try {
      let set
      if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
      if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
      if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
      if (/earrape/.test(command)) set = '-af volume=12'
      if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
      if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
      if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
      if (/reverse/.test(command)) set = '-filter_complex "areverse"'
      if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
      if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
      if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
      if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
      if (/audio/.test(mime)) {
        m.reply(lang.wait())
        let media = await alpha.downloadAndSaveMediaMessage(quoted)
        let ran = getRandom('.mp3')
        exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
          fs.unlinkSync(media)
          if (err) return reply(lang.err())
          let buff = fs.readFileSync(ran)
          alpha.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m })
          fs.unlinkSync(ran)
        })
      } else reply(lang.NoAudRep(prefix, command))
    } catch (e) {
      reply(lang.err())

    }
    /*db.data.users[m.sender].limit -= 1*/
    break

  case 'nomerhoki': case 'nomorhoki': {
    if (!Number(text)) return reply(`Example : ${prefix + command} 887435047326`)
    let anu = await primbon.nomer_hoki(Number(text))
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Nomor HP :* ${anu.message.nomer_hp}\n⭔ *Angka Shuzi :* ${anu.message.angka_shuzi}\n⭔ *Energi Positif :*\n- Kekayaan : ${anu.message.energi_positif.kekayaan}\n- Kesehatan : ${anu.message.energi_positif.kesehatan}\n- Cinta : ${anu.message.energi_positif.cinta}\n- Kestabilan : ${anu.message.energi_positif.kestabilan}\n- Persentase : ${anu.message.energi_positif.persentase}\n⭔ *Energi Negatif :*\n- Perselisihan : ${anu.message.energi_negatif.perselisihan}\n- Kehilangan : ${anu.message.energi_negatif.kehilangan}\n- Malapetaka : ${anu.message.energi_negatif.malapetaka}\n- Kehancuran : ${anu.message.energi_negatif.kehancuran}\n- Persentase : ${anu.message.energi_negatif.persentase}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break

  case 'artimimpi': case 'tafsirmimpi': {
    if (!text) return reply(`Example : ${prefix + command} belanja`)
    let anu = await primbon.tafsir_mimpi(text)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Mimpi :* ${anu.message.mimpi}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Solusi :* ${anu.message.solusi}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break

  case 'ramalanjodoh': case 'ramaljodoh': {
    if (!text) return reply(`Example : ${prefix + command} Zeeone, 12, 1, 2004, Clara, 22, 2, 2004`)
    let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
    let anu = await primbon.ramalan_jodoh(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Nama Anda :* ${anu.message.nama_anda.nama}\n⭔ *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n⭔ *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break

  case 'ramalanjodohbali': case 'ramaljodohbali': {
    if (!text) return reply(`Example : ${prefix + command} Zeeone, 12, 1, 2004, Clara, 22, 2, 2004`)
    let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
    let anu = await primbon.ramalan_jodoh_bali(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Nama Anda :* ${anu.message.nama_anda.nama}\n⭔ *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n⭔ *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break

  case 'suamiistri': {
    if (!text) return reply(`Example : ${prefix + command} Zeeone, 12, 1, 2004, Clara, 22, 2, 2004`)
    let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
    let anu = await primbon.suami_istri(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Nama Suami :* ${anu.message.suami.nama}\n⭔ *Lahir Suami :* ${anu.message.suami.tgl_lahir}\n⭔ *Nama Istri :* ${anu.message.istri.nama}\n⭔ *Lahir Istri :* ${anu.message.istri.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break

  case 'ramalancinta': case 'ramalcinta': {
    if (!text) return reply(`Example : ${prefix + command} Zeeone, 12, 1, 2004, Clara, 22, 2, 2004`)
    let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
    let anu = await primbon.ramalan_cinta(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Nama Anda :* ${anu.message.nama_anda.nama}\n⭔ *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n⭔ *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n⭔ *Sisi Positif :* ${anu.message.sisi_positif}\n⭔ *Sisi Negatif :* ${anu.message.sisi_negatif}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break

  case 'artinama': {
    if (!text) return reply(`Example : ${prefix + command} Zeeone`)
    let anu = await primbon.arti_nama(text)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break

  case 'kecocokannama': case 'cocoknama': {
    if (!text) return reply(`Example : ${prefix + command} Zeeone, 12, 1, 2004`)
    let [nama, tgl, bln, thn] = text.split`,`
    let anu = await primbon.kecocokan_nama(nama, tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Life Path :* ${anu.message.life_path}\n⭔ *Destiny :* ${anu.message.destiny}\n⭔ *Destiny Desire :* ${anu.message.destiny_desire}\n⭔ *Personality :* ${anu.message.personality}\n⭔ *Persentase :* ${anu.message.persentase_kecocokan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'kecocokanpasangan': case 'cocokpasangan': case 'pasangan': {
    if (!text) return reply(`Example : ${prefix + command} Zeeone|Clara`)
    let [nama1, nama2] = text.split`|`
    let anu = await primbon.kecocokan_nama_pasangan(nama1, nama2)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendImage(m.chat, anu.message.gambar, `⭔ *Nama Anda :* ${anu.message.nama_anda}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan}\n⭔ *Sisi Positif :* ${anu.message.sisi_positif}\n⭔ *Sisi Negatif :* ${anu.message.sisi_negatif}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'jadianpernikahan': case 'jadiannikah': {
    if (!text) return reply(`Example : ${prefix + command} 6, 12, 2020`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.tanggal_jadian_pernikahan(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Tanggal Pernikahan :* ${anu.message.tanggal}\n⭔ *karakteristik :* ${anu.message.karakteristik}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'sifatusaha': {
    if (!ext) return reply(`Example : ${command} 28, 12, 2021`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.sifat_usaha_bisnis(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Usaha :* ${anu.message.usaha}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'rejeki': case 'rezeki': {
    if (!text) return reply(`Example : ${prefix + command} 12, 1, 2004`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.rejeki_hoki_weton(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Rezeki :* ${anu.message.rejeki}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'pekerjaan': {
    if (!text) return reply(`Example : ${prefix + command} 12, 1, 2004`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.pekerjaan_weton_lahir(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Pekerjaan :* ${anu.message.pekerjaan}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'ramalannasib': case 'ramalnasib': case 'nasib': {
    if (!text) return reply(`Example : 12, 1, 2004`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.ramalan_nasib(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Analisa :* ${anu.message.analisa}\n⭔ *Angka Akar :* ${anu.message.angka_akar}\n⭔ *Sifat :* ${anu.message.sifat}\n⭔ *Elemen :* ${anu.message.elemen}\n⭔ *Angka Keberuntungan :* ${anu.message.angka_keberuntungan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'potensipenyakit': case 'penyakit': {
    if (!text) return reply(`Example : ${prefix + command} 12, 1, 2004`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.cek_potensi_penyakit(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Analisa :* ${anu.message.analisa}\n⭔ *Sektor :* ${anu.message.sektor}\n⭔ *Elemen :* ${anu.message.elemen}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'artitarot': case 'tarot': {
    if (!text) return reply(`Example : ${prefix + command} 12, 1, 2004`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.arti_kartu_tarot(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendImage(m.chat, anu.message.image, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Simbol Tarot :* ${anu.message.simbol_tarot}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'fengshui': {
    if (!text) return reply(`Example : ${prefix + command} Zeeone, 1, 2004\n\nNote : ${prefix + command} Nama, gender, tahun lahir\nGender : 1 untuk laki-laki & 2 untuk perempuan`)
    let [nama, gender, tahun] = text.split`,`
    let anu = await primbon.perhitungan_feng_shui(nama, gender, tahun)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tahun_lahir}\n⭔ *Gender :* ${anu.message.jenis_kelamin}\n⭔ *Angka Kua :* ${anu.message.angka_kua}\n⭔ *Kelompok :* ${anu.message.kelompok}\n⭔ *Karakter :* ${anu.message.karakter}\n⭔ *Sektor Baik :* ${anu.message.sektor_baik}\n⭔ *Sektor Buruk :* ${anu.message.sektor_buruk}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'haribaik': {
    if (!text) return reply(`Example : ${prefix + command} 12, 1, 2004`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.petung_hari_baik(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Kala Tinantang :* ${anu.message.kala_tinantang}\n⭔ *Info :* ${anu.message.info}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'harisangar': case 'taliwangke': {
    if (!text) return reply(`Example : ${prefix + command} 12, 1, 2004`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.hari_sangar_taliwangke(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Info :* ${anu.message.info}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'harinaas': case 'harisial': {
    if (!text) return reply(`Example : ${prefix + command} 12, 1, 2004`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.primbon_hari_naas(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *Tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hari Naas :* ${anu.message.hari_naas}\n⭔ *Info :* ${anu.message.catatan}\n⭔ *Catatan :* ${anu.message.info}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'nagahari': case 'harinaga': {
    if (!text) return reply(`Example : ${prefix + command} 12, 1, 2004`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.rahasia_naga_hari(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *Tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Arah Naga Hari :* ${anu.message.arah_naga_hari}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'arahrejeki': case 'arahrezeki': {
    if (!text) return reply(`Example : ${prefix + command} 12, 1, 2004`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.primbon_arah_rejeki(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Arah Rezeki :* ${anu.message.arah_rejeki}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'peruntungan': {
    if (!text) return reply(`Example : ${prefix + command} Zeeone, 12, 1, 2004, 2022\n\nNote : ${prefix + command} Nama, tanggal lahir, bulan lahir, tahun lahir, untuk tahun`)
    let [nama, tgl, bln, thn, untuk] = text.split`,`
    let anu = await primbon.ramalan_peruntungan(nama, tgl, bln, thn, untuk)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Peruntungan Tahun :* ${anu.message.peruntungan_tahun}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'weton': case 'wetonjawa': {
    if (!text) return reply(`Example : ${prefix + command} 12, 1, 2004`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.weton_jawa(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Tanggal :* ${anu.message.tanggal}\n⭔ *Jumlah Neptu :* ${anu.message.jumlah_neptu}\n⭔ *Watak Hari :* ${anu.message.watak_hari}\n⭔ *Naga Hari :* ${anu.message.naga_hari}\n⭔ *Jam Baik :* ${anu.message.jam_baik}\n⭔ *Watak Kelahiran :* ${anu.message.watak_kelahiran}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'sifat': case 'karakter': {
    if (!text) return reply(`Example : ${prefix + command} Zeeone,12, 1, 2004`)
    let [nama, tgl, bln, thn] = text.split`,`
    let anu = await primbon.sifat_karakter_tanggal_lahir(nama, tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Garis Hidup :* ${anu.message.garis_hidup}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'keberuntungan': {
    if (!text) return reply(`Example : ${prefix + command} Zeeone, 12, 1, 2004`)
    let [nama, tgl, bln, thn] = text.split`,`
    let anu = await primbon.potensi_keberuntungan(nama, tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'memancing': {
    if (!text) return reply(`Example : ${prefix + command} 12, 1, 2022`)
    let [tgl, bln, thn] = text.split`,`
    let anu = await primbon.primbon_memancing_ikan(tgl, bln, thn)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Tanggal :* ${anu.message.tgl_memancing}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'masasubur': {
    if (!text) return reply(`Example : ${prefix + command} 12, 1, 2022, 28\n\nNote : ${prefix + command} hari pertama menstruasi, siklus`)
    let [tgl, bln, thn, siklus] = text.split`,`
    let anu = await primbon.masa_subur(tgl, bln, thn, siklus)
    if (anu.status == false) return m.reply(anu.message)
    alpha.sendText(m.chat, `⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
  }
    /*db.data.users[m.sender].limit -= 1*/
    break
  //ephoto360
  case 'youtubegold': case 'youtubesilver': case 'facebookgold': case 'facebooksilver': case 'instagramgold': case 'instagramsilver': case 'twittergold': case 'twittersilver': case 'retrotext': case 'halloweenbats': case 'texthalloween': case 'cardhalloween': case 'birthdaycake': case 'thundertext': case 'icetext': case 'milkcake': case 'snowontext': case 'metalstar': case 'dragonfire': case 'zombie3d': case 'merrycard': case 'generalexam': case 'viettel': case 'embroider': case 'graffititext': case 'graffititext2': case 'graffititext3': case 'covergraffiti': case 'moderngold': case 'capercut': case 'lovecard': case 'heartflashlight': case 'heartcup': case 'sunglightshadow': case 'graffiti3d': case 'moderngoldsilver': case 'moderngold2': case 'modengold3': case 'fabrictext': case 'masteryavatar': case 'messagecoffee': case 'announofwin': case 'writeblood': case 'horrorletter': case 'writehorror': case 'shirtclub': case 'angelwing': case 'christmasseason': case 'projectyasuo': case 'lovelycute': case 'womansday': case 'covergamepubg': case 'nameonheart': case 'funnyhalloween': case 'lightningpubg': case 'greetingcardvideo': case 'christmascard': case 'galaxybat': case 'writegalaxy': case 'starsnight': case 'noeltext': case 'textcakes': case 'pubgbirthday': case 'galaxywallpaper': case 'pubgglicthvideo': case 'pubgmascotlogo': case 'realembroidery': case 'vintagetelevision': case 'funnyanimations': case 'glowingtext': case 'textonglass': case 'cartoonstyle': case 'multicolor': case 'watercolor2': case 'textsky': case 'summerbeach': case '1917text': case 'puppycute': case 'rosebirthday': {
    if (!text) return reply(lang.NoTeksOne(prefix, command))
    reply(lang.wait())
    let texpro = await(global.api('alfa', '/api/ephoto360/' + command, { text: text }, 'apikey'))
    await sendFileFromUrl(from, texpro, lang.ok(), m)
      .catch((err) => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }

    break
  case 'steellettering': case 'letterstext': case 'barcashirt': case 'premiercup': case 'stylepoligon': case 'lifebuoys': case 'juventusshirt': {
    if (!text) return reply(lang.NoTeksTwo(prefix, command))
    if (!text.includes('|')) return reply(lang.NoTeksTwo(prefix, command))
    mm = args.join(' ')
    m1 = mm.split("|")[0];
    m2 = mm.split("|")[1];
    reply(lang.wait())
    let texpro = await(global.api('alfa', '/api/ephoto360/' + command, { text: m1, text2: m2 }, 'apikey'))
    await sendFileFromUrl(from, texpro, lang.ok(), m)
      .catch((err) => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break

  case 'halloween2': case 'horror': case 'game8bit': case 'layered': case 'glitch2': case 'coolg': case 'coolwg': case 'realistic': case 'space3d': case 'gtiktok': case 'stone': case 'marvel': case 'marvel2': case 'pornhub': case 'avengers': case 'metalr': case 'metalg': case 'metalg2': case 'halloween2': case 'lion': case 'wolf_bw': case 'wolf_g': case 'ninja': case '3dsteel': case 'horror2': case 'lava': case 'bagel': {
    if (!text) return reply(lang.NoTeksTwo(prefix, command))
    if (!text.includes('|')) return reply(lang.NoTeksTwo(prefix, command))
    mm = args.join(' ')
    m1 = mm.split("|")[0];
    m2 = mm.split("|")[1];
    reply(lang.wait())
    let texproo = await(global.api(global.APIs.alfa, '/api/textpro/' + command, { apikey: alphabot, text: m1, text2: m2 }))
    await sendFileFromUrl(from, texproo, lang.ok(), m)
      .catch((err) => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  } break

  case 'blackpink': case 'rainbow2': case 'water_pipe': case 'halloween': case 'sketch': case 'sircuit': case 'discovery': case 'metallic2': case 'fiction': case 'demon': case 'transformer': case 'berry': case 'thunder': case 'magma': case '3dstone': case 'neon': case 'glitch': case 'harry_potter': case 'embossed': case 'broken': case 'papercut': case 'gradient': case 'glossy': case 'watercolor': case 'multicolor': case 'neon_devil': case 'underwater': case 'bear': case 'wonderfulg': case 'christmas': case 'neon_light': case 'snow': case 'cloudsky': case 'luxury2': case 'gradient2': case 'summer': case 'writing': case 'engraved': case 'summery': case '3dglue': case 'metaldark': case 'neonlight': case 'oscar': case 'minion': case 'holographic': case 'purple': case 'glossyb': case 'deluxe2': case 'glossyc': case 'fabric': case 'neonc': case 'newyear': case 'newyear2': case 'metals': case 'xmas': case 'blood': case 'darkg': case 'joker': case 'wicker': case 'natural': case 'firework': case 'skeleton': case 'balloon': case 'balloon2': case 'balloon3': case 'balloon4': case 'balloon5': case 'balloon6': case 'balloon7': case 'steel': case 'gloss': case 'denim': case 'decorate': case 'decorate2': case 'peridot': case 'rock': case 'glass': case 'glass2': case 'glass3': case 'glass4': case 'glass5': case 'glass6': case 'glass7': case 'glass8': case 'captain_as2': case 'robot': case 'equalizer': case 'toxic': case 'sparkling': case 'sparkling2': case 'sparkling3': case 'sparkling4': case 'sparkling5': case 'sparkling6': case 'sparkling7': case 'decorative': case 'chocolate': case 'strawberry': case 'koifish': case 'bread': case 'matrix': case 'blood2': case 'neonligth2': case 'thunder2': case '3dbox': case 'neon2': case 'roadw': case 'bokeh': case 'gneon': case 'advanced': case 'dropwater': case 'wall': case 'chrismast': case 'honey': case 'drug': case 'marble': case 'marble2': case 'ice': case 'juice': case 'rusty': case 'abstra': case 'biscuit': case 'wood': case 'scifi': case 'metalr': case 'purpleg': case 'shiny': case 'jewelry': case 'jewelry2': case 'jewelry3': case 'jewelry4': case 'jewelry5': case 'jewelry6': case 'jewelry7': case 'jewelry8': case 'metalh': case 'golden': case 'glitter': case 'glitter2': case 'glitter3': case 'glitter4': case 'glitter5': case 'glitter6': case 'glitter7': case 'metale': case 'carbon': case 'candy': case 'metalb': case 'gemb': case '3dchrome': case 'metalb2': case 'metalg':
    {
      /*if(db.data.settings[botNumber].userRegister && !db.data.users[m.sender].registered) return reply(lang.needReg(pushname, botname, prefix))*/
      /*if(db.data.users[m.sender].limit < 1) return alpha.send2ButMes(m.chat, lang.Nolimit(prefix), `© ${ownername}`, `daily`, `👉 Daily`, `weekly`, `Weekly 👈`, m)*/
      if (!text && text.includes('|')) return reply(lang.NoTeksOne(prefix, command))
      reply(lang.wait())
      let texpro = await(global.api('alfa', '/api/textpro/' + command, { text: text }, 'apikey'))
      await sendFileFromUrl(from, texpro, lang.ok(), m)
        .catch((err) => {
          reply(lang.err())
        })
      /*db.data.users[m.sender].limit -= 1*/
    } break
  case 'chika': case 'rikagusriani': case 'bocil': case 'geayubi': case 'santuy': case 'ukhty': case 'delvira': case 'ayu': case 'bunga': case 'aura': case 'nisa': case 'ziva': case 'yana': case 'viona': case 'syania': case 'riri': case 'syifa': case 'mama_gina': case 'alcakenya': case 'mangayutri': {
    reply(lang.wait())
    let to = await(global.api('alfa', '/api/asupan/' + command, {}, 'apikey'))
    await sendFileFromUrl(from, to, lang.ok(), m)
      .catch((err) => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  } break
  case 'china': case 'indonesia': case 'malaysia': case 'thailand': case 'korea': case 'japan': case 'vietnam': case 'jenni': case 'jiso': case 'lisa': case 'rose': {
    let to = await(global.api('alfa', '/api/cecan/' + command, {}, 'apikey'))
    reply(lang.wait())
    await sendFileFromUrl(from, to, lang.ok(), m)
      .catch((err) => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  } break

  case 'cuddle': case 'foxgirl': case 'kemonomimi2': case 'woof': case 'holo2': case 'hug': case 'kiss': case 'lizard': case 'meowi': case 'neko2': case 'pat': case 'poke': case 'slap': case 'tickle': {
    //if (!db.data.chats[m.chat].nsfw) return reply(lang.OffNsfw())
    reply(lang.wait())
    let to = await(global.api('alfa', '/api/sfw/' + command, {}, 'apikey'))
    await sendFileFromUrl(from, to, lang.ok(), m)
      .catch((err) => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  } break

  case 'soundcloud': {
    if (!text) return reply(lang.KisahNabi(prefix, command, 'Url SoundCloud'))
    if (!isUrl(q)) return reply(lang.KisahNabi(prefix, command, 'Url SoundCloud'))
    if (!text.includes('soundcloud.com')) return reply(lang.KisahNabi(prefix, command, 'Url SoundCloud'))
    await reply(lang.wait())
    zee.SoundCloud(`${text}`).then(async (data) => {
      let txt = `*----「 SOUNDCLOUD DOWNLOAD 」----*\n\n`
      txt += `*📟 Title :* ${data.title}\n`
      txt += `*🎞️ Duration :* ${data.duration}\n`
      txt += `*🛠️ Quality :* ${data.medias[1].quality}\n`
      txt += `*🚧 Ext :* ${data.medias[0].extension}\n`
      txt += `*💾 Size :* ${data.medias[0].formattedSize}\n`
      txt += `*📚 Url Source :* ${data.url}\n\n`
      txt += `*Mohon tunggu sebentar kak, sedang proses pengiriman...*`
      let gam = await getBuffer(data.thumbnail)
      var but = [
        {
          "urlButton": {
            "displayText": "Website",
            "url": `${myweb}`
          }
        }
      ]
      await alpha.send5ButLoc(from, txt, `© ${ownername}`, gam, but, { userJid: m.chat, quoted: m })
    })
    alpha.sendMessage(from, { audio: { url: data.medias[0].url }, fileName: `${data.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
  }
    /*db.data.users[m.sender].limit -= 1*/
    break

  case 'twtdl': case 'twt': case 'twitterdl': case 'twitter': {
    if (!text) return reply(lang.KisahNabi(prefix, command, 'url Twitter'))
    if (!isUrl(q)) return reply(lang.KisahNabi(prefix, command, 'url Twitter'))
    if (!text.includes('twitter.com')) return reply(lang.KisahNabi(prefix, command, 'url Twitter'))
    await reply(lang.wait())
    zee.Twitter(`${q}`).then(async data => {
      let txt = `*----「 TWITTER DOWNLOADER 」----*\n\n`
      txt += `*📫 Title :* ${data.title}\n`
      txt += `*📟 Quality :* ${data.medias[1].quality}\n`
      txt += `*💾 Size :* ${data.medias[1].formattedSize}\n`
      txt += `*📚 Url :* ${data.url}`
      sendFileFromUrl(from, data.medias[1].url, txt, m)
    })
      .catch((err) => {
        reply(lang.err())
      })
  } break

  case 'cry': case 'kill': case 'hug': case 'pat': case 'lick': case 'kiss': case 'bite': case 'yeet': case 'neko': case 'bully': case 'bonk': case 'wink': case 'poke': case 'nom': case 'slap': case 'smile': case 'wave': case 'awoo': case 'blush': case 'smug': case 'glomp': case 'happy': case 'dance': case 'cringe': case 'highfive': case 'shinobu': case 'megumin': case 'handhold': {
    reply(lang.wait())
    axios.get(`https://api.waifu.pics/sfw/${command}`)
      .then(({ data }) => {
        alpha.sendMediaAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
      })
    /*/*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'waifux': case 'lolix': {
    reply(lang.wait())
    axios.get(`https://api.waifu.pics/sfw/waifu`)
      .then(({ data }) => {
        alpha.sendImage(m.chat, data.url, lang.ok(), m)
      })
    /*/*db.data.users[m.sender].limit -= 1*/
  }
    break

  case 'toaud': case 'toaudio': {
    if (!/video/.test(mime) && !/audio/.test(mime)) return reply(lang.ToAud(prefix, command))
    if (!quoted) return reply(lang.ToAud(prefix, command))
    reply(lang.wait())
    let media = await quoted.download()
    let audio = await toAudio(media, 'mp4')
    alpha.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg' }, { quoted: m })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'tomp3': {
    if (/document/.test(mime)) return reply(lang.ToMp3(prefix, command))
    if (!/video/.test(mime) && !/audio/.test(mime)) return reply(lang.ToMp3(prefix, command))
    if (!quoted) return reply(lang.ToMp3(prefix, command))
    reply(lang.wait())
    let media = await quoted.download()
    let audio = await toAudio(media, 'mp4')
    alpha.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg' }, { quoted: m })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'tovn': case 'toptt': {
    if (!/video/.test(mime) && !/audio/.test(mime)) return reply(lang.ToVn())
    if (!quoted) return reply(lang.ToVn())
    reply(lang.wait())
    let media = await quoted.download()
    let audio = await toPTT(media, 'mp4')
    alpha.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'webtonsearch': case 'webtoon':
    if (!text) return reply(lang.KisahNabi(prefix, command, 'Bot whatsapp'))
    await reply(lang.wait())
    zee.Webtoons(q).then(async data => {
      let txt = `*------「 WEBTOONS-SEARCH 」------*\n\n`
      for (let i of data) {
        txt += `*📫 Title :* ${i.judul}\n`
        txt += `*👍🏻 Like :* ${i.like}\n`
        txt += `*🤴🏻 Creator :* ${i.creator}\n`
        txt += `*🎪 Genre :* ${i.genre}\n`
        txt += `*📚 Url :* ${i.url}\n ----------------------------------------------------------\n`
      }
      await reply(txt)
    })
      .catch((err) => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
    break
  case 'drakor':
    if (!text) return reply(lang.KisahNabi(prefix, command, 'fall in love'))
    await reply(lang.wait())
    zee.Drakor(`${text}`).then(async data => {
      let txt = `*-----「 DRAKOR-SEARCH 」-----*\n\n`
      for (let i of data) {
        txt += `*📫 Title :* ${i.judul}\n`
        txt += `*📆 Years :* ${i.years}\n`
        txt += `*🎥 Genre :* ${i.genre}\n`
        txt += `*📚 Url :* ${i.url}\n-----------------------------------------------------\n`
      }
      await sendFileFromUrl(from, data[0].thumbnail, txt, m)
    })
      .catch((err) => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
    break

  case 'pinterest': {
    if (!text) return reply(lang.KisahNabi(prefix, command, 'Bot whatsapp'))
    reply(lang.wait())
    anu = await pinterest(text)
    result = anu[Math.floor(Math.random(), anu.length)]
    let gam = await getBuffer(result)
    var but = [
      {
        "urlButton": {
          "displayText": "Media Url",
          "url": `${result}`
        }
      }
    ]
    await alpha.send5ButImg(m.chat, `${text}`, `© ${ownername}`, gam, but, { userJid: m.chat, quoted: m })
      .catch((err) => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'wallpaper': {
    if (!text) return reply(lang.KisahNabi(prefix, command, 'Bot whatsapp'))
    reply(lang.wait())
    wallpaper(text).then(async anu => {
      result = anu[Math.floor(Math.random(), anu.length)]
      let gam = await getBuffer(result.image[0])
      var but = [
        {
          "urlButton": {
            "displayText": "Website",
            "url": `${myweb}`
          }
        }
      ]
      await alpha.send5ButImg(from, `⭔ Title : ${result.title}\n⭔ Source : ${result.source}\n⭔ Media Url : ${result.image}`, `© ${ownername}`, gam, but, { userJid: m.chat, quoted: m })
    })
      .catch((err) => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break
  case 'wikimedia': {
    if (!text) return reply(lang.KisahNabi(prefix, command, 'Bot whatsapp'))
    reply(lang.wait())
    wikimedia(text).then(async anu => {
      result = anu[Math.floor(Math.random(), anu.length)]
      let gam = await getBuffer(result.image[0])
      var but = [
        {
          "urlButton": {
            "displayText": "Website",
            "url": `${myweb}`
          }
        }
      ]
      await alpha.send5ButImg(from, `⭔ Title : ${result.title}\n⭔ Source : ${result.source}\n⭔ Media Url : ${result.image}`, `© ${ownername}`, gam, but, { userJid: m.chat, quoted: m })
    })
      .catch((err) => {
        reply(lang.err())
      })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break

  case 'quotesanimeeee': case 'quoteanime': {
    reply(lang.wait())
    quotesAnime().then(async anu => {
      gam = await getBuffer(picak + 'quotes anime')
      result = anu[Math.floor(Math.random(), anu.length)]
      alpha.send5ButLoc(m.chat, `_${result.quotes}_\n\nBy *'${result.karakter}'*, ${result.anime}\n\n*_- ${result.up_at}_*`, '©' + ownername, gam, [{ "quickReplyButton": { "displayText": "Next Quotes", "id": 'quotesanime' } }], { quoted: m })
    })
    /*db.data.users[m.sender].limit -= 1*/
  }
    break

  case 'paaay': case 'baaaayar': {
    alpha.sendMessage(m.chat, { image: qris, caption: (db.data.settings[botNumber].captionPay || 'Payment. caption pay bisa ubah dengan command .setcaptionpay ') }, { quoted: m })
  }
    break
  case 'setcaptionpay': {
    if (!m.isGroup) return reply(lang.groupOnly())
    if (!isGroupAdmins && !isGroupOwner && !isCreator) return reply(lang.adminOnly())
    if (!text) return reply(`Contoh penggunaan: ${prefix + command} Payment`)
    db.data.settings[botNumber].captionPay = text
    alpha.sendButMessage(m.chat, lang.ok() + ' ' + command + '\n\n' + text, `© ${ownername}`, [{ buttonId: 'menu', buttonText: { displayText: 'Menu' }, type: 1 }], { quoted: fgif })
  }
    break
  case 'donasisss': case 'donatssse': {
    var but = [
      {
        "urlButton": {
          "displayText": "WebSite",
          "url": `${myweb}`

        }
      },
      {
        "quickReplyButton": {
          "displayText": "Rules",
          "id": 'rules'
        }
      },
      {
        "quickReplyButton": {
          "displayText": "Owner",
          "id": 'owner'
        }
      },
      {
        "urlButton": {
          "displayText": "Sewa Bot -> Chat Owner",
          "url": `${youtube}`
        }
      },
      {
        "quickReplyButton": {
          "displayText": "List Command",
          "id": 'command'
        }
      }
    ]
    await alpha.send5ButImg(from, lang.tos(ownernomer), `© ${ownername}`, qris, but, { userJid: m.chat, quoted: m })
  } break

  /**
   * @endsHere
   */
}