const express = require('express')
const db = require('../db.config/db.config.js')
const jwt = require('jsonwebtoken');
//const Auth = require('../middleware/auth')
const cookieParser = require('cookie-parser');
require("dotenv").config();
const bcrypt = require('bcryptjs');
const { query } = require('express');
const { Services } = require('../services/index.js');
SECRET = process.env.SECRET

const dataDropdown = async (req, res, next) => {
    try {
        const dataDropdown = await Services.dataDropdown()
        res.status(200).json(dataDropdown)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const dataLog = async (req, res, next) => {
    try {
        const dataLog = await Services.dataLog()
        res.status(200).json(dataLog)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const dataPers = async (req, res, next) => {
    try {
        const dataPers = await Services.dataPers()
        res.status(200).json(dataPers)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const tambah = async (req, res, next) => {
    // 9. komparasi antara password yang diinput oleh pengguna dan password yang ada didatabase
    const {nrp, nama, gender, matra, pangkat, korps, jabatan, satker, dpp, kawin, agama, tl, mkg, tmt_kgb, stat_tunjab, tmt_jab, grade, tk_papua, tk_terluar, tk_terpencil, persekot, gantirugi, sewarumah, stat_sandi, eselon_sandi, tmt_sandi, rek } = req.body
    try {
        var result = await Services.tambah(nrp, nama, gender, matra, pangkat, korps, jabatan, satker, dpp, kawin, agama, tl, mkg, tmt_kgb, stat_tunjab, tmt_jab, grade, tk_papua, tk_terluar, tk_terpencil, persekot, gantirugi, sewarumah, stat_sandi, eselon_sandi, tmt_sandi, rek)
        res.send(result)
    } catch (error) {
        res.status(500).send(error);
    }
}

const view = async (req, res, next) => {
    try {
        const body = req.body
        const detail_pers = await Services.view(body.pers_id)
        console.log(detail_pers)
        res.status(200).json(detail_pers)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

/*
const register = async (req, res, next) => {
    // * 7. silahkan ubah password yang telah diterima menjadi dalam bentuk hashing
    const { username, email, password,wartawan } = req.body

    // 8. Silahkan coding agar pengguna bisa menyimpan semua data yang diinputkan ke dalam database
    try {
        const result = await Services.register(username, email, password,wartawan)
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.send("Berhasil Register")
    } catch (error) {
        console.log(error.detail)
        res.send(error.detail);
    }
}

const login = async (req, res, next) => {
    // 9. komparasi antara password yang diinput oleh pengguna dan password yang ada didatabase
    const { email, password } = req.body
    try {
        var result = await Services.login(email, password)
        res.send(result)
    } catch (error) {
        res.send("Email Tidak Valid");
    }
}

const verify = async (req, res, next) => {
    try {
        // 13. membuat verify
        const decode = req.user
        console.log(decode)
        const user = await Services.verify(decode.id,)
        console.log(user)
        res.status(200).json(user)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const updateprofile = async (req, res, next) => {
    try {
        console.log("sampe controller")
        const body = req.body
        const result = await Services.updateprofile(body.id, body.namaLengkap, body.noTelepon, body.bio, body.fotoUrl)
        if (result == 'sudah update') {
            res.status(200).send('sudah update')
        } else {
            throw new Error(result)
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const updateakun = async (req, res, next) => {
    try {
        const body = req.body
        const result = await Services.updateakun(body.user, body.email, body.id)
        if (result == 'sudah update') {
            res.status(200).send('sudah update')
        } else {
            throw new Error(result)
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const submitberita = async (req, res, next) => {
    try {
        console.log("masuk controller")
        const body = req.body
        const result = await Services.submitberita(body.profile_id,body.judul,body.nama,body.deskripsi,body.harga,body.date,body.lelang,body.kategori,body.note,body.fotoUrl,body.file)
        console.log("selesai controller")
        res.status(200).send(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const beritas = async (req, res, next) => {
    try {
        const body = req.body
        const daftar_berita = await Services.beritas(body.profile_id)
        res.status(200).json(daftar_berita)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const main = async (req, res, next) => {
    try {
        const daftar_berita = await Services.main()
        res.status(200).json(daftar_berita)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const view = async (req, res, next) => {
    try {
        const body = req.body
        const daftar_berita = await Services.view(body.berita_id)
        console.log(daftar_berita)
        res.status(200).json(daftar_berita)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const penawarans = async (req, res, next) => {
    try {
        const body = req.body
        const daftar_penawaran = await Services.penawarans(body.berita_id)
        res.status(200).json(daftar_penawaran)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const mypenawaran = async (req, res, next) => {
    try {
        const body = req.body
        const daftar_penawaran = await Services.mypenawaran(body.profile_id)
        res.status(200).json(daftar_penawaran)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const myproses = async (req, res, next) => {
    try {
        const body = req.body
        const daftar_proses = await Services.myproses(body.profile_id)
        res.status(200).json(daftar_proses)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const verifwar = async (req, res, next) => {
    try {
        const body = req.body
        const level = await Services.verifwar(body.profile_id)
        res.status(200).json(level)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const submitpenawaran = async (req, res, next) => {
    try {
        const body = req.body
        const result = await Services.submitpenawaran(body.berita_id,body.profile_id,body.user,body.note,body.harga)
        res.status(200).send(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const submitbayar = async (req, res, next) => {
    try {
        const body = req.body
        const result = await Services.submitbayar(body.berita_id,body.harga_total,body.list_pen)
        res.status(200).send(result)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}

const view_transaksi = async (req, res, next) => {
    try {
        const body = req.body
        const daftar_transaksi = await Services.view_transaksi(body.profile_id)
        res.status(200).json(daftar_transaksi)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err)
    }
}
*/
module.exports = {
    dataDropdown,
    tambah,
    dataLog,
    dataPers,
    view
    /*register,
    login,
    verify,
    updateprofile,
    updateakun,
    submitberita,
    beritas,
    main,
    view,
    penawarans,
    verifwar,
    submitpenawaran,
    submitbayar,
    view_transaksi,
    mypenawaran,
    myproses*/
}