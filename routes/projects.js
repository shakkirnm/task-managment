const router = require("express").Router();
const authGuard = require("../middleware/authGuard")
const pool = require("../db")

//CREATE PROJECT
router.post("/create", authGuard, async(req,res) => {

    const name = req.body.name;
    const description = req.body.description;
    const status = req.body.status;
    const newProject = await pool.query(
        "INSERT INTO project (name,description,status) VALUES ($1,$2,$3) RETURNING * ",
        [name,description,status]
    );

    res.status(200).json(newProject.rows[0])


})

//GET ALL PROJECT
router.get('/read', authGuard, async (req,res) => {
    try{

        const projects = await pool.query(
            "SELECT * FROM project"
        )
        res.status(200).json(projects.rows)

    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE A PROJECT
router.put("/update/:id", authGuard, async (req,res) => {
    try{
        const id = req.params.id
        const name = req.body.name;
        const description = req.body.description;
        const status = req.body.status;

        const updateProject = await pool.query(
            "UPDATE project SET name = $1, description = $2, status = $3  WHERE projectid = $4",
            [name,description,status,id]
        )
        res.status(200).json("Project was updated")

    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE A PROJECT
router.delete("/delete/:id", authGuard, async (req,res) => {
    try{

        const id = req.params.id;
        await pool.query(
            "DELETE FROM task WHERE projectid = $1",[id])
        await pool.query(
            "DELETE FROM project WHERE projectid = $1",[id])

        res.status(200).json("Project was successfully deleted")


    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;