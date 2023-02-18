const express = require('express')
const User = require('../models/users')
const router = express.Router()


router.post('/create_user', async (req, res) => {
    try {


        let u = req.query;
        console.log("Create user called")
        console.log("USer details:", u)
        u.scores = {};
        u.scores["exagon"] = 0;
        console.log(u)
        const user = new User(u)
        await user.save()
        res.status(201).send({ user })
    } catch (error) {
        res.status(400).send(error)
    }
})

let getDetails = (tok) => {
    if (tok && tok != undefined && tok != 'undefined') {
        var base64Url = tok.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        let jsonPayload = Buffer.from(base64, 'base64').toString();
        return JSON.parse(jsonPayload)
    } else {
        return {};
    }
}

router.post('/update_score/:game', async (req, res) => {
    try {
        let game = req.params.game;
        let token = req.headers.authorization;
        let new_score = req.body.new_score;
        console.log(new_score)
        let tok = token.split('Bearer ')[1];
        let user = getDetails(tok);
        let email = user.email
        let t = `scores.${game}`
        let v = await User.find({email}).select("scores")
        console.log(v)
        if(v[0].scores[game] < new_score ){
            console.log("New score higher");
            let r = await User.updateOne({email},{
                $set: {[t] : new_score}
            })
            res.status(200).send({r})
        }
        else{
            res.status(200).send({"Status" : "Could not update"})
        }
        
    }
    catch (err) {
        res.status(404).json({ err: "Could not update score" })
    }
})

router.get('/user/:email', async (req, res) => {
    try {
        let email = req.params.email
        console.log(email)
        const users = await User.find({ email }).select(["name", "email", "scores"])
        res.status(200).json(users)

    }
    catch (err) {
        res.status(404).json({ err: "No User Or Server Error" })
    }

})

router.get('/leaderboard/:game', async (req, res) => {
    try {
        let q = `scores.${req.params.game}`
        const ranklist = await User.find({ [q]: { "$gt": 0 } }).select(["name", q])
        ranklist.sort((a, b) => {
            return b.scores[req.params.game] - a.scores[req.params.game];
        });

        res.status(200).json(ranklist)
        // })
        // res.status(200).send({r})
    }
    catch (err) {
        res.status(404).json({ err: "Could not update score" })
    }
})

router.get('/user/:email', async (req, res) => {
    try {
        let email = req.params.email
        console.log(email)

    }
    catch (err) {
        res.status(404).json({ err })
    }
})


module.exports = router