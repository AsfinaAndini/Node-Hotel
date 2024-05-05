const kamarModel = require(`../models/index`).kamar

const Op = require(`sequelize`).Op

exports.getAllKamar = async (request, response) => {
   
    let kamars = await kamarModel.findAll()
    return response.json({
        success: true, 
        data: kamars,
        message: `All Kamars have been loaded`
    })
}


exports.findKamar = async (request, response) => {
    
    let keyword = request.body.keyword

    
    let kamars = await kamarModel.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.substring]: keyword } },
                { nomor_kamar: { [Op.substring]: keyword } },
                { id_tipe_kamar: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true, 
        data: kamars,
        message: `All Kamars have been loaded`
    })
} 


exports.addKamar = (request, response) => {

    let newKamar = {
        nomor_kamar: request.body.nomor_kamar, 
        id_tipe_kamar: request.body.id_tipe_kamar
}       


kamarModel.create(newKamar)
    .then(result => {

 return response.json({
    success: true,
    data: result,
    message: `New Kamar has been inserted`
})
})
.catch(error => {

    return response.json({
        success: false, 
        message: error.message
})
})
}

exports.updateKamar = (request, response) => {

let dataKamar = {
    nomor_kamar: request.body.nomor_kamar, 
    id_tipe_kamar: request.body.id_tipe_kamar
}

    let idKamar = request.params.id


    kamarModel.update(dataKamar, { where: { id: idKamar } })
        .then(result => {

    return response.json({
    success: true,
    message: `Data Kamar has been updated`
})
})
.catch(error => {

return response.json({
    success: false, 
    message: error.message
})
})
}


exports.deleteKamar = (request, response) => {

let idKamar = request.params.id

 kamarModel.destroy({ where: { id: idKamar } }).thenm 
(result => {
     
    return response.json({
    success: true,
    message: `Data Kamar has been updated`
    })
    })
    .catch(error => {
    
    return response.json({
    success: false,
    message: error.message
})
})
}