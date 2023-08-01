const router = require('express').Router();
const { Vehicle } = require('../../models');
const authorize = require('../../utils/authorize');

router.post('/add-vehicle', authorize, async (req, res) => {
    try {
        const newVehicleData = await Vehicle.create({
            manufacturer: req.body.manufacturer,
            modelName: req.body.modelName,
            year: req.body.year,
            color: req.body.color,
            nickname: req.body.nickname,
            userId: req.session.userId
        });
        res.status(200).json(newVehicleData)
    } catch (err) {
        res.status(500).json(err);
    };
});

router.put('/:id', authorize, async (req, res) => {
    try {
         const vehicle = await Vehicle.update(
       {
        manufacturer: req.body.manufacturer,
        modelName: req.body.modelName,
        year: req.body.year,
        color: req.body.color,
        nickname: req.body.nickname,
    }, 
    {
        where: {
            id: req.params.id
        }
    });
        res.status(200).json(vehicle);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/delete/:id', authorize, async (req, res) => {
    try {
    const deletedVehicle = await Vehicle.destroy({where: {
        id: req.params.id
    }});
    res.status(200).json({message: 'Vehicle deleted'});
    } catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router;