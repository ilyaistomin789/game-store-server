const swaggerConfig = {
  openapi: '3.0.3', // present supported openapi version
  info: {
    title: 'Students Lab', // short title.
    description: 'Game Store', //  desc.
    version: '1.0.0', // version number
    contact: {
      name: 'Ilya Istomin', // your name
      email: 'ilyaistomin.888@yandex.ru', // your email
    },
  },
  servers: [
    {
      url: 'http://localhost:3000', // url
      description: 'Local server', // name
    },
  ],
  components: {
    schemas: {
      Product: {
        type: 'object',
        properties: {
          displayName: {
            type: 'string',
            example: 'CS: GO',
          },
          price: {
            type: 'number',
            example: '29.99',
          },
          totalRating: {
            type: 'number',
            example: '88',
          },
        },
      },
      Category: {
        type: 'object',
        properties: {
          displayName: {
            type: 'string',
            example: 'Action',
          },
        },
      },
      Account: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            example: 'stmnl',
          },
          firstName: {
            type: 'string',
            example: 'Ilya',
          },
          lastName: {
            type: 'string',
            example: 'Istomin',
          },
          password: {
            type: 'string',
            example: 'password',
          },
          role: {
            type: 'string',
            example: 'buyer | admin',
          },
        },
      },
    },
  },
};

export default swaggerConfig;
