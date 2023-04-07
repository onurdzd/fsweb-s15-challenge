const db = require("../../data/dbConfig");

const getAll = () => {
  return db("bilmeceler as b")
    .join("users as u", "u.id", "b.user_id")
    .join("roles as r", "r.roles_id", "u.roles_id")
    .select("bilmece_id", "bilmece", "user_id", "username", "role_name");
};

const getBy = (filtre) => {
  return db("bilmeceler as b")
    .join("users as u", "u.id", "b.user_id")
    .join("roles as r", "r.roles_id", "u.roles_id")
    .where(filtre)
    .first();
};

const create = async (bilmece) => {
  const newBilmeceId = await db("bilmeceler").insert(bilmece);
  const newBilmece = await getBy("bilmece_id", newBilmeceId);
  return newBilmece;
};

module.exports = { getAll, getBy, create };
