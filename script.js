(function () {
  "use strict";

  var GENRE_DEFS = [
    ["all", "All Songs"],
    ["top40", "Top 40"],
    ["dance", "'80s–'00s Faves"],
    ["soul", "Soul & R&B"],
    ["rock", "Rock & Americana"],
    ["latin", "Reggae & Latin"],
    ["folk", "Folk & Hawaiian"]
  ];

    var GENRES = ["soul","top40","soul","soul","dance","soul","folk","rock","rock","rock","top40","top40","top40","dance","latin","latin","latin","latin","latin","folk","dance","top40","top40","top40","rock","top40","top40","latin","dance","soul","rock","rock","rock","top40","rock","rock","top40","top40","top40","top40","rock","soul","dance","rock","rock","rock","soul","soul","rock","top40","folk","folk","folk","folk","folk","folk","dance","dance","folk","folk","folk","folk","folk","soul","folk","folk","folk","folk","dance","rock","rock","folk","folk","rock","top40","top40","rock","dance","latin","latin","folk","top40","top40","soul","soul","latin","rock","rock","rock","dance","soul","dance","rock","top40","rock","rock","dance","top40","rock","dance","latin","dance","top40","folk","latin","top40","soul","soul","latin","rock","top40","top40","top40","dance","soul","dance","folk","soul","folk","dance","latin","rock","folk","latin","dance","dance","dance","dance"];

  var RAW = [
    "Al Green - Let’s Stay Together",
    "Alex Warren - Ordinary",
    "Alicia Keys - If I Ain’t Got You",
    "Amy Winehouse - Valerie",
    "Arctic Monkeys - Fluorescent Adolescent",
    "Aretha Franklin - Respect",
    "Bahamas - Lost in the Light",
    "The Beatles - Here Comes the Sun",
    "The Beatles - In My Life",
    "The Beatles - Twist and Shout",
    "Benson Boone - Beautiful Things",
    "Beyonce - Love On Top",
    "Billie Eilish - Birds of a Feather",
    "Blink-182 - All The Small Things",
    "Bob Marley - Is This Love",
    "Bob Marley - Stir it Up",
    "Bob Marley - Three Little Birds",
    "Bob Marley - Waiting in Vain",
    "Bobby McFerrin - Don’t Worry, Be Happy",
    "Bon Iver - Flume/Skinny Love",
    "Bon Jovi - Living on a Prayer",
    "Bruno Mars - That's What I Like",
    "Bruno Mars/Lady Gaga - Die With A Smile",
    "Chappell Roan - Pink Pony Club",
    "Chris Stapleton - Tennessee Whiskey",
    "Coldplay - Yellow",
    "Coldplay - Green Eyes",
    "Cultura Profética - La Complicidad",
    "Daft Punk - Get Lucky",
    "Daniel Caesar/H.E.R. - Best Part",
    "Dave Matthews Band - Satellite",
    "Dave Matthews Band - Crash Into Me",
    "The Doobie Brothers - Black Water",
    "Dua Lipa - Levitating",
    "Eagles - Take it Easy",
    "Eagles - Hotel California",
    "Ed Sheeran - Shape of You",
    "Ed Sheeran - Thinking Out Loud",
    "Ed Sheeran - Perfect",
    "Ella Langley - Choosin' Texas",
    "Elvis Presley - Can’t Help Falling in Love",
    "Etta James - At Last",
    "Fall Out Boy - Sugar We're Going Down",
    "Fleetwood Mac - Dreams",
    "Fleetwood Mac - Landslide",
    "Fleetwood Mac - Never Going Back Again",
    "Frank Sinatra - I’ve Got You Under My Skin",
    "Frank Sinatra - Fly Me to the Moon",
    "Grateful Dead - A Friend of the Devil",
    "Harry Styles - As It Was",
    "John Cruz - Island Style",
    "Dennis Kamakahi - Wahine 'Ilikea",
    "Don Ho - Tiny Bubbles",
    "Hapa - Ka Uluwehi O Ke Kai",
    "Iz - Over the Rainbow/What a Wonderful World",
    "Iz - White Sandy Beach",
    "Incubus - Drive",
    "Incubus - Wish You Were Here",
    "Iron and Wine - Such Great Heights",
    "Jack Johnson - Belle",
    "Jack Johnson - Better Together",
    "Jack Johnson - Inaudible Melodies",
    "Jack Johnson - Banana Pancakes",
    "James Taylor - How Sweet It Is (To Be Loved By You)",
    "Jason Mraz - I’m Yours",
    "Jason Mraz - Lucky",
    "Jason Mraz - I Won't Give Up",
    "Jeff Buckley - Hallelujah",
    "Jimmy Eat World - The Middle",
    "John Denver - Take Me Home, Country Roads",
    "John Denver - Annie’s Song",
    "John Mayer - Gravity",
    "John Mayer - Daughters",
    "Journey - Don't Stop Believin'",
    "Justin Bieber - Daisies",
    "Lady Gaga - I'll Always Remember Us This Way",
    "Led Zeppelin - Tangerine",
    "Lionel Richie - All Night Long",
    "Los Cafres - Tus Ojos",
    "Luis Fonsi - Despacito",
    "The Lumineers - Ho Hey",
    "Maren Morris / Hozier - The Bones",
    "Maroon 5 - Sugar",
    "Marvin Gaye - Ain't No Mountain High Enough",
    "Michael Jackson - Rock With You",
    "Natalia Lafourcade - Soledad y El Mar",
    "Neil Diamond - Sweet Caroline",
    "Neil Young - Harvest Moon",
    "Neil Young - Heart of Gold",
    "Nirvana - In Bloom",
    "Norah Jones - Don't Know Why",
    "Oasis - Wonderwall",
    "Old Crow Medicine Show - Wagon Wheel",
    "Olivia Dean - Dive",
    "Paul Simon - Me and Julio Down by the Schoolyard",
    "Paul Simon - You Can Call Me Al",
    "Pixies - Where Is My Mind",
    "The Postal Service - Such Great Heights",
    "Queen - Crazy Little Thing Called Love",
    "Radiohead - High and Dry",
    "Santana - Primavera",
    "Semisonic - Closing Time",
    "Shaboozey - A Bar Song (Tipsy)",
    "Simon & Garfunkel - Feelin’ Groovy",
    "Stan Getz - The Girl From Ipanema",
    "Stephen Sanchez - Until I Found You",
    "Stevie Wonder - Signed, Sealed, Delivered (I'm Yours)",
    "Stevie Wonder - Superstition",
    "Sublime - Santeria",
    "Supertramp - Give a Little Bit",
    "Taylor Swift - Cruel Summer",
    "Taylor Swift - Shake It Off",
    "Taylor Swift - Lover",
    "The Cranberries - Dreams",
    "The Jackson 5 - I Want You Back",
    "The Killers - Mr. Brightside",
    "The Shins - New Slang",
    "The Temptations - My Girl",
    "Tracy Chapman - Fast Car",
    "Train - Drops of Jupiter",
    "UB40 - Red Red Wine",
    "Van Morrison - Brown Eyed Girl",
    "Vance Joy - Riptide",
    "Vicente Garcia - Carmesi",
    "Walk the Moon - Shut Up and Dance",
    "Weezer - Island in the Sun",
    "Weezer - Say It Ain't So",
    "Whitney Houston - I Wanna Dance With Somebody"
  ];

  var VIDEOS = [
    { id: "mMwBORjYdAQ", title: "Featured performance" },
    { id: "UnUe4oiDbu0", title: "Live from the islands" },
    { id: "ixl3R1kOLjA", title: "Sunset session" }
  ];

  function parseSong(raw, i) {
    var idx = raw.indexOf(" - ");
    var artist = "", title = raw;
    if (idx > -1) { artist = raw.slice(0, idx); title = raw.slice(idx + 3); }
    return { artist: artist, title: title, genre: GENRES[i] };
  }

  var ALL_SONGS = RAW.map(parseSong);

  /* ---------- Song list + genre filter ---------- */
  var COLLAPSED_H = 620;
  var activeGenre = "all";
  var songsExpanded = false;
  var chipsEl = document.getElementById("genreChips");
  var listEl = document.getElementById("songList");
  var countEl = document.getElementById("songCount");
  var fadeEl = document.getElementById("songFade");
  var expandEl = document.getElementById("songExpand");
  var viewAllBtn = document.getElementById("viewAllBtn");
  var rowEls = [];
  var filterBusy = false;
  var pendingGenre = null;

  function inGenre(el, g) { return g === "all" || el.getAttribute("data-genre") === g; }

  function buildChips() {
    GENRE_DEFS.forEach(function (def) {
      var key = def[0], label = def[1];
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = label;
      btn.setAttribute("data-key", key);
      if (key === activeGenre) btn.classList.add("active");
      btn.addEventListener("click", function () { selectGenre(key); });
      chipsEl.appendChild(btn);
    });
  }

  function buildRows() {
    ALL_SONGS.forEach(function (song) {
      var row = document.createElement("div");
      row.className = "song-row";
      row.setAttribute("data-genre", song.genre);
      row.innerHTML =
        '<span class="song-num"></span>' +
        '<span><span class="song-title"></span><span class="song-artist"></span></span>';
      row.querySelector(".song-title").textContent = song.title;
      row.querySelector(".song-artist").textContent = song.artist;
      listEl.appendChild(row);
      rowEls.push(row);
    });
  }

  function renumber() {
    var n = 0;
    rowEls.forEach(function (el) {
      if (!el.hidden) { n++; el.querySelector(".song-num").textContent = String(n).padStart(2, "0"); }
    });
    return n;
  }

  function updateCount(visible) {
    var activeLabel = (GENRE_DEFS.find(function (g) { return g[0] === activeGenre; }) || ["all", "All Songs"])[1];
    countEl.textContent = (activeGenre === "all"
      ? ALL_SONGS.length + " songs and growing"
      : visible + " " + activeLabel + " song" + (visible === 1 ? "" : "s")
    ) + "  ·  New requests welcome — we learn special songs for your first dance.";
  }

  // Natural height of the full list (the collapsed list is height-capped, so measure it uncapped).
  function fullHeight() {
    var prev = listEl.style.maxHeight, t = listEl.style.transition;
    listEl.style.transition = "none";
    listEl.style.maxHeight = "none";
    var h = listEl.offsetHeight;
    listEl.style.maxHeight = prev;
    void listEl.offsetHeight;
    listEl.style.transition = t;
    return h;
  }

  // Snap the collapse state with no animation. The View all button only shows on "All Songs".
  function setCollapseNow() {
    var isAll = activeGenre === "all";
    var t = listEl.style.transition;
    listEl.style.transition = "none";
    if (!isAll) {
      listEl.classList.remove("collapsed");
      listEl.style.maxHeight = "";
      fadeEl.hidden = true;
      expandEl.hidden = true;
    } else {
      listEl.classList.add("collapsed");
      listEl.style.maxHeight = songsExpanded ? "none" : COLLAPSED_H + "px";
      fadeEl.hidden = false;
      fadeEl.classList.toggle("gone", songsExpanded);
      expandEl.hidden = false;
      viewAllBtn.textContent = songsExpanded ? "Show less" : "View all";
    }
    void listEl.offsetHeight;
    listEl.style.transition = t;
  }

  function selectGenre(key) {
    if (filterBusy) { pendingGenre = key; return; }
    if (key === activeGenre) return;
    filterBusy = true;
    activeGenre = key;
    songsExpanded = false;
    Array.prototype.forEach.call(chipsEl.children, function (c) {
      c.classList.toggle("active", c.getAttribute("data-key") === key);
    });

    var keep = rowEls.filter(function (el) { return !el.hidden && inGenre(el, key); });
    var leave = rowEls.filter(function (el) { return !el.hidden && !inGenre(el, key); });
    var enter = rowEls.filter(function (el) { return el.hidden && inGenre(el, key); });
    leave.forEach(function (el) { el.classList.add("out"); });

    setTimeout(function () {
      var first = new Map();
      keep.forEach(function (el) { first.set(el, el.getBoundingClientRect()); });
      leave.forEach(function (el) { el.hidden = true; el.classList.remove("out"); });
      enter.forEach(function (el) { el.hidden = false; el.classList.add("pre"); });
      var visible = renumber();
      updateCount(visible);
      setCollapseNow();
      keep.forEach(function (el) {
        var a = first.get(el), b = el.getBoundingClientRect();
        var dx = a.left - b.left, dy = a.top - b.top;
        if (dx || dy) { el.style.transition = "none"; el.style.transform = "translate(" + dx + "px," + dy + "px)"; }
      });
      void listEl.offsetWidth;
      keep.forEach(function (el) { el.style.transition = ""; el.style.transform = ""; });
      enter.forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i * 30, 420) + "ms";
        requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.remove("pre"); }); });
      });
      setTimeout(function () {
        enter.forEach(function (el) { el.style.transitionDelay = ""; });
        filterBusy = false;
        if (pendingGenre !== null) { var k = pendingGenre; pendingGenre = null; selectGenre(k); }
      }, 900);
    }, leave.length ? 190 : 0);
  }

  viewAllBtn.addEventListener("click", function () {
    songsExpanded = !songsExpanded;
    fadeEl.classList.toggle("gone", songsExpanded);
    viewAllBtn.textContent = songsExpanded ? "Show less" : "View all";
    if (songsExpanded) {
      listEl.style.maxHeight = fullHeight() + "px";
      var done = function (e) {
        if (e.propertyName !== "max-height") return;
        listEl.removeEventListener("transitionend", done);
        if (songsExpanded) listEl.style.maxHeight = "none";
      };
      listEl.addEventListener("transitionend", done);
    } else {
      listEl.style.transition = "none";
      listEl.style.maxHeight = listEl.offsetHeight + "px";
      void listEl.offsetHeight;
      listEl.style.transition = "";
      listEl.style.maxHeight = COLLAPSED_H + "px";
      document.getElementById("songs").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  buildChips();
  buildRows();
  updateCount(renumber());
  setCollapseNow();

  /* ---------- Video carousel ---------- */
  var activeVideo = 0;
  var mainVideo = document.getElementById("mainVideo");
  var dotsEl = document.getElementById("videoDots");
  var prevBtn = document.getElementById("prevVideo");
  var nextBtn = document.getElementById("nextVideo");
  var dotBtns = [];
  var swapTimer;

  function buildDots() {
    VIDEOS.forEach(function (v, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show " + v.title);
      if (i === activeVideo) dot.classList.add("active");
      dot.addEventListener("click", function () { goToVideo(i); });
      dotsEl.appendChild(dot);
      dotBtns.push(dot);
    });
  }

  function goToVideo(i) {
    var n = VIDEOS.length;
    var next = (i + n) % n;
    if (next === activeVideo) return;
    activeVideo = next;
    dotBtns.forEach(function (d, k) { d.classList.toggle("active", k === activeVideo); });
    var v = VIDEOS[activeVideo];
    mainVideo.classList.add("swap");
    clearTimeout(swapTimer);
    swapTimer = setTimeout(function () {
      var reveal = function () { mainVideo.classList.remove("swap"); };
      mainVideo.addEventListener("load", reveal, { once: true });
      mainVideo.src = "https://www.youtube.com/embed/" + v.id + "?rel=0";
      mainVideo.title = v.title;
      setTimeout(reveal, 2000);
    }, 280);
  }

  prevBtn.addEventListener("click", function () { goToVideo(activeVideo - 1); });
  nextBtn.addEventListener("click", function () { goToVideo(activeVideo + 1); });
  buildDots();

  /* ---------- Nav scroll-spy ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var sectionIds = navLinks.map(function (a) { return a.getAttribute("data-nav"); });

  var siteHeader = document.querySelector(".site-header");
  var navLinksEl = document.getElementById("navLinks");
  var navInd = navLinksEl ? navLinksEl.querySelector(".nav-ind") : null;
  var indShown = false;
  var hoverLink = null;

  function placeInd(a) {
    if (!navInd) return;
    if (!a) { navInd.classList.remove("show"); indShown = false; return; }
    var set = function () {
      navInd.style.setProperty("--x", a.offsetLeft + "px");
      navInd.style.setProperty("--w", a.offsetWidth + "px");
      navInd.style.setProperty("--y", (a.offsetTop + a.offsetHeight - 1.5) + "px");
    };
    if (!indShown) {
      navInd.classList.add("snap");
      set();
      void navInd.offsetWidth;
      navInd.classList.remove("snap");
      navInd.classList.add("show");
      indShown = true;
    } else {
      set();
    }
  }
  function currentLink() {
    for (var i = 0; i < navLinks.length; i++) if (navLinks[i].classList.contains("active")) return navLinks[i];
    return null;
  }
  function syncInd() { placeInd(hoverLink || currentLink()); }

  navLinks.forEach(function (a) {
    a.addEventListener("mouseenter", function () { hoverLink = a; syncInd(); });
    a.addEventListener("focus", function () { hoverLink = a; syncInd(); });
    a.addEventListener("blur", function () { hoverLink = null; syncInd(); });
  });
  if (navLinksEl) navLinksEl.addEventListener("mouseleave", function () { hoverLink = null; syncInd(); });
  window.addEventListener("resize", syncInd);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncInd);

  function onScroll() {
    var mid = window.innerHeight * 0.35;
    var current = "";
    for (var i = 0; i < sectionIds.length; i++) {
      var el = document.getElementById(sectionIds[i]);
      if (!el) continue;
      var r = el.getBoundingClientRect();
      if (r.top <= mid && r.bottom > mid) { current = sectionIds[i]; break; }
    }
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === current);
    });
    if (siteHeader) siteHeader.classList.toggle("compact", window.scrollY > 24);
    syncInd();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    var setMenu = function (open) {
      navMenu.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    navToggle.addEventListener("click", function () {
      setMenu(!navMenu.classList.contains("open"));
    });
    Array.prototype.slice.call(navMenu.querySelectorAll("a")).forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 640) setMenu(false);
    });
  }

  /* ---------- Contact form (FormSubmit AJAX) ---------- */
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/ae9013f98139172fdb408ac3ad6adb61";
  var form = document.getElementById("inquiryForm");
  var formStatus = document.getElementById("formStatus");
  var submitBtn = form.querySelector(".btn-submit");

  function setStatus(msg, kind) {
    formStatus.textContent = msg;
    formStatus.className = "form-status" + (kind ? " form-status-" + kind : "");
    formStatus.hidden = !msg;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot — if filled, it's almost certainly a bot; pretend success and stop.
    var honey = document.getElementById("fHoney");
    if (honey && honey.value) {
      form.reset();
      setStatus("Thanks! Your inquiry is on its way — we'll be in touch soon.", "ok");
      return;
    }

    var email = document.getElementById("fEmail").value;
    var payload = {
      name: document.getElementById("fName").value,
      email: email,
      date: document.getElementById("fDate").value,
      message: document.getElementById("fMsg").value,
      _subject: "New booking inquiry — Ocean Tones Collective",
      _replyto: email,
      _template: "table",
      _captcha: "false"
    };

    if (submitBtn.classList.contains("loading") || submitBtn.classList.contains("done")) return;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    submitBtn.classList.remove("err");
    submitBtn.classList.add("loading");
    setStatus("", null);

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().then(
          function (data) { return { ok: res.ok, data: data }; },
          function () { return { ok: res.ok, data: {} }; }
        );
      })
      .then(function (result) {
        var ok = result.ok && (result.data.success === "true" || result.data.success === true);
        if (ok) {
          form.reset();
          setStatus("Thanks! Your inquiry is on its way — we'll be in touch soon.", "ok");
          submitBtn.classList.add("done");
          setTimeout(function () { submitBtn.classList.remove("done"); }, 3400);
        } else {
          setStatus("Something went wrong sending your inquiry. Please email us directly at aloha@mauiwedding.band.", "error");
          submitBtn.classList.add("err");
        }
      })
      .catch(function () {
        setStatus("Couldn't send right now. Please email us directly at aloha@mauiwedding.band.", "error");
        submitBtn.classList.add("err");
      })
      .then(function () {
        submitBtn.classList.remove("loading");
        submitBtn.removeAttribute("aria-busy");
        submitBtn.disabled = false;
      });
  });

  /* ---------- Motion: scroll reveal, card tilt, hero parallax ---------- */
  var reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var finePointer = !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  if (finePointer && !reduceMotion) {
    Array.prototype.slice.call(document.querySelectorAll(".testimonial-card")).forEach(function (card) {
      var stars = card.querySelector(".stars");
      card.addEventListener("pointerenter", function () {
        card.classList.add("live");
        if (stars) stars.classList.toggle("alt");
      });
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
        var py = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
        card.style.transform = "rotateX(" + ((0.5 - py) * 10).toFixed(2) + "deg) rotateY(" + ((px - 0.5) * 12).toFixed(2) + "deg)";
        card.style.setProperty("--gx", (px * 100).toFixed(0) + "%");
        card.style.setProperty("--gy", (py * 100).toFixed(0) + "%");
      });
      card.addEventListener("pointerleave", function () { card.classList.remove("live"); card.style.transform = ""; });
    });

    var heroPhoto = document.querySelector(".hero-right");
    if (heroPhoto) {
      heroPhoto.addEventListener("pointermove", function (e) {
        var r = heroPhoto.getBoundingClientRect();
        heroPhoto.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        heroPhoto.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
      heroPhoto.addEventListener("pointerleave", function () {
        heroPhoto.style.setProperty("--mx", 0);
        heroPhoto.style.setProperty("--my", 0);
      });
    }
  }

  /* ---------- Event date placeholder (always 6 months out) ---------- */
  var dateInput = document.getElementById("fDate");
  if (dateInput) {
    var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var now = new Date();
    var m = now.getMonth() + 6;
    var y = now.getFullYear() + Math.floor(m / 12);
    m = ((m % 12) + 12) % 12;
    dateInput.placeholder = "e.g. " + MONTHS[m] + " " + y;
  }

  /* ---------- Footer year ---------- */
  document.getElementById("footerYear").textContent = "© " + new Date().getFullYear() + " Ocean Tones Collective";
})();
