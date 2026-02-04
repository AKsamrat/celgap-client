import { updateLawJournalStatus } from "@/service/LawJournal";

export type JournalStatus = "draft" | "reviewing" | "published" | "rejected" | "revision_required";
export type UserRole = "admin" | "user" | "reviewer" | undefined;
const StatusBadge = ({ status }: { status: JournalStatus }) => {
    const colors = {
        draft: "bg-gray-200 text-gray-700",
        reviewing: "bg-yellow-200 text-yellow-800",
        published: "bg-green-200 text-green-800",
        rejected: "bg-red-200 text-red-800",
        revision_required: "bg-red-200 text-red-800",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs ${colors[status]}`}>
            {status.toUpperCase()}
        </span>
    );
};
const StatusControl = ({
    status,
    journalId,
    userRole,
    loadLawjournal,
}: {
    status: JournalStatus;
    journalId: number;
    userRole: UserRole;
    loadLawjournal: () => void;
}) => {
    if (userRole !== "admin") {
        return <StatusBadge status={status} />;
    }

    const updateStatus = async (status: JournalStatus) => {
        const formData = new FormData();
        formData.append("status", status);
        // formData.append("_method", "POST");
        console.log("Updating status to:", formData.get("status"));

        await updateLawJournalStatus(journalId, formData);
        loadLawjournal();
    };

    return (
        <select
            value={status}
            onChange={(e) => updateStatus(e.target.value as JournalStatus)}
            className="border border-gray-300 rounded-xl px-2 py-1 text-sm"
        >
            <option value="draft">Draft</option>
            <option value="reviewing">Reviewing</option>
            <option value="revision_required">Revision Required</option>
            <option value="rejected">Rejected</option>
            <option value="published">Published</option>
        </select>
    );
};

export default StatusControl;