import emailjs from 'emailjs-com';
import React, { useRef } from 'react';
import UseAuth from '../../Hooks/UseAuth';
import './Contact.css';



const Contact = () => {
	const {trySuccessAlart}= UseAuth()
	const form = useRef()
	
	const handleSubmit = (e) => {
		
		
		e.preventDefault()
		emailjs.sendForm('service_mt82hy2', 'template_1urcpa7', form.current, 'user_cKgbE80VqOVlLKlhO7S97')
		.then((result) => {
			console.log(result.text);
			trySuccessAlart("Successfully", "Sent then Message", "success")
			

		}, (error) => {
			console.log(error.text);
			trySuccessAlart("OPS!", "Message not sent", "error")
		})
	}
	return (
		<div className="bg-info py-5 text-white">
			<form ref={form} className='bg-info' onSubmit={handleSubmit}>
			<div className="container">
				<div className="row">
					<h1 className="text-center">Contact Us</h1>
				</div>
				<div className="row">
					<h4 style={{ textAlign: "center" }}>We'd love to hear from you!</h4>
				</div>
				<div className="row input-container">
					<div className="col-xs-12">
						<div className="styled-input wide">
							<input type="text" name="user_name" required />
							<label>Name</label>
						</div>
					</div>
					<div className="col-md-6 col-sm-12">
						<div className="styled-input">
							<input name='user_email' type="text" required />
							<label>Email</label>
						</div>
					</div>
					<div className="col-md-6 col-sm-12">
						<div className="styled-input" style={{ float: "right;" }}>
							<input type="number" name='user_number'  required />
							<label>Phone Number</label>
						</div>
					</div>
					<div className="col-xs-12">
						<div className="styled-input wide">
							<textarea name='user_sms' required></textarea>
							<label>Message</label>
						</div>
					</div>
					<div className="col-xs-12 text-end">
						<button type='submit' className="btn-lrg submit-btn">Send Message</button>
					</div>
				</div>
			</div>
			</form>

		</div>
	);
};

export default Contact;