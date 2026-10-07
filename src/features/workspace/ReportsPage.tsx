import { Download } from "lucide-react";
import { PageHeading } from "../../components/PageHeading";
import { PanelHeading } from "../../components/PanelHeading";
import type { TranslationKey } from "../../i18n";

type Translator = (key: TranslationKey) => string;

type ReportItem = {
  id: string;
  title: string;
  category: string;
  updated: string;
  status: "Ready" | "Queued" | "Review";
  value: string;
};

export function ReportsPage({ t }: { t: Translator }) {
  const reports: ReportItem[] = [
    {
      id: "daily-overview",
      title: "Daily operations overview",
      category: "Operations",
      updated: "Today, 09:30",
      status: "Ready",
      value: "93% on-time visits",
    },
    {
      id: "nurse-triage",
      title: "Nurse triage summary",
      category: "Triage",
      updated: "Today, 08:40",
      status: "Review",
      value: "11 pending reviews",
    },
    {
      id: "patient-followup",
      title: "Follow-up adherence",
      category: "Outcomes",
      updated: "Yesterday",
      status: "Queued",
      value: "81% adherence",
    },
  ];

  const reportSnapshots = [
    { label: "Visits on time", value: "93%", tone: "blue" },
    { label: "Open reviews", value: "11", tone: "green" },
    { label: "Discharge delays", value: "2", tone: "orange" },
    { label: "Care gaps", value: "6", tone: "rose" },
  ];

  return (
    <>
      <PageHeading
        eyebrow={t("reports")}
        title={t("reportsTitle")}
        detail={t("reportsDetail")}
      />

      <div className="dashboard-grid">
        <section className="panel">
          <PanelHeading
            title={t("analyticsTitle")}
            detail={t("analyticsDetail")}
          />
          <div className="report-snapshot-grid">
            {reportSnapshots.map((snapshot) => (
              <div className="report-snapshot-card" key={snapshot.label}>
                <span>{snapshot.label}</span>
                <strong>{snapshot.value}</strong>
                <em className={`status ${snapshot.tone === "blue" ? "confirmed" : snapshot.tone === "green" ? "confirmed" : snapshot.tone === "orange" ? "pending" : "danger"}`}>
                  {snapshot.tone === "blue" ? "On target" : snapshot.tone === "green" ? "Healthy" : snapshot.tone === "orange" ? "Watch" : "Urgent"}
                </em>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <PanelHeading
            title={"Generated reports"}
            detail={"Operational snapshots for leadership and staff"}
          />
          <div className="team-list">
            {reports.map((report) => (
              <div className="team-row" key={report.id}>
                <div className="avatar avatar-doctor">
                  {report.title.slice(0, 2).toUpperCase()}
                </div>
                <div className="team-person">
                  <strong>{report.title}</strong>
                  <span>{report.category}</span>
                </div>
                <span>{report.updated}</span>
                <span className={`status ${report.status === "Ready" ? "confirmed" : report.status === "Queued" ? "pending" : "pending"}`}>
                  {report.status}
                </span>
                <button
                  type="button"
                  className="outline-btn"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("careos:toast", {
                        detail: `${report.title} export queued.`,
                      }),
                    )
                  }
                >
                  <Download size={14} /> Export
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
