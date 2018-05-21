const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const http = require('http')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))
app.set('view engine', 'ejs')

let apiKey = ''


app.get('/', (req, res)=> {
    res.render('index')
})

app.post('/', (req, res)=> {
    let city = req.body.city
    let url = `http://api.searchman.io/v1/android/us/apps?appIds=${city}&apiKey=${apiKey}`
    request(url, (err, response, body)=> {
            let apps = JSON.parse(body)
            
            Object.keys(apps.data).forEach((key) => {
                let obj = apps.data[key];
                let appName = [obj.appName];
                res.render('index', {app: appName, error: null})
                console.log(obj.appName);
            });
            
           
    })
})

const port = process.env.PORT || '3000'
app.set('port', port)

const server = http.createServer(app)

server.listen(port, () => console.log(`Running on localhost:${port}`))
