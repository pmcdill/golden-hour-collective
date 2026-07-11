(function () {
  "use strict";

  var GENRE_DEFS = [
    ["all", "All Songs"],
    ["folk", "Folk & Acoustic"],
    ["pop", "Classic Pop"],
    ["island", "Reggae & Island"],
    ["soul", "Soul & R&B"],
    ["today", "Today’s Hits"]
  ];

  var GENRES = ["folk","today","folk","folk","pop","island","pop","folk","folk","today","pop","folk","folk","soul","folk","pop","pop","folk","island","pop","folk","today","folk","pop","island","folk","soul","pop","island","folk","folk","pop","folk","pop","pop","folk","island","pop","island","soul","pop","pop","pop","pop","island","island","folk","pop","folk","folk","pop","folk","folk","soul","folk","today","pop","folk","folk","today","today","pop","folk","island","pop","today","soul","soul","island","soul"];

  var RAW = [
    "Old Crow Medicine Show - Wagon Wheel",
    "Jason Mraz - I'm Yours",
    "Grateful Dead - Friend of the Devil",
    "The Barr Brothers - Even the Darkness Has Arms",
    "Oasis - Wonderwall",
    "Bob Marley - High Tide or Low Tide",
    "Dave Matthews Band - Jimi Thing",
    "John Denver - Take Me Home, Country Roads",
    "Simon & Garfunkel - America",
    "Ed Sheeran - Thinking Out Loud",
    "Dave Matthews Band - Satellite",
    "Sufjan Stevens - Impossible Soul",
    "Flight of the Conchords - The Most Beautiful Girl (In the Room)",
    "John Mayer - Daughters",
    "Cass McCombs - Bum Bum Bum",
    "Paul Simon - Me and Julio Down by the Schoolyard",
    "Coldplay - Green Eyes",
    "The Beatles - Blackbird",
    "Bobby McFerrin - Don't Worry Be Happy",
    "The Doobie Brothers - Black Water",
    "The Barr Brothers - Come in the Water",
    "Jason Mraz - I Won't Give Up",
    "Timothy McDill - Piñon Pines",
    "Dave Matthews Band - Crash Into Me",
    "Bob Marley - Stir It Up",
    "Paul Simon - Duncan",
    "Michael Jackson - You Rock My World",
    "Neil Diamond - Sweet Caroline",
    "Anykine - Manapua",
    "Jeremy Savo - Break My Mind",
    "Neil Young - Old Man",
    "Red Hot Chili Peppers - Under the Bridge / Scar Tissue",
    "Simon & Garfunkel - Scarborough Fair",
    "Elvis Presley - Can't Help Falling in Love",
    "The Beatles - Let It Be",
    "Simon & Garfunkel - Feelin' Groovy",
    "Israel Kamakawiwoʻole - Over the Rainbow",
    "The Turtles - Happy Together",
    "Jack Johnson - Rodeo Clowns",
    "Stan Getz - Bossa Nova",
    "Paul Simon - You Can Call Me Al",
    "Radiohead - Lucky",
    "Weezer - Island in the Sun",
    "Ritchie Valens / The Beatles - La Bamba / Twist and Shout",
    "Jack Johnson - Belle",
    "Israel Kamakawiwoʻole - White Sandy Beach",
    "Timothy McDill - Robin",
    "Nirvana - In Bloom",
    "Jeremy Savo - Innocence",
    "Traditional - I'll Fly Away",
    "Coldplay - We Never Change",
    "Iron & Wine - Naked as We Came",
    "Bob McDill - Catfish John",
    "Alicia Keys / John Mayer - If I Ain't Got You / Gravity",
    "Neil Young - Harvest Moon",
    "Jason Mraz - Live High",
    "Dave Matthews Band - Dancing Nancies",
    "Fleetwood Mac - Never Going Back Again",
    "Bon Iver - Flume / Skinny Love",
    "Maren Morris & Hozier - The Bones",
    "Ed Sheeran - Shape of You",
    "Christmas - O Holy Night",
    "Blind Pilot - The Story I Heard",
    "Christmas - Mele Kalikimaka / Jingle Bells",
    "The Beatles - While My Guitar Gently Weeps",
    "Ed Sheeran - Perfect",
    "John Mayer - Why Georgia",
    "Frank Sinatra - I've Got You Under My Skin",
    "Jack Johnson - Sitting, Waiting, Wishing",
    "Chris Stapleton - Tennessee Whiskey"
  ];

  var VIDEOS = [
    { id: "bnsnFK3bFfY", title: "Featured performance" },
    { id: "yhg55GsYBlE", title: "Live from the islands" },
    { id: "HjY4UFk6frw", title: "Sunset session" },
    { id: "OoitcRFoGpk", title: "Beachside set" }
  ];

  function parseSong(raw, i) {
    var idx = raw.indexOf(" - ");
    var artist = "", title = raw;
    if (idx > -1) { artist = raw.slice(0, idx); title = raw.slice(idx + 3); }
    return { artist: artist, title: title, genre: GENRES[i] };
  }

  var ALL_SONGS = RAW.map(parseSong);

  /* ---------- Song list + genre filter ---------- */
  var activeGenre = "all";
  var chipsEl = document.getElementById("genreChips");
  var listEl = document.getElementById("songList");
  var countEl = document.getElementById("songCount");

  function renderChips() {
    chipsEl.innerHTML = "";
    GENRE_DEFS.forEach(function (def) {
      var key = def[0], label = def[1];
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = label;
      if (key === activeGenre) btn.classList.add("active");
      btn.addEventListener("click", function () {
        activeGenre = key;
        renderChips();
        renderSongs();
      });
      chipsEl.appendChild(btn);
    });
  }

  function renderSongs() {
    var filtered = activeGenre === "all" ? ALL_SONGS : ALL_SONGS.filter(function (s) { return s.genre === activeGenre; });
    listEl.innerHTML = "";
    filtered.forEach(function (song, i) {
      var row = document.createElement("div");
      row.className = "song-row";
      var num = String(i + 1).padStart(2, "0");
      row.innerHTML =
        '<span class="song-num">' + num + '</span>' +
        '<span><span class="song-title"></span><span class="song-artist"></span></span>';
      row.querySelector(".song-title").textContent = song.title;
      row.querySelector(".song-artist").textContent = song.artist;
      listEl.appendChild(row);
    });

    var activeLabel = (GENRE_DEFS.find(function (g) { return g[0] === activeGenre; }) || ["all", "All Songs"])[1];
    countEl.textContent = (activeGenre === "all"
      ? ALL_SONGS.length + " songs and growing"
      : filtered.length + " " + activeLabel + " song" + (filtered.length === 1 ? "" : "s")
    ) + "  ·  New requests welcome — we learn special songs for your first dance.";
  }

  renderChips();
  renderSongs();

  /* ---------- Video carousel ---------- */
  var activeVideo = 0;
  var mainVideo = document.getElementById("mainVideo");
  var dotsEl = document.getElementById("videoDots");
  var prevBtn = document.getElementById("prevVideo");
  var nextBtn = document.getElementById("nextVideo");

  function renderDots() {
    dotsEl.innerHTML = "";
    VIDEOS.forEach(function (v, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show " + v.title);
      if (i === activeVideo) dot.classList.add("active");
      dot.addEventListener("click", function () { goToVideo(i); });
      dotsEl.appendChild(dot);
    });
  }

  function goToVideo(i) {
    var n = VIDEOS.length;
    activeVideo = (i + n) % n;
    var v = VIDEOS[activeVideo];
    mainVideo.src = "https://www.youtube.com/embed/" + v.id + "?rel=0";
    mainVideo.title = v.title;
    renderDots();
  }

  prevBtn.addEventListener("click", function () { goToVideo(activeVideo - 1); });
  nextBtn.addEventListener("click", function () { goToVideo(activeVideo + 1); });
  renderDots();

  /* ---------- Nav scroll-spy ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var sectionIds = navLinks.map(function (a) { return a.getAttribute("data-nav"); });

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
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Contact form ---------- */
  var form = document.getElementById("inquiryForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fName = document.getElementById("fName").value;
    var fEmail = document.getElementById("fEmail").value;
    var fDate = document.getElementById("fDate").value;
    var fMsg = document.getElementById("fMsg").value;
    var subject = encodeURIComponent("Booking inquiry — The Golden Hour Collective");
    var body = encodeURIComponent(
      "Name: " + (fName || "") + "\n" +
      "Email: " + (fEmail || "") + "\n" +
      "Event date: " + (fDate || "") + "\n\n" +
      (fMsg || "")
    );
    window.location.href = "mailto:hello@alohasunsetsmaui.com?subject=" + subject + "&body=" + body;
  });

  /* ---------- Footer year ---------- */
  document.getElementById("footerYear").textContent = "© " + new Date().getFullYear() + " The Golden Hour Collective";
})();
