var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://root@localhost/test');

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  userId: Sequelize.BIGINT(11)
}, {
    indexes: [
        {
            fields: ['userId'],
            unique: true
        }
    ]
});

var userIdsSmall = [11111111111, 22222222222, 33333333333, 44444444444];
var userIdsBig = [];

for (i = 0; i < 150; i++) {
    userIdsBig.push(Math.round(Math.random() * 10000000000));
}

return sequelize.sync().then(function() {
    return User.create({
        username: 'user' + Math.round((Math.random() * 1000)),
        userId: Math.round(Math.random() * 10000000000)
    }).then(function(jane) {
        var start = new Date();
        var count = 0;
        userIdsSmall.push(jane.userId)
        userIdsBig.push(jane.userId);
        for (i = 0; i < 5000; i++) {
            User.findAll({
                where: {
                    userId: userIdsBig
                }
            }).then(function(janeResponse) {
                if (i === 5000) {
                    console.log(new Date() - start);
                }
            });
        }
    });
});