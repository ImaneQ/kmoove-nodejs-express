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
        let urlAccepted = ["index", "about"]
        let firstElementUrl = req.originalUrl.split("/")[1]
        let secondElementUrl = req.originalUrl.split("/")[2]
        var page = ""

        // console.log(`${firstElementUrl}, ${secondElementUrl}, `);
        if (firstElementUrl == "" || urlAccepted.includes(firstElementUrl)) {
            if (!urlAccepted.includes(firstElementUrl) && secondElementUrl == undefined) {
                page = "index"
                // console.log(`page is index 1`);
            } else {
                page = firstElementUrl
                // console.log(`page is ${page} 2`);

            }
        }
        else if (langAccepted.includes(firstElementUrl)) {
            if (secondElementUrl == undefined) {
                page = "index"
                console.log(`page is index 3`);
            } else if (urlAccepted.includes(secondElementUrl)) {
                page = secondElementUrl
                console.log(`page is ${page} 2`);
            } else if (secondElementUrl == "") {
                console.log(`page is 4`);
                next()
            }
        }
        let cacheName = req.lang + "/" + page
        let cache = myCache.get(cacheName)
        if (cache == undefined && page !== "") {
            console.log(`==== ${cacheName} isn't cached ====`);
            let data = require(`./data/lang/${req.lang}/${page}.json`)
            success = myCache.set(cacheName, data);
            if (success) {
                data = myCache.get(cacheName)
                req.data = data
            }
        } else {
            console.log(`==== ${cacheName} is cached ====`);
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
    let data = req.data
    if (data !== undefined) {
        res.render(data.page.name, { data })
    } else {
        console.log(req.lang);
        res.redirect(301, `/${req.lang}`)
    }
})
app.get('/maintenance', (req, res) => {
    console.log("\n======== get('/maintenance') ========\n");
    res.send('maintenance')
})
app.get('user/', (req, res) => {
    res.render("admin")
    // let login = false
    // // if admin is logged
    // if (login) {
    //     res.render("admin")
    // } 
    // // else redirect on login page
    // else {
    //     res.redirect(301, '/admin/login')
    // }
})
app.get('user/admin', (req, res) => {
    res.render("admin")
    // let login = false
    // // if admin is logged
    // if (login) {
    //     res.render("admin")
    // } 
    // // else redirect on login page
    // else {
    //     res.redirect(301, '/admin/login')
    // }
})
app.post("/user/sign_up", (req, res) => {
    var pass
    var pseudo
    if (!req.busboy) {
        console.log("Erreur: un form Data est attendu");
    } else {
        req.busboy.on('file', (name, file, info) => {
            // console.log(`[file]\n
            //     name === ${name}\n
            //     value === ${file}\n
            //     info === ${info}\n
            // `);
            if (name === "pass") {
                file.on('data', (data) => {
                    // console.log(data);
                    // console.log(data.length);
                    // console.log(data.toString());
                    var text = data.toString()
                    if (text !== "") {
                        pass = text
                    }
                }).on('close', () => {
                    // console.log(`close file`);
                });
            }
        });

        req.busboy.on('field', (name, value, info) => {
            // console.log(`[field]\n
            // name === ${name}\n
            // value === ${value}\n
            // info === ${info}\n
            // `);
            if (name === "name") {
                pseudo = value
            }
        });

        req.busboy.on('close', () => {
            console.log(`${pseudo}\n${pass}`);

            if (pseudo !== undefined && pseudo !== "" && pass !== undefined && pass !== "") {
                console.log('toutèbon');
                res.redirect(301, '/admin/login')
            }
            else {
                console.log('probleme identifiants');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.render("maintenance")
            }
        });

        req.pipe(req.busboy);
    }

    // res.send("ok post login")
})

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