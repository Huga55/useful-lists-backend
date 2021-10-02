/**
 * @swagger
 * /api/section:
 *  get:
 *      description: get all sections of user
 *      tags: [Section]
 *      parameters:
 *          - $ref: '#/components/parameters/refreshToken'
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: get all sections
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Section'
 *          403:
 *              $ref: '#/components/responses/403'
 *          500:
 *              $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /api/section:
 *  post:
 *      description: create new section
 *      tags: [Section]
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
 *                              description: name of new section
 *                              default: My own section
 *      responses:
 *          200:
 *              description: get new section
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Section'
 *          400:
 *              $ref: '#/components/responses/400'
 *          403:
 *              $ref: '#/components/responses/403'
 *          405:
 *              description: limit of section is exceeded
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  default: Доступный лимит разделов 15
 *          409:
 *              description: section with this name is already exist
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  default: Раздел с данным названием уже существует
 *          500:
 *              $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /api/section:
 *  put:
 *      description: change name of section
 *      tags: [Section]
 *      parameters:
 *          - $ref: '#/components/parameters/refreshToken'
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                              description: id of section
 *                          name:
 *                              type: string
 *                              description: new name of section
 *      responses:
 *          200:
 *              description: section is changed
 *          400:
 *              $ref: '#/components/responses/400'
 *          403:
 *              $ref: '#/components/responses/403'
 *          404:
 *              description: section was not defined
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  default: Секция не найдена
 *          409:
 *              description: section with this name is already exist
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  default: Раздел с данным названием уже существует
 *          500:
 *              $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /api/section:
 *  delete:
 *      description: delete section and its notes
 *      tags: [Section]
 *      parameters:
 *          - $ref: '#/components/parameters/refreshToken'
 *          - in: path
 *            name: _id
 *            required: true
 *            schema:
 *              type: string
 *            description: id of section
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: section and its notes were deleted
 *          404:
 *              description: section was not defined
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  default: Секция не найдена
 *          403:
 *              $ref: '#/components/responses/403'
 *          500:
 *              $ref: '#/components/responses/500'
 */
