import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('opening_days', (t) => {
        t.timestamp('created_at').defaultTo(knex.fn.now());
    
        t.uuid('id').notNullable().unique();
        t.integer('day').notNullable();
        t.boolean('is_open').notNullable().defaultTo(false);
        t.time('opens_at').nullable();
        t.time('closes_at').nullable();

        t.uuid('restaurant_id').notNullable()

        t.foreign('restaurant_id')
        .references('restaurants.id')
        .onDelete('CASCADE')

        t.index('id', 'idx_opening_days_id');
    })  
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('opening_days');
}

