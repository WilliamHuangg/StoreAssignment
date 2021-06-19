const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const { NotFoundError } = require("./utils/errors")
const blogRouter = require("./routes/blog")

const app = express()

app.use(morgan("tiny"))
app.use(express.json())
app.use(cors())

app.use("/products", blogRouter)


app.use((req, res, next) => {
    return next(new NotFoundError())
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message

    return res.status(status).json({
        error: { message, status}
    })
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}.`)
})