
import React, { useEffect } from 'react';
import { certifications } from '../data/certifications';
import { Link } from 'react-router-dom';

const CertificationsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">All Certifications</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                        A comprehensive list of my professional certifications and achievements.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, index) => (
                        <div 
                            key={index}
                            className="cert-card group bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col h-full hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-2">
                                    <span className="material-icons-round text-gray-500 dark:text-gray-400">{cert.icon}</span>
                                </div>
                                <span className={`px-2 py-1 ${cert.colorClass} text-xs font-semibold rounded`}>{cert.year}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{cert.issuer}</p>
                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{cert.level}</span>
                                <span className="material-icons-round text-gray-400 text-sm group-hover:text-primary">verified</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CertificationsPage;
