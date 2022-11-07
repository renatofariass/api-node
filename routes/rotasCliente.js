const express = require('express');
const app = express();
const rotasCliente = express.Router();

let Cliente = require('../model/Cliente');

// api para adicionar um cliente
rotasCliente.route('/add').post(function (req, res) {
    let cliente = new Cliente(req.body);
    cliente.save()
        .then(cliente => {
            res.status(200).json({ 'status': 'success', 'mssg': 'cliente added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});

// api para receber clientes
rotasCliente.route('/').get(function (req, res) {
    Cliente.find(function (err, clientes) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'clientes': clientes });
        }
    });
});

// api para receber cliente
rotasCliente.route('/pesquisar/:id').get(function (req, res) {
    let id = req.params.id;
    Cliente.findById(id, function (err, cliente) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'cliente': cliente });
        }
    });
});

// api para atualizar cliente
rotasCliente.route('/atualizar/:id').put(function (req, res) {
    Cliente.findById(req.params.id, function (err, cliente) {
        if (!cliente) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            cliente.name = req.body.name;
            cliente.email = req.body.email;
            cliente.cpf = req.body.cpf;
            cliente.phone_number = req.body.phone_number;

            cliente.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// api para deletar cliente 
rotasCliente.route('/delete/:id').delete(function (req, res) {
    Cliente.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = rotasCliente;