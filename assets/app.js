const scrollContainer = document.getElementById("scroll");
const currentSection = document.getElementById("current-section");
const headings = ["h1", "h2", "h3", "h4", "h5", "h6"].reduce(
  (acc, headingTag) => {
    return acc.concat([...document.querySelectorAll(`main ${headingTag}`)]);
  },
  [],
);

// Change title based on where user scrolled to.

const defaultTitle = currentSection.innerText;

function checkScrollPosition() {
  currentSection.innerText = defaultTitle;
  for (const heading of headings) {
    if (scrollContainer.scrollTop > heading.offsetTop - heading.offsetHeight) {
      currentSection.innerText = heading.innerText;
    }
  }
}

scrollContainer.addEventListener("scroll", checkScrollPosition);
document.addEventListener("resize", checkScrollPosition);

// Automatically render the "table of contents" into the menu.

const nav = document.getElementById("navigation");
const navItems = document.getElementById("navigation-items");

for (const heading of headings) {
  const menu = document.createElement("li");
  menu.innerText = heading.innerText;
  menu.addEventListener("click", (event) => {
    event.stopPropagation();
    scrollContainer.scrollTo({
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
