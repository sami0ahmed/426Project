import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Twitter } from 'lucide-react';
import InputField from './Inputfield';

const Loginpage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const toggleMode = () => setIsLogin(!isLogin);

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="p-4"> {/* Added padding to the container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? 'login' : 'signup'}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={formVariants}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <div className="space-y-2 mb-4"> {/* Reduced spacing */}
            {!isLogin && (
              <InputField
                icon={User}
                placeholder="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <InputField
              icon={Mail}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              icon={Lock}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className={`text-white px-4 py-2 rounded-lg w-full flex items-center justify-center ${isLogin ? 'bg-blue-600' : 'bg-green-600'}`}
          >
            {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight className="ml-2" size={16} /> 
          </button>
          {isLogin && (
            <div className="mt-4 flex justify-center space-x-2"> 
              <button className="p-1 bg-gray-200 rounded-full"> 
                <Github className="text-gray-700 hover:text-white" size={20} /> 
              </button>
              <button className="p-1 bg-gray-200 rounded-full"> 
                <Twitter className="text-gray-700 hover:text-white" size={20} /> 
              </button>
            </div>
          )}
          <div className="mt-4 text-center">
            <button onClick={toggleMode} className="text-sm text-gray-600 hover:underline text-white">
              {isLogin ? 'Create an account' : 'Already have an account?'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Loginpage;