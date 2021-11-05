import User from './User.js'
import Role from './Role.js'

Role.hasMany(User, {foreignKey: 'role_id'});
User.belongsTo(Role, {foreignKey: 'role_id'});

export {
    User,
    Role
}