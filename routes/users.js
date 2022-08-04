const router = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/register", async(req,res) => {
    try{

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt)

        const username = req.body.username ;
        const email = req.body.email;

        const newUser = await pool.query(
            "INSERT INTO userdetails (username,email,password) VALUES ($1,$2,$3) RETURNING * ",
            [username,email,password]
        );

        res.status(200).json(newUser.rows[0])

    }catch(err){

        res.status(500).json(err)
    }

})

router.get("/login", async (req,res) => {
    try{

        const email = req.body.email 
        const details = await pool.query(
            "SELECT * FROM userdetails WHERE email = $1",[email]
        )
        const user = details.rows[0];
        !user && res.status(404).json("user not found")

        if(user){
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            !validPassword && res.status(400).json("wrong password")

            if(validPassword){
                const username = user.username  
                const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
                    res.json({accessToken:accessToken})
            }
        }

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;