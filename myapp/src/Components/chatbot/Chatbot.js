import React, { useState } from 'react';
import './chatbot.css';

const faqData = [
    {
        question: "What are the time-saving benefits of task management applications?",
        answer: "Task management applications help prioritize tasks, allocate time effectively, and centralize workload."
    },
    {
        question: "How do task management applications boost productivity?",
        answer: "They provide visibility into tasks and help identify high-impact activities."
    },
    {
        question: "What are the potential pitfalls of using task management applications?",
        answer: "Over-dependence on technology and miscommunication during collaboration."
    },
    {
        question: "How can automation features in task management tools help?",
        answer: "They reduce the mental load of remembering details."
    },
    {
        question: "Who is Kfir Lisbon?",
        answer: "Find information about Kfir Lisbon on the Home page."
    },
];

const Chatbot = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    const handleToggleMenu = () => {
        setShowMenu(prev => !prev);
        if (!showMenu) setChatHistory([]); // Clear chat history when opening
    };

    const handleQuestionClick = (faq) => {
        setChatHistory(prev => [...prev, { sender: 'user-message', message: faq.question }]);
        
        setTimeout(() => {
            setChatHistory(prev => [...prev, { sender: 'bot-message', message: faq.answer }]);
        }, 1000);
    };

    return (
        <div
            id="chatbot"
            style={{ bottom: '80px', right: '20px', position: 'fixed', zIndex: 1000 }}
        >
            <button className="chat-button" onClick={handleToggleMenu}>
                {showMenu ? '✖' : '💬'}
            </button>

            {showMenu && (
                <div className="chatbot-menu">
                    <div id="chatlog">
                        {chatHistory.map((entry, index) => (
                            <div key={index} className={`message ${entry.sender}`}>
                                {entry.message}
                            </div>
                        ))}
                    </div>

                    <div id="questions">
                        {faqData.map((faq, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuestionClick(faq)}
                                className="faq-button"
                            >
                                {faq.question}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
