
   // Config is editable
   // The rendering code underneath it can be left alone.
 

/* ==========================================================================
   CONFIG
   ========================================================================== */
const CONFIG = {

  /*   LINKS
     --------------------------------------------------------------------- */
  email:       "Joshualima900@gmail.com",
  githubUrl:   "https://github.com/J0shua-afk",
  linkedinUrl: "https://www.linkedin.com/in/joshua-grace-lima-40128b31b/",
  repoUrl:     "https://github.com/J0shua-afk/Joshua-Lima",    // site's own repo

  /* ---------------------------------------------------------------------
     PROJECTS

       title         project name
       description   one to two sentences
       status        "building" | "live" | ""   ("" renders no label)
       technologies  array of strings, joined with a middle dot.
                     Use as many as are true, three is typical, one is fine.
       githubUrl     repository link
       liveUrl       leave "" and the Live label is plain text.
                     Add a URL and the label becomes a link automatically.

     Ordering is automatic: building, then live, then unlabelled. Inside a
     group, entries keep the order you write them in here.

     Layout is uniform: every entry is a "row", title and tech on the left,
     description and links on the right, all sharing one left edge. A single
     entry can be pinned to the wide display treatment by adding
     layout: "lead"  to it.
     --------------------------------------------------------------------- */
  projects: [
    {
      title: "Censor-A-Chat",
      description:
        "A live global room where every message is visible to everyone, and any word " +
        "someone uses is censored worldwide for the next 24 hours. The shared vocabulary " +
        "keeps shrinking as people talk, so the real problem is holding one consistent " +
        "word state across thousands of concurrent senders.",
      status: "building",
      technologies: ["Node.js", "WebSockets", "Redis"],
      githubUrl: "https://github.com/J0shua-afk/censor-the-chat",
      liveUrl: ""
    },
    {
      title: "Smart Home Dashboard",
      description:
        "A software-only IoT simulation: three Python publishers push temperature, humidity " +
        "and motion readings through an MQTT broker to a dashboard that updates asynchronously " +
        "as they arrive. Retained messages let a new connection see the last known motion " +
        "state immediately instead of waiting for the next event.",
      status: "live",
      technologies: ["Python", "MQTT", "JavaScript"],
      githubUrl: "https://github.com/J0shua-afk/SmartHome-Sensors",
      liveUrl: "https://smart-home-dashboard-h1n1.vercel.app"
    },
    {
      title: "Multiplayer Hangman",
      description:
        "A networked Hangman where one player hosts and chooses the word while the others " +
        "connect as guessers, drawing from five word categories. Turn order, player status, " +
        "disconnects and end of game stay synchronized across every client over raw sockets.",
      status: "live",
      technologies: ["Python", "JSON", "Socket"],
      githubUrl: "https://github.com/J0shua-afk/Multiplayer-Hangman",
      liveUrl: ""                                                    
    },
    {
      title: "Course Management",
      description:
        "Software for running the day-to-day operations of a course management system, " +
        "written in C++.",
      status: "live",
      technologies: ["C++"],
      githubUrl: "https://github.com/J0shua-afk/Course-Management-System",
      liveUrl: ""                                                    
    }
  ],

  /* ---------------------------------------------------------------------
     SKILLS 
     --------------------------------------------------------------------- */
  skills: [
    { label: "Languages",       items: "Python, C#, C/C++, JavaScript, TypeScript, HTML/CSS, SQL, Bash" },
    { label: "Frameworks",      items: "Flask, React, Node.js, Angular, Flutter, PyTorch" },
    { label: "Developer tools", items: "Git, GitHub, MySQL, MongoDB, Google Cloud, AWS, Figma, VS Code" },
    { label: "Libraries",       items: "NumPy, Pandas, Matplotlib, Requests, jQuery" }
  ]
};


/* ==========================================================================
   RENDERING 
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (sel) { return document.querySelector(sel); };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  /* ---------- links ---------- */
  $("#nav-github").href   = CONFIG.githubUrl;
  $("#nav-linkedin").href = CONFIG.linkedinUrl;
  $("#footer-repo").href  = CONFIG.repoUrl;

  var emailLink = $("#footer-email");
  emailLink.href        = "mailto:" + CONFIG.email;
  emailLink.textContent = CONFIG.email;

  $("#year").textContent = new Date().getFullYear();

  /* ---------- avatar: initials stand in until a real photo exists ---------- */
  var avatarImg = $("#avatar-img");

  function avatarFallback() {
    if (avatarImg && avatarImg.parentNode) { avatarImg.remove(); }
    $("#avatar").textContent = "JL";
  }

  avatarImg.addEventListener("error", avatarFallback);
  if (avatarImg.complete && avatarImg.naturalWidth === 0) { avatarFallback(); }

  /* ---------- projects ---------- */
  var STATUS_RANK = { building: 0, live: 1 };
  var LAYOUTS = { lead: true, row: true };

  var ordered = CONFIG.projects
    .map(function (project, index) { return { project: project, index: index }; })
    .sort(function (a, b) {
      var rankA = STATUS_RANK[a.project.status];
      var rankB = STATUS_RANK[b.project.status];
      if (rankA === undefined) { rankA = 2; }
      if (rankB === undefined) { rankB = 2; }
      return rankA - rankB || a.index - b.index;
    })
    .map(function (entry) { return entry.project; });

  function layoutFor(project) {
    return LAYOUTS[project.layout] ? project.layout : "row";
  }

  function statusMarkup(project) {
    if (project.status === "building") {
      return '<span class="status status--building">' +
               '<span class="status__dot" aria-hidden="true"></span>Building' +
             '</span>';
    }

    if (project.status === "live") {
      var inner = '<span class="status__dot" aria-hidden="true"></span>Live';

      if (project.liveUrl) {
        return '<a class="status status--live" href="' + esc(project.liveUrl) +
                 '" target="_blank" rel="noopener noreferrer">' + inner +
                 '<span class="visually-hidden"> site for ' + esc(project.title) + '</span>' +
               '</a>';
      }
      return '<span class="status status--live">' + inner + '</span>';
    }

    return "";
  }

  function techMarkup(project) {
    var list = project.technologies || [];
    if (!list.length) { return ""; }

    var text = list.map(esc).join(" \u00B7 ");
    return '<p class="project__tech">' + text + '</p>';
  }

  $("#project-list").innerHTML = ordered.map(function (project) {
    return '<article class="project project--' + layoutFor(project) + '">' +
             '<div class="project__rail">' +
               '<h3 class="project__title">' + esc(project.title) + '</h3>' +
               techMarkup(project) +
             '</div>' +
             '<div class="project__body">' +
               (project.description
                 ? '<p class="project__desc">' + esc(project.description) + '</p>'
                 : '') +
               '<div class="project__actions">' +
                 '<a class="project__link" href="' + esc(project.githubUrl) +
                   '" target="_blank" rel="noopener noreferrer">GitHub' +
                   '<span class="visually-hidden"> repository for ' + esc(project.title) + '</span>' +
                 '</a>' +
                 statusMarkup(project) +
               '</div>' +
             '</div>' +
           '</article>';
  }).join("");

  /* ---------- skills ---------- */
  $("#skill-list").innerHTML = CONFIG.skills.map(function (row) {
    return "<div><dt>" + esc(row.label) + "</dt><dd>" + esc(row.items) + "</dd></div>";
  }).join("");

  /* ---------- copy email ---------- */
  var copyBtn    = $("#copy-email");
  var copyStatus = $("#copy-status");
  var resetTimer;

  function finish(message) {
    copyStatus.textContent = message;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function () {
      copyBtn.dataset.copied = "false";
      copyBtn.title = "Copy email address";
      copyStatus.textContent = "";
    }, 2200);
  }

  function legacyCopy() {
    var field = document.createElement("textarea");
    field.value = CONFIG.email;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    var copied = document.execCommand("copy");
    field.remove();
    return copied;
  }

  copyBtn.addEventListener("click", function () {
    function succeeded() {
      copyBtn.dataset.copied = "true";
      copyBtn.title = "Copied";
      finish("Email address copied to clipboard");
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(CONFIG.email).then(succeeded, function () {
        if (legacyCopy()) { succeeded(); }
        else { finish("Copy failed. Email: " + CONFIG.email); }
      });
    } else if (legacyCopy()) {
      succeeded();
    } else {
      finish("Copy failed. Email: " + CONFIG.email);
    }
  });
})();
