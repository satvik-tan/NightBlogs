import { Link } from "react-router-dom"
import { NavBar } from "../components/Navbar"


export const Landing=()=>{
    return <div>
        <div>
            <NavBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 pt-10  ">
            <div className="flex flex-col justify-center">

            <div className="flex flex-row align-items-center text-7xl  pl-10 my-font ">
                Human Stories & ideas
            </div>

            <div className="flex pl-10 pt-6 text-2xl">
                A place to read, write, and deepen your understanding
            </div>

            <Link to={"/signup"}>
            <div className="pt-15 pr-5 flex justify-center ">
                <button type="button" className="cursor-pointer bg-black text-white text-2xl rounded-4xl p-5 m-5 ">Start reading</button>
            </div>
            </Link>
            </div>

            <div className="flex pr-5 ">
                <img src="/nightBlog.jpg" />
            </div>
        </div>
    </div>
}