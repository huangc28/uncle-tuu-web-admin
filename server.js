const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3003 

app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('/', (req, res) => {
        rs = fs.createReadStream(path.resolve(__dirname, 'dist/index.html'), 'utf8') 
        rs.pipe(res).on('error', err => {
            if (err) {
                console.log(err)
                res.statusCodek = 500
                res.setHeader('Content-Type', 'text/plain')
                res.end(err.message)
            }
        })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
