const { send } = require('micro');
const users = require('./src/services/user.service');
const auth = require('./src/authentication/authentication');
const db = require('./src/models/db');

module.exports = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );

  if (req.method == 'OPTIONS') {
    return '';
  }
  try {
    switch (req.url) {
      case '/api/setup':
        send(res, 200, await users.setup());
        break;

      case '/api/auth':
        return auth.login(req, res);

      case '/api/users':
        if (auth.decode(req, res) !== null) {
          send(res, 200, await users.list());
        }
        break;
      case '/api/v1.0/users':
        if(auth.decode(req, res) !== null) {
          if(req.method == 'POST') {
            send(res, 200, await users.create(req, res));
          } else {
            const err = new Error('invalid request')
            err.statusCode = 400
            throw err
          }
        }
        break;
      default:
        break;
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'prod' && err.stack) {
      console.error(err.stack);
    }

    send(res, err.statusCode || 500, { error: true, message: err.message });
  }
};
