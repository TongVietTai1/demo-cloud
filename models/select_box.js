var pg_conn = require('./pg_config');
async function director_box(){
  //query DB to get table data
  let query_shops = `SELECT shops.id, shops.name, users.role FROM shops 
                     JOIN users ON shops.id = users.shop_id ORDER BY id`;
  //init the table_string, with the table tag
  const data = await pg_conn.query(query_shops)
  pg_conn.end;
     let box_string = 
    `<form action="/admin/select_box" method="post">
      <label for="shop">Choose a shop: </label>
        <select name="shops" id="shops">
          <option value=0 selected>All shops</option>`;
            let select_items = data.rowCount;      
              for (let i =0; i<select_items;i++){
                if (data.rows[i].role !== "director")
                {
                  box_string += `<option value=${data.rows[i].id}>${data.rows[i].name} </option>`;
                }
              }
        box_string +=
       `</select>
         <input type='submit' value='view' id='view'>
    </form>`;
    // console.log("DATA: -->");
    // console.log(data);
  return box_string;
}

module.exports = director_box;
