const Pool= require('pg').Pool;
const pg_conn = new Pool({
    user: 'fzicwkdmwdfzsn',
    host: 'ec2-44-195-132-31.compute-1.amazonaws.com',
    database: 'd45iqkm8pu7ef6',
    password: 'ee989e72f40d3519122e7f9c3a3ad09f00ace5b9dfb175e1a60f11353950e162',
    port: 5432,
    ssl:{
            rejectUnauthorized:false,
    },
  })

module.exports= pg_conn;    