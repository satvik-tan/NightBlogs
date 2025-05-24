
import { BlogCard } from "../components/BlogCard"

export const Blog = () => {
    return(
        <div>
          <BlogCard
            authorName={"Satvik Tandon"}
            title={"This is a blog"}
            content={"Hey, Jude, don't make it bad. Take a sad song and make it better. Remember to let her into your heart. Then you can start to make it better."}
            publishedDate={"2023-10-01"} 
            id={1}/>
        </div>
    )
}