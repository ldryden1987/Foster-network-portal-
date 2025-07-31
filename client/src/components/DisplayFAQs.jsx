import ManageFAQs from "../components/ManageFAQs.jsx";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext.jsx";

export default function DisplayFAQs() {
  const [faqs, setFAQs] = useState([]);
  const { user, loading } = useUser();

  //use Effect for FAQs
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const responseFAQ = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/faqs`
        );
        if (!responseFAQ.ok) throw new Error("Failed to fetch FAQs");
        const dataFAQ = await responseFAQ.json();
        setFAQs(dataFAQ);
      } catch (err) {
        alert(`Error: ${err}`);
      }
    };
    fetchFAQs();
  }, []);

  // Check if user is admin or staff
  const isAdminOrStaff =
    user && (user.role === "admin" || user.role === "staff" || user.role === "manager");

  // Group FAQs by category
  const faqsByCategory = faqs.reduce((acc, faqs) => {
    const category = faqs.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(faqs);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-8">FAQs</h2>
        <div className="space-y-6">
          {Object.entries(faqsByCategory).map(([category, faqs]) => (
            <div
              key={category}
              className="rounded-lg p-4 border-2 border-[#F87575]"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#102542] dark:text-[#F87060]">
                {category}
              </h3>
              <ul className="space-y-4">
                {faqs.map((faq) => (
                  <li key={faq._id}>
                    <h4 className="text-[#102542] dark:text-[#CDD7D6] font-medium">
                      {faq.question}
                    </h4>
                    <p className="text-sm">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {isAdminOrStaff && (
        <div className="mb-2">
          <ManageFAQs />
        </div>
      )}
    </div>
  );
}
