import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid Password' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  };
  

const RegisterUser = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        const UserExist = await User.findOne({email});
        if(UserExist){
            return res.status(400).json({error:'User already exists'});
        }
        const user = await User.create({name,email,password});
        await user.save();
        res.status(201).json({message:'User registered successfully'});
    } catch (error) {
        res.status(500).json({error:'An error occurred while registering user'});
    }
}

export {LoginUser,RegisterUser};