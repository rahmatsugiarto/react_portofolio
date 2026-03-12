import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { certifications } from '../data/certifications';
import Magnetic from '../components/ui/Magnetic';

const CertificationsPage = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('All');
    
    const filters = ['All', 'Mobile', 'UI/UX', 'Backend', 'Other'];

    const filteredCertifications = useMemo(() => {
        if (activeFilter === 'All') return certifications;
        return certifications.filter(cert => cert.categories && cert.categories.includes(activeFilter));
    }, [activeFilter]);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">All Certifications</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                            A comprehensive list of my professional certifications and achievements.
                        </p>
                    </div>

                    <Magnetic>
                        <button 
                            onClick={() => {
                                if (window.history.state && window.history.state.idx > 0) {
                                    navigate(-1);
                                } else {
                                    navigate('/');
                                }
                            }}
                            className="px-8 py-3 border border-gray-900 dark:border-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                        >
                            Back Home
                        </button>
                    </Magnetic>
                </div>

                <div className="flex flex-wrap gap-4 mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                                activeFilter === filter
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-primary/50'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCertifications.map((cert, index) => {
                        const CardTag = cert.link ? 'a' : 'div';
                        const cardProps = cert.link ? {
                            href: cert.link,
                            target: "_blank",
                            rel: "noopener noreferrer"
                        } : {};

                        return (
                            <CardTag 
                                key={index}
                                {...cardProps}
                                className={`cert-card group bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 flex flex-col h-full hover:-translate-y-1 ${cert.link ? 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 cursor-pointer' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-2">
                                        <span className="material-icons-round text-gray-500 dark:text-gray-400">{cert.icon}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {cert.link && (
                                            <span className="material-icons-round text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                                        )}
                                        <span className={`px-2 py-1 ${cert.colorClass} text-xs font-semibold rounded`}>{cert.year}</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{cert.issuer}</p>
                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{cert.level}</span>
                                    <span className="material-icons-round text-gray-400 text-sm group-hover:text-primary">verified</span>
                                </div>
                            </CardTag>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CertificationsPage;
