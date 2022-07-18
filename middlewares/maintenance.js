module.exports = function (req, res, next) {
    console.log("\n======== (maintenance.js) ========\n");
    
    let firstElementUrl = req.originalUrl.split("/")[1]
    let urlAcceptedInMaintenance = ["maintenance", "admin"]


    if (process.env.MAINTENANCE == "true") {
        console.log("in maintenance");
        if(urlAcceptedInMaintenance.includes(firstElementUrl)){
            console.log("\n=== URL accepted ===\n");
            res.render(firstElementUrl)
        } else {
            console.log("\n=== URL not accepted (redirect /maintenance) ===\n");
            res.redirect(301, '/maintenance')
        }
    } 
    else {
        console.log("not in maintenance");
        if(firstElementUrl == "maintenance"){
            console.log("\n=== maintenance is unavailable (redirect /) ===\n");
            res.redirect(301, '/')
        } else {
            next()
        }
    }
}