import { Router } from 'express';

const routes = (controller) => {
  const router = Router();
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: POST users
   *     description: Test
   *     tags:
   *       - user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *               fullname:
   *                 type: string
   *     responses:
   *       200:
   *         description: success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 data:
   *                   type: object
   *                   properties:
   *                     addedUser:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: string
   *                         username:
   *                           type: string
   *                         fullname:
   *                           type: string
   */
  router.post('/users', controller.postUser);

  return router;
};

export default routes;