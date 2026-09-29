import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";

const plans = [
  {
    name: "Prime Starter",
    tone: "foundation",
    profile: "Start with the essentials",
    range: "$40 – $499",
    percentage: "15%",
    review: "On-demand overview",
    copy: "A simple entry point for learning the platform, organizing a first goal, and building a consistent investing habit.",
    points: ["Responsive portfolio overview", "Investor learning resources", "Standard support access"],
    action: "Explore Starter",
  },
  {
    name: "Prime Advance",
    tone: "horizon",
    profile: "Add more room to explore",
    range: "$500 – $999",
    percentage: "25%",
    review: "Monthly planning view",
    copy: "A broader experience for investors who want more context, structured tracking, and additional educational support.",
    points: ["Everything in Starter", "Priority support routing", "Expanded learning library"],
    action: "Explore Advance",
  },
  {
    name: "Prime Superior",
    tone: "steward",
    profile: "For active long-term builders",
    range: "$1,000 – $2,999",
    percentage: "55%",
    review: "Quarterly strategy view",
    copy: "A more considered planning tier for larger goals, diversified exposure, and deeper market intelligence.",
    points: ["Everything in Advance", "Dedicated planning contact", "Advanced market tools"],
    action: "Explore Superior",
    featured: true,
  },
  {
    name: "Prime Signature",
    tone: "signature",
    profile: "For complex financial goals",
    range: "$3,000+",
    percentage: "200%",
    review: "Personalized planning cadence",
    copy: "A tailored starting point for multi-stage planning, family priorities, and a more personalized investment conversation.",
    points: ["Personalized allocation discussion", "Priority human guidance", "Family and legacy planning context"],
    action: "Explore Signature",
  },
];

export default function PlanSection() {
  return (
    <section className="plans-section section-pad" id="plans">
      <div className="container">
        <div className="section-kicker">
          <span>06 / Structured choices</span>
          <span className="line" />
        </div>

        <div className="plans-heading">
          <div>
            <p className="prime-kicker">Choose your starting point</p>
            <h2>
              A plan for
              <br />
              <em>what matters next.</em>
            </h2>
          </div>
          <p>
            Compare the available funding ranges and service levels before choosing a direction.
            Investment performance is never guaranteed, and every plan should match your goals,
            timeline, and risk tolerance.
          </p>
        </div>

        <div className="plans-image-strip">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/sNZtsvwxmDFPbcgg.jpg"
            alt="A family discussing a long-term financial plan"
          />
          <div>
            <small>Plan with a longer view</small>
            <strong>Give every contribution a clearer purpose.</strong>
          </div>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`plan-card ${plan.tone} ${plan.featured ? "featured" : ""}`}
            >
              {plan.featured && <span className="plan-badge">Most considered</span>}
              <small>{plan.profile}</small>
              <h3>{plan.name}</h3>
              <p>{plan.copy}</p>

              <div className="plan-range">
                <span>Funding range</span>
                <strong>{plan.range}</strong>
                <small>{plan.review}</small>
              </div>

              <div className="plan-percentage">
                <span>Return rate</span>
                <strong style={{ fontWeight: 700 }}>{plan.percentage}</strong>
              </div>

              <ul>
                {plan.points.map((point) => (
                  <li key={point}>
                    <Check size={15} />
                    {point}
                  </li>
                ))}
              </ul>

              <a className="text-link" href="https://app.primeassetshare.com">
                {plan.action} <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
        </div>

        <p className="plans-disclaimer">
          <ShieldCheck size={15} /> Plan names describe platform access and educational support
<<<<<<< Updated upstream
          only. They do not promise fixed returns, profits, or time-bound investment outcomes.
=======
          only.
>>>>>>> Stashed changes
        </p>
      </div>
    </section>
  );
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
