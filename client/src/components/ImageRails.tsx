const rails = [
  ["https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/LMIkgRVKrfrwDWjI.png", "People with a plan", "Human context for every financial decision."],
  ["https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/pHjezRrfKseuAeun.png", "Generational thinking", "Build a future with more room to move."],
  ["https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/LMIkgRVKrfrwDWjI.png", "Better together", "The clearest plans start with a conversation."],
  ["https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/pHjezRrfKseuAeun.png", "Small steps, real momentum", "Consistency gives long-term investing its power."],
] as const;
export default function ImageRails() { return <section className="image-rails section-pad"><div className="container"><div className="image-rails-heading"><p className="prime-kicker">The human side of investing</p><h2>Plans become powerful<br /><em>when they feel personal.</em></h2></div><div className="rail-stack">{rails.map(([image, title, copy], index) => <article className={`image-rail ${index % 2 ? "rail-right" : "rail-left"}`} key={title}><img src={image} alt="" loading="lazy" /><div><small>primeassetshare / {String(index + 1).padStart(2, "0")}</small><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>; }
