import { Dashboard } from "../models/dashboardModel.js";
import { ObjectId } from 'mongodb';

const getDashboardDetails = async (req, res) => {
    try {
        let rishab = '62361f2abc0b3a56e3c738b6'
        const userDetails = await Dashboard.findOne({userID: new ObjectId(rishab)});
        console.log(userDetails);
        res.status(200).json({userDetails})
    } catch (error) {
        console.log(error);
        res.status(400).json({})
    }
}


export { getDashboardDetails }


