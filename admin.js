
        document.addEventListener("DOMContentLoaded", function () {


            /* =====================================================
               AOS
            ====================================================== */

            if (typeof AOS !== "undefined") {

                AOS.init({
                    duration: 850,
                    once: true,
                    offset: 80,
                    easing: "ease-out-cubic"
                });

            }


            /* =====================================================
               ELEMENTS
            ====================================================== */

            const menuButton =
                document.getElementById(
                    "stacklyFinanceAdminMenu"
                );

            const closeButton =
                document.getElementById(
                    "stacklyFinanceAdminClose"
                );

            const sidebar =
                document.getElementById(
                    "stacklyFinanceAdminSidebar"
                );

            const overlay =
                document.getElementById(
                    "stacklyFinanceAdminOverlay"
                );

            const emailElement =
                document.getElementById(
                    "stacklyFinanceAdminEmail"
                );

            const dateElement =
                document.getElementById(
                    "stacklyFinanceAdminDate"
                );


            /* =====================================================
               MOBILE SIDEBAR OPEN
            ====================================================== */

            function openSidebar() {

                if (sidebar) {

                    sidebar.classList.add(
                        "open"
                    );

                }

                if (overlay) {

                    overlay.classList.add(
                        "active"
                    );

                }

                if (menuButton) {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

                document.body.classList.add(
                    "stackly-finance-admin-menu-open"
                );

            }


            /* =====================================================
               MOBILE SIDEBAR CLOSE
            ====================================================== */

            function closeSidebar() {

                if (sidebar) {

                    sidebar.classList.remove(
                        "open"
                    );

                }

                if (overlay) {

                    overlay.classList.remove(
                        "active"
                    );

                }

                if (menuButton) {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

                document.body.classList.remove(
                    "stackly-finance-admin-menu-open"
                );

            }


            /* =====================================================
               HAMBURGER
            ====================================================== */

            if (menuButton) {

                menuButton.addEventListener(
                    "click",
                    openSidebar
                );

            }


            /* =====================================================
               EXIT / X BUTTON
            ====================================================== */

            if (closeButton) {

                closeButton.addEventListener(
                    "click",
                    closeSidebar
                );

            }


            /* =====================================================
               OVERLAY
            ====================================================== */

            if (overlay) {

                overlay.addEventListener(
                    "click",
                    closeSidebar
                );

            }


            /* =====================================================
               ESC KEY
            ====================================================== */

            document.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key ===
                        "Escape"
                    ) {

                        closeSidebar();

                    }

                }
            );


            /* =====================================================
               CLOSE MOBILE SIDEBAR AFTER NAVIGATION
            ====================================================== */

            const navigationLinks =
                document.querySelectorAll(
                    ".stackly-finance-admin-nav-link"
                );

            navigationLinks.forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            if (
                                window.innerWidth <=
                                991
                            ) {

                                closeSidebar();

                            }

                        }
                    );

                }
            );


            /* =====================================================
               DISPLAY LOGIN EMAIL
               
               Your login JS already stores:
               
               localStorage:
               loginEmail
            ====================================================== */

            const storedEmail =
                localStorage.getItem(
                    "loginEmail"
                );


            if (
                storedEmail &&
                emailElement
            ) {

                emailElement.textContent =
                    storedEmail;

            } else if (emailElement) {

                emailElement.textContent =
                    "admin@stackly.com";

            }


            /* =====================================================
               DISPLAY CURRENT DATE
            ====================================================== */

            if (dateElement) {

                const today =
                    new Date();

                const options = {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                };

                dateElement.textContent =
                    today.toLocaleDateString(
                        "en-IN",
                        options
                    );

            }


            /* =====================================================
               LOGOUT
            ====================================================== */

            const logout =
                document.getElementById(
                    "stacklyFinanceAdminLogout"
                );


            if (logout) {

                logout.addEventListener(
                    "click",
                    function () {

                        localStorage.removeItem(
                            "loginEmail"
                        );

                        localStorage.removeItem(
                            "loginRole"
                        );

                        localStorage.removeItem(
                            "loginName"
                        );

                    }
                );

            }


            /* =====================================================
               PREVENT SIDEBAR FROM REMAINING OPEN ON DESKTOP
            ====================================================== */

            window.addEventListener(
                "resize",
                function () {

                    if (
                        window.innerWidth >
                        991
                    ) {

                        closeSidebar();

                    }

                }
            );

        });


        /* ============================================================
   STACKLY FINANCE ADMIN
   FINANCIAL SUMMARY + CUSTOM PERIOD DROPDOWN
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    /* ========================================================
       ELEMENTS
    ======================================================== */

    const dropdown =
        document.querySelector(
            ".stackly-finance-admin-period-dropdown"
        );

    const trigger =
        document.getElementById(
            "stacklyFinancePeriodTrigger"
        );

    const value =
        document.getElementById(
            "stacklyFinancePeriodValue"
        );

    const menu =
        document.getElementById(
            "stacklyFinancePeriodMenu"
        );

    const options =
        document.querySelectorAll(
            ".stackly-finance-admin-period-option"
        );

    const summaryPanel =
        document.querySelector(
            ".summary-panel"
        );

    const portfolioValue =
        summaryPanel?.querySelector(
            ".stackly-finance-admin-summary-value strong"
        );

    const portfolioChange =
        summaryPanel?.querySelector(
            ".stackly-finance-admin-summary-value small"
        );

    const chartBars =
        summaryPanel?.querySelectorAll(
            ".stackly-finance-admin-chart-line span"
        );


    /* ========================================================
       SAFETY CHECK
    ======================================================== */

    if (
        !dropdown ||
        !trigger ||
        !value ||
        !menu
    ) {
        return;
    }


    /* ========================================================
       FINANCIAL DATA
    ======================================================== */

    const financeData = {

        "This Year": {

            value: "₹18.42 Cr",

            change: "18.2% from last year",

            direction: "up",

            chart: [
                35,
                48,
                42,
                62,
                55,
                72,
                68,
                84,
                76,
                91,
                86,
                96
            ]

        },


        "This Month": {

            value: "₹2.84 Cr",

            change: "8.6% from last month",

            direction: "up",

            chart: [
                38,
                46,
                42,
                55,
                51,
                64,
                60,
                72,
                68,
                79,
                74,
                88
            ]

        },


        "Last Month": {

            value: "₹2.61 Cr",

            change: "5.4% from previous month",

            direction: "up",

            chart: [
                30,
                42,
                38,
                50,
                46,
                58,
                55,
                67,
                62,
                73,
                69,
                81
            ]

        }

    };


    /* ========================================================
       OPEN / CLOSE DROPDOWN
    ======================================================== */

    function openDropdown() {

        dropdown.classList.add("open");

        trigger.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeDropdown() {

        dropdown.classList.remove("open");

        trigger.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    function toggleDropdown() {

        const isOpen =
            dropdown.classList.contains("open");

        if (isOpen) {

            closeDropdown();

        } else {

            openDropdown();

        }

    }


    /* ========================================================
       TRIGGER CLICK
    ======================================================== */

    trigger.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            toggleDropdown();

        }
    );


    /* ========================================================
       UPDATE CHART
    ======================================================== */

    function updateChart(chartData) {

        if (!chartBars || !chartBars.length) {
            return;
        }


        chartBars.forEach(
            function (bar, index) {

                if (
                    chartData[index] !== undefined
                ) {

                    bar.style.height =
                        chartData[index] + "%";

                }

            }
        );

    }


    /* ========================================================
       UPDATE SUMMARY
    ======================================================== */

    function updateSummary(period) {

        const data =
            financeData[period];

        if (!data) {
            return;
        }


        /* Portfolio */

        if (portfolioValue) {

            portfolioValue.textContent =
                data.value;

        }


        /* Percentage */

        if (portfolioChange) {

            portfolioChange.innerHTML = `
                <i class="fa-solid fa-arrow-up"></i>
                ${data.change}
            `;

        }


        /* Chart */

        updateChart(data.chart);


        /* Custom event */

        document.dispatchEvent(
            new CustomEvent(
                "financePeriodChanged",
                {
                    detail: {
                        period: period,
                        portfolio: data.value,
                        change: data.change,
                        chart: data.chart
                    }
                }
            )
        );

    }


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


                    if (!selectedValue) {
                        return;
                    }


                    /* Update button text */

                    value.textContent =
                        selectedValue;


                    /* Remove active state */

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


                    /* Activate selected option */

                    option.classList.add(
                        "active"
                    );

                    option.setAttribute(
                        "aria-selected",
                        "true"
                    );


                    /* Update financial data */

                    updateSummary(
                        selectedValue
                    );


                    /* Close dropdown */

                    closeDropdown();

                }
            );

        }
    );


    /* ========================================================
       CLICK OUTSIDE
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
       ESC KEY
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
       KEYBOARD SUPPORT
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

            }

        }
    );


    /* ========================================================
       INITIAL DATA
    ======================================================== */

    updateSummary(
        "This Year"
    );

});

/* ============================================================
   STACKLY FINANCE
   TRANSACTION ACTIVITY CHART
   30D / 90D / 1Y INTERACTION
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    const flowPanel = document.querySelector(
        ".stackly-finance-transactions-flow-panel"
    );

    if (!flowPanel) return;


    /* ========================================================
       ELEMENTS
    ======================================================== */

    const periodButtons = flowPanel.querySelectorAll(
        ".stackly-finance-transactions-period button"
    );

    const totalValue = flowPanel.querySelector(
        ".stackly-finance-transactions-flow-total strong"
    );

    const totalLabel = flowPanel.querySelector(
        ".stackly-finance-transactions-flow-total span"
    );

    const chartBars = flowPanel.querySelectorAll(
        ".stackly-finance-transactions-bars span"
    );

    const chartLabels = flowPanel.querySelectorAll(
        ".stackly-finance-transactions-chart-labels span"
    );


    /* ========================================================
       CHART DATA
    ======================================================== */

    const transactionData = {

        "30D": {

            total: "₹8.64 Cr",

            label: "Processed transaction value",

            bars: [
                42,
                58,
                48,
                72,
                62,
                80,
                67,
                91,
                74,
                86,
                78,
                96
            ],

            labels: [
                "01",
                "05",
                "10",
                "15",
                "20",
                "25",
                "30"
            ]

        },


        "90D": {

            total: "₹24.86 Cr",

            label: "Processed transaction value",

            bars: [
                38,
                52,
                64,
                57,
                73,
                68,
                82,
                76,
                91,
                84,
                94,
                88
            ],

            labels: [
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "15",
                "30",
                "90D"
            ]

        },


        "1Y": {

            total: "₹96.42 Cr",

            label: "Processed transaction value",

            bars: [
                44,
                51,
                47,
                63,
                58,
                72,
                67,
                79,
                74,
                88,
                82,
                96
            ],

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul"
            ]

        }

    };


    /* ========================================================
       UPDATE CHART
    ======================================================== */

    function updateTransactionChart(period) {

        const data = transactionData[period];

        if (!data) return;


        /* ----------------------------------------------------
           Update active button
        ---------------------------------------------------- */

        periodButtons.forEach(function (button) {

            const isActive =
                button.textContent.trim() === period;

            button.classList.toggle("active", isActive);

        });


        /* ----------------------------------------------------
           Update total value
        ---------------------------------------------------- */

        if (totalValue) {

            totalValue.style.opacity = "0";
            totalValue.style.transform = "translateY(5px)";

            setTimeout(function () {

                totalValue.textContent = data.total;

                totalValue.style.opacity = "1";
                totalValue.style.transform = "translateY(0)";

            }, 120);

        }


        /* ----------------------------------------------------
           Update description
        ---------------------------------------------------- */

        if (totalLabel) {

            totalLabel.textContent = data.label;

        }


        /* ----------------------------------------------------
           Update chart bars
        ---------------------------------------------------- */

        chartBars.forEach(function (bar, index) {

            bar.style.transform = "scaleY(0.25)";
            bar.style.opacity = "0.4";

            setTimeout(function () {

                if (data.bars[index] !== undefined) {

                    bar.style.height =
                        data.bars[index] + "%";

                }

                bar.style.transform = "scaleY(1)";
                bar.style.opacity = "1";

            }, 100 + (index * 45));

        });


        /* ----------------------------------------------------
           Update chart labels
        ---------------------------------------------------- */

        chartLabels.forEach(function (label, index) {

            label.style.opacity = "0";

            setTimeout(function () {

                if (data.labels[index] !== undefined) {

                    label.textContent =
                        data.labels[index];

                }

                label.style.opacity = "1";

            }, 180);

        });


        /* ----------------------------------------------------
           Custom event
           Useful if another dashboard component needs
           to react to the selected period.
        ---------------------------------------------------- */

        document.dispatchEvent(
            new CustomEvent(
                "stacklyTransactionPeriodChanged",
                {
                    detail: {
                        period: period,
                        total: data.total,
                        bars: data.bars,
                        labels: data.labels
                    }
                }
            )
        );

    }


    /* ========================================================
       BUTTON EVENTS
    ======================================================== */

    periodButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedPeriod =
                button.textContent.trim();

            updateTransactionChart(selectedPeriod);

        });

    });


    /* ========================================================
       KEYBOARD ACCESSIBILITY
    ======================================================== */

    periodButtons.forEach(function (button, index) {

        button.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                button.click();

            }


            /* Arrow right */

            if (event.key === "ArrowRight") {

                event.preventDefault();

                const nextButton =
                    periodButtons[index + 1] ||
                    periodButtons[0];

                nextButton.focus();

            }


            /* Arrow left */

            if (event.key === "ArrowLeft") {

                event.preventDefault();

                const previousButton =
                    periodButtons[index - 1] ||
                    periodButtons[periodButtons.length - 1];

                previousButton.focus();

            }

        });

    });


    /* ========================================================
       INITIAL STATE
    ======================================================== */

    updateTransactionChart("30D");

});

/* ============================================================
   STACKLY FINANCE
   INVESTMENTS PERFORMANCE + ALLOCATION
   INTERACTIVE JAVASCRIPT
============================================================ */


/* ============================================================
   WAIT FOR DOM
============================================================ */

document.addEventListener("DOMContentLoaded", function () {


    /* ========================================================
       ELEMENT REFERENCES
    ======================================================== */

    const investmentPeriod =
        document.querySelector(
            ".stackly-finance-investments-period"
        );

    const periodButtons =
        document.querySelectorAll(
            ".stackly-finance-investments-period button"
        );

    const portfolioValue =
        document.querySelector(
            ".stackly-finance-investments-performance-summary > div:first-child strong"
        );

    const performanceResult =
        document.querySelector(
            ".stackly-finance-investments-performance-summary .positive"
        );

    const performanceChart =
        document.querySelector(
            ".stackly-finance-investments-chart-line"
        );

    const chartBars =
        document.querySelectorAll(
            ".stackly-finance-investments-chart-line span"
        );

    const chartLabels =
        document.querySelectorAll(
            ".stackly-finance-investments-chart-labels span"
        );

    const donut =
        document.querySelector(
            ".stackly-finance-investments-donut"
        );

    const donutValue =
        document.querySelector(
            ".stackly-finance-investments-donut strong"
        );

    const donutLabel =
        document.querySelector(
            ".stackly-finance-investments-donut span"
        );

    const allocationItems =
        document.querySelectorAll(
            ".stackly-finance-investments-allocation-item"
        );


    /* ========================================================
       PERFORMANCE DATA
    ======================================================== */

    const investmentPerformanceData = {

        "1M": {

            value: "₹15.92 Cr",

            returnValue: "₹0.48 Cr",

            percentage: "+3.1% monthly growth",

            heights: [
                42,
                48,
                45,
                54,
                58,
                64,
                61,
                69,
                73,
                78,
                84,
                91
            ],

            labels: [
                "Week 1",
                "Week 2",
                "Week 3",
                "Week 4",
                "Week 5",
                "Now"
            ]

        },


        "6M": {

            value: "₹17.26 Cr",

            returnValue: "₹1.58 Cr",

            percentage: "+10.1% half-year growth",

            heights: [
                31,
                38,
                35,
                46,
                51,
                49,
                58,
                63,
                67,
                74,
                79,
                88
            ],

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"
            ]

        },


        "1Y": {

            value: "₹18.42 Cr",

            returnValue: "₹2.74 Cr",

            percentage: "+17.5% annual growth",

            heights: [
                32,
                40,
                37,
                48,
                55,
                51,
                64,
                61,
                72,
                78,
                73,
                91
            ],

            labels: [
                "Jan",
                "Mar",
                "May",
                "Jul",
                "Sep",
                "Dec"
            ]

        },


        "5Y": {

            value: "₹24.86 Cr",

            returnValue: "₹8.42 Cr",

            percentage: "+51.2% five-year growth",

            heights: [
                28,
                34,
                39,
                45,
                43,
                51,
                57,
                63,
                68,
                74,
                82,
                94
            ],

            labels: [
                "2022",
                "2023",
                "2024",
                "2025",
                "2026",
                "Now"
            ]

        }

    };


    /* ========================================================
       UPDATE CHART
    ======================================================== */

    function updateInvestmentChart(data) {


        if (!chartBars.length) {
            return;
        }


        /* -----------------------------------------------
           Reset bars
        ------------------------------------------------ */

        chartBars.forEach(function (bar) {

            bar.style.height = "0%";

        });


        /* -----------------------------------------------
           Force browser reflow
        ------------------------------------------------ */

        if (performanceChart) {

            void performanceChart.offsetHeight;

        }


        /* -----------------------------------------------
           Animate new bars
        ------------------------------------------------ */

        chartBars.forEach(function (bar, index) {

            const newHeight =
                data.heights[index] || 20;

            setTimeout(function () {

                bar.style.height =
                    newHeight + "%";

            }, index * 45);

        });


        /* -----------------------------------------------
           Update chart labels
        ------------------------------------------------ */

        chartLabels.forEach(function (label, index) {

            if (data.labels[index]) {

                label.textContent =
                    data.labels[index];

            }

        });

    }


    /* ========================================================
       UPDATE PERFORMANCE INFORMATION
    ======================================================== */

    function updateInvestmentPerformance(period) {


        const data =
            investmentPerformanceData[period];


        if (!data) {
            return;
        }


        /* -----------------------------------------------
           Portfolio value
        ------------------------------------------------ */

        if (portfolioValue) {

            portfolioValue.style.opacity = "0";
            portfolioValue.style.transform =
                "translateY(6px)";


            setTimeout(function () {

                portfolioValue.textContent =
                    data.value;

                portfolioValue.style.opacity = "1";
                portfolioValue.style.transform =
                    "translateY(0)";

            }, 150);

        }


        /* -----------------------------------------------
           Return information
        ------------------------------------------------ */

        if (performanceResult) {

            performanceResult.style.opacity = "0";

            setTimeout(function () {

                performanceResult.innerHTML = `

                    <i class="fa-solid fa-arrow-up"></i>

                    ${data.returnValue}

                    <span>
                        ${data.percentage}
                    </span>

                `;

                performanceResult.style.opacity = "1";

            }, 150);

        }


        /* -----------------------------------------------
           Update chart
        ------------------------------------------------ */

        updateInvestmentChart(data);


    }


    /* ========================================================
       PERIOD BUTTON CLICK
    ======================================================== */

    periodButtons.forEach(function (button) {


        button.addEventListener("click", function () {


            const selectedPeriod =
                this.textContent.trim();


            /* -------------------------------------------
               Remove active state
            -------------------------------------------- */

            periodButtons.forEach(function (item) {

                item.classList.remove("active");

            });


            /* -------------------------------------------
               Add active state
            -------------------------------------------- */

            this.classList.add("active");


            /* -------------------------------------------
               Update dashboard
            -------------------------------------------- */

            updateInvestmentPerformance(
                selectedPeriod
            );


            /* -------------------------------------------
               Custom event
            -------------------------------------------- */

            document.dispatchEvent(

                new CustomEvent(
                    "stacklyInvestmentPeriodChanged",
                    {
                        detail: {
                            period: selectedPeriod
                        }
                    }
                )

            );

        });


    });


    /* ========================================================
       INITIAL PERFORMANCE LOAD
    ======================================================== */

    const initialButton =
        document.querySelector(
            ".stackly-finance-investments-period button.active"
        );


    if (initialButton) {

        const initialPeriod =
            initialButton.textContent.trim();

        const initialData =
            investmentPerformanceData[initialPeriod];


        if (initialData) {

            updateInvestmentChart(
                initialData
            );

        }

    }


    /* ========================================================
       ALLOCATION DATA
    ======================================================== */

    const allocationData = {

        equity: {

            percentage: "40%",

            value: "₹7.37 Cr",

            color: "#8dcc32"

        },

        debt: {

            percentage: "25%",

            value: "₹4.60 Cr",

            color: "#5d9b83"

        },

        fixed: {

            percentage: "20%",

            value: "₹3.68 Cr",

            color: "#7aa7d8"

        },

        alternative: {

            percentage: "15%",

            value: "₹2.77 Cr",

            color: "#e5a06f"

        }

    };


    /* ========================================================
       ALLOCATION HOVER EFFECT
    ======================================================== */

    allocationItems.forEach(function (item) {


        const indicator =
            item.querySelector(
                "span"
            );


        const percentage =
            item.querySelector(
                "b"
            );


        item.addEventListener(
            "mouseenter",
            function () {


                /* ---------------------------------------
                   Highlight allocation item
                ---------------------------------------- */

                allocationItems.forEach(
                    function (otherItem) {

                        otherItem.style.opacity =
                            "0.45";

                    }
                );


                item.style.opacity =
                    "1";


                /* ---------------------------------------
                   Slight donut scale
                ---------------------------------------- */

                if (donut) {

                    donut.style.transform =
                        "scale(1.04)";

                }


                /* ---------------------------------------
                   Highlight percentage
                ---------------------------------------- */

                if (percentage) {

                    percentage.style.transform =
                        "scale(1.08)";

                }

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


                if (donut) {

                    donut.style.transform =
                        "scale(1)";

                }


                if (percentage) {

                    percentage.style.transform =
                        "scale(1)";

                }

            }
        );


        /* -----------------------------------------------
           Indicator hover animation
        ------------------------------------------------ */

        if (indicator) {

            item.addEventListener(
                "mouseenter",
                function () {

                    indicator.style.transform =
                        "scale(1.45)";

                }
            );


            item.addEventListener(
                "mouseleave",
                function () {

                    indicator.style.transform =
                        "scale(1)";

                }
            );

        }

    });


    /* ========================================================
       DONUT TRANSITION
    ======================================================== */

    if (donut) {

        donut.style.transition =
            "transform .35s cubic-bezier(.4,0,.2,1)";

    }


    /* ========================================================
       ALLOCATION VALUE HOVER TRANSITION
    ======================================================== */

    allocationItems.forEach(function (item) {

        const percentage =
            item.querySelector("b");


        if (percentage) {

            percentage.style.transition =
                "transform .3s ease";

        }

    });


    /* ========================================================
       PERFORMANCE NUMBER TRANSITIONS
    ======================================================== */

    if (portfolioValue) {

        portfolioValue.style.transition =
            "opacity .25s ease, transform .25s ease";

    }


    if (performanceResult) {

        performanceResult.style.transition =
            "opacity .25s ease";

    }


    /* ========================================================
       PERIOD KEYBOARD SUPPORT
    ======================================================== */

    if (investmentPeriod) {

        periodButtons.forEach(function (button) {


            button.addEventListener(
                "keydown",
                function (event) {


                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        this.click();

                    }

                }
            );


        });

    }


    /* ========================================================
       AOS REFRESH
    ======================================================== */

    if (typeof AOS !== "undefined") {

        setTimeout(function () {

            AOS.refresh();

        }, 300);

    }


});


/* ============================================================
   STACKLY FINANCE
   MESSAGES PAGE JAVASCRIPT
   Interactive Communication Center
   FULL RESPONSIVE VERSION
============================================================ */


/* ============================================================
   DOM READY
============================================================ */

document.addEventListener("DOMContentLoaded", function () {


    /* ========================================================
       AOS INITIALIZATION
    ======================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 850,
            once: true,
            offset: 70,
            easing: "ease-out-cubic"
        });

    }


    /* ========================================================
       MESSAGE PAGE ELEMENTS
    ======================================================== */

    const conversationList =
        document.querySelector(
            ".stackly-finance-conversation-list"
        );

    const conversations =
        document.querySelectorAll(
            ".stackly-finance-conversation"
        );

    const filterButtons =
        document.querySelectorAll(
            ".stackly-finance-message-filters button"
        );

    const searchInput =
        document.querySelector(
            ".stackly-finance-message-search input"
        );

    const messageDetails =
        document.querySelector(
            ".stackly-finance-message-details"
        );

    const messageContact =
        document.querySelector(
            ".stackly-finance-message-contact"
        );

    const messageMeta =
        document.querySelector(
            ".stackly-finance-message-meta"
        );

    const messageSubject =
        document.querySelector(
            ".stackly-finance-message-subject"
        );

    const messageBody =
        document.querySelector(
            ".stackly-finance-message-body"
        );

    const attachment =
        document.querySelector(
            ".stackly-finance-message-attachment"
        );

    const replyArea =
        document.querySelector(
            ".stackly-finance-message-reply"
        );

    const replyTextarea =
        document.querySelector(
            ".stackly-finance-message-reply textarea"
        );

    const sendButton =
        document.querySelector(
            ".stackly-finance-send-message"
        );


    /* ========================================================
       MESSAGE DATA
    ======================================================== */

    const messageData = {

        "Arjun Kumar": {

            initials: "AK",

            email: "arjun.kumar@example.com",

            time: "Today, 10:42 AM",

            category: "Investment",

            priority: true,

            subject:
                "Question about investment account setup",

            body: `
                <p>Hello Admin,</p>

                <p>
                    I recently created an investment account and would
                    like to understand the available portfolio options.
                    Could you please provide more information about the
                    available investment plans and their expected
                    performance tracking features?
                </p>

                <p>
                    I would also like to know whether I can modify my
                    portfolio allocation after the account has been
                    activated.
                </p>

                <p>
                    Thank you for your assistance.
                </p>

                <p>
                    Regards,<br>
                    <strong>Arjun Kumar</strong>
                </p>
            `

        },


        "Priya Sharma": {

            initials: "PS",

            email: "priya.sharma@example.com",

            time: "Today, 09:18 AM",

            category: "Account",

            priority: false,

            subject:
                "Request for monthly account statement",

            body: `
                <p>Hello Admin,</p>

                <p>
                    I would like to request my latest monthly account
                    statement. Please let me know if any additional
                    verification is required.
                </p>

                <p>
                    I would appreciate it if the statement could be
                    made available at the earliest.
                </p>

                <p>
                    Thank you,<br>
                    <strong>Priya Sharma</strong>
                </p>
            `

        },


        "Rahul Mehta": {

            initials: "RM",

            email: "rahul.mehta@example.com",

            time: "Yesterday",

            category: "Verification",

            priority: true,

            subject:
                "Transaction verification required",

            body: `
                <p>Hello Admin,</p>

                <p>
                    I noticed that one of my recent transactions is
                    showing as pending verification.
                </p>

                <p>
                    Could you please review the transaction and let me
                    know if any additional information is required from
                    my side?
                </p>

                <p>
                    Regards,<br>
                    <strong>Rahul Mehta</strong>
                </p>
            `

        },


        "Neha Singh": {

            initials: "NS",

            email: "neha.singh@example.com",

            time: "Yesterday",

            category: "Portfolio",

            priority: false,

            subject:
                "Portfolio performance inquiry",

            body: `
                <p>Hello Admin,</p>

                <p>
                    I would like to know more about my current portfolio
                    performance and recent investment activity.
                </p>

                <p>
                    Please provide the latest performance summary and
                    relevant portfolio information.
                </p>

                <p>
                    Regards,<br>
                    <strong>Neha Singh</strong>
                </p>
            `

        },


        "Vikram Shah": {

            initials: "VS",

            email: "vikram.shah@example.com",

            time: "Sep 15",

            category: "Support",

            priority: false,

            subject:
                "Help with updating account details",

            body: `
                <p>Hello Admin,</p>

                <p>
                    I need assistance updating some of the information
                    associated with my finance account.
                </p>

                <p>
                    Please let me know the required steps to complete
                    the update.
                </p>

                <p>
                    Thank you,<br>
                    <strong>Vikram Shah</strong>
                </p>
            `

        }

    };


    /* ========================================================
       CURRENT FILTER
    ======================================================== */

    let currentFilter = "all";


    /* ========================================================
       CURRENT MESSAGE
    ======================================================== */

    let currentMessageName = "Arjun Kumar";


    /* ========================================================
       CREATE EMPTY MESSAGE ERROR
    ======================================================== */

    let replyError =
        document.querySelector(
            ".stackly-finance-reply-error"
        );


    if (!replyError && replyArea) {

        replyError =
            document.createElement("div");

        replyError.className =
            "stackly-finance-reply-error";

        replyError.innerHTML =
            `<i class="fa-solid fa-circle-exclamation"></i>
             <span>Please enter a message before sending.</span>`;

        replyError.style.display = "none";

        replyArea.appendChild(replyError);

    }


    /* ========================================================
       SHOW REPLY ERROR
    ======================================================== */

    function showReplyError(message) {

        if (!replyError) {
            return;
        }

        const errorText =
            replyError.querySelector("span");

        if (errorText) {
            errorText.textContent = message;
        }

        replyError.style.display = "flex";

        if (replyTextarea) {

            replyTextarea.classList.add(
                "stackly-finance-message-error"
            );

            replyTextarea.focus();

        }

    }


    /* ========================================================
       HIDE REPLY ERROR
    ======================================================== */

    function hideReplyError() {

        if (replyError) {
            replyError.style.display = "none";
        }

        if (replyTextarea) {

            replyTextarea.classList.remove(
                "stackly-finance-message-error"
            );

        }

    }


    /* ========================================================
       UPDATE INBOX COUNTS
    ======================================================== */

    function updateInboxCounts() {

        const unreadItems =
            document.querySelectorAll(
                ".stackly-finance-conversation .stackly-finance-unread-dot"
            );

        let unreadCount = 0;

        unreadItems.forEach(function (dot) {

            const conversation =
                dot.closest(
                    ".stackly-finance-conversation"
                );

            if (
                conversation &&
                conversation.dataset.read !== "true"
            ) {
                unreadCount++;
            }

        });


        /* ----------------------------------------------------
           UPDATE UNREAD FILTER BADGE IF AVAILABLE
        ---------------------------------------------------- */

        const unreadButton =
            Array.from(filterButtons).find(function (button) {

                return (
                    button.textContent
                        .trim()
                        .toLowerCase() === "unread"
                );

            });


        if (unreadButton) {

            const badge =
                unreadButton.querySelector(
                    ".stackly-finance-filter-count"
                );

            if (badge) {
                badge.textContent = unreadCount;
            }

        }


        /* ----------------------------------------------------
           UPDATE STAT CARD
        ---------------------------------------------------- */

        const statCards =
            document.querySelectorAll(
                ".stackly-finance-message-stat-card"
            );


        statCards.forEach(function (card) {

            const title =
                card.querySelector("h3, strong");

            const label =
                card.querySelector("p, span");

            const text =
                card.textContent
                    .toLowerCase();

            if (
                text.includes("unread") &&
                !text.includes("priority")
            ) {

                const number =
                    card.querySelector(
                        ".stackly-finance-message-stat-number"
                    );

                if (number) {
                    number.textContent = unreadCount;
                }

            }

        });

    }


    /* ========================================================
       UPDATE MESSAGE DETAILS
    ======================================================== */

    function updateMessageDetails(name) {

        const data =
            messageData[name];

        if (!data) {
            return;
        }


        currentMessageName = name;


        /* ----------------------------------------------------
           CONTACT INFORMATION
        ---------------------------------------------------- */

        const avatar =
            document.querySelector(
                ".stackly-finance-message-contact-avatar"
            );

        const nameElement =
            document.querySelector(
                ".stackly-finance-message-contact h3"
            );

        const emailElement =
            document.querySelector(
                ".stackly-finance-message-contact span"
            );


        if (avatar) {
            avatar.textContent =
                data.initials;
        }

        if (nameElement) {
            nameElement.textContent =
                name;
        }

        if (emailElement) {
            emailElement.textContent =
                data.email;
        }


        /* ----------------------------------------------------
           META INFORMATION
        ---------------------------------------------------- */

        const metaItems =
            document.querySelectorAll(
                ".stackly-finance-message-meta > span"
            );


        if (metaItems.length >= 3) {

            metaItems[0].innerHTML =
                `<i class="fa-regular fa-clock"></i>
                 ${data.time}`;

            metaItems[1].innerHTML =
                `<i class="fa-solid fa-tag"></i>
                 ${data.category}`;

            metaItems[2].innerHTML =
                `<i class="fa-solid fa-circle"></i>
                 ${
                    data.priority
                        ? "High Priority"
                        : "Normal Priority"
                 }`;

            metaItems[2].classList.toggle(
                "priority",
                data.priority
            );

        }


        /* ----------------------------------------------------
           SUBJECT
        ---------------------------------------------------- */

        const subjectElement =
            document.querySelector(
                ".stackly-finance-message-subject h4"
            );

        if (subjectElement) {

            subjectElement.textContent =
                data.subject;

        }


        /* ----------------------------------------------------
           MESSAGE BODY
        ---------------------------------------------------- */

        const bodyElement =
            document.querySelector(
                ".stackly-finance-message-body"
            );

        if (bodyElement) {

            bodyElement.innerHTML =
                data.body;

        }


        /* ----------------------------------------------------
           REPLY TITLE
        ---------------------------------------------------- */

        const replyTitle =
            document.querySelector(
                ".stackly-finance-message-reply-header strong"
            );

        if (replyTitle) {

            replyTitle.textContent =
                `Reply to ${name}`;

        }


        /* ----------------------------------------------------
           RESET REPLY
        ---------------------------------------------------- */

        if (replyTextarea) {

            replyTextarea.value = "";

            replyTextarea.style.height =
                "auto";

        }

        hideReplyError();

    }


    /* ========================================================
       GET CONVERSATION NAME
    ======================================================== */

    function getConversationName(conversation) {

        const nameElement =
            conversation.querySelector(
                ".stackly-finance-conversation-top strong"
            );

        return nameElement
            ? nameElement.textContent.trim()
            : "";

    }


    /* ========================================================
       CHECK IF CONVERSATION IS PRIORITY
    ======================================================== */

    function isPriorityConversation(conversation) {

        const tag =
            conversation.querySelector(
                ".stackly-finance-conversation-tag"
            );

        if (
            tag &&
            (
                tag.classList.contains("warning") ||
                tag.classList.contains("priority")
            )
        ) {
            return true;
        }


        const name =
            getConversationName(conversation);


        return (
            messageData[name] &&
            messageData[name].priority === true
        );

    }


    /* ========================================================
       CHECK IF CONVERSATION IS UNREAD
    ======================================================== */

    function isUnreadConversation(conversation) {

        const dot =
            conversation.querySelector(
                ".stackly-finance-unread-dot"
            );

        return (
            dot &&
            conversation.dataset.read !== "true"
        );

    }


    /* ========================================================
       APPLY INBOX FILTER
    ======================================================== */

    function applyInboxFilter() {

        const searchValue =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        conversations.forEach(function (conversation) {

            const name =
                getConversationName(
                    conversation
                );

            const text =
                conversation.textContent
                    .toLowerCase();

            const matchesSearch =
                searchValue === "" ||
                text.includes(searchValue);


            let matchesFilter = true;


            /* ------------------------------------------------
               ALL
            ------------------------------------------------ */

            if (currentFilter === "all") {

                matchesFilter = true;

            }


            /* ------------------------------------------------
               UNREAD
            ------------------------------------------------ */

            else if (
                currentFilter === "unread"
            ) {

                matchesFilter =
                    isUnreadConversation(
                        conversation
                    );

            }


            /* ------------------------------------------------
               PRIORITY
            ------------------------------------------------ */

            else if (
                currentFilter === "priority"
            ) {

                matchesFilter =
                    isPriorityConversation(
                        conversation
                    );

            }


            /* ------------------------------------------------
               FINAL DISPLAY
            ------------------------------------------------ */

            if (
                matchesFilter &&
                matchesSearch
            ) {

                conversation.style.display =
                    "flex";

            } else {

                conversation.style.display =
                    "none";

            }

        });

    }


    /* ========================================================
       CONVERSATION CLICK
    ======================================================== */

    conversations.forEach(function (conversation) {

        conversation.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                /* --------------------------------------------
                   REMOVE ACTIVE CLASS
                -------------------------------------------- */

                conversations.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                /* --------------------------------------------
                   ACTIVE CONVERSATION
                -------------------------------------------- */

                this.classList.add(
                    "active"
                );


                /* --------------------------------------------
                   GET NAME
                -------------------------------------------- */

                const selectedName =
                    getConversationName(
                        this
                    );


                if (!selectedName) {
                    return;
                }


                /* --------------------------------------------
                   UPDATE DETAILS
                -------------------------------------------- */

                updateMessageDetails(
                    selectedName
                );


                /* --------------------------------------------
                   MARK AS READ
                -------------------------------------------- */

                const unreadDot =
                    this.querySelector(
                        ".stackly-finance-unread-dot"
                    );


                if (unreadDot) {

                    unreadDot.style.opacity =
                        "0";

                    unreadDot.style.transform =
                        "scale(0)";

                    unreadDot.style.pointerEvents =
                        "none";

                }


                this.dataset.read =
                    "true";


                /* --------------------------------------------
                   REMOVE UNREAD CLASS
                -------------------------------------------- */

                this.classList.remove(
                    "unread"
                );


                updateInboxCounts();


                /* --------------------------------------------
                   MOBILE SCROLL
                -------------------------------------------- */

                if (
                    window.innerWidth <= 900 &&
                    messageDetails
                ) {

                    setTimeout(function () {

                        messageDetails.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 150);

                }

            }
        );

    });


    /* ========================================================
       YOUR INBOX FILTER BUTTONS
    ======================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                /* --------------------------------------------
                   ACTIVE FILTER
                -------------------------------------------- */

                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                /* --------------------------------------------
                   DETERMINE FILTER
                -------------------------------------------- */

                const filterText =
                    this.textContent
                        .trim()
                        .toLowerCase();


                if (
                    filterText.includes("unread")
                ) {

                    currentFilter =
                        "unread";

                }

                else if (
                    filterText.includes("priority")
                ) {

                    currentFilter =
                        "priority";

                }

                else {

                    currentFilter =
                        "all";

                }


                /* --------------------------------------------
                   APPLY FILTER
                -------------------------------------------- */

                applyInboxFilter();

            }
        );

    });


    /* ========================================================
       SEARCH CONVERSATIONS
    ======================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                applyInboxFilter();

            }
        );

    }


    /* ========================================================
       MESSAGE STAR BUTTON
    ======================================================== */

    const starButton =
        document.querySelector(
            '.stackly-finance-message-details-actions button[aria-label="Star message"]'
        );


    if (starButton) {

        starButton.addEventListener(
            "click",
            function () {

                const icon =
                    this.querySelector("i");


                const isStarred =
                    this.classList.toggle(
                        "starred"
                    );


                if (isStarred) {

                    if (icon) {

                        icon.classList.remove(
                            "fa-regular"
                        );

                        icon.classList.add(
                            "fa-solid"
                        );

                    }


                    this.setAttribute(
                        "aria-label",
                        "Unstar message"
                    );

                    this.setAttribute(
                        "title",
                        "Remove star"
                    );

                }

                else {

                    if (icon) {

                        icon.classList.remove(
                            "fa-solid"
                        );

                        icon.classList.add(
                            "fa-regular"
                        );

                    }


                    this.setAttribute(
                        "aria-label",
                        "Star message"
                    );

                    this.setAttribute(
                        "title",
                        "Star message"
                    );

                }

            }
        );

    }


    /* ========================================================
       REPLY TEXTAREA
    ======================================================== */

    if (replyTextarea) {

        replyTextarea.addEventListener(
            "input",
            function () {

                this.style.height =
                    "auto";

                this.style.height =
                    Math.min(
                        this.scrollHeight,
                        180
                    ) + "px";


                /* --------------------------------------------
                   CLEAR EMPTY MESSAGE ERROR
                -------------------------------------------- */

                if (
                    this.value.trim() !== ""
                ) {

                    hideReplyError();

                }

            }
        );


        /* --------------------------------------------
           FOCUS = REMOVE ERROR
        -------------------------------------------- */

        replyTextarea.addEventListener(
            "focus",
            function () {

                if (
                    this.value.trim() !== ""
                ) {

                    hideReplyError();

                }

            }
        );

    }


    /* ========================================================
       SEND REPLY
    ======================================================== */

    if (
        sendButton &&
        replyTextarea
    ) {

        sendButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const message =
                    replyTextarea.value.trim();


                /* --------------------------------------------
                   EMPTY MESSAGE VALIDATION
                -------------------------------------------- */

                if (message === "") {

                    showReplyError(
                        "Please enter a message before sending."
                    );

                    return;

                }


                /* --------------------------------------------
                   REMOVE ERROR
                -------------------------------------------- */

                hideReplyError();


                /* --------------------------------------------
                   SAVE ORIGINAL BUTTON
                -------------------------------------------- */

                const originalButtonHTML =
                    this.innerHTML;


                /* --------------------------------------------
                   SENDING STATE
                -------------------------------------------- */

                this.innerHTML =
                    `<i class="fa-solid fa-spinner fa-spin"></i>
                     <span>Sending...</span>`;

                this.classList.add(
                    "sending"
                );

                this.disabled = true;


                /* --------------------------------------------
                   DEMO SEND
                -------------------------------------------- */

                setTimeout(function () {

                    sendButton.innerHTML =
                        `<i class="fa-solid fa-check"></i>
                         <span>Sent Successfully</span>`;


                    sendButton.classList.remove(
                        "sending"
                    );

                    sendButton.classList.add(
                        "sent"
                    );


                    replyTextarea.value =
                        "";

                    replyTextarea.style.height =
                        "auto";


                    /* ----------------------------------------
                       SUCCESS MESSAGE
                    ---------------------------------------- */

                    if (replyError) {

                        const errorText =
                            replyError.querySelector(
                                "span"
                            );

                        if (errorText) {

                            errorText.textContent =
                                "Your reply has been sent successfully.";

                        }

                        replyError.classList.add(
                            "success"
                        );

                        replyError.style.display =
                            "flex";

                    }


                    /* ----------------------------------------
                       RESET BUTTON
                    ---------------------------------------- */

                    setTimeout(function () {

                        sendButton.innerHTML =
                            originalButtonHTML;

                        sendButton.classList.remove(
                            "sent"
                        );

                        sendButton.disabled =
                            false;


                        if (replyError) {

                            replyError.style.display =
                                "none";

                            replyError.classList.remove(
                                "success"
                            );

                        }

                    }, 2200);


                }, 900);

            }
        );

    }


    /* ========================================================
       CTRL + ENTER = SEND REPLY
    ======================================================== */

    if (replyTextarea && sendButton) {

        replyTextarea.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.ctrlKey &&
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    sendButton.click();

                }

            }
        );

    }


    /* ========================================================
       ATTACHMENT BUTTON
    ======================================================== */

    const attachmentButton =
        document.querySelector(
            '.stackly-finance-message-reply-tools button[aria-label="Attach file"]'
        );


    if (attachmentButton) {

        attachmentButton.addEventListener(
            "click",
            function () {

                const fileInput =
                    document.createElement(
                        "input"
                    );


                fileInput.type =
                    "file";


                fileInput.accept =
                    ".pdf,.doc,.docx,.jpg,.jpeg,.png";


                fileInput.click();


                fileInput.addEventListener(
                    "change",
                    function () {

                        if (
                            this.files &&
                            this.files.length > 0
                        ) {

                            const file =
                                this.files[0];


                            attachmentButton.classList.add(
                                "attached"
                            );


                            attachmentButton.setAttribute(
                                "title",
                                file.name
                            );


                            attachmentButton.setAttribute(
                                "data-file-name",
                                file.name
                            );


                            /* --------------------------------
                               OPTIONAL ATTACHMENT DISPLAY
                            -------------------------------- */

                            if (attachment) {

                                const fileName =
                                    attachment.querySelector(
                                        "span"
                                    );


                                if (fileName) {

                                    fileName.textContent =
                                        file.name;

                                }

                            }

                        }

                    }
                );

            }
        );

    }


    /* ========================================================
       EMOJI BUTTON
    ======================================================== */

    const emojiButton =
        document.querySelector(
            '.stackly-finance-message-reply-tools button[aria-label="Add emoji"]'
        );


    if (
        emojiButton &&
        replyTextarea
    ) {

        emojiButton.addEventListener(
            "click",
            function () {

                const emoji =
                    "😊";


                const start =
                    replyTextarea.selectionStart;


                const end =
                    replyTextarea.selectionEnd;


                const currentValue =
                    replyTextarea.value;


                replyTextarea.value =
                    currentValue.substring(
                        0,
                        start
                    ) +
                    emoji +
                    currentValue.substring(
                        end
                    );


                replyTextarea.focus();


                replyTextarea.selectionStart =
                    replyTextarea.selectionEnd =
                    start + emoji.length;


                replyTextarea.dispatchEvent(
                    new Event(
                        "input",
                        {
                            bubbles: true
                        }
                    )
                );

            }
        );

    }


    /* ========================================================
       PRIORITY ITEMS
    ======================================================== */

    const priorityItems =
        document.querySelectorAll(
            ".stackly-finance-priority-item"
        );


    priorityItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                priorityItems.forEach(
                    function (priorityItem) {

                        priorityItem.classList.remove(
                            "selected"
                        );

                    }
                );


                this.classList.add(
                    "selected"
                );

            }
        );

    });


    /* ========================================================
       QUICK ACTION CARDS
    ======================================================== */

    const actionCards =
        document.querySelectorAll(
            ".stackly-finance-message-action-card"
        );


    actionCards.forEach(function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                this.classList.add(
                    "is-hovered"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                this.classList.remove(
                    "is-hovered"
                );

            }
        );


        card.addEventListener(
            "click",
            function () {

                const title =
                    this.querySelector(
                        "h4, h3, strong"
                    );


                const actionName =
                    title
                        ? title.textContent.trim()
                        : "";


                /* --------------------------------------------
                   COMPOSE MESSAGE
                -------------------------------------------- */

                if (
                    actionName
                        .toLowerCase()
                        .includes("compose")
                ) {

                    if (replyTextarea) {

                        replyTextarea.focus();

                        if (messageDetails) {

                            messageDetails.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    }

                }


                /* --------------------------------------------
                   MARK ALL READ
                -------------------------------------------- */

                if (
                    actionName
                        .toLowerCase()
                        .includes("mark all read")
                ) {

                    conversations.forEach(
                        function (conversation) {

                            const dot =
                                conversation.querySelector(
                                    ".stackly-finance-unread-dot"
                                );


                            if (dot) {

                                dot.style.opacity =
                                    "0";

                                dot.style.transform =
                                    "scale(0)";

                            }


                            conversation.dataset.read =
                                "true";


                            conversation.classList.remove(
                                "unread"
                            );

                        }
                    );


                    updateInboxCounts();


                    if (
                        currentFilter === "unread"
                    ) {

                        applyInboxFilter();

                    }

                }

            }
        );

    });


    /* ========================================================
       CONTACT BUTTONS
    ======================================================== */

    const contactButtons =
        document.querySelectorAll(
            ".stackly-finance-contact-item > a"
        );


    contactButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    });


    /* ========================================================
       KEYBOARD SHORTCUT
       CTRL + K = SEARCH
    ======================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.ctrlKey &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();


                if (searchInput) {

                    searchInput.focus();

                }

            }

        }
    );


    /* ========================================================
       ESCAPE KEY
       CLEAR SEARCH
    ======================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                if (
                    searchInput &&
                    document.activeElement ===
                    searchInput
                ) {

                    searchInput.value =
                        "";

                    applyInboxFilter();

                    searchInput.blur();

                }

            }

        }
    );


    /* ========================================================
       INITIAL MESSAGE
    ======================================================== */

    if (
        conversations.length > 0
    ) {

        let initialConversation =
            document.querySelector(
                ".stackly-finance-conversation.active"
            );


        if (!initialConversation) {

            initialConversation =
                conversations[0];

        }


        const initialName =
            getConversationName(
                initialConversation
            );


        if (initialName) {

            updateMessageDetails(
                initialName
            );

        }

    }


    /* ========================================================
       INITIAL INBOX COUNTS
    ======================================================== */

    updateInboxCounts();


    /* ========================================================
       INITIAL FILTER
    ======================================================== */

    applyInboxFilter();


    /* ========================================================
       WINDOW LOAD
    ======================================================== */

    window.addEventListener(
        "load",
        function () {

            if (
                typeof AOS !== "undefined"
            ) {

                AOS.refresh();

            }

        }
    );

});


/* ============================================================
   DISPLAY ADMIN NAME FROM LOGIN EMAIL
   Example:
   arul@stackly.com
   -> Arul

   john.doe@gmail.com
   -> John
============================================================ */

const adminNameElement = document.getElementById(
    "stacklyFinanceAdminName"
);

if (adminNameElement) {

    /* --------------------------------------------
       GET LOGIN EMAIL FROM LOCAL STORAGE
    -------------------------------------------- */

    const storedEmail = localStorage.getItem(
        "loginEmail"
    );

    /* --------------------------------------------
       CHECK EMAIL
    -------------------------------------------- */

    if (storedEmail) {

        /* ----------------------------------------
           GET TEXT BEFORE @
        ---------------------------------------- */

        let emailName = storedEmail
            .trim()
            .split("@")[0];

        /* ----------------------------------------
           IF EMAIL CONTAINS DOT / UNDERSCORE /
           HYPHEN, USE THE FIRST PART
           
           Example:
           john.doe@gmail.com
           -> john
           
           john_doe@gmail.com
           -> john
           
           john-doe@gmail.com
           -> john
        ---------------------------------------- */

        emailName = emailName
            .split(/[._-]/)[0];

        /* ----------------------------------------
           REMOVE UNWANTED CHARACTERS
        ---------------------------------------- */

        emailName = emailName.replace(
            /[^A-Za-z]/g,
            ""
        );

        /* ----------------------------------------
           CAPITALIZE FIRST LETTER
        ---------------------------------------- */

        if (emailName.length > 0) {

            emailName =
                emailName.charAt(0).toUpperCase() +
                emailName.slice(1).toLowerCase();

            /* ------------------------------------
               DISPLAY NAME
            ------------------------------------ */

            adminNameElement.textContent =
                emailName;

        } else {

            adminNameElement.textContent =
                "Administrator";
        }

    } else {

        /* ----------------------------------------
           FALLBACK
        ---------------------------------------- */

        adminNameElement.text
        Content =
            "Administrator";
    }
}

/* ============================================================
   PROFILE FULL NAME
   LOAD NAME FROM LOGIN EMAIL
   USER CAN EDIT THE NAME
============================================================ */

const profileNameInput = document.getElementById(
    "stacklyFinanceProfileName"
);

if (profileNameInput) {

    /* --------------------------------------------
       GET SAVED PROFILE NAME FIRST
       If the user already edited their name,
       keep that name.
    -------------------------------------------- */

    const savedProfileName = localStorage.getItem(
        "stacklyFinanceProfileName"
    );

    if (savedProfileName) {

        profileNameInput.value =
            savedProfileName;

    } else {

        /* ----------------------------------------
           GET LOGIN EMAIL
        ---------------------------------------- */

        const storedEmail = localStorage.getItem(
            "loginEmail"
        );

        if (storedEmail) {

            /* ------------------------------------
               GET PART BEFORE @

               arul@stackly.com
               -> arul

               john.doe@gmail.com
               -> john.doe
            ------------------------------------ */

            let userName = storedEmail
                .trim()
                .split("@")[0];

            /* ------------------------------------
               CONVERT DOT / UNDERSCORE / HYPHEN
               INTO SPACES

               john.doe
               -> john doe

               john_doe
               -> john doe
            ------------------------------------ */

            userName = userName.replace(
                /[._-]+/g,
                " "
            );

            /* ------------------------------------
               REMOVE EXTRA CHARACTERS
            ------------------------------------ */

            userName = userName
                .replace(/[^A-Za-z\s]/g, "")
                .replace(/\s+/g, " ")
                .trim();

            /* ------------------------------------
               CAPITALIZE EACH WORD

               john doe
               -> John Doe
            ------------------------------------ */

            userName = userName
                .split(" ")
                .map(function (word) {

                    return word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase();

                })
                .join(" ");

            /* ------------------------------------
               DISPLAY NAME
            ------------------------------------ */

            profileNameInput.value =
                userName || "Administrator";

        } else {

            profileNameInput.value =
                "Administrator";
        }
    }

    /* --------------------------------------------
       SAVE EDITED NAME
       Whenever the administrator changes the
       name, save it to localStorage.
    -------------------------------------------- */

    profileNameInput.addEventListener(
        "input",
        function () {

            let editedName =
                this.value
                    .replace(/[^A-Za-z\s]/g, "")
                    .replace(/\s+/g, " ");

            this.value = editedName;

            localStorage.setItem(
                "stacklyFinanceProfileName",
                editedName.trim()
            );
        }
    );
}

/* ============================================================
   DISPLAY LOGGED-IN USER EMAIL
============================================================ */

const profileEmailInput = document.getElementById(
    "stacklyFinanceProfileEmail"
);

if (profileEmailInput) {

    /* --------------------------------------------
       GET EMAIL FROM LOCAL STORAGE
    -------------------------------------------- */

    const storedEmail = localStorage.getItem(
        "loginEmail"
    );

    /* --------------------------------------------
       DISPLAY EMAIL
    -------------------------------------------- */

    if (storedEmail) {

        profileEmailInput.value =
            storedEmail;

    } else {

        profileEmailInput.value =
            "";
    }

    /* --------------------------------------------
       SAVE EMAIL IF USER EDITS IT
    -------------------------------------------- */

    profileEmailInput.addEventListener(
        "input",
        function () {

            const editedEmail =
                this.value.trim().toLowerCase();

            localStorage.setItem(
                "loginEmail",
                editedEmail
            );
        }
    );
}

/* ============================================================
   STACKLY FINANCE
   SETTINGS PAGE JAVASCRIPT
   ------------------------------------------------------------
   FEATURES:
   1. Settings tab navigation
   2. Profile information
   3. Login email integration
   4. Editable profile name
   5. Editable profile email
   6. Save profile changes
   7. Profile photo upload
   8. Security controls
   9. Two-factor authentication
   10. Notification preferences
   11. Dashboard preferences
   12. Theme selection
   13. Dark / Light / System mode
   14. Sign out all devices
   15. Toast notifications
   16. LocalStorage persistence
   17. AOS integration
============================================================ */


document.addEventListener("DOMContentLoaded", function () {


    /* ========================================================
       AOS INITIALIZATION
    ======================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 850,

            once: true,

            offset: 80,

            easing: "ease-out-cubic"

        });

    }


    /* ========================================================
       LOCAL STORAGE KEYS
    ======================================================== */

    const SETTINGS_NAME_KEY =
        "stacklyFinanceProfileName";

    const SETTINGS_EMAIL_KEY =
        "loginEmail";

    const SETTINGS_PHONE_KEY =
        "stacklyFinanceProfilePhone";

    const SETTINGS_THEME_KEY =
        "stacklyFinanceTheme";

    const SETTINGS_2FA_KEY =
        "stacklyFinanceTwoFactor";

    const SETTINGS_NOTIFICATION_KEY =
        "stacklyFinanceNotifications";

    const SETTINGS_PREFERENCE_KEY =
        "stacklyFinancePreferences";


    /* ========================================================
       MAIN SETTINGS ELEMENTS
    ======================================================== */

    const settingsTabs =
        document.querySelectorAll(
            ".stackly-finance-settings-tab"
        );

    const settingsPanels =
        document.querySelectorAll(
            ".stackly-finance-settings-panel"
        );


    /* ========================================================
       PROFILE ELEMENTS
    ======================================================== */

    const profileName =
        document.getElementById(
            "stacklyFinanceProfileName"
        );

    const profileEmail =
        document.getElementById(
            "stacklyFinanceProfileEmail"
        );

    const adminName =
        document.getElementById(
            "stacklyFinanceAdminName"
        );

    const profileSaveButton =
        document.querySelector(
            ".stackly-finance-settings-save"
        );

    const uploadPhotoButton =
        document.querySelector(
            ".stackly-finance-upload-photo"
        );

    const profileAvatar =
        document.querySelector(
            ".stackly-finance-profile-avatar"
        );

    const phoneInput =
        document.querySelector(
            '.stackly-finance-settings-field input[type="tel"]'
        );


    /* ========================================================
       TOAST CONTAINER
       Creates automatically if it doesn't exist.
    ======================================================== */

    let toastContainer =
        document.querySelector(
            ".stackly-finance-settings-toast-container"
        );


    if (!toastContainer) {

        toastContainer =
            document.createElement("div");

        toastContainer.className =
            "stackly-finance-settings-toast-container";

        document.body.appendChild(
            toastContainer
        );

    }


    /* ========================================================
       TOAST FUNCTION
    ======================================================== */

    function showToast(
        message,
        type = "success"
    ) {

        const toast =
            document.createElement("div");

        toast.className =
            "stackly-finance-settings-toast " +
            type;

        let icon = "fa-check";

        if (type === "error") {

            icon = "fa-circle-exclamation";

        }

        if (type === "warning") {

            icon = "fa-triangle-exclamation";

        }

        toast.innerHTML = `

            <div class="stackly-finance-toast-icon">

                <i class="fa-solid ${icon}"></i>

            </div>

            <div class="stackly-finance-toast-content">

                <strong>
                    ${type === "success"
                        ? "Success"
                        : type === "error"
                            ? "Error"
                            : "Notice"}
                </strong>

                <span>
                    ${message}
                </span>

            </div>

            <button
                type="button"
                class="stackly-finance-toast-close"
                aria-label="Close notification"
            >

                <i class="fa-solid fa-xmark"></i>

            </button>

        `;

        toastContainer.appendChild(
            toast
        );


        /* --------------------------------------------
           CLOSE BUTTON
        -------------------------------------------- */

        const closeButton =
            toast.querySelector(
                ".stackly-finance-toast-close"
            );

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {

                    removeToast(
                        toast
                    );

                }
            );

        }


        /* --------------------------------------------
           SHOW ANIMATION
        -------------------------------------------- */

        requestAnimationFrame(
            function () {

                toast.classList.add(
                    "show"
                );

            }
        );


        /* --------------------------------------------
           AUTO REMOVE
        -------------------------------------------- */

        setTimeout(
            function () {

                removeToast(
                    toast
                );

            },
            4000
        );

    }


    /* ========================================================
       REMOVE TOAST
    ======================================================== */

    function removeToast(toast) {

        if (!toast) {
            return;
        }

        toast.classList.remove(
            "show"
        );

        setTimeout(
            function () {

                if (toast.parentNode) {

                    toast.parentNode.removeChild(
                        toast
                    );

                }

            },
            350
        );

    }


    /* ========================================================
       FORMAT NAME
       Example:
       john.doe -> John Doe
    ======================================================== */

    function formatNameFromEmail(email) {

        if (!email) {

            return "Administrator";

        }

        let name =
            email
                .trim()
                .split("@")[0];

        name =
            name.replace(
                /[._-]+/g,
                " "
            );

        name =
            name.replace(
                /[^A-Za-z\s]/g,
                ""
            );

        name =
            name
                .replace(
                    /\s+/g,
                    " "
                )
                .trim();

        if (!name) {

            return "Administrator";

        }

        return name
            .split(" ")
            .map(
                function (word) {

                    return (
                        word
                            .charAt(0)
                            .toUpperCase() +
                        word
                            .slice(1)
                            .toLowerCase()
                    );

                }
            )
            .join(" ");

    }


    /* ========================================================
       LOAD PROFILE INFORMATION
    ======================================================== */

    function loadProfileData() {

        const loginEmail =
            localStorage.getItem(
                SETTINGS_EMAIL_KEY
            );


        const savedName =
            localStorage.getItem(
                SETTINGS_NAME_KEY
            );


        const savedPhone =
            localStorage.getItem(
                SETTINGS_PHONE_KEY
            );


        /* --------------------------------------------
           EMAIL
        -------------------------------------------- */

        if (profileEmail) {

            profileEmail.value =
                loginEmail || "";

        }


        /* --------------------------------------------
           NAME
        -------------------------------------------- */

        if (profileName) {

            if (savedName) {

                profileName.value =
                    savedName;

            } else {

                const generatedName =
                    formatNameFromEmail(
                        loginEmail
                    );

                profileName.value =
                    generatedName;

            }

        }


        /* --------------------------------------------
           HEADER NAME
        -------------------------------------------- */

        if (adminName) {

            adminName.textContent =
                savedName ||
                formatNameFromEmail(
                    loginEmail
                );

        }


        /* --------------------------------------------
           PHONE
        -------------------------------------------- */

        if (
            phoneInput &&
            savedPhone
        ) {

            phoneInput.value =
                savedPhone;

        }

    }


    /* ========================================================
       LOAD PROFILE IMMEDIATELY
    ======================================================== */

    loadProfileData();


    /* ========================================================
       SETTINGS TAB NAVIGATION
    ======================================================== */

    settingsTabs.forEach(
        function (tab) {

            tab.addEventListener(
                "click",
                function () {

                    const target =
                        tab.getAttribute(
                            "data-setting-tab"
                        );


                    if (!target) {
                        return;
                    }


                    /* ----------------------------------------
                       UPDATE TAB ACTIVE STATE
                    ---------------------------------------- */

                    settingsTabs.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    tab.classList.add(
                        "active"
                    );


                    /* ----------------------------------------
                       HIDE ALL PANELS
                    ---------------------------------------- */

                    settingsPanels.forEach(
                        function (panel) {

                            panel.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* ----------------------------------------
                       SHOW TARGET PANEL
                    ---------------------------------------- */

                    const targetPanel =
                        document.querySelector(
                            `[data-setting-panel="${target}"]`
                        );


                    if (targetPanel) {

                        targetPanel.classList.add(
                            "active"
                        );


                        /* ------------------------------------
                           RESTART AOS ANIMATION
                        ------------------------------------ */

                        targetPanel.classList.remove(
                            "aos-animate"
                        );


                        setTimeout(
                            function () {

                                targetPanel.classList.add(
                                    "aos-animate"
                                );

                            },
                            50
                        );


                        if (
                            typeof AOS !==
                            "undefined"
                        ) {

                            AOS.refresh();

                        }

                    }

                }
            );

        }
    );


    /* ========================================================
       PROFILE NAME LIVE UPDATE
    ======================================================== */

    if (profileName) {

        profileName.addEventListener(
            "input",
            function () {

                let value =
                    this.value
                        .replace(
                            /[^A-Za-z\s]/g,
                            ""
                        )
                        .replace(
                            /\s+/g,
                            " "
                        );


                this.value =
                    value;


                if (adminName) {

                    adminName.textContent =
                        value.trim() ||
                        "Administrator";

                }

            }
        );

    }


    /* ========================================================
       PROFILE EMAIL LIVE UPDATE
    ======================================================== */

    if (profileEmail) {

        profileEmail.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                        .trim()
                        .toLowerCase();

            }
        );

    }


    /* ========================================================
       PHONE INPUT
    ======================================================== */

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /[^0-9+\-\s()]/g,
                        ""
                    );

            }
        );

    }


    /* ========================================================
       SAVE PROFILE
    ======================================================== */

    if (profileSaveButton) {

        profileSaveButton.addEventListener(
            "click",
            function () {

                const name =
                    profileName
                        ? profileName.value
                            .trim()
                        : "";

                const email =
                    profileEmail
                        ? profileEmail.value
                            .trim()
                            .toLowerCase()
                        : "";

                const phone =
                    phoneInput
                        ? phoneInput.value
                            .trim()
                        : "";


                /* ----------------------------------------
                   VALIDATE NAME
                ---------------------------------------- */

                if (!name) {

                    showToast(
                        "Please enter your full name.",
                        "error"
                    );

                    if (profileName) {

                        profileName.focus();

                    }

                    return;

                }


                /* ----------------------------------------
                   VALIDATE EMAIL
                ---------------------------------------- */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


                if (
                    !email ||
                    !emailPattern.test(
                        email
                    )
                ) {

                    showToast(
                        "Please enter a valid email address.",
                        "error"
                    );

                    if (profileEmail) {

                        profileEmail.focus();

                    }

                    return;

                }


                /* ----------------------------------------
                   SAVE PROFILE
                ---------------------------------------- */

                localStorage.setItem(
                    SETTINGS_NAME_KEY,
                    name
                );

                localStorage.setItem(
                    SETTINGS_EMAIL_KEY,
                    email
                );

                localStorage.setItem(
                    SETTINGS_PHONE_KEY,
                    phone
                );


                /* ----------------------------------------
                   UPDATE HEADER NAME
                ---------------------------------------- */

                if (adminName) {

                    adminName.textContent =
                        name;

                }


                /* ----------------------------------------
                   BUTTON LOADING STATE
                ---------------------------------------- */

                const originalHTML =
                    profileSaveButton.innerHTML;


                profileSaveButton.disabled =
                    true;


                profileSaveButton.innerHTML = `

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Saving...

                `;


                /* ----------------------------------------
                   SIMULATE SAVE
                ---------------------------------------- */

                setTimeout(
                    function () {

                        profileSaveButton.disabled =
                            false;

                        profileSaveButton.innerHTML =
                            originalHTML;


                        showToast(
                            "Profile information saved successfully.",
                            "success"
                        );

                    },
                    700
                );

            }
        );

    }


    /* ========================================================
       PROFILE PHOTO UPLOAD
    ======================================================== */

    if (uploadPhotoButton) {

        uploadPhotoButton.addEventListener(
            "click",
            function () {

                let fileInput =
                    document.getElementById(
                        "stacklyFinanceProfilePhotoInput"
                    );


                /* ----------------------------------------
                   CREATE FILE INPUT
                ---------------------------------------- */

                if (!fileInput) {

                    fileInput =
                        document.createElement(
                            "input"
                        );

                    fileInput.type =
                        "file";

                    fileInput.id =
                        "stacklyFinanceProfilePhotoInput";

                    fileInput.accept =
                        "image/png,image/jpeg,image/webp";

                    fileInput.style.display =
                        "none";

                    document.body.appendChild(
                        fileInput
                    );


                    /* ------------------------------------
                       FILE CHANGE
                    ------------------------------------ */

                    fileInput.addEventListener(
                        "change",
                        function () {

                            const file =
                                this.files &&
                                this.files[0];


                            if (!file) {
                                return;
                            }


                            /* ----------------------------
                               VALIDATE FILE SIZE
                            ---------------------------- */

                            const maxSize =
                                2 * 1024 * 1024;


                            if (
                                file.size >
                                maxSize
                            ) {

                                showToast(
                                    "Please select an image smaller than 2 MB.",
                                    "error"
                                );

                                this.value =
                                    "";

                                return;

                            }


                            /* ----------------------------
                               PREVIEW IMAGE
                            ---------------------------- */

                            const reader =
                                new FileReader();


                            reader.onload =
                                function (event) {

                                    if (
                                        profileAvatar
                                    ) {

                                        profileAvatar.innerHTML = `

                                            <img
                                                src="${event.target.result}"
                                                alt="Profile photo"
                                            >

                                        `;

                                    }


                                    showToast(
                                        "Profile photo updated successfully.",
                                        "success"
                                    );

                                };


                            reader.readAsDataURL(
                                file
                            );

                        }
                    );

                }


                fileInput.click();

            }
        );

    }


    /* ========================================================
       SECURITY
    ======================================================== */

    const securityButtons =
        document.querySelectorAll(
            ".stackly-finance-outline-button"
        );


    securityButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const action =
                        this.textContent
                            .trim()
                            .toLowerCase();


                    if (
                        action ===
                        "change"
                    ) {

                        showToast(
                            "Password management is ready to be connected.",
                            "success"
                        );

                    }


                    if (
                        action ===
                        "manage"
                    ) {

                        showToast(
                            "Session management is ready to be connected.",
                            "success"
                        );

                    }

                }
            );

        }
    );


    /* ========================================================
       TWO FACTOR AUTHENTICATION
    ======================================================== */

    const twoFactorToggle =
        document.querySelector(
            ".stackly-finance-security-item .stackly-finance-toggle input"
        );


    if (twoFactorToggle) {

        const savedTwoFactor =
            localStorage.getItem(
                SETTINGS_2FA_KEY
            );


        if (
            savedTwoFactor !==
            null
        ) {

            twoFactorToggle.checked =
                savedTwoFactor ===
                "true";

        }


        twoFactorToggle.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    SETTINGS_2FA_KEY,
                    this.checked
                );


                if (this.checked) {

                    showToast(
                        "Two-factor authentication enabled.",
                        "success"
                    );

                } else {

                    showToast(
                        "Two-factor authentication disabled.",
                        "warning"
                    );

                }

            }
        );

    }


    /* ========================================================
       NOTIFICATION TOGGLES
    ======================================================== */

    const notificationRows =
        document.querySelectorAll(
            ".stackly-finance-notification-row"
        );


    notificationRows.forEach(
        function (row, index) {

            const toggle =
                row.querySelector(
                    '.stackly-finance-toggle input'
                );


            if (!toggle) {
                return;
            }


            const storageKey =
                SETTINGS_NOTIFICATION_KEY +
                "_" +
                index;


            const savedValue =
                localStorage.getItem(
                    storageKey
                );


            if (
                savedValue !==
                null
            ) {

                toggle.checked =
                    savedValue ===
                    "true";

            }


            toggle.addEventListener(
                "change",
                function () {

                    localStorage.setItem(
                        storageKey,
                        this.checked
                    );


                    const heading =
                        row.querySelector(
                            "h4"
                        );


                    const title =
                        heading
                            ? heading.textContent
                                .trim()
                            : "Notification";


                    if (this.checked) {

                        showToast(
                            `${title} notifications enabled.`,
                            "success"
                        );

                    } else {

                        showToast(
                            `${title} notifications disabled.`,
                            "warning"
                        );

                    }

                }
            );

        }
    );


    /* ========================================================
       DASHBOARD PREFERENCES
    ======================================================== */

    const preferenceCards =
        document.querySelectorAll(
            ".stackly-finance-preference-card"
        );


    preferenceCards.forEach(
        function (card, index) {

            const select =
                card.querySelector(
                    "select"
                );


            if (!select) {
                return;
            }


            const storageKey =
                SETTINGS_PREFERENCE_KEY +
                "_" +
                index;


            const savedValue =
                localStorage.getItem(
                    storageKey
                );


            if (savedValue) {

                select.value =
                    savedValue;

            }


            select.addEventListener(
                "change",
                function () {

                    localStorage.setItem(
                        storageKey,
                        this.value
                    );


                    const heading =
                        card.querySelector(
                            "h4"
                        );


                    const title =
                        heading
                            ? heading.textContent
                                .trim()
                            : "Preference";


                    showToast(
                        `${title} updated successfully.`,
                        "success"
                    );

                }
            );

        }
    );


    /* ========================================================
       THEME OPTIONS
    ======================================================== */

    const themeCards =
        document.querySelectorAll(
            ".stackly-finance-theme-card"
        );


    const savedTheme =
        localStorage.getItem(
            SETTINGS_THEME_KEY
        );


    /* --------------------------------------------
       LOAD SAVED THEME
    -------------------------------------------- */

    if (savedTheme) {

        themeCards.forEach(
            function (card) {

                const radio =
                    card.querySelector(
                        'input[type="radio"]'
                    );


                if (
                    radio &&
                    radio.value ===
                    savedTheme
                ) {

                    radio.checked =
                        true;

                    card.classList.add(
                        "active"
                    );

                } else {

                    card.classList.remove(
                        "active"
                    );

                }

            }
        );


        applyTheme(
            savedTheme
        );

    }


    /* ========================================================
       THEME CARD EVENTS
    ======================================================== */

    themeCards.forEach(
        function (card) {

            const radio =
                card.querySelector(
                    'input[type="radio"]'
                );


            card.addEventListener(
                "click",
                function () {

                    if (!radio) {
                        return;
                    }


                    /* ------------------------------------
                       CHECK RADIO
                    ------------------------------------ */

                    radio.checked =
                        true;


                    /* ------------------------------------
                       ACTIVE CARD
                    ------------------------------------ */

                    themeCards.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    card.classList.add(
                        "active"
                    );


                    /* ------------------------------------
                       SAVE THEME
                    ------------------------------------ */

                    const selectedTheme =
                        radio.value;


                    localStorage.setItem(
                        SETTINGS_THEME_KEY,
                        selectedTheme
                    );


                    /* ------------------------------------
                       APPLY THEME
                    ------------------------------------ */

                    applyTheme(
                        selectedTheme
                    );


                    /* ------------------------------------
                       MESSAGE
                    ------------------------------------ */

                    const themeName =
                        selectedTheme ===
                        "light"
                            ? "Light Mode"
                            : selectedTheme ===
                                "dark"
                                ? "Dark Mode"
                                : "System Default";


                    showToast(
                        `${themeName} selected.`,
                        "success"
                    );

                }
            );

        }
    );


    /* ========================================================
       APPLY THEME
    ======================================================== */

    function applyTheme(theme) {

        const html =
            document.documentElement;


        if (theme === "dark") {

            html.setAttribute(
                "data-stackly-theme",
                "dark"
            );

            return;

        }


        if (theme === "light") {

            html.setAttribute(
                "data-stackly-theme",
                "light"
            );

            return;

        }


        if (theme === "system") {

            html.setAttribute(
                "data-stackly-theme",
                "system"
            );

            return;

        }

    }


    /* ========================================================
       SIGN OUT ALL DEVICES
    ======================================================== */

    const signOutButton =
        document.querySelector(
            ".stackly-finance-danger-button"
        );


    if (signOutButton) {

        signOutButton.addEventListener(
            "click",
            function () {

                const confirmSignOut =
                    window.confirm(
                        "Are you sure you want to sign out from all devices?"
                    );


                if (!confirmSignOut) {
                    return;
                }


                /* ----------------------------------------
                   CLEAR LOGIN SESSION
                ---------------------------------------- */

                localStorage.removeItem(
                    "loginEmail"
                );

                localStorage.removeItem(
                    "loginRole"
                );

                localStorage.removeItem(
                    "loginName"
                );


                /* ----------------------------------------
                   SUCCESS MESSAGE
                ---------------------------------------- */

                showToast(
                    "All active sessions have been signed out.",
                    "success"
                );


                /* ----------------------------------------
                   REDIRECT
                ---------------------------------------- */

                setTimeout(
                    function () {

                        window.location.href =
                            "index.html";

                    },
                    1200
                );

            }
        );

    }


    /* ========================================================
       ENTER KEY SUPPORT FOR PROFILE FORM
    ======================================================== */

    if (profileName) {

        profileName.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();

                    if (
                        profileSaveButton
                    ) {

                        profileSaveButton.click();

                    }

                }

            }
        );

    }


    /* ========================================================
       REFRESH AOS
    ======================================================== */

    if (typeof AOS !== "undefined") {

        setTimeout(
            function () {

                AOS.refresh();

            },
            300
        );

    }


    /* ========================================================
       SETTINGS PAGE READY
    ======================================================== */

    console.log(
        "Stackly Finance Settings initialized successfully."
    );

});

document.addEventListener("DOMContentLoaded", function () {

    const profileLabel = document.getElementById(
        "stacklyFinanceAdminProfileLabel"
    );

    const savedEmail = localStorage.getItem("loginEmail");

    if (profileLabel && savedEmail) {

        const emailName = savedEmail
            .split("@")[0]
            .trim();

        const firstWord = emailName
            .split(/[._-]/)[0]
            .replace(/[0-9]+/g, "")
            .trim();

        const displayName = firstWord
            ? firstWord.charAt(0).toUpperCase() +
              firstWord.slice(1).toLowerCase()
            : "Admin";

        profileLabel.textContent = displayName;
    }

});

document.addEventListener("DOMContentLoaded", function () {

    const welcomeHeading = document.getElementById(
        "stacklyFinanceAdminWelcome"
    );

    const savedEmail = localStorage.getItem("loginEmail");

    if (welcomeHeading && savedEmail) {

        const emailName = savedEmail
            .split("@")[0]
            .trim();

        const firstWord = emailName
            .split(/[._-]/)[0]
            .replace(/[0-9]+/g, "")
            .trim();

        const displayName = firstWord
            ? firstWord.charAt(0).toUpperCase() +
              firstWord.slice(1).toLowerCase()
            : "Admin";

        welcomeHeading.textContent =
            `Welcome back, ${displayName}`;
    }

});