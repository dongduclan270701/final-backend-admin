import { adminService } from '*/services/Admin/admin.service'
import { HttpStatusCode } from '*/utils/constants'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const createNewEmployee = async (req, res) => {
    try {
        const data = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password, salt)
        const newData = { ...data, password: hashedPassword }
        const result = await adminService.createNewEmployee(newData, req.result)
        if (result.message === 'Email already exists') {
            res.status(HttpStatusCode.OK).json('Email already exists')
        }
        else {
            const token = jwt.sign({ _id: result._id, role: result.role }, process.env.TOKEN_SECRET_ADMIN)
            res.status(HttpStatusCode.CREATED).json(token)
        }
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.params
        const result = await adminService.loginEmployee(email)
        if (result.message === 'Not found employee') {
            res.status(HttpStatusCode.OK).json('Email does not exist')
        } else {
            const validPassword = await bcrypt.compare(password, result.password)
            if (!validPassword) {
                res.status(HttpStatusCode.OK).json('Incorrect password')
            } else {
                const token = jwt.sign(
                    {
                        _id: result._id,
                        role: result.role,
                        username: result.username,
                        email: result.email
                    },
                    process.env.TOKEN_SECRET_ADMIN
                )
                res.status(HttpStatusCode.OK).json({ token: token })
            }
        }
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getInformationEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const result = await adminService.getInformationEmployee(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const result = await adminService.updateEmployee(id, req.body, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const updateStatusEmployee = async (req, res) => {
    try {
        const { email } = req.params
        const result = await adminService.updateStatusEmployee(email, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getAllEmployee = async (req, res) => {
    try {
        const data = req.query
        const result = await adminService.getAllEmployee(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchEmployee = async (req, res) => {
    try {
        const data = req.query
        const result = await adminService.getSearchEmployee(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const adminController = {
    getAllEmployee,
    createNewEmployee,
    getInformationEmployee,
    loginEmployee,
    updateEmployee,
    updateStatusEmployee,
    getSearchEmployee
}