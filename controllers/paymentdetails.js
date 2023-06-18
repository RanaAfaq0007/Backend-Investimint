import Payments from "../models/Payments.js";

export const addPaymentDetails = async (req, res, next) =>{
    const newaddpaymentdetails = new Payments(req.body);
    try {
         const savedNewPaymentDetails = await newaddpaymentdetails.save();
         res.status(200).json(savedNewPaymentDetails);
        
} catch (error) {
    res.status(500).json(error);
}
}

export const getPaymentDetail = async (req,res) => {   
    try {
        let data = await Payments.find(
            {
                "$or":[
                    {"clientID":{$regex:req.params.key}}
                ]
            }
        );
        res.status(200).json(data);
    } catch (error) {
        res.status(401).send(error);
    }
}