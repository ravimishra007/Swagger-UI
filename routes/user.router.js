// user routes (GET, POST, PATCH, DELETE) => /routes/User.routes.js
const express=require("express")
const { UserModel } = require("../model/userSchema")
const userRouter=express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         age:
 *           type: integer
 *           description: Age of the user
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: All the API routes related to User
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: This will get all the user data from the database
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: The list of all the users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: "#/components/schemas/User"
 *          400:
 *              description: Cannot fulfill the request          
 */              

userRouter.get("/",async (req,res)=>{
    const users=await UserModel.find()
    res.send(users)
})


/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: To post the details of a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Cannot fulfill the request. 
 *       500:
 *         description: Some server error.
 */

userRouter.post("/create",async (req,res)=>{
    const payload=req.body
    const user=new UserModel(payload)
    await user.save()
    res.send({"msg":"New User has been created"})
})



/**
 * @swagger
 * /users/update/{id}:
 *  patch:
 *    summary: It will update the user details
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user Details has been updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

userRouter.patch("/update/:id",async (req,res)=>{
    const id=req.params.id
    const payload=req.body
    await UserModel.findByIdAndUpdate({_id:id},payload)
    res.send({"msg":"User details have been updated"})
})




/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

userRouter.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id
    await UserModel.findByIdAndDelete({_id:id})
    res.send({"msg":"User has been deleted"})
})

module.exports={
    userRouter
}
