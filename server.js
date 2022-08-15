const express = require('express')
var path = require('path');
const NodeCache = require("node-cache");
const busboy = require('connect-busboy');
// const compression = require('compression')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const port = process.env.PORT || 8080

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/assets/views'))
app.use('/', express.static('assets'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(busboy({ immediate: false }));
// app.use(compression())

const myCache = new NodeCache({ stdTTL: 6000 });

app.use(require('./middlewares/request'));
app.use(require('./middlewares/maintenance'));
app.use(require('./middlewares/language'), async (req, res, next) => {
    console.log("\n======== cache middleware in server.js ========\n");
    // on recupere la page en fonction de l'url et de la langue et on la met en cache
    if (req.lang !== undefined) {
        let langAccepted = ["fr", "en"]
        let urlAccepted = ["index", "about", "for-who", "our-games", "login"]
        let firstElementUrl = req.originalUrl.split("/")[1]
        let secondElementUrl = req.originalUrl.split("/")[2]
        var page = ""
        console.log(`elements url : 1 = ${firstElementUrl}, 2 = ${secondElementUrl}, `);
        if (firstElementUrl == "" || urlAccepted.includes(firstElementUrl)) {
            console.log(`no lang defined in l'url (${req.lang})`);
            if (!urlAccepted.includes(firstElementUrl) && secondElementUrl == undefined) {
                page = "index"
                console.log(`page is index [1]`);
            } else {
                page = firstElementUrl
                console.log(`page is ${page} [2]`);
            }
        }
        else if (langAccepted.includes(firstElementUrl)) {
            console.log(`lang defined in l'url (${firstElementUrl})`);
            if (secondElementUrl == undefined) {
                page = "index"
                console.log(`page is index [3]`);
            } else if (urlAccepted.includes(secondElementUrl)) {
                page = secondElementUrl
                console.log(`page is ${page} [4]`);
            } else if (secondElementUrl == "") {
                console.log(`page is [5]`);
                next()
            }
        }

        let cacheName = req.lang + "/" + page
        let cache = myCache.get(cacheName)

        if (cache == undefined && page !== "") {
            console.log(`page isn't cached (${cacheName})`);
            let data = require(`./data/pages/${req.lang}/${page}.json`)
            success = myCache.set(cacheName, data);
            if (success) {
                data = myCache.get(cacheName)
                req.data = data
            }
        } else {
            console.log(`page is cached (${cacheName})`);
            data = myCache.get(cacheName)
            req.data = data
        }
    }
    else {
        console.log(`no lang defined`);
    }
    next()
});

app.get('/:lang([a-z]{2})?/:page?*', (req, res) => {
    console.log("\n======== GET request principal ========\n");
    let data = req.data
    console.log(`render ${data.page.name}`);
    res.render(data.page.name, { data })
})
app.get('/maintenance', (req, res) => {
    res.render("maintenance")
})

// POST register
// POST contact

// ERROR
app.use(require('./middlewares/error'));

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n
    /// Port: ${port}\n
    /// env : ${process.env.NODE_ENV}\n
    /// maintenance : ${process.env.MAINTENANCE}\n\n\n`);
})