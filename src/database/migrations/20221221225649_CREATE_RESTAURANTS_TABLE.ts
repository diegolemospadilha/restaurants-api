import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('restaurants', (t) => {
        t.timestamp('created_at').defaultTo(knex.fn.now());

        t.uuid('id').notNullable().unique();
        t.string('name').notNullable();
        t.string('description').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('restaurants');
}

