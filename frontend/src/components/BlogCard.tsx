import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate:string
    id:number
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div className="p-4 flex flex-col border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer ">
        <div className="flex">
            <div>
                <Avatar authorName={authorName} />
            </div>
            <div className="pl-2 pt-1">
                <div className="flex flex-row">
                    <div className="text-md flex justify-center">
                        {authorName}
                    </div>
                    <div className="pl-2 flex justify-center pt-1">
                        <Circle />
                    </div>
                    <div className="pl-2 text-md flex justify-center">
                        {publishedDate}
                    </div>
                </div>

            </div>
        </div>
        <div className="text-xl font-bold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0, 200) + "....."}
        </div>
        <div className="pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
        
    </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400 mt-2">

    </div>
}
export function Avatar({ authorName, size = "small" }: { authorName: string, size?: "small" | "big" }) {
    return <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className={`${size === "small" ? "text-xs" : "text-md" }font-medium text-gray-600 dark:text-gray-300`}>{authorName.split('')[0]}</span>
    </div>
}