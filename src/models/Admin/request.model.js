import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

const requestWebsiteCollectionName = 'requestWebsite'
const requestAdsCollectionName = 'requestAds'


const getFullRequestWebsite = async () => {
    try {
        const today = new Date()
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2)
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
        const currentYear = today.getFullYear();
        const firstDayOfYear = new Date(currentYear, 0, 2)
        const lastDayOfYear = new Date(currentYear, 11, 32)
        const resultTotalYear = await getDB().collection(requestWebsiteCollectionName).aggregate(
            [
                {
                    $match: {
                        dateRequest: {
                            $gte: firstDayOfYear.toISOString().slice(0, 10),
                            $lte: lastDayOfYear.toISOString().slice(0, 10)
                        }
                    }
                }
            ]
        ).toArray()
        const resultTotalLengthYear = await getDB().collection(requestWebsiteCollectionName).aggregate(
            [
                {
                    $match: {
                        dateRequest: {
                            $gte: firstDayOfYear.toISOString().slice(0, 10),
                            $lte: lastDayOfYear.toISOString().slice(0, 10)
                        }
                    }
                },
                { $group: { _id: null, total_count: { $sum: '$count' } } }
            ]
        ).toArray()
        const resultTotalMonth = await getDB().collection(requestWebsiteCollectionName).aggregate(
            [
                {
                    $match: {
                        dateRequest: {
                            $gte: firstDayOfMonth.toISOString().slice(0, 10),
                            $lte: lastDayOfMonth.toISOString().slice(0, 10)
                        }
                    }
                }
            ]
        ).toArray()
        const resultTotalLengthMonth = await getDB().collection(requestWebsiteCollectionName).aggregate(
            [
                {
                    $match: {
                        dateRequest: {
                            $gte: firstDayOfMonth.toISOString().slice(0, 10),
                            $lte: lastDayOfMonth.toISOString().slice(0, 10)
                        }
                    }
                },
                { $group: { _id: null, total_count: { $sum: '$count' } } }
            ]
        ).toArray()

        return {
            data: {
                resultTotalYear: resultTotalYear,
                resultTotalLengthYear: resultTotalLengthYear,
                resultTotalMonth: resultTotalMonth,
                resultTotalLengthMonth: resultTotalLengthMonth
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullRequestAds = async () => {
    try {
        const today = new Date()
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2)
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
        const currentYear = today.getFullYear();
        const firstDayOfYear = new Date(currentYear, 0, 2)
        const lastDayOfYear = new Date(currentYear, 11, 32)
        const resultTotalYear = await getDB().collection(requestAdsCollectionName).aggregate(
            [
                {
                    $match: {
                        dateRequest: {
                            $gte: firstDayOfYear.toISOString().slice(0, 10),
                            $lte: lastDayOfYear.toISOString().slice(0, 10)
                        }
                    }
                }
            ]
        ).toArray()
        const resultTotalLengthYear = await getDB().collection(requestAdsCollectionName).aggregate(
            [
                {
                    $match: {
                        dateRequest: {
                            $gte: firstDayOfYear.toISOString().slice(0, 10),
                            $lte: lastDayOfYear.toISOString().slice(0, 10)
                        }
                    }
                },
                { $group: { _id: null, total_count: { $sum: '$count' } } }
            ]
        ).toArray()
        const resultTotalMonth = await getDB().collection(requestAdsCollectionName).aggregate(
            [
                {
                    $match: {
                        dateRequest: {
                            $gte: firstDayOfMonth.toISOString().slice(0, 10),
                            $lte: lastDayOfMonth.toISOString().slice(0, 10)
                        }
                    }
                }
            ]
        ).toArray()
        const resultTotalLengthMonth = await getDB().collection(requestAdsCollectionName).aggregate(
            [
                {
                    $match: {
                        dateRequest: {
                            $gte: firstDayOfMonth.toISOString().slice(0, 10),
                            $lte: lastDayOfMonth.toISOString().slice(0, 10)
                        }
                    }
                },
                { $group: { _id: null, total_count: { $sum: '$count' } } }
            ]
        ).toArray()

        return {
            data: {
                resultTotalYear: resultTotalYear,
                resultTotalLengthYear: resultTotalLengthYear,
                resultTotalMonth: resultTotalMonth,
                resultTotalLengthMonth: resultTotalLengthMonth
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const RequestModel = {
    getFullRequestWebsite,
    getFullRequestAds
}