import React from 'react';
import Card from './Card';
import Button from './Button';
import { motion } from 'framer-motion';

const GhostIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-zinc-600">
        <path d="M20 20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"></path>
        <path d="M12 14v.01"></path>
        <path d="M12 10v.01"></path>
        <path d="M16 12h.01"></path>
        <path d="M8 12h.01"></path>
    </svg>
);

interface NotFoundProps {
  onNavigateHome: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onNavigateHome }) => {
  return (
    <Card>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center flex flex-col items-center justify-center p-8"
        >
            <GhostIcon />
            <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-6">404 - Page Not Found</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md">
                Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            <div className="mt-8 w-full max-w-xs">
                <Button onClick={onNavigateHome}>
                    Go to Homepage
                </Button>
            </div>
        </motion.div>
    </Card>
  );
};

export default NotFound;
