import User from './User.js'
import Role from './Role.js'
import City from './City.js'
import Bus from './Bus.js'
import Seat from './Seat.js'

Role.hasMany(User, {foreignKey: 'role_id'});
User.belongsTo(Role, {foreignKey: 'role_id'});

Bus.hasMany(Seat, {foreignKey: 'bus_id'});
Seat.belongsTo(Bus, {foreignKey: 'bus_id'});

export {
    User,
    Role,
    City,
    Bus,
    Seat
}