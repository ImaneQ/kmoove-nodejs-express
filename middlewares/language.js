module.exports = function (req, res, next) {
    console.log("\n======== (language.js) ========\n");

    let firstElementUrl = req.originalUrl.split("/")[1]
    let langAccepted = ["fr", "en"]
    let urlAccepted = ["index", "about", "for-who", "our-games", "login"]
    
    if (firstElementUrl == "") {
        let language = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES;
        let lang = language.substring(0, 2)
        if (langAccepted.includes(lang)) {
            req.lang = lang
        } else {
            req.lang = "fr"
        }
        console.log(`lang=${req.lang}`);
        next()
    } else if (langAccepted.includes(firstElementUrl)) {
        req.lang = firstElementUrl
        console.log(`lang=${req.lang}`);
        next();
    } 
    else if(!langAccepted.includes(firstElementUrl) && !urlAccepted.includes(firstElementUrl)){
        console.log("bad request " + firstElementUrl);
        res.redirect(301, "/")
    }
    else if(!langAccepted.includes(firstElementUrl) && urlAccepted.includes(firstElementUrl)){
        let language = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES;
        let lang = language.substring(0, 2)
        if (langAccepted.includes(lang)) {
            req.lang = lang
        } else {
            req.lang = "fr"
        }
        console.log(`lang=${req.lang}`);
        next()
    }
    else {
        console.log("request bizarre : " + firstElementUrl);
        next()
    }
}