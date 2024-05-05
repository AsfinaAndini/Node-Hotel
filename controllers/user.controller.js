const userModel = require(`../models/index`).user

const Op = require(`sequelize`).Op
const path = require('path');
const fs = require('fs');
const md5 = require("md5");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "secretcode";

const { request } = require('http');
const { error } = require('console');


exports.login = async (req, res) => {
    try {
        const params = {
            email: req.body.email,
            password: md5(req.body.password),
        };

        const findUser = await userModel.findOne({ where: params });
        if (findUser == null) {
            return res.status(400).json({
                message: "email or password doesn't match",
            })
        }
        let tokenPayload = {
            id_user: findUser.id_user,
            nama_user: findUser.nama_user,
            email: findUser.email,
            role: findUser.role,

        };
        tokenPayload = JSON.stringify(tokenPayload);
        let token = await jsonwebtoken.sign(tokenPayload, SECRET_KEY);

        return res.status(200).json({
            message: "Success login",
            data: {
                token: token,
                id_user: findUser.id_user,
                nama_user: findUser.nama_user,
                email: findUser.email,
                role: findUser.role,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error,
        });
    }
};

exports.LoginRegister = async (req, res) => {
    const email = req.body.email;
    let user = await userModel.findAll({
        where: { role: "customer", email: email },
    });
    if (user.length === 0) {
        let newUser = {
            nama_user: req.body.nama_user,
            foto: req.body.linkFoto,
            email: email,
            role: "customer",
        };
        if (newUser.nama_user === "" || newUser.email === "") {
            return res.status(400).json({
                success: false,
                message: "Harus Diisi Semua",
            });
        } else {
            userModel
                .create(newUser)
                .then((result) => {
                    return res.json({
                        success: true,
                        data: result,
                        message: 'New user has been Inserted',
                    });
                })
                .catch((error) => {
                    return res.status(400).json({
                        success: false,
                        message: error.message,
                    });
                });
        }
    } else {
        return res.json({
            success: true,
            data: user,
            message: ' User sudah ada dan Berhasil login',
        });
    }

};

exports.getAllUser = async (request, response) => {

    let users = await userModel.findAll()
    return response.json({
        success: true,
        data: users,
        message: `All Users have been loaded`
    })
}


exports.findUser = async (request, response) => {

    let keyword = request.body.keyword


    let users = await UserModel.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.substring]: keyword } },
                { nama_user: { [Op.substring]: keyword } },
                { foto: { [Op.substring]: keyword } },
                { email: { [Op.substring]: keyword } },
                { password: { [Op.substring]: keyword } },
                { role: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: users,
        message: `All Users have been loaded`
    })
}


exports.addUser = (request, response) => {

    let newUser = {
        nama_user: request.body.nama_user,
        foto: request.body.foto,
        email: request.body.email,
        password: request.body.password,
        role: request.body.role
    }


    userModel.create(newUser)
        .then(result => {

            return response.json({
                success: true,
                data: result,
                message: `New User has been inserted`
            })
        })
        .catch(error => {

            return response.json({
                success: false,
                message: error.message
            })
        })
}

exports.updateUser = (request, response) => {

    let dataUser = {
        nama_user: request.body.nama_user,
        foto: request.body.foto,
        email: request.body.email,
        password: request.body.password,
        role: request.body.role
    }

    let idUser = request.params.id


    userModel.update(dataUser, { where: { id: idUser } })
        .then(result => {

            return response.json({
                success: true,
                message: `Data User has been updated`
            })
        })
        .catch(error => {

            return response.json({
                success: false,
                message: error.message
            })
        })
}


exports.deleteUser = (request, response) => {

    let idUser = request.params.id

    userModel.destroy({ where: { id: idUser } }).thenm
        (result => {

            return response.json({
                success: true,
                message: `Data User has been updated`
            })
        })
        .catch(error => {

            return response.json({
                success: false,
                message: error.message
            })
        })
}