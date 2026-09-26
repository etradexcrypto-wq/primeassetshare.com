import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const stories = [
  {
    tab: "Guidance",
    kicker: "Human perspective",
    title: "A plan shaped around your real life.",
    copy: "Bring your goals, time horizon, and questions together in one clear investing conversation.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/LMIkgRVKrfrwDWjI.png",
    tone: "story-cobalt",
  },
  {
    tab: "Intelligence",
    kicker: "Research with depth",
    title: "Turn market information into useful context.",
    copy: "See the signals that matter, understand the trade-offs, and make decisions without chasing every headline.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/pHjezRrfKseuAeun.png",
    tone: "story-violet",
  },
  {
    tab: "Planning",
    kicker: "Long-term structure",
    title: "Connect today’s choices to tomorrow’s freedom.",
    copy: "Create milestones for retirement, education, family, and the opportunities you have not imagined yet.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/LMIkgRVKrfrwDWjI.png",
    tone: "story-navy",
  },
  {
    tab: "Experience",
    kicker: "Tools that feel natural",
    title: "A simpler way to stay close to your money.",
    copy: "A focused interface, transparent choices, and support that is ready when your situation changes.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/pHjezRrfKseuAeun.png",
    tone: "story-blue",
  },
] as const;

export default function FeaturedStories() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % stories.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);
  const story = stories[active];
  return <section className={`featured-stories ${story.tone}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    <div className="container featured-story-stage">
      <div className="featured-story-copy" key={`copy-${active}`}>
        <p className="prime-kicker">{story.kicker}</p>
        <h2>{story.title}</h2>
        <p>{story.copy}</p>
        <a href="/approach" className="featured-story-link">See how we think <ArrowUpRight size={16} /></a>
      </div>
      <div className="featured-story-visual" key={`image-${active}`}><span className="story-orbit" /><img src={story.image} alt="" fetchPriority={active === 0 ? "high" : "auto"} /><div className="story-metric"><strong>{active === 0 ? "1:1" : active === 1 ? "24/7" : active === 2 ? "40+" : "98%"}</strong><span>{active === 0 ? "human guidance" : active === 1 ? "market context" : active === 2 ? "years of perspective" : "portfolio clarity"}</span></div></div>
    </div>
    <div className="container featured-story-tabs" role="tablist" aria-label="Featured investment stories">{stories.map((item, index) => <button type="button" role="tab" aria-selected={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)} key={item.tab}><span>{item.tab}</span><i /></button>)}</div>
  </section>;
}
