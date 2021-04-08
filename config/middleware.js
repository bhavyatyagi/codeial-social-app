module.exports.setFlash = function (req, res, next) {
    // connect-flash is being used so taht it can store the message in the cookie and will forget afterwards showing 1 time 
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
}