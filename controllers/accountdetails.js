import AccountDetails from "../models/AccountDetails.js";

export const addAccountDetails = async (req, res, next) =>{
    const newaddaccountdetails = new AccountDetails(req.body);
    try {
         const savedNewAccountDetails = await newaddaccountdetails.save();
         res.status(200).json(savedNewAccountDetails);
        
} catch (error) {
    res.status(500).json(error);
}
}

export const getAccountDetail = async (req,res) => {
   
   
    try {
        let data = await AccountDetails.find(
            {
                "$or":[
                    {"clientID":{$regex:req.params.key}}
                ]
            }
        );
        res.status(200).send(data);
    } catch (error) {
        res.status(401).send(error);
    }
}