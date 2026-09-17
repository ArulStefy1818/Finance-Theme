/* ============================================================
   STACKLY FINANCE CLIENT DASHBOARD
   COMPLETE CLIENT JAVASCRIPT
============================================================ */

document.addEventListener("DOMContentLoaded", function () {


    /* ============================================================
       ELEMENT REFERENCES
    ============================================================ */

    const dashboard =
        document.querySelector(
            ".stackly-finance-client-dashboard"
        );

    const sidebar =
        document.getElementById(
            "stacklyFinanceClientSidebar"
        );

    const overlay =
        document.getElementById(
            "stacklyFinanceClientOverlay"
        );

    const menuToggle =
        document.getElementById(
            "stacklyFinanceClientMenuToggle"
        );

    const sidebarClose =
        document.getElementById(
            "stacklyFinanceClientSidebarClose"
        );

    const logoutButton =
        document.getElementById(
            "stacklyFinanceClientLogout"
        );

    const emailElement =
        document.getElementById(
            "stacklyFinanceClientEmail"
        );

    const sidebarName =
        document.getElementById(
            "stacklyFinanceClientSidebarName"
        );

    const welcomeName =
        document.getElementById(
            "stacklyFinanceClientWelcomeName"
        );

    const profileHeroName =
        document.getElementById(
            "stkprofileHeroName"
        );

    const profileFullName =
        document.getElementById(
            "stkprofileFullName"
        );

    const profileEmailAddress =
        document.getElementById(
            "stkprofileEmailAddress"
        );

    /* ------------------------------------------------------------
       PRIMARY EMAIL
    ------------------------------------------------------------ */

    const profilePrimaryEmail =
        document.getElementById(
            "stkprofilePrimaryEmail"
        );

    const notification =
        document.querySelector(
            ".stackly-finance-client-notification"
        );


    /* ============================================================
       AOS INITIALIZATION
    ============================================================ */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 850,

            once: true,

            offset: 70,

            easing: "ease-out-cubic",

            mirror: false,

            disable: function () {

                return window.innerWidth < 480;

            }

        });

    }


    /* ============================================================
       LOGIN DATA FROM LOCAL STORAGE
    ============================================================ */

    let savedEmail =
        localStorage.getItem(
            "loginEmail"
        );

    let savedName =
        localStorage.getItem(
            "loginName"
        );


    /* ============================================================
       FALLBACK STORAGE KEYS
    ============================================================ */

    if (
        !savedEmail ||
        savedEmail.trim() === ""
    ) {

        savedEmail =
            localStorage.getItem(
                "email"
            );

    }


    if (
        !savedName ||
        savedName.trim() === ""
    ) {

        savedName =
            localStorage.getItem(
                "clientName"
            );

    }


    /* ============================================================
       DEFAULT EMAIL
    ============================================================ */

    if (
        !savedEmail ||
        savedEmail.trim() === ""
    ) {

        savedEmail =
            "client@example.com";

    }


    savedEmail =
        savedEmail.trim();


    /* ============================================================
       GET NAME FROM EMAIL
    ============================================================ */

    function getNameFromEmail(email) {

        if (
            !email ||
            !email.includes("@")
        ) {

            return "Client";

        }


        const emailName =
            email
                .split("@")[0]
                .trim();


        if (!emailName) {

            return "Client";

        }


        let firstWord =
            emailName
                .split(/[._-]/)[0]
                .replace(/[0-9]+/g, "")
                .trim();


        if (!firstWord) {

            return "Client";

        }


        return (
            firstWord.charAt(0).toUpperCase() +
            firstWord.slice(1).toLowerCase()
        );

    }


    /* ============================================================
       CHECK OLD / INVALID NAME
    ============================================================ */

    if (
        !savedName ||
        savedName.trim() === "" ||
        savedName === "User" ||
        savedName === "Client User" ||
        savedName === "Client"
    ) {

        savedName =
            getNameFromEmail(
                savedEmail
            );

    }


    savedName =
        savedName.trim();


    /* ============================================================
       SAFETY FALLBACK
    ============================================================ */

    if (!savedName) {

        savedName =
            "Client";

    }


    /* ============================================================
       SAVE LOGIN DATA
    ============================================================ */

    localStorage.setItem(
        "loginEmail",
        savedEmail
    );

    localStorage.setItem(
        "loginName",
        savedName
    );


    /* ============================================================
       UPDATE HEADER EMAIL
    ============================================================ */

    if (emailElement) {

        emailElement.textContent =
            savedEmail;

    }


    /* ============================================================
       UPDATE SIDEBAR NAME
    ============================================================ */

    if (sidebarName) {

        sidebarName.textContent =
            savedName;

    }


    /* ============================================================
       UPDATE WELCOME NAME
    ============================================================ */

    if (welcomeName) {

        welcomeName.textContent =
            savedName;

    }


    /* ============================================================
       UPDATE PROFILE HERO NAME
    ============================================================ */

    if (profileHeroName) {

        profileHeroName.textContent =
            savedName;

    }


    /* ============================================================
       UPDATE PROFILE FULL NAME
    ============================================================ */

    if (profileFullName) {

        profileFullName.textContent =
            savedName;

    }


    /* ============================================================
       UPDATE PROFILE EMAIL
    ============================================================ */

    if (profileEmailAddress) {

        profileEmailAddress.textContent =
            savedEmail;

    }


    /* ============================================================
       UPDATE PRIMARY EMAIL
       
       HTML:
       
       <strong id="stkprofilePrimaryEmail">
           client@example.com
       </strong>
    ============================================================ */

    if (profilePrimaryEmail) {

        profilePrimaryEmail.textContent =
            savedEmail;

    }


    /* ============================================================
       UPDATE ALL DATA-CLIENT-EMAIL ELEMENTS
    ============================================================ */

    const allClientEmails =
        document.querySelectorAll(
            "[data-client-email]"
        );


    allClientEmails.forEach(
        function (element) {

            element.textContent =
                savedEmail;

        }
    );


    /* ============================================================
       UPDATE ELEMENTS USING EMAIL ID
    ============================================================ */

    const emailElements =
        document.querySelectorAll(
            "#stkprofileEmailAddress, " +
            "#stkprofilePrimaryEmail, " +
            "#stacklyFinanceClientEmail"
        );


    emailElements.forEach(
        function (element) {

            element.textContent =
                savedEmail;

        }
    );


    /* ============================================================
       MOBILE SIDEBAR
    ============================================================ */

    function openSidebar() {

        if (!sidebar) return;


        sidebar.classList.add(
            "active"
        );


        if (overlay) {

            overlay.classList.add(
                "active"
            );

        }


        document.body.classList.add(
            "stackly-client-menu-open"
        );


        if (menuToggle) {

            menuToggle.classList.add(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    }


    function closeSidebar() {

        if (!sidebar) return;


        sidebar.classList.remove(
            "active"
        );


        if (overlay) {

            overlay.classList.remove(
                "active"
            );

        }


        document.body.classList.remove(
            "stackly-client-menu-open"
        );


        if (menuToggle) {

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    /* ============================================================
       MOBILE MENU TOGGLE
    ============================================================ */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            function () {

                if (
                    sidebar &&
                    sidebar.classList.contains(
                        "active"
                    )
                ) {

                    closeSidebar();

                } else {

                    openSidebar();

                }

            }
        );

    }


    /* ============================================================
       SIDEBAR CLOSE BUTTON
    ============================================================ */

    if (sidebarClose) {

        sidebarClose.addEventListener(
            "click",
            function () {

                closeSidebar();

            }
        );

    }


    /* ============================================================
       SIDEBAR OVERLAY
    ============================================================ */

    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeSidebar();

            }
        );

    }


    /* ============================================================
       ESCAPE KEY
    ============================================================ */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeSidebar();

            }

        }
    );


    /* ============================================================
       NAVIGATION LINKS
    ============================================================ */

    const navLinks =
        document.querySelectorAll(
            ".stackly-finance-client-nav-link"
        );


    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (
                        window.innerWidth <= 991
                    ) {

                        closeSidebar();

                    }

                }
            );

        }
    );


    /* ============================================================
       RESPONSIVE SIDEBAR RESET
    ============================================================ */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 991
            ) {

                closeSidebar();

            }


            if (
                typeof AOS !== "undefined"
            ) {

                AOS.refresh();

            }

        }
    );


    /* ============================================================
       ACTIVE NAVIGATION
    ============================================================ */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    navLinks.forEach(
        function (link) {

            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) return;


            const linkPage =
                href
                    .split("/")
                    .pop()
                    .split("?")[0]
                    .split("#")[0]
                    .toLowerCase();


            if (
                linkPage &&
                currentPage &&
                linkPage === currentPage
            ) {

                navLinks.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );

            }

        }
    );


    /* ============================================================
       EMAIL BOX HOVER
    ============================================================ */

    const emailBox =
        document.querySelector(
            ".stackly-finance-client-email-box"
        );


    if (emailBox) {

        emailBox.addEventListener(
            "mouseenter",
            function () {

                emailBox.classList.add(
                    "email-hover"
                );

            }
        );


        emailBox.addEventListener(
            "mouseleave",
            function () {

                emailBox.classList.remove(
                    "email-hover"
                );

            }
        );

    }


    /* ============================================================
       NOTIFICATION BUTTON
    ============================================================ */

    if (notification) {

        notification.addEventListener(
            "click",
            function () {

                notification.classList.add(
                    "notification-clicked"
                );


                setTimeout(
                    function () {

                        notification.classList.remove(
                            "notification-clicked"
                        );

                    },
                    500
                );

            }
        );

    }


    /* ============================================================
       STAT CARD HOVER
    ============================================================ */

    const statCards =
        document.querySelectorAll(
            ".stackly-finance-client-stat-card"
        );


    statCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "stat-hover"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "stat-hover"
                    );

                }
            );

        }
    );


    /* ============================================================
       QUICK ACTION HOVER
    ============================================================ */

    const actionCards =
        document.querySelectorAll(
            ".stackly-finance-client-action-card"
        );


    actionCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    const icon =
                        card.querySelector(
                            "span"
                        );


                    if (icon) {

                        icon.classList.add(
                            "action-icon-hover"
                        );

                    }

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    const icon =
                        card.querySelector(
                            "span"
                        );


                    if (icon) {

                        icon.classList.remove(
                            "action-icon-hover"
                        );

                    }

                }
            );

        }
    );


    /* ============================================================
       CHART BAR INITIAL ANIMATION
    ============================================================ */

    const chartBars =
        document.querySelectorAll(
            ".stackly-finance-client-bar"
        );


    chartBars.forEach(
        function (bar) {

            bar.style.transformOrigin =
                "bottom";

            bar.style.transform =
                "scaleY(0)";

            bar.style.transition =
                "transform 1s cubic-bezier(.22,1,.36,1)";

        }
    );


    function animateChart() {

        chartBars.forEach(
            function (bar, index) {

                setTimeout(
                    function () {

                        bar.style.transform =
                            "scaleY(1)";

                    },
                    150 + (index * 80)
                );

            }
        );

    }


    if (chartBars.length > 0) {

        setTimeout(
            function () {

                animateChart();

            },
            500
        );

    }


    /* ============================================================
       GOAL PROGRESS ANIMATION
    ============================================================ */

    const progressBars =
        document.querySelectorAll(
            ".stackly-finance-client-progress span"
        );


    progressBars.forEach(
        function (bar) {

            const finalWidth =
                bar.style.width;


            if (!finalWidth) return;


            bar.style.width =
                "0";


            bar.style.transition =
                "width 1.4s cubic-bezier(.22,1,.36,1)";


            setTimeout(
                function () {

                    bar.style.width =
                        finalWidth;

                },
                700
            );

        }
    );


    /* ============================================================
       GOAL CARD HOVER
    ============================================================ */

    const goalCards =
        document.querySelectorAll(
            ".stackly-finance-client-goal-card"
        );


    goalCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "goal-hover"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "goal-hover"
                    );

                }
            );

        }
    );


    /* ============================================================
       ACCOUNT ITEM HOVER
    ============================================================ */

    const accountItems =
        document.querySelectorAll(
            ".stackly-finance-client-account-item"
        );


    accountItems.forEach(
        function (item) {

            item.addEventListener(
                "mouseenter",
                function () {

                    item.classList.add(
                        "account-hover"
                    );

                }
            );


            item.addEventListener(
                "mouseleave",
                function () {

                    item.classList.remove(
                        "account-hover"
                    );

                }
            );

        }
    );


    /* ============================================================
       TRANSACTION ROW HOVER
    ============================================================ */

    const transactionRows =
        document.querySelectorAll(
            ".stackly-finance-client-transactions-table tbody tr"
        );


    transactionRows.forEach(
        function (row) {

            row.addEventListener(
                "mouseenter",
                function () {

                    row.classList.add(
                        "transaction-hover"
                    );

                }
            );


            row.addEventListener(
                "mouseleave",
                function () {

                    row.classList.remove(
                        "transaction-hover"
                    );

                }
            );

        }
    );


    /* ============================================================
       NORMAL PERIOD SELECT
    ============================================================ */

    const periodSelect =
        document.querySelector(
            ".stackly-finance-client-period-select"
        );


    if (periodSelect) {

        periodSelect.addEventListener(
            "change",
            function () {

                console.log(
                    "Financial period selected:",
                    this.value
                );


                if (
                    typeof AOS !== "undefined"
                ) {

                    AOS.refresh();

                }

            }
        );

    }


    /* ============================================================
       SIDEBAR PROFILE CLICK
    ============================================================ */

    const sidebarProfile =
        document.querySelector(
            ".stackly-finance-client-sidebar-profile"
        );


    if (sidebarProfile) {

        sidebarProfile.style.cursor =
            "pointer";


        sidebarProfile.setAttribute(
            "role",
            "link"
        );


        sidebarProfile.setAttribute(
            "tabindex",
            "0"
        );


        function openClientProfile() {

            window.location.href =
                "client-profile.html";

        }


        sidebarProfile.addEventListener(
            "click",
            function () {

                openClientProfile();

            }
        );


        sidebarProfile.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openClientProfile();

                }

            }
        );

    }


    /* ============================================================
       NAVIGATION CLICK ANIMATION
    ============================================================ */

    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    link.classList.add(
                        "nav-clicked"
                    );


                    setTimeout(
                        function () {

                            link.classList.remove(
                                "nav-clicked"
                            );

                        },
                        300
                    );

                }
            );

        }
    );


    /* ============================================================
       GENERAL LINK EFFECT
    ============================================================ */

    const generalLinks =
        document.querySelectorAll(
            ".stackly-finance-client-footer a, " +
            ".stackly-finance-client-view-all, " +
            ".stackly-finance-client-small-link, " +
            ".stackly-finance-client-manage-account"
        );


    generalLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    link.classList.add(
                        "link-clicked"
                    );


                    setTimeout(
                        function () {

                            link.classList.remove(
                                "link-clicked"
                            );

                        },
                        350
                    );

                }
            );

        }
    );


    /* ============================================================
       LOGOUT
    ============================================================ */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                logoutButton.classList.add(
                    "logout-processing"
                );


                /* --------------------------------------------
                   REMOVE LOGIN INFORMATION
                -------------------------------------------- */

                localStorage.removeItem(
                    "loginEmail"
                );

                localStorage.removeItem(
                    "loginName"
                );

                localStorage.removeItem(
                    "loginRole"
                );

                localStorage.removeItem(
                    "email"
                );

                localStorage.removeItem(
                    "clientName"
                );


                /* --------------------------------------------
                   REDIRECT
                -------------------------------------------- */

                setTimeout(
                    function () {

                        window.location.href =
                            "index.html";

                    },
                    350
                );

            }
        );

    }


    /* ============================================================
       PREVENT DOUBLE CLICK
    ============================================================ */

    let navigationLocked =
        false;


    document
        .querySelectorAll(
            ".stackly-finance-client-nav-link"
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        if (
                            navigationLocked
                        ) {

                            event.preventDefault();

                            return;

                        }


                        navigationLocked =
                            true;


                        setTimeout(
                            function () {

                                navigationLocked =
                                    false;

                            },
                            1200
                        );

                    }
                );

            }
        );


    /* ============================================================
       DASHBOARD LOADED ANIMATION
    ============================================================ */

    if (dashboard) {

        setTimeout(
            function () {

                dashboard.classList.add(
                    "stackly-client-loaded"
                );

            },
            100
        );

    }


    /* ============================================================
       SMOOTH HASH SCROLL
    ============================================================ */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            this.getAttribute(
                                "href"
                            );


                        if (
                            targetId &&
                            targetId !== "#"
                        ) {

                            const target =
                                document.querySelector(
                                    targetId
                                );


                            if (target) {

                                event.preventDefault();


                                target.scrollIntoView({

                                    behavior:
                                        "smooth",

                                    block:
                                        "start"

                                });

                            }

                        }

                    }
                );

            }
        );


    /* ============================================================
       ACCESSIBILITY
    ============================================================ */

    document
        .querySelectorAll(
            ".stackly-finance-client-stat-card, " +
            ".stackly-finance-client-goal-card"
        )
        .forEach(
            function (card) {

                card.setAttribute(
                    "tabindex",
                    "0"
                );

            }
        );


    /* ============================================================
       AOS REFRESH
    ============================================================ */

    window.addEventListener(
        "load",
        function () {

            if (
                typeof AOS !== "undefined"
            ) {

                setTimeout(
                    function () {

                        AOS.refreshHard();

                    },
                    300
                );

            }

        }
    );


    /* ============================================================
       INITIAL CONSOLE MESSAGE
    ============================================================ */

    console.log(
        "Stackly Finance Client Dashboard initialized successfully."
    );


});



/* ================================================================
   STACKLY FINANCE CLIENT
   CASH FLOW CHART + CUSTOM PERIOD DROPDOWN
================================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ========================================================
           ELEMENTS
        ======================================================== */

        const dropdown =
            document.querySelector(
                ".stackly-finance-client-period-dropdown"
            );


        const trigger =
            document.getElementById(
                "stacklyFinanceClientPeriodTrigger"
            );


        const valueDisplay =
            document.getElementById(
                "stacklyFinanceClientPeriodValue"
            );


        const menu =
            document.getElementById(
                "stacklyFinanceClientPeriodMenu"
            );


        const options =
            document.querySelectorAll(
                ".stackly-finance-client-period-option"
            );


        const barGroups =
            document.querySelectorAll(
                ".stackly-finance-client-bar-group"
            );


        const monthContainer =
            document.querySelector(
                ".stackly-finance-client-chart-months"
            );


        const chart =
            document.querySelector(
                ".stackly-finance-client-chart"
            );


        /* ========================================================
           CHECK REQUIRED ELEMENTS
        ======================================================== */

        if (
            !dropdown ||
            !trigger ||
            !valueDisplay ||
            !menu
        ) {

            return;

        }


        /* ========================================================
           FINANCIAL DATA
        ======================================================== */

        const financialData = {

            "this-month": {

                labels: [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN"
                ],

                income: [
                    72,
                    82,
                    64,
                    91,
                    76,
                    86
                ],

                expense: [
                    42,
                    48,
                    37,
                    54,
                    44,
                    51
                ]

            },


            "last-month": {

                labels: [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN"
                ],

                income: [
                    58,
                    69,
                    74,
                    63,
                    81,
                    73
                ],

                expense: [
                    35,
                    41,
                    45,
                    39,
                    47,
                    43
                ]

            },


            "six-months": {

                labels: [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN"
                ],

                income: [
                    61,
                    74,
                    68,
                    87,
                    79,
                    94
                ],

                expense: [
                    39,
                    45,
                    41,
                    52,
                    48,
                    56
                ]

            },


            "this-year": {

                labels: [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN"
                ],

                income: [
                    66,
                    78,
                    71,
                    89,
                    83,
                    96
                ],

                expense: [
                    38,
                    46,
                    43,
                    51,
                    49,
                    58
                ]

            }

        };


        /* ========================================================
           OPEN DROPDOWN
        ======================================================== */

        function openDropdown() {

            dropdown.classList.add(
                "is-open"
            );


            trigger.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        /* ========================================================
           CLOSE DROPDOWN
        ======================================================== */

        function closeDropdown() {

            dropdown.classList.remove(
                "is-open"
            );


            trigger.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* ========================================================
           TRIGGER CLICK
        ======================================================== */

        trigger.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const isOpen =
                    dropdown.classList.contains(
                        "is-open"
                    );


                if (isOpen) {

                    closeDropdown();

                } else {

                    openDropdown();

                }

            }
        );


        /* ========================================================
           OPTION CLICK
        ======================================================== */

        options.forEach(
            function (option) {

                option.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        const selectedValue =
                            option.getAttribute(
                                "data-value"
                            );


                        const selectedLabel =
                            option.textContent.trim();


                        valueDisplay.textContent =
                            selectedLabel;


                        options.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );


                                item.setAttribute(
                                    "aria-selected",
                                    "false"
                                );

                            }
                        );


                        option.classList.add(
                            "active"
                        );


                        option.setAttribute(
                            "aria-selected",
                            "true"
                        );


                        updateCashFlowChart(
                            selectedValue
                        );


                        closeDropdown();

                    }
                );

            }
        );


        /* ========================================================
           UPDATE CASH FLOW CHART
        ======================================================== */

        function updateCashFlowChart(period) {

            const data =
                financialData[
                    period
                ];


            if (!data) {

                return;

            }


            /* ====================================================
               UPDATE MONTH LABELS
            ==================================================== */

            if (monthContainer) {

                const monthLabels =
                    monthContainer.querySelectorAll(
                        "span"
                    );


                monthLabels.forEach(
                    function (month, index) {

                        if (
                            data.labels[index]
                        ) {

                            month.textContent =
                                data.labels[index];


                            month.style.display =
                                "flex";

                        } else {

                            month.style.display =
                                "none";

                        }

                    }
                );

            }


            /* ====================================================
               UPDATE BAR GROUPS
            ==================================================== */

            barGroups.forEach(
                function (group, index) {

                    const incomeBar =
                        group.querySelector(
                            ".stackly-finance-client-bar.income"
                        );


                    const expenseBar =
                        group.querySelector(
                            ".stackly-finance-client-bar.expense"
                        );


                    if (
                        !incomeBar ||
                        !expenseBar
                    ) {

                        return;

                    }


                    const incomeHeight =
                        data.income[index] || 0;


                    const expenseHeight =
                        data.expense[index] || 0;


                    incomeBar.style.animation =
                        "none";


                    expenseBar.style.animation =
                        "none";


                    void incomeBar.offsetWidth;

                    void expenseBar.offsetWidth;


                    group.style.setProperty(
                        "--bar-income",
                        incomeHeight + "%"
                    );


                    group.style.setProperty(
                        "--bar-expense",
                        expenseHeight + "%"
                    );


                    incomeBar.style.animation =
                        "stacklyClientBarGrow .8s ease both";


                    expenseBar.style.animation =
                        "stacklyClientBarGrow .8s ease both";


                    incomeBar.setAttribute(
                        "title",
                        data.labels[index] +
                        " Income"
                    );


                    expenseBar.setAttribute(
                        "title",
                        data.labels[index] +
                        " Expenses"
                    );

                }
            );


            /* ====================================================
               CHART REFRESH
            ==================================================== */

            if (chart) {

                chart.classList.remove(
                    "stackly-finance-client-chart-refresh"
                );


                void chart.offsetWidth;


                chart.classList.add(
                    "stackly-finance-client-chart-refresh"
                );

            }

        }


        /* ========================================================
           CLOSE OUTSIDE CLICK
        ======================================================== */

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


        /* ========================================================
           ESCAPE KEY
        ======================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeDropdown();

                    trigger.focus();

                }

            }
        );


        /* ========================================================
           TRIGGER KEYBOARD NAVIGATION
        ======================================================== */

        trigger.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "ArrowDown" ||
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();


                    openDropdown();


                    if (
                        options.length > 0
                    ) {

                        options[0].focus();

                    }

                }

            }
        );


        /* ========================================================
           OPTION KEYBOARD NAVIGATION
        ======================================================== */

        options.forEach(
            function (option, index) {

                option.addEventListener(
                    "keydown",
                    function (event) {


                        if (
                            event.key === "ArrowDown"
                        ) {

                            event.preventDefault();


                            const nextIndex =
                                (
                                    index + 1
                                ) %
                                options.length;


                            options[
                                nextIndex
                            ].focus();

                        }


                        if (
                            event.key === "ArrowUp"
                        ) {

                            event.preventDefault();


                            const previousIndex =
                                (
                                    index -
                                    1 +
                                    options.length
                                ) %
                                options.length;


                            options[
                                previousIndex
                            ].focus();

                        }


                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            option.click();

                        }


                        if (
                            event.key === "Escape"
                        ) {

                            event.preventDefault();


                            closeDropdown();


                            trigger.focus();

                        }

                    }
                );

            }
        );


        /* ========================================================
           INITIAL CHART
        ======================================================== */

        updateCashFlowChart(
            "this-month"
        );


    }
);

 /* ============================================================
    STACKLY FINANCE
    INVESTMENT ANALYSIS SECTION JAVASCRIPT
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       ELEMENTS
    ========================================================= */

    const analysisSection =
        document.querySelector(
            ".stkinv-analysis-section"
        );

    if (!analysisSection) {
        return;
    }


    const performancePanel =
        analysisSection.querySelector(
            ".stkinv-performance-panel"
        );

    const dropdown =
        analysisSection.querySelector(
            ".stkinv-custom-dropdown"
        );

    const dropdownTrigger =
        analysisSection.querySelector(
            ".stkinv-dropdown-trigger"
        );

    const dropdownSelected =
        analysisSection.querySelector(
            ".stkinv-dropdown-selected"
        );

    const dropdownMenu =
        analysisSection.querySelector(
            ".stkinv-dropdown-menu"
        );

    const dropdownOptions =
        analysisSection.querySelectorAll(
            ".stkinv-dropdown-option"
        );

    const chartBars =
        analysisSection.querySelectorAll(
            ".stkinv-chart-bars > div"
        );

    const chartMonths =
        analysisSection.querySelectorAll(
            ".stkinv-chart-months span"
        );

    const performanceValue =
        analysisSection.querySelector(
            ".stkinv-performance-value strong"
        );

    const performanceChange =
        analysisSection.querySelector(
            ".stkinv-performance-value span"
        );

    const allocationItems =
        analysisSection.querySelectorAll(
            ".stkinv-allocation-item"
        );

    const donut =
        analysisSection.querySelector(
            ".stkinv-donut"
        );


    /* =========================================================
       INVESTMENT DATA
    ========================================================= */

    const investmentData = {

        "1 Month": {

            value: "₹6,98,450",

            change: "4.32%",

            heights: [
                42,
                48,
                45,
                53,
                58,
                64,
                61,
                69,
                74
            ],

            months: [
                "JAN",
                "FEB",
                "MAR",
                "APR",
                "MAY",
                "JUN",
                "JUL",
                "AUG",
                "SEP"
            ]

        },


        "6 Months": {

            value: "₹7,18,900",

            change: "8.46%",

            heights: [
                38,
                45,
                51,
                56,
                61,
                66,
                70,
                76,
                82
            ],

            months: [
                "JAN",
                "FEB",
                "MAR",
                "APR",
                "MAY",
                "JUN",
                "JUL",
                "AUG",
                "SEP"
            ]

        },


        "1 Year": {

            value: "₹7,42,300",

            change: "12.72%",

            heights: [
                42,
                51,
                47,
                63,
                59,
                72,
                68,
                79,
                88
            ],

            months: [
                "JAN",
                "FEB",
                "MAR",
                "APR",
                "MAY",
                "JUN",
                "JUL",
                "AUG",
                "SEP"
            ]

        },


        "3 Years": {

            value: "₹8,64,750",

            change: "24.85%",

            heights: [
                35,
                43,
                48,
                55,
                62,
                69,
                73,
                81,
                94
            ],

            months: [
                "2022",
                "Q2",
                "Q3",
                "Q4",
                "2023",
                "Q2",
                "Q3",
                "Q4",
                "2024"
            ]

        },


        "5 Years": {

            value: "₹10,28,600",

            change: "38.64%",

            heights: [
                28,
                39,
                45,
                52,
                61,
                68,
                76,
                87,
                97
            ],

            months: [
                "2020",
                "2021",
                "2022",
                "2023",
                "2024",
                "Q2",
                "Q3",
                "Q4",
                "2025"
            ]

        }

    };


    /* =========================================================
       OPEN DROPDOWN
    ========================================================= */

    function openDropdown() {

        if (!dropdown || !dropdownTrigger) {
            return;
        }

        dropdown.classList.add(
            "stkinv-dropdown-open"
        );

        dropdownTrigger.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    /* =========================================================
       CLOSE DROPDOWN
    ========================================================= */

    function closeDropdown() {

        if (!dropdown || !dropdownTrigger) {
            return;
        }

        dropdown.classList.remove(
            "stkinv-dropdown-open"
        );

        dropdownTrigger.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* =========================================================
       DROPDOWN TOGGLE
    ========================================================= */

    if (dropdownTrigger) {

        dropdownTrigger.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    dropdown.classList.contains(
                        "stkinv-dropdown-open"
                    );

                if (isOpen) {

                    closeDropdown();

                } else {

                    openDropdown();

                }

            }
        );

    }


    /* =========================================================
       UPDATE CHART
    ========================================================= */

    function updateInvestmentChart(period) {

        const data =
            investmentData[period];

        if (!data) {
            return;
        }


        /* =====================================================
           UPDATE VALUE
        ===================================================== */

        if (performanceValue) {

            performanceValue.style.opacity = "0";

            performanceValue.style.transform =
                "translateY(8px)";

            setTimeout(
                function () {

                    performanceValue.textContent =
                        data.value;

                    performanceValue.style.opacity =
                        "1";

                    performanceValue.style.transform =
                        "translateY(0)";

                },
                180
            );

        }


        /* =====================================================
           UPDATE PERCENTAGE
        ===================================================== */

        if (performanceChange) {

            performanceChange.style.opacity = "0";

            setTimeout(
                function () {

                    performanceChange.innerHTML =
                        '<i class="fa-solid fa-arrow-up"></i> ' +
                        data.change;

                    performanceChange.style.opacity =
                        "1";

                },
                180
            );

        }


        /* =====================================================
           UPDATE BARS
        ===================================================== */

        chartBars.forEach(
            function (bar, index) {

                const newHeight =
                    data.heights[index] || 0;

                bar.style.height = "0%";

                bar.style.opacity = "0.45";

                setTimeout(
                    function () {

                        bar.style.height =
                            newHeight + "%";

                        bar.style.opacity =
                            "1";

                    },
                    100 + (index * 70)
                );

            }
        );


        /* =====================================================
           UPDATE MONTH LABELS
        ===================================================== */

        chartMonths.forEach(
            function (month, index) {

                if (data.months[index]) {

                    month.textContent =
                        data.months[index];

                }

            }
        );


        /* =====================================================
           CHART ANIMATION CLASS
        ===================================================== */

        const chartArea =
            analysisSection.querySelector(
                ".stkinv-chart-area"
            );

        if (chartArea) {

            chartArea.classList.remove(
                "stkinv-chart-refresh"
            );

            void chartArea.offsetWidth;

            chartArea.classList.add(
                "stkinv-chart-refresh"
            );

        }

    }


    /* =========================================================
       DROPDOWN OPTIONS
    ========================================================= */

    dropdownOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    const selectedPeriod =
                        option.textContent.trim();


                    /* =========================================
                       UPDATE SELECTED TEXT
                    ========================================= */

                    if (dropdownSelected) {

                        dropdownSelected.textContent =
                            selectedPeriod;

                    }


                    /* =========================================
                       ACTIVE OPTION
                    ========================================= */

                    dropdownOptions.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    option.classList.add(
                        "active"
                    );


                    /* =========================================
                       UPDATE CHART
                    ========================================= */

                    updateInvestmentChart(
                        selectedPeriod
                    );


                    /* =========================================
                       CLOSE DROPDOWN
                    ========================================= */

                    closeDropdown();

                }
            );

        }
    );


    /* =========================================================
       CLOSE WHEN CLICKING OUTSIDE
    ========================================================= */

    document.addEventListener(
        "click",
        function (event) {

            if (
                dropdown &&
                !dropdown.contains(event.target)
            ) {

                closeDropdown();

            }

        }
    );


    /* =========================================================
       ESC KEY
    ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeDropdown();

            }

        }
    );


    /* =========================================================
       KEYBOARD ACCESSIBILITY
    ========================================================= */

    if (dropdownTrigger) {

        dropdownTrigger.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    dropdownTrigger.click();

                }

            }
        );

    }


    /* =========================================================
       ALLOCATION ITEM HOVER
    ========================================================= */

    allocationItems.forEach(
        function (item) {

            item.addEventListener(
                "mouseenter",
                function () {

                    allocationItems.forEach(
                        function (otherItem) {

                            if (otherItem !== item) {

                                otherItem.style.opacity =
                                    "0.55";

                            }

                        }
                    );


                    item.style.transform =
                        "translateX(6px)";

                }
            );


            item.addEventListener(
                "mouseleave",
                function () {

                    allocationItems.forEach(
                        function (otherItem) {

                            otherItem.style.opacity =
                                "1";

                        }
                    );


                    item.style.transform =
                        "translateX(0)";

                }
            );

        }
    );


    /* =========================================================
       DONUT HOVER
    ========================================================= */

    if (donut) {

        donut.addEventListener(
            "mouseenter",
            function () {

                donut.classList.add(
                    "stkinv-donut-hover"
                );

            }
        );


        donut.addEventListener(
            "mouseleave",
            function () {

                donut.classList.remove(
                    "stkinv-donut-hover"
                );

            }
        );

    }


    /* =========================================================
       PERFORMANCE PANEL HOVER
    ========================================================= */

    if (performancePanel) {

        performancePanel.addEventListener(
            "mouseenter",
            function () {

                performancePanel.classList.add(
                    "stkinv-performance-active"
                );

            }
        );


        performancePanel.addEventListener(
            "mouseleave",
            function () {

                performancePanel.classList.remove(
                    "stkinv-performance-active"
                );

            }
        );

    }


    /* =========================================================
       INITIAL CHART
    ========================================================= */

    updateInvestmentChart(
        "1 Year"
    );


    /* =========================================================
       ANIMATE ALLOCATION ITEMS
    ========================================================= */

    allocationItems.forEach(
        function (item, index) {

            item.style.opacity = "0";

            item.style.transform =
                "translateY(12px)";

            setTimeout(
                function () {

                    item.style.transition =
                        "opacity 0.55s ease, transform 0.55s ease";

                    item.style.opacity = "1";

                    item.style.transform =
                        "translateY(0)";

                },
                250 + (index * 120)
            );

        }
    );


    /* =========================================================
       AOS REFRESH
    ========================================================= */

    if (typeof AOS !== "undefined") {

        setTimeout(
            function () {

                AOS.refresh();

            },
            300
        );

    }

});