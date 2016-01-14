var Sequelize = require('sequelize');


var database = process.env.DATABASE || 'cratedig';
var dbUser = process.env.DBUSER || 'root';
var dbPass = process.env.DBPASS || "student";
var dbHost = process.env.DBHOST || 'localhost'

var db = new Sequelize(database, dbUser, dbPass, {
  host: dbHost
});

var Post = db.define('Post', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // id_user: {
  //   type: Sequelize.INTEGER,
  //   references: 'User',
  //   referencesKey: 'id'
  // },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  postid: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: false
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: false
  },
  like_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  response_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  created: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  },
  updated: Sequelize.DATE
});

var User = db.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  fullname: Sequelize.STRING,
  email: Sequelize.STRING,
  image_url: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: false
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  post_like_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  resp_like_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

var Tag = db.define('Tag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: false
});

var Like = db.define('Like', {
  }, {
    timestamps: false
});

// set up one to many between user and post
User.hasMany(Post);
Post.belongsTo(User);

// Post.hasOne(User, {foreignKey: 'post_user_id'});
// User.belongsTo(Post, {foreignKey: 'post_user_id'});

// // set up many to many model for post and user on like
// User.belongsToMany(Post, {
//     as: ['relationship'],
//     through: [Like],
//     foreignKey: 'user_id'
// });
// Post.belongsToMany(User, {
//     as: ['relationship2'],
//     through: [Like],
//     foreignKey: 'post_id'
// });

// // set up many to many model for post and tag on post_tag
// Post.belongsToMany(Tag, {
//     as: ['relationship'],
//     through: [Post_Tag],
//     foreignKey: 'post_id'
// });
// Tag.belongsToMany(Post, {
//     as: ['relationship2'],
//     through: [Post_Tag],
//     foreignKey: 'tag_id'
// });


Post.sync()
.then(function() {
  return User.sync();
})
.then(function() {
  return Tag.sync();
})
.then(function() {
  return Like.sync();
});

exports.Post = Post;
exports.User = User;
exports.Tag = Tag;
exports.Like = Like;