const User = require('./User');
const Vehicle = require('./Vehicle');
const Post = require('./Post');

User.hasMany(Vehicle, {
    foreignKey: 'userId',
});

Vehicle.belongsTo(User, {
    foreignKey: 'userId'
});

Vehicle.hasMany(Post, {
    foreignKey: 'vehicleId'
});


Post.belongsTo(Vehicle, {
    foreignKey: 'vehicleId'
});

module.exports = { User, Post, Vehicle };