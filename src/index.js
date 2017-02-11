"use strict"

const express = require("express")
const bodyParser = require("body-parser")
const neuralNet = require("./neuralNet")

const app = express()
app.set("view engine", "pug")
app.set("views", "./src/views")
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("home")
})

app.post("/train", (req, res) => {
    const {d, r} = req.body
    const {synapse0, synapse1} = neuralNet.train(d, r)
    res.send({s0: synapse0._data, s1: synapse1._data})
})

app.use((req, res) => {
    res.status(404).render("error", {message: "HTTP 404 Not Found"})
})

app.listen(3000)
