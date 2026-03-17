import { Router } from 'express';

const routes = (controller) => {
  const router = Router();

  /**
   * @swagger
   * /authentications:
   *   post:
   *     summary: POST authentications
   *     description: Test
   *     tags:
   *       - auth
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
   *                     accessToken:
   *                       type: string
   *                     refreshToken:
   *                       type: string
   */
  router.post('/authentications', controller.postAuthentication);
  /**
   * @openapi
   * /authentications:
   *   put:
   *     summary: PUT authentications
   *     description: Test
   *     tags:
   *       - auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
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
   *                     accessToken:
   *                       type: string
   */
  router.put('/authentications', controller.putAuthentication);
  /**
   * @openapi
   * /authentications:
   *   delete:
   *     summary: DELETE authentications
   *     description: Test
   *     tags:
   *       - auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
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
   */
  router.delete('/authentications', controller.deleteAuthentication);

  return router;
}

export default routes;