/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("roles").truncate();
  await knex("roles").insert([
    { role_name: "admin" },
    { role_name: "user" },
  ]);
  await knex("users").truncate();
  await knex("users").insert([
    { username: "onur", password: 123,roles_id:1 },
  ]);
  await knex("bilmeceler").truncate();
  await knex("bilmeceler").insert([
    {
      bilmece: "Bir kamyonu kim tek eliyle durdurabilir?",
      user_id:1
    },
    {
      bilmece: "Yürür iz etmez, hızlansa toz etmez",
      user_id:1
    },
    {
      bilmece: "Dört ayağı olsa da adım atamaz",
      user_id:1
    },
  ]);
};
