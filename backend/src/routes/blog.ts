import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge' 
import { withAccelerate } from '@prisma/extension-accelerate';
import {sign, verify, decode} from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@100xdevs/medium-common';

// Update the JWTPayload type to be more specific
type JWTPayload = {
    id: number;  // or string, depending on what type your user IDs actually are
}

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;

    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async(c, next) => {
    const authHeader = c.req.header("Authorization")||"";
   
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user && user.id) {
            // Convert to string if your userId Variable is defined as string
            c.set("userId", String(user.id));
            await next();
        } else {
            c.status(403);
            return c.json({ error: "Invalid token" });
        }
    } catch (e) {
        c.status(401);
        return c.json({ error: "Invalid or expired token" });
    }
});

blogRouter.post("/", async(c) => {
    const body = await c.req.json();
    const {success} =  createBlogInput.safeParse(body);
      if(!success){
        return c.json({
          message: "Inputs not correct",
        })
      }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: c.env.DATABASE_URL
            }
        }
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data: {
            title: body.title, 
            content: body.content, 
            authorId: Number(authorId)
        }
    })

    
    
    return c.json({
        id: blog.id
    })
  })
  
blogRouter.put("/", async(c) => {
    const body = await c.req.json();
    const {success} =  updateBlogInput.safeParse(body);
      if(!success){
        return c.json({
          message: "Inputs not correct",
        })
      }
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: c.env.DATABASE_URL
            }
        }
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });
        return c.json({ id: blog.id });
    } catch (e) {
        c.status(500);
        return c.json({ error: "Error updating blog" });
    } finally {
        await prisma.$disconnect();
    }
});


blogRouter.get("/bulk", async(c) => {
    
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: c.env.DATABASE_URL
            }
        }
    }).$extends(withAccelerate())

    try{
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true,
                }
            }
        }
    });

    return c.json(blogs);
    
  }  catch (e) {
        console.log(e);
        c.status(411);}
  })


blogRouter.get("/:id", async(c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: c.env.DATABASE_URL
            }
        }
    }).$extends(withAccelerate())

    try {
        const blog=await prisma.blog.findFirst({
            where:{
                id:Number(id)
            }, select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        
        if (!blog) {
            c.status(404);
            return c.json({ error: "Blog not found" });
        }
        
        return c.json(blog);
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.json({
            error: "Error fetching blog"
        });
    } finally {
        await prisma.$disconnect();
    }
});

  //pagination
  