import { getDB } from '*/config/mongodb.js'

// Define Board collection
const collectionName = 'admin'

const getTotalEmployee = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalEmployee
            ] = await Promise.all([
                getDB().collection(collectionName).find().toArray()
            ])
            return {
                total: resultTotalEmployee.length,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalEmployeeWorking = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalEmployeeWorking
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: true,
                            _destroy: false
                        }
                    }
                ]).toArray()
            ])
            return {
                total: resultTotalEmployeeWorking.length,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalAgeEmployee = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalAgeEmployeeWorking,
                resultTotalAgeEmployeeHasRetired
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: true,
                            _destroy: false
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $switch: {
                                    branches: [
                                        { case: { $lte: ['$age', 20] }, then: '20-' },
                                        { case: { $and: [{ $gt: ['$age', 20] }, { $lte: ['$age', 30] }] }, then: '20-30' },
                                        { case: { $and: [{ $gt: ['$age', 30] }, { $lte: ['$age', 40] }] }, then: '30-40' },
                                        { case: { $and: [{ $gt: ['$age', 40] }, { $lte: ['$age', 50] }] }, then: '40-50' },
                                        { case: { $gt: ['$age', 50] }, then: '50+' }
                                    ],
                                    default: 'Unknown'
                                }
                            },
                            working: { $sum: 1 }
                        }
                    },
                    {
                        $sort: {
                            '_id': 1
                        }
                    }
                ]).toArray(),
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: false,
                            _destroy: false
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $switch: {
                                    branches: [
                                        { case: { $lte: ['$age', 20] }, then: '20-' },
                                        { case: { $and: [{ $gt: ['$age', 20] }, { $lte: ['$age', 30] }] }, then: '20-30' },
                                        { case: { $and: [{ $gt: ['$age', 30] }, { $lte: ['$age', 40] }] }, then: '30-40' },
                                        { case: { $and: [{ $gt: ['$age', 40] }, { $lte: ['$age', 50] }] }, then: '40-50' },
                                        { case: { $gt: ['$age', 50] }, then: '50+' }
                                    ],
                                    default: 'Unknown'
                                }
                            },
                            tired: { $sum: 1 }
                        }
                    },
                    {
                        $sort: {
                            '_id': 1
                        }
                    }
                ]).toArray()
            ])
            const uniqueIds = [...new Set([...resultTotalAgeEmployeeWorking.map(doc => doc._id), ...resultTotalAgeEmployeeHasRetired.map(doc => doc._id)])]
            const mergedResult = uniqueIds.map(id => ({
                _id: id,
                working: resultTotalAgeEmployeeWorking.find(doc => doc._id === id)?.working || 0,
                tired: resultTotalAgeEmployeeHasRetired.find(doc => doc._id === id)?.tired || 0
            }))
            return {
                totalAgeEmployee: mergedResult,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
};




export const employeeChartModel = {
    getTotalEmployee,
    getTotalEmployeeWorking,
    getTotalAgeEmployee
}