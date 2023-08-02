const authorize = require('../../utils/authorize');
const router = require('express').Router();
const { Vehicle, Post } = require('../../models');

router.post('/:id', authorize, async (req, res) => {
    try {
        const newPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            cost: req.body.cost,
            dateOfMaintenance: req.body.dateOfMaintenance,
            vehicleId: req.params.id
        })
        res.status(200).json(newPostData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.put('/edit/:id', authorize, async (req, res) => {
    try {
        const editPostData = await Post.update({
            title: req.body.title,
            content: req.body.content,
            cost: req.body.cost,
            dateOfMaintenance: req.body.dateOfMaintenance,
        },
            {
            where: {
                postId: req.params.id
            }
        });
        if (!editPostData) res.status(500).json({message: 'Failed to edit post'});
        res.status(200).json(editPostData);
    } catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router;