const router = require('express').Router();
const { Vehicle, Post } = require('../../models');

router.post('/add-post', async (req, res) => {
    try {
        const newPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            cost: req.body.cost,
            dateOfMaintenance: req.body.dateOfMaintenance,
            vehicleId: req.body.vehicleId
        })
        res.status(200).json(newPostData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.put('/edit/:id', async (req, res) => {
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
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Post.delete({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: 'Post Deleted'});
    } catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router;