User.create = async (newUser) => {
  let insert = await sql.query("INSERT INTO user SET ?", newUser);
  if (insert.insertId) {
    return insert.insertId;
  } else {
    return;
  }
};

User.login = async (value) => {
  let row = await sql.query(
    `SELECT * FROM user WHERE mobile = ? OR email = ?`,
    [value, value]
  );
  if (row.length) {
    return row[0];
  } else {
    throw new NotFoundError("User does not exist");
  }
};
