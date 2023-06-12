import { AdminModel } from '*/models/Admin/admin.model'
import { cloneDeep } from 'lodash'

const createNewEmployee = async (data, role) => {
    try {
        const newEmployee = await AdminModel.createNewEmployee(data, role)
        if (newEmployee.message === 'Email already exists') {
            return newEmployee
        }
        else {
            const getNewEmployee = await AdminModel.findOneById(newEmployee.insertedId.toString())
            return getNewEmployee
        }
    } catch (error) {
        throw new Error(error)
    }
}

const loginEmployee = async (email) => {
    try {
        const employee = await AdminModel.loginEmployee(email)
        if (!employee) {
            throw new Error('not Found')
        }
        const transformEmployee = cloneDeep(employee)
        return transformEmployee
    } catch (error) {
        throw new Error(error)
    }
}

const getInformationEmployee = async (employeeId) => {
    try {
        const employee = await AdminModel.getInformationEmployee(employeeId)
        if (!employee) {
            throw new Error('not Found')
        }
        const transformEmployee = cloneDeep(employee)
        return transformEmployee
    } catch (error) {
        throw new Error(error)
    }
}

const updateEmployee = async (id, data, role) => {
    try {
        const updatedUser = await AdminModel.updateEmployee(id, data, role)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

const updateStatusEmployee = async (email, data) => {
    try {
        const updatedUser = await AdminModel.updateStatusEmployee(email, data)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

const getAllEmployee = async (data, role) => {
    try {
        const listOfEmployee = await AdminModel.getAllEmployee(data, role)
        const transformEmployee = cloneDeep(listOfEmployee)
        return transformEmployee
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchEmployee = async (data) => {
    try {
        const employee = await AdminModel.getSearchEmployee(data)
        const transformEmployee = cloneDeep(employee)
        return transformEmployee
    } catch (error) {
        throw new Error(error)
    }
}

export const adminService = { 
    getAllEmployee,
    createNewEmployee, 
    getInformationEmployee, 
    loginEmployee, 
    updateEmployee,
    updateStatusEmployee,
    getSearchEmployee
}