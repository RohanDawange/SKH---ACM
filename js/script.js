var burger = document.getElementById("burger"),
  navEl = document.getElementById("nav");
function setNav(open) {
  navEl.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open ? "true" : "false");
}
burger.onclick = function () {
  setNav(!navEl.classList.contains("open"));
};
document.querySelectorAll("nav a").forEach(function (a) {
  a.addEventListener("click", function () {
    setNav(false);
  });
});
var activityDetails = {
  workshops: {
    title: "Workshops",
    description:
      "Practical sessions that help students learn new tools, technologies and development skills through guided activities.",
    points: ["Hands-on technical learning", "Beginner-friendly guidance", "Useful skills for projects and careers"],
  },
  hackathons: {
    title: "Hackathons",
    description:
      "Collaborative coding challenges where teams turn creative ideas into working solutions within a focused time period.",
    points: [
      "Team-based problem solving",
      "Rapid prototyping and innovation",
      "Build solutions for real-world problems",
    ],
  },
  "coding-events": {
    title: "Coding Events",
    description:
      "Regular coding activities that improve logical thinking, programming confidence and problem-solving ability.",
    points: [
      "Coding practice and challenges",
      "Improve algorithms and debugging",
      "Learn with peers and share solutions",
    ],
  },
  "community-meets": {
    title: "Community Meets",
    description:
      "Friendly meetups where ACM members connect, exchange ideas and grow together as a computing community.",
    points: ["Meet fellow students and mentors", "Share knowledge and experiences", "Create a supportive ACM network"],
  },
  "project-showcases": {
    title: "Project Showcases",
    description: "A platform for students to present their projects, explain their ideas and receive useful feedback.",
    points: [
      "Present projects with confidence",
      "Showcase creativity and technical work",
      "Get feedback for improvement",
    ],
  },
  "inauguration-ceremony": {
    title: "Inauguration Ceremony",
    description:
      "A memorable beginning for the SKH ACM student chapter, bringing students, faculty and guests together to celebrate learning, collaboration and innovation.",
    points: [
      "Welcome and introduction of the SKH ACM chapter",
      "Inspiring addresses from faculty and student leaders",
      "Recognition, teamwork and community celebration",
    ],
  },
};
var activityModal = document.getElementById("activity-modal");
var modalTitle = document.getElementById("activity-modal-title");
var modalDescription = document.getElementById("activity-modal-description");
var modalPoints = document.getElementById("activity-modal-points");
var inaugurationCarousel = document.getElementById("inauguration-carousel");
var carouselTrack = document.getElementById("carousel-track");
var carouselDots = document.getElementById("carousel-dots");
var carouselIndex = 0;
var carouselTimer = null;
var carouselImages = [
  "inauguration-01.jpg",
  "inauguration-02.jpg",
  "inauguration-03.jpg",
  "inauguration-04.jpg",
  "inauguration-05.jpg",
  "inauguration-06.jpg",
  "inauguration-07.jpg",
  "inauguration-08.jpg",
];
function renderCarousel() {
  carouselTrack.style.transform = "translateX(-" + carouselIndex * 100 + "%)";
  carouselDots.querySelectorAll("button").forEach(function (dot, index) {
    dot.classList.toggle("active", index === carouselIndex);
    dot.setAttribute("aria-current", index === carouselIndex ? "true" : "false");
  });
}
function setCarouselSlide(index) {
  carouselIndex = (index + carouselImages.length) % carouselImages.length;
  renderCarousel();
}
function stopCarouselAutoplay() {
  if (carouselTimer) {
    window.clearInterval(carouselTimer);
    carouselTimer = null;
  }
}
function startCarouselAutoplay() {
  stopCarouselAutoplay();
  carouselTimer = window.setInterval(function () {
    setCarouselSlide(carouselIndex + 1);
  }, 4000);
}
carouselImages.forEach(function (file, index) {
  var slide = document.createElement("figure");
  slide.className = "carousel-slide";
  slide.innerHTML =
    '<img src="images/' +
    file +
    '" alt="SKH ACM inauguration ceremony photo ' +
    (index + 1) +
    '" loading="' +
    (index === 0 ? "eager" : "lazy") +
    '">';
  carouselTrack.appendChild(slide);
  var dot = document.createElement("button");
  dot.type = "button";
  dot.className = "carousel-dot";
  dot.setAttribute("aria-label", "Show inauguration image " + (index + 1));
  dot.addEventListener("click", function () {
    setCarouselSlide(index);
    startCarouselAutoplay();
  });
  carouselDots.appendChild(dot);
});
document.querySelector(".carousel-prev").addEventListener("click", function () {
  setCarouselSlide(carouselIndex - 1);
  startCarouselAutoplay();
});
document.querySelector(".carousel-next").addEventListener("click", function () {
  setCarouselSlide(carouselIndex + 1);
  startCarouselAutoplay();
});
inaugurationCarousel.addEventListener("mouseenter", stopCarouselAutoplay);
inaugurationCarousel.addEventListener("mouseleave", startCarouselAutoplay);
inaugurationCarousel.addEventListener("focusin", stopCarouselAutoplay);
inaugurationCarousel.addEventListener("focusout", function (event) {
  if (!inaugurationCarousel.contains(event.relatedTarget)) startCarouselAutoplay();
});
renderCarousel();
var lastCard = null;
function closeActivityModal() {
  activityModal.classList.remove("open");
  document.body.style.overflow = "";
  stopCarouselAutoplay();
  if (lastCard) lastCard.focus();
}
document.querySelectorAll("[data-activity]").forEach(function (card) {
  card.addEventListener("click", function (event) {
    event.preventDefault();
    var detail = activityDetails[card.getAttribute("data-activity")];
    if (!detail) return;
    modalTitle.textContent = detail.title;
    modalDescription.textContent = detail.description;
    modalPoints.innerHTML = detail.points
      .map(function (point) {
        return "<li>" + point + "</li>";
      })
      .join("");
    var isInauguration = card.getAttribute("data-activity") === "inauguration-ceremony";
    inaugurationCarousel.hidden = !isInauguration;
    if (isInauguration) {
      setCarouselSlide(0);
      startCarouselAutoplay();
    } else {
      stopCarouselAutoplay();
    }
    lastCard = card;
    activityModal.classList.add("open");
    document.body.style.overflow = "hidden";
    modalTitle.focus();
  });
});
document.querySelector(".modal-close").addEventListener("click", closeActivityModal);
activityModal.addEventListener("click", function (event) {
  if (event.target === activityModal) closeActivityModal();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && activityModal.classList.contains("open")) closeActivityModal();
});
var themeButtons = document.querySelectorAll("[data-theme-choice]");
var savedTheme = null;
try {
  savedTheme = localStorage.getItem("skh-theme");
} catch (e) {}
if (savedTheme === "dark" || savedTheme === "light") document.documentElement.setAttribute("data-theme", savedTheme);
function setTheme(theme, persist) {
  document.documentElement.setAttribute("data-theme", theme);
  if (persist) {
    try {
      localStorage.setItem("skh-theme", theme);
    } catch (e) {}
  }
  themeButtons.forEach(function (button) {
    var active = button.getAttribute("data-theme-choice") === theme;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}
themeButtons.forEach(function (button) {
  button.onclick = function () {
    setTheme(button.getAttribute("data-theme-choice"), true);
  };
});
setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
document.getElementById("yr").textContent = new Date().getFullYear();
var glimpsePhotos = [
  { file: "glimpse-01.jpg", caption: "Faculty felicitation and celebration" },
  { file: "glimpse-02.jpg", caption: "SKH ACM community gathering" },
  { file: "glimpse-03.jpg", caption: "Engineers Teachers Day artwork" },
  { file: "glimpse-04.jpg", caption: "Tech event stage and guests" },
  { file: "glimpse-05.jpg", caption: "SKH ACM team celebration" },
  { file: "glimpse-06.jpg", caption: "Mentors and students together" },
  { file: "glimpse-07.jpg", caption: "Tech-no-fest creative installation" },
  { file: "glimpse-08.jpg", caption: "Faculty and student interaction" },
  { file: "glimpse-09.jpg", caption: "Student team activity" },
  { file: "glimpse-10.jpg", caption: "Campus celebration" },
  { file: "glimpse-11.jpg", caption: "Tech-no-fest group moment" },
  { file: "glimpse-12.jpg", caption: "ACM-inspired campus display" },
  { file: "glimpse-13.png", caption: "SKH ACM team portrait" },
  { file: "glimpse-14.png", caption: "SKH ACM team gathering" },
  { file: "glimpse-15.png", caption: "SKH ACM campus team moment" },
  { file: "glimpse-16.jpg", caption: "SKH ACM inauguration team" },
  { file: "glimpse-17.jpg", caption: "SKH ACM inauguration ceremony" },
  { file: "glimpse-18.jpg", caption: "Faculty and students at the ceremony" },
  { file: "glimpse-19.jpg", caption: "Inauguration ceremony stage" },
  { file: "glimpse-20.jpg", caption: "Guests and students together" },
  { file: "glimpse-21.jpg", caption: "Our HOD presentation moment" },
  { file: "glimpse-22.jpg", caption: "ACM introduction presentation" },
  { file: "glimpse-23.jpg", caption: "Faculty and guests on stage" },
  { file: "glimpse-24.jpg", caption: "Chief guests and student leaders" },
  { file: "glimpse-25.jpg", caption: "Students and faculty audience" },
  { file: "glimpse-26.jpg", caption: "Inauguration ceremony audience" },
  { file: "glimpse-27.jpg", caption: "Lamp lighting ceremony" },
  { file: "glimpse-28.jpg", caption: "Ceremony guests at the dais" },
];
var glimpseLeftRail = document.getElementById("glimpse-left-rail");
var glimpseRightRail = document.getElementById("glimpse-right-rail");
var glimpseFeature = document.querySelector(".glimpse-feature");
var glimpseFeatureImage = document.getElementById("glimpse-feature-image");
var glimpseFeatureCaption = document.getElementById("glimpse-feature-caption");
var glimpseActiveIndex = 0;
var glimpseAutoplayTimer = null;
var glimpseAutoplayPaused = false;
function createGlimpseThumbnail(photo, index) {
  var button = document.createElement("button");
  button.type = "button";
  button.className = "glimpse-thumb";
  button.dataset.index = index;
  button.setAttribute("aria-label", "Show " + photo.caption);
  button.innerHTML =
    '<img src="images/' +
    photo.file +
    '" alt="' +
    photo.caption +
    '" loading="lazy">';
  button.addEventListener("click", function () {
    setGlimpseFeature(index);
  });
  return button;
}
function setGlimpseFeature(index) {
  var photo = glimpsePhotos[index];
  if (!photo) return;
  glimpseActiveIndex = index;
  glimpseFeature.classList.add("is-switching");
  window.setTimeout(function () {
    glimpseFeatureImage.src = "images/" + photo.file;
    glimpseFeatureImage.alt = photo.caption;
    glimpseFeatureCaption.textContent = photo.caption;
    glimpseFeature.classList.remove("is-switching");
  }, 120);
  document.querySelectorAll(".glimpse-thumb").forEach(function (button) {
    var active = Number(button.dataset.index) === index;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "true" : "false");
  });
}
glimpsePhotos.forEach(function (photo, index) {
  var targetRail = index < Math.ceil(glimpsePhotos.length / 2) ? glimpseLeftRail : glimpseRightRail;
  targetRail.appendChild(createGlimpseThumbnail(photo, index));
});
function scrollGlimpseRail(rail, amount) {
  rail.scrollBy({ left: amount, behavior: "smooth" });
}
document.querySelector(".glimpse-prev").addEventListener("click", function () {
  glimpseAutoplayPaused = true;
  setGlimpseFeature((glimpseActiveIndex - 1 + glimpsePhotos.length) % glimpsePhotos.length);
  scrollGlimpseRail(glimpseLeftRail, -180);
});
document.querySelector(".glimpse-next").addEventListener("click", function () {
  glimpseAutoplayPaused = true;
  setGlimpseFeature((glimpseActiveIndex + 1) % glimpsePhotos.length);
  scrollGlimpseRail(glimpseRightRail, 180);
});
function enableGlimpseDrag(rail) {
  var pressed = false;
  var startX = 0;
  var startScroll = 0;
  rail.addEventListener("pointerdown", function (event) {
    pressed = true;
    startX = event.clientX;
    startScroll = rail.scrollLeft;
    rail.classList.add("is-dragging");
    rail.setPointerCapture(event.pointerId);
  });
  rail.addEventListener("pointermove", function (event) {
    if (!pressed) return;
    rail.scrollLeft = startScroll - (event.clientX - startX);
  });
  rail.addEventListener("pointerup", function () {
    pressed = false;
    rail.classList.remove("is-dragging");
  });
  rail.addEventListener("pointercancel", function () {
    pressed = false;
    rail.classList.remove("is-dragging");
  });
}
enableGlimpseDrag(glimpseLeftRail);
enableGlimpseDrag(glimpseRightRail);
setGlimpseFeature(glimpseActiveIndex);
function startGlimpseAutoplay() {
  window.clearInterval(glimpseAutoplayTimer);
  glimpseAutoplayTimer = window.setInterval(function () {
    if (!glimpseAutoplayPaused) {
      setGlimpseFeature((glimpseActiveIndex + 1) % glimpsePhotos.length);
    }
  }, 3500);
}
glimpseFeature.addEventListener("mouseenter", function () {
  glimpseAutoplayPaused = true;
});
glimpseFeature.addEventListener("mouseleave", function () {
  glimpseAutoplayPaused = false;
});
document.getElementById("glimpse-gallery").addEventListener("focusin", function () {
  glimpseAutoplayPaused = true;
});
document.getElementById("glimpse-gallery").addEventListener("focusout", function () {
  glimpseAutoplayPaused = false;
});
document.getElementById("glimpse-gallery").addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    glimpseAutoplayPaused = true;
    setGlimpseFeature((glimpseActiveIndex - 1 + glimpsePhotos.length) % glimpsePhotos.length);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    glimpseAutoplayPaused = true;
    setGlimpseFeature((glimpseActiveIndex + 1) % glimpsePhotos.length);
  }
});
document.addEventListener("visibilitychange", function () {
  glimpseAutoplayPaused = document.hidden;
});
startGlimpseAutoplay();
var T = {
  "Core Team": [
    {
      name: "Ms. Chanchal Sarangdhar",
      role: "Chairperson",
      email: "sarangdharchanchal@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/chanchal-sarangdhar-4a553a399?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      photo: "chanchal-sarangdhar.png",
    },
    {
      name: "Ms. Harshada Patil",
      role: "Vice Chairperson",
      email: "hp891317@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/harshada-patil-1841a5381?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      photo: "harshada-patil.jpg",
    },
    {
      name: "Mr. Aditya Pawar",
      role: "Secretary",
      linkedin:
        "https://www.linkedin.com/in/aaditya-pawar-601323338?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      github: "https://github.com/aadityapawar09",
      photo: "aditya-pawar.jpg",
    },
    {
      name: "Ms. Shruti Gunjal",
      role: "Treasurer",
      email: "shrutisgunjal50@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/shruti-gunjal-459a92399?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      photo: "shruti-gunjal.png",
    },
    {
      name: "Mr. Prince Surti",
      role: "Membership Chair",
      email: "princesurti6@gmail.com",
      photo: "prince-surti.jpg",
    },
  ],
  "Technical Team": [
    {
      name: "Mr. Adarsh Vamne",
      role: "Web Developer",
      email: "vamneadarsh@gmail.com",
      linkedin: "https://www.linkedin.com/in/adarsh-vamne-075b30384",
      photo: "adarsh-vamne.jpg",
    },
    {
      name: "Mr. Rohan Dawange",
      role: "Webmaster",
      email: "rohandawange999@gmail.com",
      linkedin: "https://www.linkedin.com/in/rohandawange",
      photo: "rohan-dawange.jpg",
    },
    {
      name: "Mr. Nivrutti Shelke",
      role: "Web Development",
      email: "shelkenivruti683@gmail.com",
      linkedin: "https://www.linkedin.com/in/nivrutti-shelke-a60777383",
      photo: "nivrutti-shelke.png",
    },
  ],
  "Design Team": [
    {
      name: "Ms. Devyani Patil",
      role: "Design Advisor",
      email: "patildevyan1804@gmail.com",
      photo: "devyani-patil.jpg",
    },
    {
      name: "Mr. Harshal Pawar",
      role: "Head of Curation",
      email: "pawarharshal742@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/harshal-pawar-095752425?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      photo: "harshal-pawar.jpg",
    },
    {
      name: "Ms. Mrunali Ilkar",
      role: "Head of DM",
      email: "mrunaliilkar@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/mrunali-ilkar-790a91384?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      photo: "mrunali-ilkar.jpg",
    },
    {
      name: "Mr. Irfan Ansar Sayyad",
      role: "Head of Graphic Design",
      email: "irfanansarsayyad2@gmail.com",
      linkedin: "https://www.linkedin.com/in/irfan-ansar-sayyad-017413409",
      photo: "irfan-ansar-sayyad.jpg",
    },
  ],
  "Event Team": [
    {
      name: "Ms. Dhanashree Chavan",
      role: "Head of Events",
      email: "cdhanashree892@gmail.com",
      photo: "dhanashree-chavan.png",
    },
    {
      name: "Ms. Nandini Patil",
      role: "Community Advisor",
      email: "nandini272008patil@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/nandini-patil-a5bb6a361?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      photo: "nandini-patil.jpg",
    },
  ],
};
var h = "";
for (var k in T) {
  h += "<h3>" + k + '</h3><div class="row">';
  T[k].forEach(function (member) {
    var contacts = "";
    if (member.email)
      contacts +=
        '<a href="mailto:' +
        member.email +
        '" title="Email ' +
        member.name +
        '" aria-label="Email ' +
        member.name +
        '">MAIL</a>';
    if (member.linkedin)
      contacts +=
        '<a href="' +
        member.linkedin +
        '" target="_blank" rel="noopener noreferrer" title="Open LinkedIn profile for ' +
        member.name +
        '" aria-label="LinkedIn ' +
        member.name +
        '">IN</a>';
    if (member.github)
      contacts +=
        '<a href="' +
        member.github +
        '" target="_blank" rel="noopener noreferrer" title="Open GitHub profile for ' +
        member.name +
        '" aria-label="GitHub ' +
        member.name +
        '">GH</a>';
    var initials = member.name
      .replace(/^(Mr|Ms|Mrs|Dr)\.\s*/, "")
      .split(" ")
      .map(function (w) {
        return w.charAt(0);
      })
      .slice(0, 2)
      .join("")
      .toUpperCase();
    var photo = member.photo
      ? '<img src="images/' +
        member.photo +
        '" alt="' +
        member.name +
        '" loading="lazy" onerror="this.parentNode.classList.remove(\'has-photo\');this.outerHTML=\'<span class=initials>' +
        initials +
        "</span>'\">"
      : '<span class="initials" aria-label="No photo for ' + member.name + '">' + initials + "</span>";
    h +=
      '<div class="mem"><div class="ph"><div class="slot' +
      (member.photo ? " has-photo" : "") +
      '">' +
      photo +
      '</div></div><div class="note"><b>' +
      member.name +
      "</b><small>" +
      member.role +
      '</small><div class="soc">' +
      contacts +
      "</div></div></div>";
  });
  h += "</div>";
}
document.getElementById("board").innerHTML = h;
var memberNotes = document.querySelectorAll(".mem");
if ("IntersectionObserver" in window) {
  var noteObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("in-view");
          void entry.target.offsetWidth;
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.2 },
  );
  memberNotes.forEach(function (note) {
    noteObserver.observe(note);
  });
}
