
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
  resumeUrl:   "assets/Joshua-Grace_Lima_Resume.pdf",

  /* ---------------------------------------------------------------------
     PROJECTS

       title         project name
       description   one to three sentences
       status        "building" | "live" | ""   ("" renders no label)
       technologies  joined with a middle dot, [] hides the line
       githubUrl     repository link
       liveUrl       "" keeps the Live label as plain text, a url makes it a link
       layout        optional, "lead" for the wide display treatment

     the page shows them in the order written here. the first 4 are
     visible, the rest sit behind show more
     --------------------------------------------------------------------- */
  projects: [
    {
      title: "Censor-A-Chat",
      description:
        "A live global room where every message is visible to everyone, and any word " +
        "someone uses is censored worldwide for the next 24 hours. The shared vocabulary " +
        "keeps shrinking as people talk, so the real problem is holding one consistent " +
        "word state across many concurrent senders.",
      status: "building",
      technologies: [],
      githubUrl: "https://github.com/J0shua-afk/censor-the-chat",
      liveUrl: ""
    },
    {
      title: "Groundwork RAG",
      description:
        "An assistant that answers questions about the co-op job postings from a Winter 2027 " +
        "search, citing the postings it used or saying the answer isn't there. Postings are " +
        "split into heading-aware chunks and searched with pgvector, so each answer is built " +
        "only from the closest matching sections. The API is done and the interface is in progress.",
      status: "building",
      technologies: ["Python", "FastAPI", "pgvector"],
      githubUrl: "https://github.com/J0shua-afk/Groundwork-RAG",
      liveUrl: ""
    },
    {
      title: "Applied AI",
      description:
        "A set of AI programs: a rule-based spam filter for raw .eml files, a breadth-first " +
        "search solver for the water jug puzzle, a Connect Four player using Monte Carlo tree " +
        "search, a logic prover and a Keras regression model for taxi fares. The Connect Four " +
        "player steers its search with a heuristic-weighted UCB1 score.",
      status: "",
      technologies: ["Python", "TensorFlow/Keras", "unittest"],
      githubUrl: "https://github.com/J0shua-afk/AII501NAA-F2026",
      liveUrl: ""
    },
    {
      title: "Smart Home MQTT Dashboard",
      description:
        "A software-only IoT simulation: three Python publishers push temperature, humidity " +
        "and motion readings through an MQTT broker to a dashboard that updates asynchronously " +
        "as they arrive. Retained messages let a new connection see the last known motion " +
        "state immediately instead of waiting for the next event.",
      status: "live",
      technologies: ["Python", "MQTT", "JavaScript"],
      githubUrl: "https://github.com/J0shua-afk/Smart-Home-Dashboard",
      liveUrl: "https://smart-home-dashboard-h1n1.vercel.app"
    },
    {
      title: "Multiplayer Hangman",
      description:
        "A networked Hangman where one player hosts and picks a word category, the server " +
        "draws a random word from it, and the others join as guessers. The server runs one " +
        "thread per client and broadcasts every guess and the end of the game to all of them " +
        "as JSON over raw sockets.",
      status: "",
      technologies: ["Python", "JSON", "Socket"],
      githubUrl: "https://github.com/J0shua-afk/Multiplayer-Hangman",
      liveUrl: ""
    },
    {
      title: "Course Management",
      description:
        "A console course registration system built in a team of two. Admins add departments " +
        "and courses and save them to a CSV file that loads on the next start, while students " +
        "browse departments, pick a schedule for each course and check out from a cart.",
      status: "",
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

  var resumeLink = $("#nav-resume");
  if (resumeLink) {
    if (CONFIG.resumeUrl) { resumeLink.href = CONFIG.resumeUrl; }
    else { resumeLink.remove(); }
  }

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
  var LAYOUTS = { lead: true, row: true };
  var VISIBLE_PROJECTS = 4;

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

  $("#project-list").innerHTML = CONFIG.projects.map(function (project, index) {
    var hidden = index >= VISIBLE_PROJECTS ? " hidden" : "";
    return '<article class="project project--' + layoutFor(project) + '"' + hidden + '>' +
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

  /* ---------- show more ---------- */
  var projectToggle = $("#project-toggle");
  var projectItems = $("#project-list").children;

  function setProjectsExpanded(expanded) {
    // browsers anchor scroll differently when content appears or vanishes, so pin
    // one element by hand: the last visible project on open, the button on close
    var pinned = expanded ? projectItems[VISIBLE_PROJECTS - 1] : projectToggle;
    var before = pinned.getBoundingClientRect().top;

    for (var i = VISIBLE_PROJECTS; i < projectItems.length; i++) {
      projectItems[i].hidden = !expanded;
    }
    projectToggle.setAttribute("aria-expanded", String(expanded));
    projectToggle.textContent = expanded ? "Show less" : "Show more";

    // instant, or html's smooth scrolling animates the correction
    window.scrollBy({ top: pinned.getBoundingClientRect().top - before, behavior: "instant" });
  }

  if (projectItems.length > VISIBLE_PROJECTS) {
    projectToggle.hidden = false;
    projectToggle.addEventListener("click", function () {
      setProjectsExpanded(projectToggle.getAttribute("aria-expanded") !== "true");
    });
  }

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
