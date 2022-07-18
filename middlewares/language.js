module.exports = function (req, res, next) {
    console.log("\n======== (language.js) ========\n");

    let firstElementUrl = req.originalUrl.split("/")[1]
    let langAccepted = ["fr", "en"]
    let urlAccepted = ["about", "user"]
    
    if (firstElementUrl == "") {
        console.log("go home");
        let language = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES;
        let lang = language.substring(0, 2)
        if (langAccepted.includes(lang)) {
            req.lang = lang
        } else {
            req.lang = "fr"
        }
        console.log(`==== lang=${req.lang} ====`);
        next()
    } else if (langAccepted.includes(firstElementUrl)) {
        console.log("go lang");
        req.lang = firstElementUrl
        console.log(`==== lang=${req.lang} ====`);
        next();
    } 
    else if(!langAccepted.includes(firstElementUrl) && !urlAccepted.includes(firstElementUrl)){
        console.log("bad request " + firstElementUrl);
        res.redirect(301, "/")
    }
    else if(!langAccepted.includes(firstElementUrl) && urlAccepted.includes(firstElementUrl)){
        console.log("language default");
        let language = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES;
        let lang = language.substring(0, 2)
        if (langAccepted.includes(lang)) {
            req.lang = lang
        } else {
            req.lang = "fr"
        }
        console.log(`==== lang=${req.lang} ====`);
        next()
    }
    else {
        console.log("request " + firstElementUrl);
        next()
    }
}