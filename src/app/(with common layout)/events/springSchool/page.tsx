// app/(with common layout)/events/springSchool/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Tag, ChevronRight, Filter, Loader2 } from 'lucide-react';
import { SpringSchoolEvent } from '@/types';

// TypeScript interfaces


export default function SpringSchoolPage() {
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<SpringSchoolEvent[]>([]);

    // Fetch events on component mount
    useEffect(() => {
        async function fetchEvents() {
            try {
                // Simulate API call - replace with your actual API endpoint
                // const response = await fetch('/api/spring-school-events');
                // const data = await response.json();

                // Mock data for demonstration
                const mockEvents: SpringSchoolEvent[] = [
                    {
                        id: '1',
                        title: 'Introduction to Machine Learning',
                        date: '2025-03-15',
                        venue: 'Main Auditorium, Building A',
                        time: '09:00 AM',
                        duration: '2 hours',
                        description: 'Learn the fundamentals of machine learning and its applications in modern technology.',
                        status: 'upcoming',
                        category: 'Technology',
                        speaker_id: 'speaker_001',
                        speakerName: 'Dr. Sarah Johnson',
                        speakerRole: 'AI Research Scientist',
                        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
                    },
                    {
                        id: '2',
                        title: 'Sustainable Architecture Workshop',
                        date: '2025-03-18',
                        venue: 'Design Studio, Building C',
                        time: '02:00 PM',
                        duration: '3 hours',
                        description: 'Explore innovative approaches to sustainable building design and green architecture.',
                        status: 'upcoming',
                        category: 'Architecture',
                        speaker_id: 'speaker_002',
                        speakerName: 'Prof. Michael Chen',
                        speakerRole: 'Sustainable Design Expert',
                        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800'
                    },
                    {
                        id: '3',
                        title: 'Digital Marketing Strategies',
                        date: '2025-03-12',
                        venue: 'Conference Room 201',
                        time: '10:30 AM',
                        duration: '90 minutes',
                        description: 'Master the latest digital marketing techniques and social media strategies for business growth.',
                        status: 'ongoing',
                        category: 'Business',
                        speaker_id: 'speaker_003',
                        speakerName: 'Emma Williams',
                        speakerRole: 'Marketing Director',
                        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800'
                    },
                    {
                        id: '4',
                        title: 'Creative Writing Masterclass',
                        date: '2025-03-08',
                        venue: 'Library Hall',
                        time: '11:00 AM',
                        duration: '2.5 hours',
                        description: 'Develop your creative writing skills with hands-on exercises and expert feedback.',
                        status: 'completed',
                        category: 'Arts',
                        speaker_id: 'speaker_004',
                        speakerName: 'James Patterson',
                        speakerRole: 'Bestselling Author',
                        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800'
                    },
                    {
                        id: '5',
                        title: 'Data Science Fundamentals',
                        date: '2025-03-20',
                        venue: 'Computer Lab 3',
                        time: '01:00 PM',
                        duration: '2 hours',
                        description: 'Introduction to data analysis, visualization, and statistical modeling techniques.',
                        status: 'upcoming',
                        category: 'Technology',
                        speaker_id: 'speaker_005',
                        speakerName: 'Dr. Lisa Anderson',
                        speakerRole: 'Data Scientist',
                        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
                    },
                    {
                        id: '6',
                        title: 'Entrepreneurship 101',
                        date: '2025-03-22',
                        venue: 'Business Center',
                        time: '03:00 PM',
                        duration: '2.5 hours',
                        description: 'Learn how to start and grow your own business from successful entrepreneurs.',
                        status: 'upcoming',
                        category: 'Business',
                        speaker_id: 'speaker_006',
                        speakerName: 'Robert Martinez',
                        speakerRole: 'Serial Entrepreneur',
                        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800'
                    }
                ];

                // Simulate network delay
                setTimeout(() => {
                    setEvents(mockEvents);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    // Get unique categories and statuses
    const categories = ['all', ...new Set(events.map(e => e.category))];
    const statuses = ['all', 'upcoming', 'ongoing', 'completed'];

    // Filter events
    const filteredEvents = events.filter(event => {
        const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        return matchesStatus && matchesCategory;
    });

    // Get status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-100 text-blue-800';
            case 'ongoing':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading Spring School events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <div className="relative bg-gradient-to-r from-blue-300 to-gray-600 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                {/* Banner Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                            Spring School 2025
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                            Join us for an exciting series of workshops, seminars, and networking events
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
                                View Schedule
                            </button>
                            <button className="bg-blue-700 border-2 border-blue-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                                Register Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Wave Shape */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB" />
                    </svg>
                </div>
            </div>

            {/* Filters Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <Filter className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-700">Filters:</span>
                        </div>

                        {/* Status Filter */}
                        <div className="flex flex-wrap gap-2">
                            {statuses.map(status => (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedStatus === status
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map(event => (
                        <div
                            key={event.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
                        >
                            {/* Event Image */}
                            {event.image && (
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ4MCIgdmlld0JveD0iMCAwIDgwMCA0ODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDgwIiBmaWxsPSIjRTVFN0VCIi8+CjxwYXRoIGQ9Ik0zNTAgMjQwTDQ1MCAzMDBMMzUwIDM2MEwyNTAgMzAwTDM1MCAyNDBaIiBmaWxsPSIjOUM5Q0EzIi8+Cjwvc3ZnPg==';
                                        }}
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                                            {event.status}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Event Content */}
                            <div className="p-6">
                                {/* Category Tag */}
                                <div className="flex items-center space-x-2 mb-3">
                                    <Tag className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-medium text-purple-600">{event.category}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {event.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {event.description}
                                </p>

                                {/* Event Details */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                        <span>{formatDate(event.date)}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                        <span>{event.time} • {event.duration}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                        <span className="line-clamp-1">{event.venue}</span>
                                    </div>
                                </div>

                                {/* Speaker Info */}
                                {event.speakerName && (
                                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{event.speakerName}</p>
                                            <p className="text-xs text-gray-500 truncate">{event.speakerRole}</p>
                                        </div>
                                    </div>
                                )}

                                {/* View Details Button */}
                                <button className="mt-4 w-full bg-[#0146A4] hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 group">
                                    <span>View Details</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-16">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
                        <p className="text-gray-500">Try adjusting your filters to see more events</p>
                    </div>
                )}
            </div>
        </div>
    );
}