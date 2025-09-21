export default function NewsMediaSection() {
  const newsData = [
    {
      id: 1,
      category: "SUPREME COURT OBSERVER",
      categoryColor: "bg-blue-900",
      title:
        "Panel Discussion on the Role of the Media in Highlighting Gender Gaps in the Higher Judiciary",
      date: "MARCH 25, 2025",
      dateColor: "text-blue-500",
      description:
        'A two-day national consultation organised by the Centre for Law and Policy Research was held in Bengaluru on 22 and 23 March to address this issue. Titled "Equal Justice: Securing Equal Inclusion of Women in the Higher Judiciary," the consultation comprised four panel discussions which highlighted the systemic barriers that hinder women\'s advancement in the judiciary.',
      bgColor: "bg-gray-100",
    },
    {
      id: 2,
      category: "LIVE LAW",
      categoryColor: "bg-blue-900",
      title:
        "Supreme Court Reserves Treasurer Plus 30% EC/Councilor Posts For Women Lawyers In All Karnataka District Bar Associations",
      date: "MARCH 24, 2025",
      dateColor: "text-orange-500",
      description:
        "When Justice Kant enquired as to when the elections in the High Court Bar and District Bar were scheduled in the state, Senior Advocate Sapna Kothari, appearing for the Karnataka Federation of Women Lawyers, informed that women lawyers had secured Treasurer plus 30% EC posts in the High Court Bar. The issue only remained with respect to district bar associations, Kothari said, of which elections are upcoming. Accordingly, the Court passed its order.",
      bgColor: "bg-gray-100",
    },
    {
      id: 3,
      category: "THE HINDU",
      categoryColor: "bg-blue-900",
      title:
        "National Consultation in Bengaluru Addresses Gender Disparity in India's Higher Judiciary",
      date: "MARCH 24, 2025",
      dateColor: "text-blue-900",
      description:
        "The underrepresentation of women in the higher judiciary remains a pressing issue in India, where women constitute only 15% of High Court judges and a mere 11% of Supreme Court judges.",
      bgColor: "bg-gray-100",
    },
    {
      id: 4,
      category: "DECCAN HERALD",
      categoryColor: "bg-blue-900",
      title:
        "Justice denied? Women Still a Minority in India's Higher Judiciary",
      date: "MARCH 24, 2025",
      dateColor: "text-red-500",
      description:
        "The underrepresentation of women in the higher judiciary remains a pressing issue in India, where women constitute only 15% of High Court judges...",
      bgColor: "bg-gray-100",
    },
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <h2 className="text-4xl font-bold text-[#0347A7] mb-16 tracking-wider">
          NEWS & MEDIA
        </h2>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {newsData.map((article) => (
            <div
              key={article.id}
              className={`${article.bgColor} rounded-lg overflow-hidden shadow-sm`}
            >
              {/* Category Header */}
              <div
                className={`bg-gradient-to-r ${[
                  article.categoryColor,
                ]} to-blue-500 text-white px-6 py-3`}
              >
                <h3 className="text-sm font-bold tracking-wide uppercase">
                  {article.category}
                </h3>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-3 leading-tight italic">
                  {article.title}
                </h4>

                <p
                  className={`text-sm font-medium mb-4 ${article.dateColor} uppercase tracking-wide`}
                >
                  {article.date}
                </p>

                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  {article.description}
                </p>

                <button className="border border-gray-400 text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 rounded">
                  READ MORE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <button className="bg-[#0347A7] text-white px-8 py-3 font-medium hover:bg-red-600 transition-colors duration-200 rounded-lg">
            VIEW ALL NEWS
          </button>
        </div>
      </div>
    </div>
  );
}
