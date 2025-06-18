db = db.getSiblingDB('learning_platform');

db.createCollection('books');
db.createCollection('quizzes');
db.createCollection('users');
db.createCollection('sessions');

// Indici per performance
db.books.createIndex({ "title": "text", "content": "text" });
db.quizzes.createIndex({ "topicId": 1 });
db.users.createIndex({ "email": 1 }, { unique: true });