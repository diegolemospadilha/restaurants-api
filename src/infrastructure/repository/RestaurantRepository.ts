import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';
import { db } from "../../database/database";
import { DomainError } from "../../domain/errors/DomainError";
import { OpeningHoursDetail } from "../../domain/OpeningHours";
import { RestaurantOut } from "../../domain/ports/outbound/RestaurantOut";
import { Restaurant } from "../../domain/Restaurant";

export class RestaurantRepository implements RestaurantOut {
    async getAll(): Promise<any> {
        try {
            return await db('restaurants')
                .select('*').limit(50);
        } catch (error) {
            console.log('error', error);
            throw new DomainError('Internal Error', 500);
        }
    }

    async getById(id: string): Promise<void> {
        try {
            return await db('restaurants')
                .select('*')
                .where({ 'restaurants.id': id })
                .leftJoin('opening_days', 'restaurants.id', 'opening_days.restaurant_id')
        } catch (error) {
            console.log('error', error);
            throw new DomainError('Internal Error', 500);
        }
    }
    async create(restaurant: Restaurant): Promise<any> {
        const tx = await db.transaction();
        try {
            const { name, description, openingHours } = restaurant;
            const [ restaurantId ]: any = await db('restaurants')
                .transacting(tx)
                .returning('id')
                .insert({ id: restaurant.id, name, description })

            if(openingHours){
                await this.createOpeningHours(
                    restaurantId.id, tx, openingHours
                );
            }
            
            return await tx.commit();

        } catch (error) {
            console.log('error', error);
            await tx.rollback(error);
            throw new DomainError('Internal Error', 500);
        }
    }

    async update(restaurant: Restaurant): Promise<any> {
        const tx = await db.transaction();
        const { id, name, description, openingHours } = restaurant;
        try {
            await db('restaurants')
                .transacting(tx)
                .update({ name, description }).where({ id })

            await this.deleteOpeningHoursByRestaurantId(
                id, tx
            );

            if(openingHours){
                await this.createOpeningHours(
                    id, tx, openingHours
                );
            }

            return await tx.commit();

        } catch (error) {
            console.log('error', error);
            await tx.rollback(error);
            throw new DomainError('Internal Error', 500);
        }
    }
    async delete(id: string): Promise<void> {
        try {
            await db('restaurants')
                .del().where({ id })

        } catch (error) {
            console.log('error', error);
            throw new DomainError('Internal Error', 500);
        }
    }

    private createOpeningHours(
        restaurantId: string,
        tx: Knex.Transaction,
        openingHours: OpeningHoursDetail[],
    ) {
        return Promise.all(openingHours.map(
            async openingHour => {
                const { isOpen, opensAt, closesAt } = openingHour;

                await db('opening_days').transacting(tx)
                    .insert({
                        id: openingHour.id, 
                        day: openingHour.day, 
                        is_open: isOpen,
                        opens_at: opensAt,
                        closes_at: closesAt,  
                        restaurant_id: restaurantId
                    })
            }
        ))
    }

    async deleteOpeningHoursByRestaurantId(
        restaurantId: string,
        tx: Knex.Transaction,
    ): Promise<void> {
        try {
            await db('opening_days')
                .transacting(tx)
                .del().where({ 'restaurant_id': restaurantId })
        } catch (error) {
            console.log('error', error);
            throw new Error('Error');
        }
    }

}