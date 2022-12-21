/**
 * @Features
 * @Helper
 */

switch (command) {
  /**
   * @types
   * @commands
   */


  case `honkai`:
    {
      if (!g.func.parameter(body)) {
        sock.sendMessage(from, {
          text: "Honkai Impact Random Image",
          buttonText: "Pilih Disini",
          sections: [{
            title: "Daftar Karakter",
            rows: [
              { title: 'Kiana Kaslana', rowId: ".in2208 Kiana Kaslana 43" },
              { title: 'Bronya Zaychik', rowId: ".in2208 Bronya Zaychik 26" },
              { title: 'Durandal', rowId: ".in2208 Durandal 4 " },
              { title: 'Fu Hua', rowId: ".in2208 Fu Hua 18" },
              { title: 'Liliya Olenyeva', rowId: ".in2208 Liliya Olenyeva 7 " },
              { title: 'Rozaliya Olenyeva', rowId: ".in2208 Rozaliya Olenyeva 9 " },
              { title: 'Raiden Mei', rowId: ".in2208 Raiden Mei 34" },
              { title: 'Rita Rossweisse', rowId: ".in2208 Rita Rossweisse 24" },
              { title: 'Seele Vollerei', rowId: ".in2208 Seele Vollerei 20" },
              { title: 'Theresa Apocalypse', rowId: ".in2208 Theresa Apocalypse 27" },
              { title: 'Yae Sakura', rowId: ".in2208 Yae Sakura 37" }]
          }]
        })
        break
      }
    }

  //Genshin Random Image
  case "genshin":
    {
      if (!g.func.parameter(body)) {
        sock.sendMessage(from, {
          text: "Genshin Impact Random Image",
          buttonText: "Pilih Disini",
          sections: [{
            title: "Daftar Karakter",
            rows: [
              { title: 'Amber', rowId: ".in2208 Amber (Genshin Impact) 30" },
              { title: 'Yae Miko', rowId: ".in2208 Yae Miko 77" },
              { title: 'Raiden Shogun', rowId: ".in2208 Raiden Shogun 99" },
              { title: 'Ganyu', rowId: ".in2208 ganyu 99" },
              { title: 'Hu Tao', rowId: ".in2208 hu tao 99" },
              { title: 'Yoimiya', rowId: ".in2208 yoimiya 18" },
              { title: 'Eula', rowId: ".in2208 eula 66" },
              { title: 'Kamisato Ayaka', rowId: ".in2208 kamisato ayaka 44" },
              { title: 'Keqing', rowId: ".in2208 Keqing 99" },
              { title: 'Fischl ', rowId: ".in2208 Fischl 50" },
              { title: 'Barbara ', rowId: ".in2208 Barbara (Genshin Impact) 59" },
              { title: 'Sangonomiya Kokomi', rowId: ".in2208 Sangonomiya Kokomi 57" }
            ]
          }]
        })
        break
      }
    }

  //ErSignet
  case `er`:
  case `ersignet`:
    {
      await g.func.sendTyping()
      if (!parameter) {
        sock.sendMessage(from, {
          text: "*Honkai Impact* \nElysian Realm Recommended Signet",
          buttonText: "Pilih Disini",
          sections: [{
            title: "Daftar Karakter",
            rows: [
              { title: 'Infinite Ouroboros', rowId: ".er io" },
              { title: 'Miss Pink Elf♪', rowId: ".er ely" },
              { title: 'Palatinus Equinox', rowId: ".er pe" },
              { title: 'Spina Astera', rowId: ".er ritasa" },
              { title: 'Herrscher of Flamescion', rowId: ".er hof" },
              { title: 'SILVERWING: N-EX', rowId: ".er sw" },
              { title: 'Dea Anchora', rowId: ".er dea" },
              { title: 'Herrscher of YATTA', rowId: ".er hos" },
              { title: 'Argent Knight: Artemis', rowId: ".er aka" },
              { title: 'Starchasm Nyx', rowId: ".er nyx" },
              { title: 'Herrscher of Reason', rowId: ".er hor" },
              { title: 'Prinzessin der Verurteilung', rowId: ".er faisal" },
              { title: 'Herrscher of Thunder (Basic Attack)', rowId: ".er hot" },
              { title: 'Herrscher of Thunder (Burst)', rowId: ".er hotburst" },
              { title: 'Twilight Paladin', rowId: ".er tp" },
              { title: 'Midnight Absinthe', rowId: ".er ma" },
              { title: 'Valkyrie Bladestrike', rowId: ".er sf" },
              { title: 'Stygian Nymph', rowId: ".er sn" },
              { title: 'Bright Knight: Excelsisn', rowId: ".er bke" },
              { title: 'Valkyrie Gloria', rowId: ".er vg" },
              { title: 'Ritual Imayoh', rowId: ".er ri" },
              { title: 'Luna Kindred', rowId: ".er lk" },
              { title: 'Sweet n Spicy', rowId: ".er snc" },
              { title: 'Pardofelis', rowId: ".er felis" },
              { title: 'Fallen Rosemary', rowId: ".er fr" },
              { title: 'Aphonia', rowId: ".er aphonia" },
              { title: 'EDEN', rowId: ".er eden" },
              { title: 'Griseo', rowId: ".er griseo" },
              { title: 'Fervent Tempo', rowId: ".er ft" },
              { title: 'Herrscher of Human: Ego', rowId: ".er hoh" },
              { title: 'Herrscher of Void', rowId: ".er hov" },
              { title: 'Kubis (AI CHWAN)', rowId: ".er kubis" },
              { title: 'Jade Knight (Li Sushang)', rowId: ".er sus" },
              { title: 'Ma-- Vermilion Knight', rowId: ".er veki" }
            ]
          }]
        })
        break
      }
      try {
        const text = `Ini Rekomendasi Signet nya Kapten!`
        const build = `https://4relial.github.io/ElysianRealm/${parameter.toLocaleLowerCase()}.jpg`
        await g.func.replyImage(build, text)
      } catch (e) {
        return g.func.reply("Karakter tidak ditemukan!");
      }

      break
    }

  case `materialgi`:
  case 'gi-material':
  case 'giascend':
    {
      await g.func.sendTyping()
      sock.sendMessage(from, {
        text: "_Genshin Impact Material Ascend and Talent_",
        buttonText: "Pilih Disini",
        sections: [{
          title: "Daftar Karakter",
          rows: [
            { title: "Albedo", rowId: ".sheet Character_Albedo" },
            { title: "Aloy", rowId: ".sheet Character_Aloy" },
            { title: "Amber", rowId: ".sheet Character_Amber" },
            { title: "AnemoTraveler", rowId: ".sheet Character_AnemoTraveler" },
            { title: "Ayaka", rowId: ".sheet Character_Ayaka" },
            { title: "Ayato", rowId: ".sheet Character_Ayato" },
            { title: "Barbara", rowId: ".sheet Character_Barbara" },
            { title: "Beidou", rowId: ".sheet Character_Beidou" },
            { title: "Bennett", rowId: ".sheet Character_Bennett" },
            { title: "Candace", rowId: ".sheet Character_Candace" },
            { title: "Chongyun", rowId: ".sheet Character_Chongyun" },
            { title: "Collei", rowId: ".sheet Character_Collei" },
            { title: "Cyno", rowId: ".sheet Character_Cyno" },
            { title: "Diluc", rowId: ".sheet Character_Diluc" },
            { title: "Diona", rowId: ".sheet Character_Diona" },
            { title: "Dori", rowId: ".sheet Character_Dori" },
            { title: "ElectroTraveler", rowId: ".sheet Character_ElectroTraveler" },
            { title: "Eula", rowId: ".sheet Character_Eula" },
            { title: "Faruzan", rowId: ".sheet Character_Faruzan" },
            { title: "Fischl", rowId: ".sheet Character_Fischl" },
            { title: "Ganyu", rowId: ".sheet Character_Ganyu" },
            { title: "GeoTraveler", rowId: ".sheet Character_GeoTraveler" },
            { title: "Gorou", rowId: ".sheet Character_Gorou" },
            { title: "Heizou", rowId: ".sheet Character_Heizou" },
            { title: "Itto", rowId: ".sheet Character_Itto" },
            { title: "Jean", rowId: ".sheet Character_Jean" },
            { title: "Kaeya", rowId: ".sheet Character_Kaeya" },
            { title: "Kazuha", rowId: ".sheet Character_Kazuha" },
            { title: "Keqing", rowId: ".sheet Character_Keqing" },
            { title: "Klee", rowId: ".sheet Character_Klee" },
            { title: "Kokomi", rowId: ".sheet Character_Kokomi" },
            { title: "Layla", rowId: ".sheet Character_Layla" },
            { title: "Lisa", rowId: ".sheet Character_Lisa" },
            { title: "Mona", rowId: ".sheet Character_Mona" },
            { title: "Nahida", rowId: ".sheet Character_Nahida" },
            { title: "Nilou", rowId: ".sheet Character_Nilou" },
            { title: "Ningguang", rowId: ".sheet Character_Ningguang" },
            { title: "Noelle", rowId: ".sheet Character_Noelle" },
            { title: "Qiqi", rowId: ".sheet Character_Qiqi" },
            { title: "Raiden", rowId: ".sheet Character_Raiden" },
            { title: "Razor", rowId: ".sheet Character_Razor" },
            { title: "Rosaria", rowId: ".sheet Character_Rosaria" },
            { title: "Sara", rowId: ".sheet Character_Sara" },
            { title: "Sayu", rowId: ".sheet Character_Sayu" },
            { title: "Shenhe", rowId: ".sheet Character_Shenhe" },
            { title: "Shinobu", rowId: ".sheet Character_Shinobu" },
            { title: "Sucrose", rowId: ".sheet Character_Sucrose" },
            { title: "Tartaglia", rowId: ".sheet Character_Tartaglia" },
            { title: "Thoma", rowId: ".sheet Character_Thoma" },
            { title: "Tighnari", rowId: ".sheet Character_Tighnari" },
            { title: "Venti", rowId: ".sheet Character_Venti" },
            { title: "Wanderer", rowId: ".sheet Character_Wanderer" },
            { title: "Xiao", rowId: ".sheet Character_Xiao" },
            { title: "Xingqiu", rowId: ".sheet Character_Xingqiu" },
            { title: "Xinyan", rowId: ".sheet Character_Xinyan" },
            { title: "Yae", rowId: ".sheet Character_Yae" },
            { title: "Yanfei", rowId: ".sheet Character_Yanfei" },
            { title: "Yelan", rowId: ".sheet Character_Yelan" },
            { title: "YunJin", rowId: ".sheet Character_YunJin" },
            { title: "Yoimiya", rowId: ".sheet Character_Yoimiya" },
            { title: "Zhongli", rowId: ".sheet Character_Zhongli" },


          ]
        }]
      })
      break
    }

  case "sheet": {
    try {
      await g.func.sendTyping()
      const text = `Source: https://twitter.com/WorldOfTeyvat`
      const build = `https://4relial.github.io/GenshinAscend/${parameter}.jpg`
      g.func.replyImage(build, text)
    } catch (e) {
      return g.func.reply("Karakter tidak ditemukan!");
    }
    break
  }


  case `buildgi`:
  case 'gi-build':
  case 'gibuild':
    {
      await g.func.sendTyping()
      sock.sendMessage(from, {
        text: "_Genshin Impact Recommended Build_",
        buttonText: "Pilih Disini",
        sections: [{
          title: "Daftar Karakter",
          rows: [
            { title: "Albedo", rowId: ".sheet2 Character_Albedo" },
            { title: "Aloy", rowId: ".sheet2 Character_Aloy" },
            { title: "Amber", rowId: ".sheet2 Character_Amber" },
            { title: "AmberDPS", rowId: ".sheet2 Character_AmberDPS" },
            { title: "Ayaka", rowId: ".sheet2 Character_Ayaka" },
            { title: "Ayato", rowId: ".sheet2 Character_Ayato" },
            { title: "AyatoDPS", rowId: ".sheet2 Character_AyatoDPS" },
            { title: "Barbara", rowId: ".sheet2 Character_Barbara" },
            { title: "Beidou", rowId: ".sheet2 Character_Beidou" },
            { title: "Bennett", rowId: ".sheet2 Character_Bennett" },
            { title: "Candace", rowId: ".sheet2 Character_Candace" },
            { title: "Chongyun", rowId: ".sheet2 Character_Chongyun" },
            { title: "Collei", rowId: ".sheet2 Character_Collei" },
            { title: "Cyno", rowId: ".sheet2 Character_Cyno" },
            { title: "Diluc", rowId: ".sheet2 Character_Diluc" },
            { title: "Diona", rowId: ".sheet2 Character_Diona" },
            { title: "Dori", rowId: ".sheet2 Character_Dori" },
            { title: "Eula", rowId: ".sheet2 Character_Eula" },
            { title: "Faruzan", rowId: ".sheet2 Character_Faruzan" },
            { title: "Fischl", rowId: ".sheet2 Character_Fischl" },
            { title: "Ganyu", rowId: ".sheet2 Character_Ganyu" },
            { title: "Ganyu_Freeze", rowId: ".sheet2 Character_Ganyu_Freeze" },
            { title: "Ganyu_Melt", rowId: ".sheet2 Character_Ganyu_Melt" },
            { title: "Gorou", rowId: ".sheet2 Character_Gorou" },
            { title: "Heizou", rowId: ".sheet2 Character_Heizou" },
            { title: "HuTao", rowId: ".sheet2 Character_HuTao" },
            { title: "Itto", rowId: ".sheet2 Character_Itto" },
            { title: "Jean", rowId: ".sheet2 Character_Jean" },
            { title: "Kaeya", rowId: ".sheet2 Character_Kaeya" },
            { title: "KaeyaDPS", rowId: ".sheet2 Character_KaeyaDPS" },
            { title: "Kazuha", rowId: ".sheet2 Character_Kazuha" },
            { title: "Keqing_Electro", rowId: ".sheet2 Character_Keqing_Electro" },
            { title: "Keqing_Physical", rowId: ".sheet2 Character_Keqing_Physical" },
            { title: "Klee", rowId: ".sheet2 Character_Klee" },
            { title: "Kokomi", rowId: ".sheet2 Character_Kokomi" },
            { title: "Layla", rowId: ".sheet2 Character_Layla" },
            { title: "Lisa", rowId: ".sheet2 Character_Lisa" },
            { title: "LisaDPS", rowId: ".sheet2 Character_LisaDPS" },
            { title: "Mona", rowId: ".sheet2 Character_Mona" },
            { title: "Mona_Freeze", rowId: ".sheet2 Character_Mona_Freeze" },
            { title: "Mona_Nuke", rowId: ".sheet2 Character_Mona_Nuke" },
            { title: "Nahida", rowId: ".sheet2 Character_Nahida" },
            { title: "Nilou", rowId: ".sheet2 Character_Nilou" },
            { title: "Ningguang", rowId: ".sheet2 Character_Ningguang" },
            { title: "NingguangDPS", rowId: ".sheet2 Character_NingguangDPS" },
            { title: "Noelle", rowId: ".sheet2 Character_Noelle" },
            { title: "Qiqi", rowId: ".sheet2 Character_Qiqi" },
            { title: "Raiden", rowId: ".sheet2 Character_Raiden" },
            { title: "Razor", rowId: ".sheet2 Character_Razor" },
            { title: "Rosaria", rowId: ".sheet2 Character_Rosaria" },
            { title: "Sara", rowId: ".sheet2 Character_Sara" },
            { title: "Sayu", rowId: ".sheet2 Character_Sayu" },
            { title: "Shenhe", rowId: ".sheet2 Character_Shenhe" },
            { title: "Shinobu", rowId: ".sheet2 Character_Shinobu" },
            { title: "Sucrose", rowId: ".sheet2 Character_Sucrose" },
            { title: "Tartaglia", rowId: ".sheet2 Character_Tartaglia" },
            { title: "Thoma", rowId: ".sheet2 Character_Thoma" },
            { title: "Tighnari", rowId: ".sheet2 Character_Tighnari" },
            { title: "Traveler_Anemo", rowId: ".sheet2 Character_Traveler_Anemo" },
            { title: "Traveler_Dendro", rowId: ".sheet2 Character_Traveler_Dendro" },
            { title: "Traveler_Electro", rowId: ".sheet2 Character_Traveler_Electro" },
            { title: "Traveler_Geo", rowId: ".sheet2 Character_Traveler_Geo" },
            { title: "Venti", rowId: ".sheet2 Character_Venti" },
            { title: "Wanderer", rowId: ".sheet2 Character_Wanderer" },
            { title: "Xiangling", rowId: ".sheet2 Character_Xiangling" },
            { title: "XianglingDPS", rowId: ".sheet2 Character_XianglingDPS" },
            { title: "Xiao", rowId: ".sheet2 Character_Xiao" },
            { title: "XiaoDPS", rowId: ".sheet2 Character_XiaoDPS" },
            { title: "Xingqiu", rowId: ".sheet2 Character_Xingqiu" },
            { title: "Xinyan", rowId: ".sheet2 Character_Xinyan" },
            { title: "Yae", rowId: ".sheet2 Character_Yae" },
            { title: "Yanfei", rowId: ".sheet2 Character_Yanfei" },
            { title: "YanfeiDPS", rowId: ".sheet2 Character_YanfeiDPS" },
            { title: "Yelan", rowId: ".sheet2 Character_Yelan" },
            { title: "Yoimiya", rowId: ".sheet2 Character_Yoimiya" },
            { title: "YunJin", rowId: ".sheet2 Character_YunJin" },
            { title: "Yoimiya", rowId: ".sheet2 Character_Yoimiya" },
            { title: "Zhongli", rowId: ".sheet2 Character_Zhongli" },

          ]
        }]
      })
      break
    }

  case "sheet2": {
    try {
      await g.func.sendTyping()
      const text = `Source: https://twitter.com/WorldOfTeyvat`
      const build = `https://4relial.github.io/GenshinBuild/${parameter}.jpg`
      g.func.replyImage(build)
    } catch (e) {
      return g.func.reply("Cooming Soon..");
    }
    break
  }


}