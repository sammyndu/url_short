const express = require("express");

const router = express.Router();

const Url =  require('../model/url');


router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode:req.params.code });
        if (url) {
            url.clicks = url.clicks + 1;
            await Url.update({urlCode:url.urlCode}, {$set:{clicks:url.clicks}})
            console.log(url.clicks)
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json("No Url Found")
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error")
    }
});

module.exports = router;