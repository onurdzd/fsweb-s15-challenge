const uuid=require("uuid")

exports.up = function (knex) {
  return knex.schema.createTable("roles",t=>{
    t.increments("roles_id")
    t.string("role_name",20).notNullable().defaultTo("user")
  })
  .createTable('users', users => {
    users.increments("id");
    users.string('username', 30).notNullable().unique();
    users.string('password', 20).notNullable();
    users.integer("roles_id").notNullable().unsigned().references("roles_id").inTable("roles").onDelete("CASCADE").onUpdate("CASCADE")
  })
  .createTable('bilmeceler', t => {
    t.increments("bilmece_id")
    t.string("bilmece").notNullable().unique();
    t.integer("user_id").notNullable().unsigned().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE")
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('bilmeceler').dropTableIfExists('users').dropTableIfExists('roles');
};
