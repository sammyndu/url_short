const express = require("express");
const util = require("util");

const router = express.Router();

const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../model/url");

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseURL');

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base url');
    }
    console.log(longUrl);
    if(longUrl===undefined){
        res.json('empty');
    }
    const urlCode = shortid.generate();

    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                res.json(url.shortUrl);
            }
            else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    clicks: 0,
                    date: new Date()
                });

                url.save(url.shortUrl);

                res.json(url)
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error')
        }
    }
    else{        
        res.status(401).json(longUrl);
    }
})

module.exports = router;
