/**
 * @swagger
 * /api/user/info:
 *  get:
 *      description: get user's info
 *      tags: [User]
 *      parameters:
 *          - $ref: '#/components/parameters/refreshToken'
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              $ref: '#/components/responses/400'
 *          403:
 *              $ref: '#/components/responses/403'
 *          500:
 *              $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /api/user/info:
 *  put:
 *      description: change user's info
 *      tags: [User]
 *      parameters:
 *          - $ref: '#/components/parameters/refreshToken'
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: new user's name
 *                              default: newName
 *      responses:
 *          200:
 *              description: success, get new user's info
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: new user's name
 *                                  default: newName
 *          400:
 *              $ref: '#/components/responses/400'
 *          403:
 *              $ref: '#/components/responses/403'
 *          409:
 *              description: this info props is already exist
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: text error
 *                                  default: Пользователь с данным имененм уже существует
 *          500:
 *              $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /api/user/password:
 *  put:
 *      description: change user's password
 *      tags: [User]
 *      parameters:
 *          - $ref: '#/components/parameters/refreshToken'
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          oldPassword:
 *                              type: string
 *                              description: old user's password
 *                              default: 123456
 *                          password:
 *                              type: string
 *                              description: new user's password
 *                              default: new123456
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              $ref: '#/components/responses/400'
 *          403:
 *              $ref: '#/components/responses/403'
 *          404:
 *              description: oldPassword is invalid
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: text error
 *                                  default: Неверно введен пароль
 *          500:
 *              $ref: '#/components/responses/500'
 */
