import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post("/api/v1/signup", (c) => {
  return c.text("signup route")
})

app.post("/api/v1/signin", (c)=> {
  return c.text("signin route")
})

app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id")
  
  return c.text(`blog ${id}`)
})

app.get("/api/v1/blog", (c) => {
  return c.text("blog route")
})



export default app;
