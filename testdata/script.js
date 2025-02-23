// const db = sql.open(driver, "oracle://system:mypassword@localhost:1521/FREEPDB1");
const db = sql.open(driver, connection);

db.exec("CREATE TABLE IF NOT EXISTS test_table (id number(37), name VARCHAR(200) NOT NULL, value VARCHAR(200));");

const insertQuery=`INSERT INTO test_table (id, name, value) VALUES (:1, :2, :3)`
for (let i = 1; i < 6; i++) {
  col1 = i;
  col2 = 'name-' + i;
  col3 = 'value-' + i;
  db.exec(insertQuery, col1, col2, col3);
}

let all_rows = db.query("SELECT * FROM test_table;");
if (all_rows.length != 5) {
  throw new Error("Expected all five rows to be returned; got " + all_rows.length);
}

let one_row = db.query("SELECT * FROM test_table WHERE name = :1;", "name-2");
if (one_row.length != 1) {
  throw new Error("Expected single row to be returned; got " + one_row.length);
}

let no_rows = db.query("SELECT * FROM test_table WHERE name = :1;", "bogus-name");
if (no_rows.length != 0) {
  throw new Error("Expected no rows to be returned; got " + no_rows.length);
}

db.close();
