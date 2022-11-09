const Pool= require('pg').Pool;
const pg_conn = new Pool({
    user: 'uyuzvqscgfeuse',
    host: 'ec2-44-205-177-160.compute-1.amazonaws.com',
    database: 'dcn97s3142d4p8',
    password: '3ea3f3112c7dcc1b583aecb690ad439dc34f9bae440c110987526de4da0dca79',
    port: 5432,
    ssl:{
            rejectUnauthorized:false,
    },
  })

module.exports= pg_conn;