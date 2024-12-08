import { createContext, PropsWithChildren, useContext } from "react";

/* -----> Context <----- */

type User = {
	name: string;
	age: number;
};

type UserContext = {
	user: User;
};

const UserContext = createContext<UserContext | undefined>(undefined);

const useUserContext = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error(
			"useUserContext must be used within a ComponentCompoundPattern"
		);
	}

	return context;
};

/* -----> Component <----- */

type CompoundComponentPattern = PropsWithChildren & {
	user: User;
};

// Define the main component as a function component with children as props.
const CompoundComponentPattern = ({
	children,
	user,
}: CompoundComponentPattern) => (
	<UserContext.Provider value={{ user }}>
		<div className="p-4 w-1/2 bg-orange-500 rounded-md">{children}</div>
	</UserContext.Provider>
);
// Static child components as functions
const Title = () => {
	return (
		<div>
			<h1 className="text-2xl font-bold text-white">Card Title</h1>
		</div>
	);
};

const Content = () => {
	const context = useUserContext();

	console.log(context);

	const { user } = context;

	return (
		<div>
			<p className="text-green-500 font-bold">Card Content</p>
			<div className="border p-2">
				<p>UserName: {user.name}</p>
				<p>UserAge: {user.age}</p>
			</div>
		</div>
	);
};

const Footer = () => {
	return (
		<div>
			<p className="text-blue-500 font-bold">Card Footer</p>
		</div>
	);
};

// Attach the child components as static properties to the main component
CompoundComponentPattern.Title = Title;
CompoundComponentPattern.Content = Content;
CompoundComponentPattern.Footer = Footer;

export default CompoundComponentPattern;
