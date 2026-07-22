(function () {
  "use strict";

  var GENRE_DEFS = [
    ["all", "All Songs"],
    ["top40", "Top 40"],
    ["dance", "'80s–'00s Dance"],
    ["soul", "Soul & R&B"],
    ["rock", "Rock & Americana"],
    ["latin", "Reggae & Latin"],
    ["folk", "Folk & Hawaiian"]
  ];

  var GENRES = ["soul","top40","soul","soul","soul","folk","rock","rock","rock","top40","dance","latin","latin","latin","latin","folk","folk","dance","top40","top40","top40","rock","top40","top40","latin","dance","soul","rock","rock","rock","top40","rock","rock","top40","top40","top40","top40","rock","soul","rock","rock","rock","soul","soul","rock","top40","folk","folk","folk","folk","folk","folk","dance","dance","folk","folk","folk","folk","folk","soul","folk","folk","folk","folk","rock","rock","folk","folk","rock","top40","top40","top40","rock","dance","latin","latin","folk","top40","top40","soul","soul","latin","rock","rock","rock","dance","soul","dance","rock","top40","rock","rock","dance","top40","rock","top40","latin","top40","folk","latin","top40","soul","soul","latin","rock","top40","top40","dance","soul","dance","folk","soul","folk","latin","rock","folk","latin","dance","dance","dance","dance"];

  var RAW = [
    "Al Green - Let’s Stay Together",
    "Alex Warren - Ordinary",
    "Alicia Keys - If I Ain’t Got You",
    "Amy Winehouse - Valerie",
    "Aretha Franklin - Respect",
    "Bahamas - Lost in the Light",
    "The Beatles - Here Comes the Sun",
    "The Beatles - In My Life",
    "The Beatles - Twist and Shout",
    "Beyonce - Love On Top",
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
    "Jack Johnson - Brushfire Fairytales",
    "Jack Johnson - Banana Pancakes",
    "James Taylor - How Sweet It Is (To Be Loved By You)",
    "Jason Mraz - I’m Yours",
    "Jason Mraz - Lucky",
    "Jason Mraz - I Won't Give Up",
    "Jeff Buckley - Hallelujah",
    "John Denver - Take Me Home, Country Roads",
    "John Denver - Annie’s Song",
    "John Mayer - Gravity",
    "John Mayer - Daughters",
    "Journey - Don't Stop Believin'",
    "Justin Bieber - Daisies",
    "JVKE - Golden Hour",
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
    "The Cranberries - Dreams",
    "The Jackson 5 - I Want You Back",
    "The Killers - Mr. Brightside",
    "The Shins - New Slang",
    "The Temptations - My Girl",
    "Tracy Chapman - Fast Car",
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
