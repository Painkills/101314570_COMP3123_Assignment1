const express = require('express')
const employeeModel = require('../models/employeeModel');
const routes = express.Router()

// Create Employee
routes.post('/employees', async (req, res) => {
    try {
        const newEmployee = new employeeModel(req.body)
        await newEmployee.save()
        res.status(201).send({
            data: newEmployee
        })
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

// Show all employees
routes.get('/employees', async(req, res) => {
    try {
        const allEmployees = await employeeModel.find()
        res.status(200).send({
            list: allEmployees
        })
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

//  Retrieve a single employee with employeeID
routes.get('/employees/:employeeId', async(req, res) => {
    try {
        const locatedEmployee = await employeeModel.findById(req.params.employeeId)
        res.status(200).send({
            retrieved_employee: locatedEmployee
        })
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

// Update an Employee with EmployeeId
routes.put('/employees/:employeeId', async(req, res) => {
    try {
        const updatedEmployee = await employeeModel.findByIdAndUpdate(req.params.employeeId, req.body, { runValidators: true})
        res.status(200).send({
            updated_employee: updatedEmployee
        })
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

// Delete a Employee with EmployeeId
routes.delete('/employees/:employeeId', async(req, res) => {
    try {
        const deletedEmployee = await employeeModel.findByIdAndDelete(req.params.employeeId)
        res.status(204).send({
            "status": true, deleted_employee: deletedEmployee
        })
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

module.exports = routes