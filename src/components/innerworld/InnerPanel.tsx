"use client";

import Link from "next/link";
import { useInnerWorldStore } from "./innerWorldStore";
import type { ActiveArtifact } from "./innerWorldStore";
import { PORTFOLIO_CONTENT, INNER_WORLD_TEXT, BLOG_TEXT } from "@/data/content";
import type { PostMeta } from "@/lib/blog";

export default function InnerPanel() {
  const activeArtifact = useInnerWorldStore((s) => s.activeArtifact);
  const setActiveArtifact = useInnerWorldStore((s) => s.setActiveArtifact);

  if (!activeArtifact) return null;

  return (
    <div
      className="
        fixed z-40 font-mono text-cyan-300 bg-black/90 backdrop-blur-md
        border-cyan-900/60 overflow-y-auto
        bottom-0 left-0 right-0 max-h-[65vh] border-t
        md:bottom-auto md:top-0 md:left-auto md:right-0 md:w-80 md:max-h-none md:h-full md:border-t-0 md:border-l
      "
    >
      <div className="flex justify-center pt-3 pb-1 md:hidden">
        <div className="w-10 h-1 rounded-full bg-cyan-900" />
      </div>

      <div className="flex items-center justify-between px-4 md:px-6 py-2 md:pt-6 border-b border-cyan-900/40 md:border-none">
        <span className="text-xs text-cyan-600 tracking-widest uppercase">
          {panelHeader(activeArtifact)}
        </span>
        <button
          onClick={() => setActiveArtifact(null)}
          className="text-cyan-700 hover:text-cyan-300 tracking-widest p-2 -mr-2 text-sm"
          aria-label="Close"
        >
          [×]
        </button>
      </div>

      <div className="p-4 md:p-6 md:pt-2">
        {activeArtifact.kind === "post" && <PostPanelContent post={activeArtifact.post} />}
        {activeArtifact.kind === "project" && <ProjectPanelContent id={activeArtifact.id} />}
        {activeArtifact.kind === "experience" && <ExperiencePanelContent id={activeArtifact.id} />}
        {activeArtifact.kind === "contact" && <ContactPanelContent />}
      </div>
    </div>
  );
}

function panelHeader(a: Exclude<ActiveArtifact, null>): string {
  switch (a.kind) {
    case "post":
      return INNER_WORLD_TEXT.panel.postHeader;
    case "project":
      return INNER_WORLD_TEXT.panel.projectHeader;
    case "experience":
      return INNER_WORLD_TEXT.panel.experienceHeader;
    case "contact":
      return INNER_WORLD_TEXT.panel.contactHeader;
  }
}

function PostPanelContent({ post }: { post: PostMeta }) {
  return (
    <div className="space-y-4 text-sm">
      <div className="text-cyan-200 text-base font-bold tracking-wide">{post.title}</div>
      <div className="text-cyan-700 text-xs">
        {BLOG_TEXT.post.datePrefix} {post.date}
      </div>
      <div className="text-cyan-500 leading-relaxed">{post.excerpt}</div>
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-cyan-800 border border-cyan-950 px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
      <Link
        href={`/blog/${post.slug}`}
        className="inline-block text-xs text-cyan-400 hover:text-cyan-200 tracking-widest transition-colors pt-1"
      >
        {INNER_WORLD_TEXT.panel.readLink}
      </Link>
    </div>
  );
}

function ProjectPanelContent({ id }: { id: string }) {
  const project = PORTFOLIO_CONTENT.projects.find((p) => p.id === id);
  if (!project) return null;
  return (
    <div className="space-y-4 text-sm">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-200 font-bold hover:text-cyan-100 underline underline-offset-2"
      >
        {project.name}
      </a>
      <ul className="space-y-1 pt-1">
        {project.highlights.map((h, i) => (
          <li key={i} className="text-cyan-500 leading-relaxed">
            <span className="text-cyan-800 mr-1">›</span>
            {h}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1 pt-1">
        {project.stack.map((s) => (
          <span key={s} className="text-xs text-cyan-800 border border-cyan-950 px-1.5 py-0.5 rounded">
            {s}
          </span>
        ))}
      </div>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-xs text-cyan-400 hover:text-cyan-200 tracking-widest transition-colors pt-1"
      >
        {INNER_WORLD_TEXT.panel.githubLink}
      </a>
    </div>
  );
}

function ExperiencePanelContent({ id }: { id: string }) {
  const job = PORTFOLIO_CONTENT.experience.find((j) => j.id === id);
  if (!job) return null;
  return (
    <div className="space-y-4 text-sm">
      <div className="text-cyan-200 font-bold">{job.company}</div>
      <div className="text-cyan-400 text-xs">{job.title}</div>
      <div className="text-cyan-700 text-xs">
        {job.period} · {job.location}
      </div>
      <ul className="space-y-1 pt-1">
        {job.highlights.map((h, i) => (
          <li key={i} className="text-cyan-500 leading-relaxed">
            <span className="text-cyan-800 mr-1">›</span>
            {h}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1 pt-1">
        {job.stack.map((s) => (
          <span key={s} className="text-xs text-cyan-800 border border-cyan-950 px-1.5 py-0.5 rounded">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function ContactPanelContent() {
  const { contact } = PORTFOLIO_CONTENT;
  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-3 pt-1">
        <div>
          <div className="text-cyan-700 text-xs">EMAIL</div>
          <a
            href={`mailto:${contact.email}`}
            className="text-cyan-300 hover:text-cyan-100 underline underline-offset-2"
          >
            {contact.email}
          </a>
        </div>
        <div>
          <div className="text-cyan-700 text-xs">LINKEDIN</div>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-cyan-100 underline underline-offset-2 break-all"
          >
            {contact.linkedin.replace("https://", "")}
          </a>
        </div>
        <div>
          <div className="text-cyan-700 text-xs">GITHUB</div>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-cyan-100 underline underline-offset-2 break-all"
          >
            {contact.github.replace("https://", "")}
          </a>
        </div>
      </div>
    </div>
  );
}
