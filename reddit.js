var Sequelize = require('sequelize');

var db = new Sequelize('reddit', 'dreboom', undefined, {
	dialect: 'mysql'
});


var User = db.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING // TODO: make the passwords more secure!
});

// Even though the content belongs to users, we will setup the userId relationship later
var Content = db.define('content', {
    url: Sequelize.STRING,
    title: Sequelize.STRING
});

// Even though a vote has a link to user and content, we will setup the relationship later
var Vote = db.define('vote', {
    upVote: Sequelize.BOOLEAN
});


function createNewUser(name, pass, callback){
    User.create({
        name: name,
        password: pass
        //This is a callback function
    }).then(function(user) {
        callback(user);
    });
}


function createNewContent(userId, url, title, callback) {
    Content.create({
        userId: userId,
        url: url,
        title: title,
    }).then(function(NewContent) {
        callback(NewContent);
    });
}
createNewContent(1, 'http://www.google.com', 'google', function(NewContent){console.log(NewContent)});


// User <-> Content relationship
Content.belongsTo(User); // This will add a `setUser` function on content objects
User.hasMany(Content); // This will add an `addContent` function on user objects

// User <-> Vote <-> Content relationship
User.belongsToMany(Content, {through: Vote, as: 'Upvotes'}); // This will add an `add`
Content.belongsToMany(User, {through: Vote});

//db.sync(); // Only needs to be used once!