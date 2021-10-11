const swaggerConfig = {
  swagger: '2.0',
  info: {
    title: 'Students Lab',
    description: 'Game Store',
    version: '1.0.0',
    contact: {
      name: 'Ilya Istomin',
      email: 'ilyaistomin.888@yandex.ru',
    },
  },
  tags: [
    {
      name: 'Products',
      description: 'Everything about games',
    },
    {
      name: 'Categories',
      description: 'Everything about games categories',
    },
    {
      name: 'Accounts',
      description: 'Everything about accounts',
    },
    {
      name: 'Auth',
      description: 'Everything about authentication',
    },
  ],
  servers: [
    {
      url: 'http://localhost:3000', // url
      description: 'Local server', // name
    },
  ],
  schemes: ['http', 'https'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  paths: {
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'Get all game products',
        description: '',
        operationId: 'getProducts',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/Product',
            },
          },
          404: {
            description: 'Product not found',
          },
        },
      },
      post: {
        tags: ['Products'],
        summary: 'Add new product',
        description: '',
        operationId: 'addProduct',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Product object that needs to be added to the store',
            required: true,
            schema: {
              $ref: '#/definitions/Product',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          400: {
            description: 'Wrong parameters',
          },
        },
      },
    },
    '/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Get all game categories',
        description: '',
        operationId: 'getCategories',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/Category',
            },
          },
          404: {
            description: 'Category not found',
          },
        },
      },
      post: {
        tags: ['Categories'],
        summary: 'Add new category',
        description: '',
        operationId: 'addCategory',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Category object that needs to be added to the store',
            required: true,
            schema: {
              $ref: '#/definitions/Category',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          400: {
            description: 'Wrong parameters',
          },
        },
      },
    },
    '/register': {
      post: {
        tags: ['Accounts'],
        summary: 'Add new account',
        description: '',
        operationId: 'addAccount',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Category object that needs to be added to the store',
            required: true,
            schema: {
              type: 'object',
              required: ['username', 'password', 'lastName', 'firstName'],
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
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          400: {
            description: 'Wrong parameters',
          },
          409: {
            description: 'This user is exists',
          },
        },
      },
    },
    '/profile': {
      put: {
        tags: ['Accounts'],
        security: [
          {
            Bearer: [],
          },
        ],
        summary: 'Update account',
        description: '',
        operationId: 'updateAccount',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'New data for the account',
            required: true,
            schema: {
              type: 'object',
              required: ['username', 'firstName', 'lastName'],
              properties: {
                firstName: {
                  type: 'string',
                  example: 'Ilya',
                },
                lastName: {
                  type: 'string',
                  example: 'Istomin',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          401: {
            description: 'Wrong bearer token',
          },
          400: {
            description: 'Something Wrong',
          },
        },
      },
    },
    '/profile/password': {
      post: {
        tags: ['Accounts'],
        security: [
          {
            Bearer: [],
          },
        ],
        summary: 'Update account password',
        description: '',
        operationId: 'updateAccountPassword',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Username and new password',
            required: true,
            schema: {
              type: 'object',
              required: ['newPassword', 'oldPassword'],
              properties: {
                oldPassword: {
                  type: 'string',
                  example: 'oldPassword',
                },
                newPassword: {
                  type: 'string',
                  example: 'newPassword',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          401: {
            description: 'Wrong bearer token',
          },
          400: {
            description: 'Something Wrong',
          },
        },
      },
    },
    '/authenticate': {
      post: {
        tags: ['Auth'],
        summary: 'Authenticate',
        description: '',
        operationId: 'authenticate',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Authenticate account and getting access and refresh tokens',
            required: true,
            schema: {
              type: 'object',
              required: ['username', 'password'],
              properties: {
                username: {
                  type: 'string',
                  example: 'stmnl',
                },
                password: {
                  type: 'string',
                  example: 'password',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              type: 'object',
              properties: {
                accessToken: {
                  type: 'string',
                },
                refreshToken: {
                  type: 'string',
                },
              },
            },
          },
          401: {
            description: 'Wrong username or password',
          },
          400: {
            description: 'Something Wrong',
          },
        },
      },
    },
    '/token': {
      post: {
        tags: ['Auth'],
        summary: 'Refreshing Access and Refresh tokens',
        description: '',
        operationId: 'refreshingTokens',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Need a refresh token',
            required: true,
            schema: {
              type: 'object',
              required: ['refreshToken'],
              properties: {
                refreshToken: {
                  type: 'string',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              type: 'object',
              properties: {
                accessToken: {
                  type: 'string',
                },
                refreshToken: {
                  type: 'string',
                },
              },
            },
          },
          401: {
            description: 'Wrong username or password',
          },
          400: {
            description: 'Something Wrong',
          },
        },
      },
    },
  },
  definitions: {
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
        categories: {
          type: 'array',
          items: {
            type: ['number', 'string'],
          },
          example: '[1,2]',
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
};
export default swaggerConfig;
