const MOBILE_WIDTH = 1024;

const scrollContainer = document.getElementById("scroll");
const currentSection = document.getElementById("current-section");
const headings = ["h1", "h2", "h3", "h4", "h5", "h6"].reduce(
  (acc, headingTag) => {
    return acc.concat([...document.querySelectorAll(headingTag)]);
  },
  [],
);

function getScrollContainer() {
  if (window.innerWidth <= MOBILE_WIDTH) {
    return document.documentElement;
  } else {
    return scrollContainer;
  }
}

// Change title based on where user scrolled to.

const defaultTitle = currentSection.innerText;

function checkScrollPosition() {
  const target = getScrollContainer();
  currentSection.innerText = defaultTitle;
  for (const heading of headings) {
    if (
      "aria-hidden" in heading.attributes &&
      window.innerWidth > MOBILE_WIDTH
    ) {
      continue;
    }

    if (target.scrollTop > heading.offsetTop - heading.offsetHeight - 1) {
      currentSection.innerText = heading.innerText;
    }
  }
}

scrollContainer.addEventListener("scroll", checkScrollPosition);
document.addEventListener("scroll", checkScrollPosition);
document.addEventListener("resize", checkScrollPosition);

// Automatically render the "table of contents" into the menu.

const nav = document.getElementById("navigation");
const navItems = document.getElementById("navigation-items");

for (const heading of headings) {
  if ("aria-hidden" in heading.attributes) {
    continue;
  }

  const menu = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.href = "#";
  menu.appendChild(anchor);
  anchor.innerText = heading.innerText;
  menu.addEventListener("click", (event) => {
    event.target.blur();
    event.preventDefault();
    event.stopPropagation();
    const target = getScrollContainer();
    target.scrollTo({
      behavior: "smooth",
      top: heading.offsetTop - heading.offsetHeight,
    });
    nav.classList.remove("navigation-visible");
  });
  navItems.appendChild(menu);
}

// Open / Close navigation.

const header = document.getElementById("header");

header.addEventListener("click", (event) => {
  event.stopPropagation();
  nav.classList.toggle("navigation-visible");
});
