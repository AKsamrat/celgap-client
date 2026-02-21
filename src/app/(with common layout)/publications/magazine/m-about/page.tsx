"use client"
import { Newspaper, TrendingUp, Users, Zap, Globe, Award, Heart, Target } from 'lucide-react';
import { useRouter } from "next/navigation";
const features = [
    {
        icon: Newspaper,
        title: "Diverse Content",
        description: "From in-depth features to breaking news, we cover stories that matter"
    },
    {
        icon: TrendingUp,
        title: "Trending Topics",
        description: "Stay ahead with our coverage of emerging trends and hot topics"
    },
    {
        icon: Users,
        title: "Expert Contributors",
        description: "Written by industry leaders, journalists, and subject matter experts"
    },
    {
        icon: Zap,
        title: "Fresh Perspectives",
        description: "Unique angles and thought-provoking insights on current affairs"
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "Stories from around the world, connecting diverse communities"
    },
    {
        icon: Award,
        title: "Award-Winning",
        description: "Recognized for excellence in journalism and editorial quality"
    }
];
const MagazineAbout = () => {

    const router = useRouter();
    return (
        <div >

            <div className="relative py-16 bg-[url('/banner1.jpg')] bg-cover bg-center">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Glassmorphic Container */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-10">
                        <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">
                            Magazine About
                        </h1>
                        <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                            CELGAP Journal of Law & Policy
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* About Section */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                            About Our Magazine
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                    </div>


                    <div className="max-w-5xl mx-auto">

                        <div className="relative rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50/30 border-2 border-blue-200 p-10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full"></div>

                            <div className="relative z-10">
                                <p className="text-2xl leading-relaxed text-gray-800 font-serif mb-8">
                                    <span className="text-5xl font-bold text-blue-900 float-left mr-3 mt-1 leading-none">T</span>
                                    he CELGAP Law Magazine delivers authoritative insights on law, governance, and policy through quarterly publications released every four months.
                                </p>


                            </div>
                            <p className="text-lg leading-loose text-gray-700 font-serif italic">
                                Each edition presents rigorous analyses, distinguished expert perspectives, and comprehensive examinations of emerging trends that shape Bangladeshs evolving legal and policy landscape. <br /> <br />
                                Our publications address multifaceted governance domains, encompassing digital rights protection, environmental justice frameworks, corporate accountability mechanisms, and equitable access to justice systems. CELGAP Magazine advances evidence-based, research-driven policy solutions that respond to contemporary governance challenges facing our nation.<br /> <br />
                                This periodical serves as an indispensable resource for policymakers, legal practitioners, academics, civil society stakeholders, and informed citizens committed to substantive policy discourse and progressive institutional reform.<br /> <br />

                                Creating a comprehensive and engaging content plan for CELGAP Law Magazine involves a mix of legal analysis, current events, and practical resources. Here’s a suggested outline for the magazines contents:
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                            Why Publish With Us
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-200 p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    {/* Gradient Background on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                                            {feature.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="rounded-3xl bg-gradient-to-r from-black/90 via-black/60 to-black/90 p-12 text-center shadow-2xl backdrop-blur-2xl">
                    <h3 className="text-3xl font-black text-white mb-4">
                        Ready to Submit Your Work?
                    </h3>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join our community of distinguished scholars and practitioners. Submit your manuscript today.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                            Submit Manuscript
                        </button>
                        <button
                            onClick={() => router.push("/publications/law/sguidelines")}
                            className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold transition-all duration-300"
                        >
                            View Guidelines
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MagazineAbout
