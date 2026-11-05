const items = document.querySelectorAll(".nav-item");
        const indicator = document.querySelector(".nav-indicator");
        const line = document.querySelector(".line");
        const content = document.querySelector(".content");
        const sections = document.querySelectorAll(".section");

        function moveIndicator(element) {
            if (!element) return;
            const { offsetLeft, offsetWidth } = element;
            
            indicator.style.left = offsetLeft + "px";
            indicator.style.width = offsetWidth + "px";

            const home = items[0];
            const homeLeft = home.offsetLeft;
            line.style.left = homeLeft + "px";
            line.style.width = (offsetLeft + offsetWidth - homeLeft) + "px";

            // Kerekítés igazítása az utolsó elemnél (Contact)
            const isLastItem = element === items[items.length - 1];
            if (isLastItem) {
                line.style.borderTopRightRadius = "60px";
                line.style.borderBottomRightRadius = "60px";
                indicator.style.borderTopRightRadius = "60px";
                indicator.style.borderBottomRightRadius = "60px";
                
            } else {
                line.style.borderTopRightRadius = "100px";
                line.style.borderBottomRightRadius = "0px";
                indicator.style.borderTopRightRadius = "100px";
                indicator.style.borderBottomRightRadius = "0px";
                line.style.borderTopLeftRadius = "0px";
                line.style.borderBottomLeftRadius = "100px";
            }
        }

        // Kattintás: Görgetés a megfelelő szekcióhoz
        items.forEach((item, index) => {
            item.addEventListener("click", () => {
                sections[index].scrollIntoView({ behavior: "smooth" });
            });
        });

        // Görgetés figyelése: Navigáció frissítése
        content.addEventListener("scroll", () => {
            let current = 0;
            const scrollPos = content.scrollTop + (window.innerHeight / 3);

            sections.forEach((section, index) => {
                if (scrollPos >= section.offsetTop) {
                    current = index;
                }
            });

            items.forEach(item => item.classList.remove("is-active"));
            items[current].classList.add("is-active");
            moveIndicator(items[current]);
        });

        // Kezdő beállítás a Home elemhez
        window.addEventListener('load', () => {
            items[0].classList.add("is-active");
            setTimeout(() => {
                moveIndicator(items[0]);
            }, 100);
        });

        function initNavbar() {
            // 1. Kényszerítsük a Home-ot aktív állapotba
            items.forEach(item => item.classList.remove("is-active"));
            items[0].classList.add("is-active");

            // 2. Kicsit várjunk, amíg a böngésző "felébred"
            setTimeout(() => {
                moveIndicator(items[0]);
            }, 150);
        }

        // Amikor minden betöltődött, indítsuk el
        window.addEventListener("load", initNavbar);

        // Ha átméretezed az ablakot, ne csússzon el
        window.addEventListener("resize", () => {
            const currentActive = document.querySelector(".nav-item.is-active");
            if (currentActive) moveIndicator(currentActive);
        });