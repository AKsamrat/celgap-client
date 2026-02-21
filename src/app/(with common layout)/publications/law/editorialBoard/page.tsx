export default function EditorialAdvisoryBoard() {
    const boardMembers = [
        {
            designation: "Editor-in-Chief",
            name: "Ehsan Abdullah Siddiq",
            title: "Advocate(Suprieme Court of Bangladesh)"
        },
        {
            designation: "Board of Editor",
            name: "Chowdhury Ishrak Ahmed Siddiky",
            title: "Adjunct Professor, University of Asia Pacific (UAP)"
        },
        {
            designation: "Board of Editor",
            name: "Imran Siddiq",
            title: "Advocate(Suprieme Court of Bangladesh)"
        },
        {
            designation: "Board of Editor",
            name: "Azizun Nahar",
            title: "Assistant Professor, University of Asia Pacific (UAP)"
        }
    ]



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4">
            <div className="relative py-16 bg-[url('/banner1.jpg')] bg-cover bg-center">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Glassmorphic Container */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-10">
                        <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">
                            Editorial & Advisory Board
                        </h1>
                        <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                            CELGAP core purpose is to ensure that the Constitution works for
                            everyone through law & policy research and strategic impact
                            litigation. Our diverse team of legal experts, researchers, and
                            advocates work collectively to promote constitutional values and
                            human rights.
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-12">
                {/* Main Header */}
                {/* <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Editorial & Advisory Board
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto rounded-full"></div>
                </div> */}

                <div className="space-y-8 ">
                    {/* Founder Advisor */}

                    <div className="text-center">
                        <div className="inline-block mb-6">
                            <h2 className="text-2xl font-bold text-blue-900 mb-2">{boardMembers[0].designation}</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto rounded-full"></div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                            <div className="flex items-center justify-center gap-4 mb-4">

                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {boardMembers[0].name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {boardMembers[0].title}
                                    </p>                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="">

                            <h2 className="text-2xl font-bold text-blue-900 mb-2">Board Of Editor</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto rounded-full"></div>
                        </div>
                    </div>
                    <div className="grid grid-1 md:grid-cols-2 gap-5">

                        {
                            boardMembers.slice(1, 4).map((boardMembers, index) => (
                                <div key={index} className="text-center">


                                    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                                        <div className="flex items-center justify-center gap-4 mb-4">

                                            <div className="text-left">
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {boardMembers.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    {boardMembers.title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>



                </div>
            </div>
        </div>
    );
}