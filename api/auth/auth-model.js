const db = require("../../data/dbConfig");

const getAll = () => {
  return db("users as u")
    .leftJoin("roles as r", "r.roles_id", "u.roles_id")
    .select("u.id", "u.username", "r.role_name");
};

const getBy = async (filter) => {
  const filtered = await db("users as u")
    .leftJoin("roles as r", "r.roles_id", "u.roles_id")
    .where(filter)
    .first();
  return filtered;
};

const create = async (user) => {
  let isValidRole = await getBy({ role_name: user.role_name });
  if (isValidRole) {
    let roleId = db("roles")
      .where("role_name", user.role_name)
      .select("roles_id");
    const newUserId = await db("users").insert({
      username: user.username,
      password: user.password,
      roles_id: roleId,
    });
    const newUser = await getBy({ id: newUserId });
    return newUser;
  } else {
    const newRoleId = await db("roles").insert({ role_name: user.role_name });
    const newUserId = await db("users").insert({
      username: user.username,
      password: user.password,
      roles_id: newRoleId,
    });
    const newUser = await getBy({ id: newUserId });
    return newUser;
  }
};

const remove = (id) => {
  return db("users").delete(id);
};

const update = async (id, user) => {
  await db("users").where("id", id).update(user);
  const updatedUser = await getBy({ id: id });
  return updatedUser;
};

module.exports = {
  getAll,
  getBy,
  create,
  remove,
  update,
};
