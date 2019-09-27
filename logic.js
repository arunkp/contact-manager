const mongoose = require('mongoose');
const assert = require('assert');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/contact-manager',{ useNewUrlParser: true });

const db = mongoose.connection;

function toLower(v) {
	return v.toLowerCase();
}


const contactSchema = mongoose.Schema({
	firstname: { type: String, set: toLower },
	lastname: { type: String, set: toLower },
	phone: { type: String, set: toLower },
	email: { type: String, set: toLower }
});


const Contact = mongoose.model('Contact',contactSchema);


const addContact = (contact) => {
	Contact.create(contact, (err) => {
		assert.equal(null, err);
		console.info('New Contact Added');
		db.close();
	})
}


const getContact = (name) => {
	const search = new RegExp(name, 'i');
	Contact.find({$or: [{firstname: search}, {lastname: search}]})
	.exec((err, contact) => {
		assert.equal(null, err);
		console.info(contact);
		console.info(`${contact.length} matches`);
		db.close();
	})
}


const updateContact = (_id, contact) => {
	Contact.updateOne({_id}, contact)
	.exec((err, status) => {
		assert.equal(null, err);
		console.info('Updated Successfully');
		db.close();
	})
}

const deleteContact = (_id) => {
	Contact.remove({_id})
	.exec((err, status) => {
		assert.equal(null, err);
		console.info('Deleted Successfully');
		db.close();
	})
}

const getContactList = () => {
	Contact.find()
	.exec((err, contacts) => {
		assert.equal(null, err);
		console.info(contacts);
		console.info(`${contacts.length} matches`);
		db.close();
	})
}


module.exports = { 
	addContact, 
	getContact, 
	updateContact, 
	deleteContact, 
	getContactList
};