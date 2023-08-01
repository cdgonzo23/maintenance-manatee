const router = require('express').Router();

const { Vehicle, Post } = require('../../models');

router.post('/:id', authorize, async (req, res) => {
    try {
        const newPostData = await Post.create({
            title: req.body.title,
            content: req.body,content,
            cost: req.body.cost,
            dateOfMaintenance: req.body.dateOfMaintenance,
            vehicleId: req.params.id
        })
        res.status(200).json(newPostData);
    } catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router;