const router = require("express").Router();
const pool = require("../db")
const authGuard = require("../middleware/authGuard")


//CREATE TASK
router.post("/create", authGuard, async (req,res) => {
    try{

        const task_name = req.body.task_name;
        const task_due_date = req.body.task_due_date;
        const task_status = req.body.task_status;
        const projectid = req.body.projectid;

        const newTask = await pool.query(
            "INSERT INTO task (task_name,task_due_date,task_status,projectid) VALUES ($1,$2,$3,$4) RETURNING * ",
            [task_name,task_due_date,task_status,projectid]
        );

        res.status(200).json(newTask.rows[0])


    }catch(err){
        res.status(500).json(err)
    }

})

//GET ALL TASKS
router.get('/read',authGuard, async (req,res) => {
    try{
        const tasks = await pool.query(
            "SELECT * FROM task"
        )
        res.status(200).json(tasks.rows)

    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE A TASK
router.put("/update/:id", authGuard, async (req,res) => {
    try{

        const id = req.params.id
        const task_name = req.body.task_name;
        const task_due_date = req.body.task_due_date;
        const task_status = req.body.task_status;
        const projectid = req.body.projectid

        const updateTask = await pool.query(
            "UPDATE task SET task_name = $1, task_due_date = $2, task_status = $3, projectid = $4  WHERE task_id = $5",
            [task_name,task_due_date,task_status,projectid,id]
        )
        res.status(200).json("Task was updated")

    }catch(err){
        res.status(500).json(err)
    }
})


//DELETE A TASK
router.delete("/delete/:id", authGuard, async (req,res) => {
    try{

        const id = req.params.id;
        await pool.query(
            "DELETE FROM task WHERE task_id = $1",[id])

        res.status(200).json("Task was successfully deleted")


    }catch(err){

        res.status(500).json(err)
    }
})

module.exports = router;