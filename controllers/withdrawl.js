import Withdrawl from "../models/Withdrawl.js";
export const addWithdrawlRequest = async (req, res, next) =>{
    const newaddWithdrawlRequest= new Withdrawl(req.body);
    try {
         const savedNewWithdrawlRequest = await newaddWithdrawlRequest.save();
         res.status(200).json(savedNewWithdrawlRequest);
        
} catch (error) {
next(error)
console.log(error)
}
}

export const getWithdrawlDetails = async (req,res) => {   
    try {
        let data = await Withdrawl.find(
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