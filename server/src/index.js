const express = require("express")
const app = express()
const fs = require("fs")
const bodyParser = require("body-parser")

const rawData = fs.readFileSync("db.json")
const data = JSON.parse(rawData)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("hello")
})

// Them
app.post("/api/v1/todo", (req, res) => {
    // console.log("chay vao router");
    console.log(req.body);
    console.log(data.todoList);
    data.todoList.push(req.body);
    fs.writeFileSync("db.json", JSON.stringify(data))
    res.status(200).json({
        message: "Thêm thành công",
        todo: data.todoList
    })
})
// Sửa
app.patch("/api/v1/todo/:id", (req, res) => {

    // console.log("chay vao router");
    console.log(req.params.id);
    const index = data.todoList.findIndex((item) => item.id == req.params.id)
    console.log(req.body);
    data.todoList[index] = { ...data.todoList[index], name: "hao ngu234 " }
    fs.writeFileSync("db.json", JSON.stringify(data))
    res.status(200).json({
        message: "Sửa thành công",
        todo: data.todoList
    })
});

// xoá
app.delete("/api/v1/todo/:id", (req, res) => {
    const arr = data.todoList.filter((item)=>item.id != req.params.id)
    data.todoList = arr
    fs.writeFileSync("db.json", JSON.stringify(data))
    res.status(200).json({
        message: "Xoá thành công",
        todo: data.todoList
        })
})
app.listen(7900, () => {
    console.log("chay vao server 7900");
})
