import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 }
	]);
	const [searchTerm, setSearchTerm] = useState("");
	const [newName, setNewName] = useState("");
	const [newPhoneNumber, setNewPhoneNumber] = useState("");

	const addName = (event) => {
		event.preventDefault();

		const nameExists = persons.some(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		);

		if (nameExists) {
			alert(`${newName} is already added to the phonebook`);
			return;
		};

		const nameObject = {
			name: newName,
			number: newPhoneNumber,
			id: persons.length + 1,
		};

		setPersons(persons.concat(nameObject));
		setNewName("");
		setNewPhoneNumber("");
	};

	const personsToShow = persons.filter(person =>
		person.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	}

	const handleNewPhoneNumber = (event) => {
		setNewPhoneNumber(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter 
				value={searchTerm} 
				onChange={handleSearchChange} 
			/>
			<h3>Add a New</h3>
			<PersonForm 
				onSubmit={addName}
				name={newName}
				onNameChange={handleNameChange}
				phoneNumber={newPhoneNumber}
				onPhoneNumberChange={handleNewPhoneNumber}
			/>
			<h3>Numbers</h3>
			<Persons persons={personsToShow} />
		</div>
	);
};

export default App;
