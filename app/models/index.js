import User from './User.js'
import Role from './Role.js'
import City from './City.js'
import Bus from './Bus.js'
import Seat from './Seat.js'
import Trip from './Trip.js'
import TripLeg from './TripLeg.js'
import Reservation from './Reservation.js'

Role.hasMany(User, {foreignKey: 'role_id'});
User.belongsTo(Role, {foreignKey: 'role_id'});

Bus.hasMany(Seat, {foreignKey: 'bus_id'});
Seat.belongsTo(Bus, {foreignKey: 'bus_id'});

Bus.hasMany(Trip, {as: 'bus', foreignKey: 'bus_id'});
Trip.belongsTo(Bus, {as: 'bus', foreignKey: 'bus_id'});

City.hasOne(TripLeg, {as: 'origin', foreignKey: 'origin_id'});
TripLeg.belongsTo(City, {as: 'origin', foreignKey: 'origin_id'});
//trip_legs
City.hasOne(TripLeg, {as: 'destination', foreignKey: 'destination_id'});
TripLeg.belongsTo(City, {as: 'destination', foreignKey: 'destination_id'});

City.belongsToMany(City, {through: TripLeg, as: 'trip_leg_origin', foreignKey: 'origin_id'});
City.belongsToMany(City, {through: TripLeg, as: 'trip_leg_destination', foreignKey: 'destination_id'});

export {
    User,
    Role,
    City,
    Bus,
    Seat,
    Trip,
    TripLeg,
    Reservation
}