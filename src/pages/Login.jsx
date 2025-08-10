import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth , db } from "../components/Firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [ confirmPassword, setConfirmPassword ] = useState( "" );
	const [firstName, setFirstName] = useState("");
	const [ lastName, setLastName ] = useState( "" );	

	const handleLogin = async (e) => {
		e.preventDefault();
		console.log( "Logging in with:", { email, password } );
		// Implement login logic here
		try {
			await signInWithEmailAndPassword(auth, email, password);
			const user = auth.currentUser;
			console.log("User logged in:", user);
			toast.success("Login successful!", {
				position: "top-center",
			});
		} catch (error) {
			console.error("Error logging in:", error);
			toast.error("Login failed: " + error.message, {
				position: "top-center",
			});
		}
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}
		console.log( "Registering with:", { email, password } );
		try {
			await createUserWithEmailAndPassword( auth, email, password );
			const user = auth.currentUser;
			if ( user )
			{
				await setDoc(doc(db, "users", user.uid), {
					email: user.email,
					firstName: firstName,
					lastName: lastName
				});
			}
			console.log("User registered:", user);
			
			toast.success( "Registration successful!", {
				position: "top-center",
			} );
			
			// Optionally, redirect or clear form
			setEmail( "" );
			setPassword( "" );
			setConfirmPassword( "" );
			setFirstName( "" );
			setLastName( "" );

			// Redirect to login or home page



		} catch (error) {
			console.error("Error registering user:", error);
			alert("Registration failed: " + error.message);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="h-auto w-[30rem] bg-blue-200 rounded-2xl flex flex-col items-center p-6 shadow-lg">
				{/* Tab Switcher */}
				<div className="relative flex justify-around items-center w-11/12 h-12 bg-white rounded-2xl overflow-hidden">
					<div
						className={`absolute top-0 left-0 h-full w-1/2 bg-blue-400 rounded-2xl transition-transform duration-300 ease-in-out
							${isLogin ? "translate-x-0" : "translate-x-full"}`}
					></div>
					<div
						className="relative z-10 w-1/2 h-full flex justify-center items-center hover:cursor-pointer font-bold"
						onClick={() => setIsLogin(true)}
					>
						Login
					</div>
					<div
						className="relative z-10 w-1/2 h-full flex justify-center items-center hover:cursor-pointer font-bold"
						onClick={() => setIsLogin(false)}
					>
						Register
					</div>
				</div>

				{/* Form Content */}
				<div className="w-full flex justify-center items-center mt-6">
					{isLogin ? (
						<form
							className="flex flex-col gap-4 w-11/12"
							onSubmit={handleLogin}
						>
							{/* Email */}
							<div className="flex items-center bg-white rounded-2xl px-3 py-2 shadow">
								<img
									src="/icons8-email-60.png"
									alt="Email"
									className="h-6 w-6 mr-3"
								/>
								<input
									type="email"
									placeholder="Email"
									className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							{/* Password */}
							<div className="flex items-center bg-white rounded-2xl px-3 py-2 shadow">
								<img
									src="/icons8-lock-80.png"
									alt="Lock"
									className="h-6 w-6 mr-3"
								/>
								<input
									type="password"
									placeholder="Password"
									className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								className="w-full bg-blue-500 text-white py-2 rounded-2xl font-bold hover:bg-blue-600 transition-all duration-300"
							>
								Login
							</button>
						</form>
					) : (
						<form
							className="flex flex-col gap-4 w-11/12"
							onSubmit={handleRegister}
						>
							{/* First Name */}
							<div className="flex items-center bg-white rounded-2xl px-3 py-2 shadow">
								<img
									src="public/icons8-human-40.png"
									alt="Email"
									className="h-6 w-6 mr-3"
								/>
								<input
									type="name"
									placeholder="First Name"
									className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>

							{/* Last Name */}

							<div className="flex items-center bg-white rounded-2xl px-3 py-2 shadow">
								<img
									src="public/icons8-human-40.png"
									alt="Email"
									className="h-6 w-6 mr-3"
								/>
								<input
									type="name"
									placeholder="Last Name"
									className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>

							{/* Email */}
							<div className="flex items-center bg-white rounded-2xl px-3 py-2 shadow">
								<img
									src="/icons8-email-60.png"
									alt="Email"
									className="h-6 w-6 mr-3"
								/>
								<input
									type="email"
									placeholder="Email"
									className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							{/* Password */}
							<div className="flex items-center bg-white rounded-2xl px-3 py-2 shadow">
								<img
									src="/icons8-lock-80.png"
									alt="Lock"
									className="h-6 w-6 mr-3"
								/>
								<input
									type="password"
									placeholder="Password"
									className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							{/* Confirm Password */}
							<div className="flex items-center bg-white rounded-2xl px-3 py-2 shadow">
								<img
									src="/icons8-lock-80.png"
									alt="Lock"
									className="h-6 w-6 mr-3"
								/>
								<input
									type="password"
									placeholder="Confirm Password"
									className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								className="w-full bg-blue-500 text-white py-2 rounded-2xl font-bold hover:bg-blue-600 transition-all duration-300"
							>
								Register
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
