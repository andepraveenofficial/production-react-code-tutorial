import React from "react";
import { IUser } from "../App";

const BasicComponentPattern: React.FC<{ user: IUser }> = ({ user }) => {
	return (
		<div className="p-4 w-1/2 bg-orange-500 rounded-md">
			<div>
				<h1 className="text-2xl font-bold text-white">Card Title</h1>
			</div>
			<div>
				<p className="text-green-500 font-bold">Card Content</p>
				<div className="border p-2">
					<p>UserName : {user.name}</p>
					<p>UserAge : {user.age}</p>
				</div>
			</div>
			<div>
				<p className="text-blue-500 font-bold">Card Footer</p>
			</div>
		</div>
	);
};

export default BasicComponentPattern;
