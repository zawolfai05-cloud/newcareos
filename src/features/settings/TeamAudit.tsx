import { useEffect, useState } from "react";
import { MoreHorizontal, Plus, ShieldCheck } from "lucide-react";
import { getAuditEvents, getTeam } from "../../api/team";
import type { Language, TranslationKey } from "../../i18n";
import { PageHeading } from "../../components/PageHeading";

type Translator = (key: TranslationKey) => string;

type TeamAuditProps = { t: Translator; language: Language };

export function TeamAudit({ t, language }: TeamAuditProps) {
  const [tab, setTab] = useState<"team" | "audit">("team");
  const [members, setMembers] = useState<Array<{ name: string; email: string; role: string; status: string; department: string; focus: string; shift: string }>>([]);
  const [events, setEvents] = useState<Array<{ action: string; resource: string; time: string; actor: string }>>([]);

  useEffect(() => {
    Promise.all([getTeam(), getAuditEvents()]).then(([team, audit]) => {
      setMembers(
        team.map((member) => ({
          name: member.full_name,
          email: member.email,
          role: member.role,
          status: member.onboarding_complete ? t("active") : t("invited"),
          department: member.department || "General Medicine",
          focus: member.role === "doctor" ? "Clinical review" : member.role === "nurse" ? "Triage" : "Operations",
          shift: member.role === "doctor" ? "Morning rounds" : member.role === "nurse" ? "Triage window" : "Front desk",
        })),
      );
      setEvents(
        audit.map((event) => ({
          action: event.action,
          resource: event.resource,
          actor: "Clinical system",
          time: new Date(event.created_at).toLocaleString(),
        })),
      );
    }).catch(() => {
      setMembers([]);
      setEvents([]);
    });
  }, [t]);

  const teamMetrics = [
    { label: "Clinicians on duty", value: "18", tone: "confirmed" },
    { label: "Pending approvals", value: "11", tone: "pending" },
    { label: "Open shifts", value: "3", tone: "danger" },
    { label: "Avg. response", value: "12 min", tone: "confirmed" },
  ];

  return (
    <>
      <PageHeading
        eyebrow={t("teamAuditEyebrow")}
        title={t("teamAuditTitle")}
        detail={t("teamAuditDetail")}
        action={
          <button type="button" className="primary-btn">
            <Plus size={16} /> {t("inviteMember")}
          </button>
        }
      />
      <section className="panel team-audit-panel">
        <div className="tabs team-audit-tabs">
          <button type="button" className={tab === "team" ? "active" : ""} onClick={() => setTab("team")}>{t("teamMembers")}</button>
          <button type="button" className={tab === "audit" ? "active" : ""} onClick={() => setTab("audit")}>{t("auditLog")}</button>
        </div>
        {tab === "team" ? (
          <>
            <div className="team-summary-grid">
              {teamMetrics.map((metric) => (
                <div className="team-summary-card" key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <em className={`status ${metric.tone}`}>{metric.tone === "danger" ? "Action" : metric.tone === "pending" ? "Review" : "Healthy"}</em>
                </div>
              ))}
            </div>
            <div className="team-list">
              {members.map((member) => (
                <div className="team-row" key={member.email}>
                  <div className="avatar avatar-doctor">{member.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
                  <div className="team-person">
                    <strong>{member.name}</strong>
                    <span>{member.email}</span>
                  </div>
                  <span>{member.role}</span>
                  <span>{member.department}</span>
                  <span className="status confirmed">{member.status}</span>
                  <button type="button" className="round-btn" aria-label={language === "ar" ? "المزيد" : "More actions"}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="audit-list">
            {events.map((event) => (
              <div className="audit-row" key={`${event.action}-${event.resource}-${event.time}`}>
                <div className="audit-icon"><ShieldCheck size={15} /></div>
                <div>
                  <strong>{event.action}</strong>
                  <span>{event.resource}</span>
                </div>
                <span className="audit-actor">{event.actor}</span>
                <time>{event.time}</time>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
