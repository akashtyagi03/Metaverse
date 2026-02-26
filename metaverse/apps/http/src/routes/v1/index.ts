import { Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";
import { LoginSchema, SignupSchema } from "../../types";
import {hash, compare} from "../../scrypt";
import jwt  from "jsonwebtoken";
import { JWT_SECRET } from "../../config";
import client from "@repo/db/";

export const router = Router();

router.get("/checkserver", (req, res) => {  
    res.json({
        message: "server running successfully"
    })
})

router.post("/signup", async (req, res) => {
    const validate = SignupSchema.safeParse(req.body)
    if (!validate.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: validate.error
        })
    }
    try {
        const hashedPassword = await hash(validate.data.password) // TODO: hash the password before storing
        const user = await client.user.create({
            data: {
                username: validate.data.username,
                password: hashedPassword,
                role: validate.data.type === "admin" ? "Admin" : "User"
            }
        })
        res.status(200).json({
            userId: user.id,
            message: "User created successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
})

router.post("/login", async (req, res) => {
    const validate = LoginSchema.safeParse(req.body)
    if (!validate.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: validate.error
        })
    }

    try {
        const user = await client.user.findUnique({
            where: {
                username: validate.data.username
            }
        })
        if (!user) {
            return res.status(400).json({
                message: "Invalid username or password"
            })
        }
        const isPasswordValid = await compare(validate.data.password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid username or password"
            })
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET)

        res.json({
            token,
            message: "Login successful"
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
})

router.get("/elements", async (req, res) => {
    const elements = await client.element.findMany()

    res.json({elements: elements.map(e => ({
        id: e.id,
        imageUrl: e.imageUrl,
        width: e.width,
        height: e.height,
        static: e.static
    }))})
})

router.get("/avatars", async (req, res) => {
    const avatars = await client.avatar.findMany()
    res.json({avatars: avatars.map(x => ({
        id: x.id,
        imageUrl: x.imageUrl,
        name: x.name
    }))})
})

router.use("/users", userRouter)
router.use("/spaces", spaceRouter)
router.use("/admin", adminRouter)