import Respondents from "../models/Respondents.js";

const createRespondents = async (req, res) => {
  console.log("req", req.body);
  try {
    const respondents = await Respondents.create(req.body);
    res.status(201).json({ respondents });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export { createRespondents };
