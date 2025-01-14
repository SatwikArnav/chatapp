import logo from '../assets/logo.jpg';
import { useParams } from 'react-router-dom';
import th from '../assets/th.jpeg';

const Topbar = () => {
    const { room } = useParams();
    const { username } = useParams();

    return (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white h-16 w-full fixed top-0 z-10 shadow-lg animate-fade-in-down">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
                <img 
                    src={logo} 
                    alt="logo" 
                    className="w-12 h-12 rounded-full shadow-md border-2 border-white transform hover:scale-110 transition-transform duration-300 ease-in-out hover:rotate-12"
                />
                <h1 className="text-xl font-semibold tracking-wide animate-slide-in-left">{room}</h1>
            </div>

            {/* Right Section */}
            <button className="text-white bg-gradient-to-r from-purple-600 to-blue-600 text-xl font-bold rounded-full px-6 py-2 flex items-center space-x-3 hover:from-blue-600 hover:to-purple-600 hover:scale-110 transition-transform duration-300 ease-in-out shadow-md animate-pulse-on-hover">
                <img 
                    src={th} 
                    alt="profile" 
                    className="w-10 h-10 rounded-full border-2 border-white animate-spin-slow"
                />
                <span className="animate-slide-in-right">{username}</span>
            </button>
        </div>
    );
};

export default Topbar;

/* Additional CSS for animations */
/* Add this to your CSS file or a style tag */
