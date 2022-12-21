//
import { fetchJson } from '../../lib/myfunc'
const lol = 'rizzzuchi78apikey';

(async () => {

  let setQuery = 'sicepat|003102539294'
  let query = setQuery.replace('|', '/')

  //

  // let expedition = inputExp.split('|')[0];
  // let resi = inputResi.split('|')[1];
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
      console.log(`Input Ekspedisi: ${expedition}\nInput Resi: ${resi}`)
      console.log(txt).catch((err) => { console.log(err) });
    });

})();