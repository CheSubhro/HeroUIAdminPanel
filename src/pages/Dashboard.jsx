
import React from 'react';
import { Card, Button } from '../components/common';
import { useNavigate } from 'react-router-dom';
import {
    FaUsers,
    FaBoxOpen,
    FaDollarSign,
    FaChartLine,
    FaArrowUp,
    FaPlus,
    FaShieldAlt,
    FaCog
} from 'react-icons/fa';

export default function Dashboard() {
    const navigate = useNavigate();

    // কিছু ডামি স্ট্যাটিস্টিক্স ডাটা
    const stats = [
        { title: 'Total Users', value: '2,453', change: '+12%', icon: <FaUsers />, color: 'bg-primary/10 text-primary' },
        { title: 'Total Products', value: '348', change: '+4%', icon: <FaBoxOpen />, color: 'bg-warning/10 text-warning' },
        { title: 'Total Revenue', value: '$45,210', change: '+18%', icon: <FaDollarSign />, color: 'bg-success/10 text-success' },
        { title: 'Conversion Rate', value: '3.2%', change: '-1%', icon: <FaChartLine />, color: 'bg-secondary/10 text-secondary' },
    ];

    // কিছু রিসেন্ট অ্যাক্টিভিটি ডামি ডাটা
    const recentActivities = [
        { id: 1, user: 'John Doe', action: 'Updated profile settings', time: '2 minutes ago', status: 'Success' },
        { id: 2, user: 'Sarah Smith', action: 'Changed account password', time: '1 hour ago', status: 'Secure' },
        { id: 3, user: 'Alex Jones', action: 'Created a new product item', time: '3 hours ago', status: 'Pending' },
        { id: 4, user: 'Emma Watson', action: 'Logged into the dashboard', time: '5 hours ago', status: 'Active' },
    ];

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
                    <p className="text-sm text-default-500">Welcome back! Here is what's happening with your store today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        color="primary"
                        variant="flat"
                        onClick={() => navigate('/settings')}
                        className="flex items-center gap-2"
                    >
                        <FaCog /> Settings
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-5 border border-divider flex flex-col justify-between space-y-4">
                        <div className="flex items-center justify-between">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${stat.change.startsWith('+') ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                                }`}>
                                <FaArrowUp className={stat.change.startsWith('-') ? 'rotate-180' : ''} />
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs text-default-500 font-medium">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

                {/* Recent Activities (Takes 2 Columns) */}
                <Card className="lg:col-span-2 p-6 border border-divider flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-base font-semibold text-foreground">Recent Activities</h3>
                            <span className="text-xs text-default-400">Real-time log</span>
                        </div>
                        <div className="space-y-4">
                            {recentActivities.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-default-100/50 border border-divider/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                                            {item.user.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-foreground">{item.user}</h4>
                                            <p className="text-xs text-default-500">{item.action}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold text-primary">{item.status}</span>
                                        <p className="text-[10px] text-default-400">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Quick Shortcuts / Security Card (Takes 1 Column) */}
                <Card className="p-6 border border-divider flex flex-col justify-between space-y-4">
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Quick Shortcuts</h3>
                        <p className="text-xs text-default-500 mb-4">
                            Easily access frequent administrative tools and security preferences from one place.
                        </p>
                        <div className="space-y-2">
                            <Button
                                color="primary"
                                variant="flat"
                                onClick={() => navigate('/changepassword')}
                                className="w-full justify-start gap-2"
                            >
                                <FaShieldAlt /> Change Password
                            </Button>
                            <Button
                                color="primary"
                                variant="flat"
                                onClick={() => navigate('/forgot-password')}
                                className="w-full justify-start gap-2"
                            >
                                <FaPlus /> Reset Credentials
                            </Button>
                        </div>
                    </div>
                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mt-4">
                        <h4 className="text-xs font-semibold text-primary">System Status</h4>
                        <p className="text-[11px] text-default-500 mt-1">
                            All security modules and JWT authentication protocols are running smoothly.
                        </p>
                    </div>
                </Card>

            </div>
        </div>
    );
}