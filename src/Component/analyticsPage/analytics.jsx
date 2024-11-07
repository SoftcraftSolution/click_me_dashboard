import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './analytics.css';

const AnalyticsPage = () => {
    const [data, setData] = useState({
        numberOfOrdersToday: 0,
        numberOfOrdersThisWeek: 0,
        numberOfOrdersThisMonth: 0,
        totalRevenue: 0,
        totalCompanies: 0,
        totalEmployees: 0,
        recentOrders: [],
        averageReview: 0,
        reviewCount: 0,
        weeklyRevenueBreakdown: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://clickmeal-backend.vercel.app/user/order-insight');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        };

        fetchData();
    }, []);

    const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

    // Data for the circular graph (Pie chart)
    const reviewChartData = [
        { name: 'Average Review', value: data.averageReview },
        { name: 'Remaining', value: 5 - data.averageReview },
    ];

    return (
        <div className='main-dash-root'>
            <div id="dash-header">Dashboard</div>
            <div id="dash-first">
                <div className="summary-card">
                    <h4>Orders Today</h4>
                    <p>{data.numberOfOrdersToday}</p>
                   
                </div>
                <div className="summary-card">
                    <h4>Orders This Week</h4>
                    <p>{data.numberOfOrdersThisWeek}</p>
                    {/* <span>{data.numberOfOrdersThisWeek > 0 ? '-' : ''}{data.numberOfOrdersThisWeek * 0.048}% change</span> */}
                </div>
                <div className="summary-card">
                    <h4>Orders This Month</h4>
                    <p>{data.numberOfOrdersThisMonth}</p>
                    {/* <span>+{data.numberOfOrdersThisMonth * 0.048}% growth</span> */}
                </div>
            </div>
            <div className='dash-total-recent'>
                <div className="chart-container">
                    <h3>Total Revenue (Weekly Breakdown)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data.weeklyRevenueBreakdown}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalRevenue" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="recent-orders">
                    <h3>Recent Orders</h3>
                    <table className="analytics-table">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>Company Name</th>
                                <th>Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.recentOrders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.employeeName}</td>
                                    <td>{order.emailAddress}</td>
                                    <td>{order.phoneNumber}</td>
                                    <td>{order.companyName}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='dash-bottom-row'>
                <div className="summary-card">
                    <h4>Total Companies & Employees</h4>
                    <p>{data.totalCompanies} Companies / {data.totalEmployees} Employees</p>
                </div>
                <div className="circular-card">
                    <h4>Average Review</h4>
                    <ResponsiveContainer width={200} height={200}>
                        <PieChart>
                            <Pie
                                data={reviewChartData}
                                innerRadius={50}
                                outerRadius={80}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                            >
                                {reviewChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <p>{data.averageReview} / 5 ({data.reviewCount} Reviews)</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
