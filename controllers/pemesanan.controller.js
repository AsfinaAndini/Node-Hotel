const pemesananModel = require(`../models/index`).pemesanan

const Op = require(`sequelize`).Op

exports.getAllPemesanan = async (request, response) => {
   
    let pemesanans = await pemesananModel.findAll()
    return response.json({
        success: true, 
        data: pemesanans,
        message: `All pemesanans have been loaded`
    })
}


exports.findPemesanan = async (request, response) => {
    
    let keyword = request.body.keyword

    
    let pemesanans = await PemesananModel.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.substring]: keyword } },
                { nomor_pemesanan: { [Op.substring]: keyword } },
                { nama_pemesan: { [Op.substring]: keyword } },
                { email_pemesan: { [Op.substring]: keyword } },
                { tgl_pemesanan: { [Op.substring]: keyword } },
                { tgl_check_in: { [Op.substring]: keyword } },
                { tgl_check_out: { [Op.substring]: keyword } },
                { nama_tamu: { [Op.substring]: keyword } },
                { jumlah_kamar: { [Op.substring]: keyword } },
                { id_tipe_kamar: { [Op.substring]: keyword } },
                { status_pemesanan: { [Op.substring]: keyword } },
                { id_user: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true, 
        data: pemesanans,
        message: `All pemesanans have been loaded`
    })
} 


exports.addPemesanan = (request, response) => {

    let newPemesanan = {
        nomor_pemesanan: request.body.nomor_pemesanan, 
        nama_pemesan: request.body.nama_pemesan,
        email_pemesan: request.body.email_pemesan, 
        tgl_pemesanan: request.body.tgl_pemesanan, 
        tgl_check_in: request.body.tgl_check_in, 
        tgl_check_out: request.body.tgl_check_out, 
        nama_tamu: request.body.nama_tamu, 
        jumlah_kamar: request.body.jumlah_kamar,
        id_tipe_kamar: request.body.id_tipe_kamar,  
        status_pemesanan: request.body.status_pemesanan, 
        id_user: request.body.id_user 
}       


pemesananModel.create(newPemesanan)
    .then(result => {

 return response.json({
    success: true,
    data: result,
    message: `New Pemesanan has been inserted`
})
})
.catch(error => {

    return response.json({
        success: false, 
        message: error.message
})
})
}

exports.updatePemesanan = (request, response) => {

let dataPemesanan = {
    nomor_pemesanan: request.body.nomor_pemesanan, 
    nama_pemesan: request.body.nama_pemesan,
    email_pemesan: request.body.email_pemesan, 
    tgl_pemesanan: request.body.tgl_pemesanan, 
    tgl_check_in: request.body.tgl_check_in, 
    tgl_check_out: request.body.tgl_check_out, 
    nama_tamu: request.body.nama_tamu, 
    jumlah_kamar: request.body.jumlah_kamar,
    id_tipe_kamar: request.body.id_tipe_kamar,  
    status_pemesanan: request.body.status_pemesanan, 
    id_user: request.body.id_user 
}

    let idPemesanan = request.params.id


    pemesananModel.update(dataPemesanan, { where: { id: idPemesanan } })
        .then(result => {

    return response.json({
    success: true,
    message: `Data Pemesanan has been updated`
})
})
.catch(error => {

return response.json({
    success: false, 
    message: error.message
})
})
}


exports.deletePemesanan = (request, response) => {

let idPemesanan = request.params.id

 pemesananModel.destroy({ where: { id: idPemesanan } }).thenm 
(result => {
     
    return response.json({
    success: true,
    message: `Data Pemesanan has been updated`
    })
    })
    .catch(error => {
    
    return response.json({
    success: false,
    message: error.message
})
})
}