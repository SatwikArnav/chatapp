const Redis = require('ioredis');

const redis = new Redis({
  port: 13588,
  host: 'redis-13588.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
  username: 'default',
  password: 'SVpIp7BN2AngZfjJmmUqmuxFqSRizC8F'
});

// Error handling
redis.on('error', (err) => console.log('Redis Client Error', err));

module.exports = redis;