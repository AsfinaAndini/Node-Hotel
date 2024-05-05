const tipe_kamarModel = require(`../models/index`).tipe_kamar

const Op = require(`sequelize`).Op

exports.getAllTipe_kamar = async (request, response) => {
   
    let tipe_kamars = await tipe_kamarModel.findAll()
    return response.json({
        success: true, 
        data: tipe_kamars,
        message: `All Tipe kamars have been loaded`
    })
}


exports.findTipe_kamar = async (request, response) => {
    
    let keyword = request.body.keyword

    
    let tipe_kamars = await tipe_kamarModel.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.substring]: keyword } },
                { nama_tipe_kamar: { [Op.substring]: keyword } },
                { harga: { [Op.substring]: keyword } },
                { deskripsi: { [Op.substring]: keyword } },
                { foto: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true, 
        data: tipe_kamars,
        message: `All Tipe Kamars have been loaded`
    })
} 


exports.addTipe_kamar = (request, response) => {

    let newTipe_kamar = {
        nama_tipe_kamar: request.body.nama_tipe_kamar, 
        harga: request.body.harga,
        deskripsi: request.body.deskripsi, 
        foto: request.body.foto
}       


tipe_kamarModel.create(newTipe_kamar)
    .then(result => {

 return response.json({
    success: true,
    data: result,
    message: `New Tipe Kamar has been inserted`
})
})
.catch(error => {

    return response.json({
        success: false, 
        message: error.message
})
})
}

exports.updateTipe_kamar = (request, response) => {

let dataTipe_kamar = {
        nama_tipe_kamar: request.body.nama_tipe_kamar, 
        harga: request.body.harga,
        deskripsi: request.body.deskripsi, 
        foto: request.body.foto
}

    let idTipe_kamar = request.params.id


    tipe_kamarModel.update(dataTipe_kamar, { where: { id: idTipe_kamar } })
        .then(result => {

    return response.json({
    success: true,
    message: `Data Tipe Kamar has been updated`
})
})
.catch(error => {

return response.json({
    success: false, 
    message: error.message
})
})
}


exports.deleteTipe_kamar = (request, response) => {

let idTipe_kamar = request.params.id

 tipe_kamarModel.destroy({ where: { id: idTipe_kamar } }).thenm 
(result => {
     
    return response.json({
    success: true,
    message: `Data Tipe Kamar has been updated`
    })
    })
    .catch(error => {
    
    return response.json({
    success: false,
    message: error.message
})
})
}