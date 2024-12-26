module.exports.checkUser = (req, res, next) => {
    const {userid} = req.params;
    if(!req.user || userid !== req.user._id.toString()){
        return res.json({error:true});
    }
    next();
}
