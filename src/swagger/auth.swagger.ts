/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      description: Auth user
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: email of user
 *                          password:
 *                              type: string
 *                              description: password of user
 *      responses:
 *          200:
 *              description: Success and getting tokens
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Tokens'
 *          400:
 *              $ref: '#/components/responses/400'
 *          401:
 *              description: email or password are incorrect
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: error text
 *                                  default: Неверные email или пароль
 *          500:
 *              $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      description: registration of user
 *      tags: [Authentication]
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: name of user
 *                          email:
 *                              type: string
 *                              description: email of user
 *                          password:
 *                              type: string
 *                              description: password of user
 *                          passwordConfirm:
 *                              type: string
 *                              description: repeat of password
 *      responses:
 *          201:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Tokens'
 *          400:
 *              $ref: '#/components/responses/400'
 *          409:
 *              description: email is already exist
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: error text
 *                                  default: Пользователь с данным email уже существует
 *          500:
 *              $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /api/auth/logout:
 *  delete:
 *      description: logout user
 *      tags: [Authentication]
 *      parameters:
 *          - $ref: '#/components/parameters/refreshToken'
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: user is logged out
 *          403:
 *              $ref: '#/components/responses/403'
 *          500:
 *              $ref: '#/components/responses/500'
 */
