import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageHeading } from "../../components/PageHeading";
import { PanelHeading } from "../../components/PanelHeading";
import type { TranslationKey } from "../../i18n";

type Translator = (key: TranslationKey) => string;

export function AdminHub({ t }: { t: Translator }) {
  const metrics = [
    { label: "Active staff", value: "86", detail: "Across 6 care teams" },
    { label: "Open approvals", value: "11", detail: "Pending clinical review" },
    { label: "Compliance checks", value: "98%", detail: "This month" },
    { label: "Operational uptime", value: "99.7%", detail: "System availability" },
  ];

  const workstreams = [
    { title: "Clinical access", owner: "Front desk + nurses", status: "Healthy" },
    { title: "Insurance and billing", owner: "Admin team", status: "Review" },
    { title: "Staff onboarding", owner: "HR coordinator", status: "Healthy" },
    { title: "Policy sign-offs", owner: "Director office", status: "Action" },
  ];

  const governance = [
    "Access policy reviews completed for March",
    "Follow-up audit log synced across departments",
    "Three onboarding tasks require director approval",
    "Document retention review scheduled for Friday",
  ];

  return (
    <>
      <PageHeading
        eyebrow={t("organizationAdministration")}
        title="Organization administration"
        detail="Manage staffing, workflow owners, governance, and clinical operations across the care network."
      />

      <div className="dashboard-grid">
        <section className="panel">
          <PanelHeading title="Operational overview" detail="Current staffing and service coverage" />
          <div className="team-summary-grid">
            {metrics.map((metric) => (
              <div className="team-summary-card" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <em className="status confirmed">{metric.detail}</em>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <PanelHeading title="Workstream status" detail="Priority operational areas" />
          <div className="team-list">
            {workstreams.map((item) => (
              <div className="team-row" key={item.title}>
                <div className="avatar avatar-doctor"><Building2 size={14} /></div>
                <div className="team-person">
                  <strong>{item.title}</strong>
                  <span>{item.owner}</span>
                </div>
                <span className={`status ${item.status === "Action" ? "danger" : item.status === "Review" ? "pending" : "confirmed"}`}>
                  {item.status}
                </span>
                <button
                  type="button"
                  className="text-btn"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("careos:toast", { detail: `${item.title} opened.` }),
                    )
                  }
                >
                  Open <ArrowUpRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <PanelHeading title="Governance" detail="Compliance and documentation watchlist" />
          <div className="team-list">
            {governance.map((item) => (
              <div className="team-row" key={item}>
                <div className="avatar avatar-doctor"><ClipboardCheck size={14} /></div>
                <div className="team-person">
                  <strong>{item}</strong>
                  <span>Organization policy</span>
                </div>
                <span className="status confirmed">Verified</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <PanelHeading title="Administrative actions" detail="Recommended next steps" />
          <div className="stat-grid compact">
            <div className="stat-card">
              <div className="stat-icon blue"><Users size={16} /></div>
              <span className="stat-label">Staff onboarding</span>
              <strong className="stat-value">4</strong>
            </div>
            <div className="stat-card">
              <div className="stat-icon green"><BriefcaseBusiness size={16} /></div>
              <span className="stat-label">Open schedules</span>
              <strong className="stat-value">7</strong>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange"><ShieldCheck size={16} /></div>
              <span className="stat-label">Access reviews</span>
              <strong className="stat-value">3</strong>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
