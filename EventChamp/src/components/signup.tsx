import { useState } from "react";

const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [passwordConfirm, setPasswordConfirm] = useState("");


function onSignUp(e: React.FormEvent) {
    e.preventDefault();
    console.log(username, email, password, passwordConfirm);
}

export function SignUp(){
    return(
        <div id="accountSignup">
            <a className="text-lg">Sign Up</a>
            <form onSubmit={onSignUp} className="flex flex-col items-center space-y-3 pt-5">
                <input
                    id="usernameInput"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-64 p-2 border bg-white placeholder-black text-black rounded shadow-sm`}
                    required
                />
                <input
                    id="emailInput"
                    type="email"
                    placeholder="Enter your email"
                    value={email}   
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-64 p-2 border bg-white placeholder-black text-black rounded shadow-sm`}
                    required
                />
                <input
                    id="passwordInput"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-64 p-2 border bg-white placeholder-black text-black rounded shadow-sm`}
                    required
                />
                <input
                    id="passwordConfirmInput"
                    type="password"
                    placeholder="Confirm your password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className={`w-64 p-2 border bg-white placeholder-black text-black rounded shadow-sm`}
                    required
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition shadow-sm"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
