"use client";

import { useEffect, useMemo, useState } from "react";

type Filter = "all" | "desktop" | "automation" | "experiments";

type Project = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  label: string;
  category: Filter;
  tags: string[];
  status: string;
  accent: "green" | "violet" | "orange" | "blue";
  featured?: boolean;
  link?: string;
  details: {
    problem: string;
    solution: string;
    proof: string[];
    boundary: string;
  };
};

const filters: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All work" },
  { id: "desktop", label: "Desktop" },
  { id: "automation", label: "AI automation" },
  { id: "experiments", label: "Experiments" },
];

const projects: Project[] = [
  {
    id: "lingxi",
    number: "01",
    title: "灵犀交付助手",
    shortTitle: "Lingxi Delivery Assistant",
    summary:
      "把 ADB 现场交付收敛成一套可视化桌面工作流，让连接、资源、安装和诊断在同一个界面里发生。",
    label: "Featured build",
    category: "desktop",
    tags: ["Electron", "React", "TypeScript", "ADB"],
    status: "active build",
    accent: "green",
    featured: true,
    details: {
      problem:
        "现场交付需要在设备、APK、配置文件和 ADB 命令之间反复切换；不同设备的连接信号和日志路径也不一样。",
      solution:
        "用桌面 App 把流程拆成连接识别、资源准备、配置校验、执行安装和诊断采集，并把每一步的状态反馈到 UI。",
      proof: [
        "支持大屏机顶盒与灵犀屏两类设备流程",
        "资源可来自本地文件或公开 HTTP/HTTPS 地址",
        "插件动作支持状态、重试与命令复制",
        "支持一次性 / 持续 logcat、截图、设备信息与录屏采集",
      ],
      boundary:
        "当前以源码已实现的能力为准；在线资源仓库、批量装机、自动更新和完整报告仍属于后续方向。",
    },
  },
  {
    id: "autoxhs",
    number: "02",
    title: "Autoxhs",
    shortTitle: "Xiaohongshu content automation",
    summary:
      "围绕小红书内容生成与发布的自动化实验，探索从素材到标题、正文和标签的流水线。",
    label: "Public repo / adaptation",
    category: "automation",
    tags: ["Python", "OpenAI API", "Content ops"],
    status: "public experiment",
    accent: "violet",
    link: "https://github.com/haomiaoOnline/Autoxhs",
    details: {
      problem:
        "内容生产常常被拆成多个重复动作：整理素材、生成标题、写正文、补标签，再进入发布流程。",
      solution:
        "把这些动作串成一个可重复的内容工作流，作为 AI 辅助内容运营的公开实验。",
      proof: [
        "公开仓库描述覆盖图片、标题、正文和标签生成",
        "项目以 OpenAI API 作为内容生成入口",
        "网站将其标注为公开仓库 / 改造实验，而非从零原创声明",
      ],
      boundary:
        "首版只展示公开仓库可核验的定位，不虚构发布规模、账号效果或商业结果。",
    },
  },
  {
    id: "goofish",
    number: "03",
    title: "闲鱼 AI 工具组",
    shortTitle: "Goofish monitoring & agent experiments",
    summary:
      "从商品监控到智能客服，围绕闲鱼场景试验实时任务、上下文对话与多专家协同。",
    label: "Fork / participation",
    category: "automation",
    tags: ["Playwright", "AI agents", "Python"],
    status: "field notes",
    accent: "orange",
    details: {
      problem:
        "海量商品信息与重复客服动作让人工筛选和响应变得琐碎，值得用自动化把注意力还给真正需要判断的部分。",
      solution:
        "围绕监控、分析、自动回复、议价和发货确认，参与多个公开项目的改造与实践。",
      proof: [
        "公开资料显示 ai-goofish-monitor 聚焦实时 / 定时监控与 AI 分析",
        "xianyuautoagent 聚焦上下文对话与多专家协同",
        "xianyu-auto-reply-fix 聚焦多账号与自动回复流程",
      ],
      boundary:
        "这些仓库包含 fork / 参与项目，页面会明确标注关系，不把公开仓库描述为全部原创。",
    },
  },
  {
    id: "reclip",
    number: "04",
    title: "reclip",
    shortTitle: "A lightweight media utility",
    summary:
      "一个轻量、自托管、带干净 Web UI 的媒体下载工具，代表对小工具体验的持续打磨。",
    label: "Utility exploration",
    category: "experiments",
    tags: ["HTML", "Self-hosted", "Web UI"],
    status: "small signal",
    accent: "blue",
    link: "https://github.com/haomiaoOnline/reclip",
    details: {
      problem:
        "很多实用工具并不需要复杂的产品外壳，但需要一条足够短、足够清楚的完成路径。",
      solution:
        "用轻量的 Web UI 包住媒体下载能力，保持自托管、可理解和低摩擦。",
      proof: [
        "公开仓库描述为可下载多个网站视频的轻量工具",
        "强调 self-hosted 与 clean web UI",
        "作为工具探索卡片展示，而非核心产品案例",
      ],
      boundary:
        "只展示公开项目定位，不延伸到未核验的平台覆盖、下载性能或运营数据。",
    },
  },
];

const sectionIds = ["work", "about", "links"];

function ArrowUpRight() {
  return <span className="arrow-icon" aria-hidden="true">↗</span>;
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  return (
    <article className={`project-card ${project.featured ? "featured" : ""} accent-${project.accent}`}>
      <button
        className="project-card-main"
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open details for ${project.title}`}
      >
        <div className="project-card-topline">
          <span className="project-number">{project.number}</span>
          <span className="project-status"><i />{project.status}</span>
        </div>
        <div className="project-card-copy">
          <p className="project-label">{project.label}</p>
          <h3>{project.title}</h3>
          <p className="project-short-title">{project.shortTitle}</p>
          <p className="project-summary">{project.summary}</p>
        </div>
        <div className="project-card-bottom">
          <div className="tag-list">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <span className="open-project">Read case <ArrowUpRight /></span>
        </div>
      </button>
      {project.link ? (
        <a className="project-external-link" href={project.link} target="_blank" rel="noreferrer">
          View public repository <ArrowUpRight />
        </a>
      ) : null}
    </article>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const visibleProjects = useMemo(
    () => activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="yumi home">
          <span className="wordmark-mark">y</span>
          <span>yumi</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {sectionIds.map((id) => (
            <a key={id} href={`#${id}`}>{id === "work" ? "Work" : id === "about" ? "About" : "Links"}</a>
          ))}
        </nav>
        <div className="header-meta"><span className="pulse-dot" />private preview</div>
      </header>

      <div id="top" className="hero-wrap">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span>YUMI / CL</span><span className="eyebrow-line" />digital nomad · tool maker</p>
            <h1 id="hero-title">把复杂的工作，<em>做成能被使用的工具。</em></h1>
            <p className="hero-description">数字游民，围绕 AI、自动化与桌面工具做持续实验。把现实里的摩擦，压缩成更清楚的流程。</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore the work <ArrowUpRight /></a>
              <a className="text-link" href="https://x.com/cla2rd" target="_blank" rel="noreferrer">Follow the field notes <ArrowUpRight /></a>
            </div>
            <div className="hero-caption"><span>01</span><p>我相信一个好工具，<br />应该让下一步变得显而易见。</p></div>
          </div>

          <div className="hero-visual" aria-label="A CSS-built preview of a tool workspace">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="console-card console-main">
              <div className="console-bar"><span className="console-kicker">FIELD / 2026</span><span className="console-dots"><i /><i /><i /></span></div>
              <div className="console-heading"><span>ship something<br /><strong>useful.</strong></span><span className="console-index">Y—01</span></div>
              <div className="console-grid">
                <div className="console-tile tile-signal"><span className="tile-label">signal</span><strong>clear</strong><div className="signal-bars"><i /><i /><i /><i /><i /></div></div>
                <div className="console-tile tile-work"><span className="tile-label">current work</span><strong>lingxi</strong><div className="mini-progress"><span /></div><small>desktop workflow / active</small></div>
                <div className="console-tile tile-code"><span className="tile-label">notes / 04</span><div className="code-line"><i /><i /><i /></div><div className="code-line short"><i /><i /></div><div className="code-line"><i /><i /><i /></div></div>
              </div>
              <div className="console-footer"><span><i className="status-ring" /> observe · compress · ship</span><span>scroll to explore ↓</span></div>
            </div>
            <div className="floating-note note-one"><span className="note-index">A</span><span>less friction<br /><strong>more signal</strong></span></div>
            <div className="floating-note note-two"><span className="note-index">↗</span><span>tool<br /><strong>maker</strong></span></div>
          </div>
        </section>
        <div className="hero-scroll-cue"><span>Scroll to enter</span><i /></div>
      </div>

      <section className="signal-strip" aria-label="Profile signals">
        <div><span className="signal-number">01</span><span>featured build</span></div>
        <div><span className="signal-number">04</span><span>public experiments</span></div>
        <div><span className="signal-number">02</span><span>ways to find me</span></div>
        <div className="signal-note">A small personal lab for useful things.</div>
      </section>

      <section className="content-section work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <div><p className="eyebrow">Selected work / 001</p><h2 id="work-title">Things I make<br /><em>to make work lighter.</em></h2></div>
          <p className="section-intro">一些桌面工具、自动化实验和小型的现实改造。每个项目都从一个具体的摩擦开始。</p>
        </div>
        <div className="filter-row" role="group" aria-label="Filter projects">
          <span className="filter-caption">showing</span>
          {filters.map((filter) => <button key={filter.id} className={activeFilter === filter.id ? "active" : ""} type="button" onClick={() => setActiveFilter(filter.id)}>{filter.label}</button>)}
        </div>
        <div className="projects-grid">
          {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />)}
        </div>
        {visibleProjects.length === 0 ? <div className="empty-state">No experiments in this filter yet.</div> : null}
      </section>

      <section className="process-section" aria-labelledby="process-title">
        <div className="section-heading process-heading"><div><p className="eyebrow">The method / 002</p><h2 id="process-title">Observe.<br /><em>Compress. Ship.</em></h2></div><p className="section-intro">我不太相信“更复杂”天然等于“更好”。好的工具会把复杂性藏在正确的地方。</p></div>
        <div className="process-grid">
          <article><div className="process-top"><span>01</span><span className="process-mark mark-observe" /></div><h3>Observe</h3><p>先看真实的人怎么工作，哪里反复、哪里等待、哪里最容易出错。</p><span className="process-word">friction →</span></article>
          <article><div className="process-top"><span>02</span><span className="process-mark mark-compress" /></div><h3>Compress</h3><p>把命令、规则和判断整理成一条更短的路径，让下一步不再需要解释。</p><span className="process-word">clarity →</span></article>
          <article><div className="process-top"><span>03</span><span className="process-mark mark-ship" /></div><h3>Ship</h3><p>交付一个今天就能使用的界面，再从真实反馈里决定它该长成什么样。</p><span className="process-word">useful →</span></article>
        </div>
      </section>

      <section className="content-section about-section" id="about" aria-labelledby="about-title">
        <div className="about-portrait" aria-label="yumi monogram portrait placeholder"><span>y</span><small>cl / yumi<br />always curious</small><div className="portrait-grid" /></div>
        <div className="about-copy"><p className="eyebrow">About / 003</p><h2 id="about-title">Hello, I&apos;m <em>yumi.</em></h2><p className="about-lede">一个在 AI 时代里寻找更自由工作方式的人。现在主要做自动化、桌面工具和一些说不清但很想试试的东西。</p><p className="about-body">公开身份是 <strong>yumi / cl</strong>。我会把复杂的流程拆开，把有趣的想法做成小项目，再把过程写进代码、界面和 field notes 里。</p><div className="about-facts"><div><span>based in</span><strong>the internet</strong></div><div><span>thinking about</span><strong>AI × real work</strong></div><div><span>currently</span><strong>shipping Lingxi</strong></div></div></div>
      </section>

      <section className="links-section" id="links" aria-labelledby="links-title">
        <div className="links-heading"><p className="eyebrow">Find me / 004</p><h2 id="links-title">Keep in touch<br /><em>with the experiments.</em></h2></div>
        <div className="links-list">
          <a href="https://github.com/haomiaoOnline" target="_blank" rel="noreferrer"><span className="link-index">01</span><span className="link-main"><strong>GitHub</strong><small>projects, forks & field work</small></span><ArrowUpRight /></a>
          <a href="https://x.com/cla2rd" target="_blank" rel="noreferrer"><span className="link-index">02</span><span className="link-main"><strong>X / @cla2rd</strong><small>notes from the moving lab</small></span><ArrowUpRight /></a>
        </div>
      </section>

      <footer className="site-footer"><span>© 2026 yumi / cl</span><span>made with curiosity and a little less friction <i>✳</i></span><a href="#top">back to top ↑</a></footer>

      {selectedProject ? (
        <div className="modal-layer" role="presentation" onClick={() => setSelectedProject(null)}>
          <section className={`project-modal accent-${selectedProject.accent}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(event) => event.stopPropagation()}>
            <div className="modal-topline"><span>{selectedProject.number} / {selectedProject.label}</span><button type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details">Close <span>×</span></button></div>
            <div className="modal-title-row"><div><p className="eyebrow">Case note</p><h2 id="project-modal-title">{selectedProject.title}</h2><p>{selectedProject.shortTitle}</p></div><span className="modal-status"><i />{selectedProject.status}</span></div>
            <div className="modal-body"><div><span className="modal-label">The friction</span><p>{selectedProject.details.problem}</p></div><div><span className="modal-label">The compression</span><p>{selectedProject.details.solution}</p></div><div className="modal-proof"><span className="modal-label">What is in the build</span><ul>{selectedProject.details.proof.map((item) => <li key={item}><i />{item}</li>)}</ul></div><div className="modal-boundary"><span className="modal-label">Boundary note</span><p>{selectedProject.details.boundary}</p></div></div>
            <div className="modal-footer"><div className="tag-list">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{selectedProject.link ? <a className="button button-primary" href={selectedProject.link} target="_blank" rel="noreferrer">Open public repo <ArrowUpRight /></a> : <span className="modal-private">private project / local preview</span>}</div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
