import { Activity, ArrowUpRight, Clock3, UserPlus, Users } from "lucide-react";
import { PageHeading } from "../../components/PageHeading";
import { PanelHeading } from "../../components/PanelHeading";
import type { TranslationKey } from "../../i18n";

type Translator = (key: TranslationKey) => string;

export function StaffManagement({ t }: { t: Translator }) {
  const staff = [
    { name: "Dr. Rana Samir", role: "Lead physician", schedule: "Consulting", load: "82%", status: "Available" },
    { name: "Nurse Huda Ali", role: "Triage lead", schedule: "Current shift", load: "91%", status: "Busy" },
    { name: "Mariam Saleh", role: "Reception coordinator", schedule: "Front desk", load: "76%", status: "Available" },
    { name: "Samir Khaled", role: "Clinical admin", schedule: "Documentation", load: "68%", status: "Review" },
  ];

  const quickActions = [
    "Review staffing coverage for afternoon clinic",
    "Confirm nurse handoff for Authorizaion desk",
    "Approve onboarding list for new intake coordinator",
    "Audit last 24h access events for clinician rooms",
  ];

  return (
    <>
      <PageHeading
        eyebrow={t("teamAudit")}
        title="Staff management"
        detail="Monitor coverage, schedule capacity, and operational readiness across the care teams."
        action={
          <button type="button" className="primary-btn">
            <UserPlus size={16} /> Invite staff
          </button>
        }
      />

      <div className="dashboard-grid">
        <section className="panel">
          <PanelHeading title="Coverage overview" detail="Live human capacity summary" />
          <div className="team-summary-grid">
            <div className="team-summary-card">
              <span>On duty</span>
              <strong>28</strong>
              <em className="status confirmed">Across 5 teams</em>
            </div>
            <div className="team-summary-card">
              <span>Open slots</span>
              <strong>7</strong>
              <em className="status pending">Need coverage</em>
            </div>
            <div className="team-summary-card">
              <span>Avg. load</span>
              <strong>79%</strong>
              <em className="status confirmed">Balanced</em>
            </div>
            <div className="team-summary-card">
              <span>Escalations</span>
              <strong>3</strong>
              <em className="status danger">Requires review</em>
            </div>
          </div>
        </section>

        <section className="panel">
          <PanelHeading title="Current staffing" detail="Daily assignment overview" />
          <div className="team-list">
            {staff.map((person) => (
              <div className="team-row" key={person.name}>
                <div className="avatar avatar-doctor">{person.name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase()}</div>
                <div className="team-person">
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                </div>
                <span>{person.schedule}</span>
                <span className={`status ${person.status === "Available" ? "confirmed" : person.status === "Busy" ? "pending" : "danger"}`}>
                  {person.status}
                </span>
                <span>{person.load}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <PanelHeading title="Shift readiness" detail="Operational staffing by stream" />
          <div className="stat-grid compact">
            <div className="stat-card">
              <div className="stat-icon blue"><Users size={16} /></div>
              <span className="stat-label">Consultation</span>
              <strong className="stat-value">5/6</strong>
            </div>
            <div className="stat-card">
              <div className="stat-icon green"><Activity size={16} /></div>
              <span className="stat-label">Triage</span>
              <strong className="stat-value">4/5</strong>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange"><Clock3 size={16} /></div>
              <span className="stat-label">Support desk</span>
              <strong className="stat-value">2/3</strong>
            </div>
          </div>
        </section>

        <section className="panel">
          <PanelHeading title="Priority actions" detail="High-priority staffing tasks" />
          <div className="team-list">
            {quickActions.map((action) => (
              <div className="team-row" key={action}>
                <div className="avatar avatar-doctor"><ArrowUpRight size={14} /></div>
                <div className="team-person">
                  <strong>{action}</strong>
                  <span>Operational queue</span>
                </div>
                <button
                  type="button"
                  className="text-btn"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("careos:toast", { detail: "Staff action opened." }),
                    )
                  }
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
