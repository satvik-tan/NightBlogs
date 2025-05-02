import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge' 
import { withAccelerate } from '@prisma/extension-accelerate';
import {sign, verify, decode} from 'hono/jwt'
import {signupInput, signinInput} from '@100xdevs/medium-common'
// import { signupInput } from '../zod';

export const userRouter = new Hono<
    {
        Bindings: {
            DATABASE_URL: string;
            JWT_SECRET: string;
        }
    }>();

//zod , password hashing
userRouter.post("/signup", async (c) => {
  
  
  const body = await c.req.json();
  const {success} =  signupInput.safeParse(body);
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
  }).$extends(withAccelerate())

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username, 
        password: body.password,
        name: body.name,
         
      },
    });
    

    const jwt = await sign({
      id: user.id,
    }, c.env.JWT_SECRET, )
    return c.text(jwt)
    
    
  } catch(e: String | any) {
    console.error("Signup error:", e);  // Log the actual error
    
    // Return different status codes based on error type
    if (e.code === 'P2002') {
      // P2002 is Prisma's error code for unique constraint violation
      c.status(409);  // Conflict
      return c.json({ error: "Username already exists" });
    }
    
    c.status(500); 
    return c.json({ error: "Something went wrong" });
  }
})

userRouter.post("/signin", async (c) => {
  
  
  const body = await c.req.json();
  const {success} =  signinInput.safeParse(body);
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
  }).$extends(withAccelerate())

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username, 
        password: body.password,
         
      },
    });

    if(!user){
     c.status(403);
     return c.json({ error: "Invalid credentials" });

    }
    

    const jwt = await sign({
      id: user.id,
    }, c.env.JWT_SECRET, )
    return c.text(jwt)
    
    
  } catch(e: String | any) {
    console.error("Signup error:", e);  // Log the actual error
    
    // Return different status codes based on error type
    if (e.code === 'P2002') {
      // P2002 is Prisma's error code for unique constraint violation
      c.status(409);  // Conflict
      return c.json({ error: "Username already exists" });
    }
    
    c.status(500); 
    return c.json({ error: "Something went wrong" });
  }
})
