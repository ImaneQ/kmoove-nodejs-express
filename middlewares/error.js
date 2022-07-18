module.exports = function (err, req, res, next) {
    
    console.error(err);
    // console.error(err.stack);

    if (req.xhr) {
        res.status(500).send('Something broke xhr!');
    }

    res.status(500);
    res.render('error', { error: err });

    next();
}