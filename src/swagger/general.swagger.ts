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
 *                                  default: В доступе отказано
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
