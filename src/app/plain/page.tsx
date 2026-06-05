import Link from "next/link";
import { PORTFOLIO_CONTENT, UI_TEXT } from "@/data/content";

export const metadata = {
  title: `${PORTFOLIO_CONTENT.name} — ${PORTFOLIO_CONTENT.role}`,
  description: PORTFOLIO_CONTENT.summary,
};

export default function PlainView() {
  const { name, role, summary, contact, languages, education, experience, skills } =
    PORTFOLIO_CONTENT;

  return (
    <main className="min-h-screen bg-black text-gray-200 font-mono">
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-12">

        {/* Nav */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-green-600 text-xs tracking-widest hover:text-green-400 transition-colors"
          >
            {UI_TEXT.nav.backToTransmission}
          </Link>
          <Link
            href="/blog"
            className="text-green-800 text-xs tracking-widest hover:text-green-600 transition-colors"
          >
            {UI_TEXT.nav.blogLink}
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-white text-3xl font-bold tracking-wide">{name}</h1>
          <p className="text-green-500 text-sm tracking-widest">{role}</p>
          <p className="text-gray-400 text-sm leading-relaxed pt-2">{summary}</p>
        </header>

        <hr className="border-green-950" />

        {/* Experience */}
        <section className="space-y-6">
          <h2 className="text-green-500 text-xs tracking-widest">EXPERIENCE</h2>
          {experience.map((job) => (
            <div key={job.id} className="space-y-2">
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <span className="text-white font-bold">{job.company}</span>
                <span className="text-gray-600 text-xs">{job.period}</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <span className="text-green-400 text-sm">{job.title}</span>
                <span className="text-gray-600 text-xs">{job.location}</span>
              </div>
              <ul className="space-y-1 pt-1">
                {job.highlights.map((h, i) => (
                  <li key={i} className="text-gray-400 text-sm before:content-['–_'] before:text-green-800">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <hr className="border-green-950" />

        {/* Skills */}
        <section className="space-y-4">
          <h2 className="text-green-500 text-xs tracking-widest">SKILLS</h2>
          <div className="space-y-2">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="flex gap-3 flex-wrap text-sm">
                <span className="text-gray-600 w-24 shrink-0 capitalize">{category}</span>
                <span className="text-gray-300">{(items as string[]).join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-green-950" />

        {/* Education */}
        <section className="space-y-2">
          <h2 className="text-green-500 text-xs tracking-widest">EDUCATION</h2>
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <span className="text-white text-sm">{education.degree}</span>
            <span className="text-gray-600 text-xs">{education.years}</span>
          </div>
          <p className="text-gray-400 text-sm">{education.university} — {education.location}</p>
        </section>

        <hr className="border-green-950" />

        {/* Languages */}
        <section className="space-y-3">
          <h2 className="text-green-500 text-xs tracking-widest">LANGUAGES</h2>
          <div className="flex gap-6 flex-wrap">
            {languages.map((lang) => (
              <div key={lang.name} className="text-sm">
                <span className="text-gray-300">{lang.name}</span>
                <span className="text-gray-600 ml-2">{lang.level}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-green-950" />

        {/* Contact */}
        <section className="space-y-3">
          <h2 className="text-green-500 text-xs tracking-widest">CONTACT</h2>
          <div className="space-y-1 text-sm">
            <div>
              <span className="text-gray-600 w-16 inline-block">Email</span>
              <a href={`mailto:${contact.email}`} className="text-green-400 hover:text-green-300 transition-colors">
                {contact.email}
              </a>
            </div>
            <div>
              <span className="text-gray-600 w-16 inline-block">LinkedIn</span>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
                {contact.linkedin.replace("https://", "")}
              </a>
            </div>
            {contact.github && (
              <div>
                <span className="text-gray-600 w-16 inline-block">GitHub</span>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
                  {contact.github.replace("https://", "")}
                </a>
              </div>
            )}
            <div>
              <span className="text-gray-600 w-16 inline-block">Phone</span>
              <span className="text-gray-300">{contact.phone}</span>
            </div>
          </div>
        </section>

        <hr className="border-green-950" />

        <footer className="text-green-900 text-xs tracking-widest text-center pb-4">
          <Link href="/" className="hover:text-green-700 transition-colors">
            {UI_TEXT.nav.backToTransmission}
          </Link>
        </footer>

      </div>
    </main>
  );
}
