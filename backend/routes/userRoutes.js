import express from "express";
import auth from "../middleware/authMiddleware.js";
import { addToHistory, forgotPassword, getHistory, getLikedSongs, getUserProfile, likeSong, loginUser, registerUser, resetPassword, unlikeSong, updateUser, uploadProfileImage } from "../controllers/userControllers.js";
import User from '../models/userModel.js';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();
// Register route
router.post("/register", registerUser);
// Login route
router.post("/login", loginUser);
// Update user routes
router.put("/update", auth,updateUser);
//upload profile image
router.post("/profileImage",auth, upload.single("profileImage"), uploadProfileImage);
// profile routes 
router.get("/profile", auth, getUserProfile);
// gorgot password routes
router.post("/forgotPassword", forgotPassword);
// reset password routes
router.post("/resetPassword/:token", resetPassword);
// Like a song
router.post('/like-song', auth, likeSong); 
// Unlike a song         
router.post('/unlike-song', auth, unlikeSong); 
// Unlike a song      
router.get('/liked-songs', auth, getLikedSongs);
//Add history if song Play
router.post('/addToHistory', auth, addToHistory);
//getHistory 
router.get('/getHistory', auth, getHistory);


// Google Login Route

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
    const { token } = req.body;
  
    try {
      // Verify Google token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { sub: googleId, name, email } = payload; 
      // Check if user exists; if not, create a new user
      let user = await User.findOne({ googleId: payload.sub });
      if (!user) {
        user = await User.findOne({ email: payload.email });
        if (user) {
            // Update the user to include googleId
            user.googleId = payload.sub;
        } else {
            user = new User({
                googleId,
                username: name,
                email,
                password: '',
            });
        }
        await user.save();
      }
  
      // Generate a JWT token for the user
      const jwtPayload = { user: { id: user.id } };
      const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ token: jwtToken,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
       });
    } catch (error) {
      console.error("Google login failed:", error);
      res.status(400).json({ msg: "Google authentication failed" });
    }
  });
export default router;
