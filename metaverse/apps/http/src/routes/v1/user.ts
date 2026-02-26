import { Router } from "express";
import { UpdateMetadataSchema } from "../../types";
import client from "@repo/db/";
import { userMiddleware } from "../../middleware/user";

export const userRouter = Router();

userRouter.post("/metadata", userMiddleware, async (req, res) => {
    const parsedData = UpdateMetadataSchema.safeParse(req.body)       
    if (!parsedData.success) {
        return res.status(400).json({message: "Validation failed"})
    }
    if (!req.userId) {
        return res.status(401).json({message: "Unauthorized"})
    }
    try {
        const updateavatar = await client.user.update({
            where: {
                id: req.userId
            },
            data: {
                avatarId: parsedData.data.avatarId
            }
        })
        res.status(200).json({message: "Metadata updated", updateavatar})
    } catch(e) {
        console.error("error", e)
        res.status(400).json({message: "Internal server error"})
    }
})

userRouter.get("/metadata/bulk", async (req, res) => {
    const userIdString = (req.query.ids ?? "[]") as string;
    const userIds = (userIdString).slice(1, userIdString?.length - 1).split(",");
    const metadata = await client.user.findMany({
        where: {
            id: {
                in: userIds
            }
        }, select: {
            avatar: true,
            id: true
        }
    })

    res.status(200).json({
        avatars: metadata.map((m: typeof metadata[number]) => ({
            userId: m.id,
            avatarId: m.avatar?.imageUrl
        }))
    })
})