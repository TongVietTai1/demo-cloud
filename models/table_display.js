var pg_conn = require('./pg_config');
//define a function to display product table for a shop

async function display_product(shop_id){
        //query DB to get table data
    let query_product;
    if(shop_id == 0) {
        query_product = 'SELECT * FROM products'
    }else{
        query_product = {
            text: 'SELECT * FROM products WHERE shop_id=$1', 
            values: [shop_id]
        };
    }
    //init the table_string, with the table tag
    const data = await pg_conn.query(query_product);
    //pg_conn.end;
    let table_string = 
        `<table border="1">
            <tr>`;//display all table's header
            let num_fields = data.fields.length;
            for( let i = 0; i< num_fields; i++){
                table_string += `<th>${data.fields[i].name}</th>`
            };
            table_string += ` <th>actions</th>`
            table_string += `</tr>`;
            //display all rows of table
        
            let num_rows = data.rowCount;//row.lenth or rowsCount 
            for (let i = 0; i < num_rows; i++){
                table_string+=`<form action="/users/crud" method="post">`
                table_string += `<tr>`;
                for (let j =0; j<num_fields; j++){
                    let field_name = data.fields[j].name
                    let cell = data.rows[i][field_name];
                    table_string += `<td><input type="text" name=${field_name} value=${cell}></td>`;
                }
                table_string += 
                `<td>
                <button type='submit' name='crud' value='delete' id='delete'>Delete</button>
                <button type='submit' name='crud' value='update' id='update'>Update</button>
                </td>
                </tr></form>`
            }
            //add an empty row and insert button at the end of row
            table_string += `<tr><form action="/users/crud" method="post">`
            for (let j =0; j<num_fields; j++){
                let field_name = data.fields[j].name
                table_string += `<td><input type="text" name=${field_name}></td>`;
            }
            table_string += `<td>
                <button type='submit' name='crud' value='add' id='add'>Add</button>
            </td> `;
        table_string += `</tr></form></table>`;
        // console.log("DATA: -->");
        // console.log(data);
    return table_string;
}
module.exports=display_product;