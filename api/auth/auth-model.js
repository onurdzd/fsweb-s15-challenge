const db = require("../../data/dbConfig");

const getAll = () => {
  return db("users");
};

const getBy = (filter) => {
  return db("users").where(filter).first();
};

const create = async (user) => {
  const newUserId = await db("users").insert(user);
  const newUser = await getBy({ id: newUserId });
  return newUser;
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
