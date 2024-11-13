import React from "react";
import './pricing.css';
import { ToastContainer, toast } from 'react-toastify'; // Importing toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css';

function Pricing() {
    const notify = () => toast("Look at the note to the top left.");

    return (
        <div className="megaDiv">
            <div className="container">
                <div className="container-2">
                    {/* Note Section */}
                    <p className="Note">*Please note that this project I created is not intended for purchase, so there is no option to buy these plans.</p>

                    {/* Pricing Plans List */}
                    <ul className='pricing-plans'>
                        {/* Free Plan */}
                        <li className="pricing-plan-card free-plan">
                            <span className="plan-type">Free</span> <br /> 
                            Start with essential features for task management, ideal for individuals.
                            <p><span className="price">$0</span><span className="price-month">/month</span></p>
                            <p className="text-in-card">✓ 1 User</p>
                            <p className="text-in-card">✗ Chat Support</p>
                            <p className="text-in-card">✗ Enterprise features</p>
                            <p className="text-in-card">✗ Assistant 24/7</p>
                            <button className="btn btn-primary" onClick={notify}>Get Started!</button>
                        </li>

                        {/* Basic Plan */}
                        <li className="pricing-plan-card">
                            <span className="plan-type">Basic</span> <br />
                            Unlock priority tasks, advanced reminders, and sharing options for small teams.
                            <p><span className="price">$9.90</span><span className="price-month">/month</span></p>
                            <p className="text-in-card">✓ 1 User</p>
                            <p className="text-in-card">✓ Chat Support</p>
                            <p className="text-in-card">✗ Enterprise features</p>
                            <p className="text-in-card">✗ Assistant 24/7</p>
                            <button className="btn btn-primary" onClick={notify}>Get Started!</button>
                        </li>

                        {/* Premium Plan */}
                        <li className="pricing-plan-card">
                            <span className="plan-type">Premium</span><span className="best-offer">Best offer</span> <br />
                            Access all TaskSwift features, including analytics and custom workflows for larger teams.
                            <p><span className="price">$17.90</span><span className="price-month">/month</span></p>
                            <p className="text-in-card">✓ 1 User</p>
                            <p className="text-in-card">✓ Chat Support</p>
                            <p className="text-in-card">✓ Enterprise features</p>
                            <p className="text-in-card">✓ Assistant 24/7</p>
                            <button className="btn btn-primary" onClick={notify}>Get Started!</button>
                        </li>
                    </ul>

                    {/* Pricing Section */}
                    <div className="pricing-section">
                        <p className="pricing-paragraph">
                            Our pricing structure is designed to be flexible and adaptable, taking into account your specific usage patterns and the subscription plan that best fits your requirements.
                            Whether you’re an individual seeking to enhance your personal productivity or part of a larger team looking for robust task management solutions,
                            we offer options that cater to every need. Additionally, we encourage you to sign up for a free trial,
                            allowing you to explore our features firsthand without any financial commitment.
                            This way, you can thoroughly evaluate our offerings and choose the plan that aligns perfectly with your unique goals and preferences.
                        </p>
                    </div>

                    {/* Toast Container for Notifications */}
                    <ToastContainer 
                        position="top-right" 
                        autoClose={5000} 
                        hideProgressBar={true} 
                        newestOnTop={false} 
                        closeOnClick={false} 
                        pauseOnHover={false} 
                        draggable={false}
                    />
                </div>
            </div>

            {/* Footer Section */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} TaskSwift. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Pricing;
