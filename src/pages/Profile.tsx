import { useNavigate } from 'react-router-dom';
import { useGetUserProfileQuery } from '@/services/authApi';
import { ArrowLeft, User, Mail, Hash, UserCircle } from 'lucide-react';

export default function Profile() {
    const navigate = useNavigate();
    const { data: profile, isLoading, error } = useGetUserProfileQuery();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent"></div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg mb-4">Failed to load profile</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2 justify-center"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="mb-8 flex items-center gap-2 text-gray-600 hover:text-orange-600 transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-32"></div>

                    <div className="px-8 pb-8">
                        <div className="relative -mt-16 mb-6">
                            <div className="inline-block p-1 bg-white rounded-full">
                                <img
                                    src={profile.image}
                                    alt={profile.username}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-gray-200"
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {profile.firstName} {profile.lastName}
                            </h1>
                            <p className="text-gray-500 text-lg">@{profile.username}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Email</span>
                                </div>
                                <p className="text-gray-900 font-medium pl-12">{profile.email}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Gender</span>
                                </div>
                                <p className="text-gray-900 font-medium pl-12 capitalize">{profile.gender}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                        <Hash className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">User ID</span>
                                </div>
                                <p className="text-gray-900 font-medium pl-12">{profile.id}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                        <UserCircle className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Account Status</span>
                                </div>
                                <div className="pl-12">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
