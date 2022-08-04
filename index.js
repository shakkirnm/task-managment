require("dotenv").config()
const expres = require("express");
const userRouter = require("./routes/users")
const projectRouter = require("./routes/projects")
const taskRouter = require("./routes/task")

const app = expres()

app.use(expres.json())


app.use("/api/users", userRouter)
app.use("/api/project", projectRouter)
app.use("/api/task", taskRouter)


 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`backend server is running on port ${PORT}`);
})    