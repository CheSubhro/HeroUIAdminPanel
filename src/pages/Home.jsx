
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Button, 
    Card, 
    Badge, 
    Tooltip, 
    Modal, 
    ConfirmModal 
} from '../components/common'; 

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
            {/* Hero Section */}
            <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
                
                {/* Top Badge & Intro */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block mb-4">
                        <Badge variant="flat" color="primary" className="px-3 py-1 text-xs">
                            🚀 V3.0 Centralized UI System
                        </Badge>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        Build Scaleable Apps with <span className="text-indigo-400">Unified Components</span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
                        A robust, dark-theme optimized architecture powered by React 19, Vite, Tailwind CSS, and HeroUI. Streamline your development workflow today.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button 
                            as={Link} 
                            to="/about" 
                            size="lg"
                            className="px-8 font-semibold"
                        >
                            Explore About
                        </Button>
                        
                        <Tooltip content="Click to test interactive modal demo">
                            <Button 
                                variant="bordered" 
                                size="lg"
                                onPress={() => setIsModalOpen(true)}
                                className="px-8 font-semibold border-slate-700 text-slate-300 hover:bg-slate-800"
                            >
                                Open Demo Modal
                            </Button>
                        </Tooltip>
                    </div>
                </div>

                {/* Cards Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
                    
                    <Card className="p-6 bg-slate-800/50 border border-slate-800 backdrop-blur-md rounded-xl">
                        <div className="text-2xl mb-4">⚡</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Lightning Performance</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Optimized bundle sizing and pre-configured utility classes ensure instantaneous page loads.
                        </p>
                    </Card>

                    <Card className="p-6 bg-slate-800/50 border border-slate-800 backdrop-blur-md rounded-xl">
                        <div className="text-2xl mb-4">🛡️</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Secure & Protected</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Built-in error boundaries, confirm modals, and authenticated state routing systems.
                        </p>
                    </Card>

                    <Card className="p-6 bg-slate-800/50 border border-slate-800 backdrop-blur-md rounded-xl">
                        <div className="text-2xl mb-4">🎨</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Consistent Design</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Centralized component wrappers guarantee uniform look and feel across every view.
                        </p>
                    </Card>

                </div>

                {/* Interactive Action Banner */}
                <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Ready to test confirmation flows?</h2>
                        <p className="text-slate-400 text-sm">Trigger the custom ConfirmModal component to see it in action.</p>
                    </div>
                    <Button 
                        color="danger" 
                        onPress={() => setIsConfirmOpen(true)}
                        className="whitespace-nowrap"
                    >
                        Trigger Confirm Modal
                    </Button>
                </div>

            </main>

            {/* Standard Modal Demo */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6 text-slate-100">
                    <h2 className="text-xl font-bold mb-3 text-white">Centralized Modal Component</h2>
                    <p className="text-slate-400 text-sm mb-6">
                        This modal is controlled via your project's modular component structure. Clean, reusable, and fully accessible.
                    </p>
                    <div className="flex justify-end gap-3">
                        <Button variant="light" onPress={() => setIsModalOpen(false)}>Close</Button>
                    </div>
                </div>
            </Modal>

            {/* Confirm Modal Demo */}
            <ConfirmModal 
                isOpen={isConfirmOpen} 
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => setIsConfirmOpen(false)}
                title="Are you sure?"
                message="This is a test prompt utilizing your custom ConfirmModal component."
            />
        </div>
    );
}