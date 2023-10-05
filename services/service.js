const db = require('../db.config/db.config.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const tambah = async (nrp, nama, gender, matra, pangkat, korps, jabatan, satker, dpp, kawin, agama, tl, mkg, tmt_kgb, stat_tunjab, tmt_jab, grade, tk_papua, tk_terluar, tk_terpencil, persekot, gantirugi, sewarumah, stat_sandi, eselon_sandi, tmt_sandi, rek) => {
    try {
        console.log(nrp, nama, gender, matra, pangkat, korps, jabatan, satker, dpp, kawin, agama, tl, mkg, tmt_kgb, stat_tunjab, tmt_jab, grade, tk_papua, tk_terluar, tk_terpencil, persekot, gantirugi, sewarumah, stat_sandi, eselon_sandi, tmt_sandi, rek)
        const query = `INSERT INTO data_personel
        (pers_nrp, pers_nama, pers_gender, pers_matra, pers_pangkat, pers_korps, pers_jabatan, pers_satker, pers_dpp, pers_kawin, pers_agama, pers_tl, pers_mkg, pers_tmt_kgb, pers_stat_tunjab, pers_tmt_jab, pers_grade, pers_tk_papua, pers_tk_terluar, pers_tk_terpencil, pers_persekot, pers_gantirugi, pers_sewarumah, pers_stat_sandi, pers_eselon_sandi, pers_tmt_sandi, pers_rek)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)`
        const result = await db.query(query, [nrp, nama, gender, matra, pangkat, korps, jabatan, satker, dpp, kawin, agama, tl, mkg, tmt_kgb, stat_tunjab, tmt_jab, grade, tk_papua, tk_terluar, tk_terpencil, persekot, gantirugi, sewarumah, stat_sandi, eselon_sandi, tmt_sandi, rek])
        if (!result) {
            throw new Error('Error inserting Data');
        }
        return {
            message: 'Data inserted successfully',
        };
    } catch (error) {
        console.log(error)
        response.send("error")
        return error;
    }
}

const update = async (id, pangkat, jabatan, satker, dpp, kawin, mkg, tmt_kgb, stat_tunjab, tmt_jab, grade, tk_papua, tk_terluar, tk_terpencil, persekot, gantirugi, sewarumah, stat_sandi, eselon_sandi, tmt_sandi, rek) => {
    try {
        console.log(id, pangkat, jabatan, satker, dpp, kawin, mkg, tmt_kgb, stat_tunjab, tmt_jab, grade, tk_papua, tk_terluar, tk_terpencil, persekot, gantirugi, sewarumah, stat_sandi, eselon_sandi, tmt_sandi, rek)
        const query = `UPDATE data_personel
                        SET
                        pers_pangkat = $2, pers_jabatan = $3, pers_satker = $4, pers_dpp = $5, pers_kawin = $6, pers_mkg = $7, pers_tmt_kgb = $8, pers_stat_tunjab = $9, pers_tmt_jab = $10, pers_grade = $11, pers_tk_papua = $12, pers_tk_terluar = $13, pers_tk_terpencil = $14, pers_persekot = $15, pers_gantirugi = $16, pers_sewarumah = $17, pers_stat_sandi = $18, pers_eselon_sandi = $19, pers_tmt_sandi = $20, pers_rek = $21
                        WHERE
                        pers_id = $1`
        const result = await db.query(query, [id, pangkat, jabatan, satker, dpp, kawin, mkg, tmt_kgb, stat_tunjab, tmt_jab, grade, tk_papua, tk_terluar, tk_terpencil, persekot, gantirugi, sewarumah, stat_sandi, eselon_sandi, tmt_sandi, rek])
        if (!result) {
            throw new Error('Error updating Data');
        }
        return {
            message: 'Data updated successfully',
        };
    } catch (error) {
        console.log(error)
        response.send("error")
        return error;
    }
}

const dataLog = async () => {
    try {
        //matra
        const query = `SELECT 
                        a.log_stamp, a.log_tipe, e.tipe_label, a.pers_nama, a.pers_pangkat, b.pangkat_label, a.pers_satker, c.satker_label, a.pers_jabatan, d.jab_label, f.korps_kode 
                        FROM log_data as a
                        inner join pangkat as b
                        on a.pers_pangkat = b.pangkat_id 
                        inner join satker as c
                        on a.pers_satker  = c.satker_id 
                        left join jabatan as d
                        on a.pers_jabatan  = d.jab_id
                        inner join tipe as e
                        on a.log_tipe = e.tipe_id
                        inner join korps as f
                        on a.pers_korps = f.korps_id
                        order by log_stamp desc
                        limit 5;`;
        const hasil = (await db.query(query)).rows

        return (hasil)
    } catch {
        return Error
    }
}

const dataLogAll = async () => {
    try {
        //matra
        const query = `SELECT 
                        a.log_stamp, a.log_tipe, e.tipe_label, a.pers_nama, a.pers_pangkat, b.pangkat_label, a.pers_satker, c.satker_label, a.pers_jabatan, d.jab_label, f.korps_kode 
                        FROM log_data as a
                        inner join pangkat as b
                        on a.pers_pangkat = b.pangkat_id 
                        inner join satker as c
                        on a.pers_satker  = c.satker_id 
                        left join jabatan as d
                        on a.pers_jabatan  = d.jab_id
                        inner join tipe as e
                        on a.log_tipe = e.tipe_id
                        inner join korps as f
                        on a.pers_korps = f.korps_id
                        order by log_stamp desc;`;
        const hasil = (await db.query(query)).rows

        return (hasil)
    } catch {
        return Error
    }
}

const dataPers = async () => {
    try {
        //matra
        const query = `select dp.pers_id, dp.pers_nrp, dp.pers_nama, dp.pers_pangkat, p.pangkat_label, dp.pers_satker, s.satker_label, dp.pers_jabatan, j.jab_label, f.korps_kode  
                        from data_personel as dp
                        inner join pangkat as p
                        on dp.pers_pangkat = p.pangkat_id 
                        inner join satker as s
                        on dp.pers_satker = s.satker_id 
                        left join jabatan as j
                        on dp.pers_jabatan = j.jab_id
                        inner join korps as f
                        on dp.pers_korps = f.korps_id`;
        const hasil = (await db.query(query)).rows

        return (hasil)
    } catch {
        return Error
    }
}

const dataDropdown = async () => {
    try {
        //matra
        const query1 = 'SELECT * FROM matra';

        //korps
        const query2 = 'SELECT * FROM korps';

        //pangkat
        const query3 = 'SELECT * FROM pangkat';

        //jabatan
        const query4 = 'SELECT * FROM jabatan';

        //satker
        const query5 = 'SELECT * FROM satker';

        const matra = (await db.query(query1)).rows
        const korps = (await db.query(query2)).rows
        const pangkat = (await db.query(query3)).rows
        const jabatan = (await db.query(query4)).rows
        const satker = (await db.query(query5)).rows

        const hasil = {
            matra: matra,
            korps: korps,
            pangkat: pangkat,
            jabatan: jabatan,
            satker: satker
        }

        return (hasil)
    } catch {
        return Error
    }
}

const view = async (pers_id) => {
    try {
        const query = `select *
                        from data_personel as dp
                        inner join pangkat as p
                        on dp.pers_pangkat = p.pangkat_id 
                        inner join satker as s
                        on dp.pers_satker = s.satker_id 
                        left join jabatan as j
                        on dp.pers_jabatan = j.jab_id
                        inner join korps as f
                        on dp.pers_korps = f.korps_id
                        inner join agama as g
                        on dp.pers_agama = g.ag_id
                        inner join matra as m
                        on dp.pers_matra = m.matra_id
                        where dp.pers_id = $1`;
        const detail_pers = (await db.query(query, [pers_id])).rows;
        return (detail_pers)
    } catch {
        return Error
    }
}

const lapSatker = async (satker_id) => {
    try {
        const query = `select s.satker_label, dp.pers_dpp, dp.pers_id, dp.pers_nama, p.pangkat_label, k.korps_kode, dp.pers_nrp,dp.pers_tl, sk.kawin_label, je.jabes_label, dp.pers_tmt_kgb, km.kmkg_label,dp.pers_mkg, j.jab_label, dp.pers_grade, dp.pers_tmt_jab, t.tunjab_jumlah, sk.kawin_ptkp ,kp.kpkt_jumlah, ag.ag_label, m.matra_label, grade_index
        from data_personel as dp
        inner join pangkat as p
        on dp.pers_pangkat = p.pangkat_id 
        inner join satker as s
        on dp.pers_satker = s.satker_id 
        left join jabatan as j
        on dp.pers_jabatan = j.jab_id
        inner join status_kawin as sk 
        on dp.pers_kawin = sk.kawin_id
        inner join jabatan_eselon as je
        on j.jab_kode = je.jabes_kode
        inner join kode_mkg as km
        on p.pangkat_kmkg = km.kmkg_id
        left join tunjab as t
        on j.jab_kode = t.tunjab_kode
        inner join kode_pangkat as kp
        on p.pangkat_kpkt = kp.kpkt_kode and dp.pers_mkg = kp.kpkt_mkg
        inner join agama as ag
        on dp.pers_agama = ag.ag_id 
        inner join matra as m
        on dp.pers_matra = m.matra_id
        inner join grade_kinerja as gk
        on dp.pers_grade = gk.grade_id
        left join korps as k
        on dp.pers_korps = k.korps_id
        where s.satker_id = $1
        order by dp.pers_dpp, j.jab_kode;`;
        const lapSatker = (await db.query(query, [satker_id])).rows;
        return (lapSatker)
    } catch {
        return Error
    }
}

const hapus = async (pers_id) => {
    try {
      console.log(pers_id);
      const query = `DELETE from data_personel WHERE pers_id = $1`;
  
      const result = await db.query(query, [pers_id]);
      if (!result) {
        throw new Error("Error deleting Data");
      }
      return {
        message: "Data deleted successfully",
      };
    } catch (error) {
      console.log(error);
      response.send("error");
      return error;
    }
  };

/*
const register = async (username, email, password, wartawan) => {
    try {
        const hash = await bcrypt.hash(password, 10)
        console.log("sebelum query")
        console.log(username, email, hash)
        const query = `INSERT INTO user_cred VALUES(DEFAULT, $1, $2, $3)`
        const result = await db.query(query, [username, email, hash])
        const query2 = `SELECT * FROM user_cred WHERE user_email=$1`;
        const result2 = await db.query(query2, [email]);
        console.log(result2.rows[0]['user_id'])
        const placeholderPhoto = `data:image/jpeg;base64,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`
        const query3 = `INSERT INTO profile(profile_id, user_id, nama_lengkap, no_hp, foto, level_akun_id, bio) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6)`
        const result3 = await db.query(query3, [result2.rows[0]['user_id'], '', '', placeholderPhoto, wartawan, '']);
        console.log(result3)
        console.log("selesai query")
        if (!result) {
            throw new Error('Error inserting Data');
        }
        return {
            message: 'Data inserted successfully',
        };
    } catch (error) {
        console.log("error")
        response.send("error")
        return error;
    }
}

const login = async (email, password) => {
    try {
        const query = `SELECT * FROM user_cred WHERE user_email=$1`
        const user = await db.query(query, [email])
        var id = user.rows[0]['user_id']
        var username = user.rows[0]['username']
        var hash = user.rows[0]['user_pass']
        var hasil = await bcrypt.compare(password, hash)
        if (hasil == true) {
            // 10. Generate token menggunakan jwt sign
            let data = {
                id: id,
                username: username,
                email: email,
                password: hash
            }
            const token = jwt.sign(data, SECRET);
            const result = {
                id: id,
                username: username,
                email: email,
                token: token
            }
            return (result)
        } else {
            return ('Password Salah');
        }
    } catch (error) {
        return ('Password Salah');
    }
}

const verify = async (id) => {
    try {
        console.log(id)
        const query = `SELECT a.profile_id, a.nama_lengkap, a.no_hp, a.foto, a.bio, b.level_akun_label FROM profile AS a INNER JOIN level_akun AS b ON a.level_akun_id=b.level_akun_id WHERE a.user_id=$1`
        const user = (await db.query(query, [id])).rows
        if (user == '') {
            return ('Invalid User')
        } else {
            return ({ profile: user[0] })
        }
    } catch {

    }
}

const updateprofile = async (id, namaLengkap, noTelepon, bio, fotoUrl) => {
    try {
        console.log("sampe service")
        const query = `UPDATE profile SET nama_lengkap=$1, no_hp=$2, bio=$3, foto=$4 WHERE user_id=$5`
        const user = await db.query(query, [namaLengkap, noTelepon, bio, fotoUrl, id])
        return ('sudah update')
    } catch {
        console.log(err.message);
        return err
    }
}

const updateakun = async (username, email, id) => {
    try {
        const query = `UPDATE user_cred SET username=$1, user_email=$2 WHERE user_id=$3`
        const user = await db.query(query, [username, email, id])
        return ('sudah update')
    } catch {
        console.log(err.message);
        return err
    }
}

const submitberita = async (profile_id, judul, nama, deskripsi, harga, date, lelang, kategori, note, fotoUrl, file) => {
    try {
        const query = `INSERT INTO berita VALUES(DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`
        await db.query(query, [profile_id, judul, deskripsi, fotoUrl, nama, file, note, harga, date, kategori, lelang])
        return ('berhasil request')
    } catch (error) {
        return error
    }
}

const beritas = async (profile_id) => {
    try {
        console.log(profile_id)
        const query = `SELECT * FROM berita WHERE profile_id=$1`
        const daftar_berita = (await db.query(query, [profile_id])).rows
        return (daftar_berita)
    } catch {
        return Error
    }
}

const main = async () => {
    try {
        const query = `SELECT * FROM berita ORDER BY berita_id DESC`
        const daftar_berita = (await db.query(query)).rows
        return (daftar_berita)
    } catch {
        return Error
    }
}

const view = async (berita_id) => {
    try {
        console.log("sampe service view")
        console.log(berita_id)
        const query = `SELECT * FROM berita INNER JOIN kategori ON berita.kategori_id=kategori.kategori_id INNER JOIN level_berita ON berita.level_id=level_berita.level_id WHERE berita_id=$1`
        const daftar_berita = (await db.query(query, [berita_id])).rows
        return (daftar_berita)
    } catch {
        return Error
    }
}

const penawarans = async (berita_id) => {
    try {
        const query = `SELECT * FROM penawaran WHERE berita_id=$1`
        const daftar_penawaran = (await db.query(query, [berita_id])).rows
        return (daftar_penawaran)
    } catch {
        return Error
    }
}

const mypenawaran = async (profile_id) => {
    try {
        const query = `SELECT a.penawaran_id,c.judul,c.nama,a.harga,b.level_label FROM penawaran AS a INNER JOIN level_penawaran AS b ON a.level_id=b.level_id INNER JOIN berita AS c ON a.berita_id=c.berita_id WHERE a.profile_id=$1`
        const daftar_penawaran = (await db.query(query, [profile_id])).rows
        return (daftar_penawaran)
    } catch {
        return Error
    }
}

const myproses = async (profile_id) => {
    try {
        const query = `SELECT a.proses_id, a.penawaran_id, d.judul, a.link, a.transaksi_id, b.status_proses_label, c.profile_id FROM proses AS a INNER JOIN status_proses AS b ON a.status_proses_id=b.status_proses_id INNER JOIN penawaran AS c ON a.penawaran_id=c.penawaran_id INNER JOIN berita as d ON c.berita_id=d.berita_id WHERE c.profile_id=$1`
        const daftar_proses = (await db.query(query, [profile_id])).rows
        console.log(daftar_proses)
        return (daftar_proses)
    } catch {
        return Error
    }
}

const verifwar = async (profile_id) => {
    try {
        const query = `SELECT level_akun_id FROM profile WHERE profile_id=$1`
        const level = (await db.query(query, [profile_id])).rows
        return (level)
    } catch {
        return Error
    }
}

const submitpenawaran = async (berita_id, profile_id, user, note, harga) => {
    try {
        const query = `INSERT INTO penawaran VALUES(DEFAULT,$1,$2,$3,$4,$5,1)`
        await db.query(query, [berita_id, profile_id, user, note, harga])
        return ('berhasil penawaran')
    } catch (error) {
        return error
    }
}

const submitbayar = async (berita_id, harga, penawaran_id) => {
    try {
        const query = `INSERT INTO transaksi VALUES(DEFAULT,$1,$2,1)`
        await db.query(query, [berita_id, harga])
        const query3 = `UPDATE berita SET level_berita_id=$1 WHERE berita_id=$2`
        await db.query(query3, [3, berita_id])
        const query4 = `SELECT transaksi_id FROM transaksi WHERE berita_id=$1`
        const transaksi_id = (await db.query(query4, [berita_id])).rows
        console.log(transaksi_id[0].transaksi_id)
        for (const key in penawaran_id) {
            console.log("masuk looping")
            console.log(penawaran_id[key])
            const query2 = `INSERT INTO proses VALUES(DEFAULT,$1,1,$2,$3)`
            await db.query(query2, [penawaran_id[key], '',transaksi_id[0].transaksi_id])
            const query5 = `UPDATE penawaran SET level_penawaran_id=$1 WHERE penawaran_id=$2`
            await db.query(query5, [2, penawaran_id[key]])
        }
        return (transaksi_id)
    } catch (error) {
        return error
    }
}

const view_transaksi = async (profile_id) => {
    try {
        const query = `SELECT * FROM transaksi AS a
                        INNER JOIN berita AS b ON a.berita_id=b.berita_id
                        INNER JOIN status_transaksi AS c ON a.status_transaksi_id=c.status_transaksi_id
                        WHERE b.profile_id=$1`
        const daftar_transaksi = (await db.query(query, [profile_id])).rows
        console.log(daftar_transaksi)
        return (daftar_transaksi)
    } catch {
        return Error
    }
}
*/

module.exports = {
    dataDropdown,
    tambah,
    dataLog,
    dataPers,
    view,
    update,
    dataLogAll,
    hapus,
    lapSatker
}