import { db } from "../../database/database";
import { RestaurantOut } from "../../domain/ports/outbound/RestaurantOut";
import { Restaurant } from "../../domain/Restaurant";

export class RestaurantRepository implements RestaurantOut {
    async getAll(): Promise<any> {
        try {
            return await db('restaurants')
                .select('*').limit(50);
        } catch (error) {
            console.log('error', error);
            throw new Error('Error');
        }
    }

    async getById(id: string): Promise<void> {
        try {
            return await db('restaurants')
                .select('*').where({ id }).first();
        } catch (error) {
            console.log('error', error);
            throw new Error('Error');
        }
    }
    async create(restaurant: Restaurant): Promise<any> {
        try {
            const { id, name, description } = restaurant;
            const data: any =  await db('restaurants')
                .insert({id, name, description})

            return this.getById(id);

        } catch (error) {
            console.log('error', error);
            throw new Error('Error');
        }
    }

    async update(restaurant: Restaurant): Promise<any> {
        const { id, name, description } = restaurant;
        try {
            await db('restaurants')
                .update({ name, description}).where({ id })

            return this.getById(id);

        } catch (error) {
            console.log('error', error);
            throw new Error('Error');
        }
    }
    async delete(id: string): Promise<void> {
        try {
            await db('restaurants')
                .del().where({ id })

        } catch (error) {
            console.log('error', error);
            throw new Error('Error');
        }
    }
    
    isOpen(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}