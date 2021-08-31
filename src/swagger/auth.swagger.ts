/**
 * @swagger
 * components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  id:
 *                      type: string
 *                      description: id of user
 *                  email:
 *                      type: string
 *                      description: email of user
 *                  name:
 *                      type: string
 *                      description: name of user
 *          Tokens:
 *              type: object
 *              properties:
 *                  accessToken:
 *                      type: string
 *                      description: access token
 *                  refreshToken:
 *                      type: string
 *                      description: refresh token
 *      parameters:
 *          refreshToken:
 *              in: header
 *              name: x-refresh
 *              schema:
 *                  type: string
 *                  description: refresh token
 *          accessToken:
 *              x-access-token:
 *                  description: new access token if old is not valid
 *                  schema:
 *                      type: string
 *      responses:
 *          403:
 *              description: Access is denied
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: error text
 *          400:
 *              description: Validation errors
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              errors:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          msg:
 *                                              type: string
 *                                              description: message of error
 *                                              default: Неверный формат email
 *                                          param:
 *                                              type: string
 *                                              description: param name
 *                                              default: email
 *                                          location:
 *                                              type: string
 *                                              description: location in query
 *                                              default: body
 *          500:
 *              description: Error from server
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  default: Ой ой.. Ошибка на сервере
 */

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
 */
