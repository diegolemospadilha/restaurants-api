import { FastifySchema } from 'fastify';


export const restaurantIdSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Restaurant id',
    }
  }
}

export const dateTimeSchema = {
  type: 'object',
  properties: {
    datetime: {
      type: 'string',
      description: 'Date to be searched',
    }
  }
}

export const restaurantBaseSchema = {
    name: { type: 'string', example: 'Churros Top 10' },
    description: { type: 'string', example: 'Venda de churros top 10' },
}

export const restaurantFullBaseSchema = {
    ...restaurantBaseSchema,
    openingHours: {
        type: 'array',
        items: {
          type: 'object',
          properties:{
            dayOfWeek: {type: 'number', description: 'Day of week in number format [0-6]', example: '0'},
            isOpen: {type: 'boolean', description: 'Value related if restaurant is open in day', example: 'true'},
            opensAt: {type: 'string', description: 'Opening hours of the restaurant that day (0-24) format', example: '12:00:00'},
            closesAt: {type: 'string', description: 'Closing hours of the restaurant that day (0-24) format', example: '18:00:00'}
        }
    }}
}
export const restaurantNotFoundBaseSchema = {
    description: 'Restaurant not found',
    type: 'object',
    properties: {
        message: { type: 'string', example: 'Restaurant not found with id: ebdbf91a-051c-4548-a964-0af9b5242db6' },
    }  
}

export const internalServerErrorBaseSchema = {
    description: 'Application internal error',
    type: 'object',
    properties: {
        message: { type: 'string', example: 'Internal Server Error' },
    }  
}

export const postRestaurantsDoc: FastifySchema = {
    body: {
        type: 'object',
        properties: { ...restaurantFullBaseSchema },
    },
    response: {
      [201]: {
        description: 'Success Response',
        type: 'object',
        properties: { 
          id: { type: 'string', example: '656bf549-935f-48ec-82d4-c9dd619bce00' },
          ...restaurantFullBaseSchema, 
        }   
      },
      [500]: internalServerErrorBaseSchema
    },
}

export const updateRestaurantsDoc: FastifySchema = {
  params: restaurantIdSchema,
  body: {
      type: 'object',
      properties: { ...restaurantFullBaseSchema },
  },
  response: {
    [200]: {
      description: 'Restaurant updated successfully',
      type: 'object',
      properties: { 
        id: { type: 'string', example: '656bf549-935f-48ec-82d4-c9dd619bce00' },
        ...restaurantFullBaseSchema, 
      }   
    },
    [404]: restaurantNotFoundBaseSchema,
    [500]: internalServerErrorBaseSchema
  },
}

export const getRestaurantsDoc: FastifySchema = {
    response: {
      [200]: {
        description: 'Success Response',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '656bf549-935f-48ec-82d4-c9dd619bce00' },
            ...restaurantBaseSchema}  
          }
      },
      [500]: internalServerErrorBaseSchema
    },
  };

export const getByIdRestaurantsDoc: FastifySchema = {
    params: restaurantIdSchema,
    response: {
      [200]: {
        description: 'Success Response',
        type: 'object',
        properties: {
          id: { type: 'string', example: '656bf549-935f-48ec-82d4-c9dd619bce00' },
          ...restaurantFullBaseSchema
        }   
      },
      [404]: restaurantNotFoundBaseSchema,
      [500]: internalServerErrorBaseSchema
    },
  };

  export const deleteRestaurantsDoc: FastifySchema = {
    params: restaurantIdSchema,
    response: {
      [204]: {
        description: 'Restaurant deleted successfully',
        type:'null',
      },
      [500]: internalServerErrorBaseSchema
    },
  };

  export const isOpenRestaurantsDoc: FastifySchema = {
    params: restaurantIdSchema,
    querystring: { ...dateTimeSchema },
    response: {
      [200]: {
        description: 'Success Response',
        type: 'object',
        properties: {
            isOpen: { type: 'boolean', example: 'true' },
        }   
      },
      [404]: restaurantNotFoundBaseSchema,
      [500]: internalServerErrorBaseSchema
    },
  };