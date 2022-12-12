
let date = new Date();
date.setMinutes(date.getMinutes() + 5);
reset_password_expires = date;

const updateToken = await db.query(
    "UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?", [token, reset_password_expires, email] 
);
