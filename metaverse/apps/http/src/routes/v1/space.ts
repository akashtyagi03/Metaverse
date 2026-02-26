import { Router } from "express";
import client from "@repo/db/";
import { userMiddleware } from "../../middleware/user";
import { AddElementSchema, CreateSpaceSchema, DeleteElementSchema } from "../../types";
export const spaceRouter = Router();

spaceRouter.post("/", userMiddleware, async (req, res) => {
    const parsedData = CreateSpaceSchema.safeParse(req.body)
    if (!parsedData.success) {
        console.log(JSON.stringify(parsedData))
        return res.status(400).json({ message: "Validation failed" })
    }

    try {
        if (!parsedData.data.mapId) {
            const space = await client.space.create({
                data: {
                    name: parsedData.data.name,
                    width: Number(parsedData.data.dimensions?.split("x")[0] ?? 0),
                    height: Number(parsedData.data.dimensions?.split("x")[1] ?? 0),
                    creatorId: req.userId!
                }
            });
            return res.status(200).json({ spaceId: space.id })
        }

        const map: any = await client.map.findFirst({
            where: {
                id: parsedData.data.mapId
            }, select: {
                width: true,
                height: true,
                map: true
            }
        })
        if (!map) {
            return res.status(400).json({ message: "Map not found" })
        }

        let space = await client.$transaction(async (tx) => {
            const space = await tx.space.create({
                data: {
                    name: parsedData.data.name,
                    width: map.width,
                    height: map.height,
                    creatorId: req.userId!,
                }
            });

            await tx.spaceElements.createMany({
                data: map.map.map((e: any) => ({
                    spaceId: space.id,
                    elementId: e.elementId,
                    x: e.x!,
                    y: e.y!
                }))
            })
            return space;
        })
        res.status(200).json({ spaceId: space.id })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

spaceRouter.delete("/element", userMiddleware, async (req, res) => {
    const parsedData = DeleteElementSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" })
        return
    }
    try {

        const spaceElement = await client.spaceElements.findFirst({
            where: {
                id: parsedData.data.id
            },
            include: {
                space: true
            }
        })
        if (!spaceElement?.space.creatorId || spaceElement.space.creatorId !== req.userId) {
            return res.status(403).json({ message: "Unauthorized" })
        }
        await client.spaceElements.delete({
            where: {
                id: parsedData.data.id
            }
        })
        res.status(200).json({ message: "Element deleted" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

spaceRouter.delete("/:spaceId", userMiddleware, async (req, res) => {
    console.log("req.params.spaceId", req.params.spaceId)
    const space = await client.space.findUnique({
        where: {
            id: req.params.spaceId as string
        }, select: {
            creatorId: true
        }
    })
    if (!space) {
        return res.status(400).json({ message: "Space not found" })
    }

    if (space.creatorId !== req.userId) {
        console.log("code should reach here")
        return res.status(403).json({ message: "Unauthorized" })
    }

    await client.space.delete({
        where: {
            id: req.params.spaceId as string
        }
    })
    return res.status(200).json({ message: "Space deleted" })
})

spaceRouter.get("/all", userMiddleware, async (req, res) => {
    const spaces = await client.space.findMany({
        where: {
            creatorId: req.userId!
        }
    });

    res.status(200).json({
        spaces: spaces.map((s: typeof spaces[number]) => ({
            id: s.id,
            name: s.name,
            thumbnail: s.thumbnail,
            dimensions: `${s.width}x${s.height}`,
        }))
    })


})

spaceRouter.post("/element", userMiddleware, async (req, res) => {
    const parsedData = AddElementSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({ message: "Validation failed" })
    }

    try {
        const space = await client.space.findUnique({
            where: {
                id: req.body.spaceId,
                creatorId: req.userId!
            }, select: {
                width: true,
                height: true
            }
        })

        if (req.body.x < 0 || req.body.y < 0 || req.body.x > space?.width! || req.body.y > space?.height!) {
            return res.status(400).json({ message: "Point is outside of the boundary" })
        }
        if (!space) {
            return res.status(400).json({ message: "Space not found" })
        }
        await client.spaceElements.create({
            data: {
                spaceId: req.body.spaceId,
                elementId: req.body.elementId,
                x: req.body.x,
                y: req.body.y
            }
        })
        return res.status(200).json({ message: "Element added" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

spaceRouter.get("/:spaceId", async (req, res) => {
    try {
        const space = await client.space.findUnique({
            where: {
                id: req.params.spaceId as string
            },
            include: {
                spaceElement: {
                    include: {
                        element: true
                    }
                },
            }
        })
        if (!space) {
            return res.status(400).json({ message: "Space not found" })
        }

        res.status(200).json({
            "dimensions": `${space.width}x${space.height}`,
            elements: space.spaceElement.map((e: typeof space.spaceElement[number]) => ({
                id: e.id,
                element: {
                    id: e.element.id,
                    imageUrl: e.element.imageUrl,
                    width: e.element.width,
                    height: e.element.height,
                    static: e.element.static
                },
                x: e.x,
                y: e.y
            })),
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})