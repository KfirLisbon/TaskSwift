import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook
import './HomePage.css';
import backgroundImage from '../../Assets/Pictures/vecteezy_textured-crumpled-black-paper-background_6893472.jpg'; // Import the image

const HomePage = () => {
    const { loginWithRedirect } = useAuth0(); // Destructure loginWithRedirect

    return (
        <div className="home-container">
            <header className="header">
                <h1>Welcome to TaskSwift</h1>
                <p>Your ultimate solution for seamless task management.</p>
            </header>

            <section className="content">
                <h2>Why Choose TaskSwift?</h2>
                <p>
                    In today’s fast-paced world, effective task management is crucial for success. TaskSwift empowers you to take control of your tasks and projects with ease.
                    Whether you're a busy professional, a student juggling assignments, or a team leader managing group projects, TaskSwift provides the tools you need to stay organized and focused.
                </p>
                <h3>Key Features</h3>
                <ul>
                    <li><strong>User-Friendly Interface:</strong> Our intuitive design allows you to navigate and manage your tasks effortlessly.</li>
                    <li><strong>Collaboration Tools:</strong> Work together with your team in real-time, ensuring everyone is aligned and on track.</li>
                    <li><strong>Task Assignment:</strong> Easily assign tasks to team members and monitor their progress to boost accountability.</li>
                    <li><strong>Progress Tracking:</strong> Keep track of deadlines and completion statuses, ensuring no task is overlooked.</li>
                    <li><strong>Cross-Device Compatibility:</strong> Access your tasks from any device, whether it’s a desktop, tablet, or smartphone.</li>
                </ul>
                <br />
                <h2>Mastering Time Management</h2>
                <p>
                    Time management is not just about doing more in less time; it’s about making the most of your available time. With TaskSwift, you can prioritize tasks effectively, 
                    set realistic deadlines, and allocate your time wisely. Understanding the value of each task helps you focus on what truly matters.
                </p>
                <p>
                    Here are some strategies to enhance your time management skills:
                </p>
                <ul>
                    <li><strong>Set Clear Goals:</strong> Define your short-term and long-term goals to guide your daily tasks.</li>
                    <li><strong>Prioritize Tasks:</strong> Use the Eisenhower Box or ABCD method to identify urgent vs. important tasks.</li>
                    <li><strong>Use Time Blocks:</strong> Allocate specific time slots for different activities to maintain focus and reduce distractions.</li>
                    <li><strong>Review and Reflect:</strong> At the end of each week, reflect on your accomplishments and areas for improvement.</li>
                </ul>
                <p>
                    By incorporating these practices, you’ll find yourself achieving more while feeling less stressed.
                </p>
                <br />
                <h2>Unlock Your Potential with TaskSwift</h2>
                <p>
                    Imagine a world where tasks are organized, deadlines are met, and stress is minimized. TaskSwift is designed to be your partner in productivity, helping you unlock your full potential. 
                    And the best part? It’s completely free to use!
                </p>
                <p>
                    Unlike many productivity tools that come with hidden fees or premium features locked behind paywalls, TaskSwift is here to empower you without any cost.
                    Our mission is to help you focus on what truly matters—achieving your goals and leading a balanced life.
                </p>
                <p>
                    Join the thousands of satisfied users who have transformed their productivity experience. Whether for personal projects, team collaborations, or academic tasks, 
                    TaskSwift adapts to your needs. Take the first step towards a more organized life today!
                </p>
                <br />
                <button onClick={loginWithRedirect} className="cta-button">Log In</button> {/* Updated to use Auth0 */}
                <br /><br /><br />
                <h2>About Me</h2>
                <p>
                    I recently completed my college education with a perfect score of 100, and I've pursued my passion for technology through self-directed learning.
                    As an autodidact, I’ve developed a solid foundation in both frontend and backend development.
                    
                    <br></br> <br></br>
                    Frontend Development: I have experience with HTML, CSS, JavaScript, and React, enabling me to create user-friendly and responsive web applications. Like this one for example.
                    <br></br><br></br>
                    Backend Development: I’m familiar with Spring Boot and Java, and I enjoy learning how to build effective backend systems that support my projects.
                    <br></br><br></br>
                    Database Management: I have worked with SQLite for database management, ensuring that I can handle data efficiently in my applications.
                </p>
                <p>
                    In addition to these skills, I’m comfortable using Git for version control and VS Code as my development environment.
                    I thrive on learning new concepts and appreciate the challenges that come with growing as a developer.
                    <br></br><br></br> 
                    I’m eager to continue developing my skills and contributing to meaningful projects in a collaborative environment.
                    I believe that with dedication and teamwork, I can make a positive impact while growing alongside my colleagues.
                   
                </p>
            </section>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} TaskSwift. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
