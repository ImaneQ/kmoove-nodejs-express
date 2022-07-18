module.exports = function (req, res, next) {
    console.log("\n\n\n\n\n\n\n======== (request.js) ========\n");

    // const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress
    // baseUrl - ${ req.baseUrl }
    // originalUrl - ${ req.originalUrl }
    // path - ${ req.path }
    // protocol - ${ req.protocol }
    // secure - ${ req.secure }
    // params - ${ req.params }
    // hostname - ${ req.hostname }
    // body - ${ req.body }
    // cookies - ${ req.cookies }
    // fresh - ${ req.fresh }
    // stale - ${ req.stale }
    // ip - ${ req.ip }
    // route - ${ req.route }

    console.log(`${req.method} => ${req.originalUrl}`)

    console.log(`HEADER : { HOST : ${JSON.stringify(req.headers.host)}, CONTENT-TYPE : ${JSON.stringify(req.headers['content-type'])}, USER-AGENT : ${JSON.stringify(req.headers['user-agent'])} }`)

    let pathElements = req.originalUrl.split("/")
    let path = ""
    for (let i = 0; i < pathElements.length; i++) {
        let result = pathElements[i]
        if (result == "") { result = "empty" }
        path += `${i} : ${result},  `
    }
    console.log(`URL : { ${path} }`);

    if (req.method == "POST") {

        if (JSON.stringify(req.body) !== "{}") console.log(`BODY : ${JSON.stringify(req.body)}`)
        if (JSON.stringify(req.query) !== "{}") console.log(`QUERY : ${JSON.stringify(req.query)}`)
        if (req.busboy !== undefined) console.log(`busboy : ${req.busboy}`)

    }

    next();

}