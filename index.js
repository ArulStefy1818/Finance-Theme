/* ================================================================
   STACKLY FINANCE
   COMPLETE WEBSITE JAVASCRIPT

   FEATURES:
   - Professional 3-video hero slider
   - Automatic 7-second rotation
   - No desktop hover pause
   - Only active video plays
   - Mobile menu pauses slider
   - Swipe navigation
   - Keyboard navigation
   - Fixed header on ALL pages
   - Header scroll state
   - Desktop active navigation
   - Mobile active navigation
   - AOS initialization
   - Newsletter validation
   - Page visibility protection
   - Reduced motion support
================================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* ============================================================
       CONFIGURATION
    ============================================================ */

    const FINANCE_CONFIG = {

        slider: {
            interval: 7000,
            transitionDuration: 900,
            swipeThreshold: 55
        },

        menu: {
            animationDuration: 400
        },

        header: {
            scrollThreshold: 50,
            mobileBreakpoint: 992
        },

        selectors: {

            hero: ".stackly-finance-hero-section",

            slider: ".stackly-finance-hero-slider",

            slides: ".stackly-finance-hero-slide",

            videos: ".stackly-finance-hero-video",

            indicators: ".stackly-finance-indicator",

            header: ".stackly-finance-header",

            menuToggle: "#stacklyFinanceMenuToggle",

            menuClose: "#stacklyFinanceMenuClose",

            mobileMenu: "#stacklyFinanceMobileMenu",

            overlay: "#stacklyFinanceOverlay",

            mobileLinks:
                ".stackly-finance-mobile-navigation a",

            desktopNavLinks:
                ".stackly-finance-nav-link"

        }

    };


    /* ============================================================
       GET ELEMENTS
    ============================================================ */

    const hero =
        document.querySelector(
            FINANCE_CONFIG.selectors.hero
        );

    const slider =
        document.querySelector(
            FINANCE_CONFIG.selectors.slider
        );

    const slides =
        document.querySelectorAll(
            FINANCE_CONFIG.selectors.slides
        );

    const indicators =
        document.querySelectorAll(
            FINANCE_CONFIG.selectors.indicators
        );

    const menuToggle =
        document.querySelector(
            FINANCE_CONFIG.selectors.menuToggle
        );

    const menuClose =
        document.querySelector(
            FINANCE_CONFIG.selectors.menuClose
        );

    const mobileMenu =
        document.querySelector(
            FINANCE_CONFIG.selectors.mobileMenu
        );

    const overlay =
        document.querySelector(
            FINANCE_CONFIG.selectors.overlay
        );

    const mobileLinks =
        document.querySelectorAll(
            FINANCE_CONFIG.selectors.mobileLinks
        );

    const desktopNavLinks =
        document.querySelectorAll(
            FINANCE_CONFIG.selectors.desktopNavLinks
        );

    const financeHeader =
        document.querySelector(
            FINANCE_CONFIG.selectors.header
        );


    /* ============================================================
       REDUCED MOTION
    ============================================================ */

    const reducedMotionQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    /* ============================================================
       SLIDER STATE
    ============================================================ */

    let currentSlide = 0;

    let sliderTimer = null;

    let isSliderPaused = false;

    let isAnimating = false;

    let menuIsOpen = false;

    let touchStartX = 0;

    let touchEndX = 0;


    /* ============================================================
       BASIC HERO VALIDATION
    ============================================================ */

    if (!hero) {

        console.warn(
            "Stackly Finance: Hero section not found."
        );

    }


    /* ============================================================
       GET SLIDE VIDEO
    ============================================================ */

    function getSlideVideo(slide) {

        if (!slide) {
            return null;
        }

        return slide.querySelector(
            FINANCE_CONFIG.selectors.videos
        );

    }


    /* ============================================================
       GET CURRENT VIDEO
    ============================================================ */

    function getCurrentVideo() {

        if (!slides.length) {
            return null;
        }

        if (!slides[currentSlide]) {
            return null;
        }

        return getSlideVideo(
            slides[currentSlide]
        );

    }


    /* ============================================================
       PREPARE VIDEO
    ============================================================ */

    function prepareVideo(video) {

        if (!video) {
            return;
        }

        video.muted = true;

        video.defaultMuted = true;

        video.setAttribute(
            "muted",
            ""
        );

        video.playsInline = true;

        video.setAttribute(
            "playsinline",
            ""
        );

        video.preload = "auto";

        video.volume = 0;

    }


    /* ============================================================
       PLAY VIDEO SAFELY
    ============================================================ */

    function playVideo(video) {

        if (!video) {
            return;
        }

        prepareVideo(video);


        /* --------------------------------------------------------
           ONLY CURRENT SLIDE CAN PLAY
        -------------------------------------------------------- */

        const activeSlide =
            video.closest(
                FINANCE_CONFIG.selectors.slides
            );

        if (activeSlide) {

            const activeIndex =
                Array.from(slides).indexOf(
                    activeSlide
                );

            if (
                activeIndex !== currentSlide
            ) {
                return;
            }

        }


        /* --------------------------------------------------------
           PAGE HIDDEN
        -------------------------------------------------------- */

        if (document.hidden) {
            return;
        }


        /* --------------------------------------------------------
           SLIDER PAUSED
        -------------------------------------------------------- */

        if (isSliderPaused) {
            return;
        }


        /* --------------------------------------------------------
           REDUCED MOTION
        -------------------------------------------------------- */

        if (reducedMotionQuery.matches) {
            return;
        }


        /* --------------------------------------------------------
           PLAY
        -------------------------------------------------------- */

        const playPromise =
            video.play();

        if (
            playPromise &&
            typeof playPromise.catch === "function"
        ) {

            playPromise.catch(
                function () {

                    /*
                       Autoplay can be blocked by browser.
                       Slider continues normally.
                    */

                }
            );

        }

    }


    /* ============================================================
       PAUSE VIDEO
    ============================================================ */

    function pauseVideo(
        video,
        reset = false
    ) {

        if (!video) {
            return;
        }

        try {

            video.pause();

        } catch (error) {

            console.warn(
                "Stackly Finance: Unable to pause video.",
                error
            );

        }


        if (reset) {

            try {

                video.currentTime = 0;

            } catch (error) {

                /* Ignore seek errors */

            }

        }

    }


    /* ============================================================
       PAUSE ALL VIDEOS
    ============================================================ */

    function pauseAllVideos(
        reset = false
    ) {

        slides.forEach(
            function (slide) {

                const video =
                    getSlideVideo(slide);

                if (!video) {
                    return;
                }

                pauseVideo(
                    video,
                    reset
                );

            }
        );

    }


    /* ============================================================
       PLAY CURRENT VIDEO ONLY
    ============================================================ */

    function playCurrentVideo() {

        if (!slides.length) {
            return;
        }

        if (document.hidden) {
            return;
        }

        if (isSliderPaused) {
            return;
        }

        if (reducedMotionQuery.matches) {
            return;
        }


        const activeVideo =
            getCurrentVideo();

        if (!activeVideo) {
            return;
        }


        /* --------------------------------------------------------
           STOP ALL OTHER VIDEOS
        -------------------------------------------------------- */

        slides.forEach(
            function (slide, index) {

                if (
                    index === currentSlide
                ) {
                    return;
                }

                const video =
                    getSlideVideo(slide);

                if (video) {

                    pauseVideo(
                        video,
                        false
                    );

                }

            }
        );


        /* --------------------------------------------------------
           PLAY ACTIVE VIDEO
        -------------------------------------------------------- */

        playVideo(
            activeVideo
        );

    }


    /* ============================================================
       UPDATE INDICATORS
    ============================================================ */

    function updateIndicators(
        activeIndex
    ) {

        indicators.forEach(
            function (
                indicator,
                index
            ) {

                const active =
                    index === activeIndex;

                indicator.classList.toggle(
                    "stackly-finance-indicator-active",
                    active
                );

                indicator.setAttribute(
                    "aria-current",
                    active
                        ? "true"
                        : "false"
                );

                indicator.setAttribute(
                    "tabindex",
                    active
                        ? "0"
                        : "-1"
                );

            }
        );

    }


    /* ============================================================
       UPDATE ACCESSIBILITY
    ============================================================ */

    function updateAccessibility(
        activeIndex
    ) {

        slides.forEach(
            function (
                slide,
                index
            ) {

                slide.setAttribute(
                    "aria-hidden",
                    index === activeIndex
                        ? "false"
                        : "true"
                );

            }
        );

    }


    /* ============================================================
       UPDATE SLIDE VISUAL STATE
    ============================================================ */

    function updateSlideVisualState(
        activeIndex
    ) {

        slides.forEach(
            function (
                slide,
                index
            ) {

                const active =
                    index === activeIndex;


                slide.classList.toggle(
                    "stackly-finance-slide-active",
                    active
                );


                slide.setAttribute(
                    "aria-hidden",
                    active
                        ? "false"
                        : "true"
                );


                slide.style.zIndex =
                    active
                        ? "2"
                        : "1";


                slide.style.visibility =
                    active
                        ? "visible"
                        : "hidden";


                slide.style.opacity =
                    active
                        ? "1"
                        : "0";


                slide.style.pointerEvents =
                    active
                        ? "auto"
                        : "none";

            }
        );

    }


    /* ============================================================
       AOS REFRESH
    ============================================================ */

    function refreshAOS() {

        if (
            typeof AOS ===
            "undefined"
        ) {
            return;
        }

        window.setTimeout(
            function () {

                if (
                    typeof AOS.refreshHard ===
                    "function"
                ) {

                    AOS.refreshHard();

                } else if (
                    typeof AOS.refresh ===
                    "function"
                ) {

                    AOS.refresh();

                }

            },
            100
        );

    }


    /* ============================================================
       PRELOAD NEXT VIDEO
    ============================================================ */

    function preloadNextVideo() {

        if (
            slides.length <= 1
        ) {
            return;
        }


        const nextIndex =
            (
                currentSlide + 1
            ) %
            slides.length;


        const nextSlide =
            slides[nextIndex];


        if (!nextSlide) {
            return;
        }


        const nextVideo =
            getSlideVideo(
                nextSlide
            );


        if (!nextVideo) {
            return;
        }


        prepareVideo(
            nextVideo
        );

    }


    /* ============================================================
       SHOW SLIDE
    ============================================================ */

    function showSlide(
        requestedIndex,
        immediate = false
    ) {

        if (!slides.length) {
            return;
        }


        let newIndex =
            Number(requestedIndex);


        if (
            !Number.isFinite(
                newIndex
            )
        ) {
            return;
        }


        newIndex =
            Math.round(
                newIndex
            );


        if (
            newIndex < 0
        ) {

            newIndex =
                slides.length - 1;

        }


        if (
            newIndex >=
            slides.length
        ) {

            newIndex = 0;

        }


        /* --------------------------------------------------------
           SAME SLIDE
        -------------------------------------------------------- */

        if (
            newIndex === currentSlide &&
            !immediate
        ) {

            updateIndicators(
                currentSlide
            );

            updateAccessibility(
                currentSlide
            );

            updateSlideVisualState(
                currentSlide
            );

            playCurrentVideo();

            return;

        }


        /* --------------------------------------------------------
           PREVENT OVERLAPPING ANIMATION
        -------------------------------------------------------- */

        if (
            isAnimating &&
            !immediate
        ) {
            return;
        }


        isAnimating = true;


        /* --------------------------------------------------------
           STOP OLD VIDEOS
        -------------------------------------------------------- */

        pauseAllVideos(true);


        /* --------------------------------------------------------
           UPDATE CURRENT SLIDE
        -------------------------------------------------------- */

        currentSlide =
            newIndex;


        /* --------------------------------------------------------
           UPDATE VISUAL STATE
        -------------------------------------------------------- */

        updateSlideVisualState(
            currentSlide
        );


        updateIndicators(
            currentSlide
        );


        updateAccessibility(
            currentSlide
        );


        /* --------------------------------------------------------
           PLAY NEW VIDEO
        -------------------------------------------------------- */

        const activeVideo =
            getCurrentVideo();


        if (activeVideo) {

            prepareVideo(
                activeVideo
            );


            window.setTimeout(
                function () {

                    if (
                        currentSlide !==
                        newIndex
                    ) {
                        return;
                    }

                    if (
                        document.hidden
                    ) {
                        return;
                    }

                    if (
                        isSliderPaused
                    ) {
                        return;
                    }

                    if (
                        reducedMotionQuery.matches
                    ) {
                        return;
                    }

                    playVideo(
                        activeVideo
                    );

                },
                immediate
                    ? 0
                    : 120
            );

        }


        refreshAOS();

        preloadNextVideo();


        /* --------------------------------------------------------
           RELEASE ANIMATION LOCK
        -------------------------------------------------------- */

        if (immediate) {

            isAnimating = false;

        } else {

            window.setTimeout(
                function () {

                    isAnimating =
                        false;

                },
                FINANCE_CONFIG.slider.transitionDuration
            );

        }

    }


    /* ============================================================
       NEXT SLIDE
    ============================================================ */

    function nextSlide() {

        if (
            slides.length <= 1
        ) {
            return;
        }

        if (isAnimating) {
            return;
        }


        const nextIndex =
            (
                currentSlide + 1
            ) %
            slides.length;


        showSlide(
            nextIndex
        );

    }


    /* ============================================================
       PREVIOUS SLIDE
    ============================================================ */

    function previousSlide() {

        if (
            slides.length <= 1
        ) {
            return;
        }

        if (isAnimating) {
            return;
        }


        const previousIndex =
            (
                currentSlide -
                1 +
                slides.length
            ) %
            slides.length;


        showSlide(
            previousIndex
        );

    }


    /* ============================================================
       GO TO SLIDE
    ============================================================ */

    function goToSlide(index) {

        if (
            typeof index !== "number"
        ) {
            return;
        }


        if (
            index < 0 ||
            index >= slides.length
        ) {
            return;
        }


        showSlide(
            index
        );


        restartSlider();

    }


    /* ============================================================
       STOP SLIDER TIMER
    ============================================================ */

    function stopSlider() {

        if (
            sliderTimer !== null
        ) {

            window.clearTimeout(
                sliderTimer
            );

            sliderTimer = null;

        }

    }


    /* ============================================================
       SCHEDULE NEXT SLIDE
    ============================================================ */

    function scheduleNextSlide() {

        stopSlider();


        if (
            slides.length <= 1
        ) {
            return;
        }


        if (isSliderPaused) {
            return;
        }


        if (document.hidden) {
            return;
        }


        if (
            reducedMotionQuery.matches
        ) {
            return;
        }


        sliderTimer =
            window.setTimeout(
                function () {

                    sliderTimer = null;


                    if (
                        isSliderPaused ||
                        document.hidden ||
                        reducedMotionQuery.matches
                    ) {
                        return;
                    }


                    nextSlide();


                    scheduleNextSlide();

                },
                FINANCE_CONFIG.slider.interval
            );

    }


    /* ============================================================
       START SLIDER
    ============================================================ */

    function startSlider() {

        if (
            slides.length <= 1
        ) {
            return;
        }


        if (isSliderPaused) {
            return;
        }


        if (document.hidden) {
            return;
        }


        if (
            reducedMotionQuery.matches
        ) {
            return;
        }


        playCurrentVideo();

        scheduleNextSlide();

    }


    /* ============================================================
       RESTART SLIDER
    ============================================================ */

    function restartSlider() {

        stopSlider();


        if (
            !isSliderPaused &&
            !document.hidden &&
            !reducedMotionQuery.matches
        ) {

            scheduleNextSlide();

        }

    }


    /* ============================================================
       PAUSE SLIDER
    ============================================================ */

    function pauseSlider() {

        isSliderPaused = true;


        stopSlider();


        if (hero) {

            hero.classList.add(
                "stackly-finance-slider-paused"
            );

        }


        const currentVideo =
            getCurrentVideo();


        if (currentVideo) {

            pauseVideo(
                currentVideo,
                false
            );

        }

    }


    /* ============================================================
       RESUME SLIDER
    ============================================================ */

    function resumeSlider() {

        if (
            reducedMotionQuery.matches
        ) {
            return;
        }


        isSliderPaused = false;


        if (hero) {

            hero.classList.remove(
                "stackly-finance-slider-paused"
            );

        }


        playCurrentVideo();


        scheduleNextSlide();

    }


    /* ============================================================
       INDICATOR EVENTS
    ============================================================ */

    indicators.forEach(
        function (
            indicator,
            index
        ) {

            indicator.addEventListener(
                "click",
                function () {

                    goToSlide(
                        index
                    );

                }
            );


            indicator.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key ===
                        "ArrowRight"
                    ) {

                        event.preventDefault();

                        nextSlide();

                    }


                    if (
                        event.key ===
                        "ArrowLeft"
                    ) {

                        event.preventDefault();

                        previousSlide();

                    }


                    if (
                        event.key ===
                        "Home"
                    ) {

                        event.preventDefault();

                        goToSlide(0);

                    }


                    if (
                        event.key ===
                        "End"
                    ) {

                        event.preventDefault();

                        goToSlide(
                            slides.length - 1
                        );

                    }

                }
            );

        }
    );


    /* ============================================================
       KEYBOARD CONTROLS
    ============================================================ */

    document.addEventListener(
        "keydown",
        function (event) {

            const target =
                event.target;

            const tagName =
                target &&
                target.tagName
                    ? target.tagName.toLowerCase()
                    : "";


            if (
                tagName === "input" ||
                tagName === "textarea" ||
                tagName === "select" ||
                tagName === "button"
            ) {

                if (
                    event.key !==
                    "Escape"
                ) {
                    return;
                }

            }


            /* ----------------------------------------------------
               ESC
            ---------------------------------------------------- */

            if (
                event.key ===
                "Escape"
            ) {

                if (menuIsOpen) {

                    closeMobileMenu();

                }

                return;

            }


            if (menuIsOpen) {
                return;
            }


            /* ----------------------------------------------------
               RIGHT
            ---------------------------------------------------- */

            if (
                event.key ===
                "ArrowRight"
            ) {

                nextSlide();

            }


            /* ----------------------------------------------------
               LEFT
            ---------------------------------------------------- */

            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousSlide();

            }

        }
    );


    /* ============================================================
       TOUCH START
    ============================================================ */

    if (slider) {

        slider.addEventListener(
            "touchstart",
            function (event) {

                if (
                    event.changedTouches &&
                    event.changedTouches.length
                ) {

                    touchStartX =
                        event.changedTouches[0]
                            .screenX;

                }

            },
            {
                passive: true
            }
        );


        /* ========================================================
           TOUCH END
        ======================================================== */

        slider.addEventListener(
            "touchend",
            function (event) {

                if (
                    event.changedTouches &&
                    event.changedTouches.length
                ) {

                    touchEndX =
                        event.changedTouches[0]
                            .screenX;

                }


                handleSwipe();

            },
            {
                passive: true
            }
        );

    }


    /* ============================================================
       HANDLE SWIPE
    ============================================================ */

    function handleSwipe() {

        const distance =
            touchEndX -
            touchStartX;


        if (
            Math.abs(distance) <
            FINANCE_CONFIG.slider.swipeThreshold
        ) {
            return;
        }


        if (
            distance < 0
        ) {

            nextSlide();

        } else {

            previousSlide();

        }


        restartSlider();

    }


    /* ============================================================
       PAGE VISIBILITY
    ============================================================ */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                stopSlider();

                pauseAllVideos(
                    false
                );

            } else {

                if (
                    !isSliderPaused &&
                    !reducedMotionQuery.matches
                ) {

                    playCurrentVideo();

                    scheduleNextSlide();

                }

            }

        }
    );


    /* ============================================================
       VIDEO EVENTS
    ============================================================ */

    slides.forEach(
        function (
            slide,
            index
        ) {

            const video =
                getSlideVideo(
                    slide
                );


            if (!video) {

                console.warn(
                    "Stackly Finance: Video missing in slide " +
                    (index + 1)
                );

                return;

            }


            prepareVideo(
                video
            );


            video.addEventListener(
                "error",
                function () {

                    console.error(
                        "Stackly Finance: Unable to load video " +
                        (index + 1),
                        video.currentSrc ||
                        video.src
                    );

                }
            );


            video.addEventListener(
                "canplay",
                function () {

                    if (
                        index !==
                        currentSlide
                    ) {
                        return;
                    }


                    if (
                        document.hidden ||
                        isSliderPaused ||
                        reducedMotionQuery.matches
                    ) {
                        return;
                    }


                    playVideo(
                        video
                    );

                }
            );


            video.addEventListener(
                "loadeddata",
                function () {

                    if (
                        index !==
                        currentSlide
                    ) {
                        return;
                    }


                    if (
                        document.hidden ||
                        isSliderPaused ||
                        reducedMotionQuery.matches
                    ) {
                        return;
                    }


                    playVideo(
                        video
                    );

                }
            );

        }
    );


    /* ============================================================
       MOBILE MENU - OPEN
    ============================================================ */

    function openMobileMenu() {

        if (
            !mobileMenu ||
            !overlay ||
            !menuToggle
        ) {
            return;
        }


        menuIsOpen = true;


        mobileMenu.classList.add(
            "active"
        );


        overlay.classList.add(
            "active"
        );


        menuToggle.classList.add(
            "active"
        );


        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );


        overlay.setAttribute(
            "aria-hidden",
            "false"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Close Menu"
        );


        document.body.classList.add(
            "stackly-finance-menu-open"
        );


        /* --------------------------------------------------------
           PAUSE HERO
        -------------------------------------------------------- */

        pauseSlider();


        const firstLink =
            mobileMenu.querySelector(
                ".stackly-finance-mobile-navigation a"
            );


        if (firstLink) {

            window.setTimeout(
                function () {

                    firstLink.focus();

                },
                FINANCE_CONFIG.menu.animationDuration
            );

        }

    }


    /* ============================================================
       MOBILE MENU - CLOSE
    ============================================================ */

    function closeMobileMenu() {

        if (
            !mobileMenu ||
            !overlay ||
            !menuToggle
        ) {
            return;
        }


        if (!menuIsOpen) {
            return;
        }


        menuIsOpen = false;


        mobileMenu.classList.remove(
            "active"
        );


        overlay.classList.remove(
            "active"
        );


        menuToggle.classList.remove(
            "active"
        );


        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );


        overlay.setAttribute(
            "aria-hidden",
            "true"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Open Menu"
        );


        document.body.classList.remove(
            "stackly-finance-menu-open"
        );


        /* --------------------------------------------------------
           RESUME HERO
        -------------------------------------------------------- */

        resumeSlider();


        window.setTimeout(
            function () {

                menuToggle.focus();

            },
            FINANCE_CONFIG.menu.animationDuration
        );

    }


    /* ============================================================
       MOBILE MENU TOGGLE
    ============================================================ */

    function toggleMobileMenu() {

        if (menuIsOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    }


    /* ============================================================
       HAMBURGER
    ============================================================ */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                toggleMobileMenu();

            }
        );

    }


    /* ============================================================
       CLOSE BUTTON
    ============================================================ */

    if (menuClose) {

        menuClose.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeMobileMenu();

            }
        );

    }


    /* ============================================================
       OVERLAY
    ============================================================ */

    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeMobileMenu();

            }
        );

    }


    /* ============================================================
       MOBILE LINKS
    ============================================================ */

    mobileLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        }
    );


    /* ============================================================
       RESIZE PROTECTION
    ============================================================ */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth >
                FINANCE_CONFIG.header.mobileBreakpoint &&
                menuIsOpen
            ) {

                closeMobileMenu();

            }

        }
    );


    /* ============================================================
       FIXED HEADER
       WORKS ON ALL FINANCE PAGES
    ============================================================ */

    function updateFinanceHeader() {

        if (!financeHeader) {
            return;
        }


        const scrollPosition =
            window.scrollY ||
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            0;


        if (
            scrollPosition >
            FINANCE_CONFIG.header.scrollThreshold
        ) {

            financeHeader.classList.add(
                "scrolled"
            );

        } else {

            financeHeader.classList.remove(
                "scrolled"
            );

        }

    }


    /* ============================================================
       HEADER SCROLL EVENT
    ============================================================ */

    window.addEventListener(
        "scroll",
        updateFinanceHeader,
        {
            passive: true
        }
    );


    /* ============================================================
       HEADER RESIZE EVENT
    ============================================================ */

    window.addEventListener(
        "resize",
        updateFinanceHeader
    );


    /* ============================================================
       HEADER LOAD EVENT
    ============================================================ */

    window.addEventListener(
        "load",
        updateFinanceHeader
    );


    /* ============================================================
       HEADER PAGE SHOW
    ============================================================ */

    window.addEventListener(
        "pageshow",
        updateFinanceHeader
    );


    /* ============================================================
       INITIAL HEADER STATE
    ============================================================ */

    updateFinanceHeader();


    /* ============================================================
       AOS INITIALIZATION
    ============================================================ */

    function initializeAOS() {

        if (
            typeof AOS ===
            "undefined"
        ) {

            console.warn(
                "Stackly Finance: AOS library not found."
            );

            return;

        }


        AOS.init({

            duration: 850,

            once: true,

            offset: 80,

            easing:
                "ease-out-cubic"

        });

    }


    /* ============================================================
       DESKTOP NAVIGATION
       PAGE-BASED ACTIVE STATE
    ============================================================ */

    function initializeNavigation() {

        if (
            !desktopNavLinks.length
        ) {
            return;
        }


        let currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        if (
            !currentPage ||
            currentPage === "/" ||
            currentPage === "index"
        ) {

            currentPage =
                "index.html";

        }


        desktopNavLinks.forEach(
            function (link) {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (!href) {
                    return;
                }


                const linkPage =
                    href
                        .split("/")
                        .pop()
                        .split("?")[0]
                        .split("#")[0]
                        .toLowerCase();


                link.classList.remove(
                    "stackly-finance-nav-active"
                );


                if (
                    linkPage ===
                    currentPage
                ) {

                    link.classList.add(
                        "stackly-finance-nav-active"
                    );

                }

            }
        );

    }


    /* ============================================================
       MOBILE NAVIGATION
       PAGE-BASED ACTIVE STATE
    ============================================================ */

    function initializeMobileNavigation() {

        const financeMobileLinks =
            document.querySelectorAll(
                ".stackly-finance-mobile-navigation > a:not(.stackly-finance-mobile-login)"
            );


        if (
            !financeMobileLinks.length
        ) {
            return;
        }


        let currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        if (
            !currentPage ||
            currentPage === "/" ||
            currentPage === "index"
        ) {

            currentPage =
                "index.html";

        }


        financeMobileLinks.forEach(
            function (link) {

                const linkPage =
                    link.getAttribute(
                        "href"
                    );


                if (!linkPage) {
                    return;
                }


                const cleanPage =
                    linkPage
                        .split("/")
                        .pop()
                        .split("?")[0]
                        .split("#")[0]
                        .toLowerCase();


                link.classList.remove(
                    "stackly-finance-mobile-nav-active"
                );


                if (
                    cleanPage ===
                    currentPage
                ) {

                    link.classList.add(
                        "stackly-finance-mobile-nav-active"
                    );

                }

            }
        );

    }


    /* ============================================================
       REDUCED MOTION
    ============================================================ */

    function applyReducedMotionPreference() {

        if (!hero) {
            return;
        }


        if (
            reducedMotionQuery.matches
        ) {

            isSliderPaused = true;

            stopSlider();

            pauseAllVideos(
                true
            );


            hero.classList.add(
                "stackly-finance-reduced-motion"
            );

        } else {

            hero.classList.remove(
                "stackly-finance-reduced-motion"
            );

        }

    }


    /* ============================================================
       REDUCED MOTION CHANGE
    ============================================================ */

    function handleReducedMotionChange(event) {

        if (
            event.matches
        ) {

            isSliderPaused = true;

            stopSlider();

            pauseAllVideos(
                true
            );


            if (hero) {

                hero.classList.add(
                    "stackly-finance-reduced-motion"
                );

            }

        } else {

            isSliderPaused = false;


            if (hero) {

                hero.classList.remove(
                    "stackly-finance-reduced-motion"
                );

            }


            playCurrentVideo();

            scheduleNextSlide();

        }

    }


    if (
        typeof reducedMotionQuery.addEventListener ===
        "function"
    ) {

        reducedMotionQuery.addEventListener(
            "change",
            handleReducedMotionChange
        );

    } else if (
        typeof reducedMotionQuery.addListener ===
        "function"
    ) {

        reducedMotionQuery.addListener(
            handleReducedMotionChange
        );

    }


    /* ============================================================
       INITIALIZE SLIDER
    ============================================================ */

    function initializeSlider() {

        if (!slides.length) {
            return;
        }


        /* --------------------------------------------------------
           FIND HTML ACTIVE SLIDE
        -------------------------------------------------------- */

        let foundActiveSlide = false;


        slides.forEach(
            function (
                slide,
                index
            ) {

                if (
                    slide.classList.contains(
                        "stackly-finance-slide-active"
                    ) &&
                    !foundActiveSlide
                ) {

                    currentSlide =
                        index;

                    foundActiveSlide =
                        true;

                }

            }
        );


        /* --------------------------------------------------------
           PREPARE SLIDES
        -------------------------------------------------------- */

        slides.forEach(
            function (
                slide,
                index
            ) {

                const active =
                    index === currentSlide;


                slide.classList.toggle(
                    "stackly-finance-slide-active",
                    active
                );


                slide.setAttribute(
                    "aria-hidden",
                    active
                        ? "false"
                        : "true"
                );


                slide.style.zIndex =
                    active
                        ? "2"
                        : "1";


                slide.style.visibility =
                    active
                        ? "visible"
                        : "hidden";


                slide.style.opacity =
                    active
                        ? "1"
                        : "0";


                slide.style.pointerEvents =
                    active
                        ? "auto"
                        : "none";


                const video =
                    getSlideVideo(
                        slide
                    );


                if (!video) {
                    return;
                }


                prepareVideo(
                    video
                );


                if (!active) {

                    pauseVideo(
                        video,
                        true
                    );

                }

            }
        );


        updateIndicators(
            currentSlide
        );


        updateAccessibility(
            currentSlide
        );


        /* --------------------------------------------------------
           START ACTIVE VIDEO
        -------------------------------------------------------- */

        if (
            !reducedMotionQuery.matches
        ) {

            const firstVideo =
                getCurrentVideo();


            if (firstVideo) {

                try {

                    firstVideo.currentTime =
                        0;

                } catch (error) {

                    /* Ignore */

                }


                playVideo(
                    firstVideo
                );

            }

        }


        preloadNextVideo();


        startSlider();

    }


    /* ============================================================
       PAGE SHOW / BACK FORWARD CACHE
    ============================================================ */

    window.addEventListener(
        "pageshow",
        function () {

            document.body.classList.remove(
                "stackly-finance-menu-open"
            );


            if (mobileMenu) {

                mobileMenu.classList.remove(
                    "active"
                );


                mobileMenu.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            if (overlay) {

                overlay.classList.remove(
                    "active"
                );


                overlay.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

            }


            menuIsOpen = false;


            if (
                !document.hidden &&
                !isSliderPaused &&
                !reducedMotionQuery.matches
            ) {

                playCurrentVideo();

                scheduleNextSlide();

            }


            updateFinanceHeader();

        }
    );


    /* ============================================================
       NEWSLETTER VALIDATION
    ============================================================ */

    const newsletterForm =
        document.getElementById(
            "financeNewsletterForm"
        );

    const newsletterEmail =
        document.getElementById(
            "financeNewsletterEmail"
        );

    const newsletterMessage =
        document.getElementById(
            "financeNewsletterMessage"
        );


    if (
        newsletterForm &&
        newsletterEmail &&
        newsletterMessage
    ) {


        /* --------------------------------------------------------
           EMAIL VALIDATION
        -------------------------------------------------------- */

        function isValidEmail(email) {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            return emailPattern.test(
                email
            );

        }


        /* --------------------------------------------------------
           SHOW MESSAGE
        -------------------------------------------------------- */

        function showNewsletterMessage(
            message,
            type
        ) {

            newsletterMessage.textContent =
                message;


            newsletterMessage.className =
                "stackly-finance-newsletter-message " +
                "stackly-finance-newsletter-message-" +
                type;


            newsletterMessage.style.display =
                "block";


            clearTimeout(
                newsletterMessage.hideTimer
            );


            newsletterMessage.hideTimer =
                setTimeout(
                    function () {

                        newsletterMessage.style.display =
                            "none";

                    },
                    4500
                );

        }


        /* --------------------------------------------------------
           CLEAR MESSAGE
        -------------------------------------------------------- */

        function clearNewsletterMessage() {

            clearTimeout(
                newsletterMessage.hideTimer
            );


            newsletterMessage.textContent =
                "";


            newsletterMessage.className =
                "stackly-finance-newsletter-message";


            newsletterMessage.style.display =
                "none";

        }


        /* --------------------------------------------------------
           SUBMIT
        -------------------------------------------------------- */

        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const email =
                    newsletterEmail.value.trim();


                if (
                    email === ""
                ) {

                    showNewsletterMessage(
                        "Please enter your email address.",
                        "error"
                    );


                    newsletterEmail.focus();

                    return;

                }


                if (
                    !isValidEmail(email)
                ) {

                    showNewsletterMessage(
                        "Please enter a valid email address.",
                        "error"
                    );


                    newsletterEmail.focus();

                    return;

                }


                showNewsletterMessage(
                    "Thank you! You have successfully subscribed to our newsletter.",
                    "success"
                );


                newsletterForm.reset();


                setTimeout(
                    function () {

                        newsletterEmail.focus();

                    },
                    100
                );

            }
        );


        /* --------------------------------------------------------
           CLEAR ERROR WHILE TYPING
        -------------------------------------------------------- */

        newsletterEmail.addEventListener(
            "input",
            function () {

                if (
                    newsletterMessage.classList.contains(
                        "stackly-finance-newsletter-message-error"
                    )
                ) {

                    clearNewsletterMessage();

                }

            }
        );


        /* --------------------------------------------------------
           BLUR VALIDATION
        -------------------------------------------------------- */

        newsletterEmail.addEventListener(
            "blur",
            function () {

                const email =
                    newsletterEmail.value.trim();


                if (
                    email === ""
                ) {
                    return;
                }


                if (
                    !isValidEmail(email)
                ) {

                    showNewsletterMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                }

            }
        );

    }


    /* ============================================================
       INITIALIZE EVERYTHING
    ============================================================ */

    initializeSlider();

    initializeAOS();

    initializeNavigation();

    initializeMobileNavigation();

    applyReducedMotionPreference();

    updateFinanceHeader();


    /* ============================================================
       FINAL VIDEO CHECK
    ============================================================ */

    window.setTimeout(
        function () {

            if (
                document.hidden
            ) {
                return;
            }


            if (
                isSliderPaused
            ) {
                return;
            }


            if (
                reducedMotionQuery.matches
            ) {
                return;
            }


            playCurrentVideo();


            if (
                sliderTimer === null
            ) {

                scheduleNextSlide();

            }

        },
        700
    );


    /* ============================================================
       FINAL HEADER CHECK
    ============================================================ */

    window.setTimeout(
        function () {

            updateFinanceHeader();

        },
        100
    );


    /* ============================================================
       FINAL MESSAGE
    ============================================================ */

    console.log(
        "Stackly Finance: Complete website JavaScript initialized."
    );

    console.log(
        "Stackly Finance: Header remains fixed while scrolling."
    );

    console.log(
        "Stackly Finance: Hero hover does not pause slider."
    );

});

/* ============================================================
   STACKLY FINANCE
   PROFESSIONAL CONTACT FORM
   VALIDATION + CUSTOM SERVICE DROPDOWN
   SUCCESS MESSAGE AUTO-HIDE
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    /* ========================================================
       FORM ELEMENTS
    ======================================================== */

    const form = document.getElementById(
        "stacklyFinanceContactForm"
    );

    const dropdown = document.getElementById(
        "stacklyFinanceServiceDropdown"
    );

    const trigger = document.getElementById(
        "stacklyFinanceServiceTrigger"
    );

    const menu = document.getElementById(
        "stacklyFinanceServiceMenu"
    );

    const selectedText = document.getElementById(
        "stacklyFinanceServiceSelected"
    );

    const hiddenInput = document.getElementById(
        "financeContactService"
    );

    const errorMessage = document.getElementById(
        "financeServiceError"
    );

    const formMessage = document.getElementById(
        "stacklyFinanceContactMessage"
    );


    /* ========================================================
       REQUIRED ELEMENT CHECK
    ======================================================== */

    if (!form) {
        return;
    }


    /* ========================================================
       FORM FIELDS
    ======================================================== */

    const nameField = document.getElementById(
        "financeContactName"
    );

    const phoneField = document.getElementById(
        "financeContactPhone"
    );

    const emailField = document.getElementById(
        "financeContactEmail"
    );

    const companyField = document.getElementById(
        "financeContactCompany"
    );

    const subjectField = document.getElementById(
        "financeContactSubject"
    );

    const messageField = document.getElementById(
        "financeContactMessage"
    );


    /* ========================================================
       SUCCESS MESSAGE TIMER
    ======================================================== */

    let successMessageTimer = null;


    /* ========================================================
       SHOW SUCCESS MESSAGE
    ======================================================== */

    function showSuccessMessage(message) {

        if (!formMessage) {
            return;
        }

        /* Clear previous timer */
        if (successMessageTimer) {
            clearTimeout(successMessageTimer);
        }

        /* Remove old classes */
        formMessage.classList.remove("error");

        /* Add success class */
        formMessage.classList.add("success");

        /* Show message */
        formMessage.textContent = message;

        /* Make sure message is visible */
        formMessage.style.display = "block";
        formMessage.style.opacity = "1";

        /* Scroll to success message */
        setTimeout(function () {

            formMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);


        /* ====================================================
           HIDE MESSAGE AFTER 4 SECONDS
        ==================================================== */

        successMessageTimer = setTimeout(function () {

            /* Fade out */
            formMessage.style.opacity = "0";

            /* Remove message after fade */
            setTimeout(function () {

                formMessage.textContent = "";

                formMessage.classList.remove(
                    "success"
                );

                formMessage.style.display = "none";
                formMessage.style.opacity = "";

            }, 400);

        }, 4000);
    }


    /* ========================================================
       CLEAR FORM MESSAGE
    ======================================================== */

    function clearFormMessage() {

        if (!formMessage) {
            return;
        }

        if (successMessageTimer) {
            clearTimeout(successMessageTimer);
            successMessageTimer = null;
        }

        formMessage.textContent = "";

        formMessage.classList.remove(
            "success",
            "error"
        );

        formMessage.style.display = "none";
        formMessage.style.opacity = "";

    }


    /* ========================================================
       CUSTOM DROPDOWN
    ======================================================== */

    if (
        dropdown &&
        trigger &&
        menu &&
        selectedText &&
        hiddenInput
    ) {


        /* ====================================================
           OPEN DROPDOWN
        ==================================================== */

        function openDropdown() {

            dropdown.classList.add("open");

            trigger.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        /* ====================================================
           CLOSE DROPDOWN
        ==================================================== */

        function closeDropdown() {

            dropdown.classList.remove("open");

            trigger.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* ====================================================
           TOGGLE DROPDOWN
        ==================================================== */

        trigger.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                if (
                    dropdown.classList.contains("open")
                ) {

                    closeDropdown();

                } else {

                    openDropdown();

                }

            }
        );


        /* ====================================================
           DROPDOWN OPTIONS
        ==================================================== */

        const options = menu.querySelectorAll(
            ".stackly-finance-dropdown-option"
        );


        options.forEach(function (option) {

            option.addEventListener(
                "click",
                function () {

                    const value =
                        option.getAttribute(
                            "data-value"
                        );

                    const span =
                        option.querySelector("span");

                    const text =
                        span
                            ? span.textContent.trim()
                            : "";


                    /* ----------------------------------------
                       UPDATE SELECTED TEXT
                    ---------------------------------------- */

                    selectedText.textContent = text;


                    /* ----------------------------------------
                       UPDATE HIDDEN VALUE
                    ---------------------------------------- */

                    hiddenInput.value = value;


                    /* ----------------------------------------
                       UPDATE DROPDOWN STATE
                    ---------------------------------------- */

                    dropdown.classList.add(
                        "has-value"
                    );

                    dropdown.classList.remove(
                        "is-error"
                    );

                    dropdown.classList.add(
                        "is-valid"
                    );


                    /* ----------------------------------------
                       REMOVE OLD SELECTION
                    ---------------------------------------- */

                    options.forEach(function (item) {

                        item.classList.remove(
                            "selected"
                        );

                        item.setAttribute(
                            "aria-selected",
                            "false"
                        );

                    });


                    /* ----------------------------------------
                       SELECT CURRENT OPTION
                    ---------------------------------------- */

                    option.classList.add(
                        "selected"
                    );

                    option.setAttribute(
                        "aria-selected",
                        "true"
                    );


                    /* ----------------------------------------
                       CLEAR SERVICE ERROR
                    ---------------------------------------- */

                    if (errorMessage) {

                        errorMessage.textContent = "";

                    }


                    /* ----------------------------------------
                       CLOSE DROPDOWN
                    ---------------------------------------- */

                    closeDropdown();

                }
            );

        });


        /* ====================================================
           CLICK OUTSIDE
        ==================================================== */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !dropdown.contains(
                        event.target
                    )
                ) {

                    closeDropdown();

                }

            }
        );


        /* ====================================================
           ESCAPE KEY
        ==================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    closeDropdown();

                }

            }
        );

    }


    /* ========================================================
       VALIDATION HELPER
    ======================================================== */

    function showFieldError(
        field,
        message
    ) {

        if (!field) {
            return;
        }

        field.classList.add("is-error");

        field.setAttribute(
            "aria-invalid",
            "true"
        );


        const parent =
            field.closest(
                ".stackly-finance-contact-field"
            );


        if (!parent) {
            return;
        }


        let error =
            parent.querySelector(
                ".stackly-finance-field-error"
            );


        if (!error) {

            error = document.createElement(
                "small"
            );

            error.className =
                "stackly-finance-field-error";

            parent.appendChild(error);

        }


        error.textContent = message;

    }


    /* ========================================================
       CLEAR FIELD ERROR
    ======================================================== */

    function clearFieldError(field) {

        if (!field) {
            return;
        }

        field.classList.remove(
            "is-error"
        );

        field.setAttribute(
            "aria-invalid",
            "false"
        );


        const parent =
            field.closest(
                ".stackly-finance-contact-field"
            );


        if (!parent) {
            return;
        }


        const error =
            parent.querySelector(
                ".stackly-finance-field-error"
            );


        if (error) {

            error.textContent = "";

        }

    }


    /* ========================================================
       VALIDATE NAME

       Allows:
       - A-Z
       - a-z
       - spaces

       Does not allow:
       - numbers
       - symbols
    ======================================================== */

    function validateName() {

        if (!nameField) {
            return true;
        }


        const value =
            nameField.value.trim();


        if (!value) {

            showFieldError(
                nameField,
                "Please enter your full name."
            );

            return false;

        }


        const namePattern =
            /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;


        if (!namePattern.test(value)) {

            showFieldError(
                nameField,
                "Name should contain alphabetic characters only."
            );

            return false;

        }


        clearFieldError(nameField);

        return true;

    }


    /* ========================================================
       VALIDATE PHONE

       Exactly 10 digits
    ======================================================== */

    function validatePhone() {

        if (!phoneField) {
            return true;
        }


        const value =
            phoneField.value.trim();


        if (!value) {

            showFieldError(
                phoneField,
                "Please enter your phone number."
            );

            return false;

        }


        const phonePattern =
            /^\d{10}$/;


        if (!phonePattern.test(value)) {

            showFieldError(
                phoneField,
                "Phone number must contain exactly 10 digits."
            );

            return false;

        }


        clearFieldError(phoneField);

        return true;

    }


    /* ========================================================
       VALIDATE EMAIL
    ======================================================== */

    function validateEmail() {

        if (!emailField) {
            return true;
        }


        const value =
            emailField.value.trim();


        if (!value) {

            showFieldError(
                emailField,
                "Please enter your email address."
            );

            return false;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        if (!emailPattern.test(value)) {

            showFieldError(
                emailField,
                "Please enter a valid email address."
            );

            return false;

        }


        clearFieldError(emailField);

        return true;

    }


    /* ========================================================
       VALIDATE SUBJECT

       Allows:
       - Letters
       - Spaces

       Does not allow:
       - Numbers
       - Special characters
    ======================================================== */

    function validateSubject() {

        if (!subjectField) {
            return true;
        }


        const value =
            subjectField.value.trim();


        if (!value) {

            showFieldError(
                subjectField,
                "Please enter a subject."
            );

            return false;

        }


        const subjectPattern =
            /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;


        if (!subjectPattern.test(value)) {

            showFieldError(
                subjectField,
                "Subject should contain characters only."
            );

            return false;

        }


        clearFieldError(subjectField);

        return true;

    }


    /* ========================================================
       VALIDATE MESSAGE
    ======================================================== */

    function validateMessage() {

        if (!messageField) {
            return true;
        }


        const value =
            messageField.value.trim();


        if (!value) {

            showFieldError(
                messageField,
                "Please enter your message."
            );

            return false;

        }


        if (value.length < 10) {

            showFieldError(
                messageField,
                "Please enter at least 10 characters."
            );

            return false;

        }


        clearFieldError(messageField);

        return true;

    }


    /* ========================================================
       VALIDATE SERVICE
    ======================================================== */

    function validateService() {

        if (
            !hiddenInput ||
            !dropdown
        ) {

            return true;

        }


        if (!hiddenInput.value) {

            dropdown.classList.add(
                "is-error"
            );

            dropdown.classList.remove(
                "is-valid"
            );


            if (errorMessage) {

                errorMessage.textContent =
                    "Please select a service.";

            }


            return false;

        }


        dropdown.classList.remove(
            "is-error"
        );

        dropdown.classList.add(
            "is-valid"
        );


        if (errorMessage) {

            errorMessage.textContent = "";

        }


        return true;

    }


    /* ========================================================
       INPUT RESTRICTIONS

       NAME = alphabetic + spaces
       SUBJECT = alphabetic + spaces
       PHONE = digits only
    ======================================================== */

    if (nameField) {

        nameField.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /[^A-Za-z\s]/g,
                        ""
                    );

                clearFieldError(this);

            }
        );

    }


    if (subjectField) {

        subjectField.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /[^A-Za-z\s]/g,
                        ""
                    );

                clearFieldError(this);

            }
        );

    }


    if (phoneField) {

        phoneField.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                        .replace(
                            /\D/g,
                            ""
                        )
                        .slice(0, 10);

                clearFieldError(this);

            }
        );

    }


    /* ========================================================
       EMAIL LIVE CLEAR
    ======================================================== */

    if (emailField) {

        emailField.addEventListener(
            "input",
            function () {

                clearFieldError(this);

            }
        );

    }


    /* ========================================================
       MESSAGE LIVE CLEAR
    ======================================================== */

    if (messageField) {

        messageField.addEventListener(
            "input",
            function () {

                clearFieldError(this);

            }
        );

    }


    /* ========================================================
       COMPANY LIVE CLEAR
    ======================================================== */

    if (companyField) {

        companyField.addEventListener(
            "input",
            function () {

                clearFieldError(this);

            }
        );

    }


    /* ========================================================
       FORM SUBMIT
    ======================================================== */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =================================================
               CLEAR PREVIOUS SUCCESS MESSAGE
            ================================================= */

            clearFormMessage();


            /* =================================================
               VALIDATE ALL REQUIRED FIELDS
            ================================================= */

            const nameValid =
                validateName();

            const phoneValid =
                validatePhone();

            const emailValid =
                validateEmail();

            const serviceValid =
                validateService();

            const subjectValid =
                validateSubject();

            const messageValid =
                validateMessage();


            /* =================================================
               CHECK RESULT
            ================================================= */

            const formIsValid =
                nameValid &&
                phoneValid &&
                emailValid &&
                serviceValid &&
                subjectValid &&
                messageValid;


            /* =================================================
               STOP IF INVALID
            ================================================= */

            if (!formIsValid) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please correct the highlighted fields and try again.";

                    formMessage.classList.add(
                        "error"
                    );

                    formMessage.style.display =
                        "block";

                }


                const firstError =
                    form.querySelector(
                        ".is-error"
                    );


                if (firstError) {

                    if (
                        firstError === dropdown
                    ) {

                        trigger.focus();

                    } else {

                        firstError.focus();

                    }

                }


                return;

            }


            /* =================================================
               SUCCESS
            ================================================= */

            showSuccessMessage(
                "Thank you! Your enquiry has been submitted successfully."
            );


            /* =================================================
               CLEAR FORM
            ================================================= */

            form.reset();


            /* =================================================
               RESET NORMAL INPUT STATES
            ================================================= */

            form.querySelectorAll(
                "input, textarea"
            ).forEach(function (field) {

                field.classList.remove(
                    "is-error",
                    "is-valid"
                );

                field.setAttribute(
                    "aria-invalid",
                    "false"
                );

            });


            /* =================================================
               RESET FIELD ERRORS
            ================================================= */

            form.querySelectorAll(
                ".stackly-finance-field-error"
            ).forEach(function (error) {

                error.textContent = "";

            });


            /* =================================================
               RESET CUSTOM DROPDOWN
            ================================================= */

            if (
                dropdown &&
                hiddenInput &&
                selectedText
            ) {

                hiddenInput.value = "";

                selectedText.textContent =
                    "Select a service";


                dropdown.classList.remove(
                    "has-value"
                );

                dropdown.classList.remove(
                    "is-valid"
                );

                dropdown.classList.remove(
                    "is-error"
                );


                if (menu) {

                    const options =
                        menu.querySelectorAll(
                            ".stackly-finance-dropdown-option"
                        );


                    options.forEach(
                        function (option) {

                            option.classList.remove(
                                "selected"
                            );

                            option.setAttribute(
                                "aria-selected",
                                "false"
                            );

                        }
                    );

                }


                dropdown.classList.remove(
                    "open"
                );


                if (trigger) {

                    trigger.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }


            /* =================================================
               CLEAR SERVICE ERROR
            ================================================= */

            if (errorMessage) {

                errorMessage.textContent = "";

            }

        }
    );

});

/* ============================================================
   STACKLY FINANCE
   PREMIUM PAGE LOADER
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loader =
            document.getElementById(
                "stacklyFinancePageLoader"
            );

        const progressBar =
            document.getElementById(
                "stacklyFinanceLoaderProgress"
            );

        const percentage =
            document.getElementById(
                "stacklyFinanceLoaderPercent"
            );

        const statusText =
            document.getElementById(
                "stacklyFinanceLoaderText"
            );


        if (!loader) {
            return;
        }


        /* ====================================================
           PREVENT SCROLL WHILE LOADING
        ==================================================== */

        document.documentElement.classList.add(
            "stackly-finance-loading-active"
        );

        document.body.classList.add(
            "stackly-finance-loading-active"
        );


        /* ====================================================
           LOADING MESSAGES
        ==================================================== */

        const loadingMessages = [

            "Preparing your financial experience",

            "Loading financial solutions",

            "Securing your experience",

            "Preparing smart strategies",

            "Almost ready"

        ];


        let currentProgress = 0;

        let messageIndex = 0;


        /* ====================================================
           PROGRESS ANIMATION
        ==================================================== */

        function updateLoaderProgress(value) {

            const safeValue =
                Math.min(
                    100,
                    Math.max(0, value)
                );


            if (progressBar) {

                progressBar.style.width =
                    safeValue + "%";

            }


            if (percentage) {

                percentage.textContent =
                    Math.round(safeValue) + "%";

            }

        }


        /* ====================================================
           UPDATE STATUS
        ==================================================== */

        function updateLoaderMessage() {

            if (!statusText) {
                return;
            }

            statusText.style.opacity = "0";

            setTimeout(
                function () {

                    statusText.textContent =
                        loadingMessages[
                            messageIndex %
                            loadingMessages.length
                        ];

                    statusText.style.opacity =
                        "1";

                    messageIndex++;

                },
                180
            );

        }


        /* ====================================================
           STATUS TRANSITION
        ==================================================== */

        if (statusText) {

            statusText.style.transition =
                "opacity 0.25s ease";

        }


        /* ====================================================
           SIMULATED LOADING
        ==================================================== */

        const loadingTimer =
            setInterval(
                function () {

                    if (currentProgress < 25) {

                        currentProgress +=
                            Math.random() * 5 + 2;

                    } else if (currentProgress < 55) {

                        currentProgress +=
                            Math.random() * 3 + 1.5;

                    } else if (currentProgress < 80) {

                        currentProgress +=
                            Math.random() * 2.5 + 0.8;

                    } else if (currentProgress < 94) {

                        currentProgress +=
                            Math.random() * 1.4 + 0.4;

                    } else {

                        currentProgress +=
                            Math.random() * 0.5;

                    }


                    if (currentProgress > 96) {

                        currentProgress = 96;

                    }


                    updateLoaderProgress(
                        currentProgress
                    );


                    if (
                        Math.round(currentProgress) === 25 ||
                        Math.round(currentProgress) === 50 ||
                        Math.round(currentProgress) === 70 ||
                        Math.round(currentProgress) === 85
                    ) {

                        updateLoaderMessage();

                    }

                },
                180
            );


        /* ====================================================
           WAIT FOR PAGE LOAD
        ==================================================== */

        function finishLoader() {

            clearInterval(
                loadingTimer
            );


            updateLoaderProgress(100);


            if (statusText) {

                statusText.style.opacity =
                    "0";

                setTimeout(
                    function () {

                        statusText.textContent =
                            "Welcome to Stackly Finance";

                        statusText.style.opacity =
                            "1";

                    },
                    180
                );

            }


            setTimeout(
                function () {

                    loader.classList.add(
                        "stackly-finance-loader-hidden"
                    );


                    document.documentElement.classList.remove(
                        "stackly-finance-loading-active"
                    );

                    document.body.classList.remove(
                        "stackly-finance-loading-active"
                    );


                    setTimeout(
                        function () {

                            loader.remove();

                        },
                        850
                    );

                },
                550
            );

        }


        /* ====================================================
           PAGE LOAD CHECK
        ==================================================== */

        if (
            document.readyState ===
            "complete"
        ) {

            finishLoader();

        } else {

            window.addEventListener(
                "load",
                finishLoader,
                {
                    once: true
                }
            );

        }


        /* ====================================================
           SAFETY FALLBACK
           
           Prevent loader from remaining forever if a video
           or image takes too long.
        ==================================================== */

        setTimeout(
            function () {

                if (
                    !loader.classList.contains(
                        "stackly-finance-loader-hidden"
                    )
                ) {

                    finishLoader();

                }

            },
            2500
        );

    }
);