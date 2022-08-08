const navToggler = document.querySelector(".menu-button");

let togglerBorder = false;

const toggle = () => {
  togglerBorder = !togglerBorder;
  togglerBorder
    ? (navToggler.style.filter =
        "invert(100%) sepia(0%) saturate(1752%) hue-rotate(344deg)    brightness(99%) contrast(115%)")
    : (navToggler.style.filter =
        "invert(82%) sepia(0%) saturate(1752%) hue-rotate(320deg)    brightness(99%) contrast(115%)");
};

navToggler.addEventListener("click", toggle);
