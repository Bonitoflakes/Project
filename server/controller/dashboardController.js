import { Dashboard } from "../models/dashboardModel.js";
import { ObjectId } from "mongodb";

const getDashboardDetails = async (req, res) => {
  try {
    const userDetails = await Dashboard.findOne({
      userID: new ObjectId(req.user.id),
    });
    return res.status(200).json({ userDetails });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export { getDashboardDetails };
