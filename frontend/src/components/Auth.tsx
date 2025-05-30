import { Link, useNavigate } from "react-router-dom"
import {  useState } from "react";
import {SignupInput} from "@100xdevs/medium-common"
import { BACKEND_URL } from "../config.ts";
import axios from "axios";

export const Auth = ({type}: {type: "signup"| "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] =  useState<SignupInput>({
        name: "",
        username: "",
        password: "", 
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            console.log(response);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }
        catch(err){
            console.log(err);
            alert("Error signing in");
            
        }

    }

    return (
        <div className="h-screen flex justify-center flex-col ">
            <div className="flex justify-center" >
                <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an Account
                    </div>

                    <div  className="text-slate-400">
                        {type === "signin" ? "Don't have an account" : "Already have an Account?"}
                        <Link className="pl-2 underline" to={type === "signin" ?"/signup" :"/signin"}>{type === "signin" ? "Signup" : "Signin"}</Link> 
                         
                    </div>
                    </div>
                
                <div className="pt-8 ">
                {type === "signup" ? <LabelledInput label = "Name" placeholder="Enter your name" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }} /> : null}
                <LabelledInput label = "Username" placeholder="Enter your username" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        username: e.target.value
                    })
                }} />
                <LabelledInput type = "password" label = "Password" placeholder="Enter your password" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                    
                }} />
                 <button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>



           </div>
        </div>
        </div>
    )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type? : string
    

}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4 text-left">{label}</label>
        <input  onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}