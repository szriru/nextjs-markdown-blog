import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
    let passed = false;
    if (req.body.password == "123") {
        passed = true
    }
    if (req.method == "POST" && passed) {
        const createPost = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                published: true,
                userId: 1
            }
        })
        console.log(createPost)
        res.status(201).json({createPost, status: 201});
    } else {
        res.status(403).json({status: 403})
    }
};

export default post;