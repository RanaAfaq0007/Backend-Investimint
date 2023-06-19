import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Token from "../models/Token.js";
import {sendEmail} from "../utils/sendEmail.js";
import crypto from "crypto";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await new User({
      ...req.body,
      password: hash,
    }).save();
    const token = await new Token({
      userId:newUser._id,
      token:crypto.randomBytes(32).toString("hex")
    }).save();
  

  const url = `${process.env.BASE_URL}/Emailverify/${newUser._id}/${token.token}`;
    await sendEmail(newUser.email,"verify Email",url);
    
    res.status(200).send("An Email sent to your account");
  } catch (err) {
    res.status(401).send(err);  }
};

export const verifyEmail = async (req,res,next) => {
  try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

                await User.updateOne({ verified: true });

		await token.deleteOne();
                console.log("token deleted");
		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
    next(error);
}
}



// send email Link For reset Password
export const sendPasswordEmail = async (req, res) => {
  console.log(req.body);

  const { email } = req.body;

  if (!email) {
    return res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ status: 401, message: "Invalid user" });
    }

    // const token = jwt.sign({ _id: user._id }, process.env.JWT, {
    //   expiresIn: "120000s",
    // });

    // user.verifytoken = token;
    // const setusertoken = await user.save();
    const token = await new Token({
      userId:user._id,
      token:crypto.randomBytes(32).toString("hex")
    }).save();

    if (token) {

      const url = `${process.env.BASE_URL}/PasswordReset/${user._id}/${token.token}`;
      await sendEmail(user.email, "Verify Email", url);

      return res.status(200).send("An Email sent to your account");
    }
  } catch (error) {
  }
};


export const verifyForgotPassword = async(req,res,next)=>{
  try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid User" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });


		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
    next(error);
}
}
export const updatePassword = async (req,res)=>{
  const {id,token} = req.params;

  const {password} = req.body;

  try {
      const validuser = await User.findOne({_id:id});
      
      const token = await Token.findOne({
        userId: validuser._id,
        token: req.params.token,
      });

      if(token){
          const newpassword = await bcrypt.hash(password,12);

          const setnewuserpass = await User.findByIdAndUpdate({_id:id},{password:newpassword});

          setnewuserpass.save();
          res.status(201).json({status:201,setnewuserpass})
         await token.deleteOne();
      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }
  } catch (error) {
      res.status(401).json({status:401,error})
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));
	   if (!user.verified) {
        const token = await Token.findOne({ userId: user._id });
        if (!token) {
          token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `${process.env.BASE_URL}/Emailverify/${newUser._id}/${token.token}`;
          await sendEmail(user.email, "Verify Email", url);
        }
      }
  
    // const token = jwt.sign(
    //   { id: user._id },
    //   process.env.JWT
    // );

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};
