/* ============================================================
   STACKLY FINANCE
   LOGIN + SIGN UP JAVASCRIPT

   LOGIN:
   - USER MUST MANUALLY ENTER EMAIL
   - EMAIL MUST HAVE VALID FORMAT
   - USER SELECTS ADMIN OR CLIENT
   - PASSWORD MUST HAVE 6+ CHARACTERS
   - NO ACCOUNT CHECK
   - NO EMAIL MATCH CHECK
   - NO PASSWORD MATCH CHECK
   - ANY VALID EMAIL CAN LOGIN

   SIGNUP:
   - VALIDATE DETAILS
   - SAVE ACCOUNT
   - MOVE TO LOGIN
   - LOGIN EMAIL REMAINS EMPTY
   - USER MUST ENTER EMAIL MANUALLY

   ADMIN  -> admin.html
   CLIENT -> client.html

   PROFILE:
   - EMAIL COMES FROM loginEmail
   - PROFILE EMAIL SHOWS ACTUAL LOGIN EMAIL
   - NAME COMES FROM FIRST WORD OF EMAIL
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
       MAIN ELEMENTS
    ======================================================== */

    const loginTab =
        document.getElementById(
            "stacklyFinanceLoginTab"
        );

    const signupTab =
        document.getElementById(
            "stacklyFinanceSignupTab"
        );

    const authSlider =
        document.getElementById(
            "stacklyFinanceAuthSlider"
        );

    const loginForm =
        document.getElementById(
            "stacklyFinanceLoginForm"
        );

    const signupForm =
        document.getElementById(
            "stacklyFinanceSignupForm"
        );

    const goSignup =
        document.getElementById(
            "stacklyFinanceGoSignup"
        );

    const goLogin =
        document.getElementById(
            "stacklyFinanceGoLogin"
        );

    const authLabel =
        document.getElementById(
            "stacklyFinanceAuthLabel"
        );

    const authTitle =
        document.getElementById(
            "stacklyFinanceAuthTitle"
        );

    const authIcon =
        document.getElementById(
            "stacklyFinanceAuthFormIcon"
        );


    /* ========================================================
       LOGIN ELEMENTS
    ======================================================== */

    const loginEmail =
        document.getElementById(
            "stacklyFinanceLoginEmail"
        );

    const loginRole =
        document.getElementById(
            "stacklyFinanceLoginRole"
        );

    const loginPassword =
        document.getElementById(
            "stacklyFinanceLoginPassword"
        );

    const rememberMe =
        document.getElementById(
            "stacklyFinanceRemember"
        );

    const loginMessage =
        document.getElementById(
            "stacklyFinanceLoginMessage"
        );


    /* ========================================================
       SIGNUP ELEMENTS
    ======================================================== */

    const signupName =
        document.getElementById(
            "stacklyFinanceSignupName"
        );

    const signupEmail =
        document.getElementById(
            "stacklyFinanceSignupEmail"
        );

    const signupRole =
        document.getElementById(
            "stacklyFinanceSignupRole"
        );

    const signupPassword =
        document.getElementById(
            "stacklyFinanceSignupPassword"
        );

    const signupConfirmPassword =
        document.getElementById(
            "stacklyFinanceSignupConfirmPassword"
        );

    const signupTerms =
        document.getElementById(
            "stacklyFinanceTerms"
        );

    const signupMessage =
        document.getElementById(
            "stacklyFinanceSignupMessage"
        );


    /* ========================================================
       LOCAL STORAGE KEYS
    ======================================================== */

    const ACCOUNT_STORAGE_KEY =
        "stacklyFinanceAccounts";

    const LOGIN_EMAIL_KEY =
        "loginEmail";

    const LOGIN_ROLE_KEY =
        "loginRole";

    const LOGIN_NAME_KEY =
        "loginName";

    const REMEMBER_EMAIL_KEY =
        "stacklyFinanceRememberedEmail";


    /* ========================================================
       ACCOUNT FUNCTIONS
       ONLY USED FOR SIGNUP
    ======================================================== */

    function getAccounts() {

        try {

            const data =
                localStorage.getItem(
                    ACCOUNT_STORAGE_KEY
                );

            if (!data) {
                return [];
            }

            const accounts =
                JSON.parse(data);

            return Array.isArray(accounts)
                ? accounts
                : [];

        } catch (error) {

            console.error(
                "Unable to read accounts:",
                error
            );

            return [];

        }

    }


    function saveAccounts(accounts) {

        try {

            localStorage.setItem(
                ACCOUNT_STORAGE_KEY,
                JSON.stringify(accounts)
            );

            return true;

        } catch (error) {

            console.error(
                "Unable to save accounts:",
                error
            );

            return false;

        }

    }


    /* ========================================================
       VALIDATION HELPERS
    ======================================================== */

    function normalizeEmail(email) {

        return email
            .trim()
            .toLowerCase();

    }


    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        return emailPattern.test(
            email.trim()
        );

    }


    function isValidName(name) {

        const namePattern =
            /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;

        return namePattern.test(
            name.trim()
        );

    }


    function isValidPassword(password) {

        return password.length >= 6;

    }


    /* ========================================================
       GET DISPLAY NAME FROM EMAIL

       arul@gmail.com
       -> Arul

       arul.stefy@gmail.com
       -> Arul

       john.doe@gmail.com
       -> John

       rahul_kumar@gmail.com
       -> Rahul

       sarah-smith@gmail.com
       -> Sarah
    ======================================================== */

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


        const firstWord =
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


    /* ========================================================
       MESSAGE FUNCTIONS
    ======================================================== */

    function showMessage(
        element,
        message,
        type
    ) {

        if (!element) {
            return;
        }


        element.textContent =
            message;


        element.classList.remove(
            "success",
            "error"
        );


        element.classList.add(
            type
        );


        element.style.display =
            "block";

    }


    function clearMessage(element) {

        if (!element) {
            return;
        }


        element.textContent =
            "";


        element.classList.remove(
            "success",
            "error"
        );


        element.style.display =
            "none";

    }


    /* ========================================================
       ERROR FUNCTIONS
    ======================================================== */

    function setInvalid(element) {

        if (!element) {
            return;
        }


        element.classList.add(
            "stackly-finance-input-error"
        );

    }


    function clearInvalid(element) {

        if (!element) {
            return;
        }


        element.classList.remove(
            "stackly-finance-input-error"
        );

    }


    function clearFormErrors(form) {

        if (!form) {
            return;
        }


        form.querySelectorAll(
            "input, textarea, select"
        ).forEach(function (field) {

            clearInvalid(field);

        });


        form.querySelectorAll(
            ".stackly-finance-role-dropdown"
        ).forEach(function (dropdown) {

            clearInvalid(dropdown);

        });

    }


    /* ========================================================
       ROLE FUNCTIONS
    ======================================================== */

    function getRoleName(role) {

        if (role === "admin") {
            return "Admin";
        }


        if (role === "client") {
            return "Client";
        }


        return "";

    }


    function getRoleIcon(role) {

        if (role === "admin") {
            return "fa-user-shield";
        }


        if (role === "client") {
            return "fa-user";
        }


        return "fa-user-tie";

    }


    /* ========================================================
       RESET ROLE DROPDOWN
    ======================================================== */

    function resetRoleDropdown(dropdownId) {

        const dropdown =
            document.getElementById(
                dropdownId
            );


        if (!dropdown) {
            return;
        }


        const hiddenInput =
            dropdown.parentElement
                ? dropdown.parentElement.querySelector(
                    'input[type="hidden"]'
                )
                : null;


        const roleText =
            dropdown.querySelector(
                "[id$='RoleText']"
            );


        const roleIcon =
            dropdown.querySelector(
                ".stackly-finance-role-selected i"
            );


        if (hiddenInput) {

            hiddenInput.value =
                "";

        }


        if (roleText) {

            roleText.textContent =
                "Select Role";

        }


        if (roleIcon) {

            roleIcon.className =
                "fa-solid fa-user-tie";

        }


        dropdown.classList.remove(
            "open"
        );


        const trigger =
            dropdown.querySelector(
                ".stackly-finance-role-trigger"
            );


        if (trigger) {

            trigger.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        dropdown
            .querySelectorAll(
                ".stackly-finance-role-option"
            )
            .forEach(function (option) {

                option.classList.remove(
                    "selected"
                );

                option.removeAttribute(
                    "aria-selected"
                );

            });

    }


    /* ========================================================
       SET ROLE DROPDOWN VALUE
    ======================================================== */

    function setRoleDropdownValue(
        dropdown,
        role
    ) {

        if (!dropdown) {
            return;
        }


        const hiddenInput =
            dropdown.parentElement
                ? dropdown.parentElement.querySelector(
                    'input[type="hidden"]'
                )
                : null;


        const roleText =
            dropdown.querySelector(
                "[id$='RoleText']"
            );


        const roleIcon =
            dropdown.querySelector(
                ".stackly-finance-role-selected i"
            );


        if (hiddenInput) {

            hiddenInput.value =
                role;

        }


        if (roleText) {

            roleText.textContent =
                getRoleName(role);

        }


        if (roleIcon) {

            roleIcon.className =
                "fa-solid " +
                getRoleIcon(role);

        }


        clearInvalid(
            dropdown
        );

    }


    /* ========================================================
       DASHBOARD REDIRECT
    ======================================================== */

    function redirectByRole(role) {

        if (role === "admin") {

            window.location.href =
                "admin.html";

            return;

        }


        if (role === "client") {

            window.location.href =
                "client.html";

            return;

        }

    }


    /* ========================================================
       STORE LOGIN DETAILS

       IMPORTANT:
       Stores the actual login email.
       Stores the formatted display name.
    ======================================================== */

    function storeLoginDetails(
        name,
        email,
        role
    ) {

        localStorage.setItem(
            LOGIN_NAME_KEY,
            name
        );


        localStorage.setItem(
            LOGIN_EMAIL_KEY,
            email
        );


        localStorage.setItem(
            LOGIN_ROLE_KEY,
            role
        );

    }


    /* ========================================================
       CLOSE ALL ROLE DROPDOWNS
    ======================================================== */

    const roleDropdowns =
        document.querySelectorAll(
            ".stackly-finance-role-dropdown"
        );


    function closeAllRoleDropdowns(
        exceptDropdown = null
    ) {

        roleDropdowns.forEach(
            function (dropdown) {

                if (
                    dropdown !==
                    exceptDropdown
                ) {

                    dropdown.classList.remove(
                        "open"
                    );


                    const trigger =
                        dropdown.querySelector(
                            ".stackly-finance-role-trigger"
                        );


                    if (trigger) {

                        trigger.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            }
        );

    }


    /* ========================================================
       CUSTOM ROLE DROPDOWN
    ======================================================== */

    roleDropdowns.forEach(
        function (dropdown) {

            const trigger =
                dropdown.querySelector(
                    ".stackly-finance-role-trigger"
                );


            const roleText =
                dropdown.querySelector(
                    "[id$='RoleText']"
                );


            const roleIcon =
                dropdown.querySelector(
                    ".stackly-finance-role-selected i"
                );


            const hiddenInput =
                dropdown.parentElement
                    ? dropdown.parentElement.querySelector(
                        'input[type="hidden"]'
                    )
                    : null;


            const options =
                dropdown.querySelectorAll(
                    ".stackly-finance-role-option"
                );


            if (!trigger) {

                console.warn(
                    "Role dropdown trigger not found:",
                    dropdown
                );

                return;

            }


            /* ==================================================
               TRIGGER CLICK
            ================================================== */

            trigger.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();


                    const currentlyOpen =
                        dropdown.classList.contains(
                            "open"
                        );


                    closeAllRoleDropdowns(
                        dropdown
                    );


                    if (currentlyOpen) {

                        dropdown.classList.remove(
                            "open"
                        );


                        trigger.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    } else {

                        dropdown.classList.add(
                            "open"
                        );


                        trigger.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );


            /* ==================================================
               ROLE OPTIONS
            ================================================== */

            options.forEach(
                function (option) {

                    option.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();
                            event.stopPropagation();


                            const selectedRole =
                                option.getAttribute(
                                    "data-role"
                                );


                            if (
                                selectedRole !== "admin" &&
                                selectedRole !== "client"
                            ) {

                                console.warn(
                                    "Invalid role:",
                                    selectedRole
                                );

                                return;

                            }


                            /* SET HIDDEN INPUT */

                            if (hiddenInput) {

                                hiddenInput.value =
                                    selectedRole;

                            }


                            /* UPDATE TEXT */

                            if (roleText) {

                                roleText.textContent =
                                    getRoleName(
                                        selectedRole
                                    );

                            }


                            /* UPDATE ICON */

                            if (roleIcon) {

                                roleIcon.className =
                                    "fa-solid " +
                                    getRoleIcon(
                                        selectedRole
                                    );

                            }


                            /* CLEAR ERROR */

                            clearInvalid(
                                dropdown
                            );


                            /* SELECT OPTION */

                            options.forEach(
                                function (item) {

                                    item.classList.remove(
                                        "selected"
                                    );

                                    item.removeAttribute(
                                        "aria-selected"
                                    );

                                }
                            );


                            option.classList.add(
                                "selected"
                            );


                            option.setAttribute(
                                "aria-selected",
                                "true"
                            );


                            /* CLOSE DROPDOWN */

                            dropdown.classList.remove(
                                "open"
                            );


                            trigger.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }
                    );

                }
            );


            /* ==================================================
               DROPDOWN CLICK
            ================================================== */

            dropdown.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                }
            );

        }
    );


    /* ========================================================
       CLOSE DROPDOWN OUTSIDE
    ======================================================== */

    document.addEventListener(
        "click",
        function () {

            closeAllRoleDropdowns();

        }
    );


    /* ========================================================
       ESCAPE KEY
    ======================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeAllRoleDropdowns();

            }

        }
    );


    /* ========================================================
       LOGIN VIEW
    ======================================================== */

    function showLogin() {

        if (loginForm) {

            loginForm.classList.add(
                "active"
            );

        }


        if (signupForm) {

            signupForm.classList.remove(
                "active"
            );

        }


        if (loginTab) {

            loginTab.classList.add(
                "active"
            );

        }


        if (signupTab) {

            signupTab.classList.remove(
                "active"
            );

        }


        if (authSlider) {

            authSlider.style.transform =
                "translateX(0)";

        }


        if (authLabel) {

            authLabel.textContent =
                "WELCOME BACK";

        }


        if (authTitle) {

            authTitle.textContent =
                "Sign in to your account";

        }


        if (authIcon) {

            authIcon.innerHTML =
                '<i class="fa-solid fa-right-to-bracket"></i>';

        }


        clearMessage(
            loginMessage
        );


        clearMessage(
            signupMessage
        );


        clearFormErrors(
            loginForm
        );


        clearFormErrors(
            signupForm
        );


        closeAllRoleDropdowns();

    }


    /* ========================================================
       SIGNUP VIEW
    ======================================================== */

    function showSignup() {

        if (loginForm) {

            loginForm.classList.remove(
                "active"
            );

        }


        if (signupForm) {

            signupForm.classList.add(
                "active"
            );

        }


        if (loginTab) {

            loginTab.classList.remove(
                "active"
            );

        }


        if (signupTab) {

            signupTab.classList.add(
                "active"
            );

        }


        if (authSlider) {

            authSlider.style.transform =
                "translateX(100%)";

        }


        if (authLabel) {

            authLabel.textContent =
                "GET STARTED";

        }


        if (authTitle) {

            authTitle.textContent =
                "Create your account";

        }


        if (authIcon) {

            authIcon.innerHTML =
                '<i class="fa-solid fa-user-plus"></i>';

        }


        clearMessage(
            loginMessage
        );


        clearMessage(
            signupMessage
        );


        clearFormErrors(
            loginForm
        );


        clearFormErrors(
            signupForm
        );


        closeAllRoleDropdowns();

    }


    /* ========================================================
       TAB EVENTS
    ======================================================== */

    if (loginTab) {

        loginTab.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showLogin();

            }
        );

    }


    if (signupTab) {

        signupTab.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showSignup();

            }
        );

    }


    if (goSignup) {

        goSignup.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showSignup();

            }
        );

    }


    if (goLogin) {

        goLogin.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showLogin();

            }
        );

    }


    /* ========================================================
       PASSWORD SHOW / HIDE
    ======================================================== */

    const passwordToggles =
        document.querySelectorAll(
            ".stackly-finance-password-toggle"
        );


    passwordToggles.forEach(
        function (toggle) {

            toggle.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();


                    const targetId =
                        toggle.getAttribute(
                            "data-target"
                        );


                    const passwordField =
                        document.getElementById(
                            targetId
                        );


                    if (!passwordField) {
                        return;
                    }


                    const icon =
                        toggle.querySelector(
                            "i"
                        );


                    if (
                        passwordField.type ===
                        "password"
                    ) {

                        passwordField.type =
                            "text";


                        if (icon) {

                            icon.classList.remove(
                                "fa-eye"
                            );

                            icon.classList.add(
                                "fa-eye-slash"
                            );

                        }


                        toggle.setAttribute(
                            "aria-label",
                            "Hide password"
                        );

                    } else {

                        passwordField.type =
                            "password";


                        if (icon) {

                            icon.classList.remove(
                                "fa-eye-slash"
                            );

                            icon.classList.add(
                                "fa-eye"
                            );

                        }


                        toggle.setAttribute(
                            "aria-label",
                            "Show password"
                        );

                    }

                }
            );

        }
    );


    /* ========================================================
       SIGNUP NAME INPUT
    ======================================================== */

    if (signupName) {

        signupName.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /[^A-Za-z\s]/g,
                        ""
                    );


                clearInvalid(
                    this
                );

            }
        );


        signupName.addEventListener(
            "blur",
            function () {

                this.value =
                    this.value
                        .replace(
                            /\s+/g,
                            " "
                        )
                        .trim();

            }
        );

    }


    /* ========================================================
       LIVE INPUT ERROR CLEAR
    ======================================================== */

    document
        .querySelectorAll(
            ".stackly-finance-auth-input input"
        )
        .forEach(
            function (input) {

                input.addEventListener(
                    "input",
                    function () {

                        clearInvalid(
                            this
                        );

                    }
                );

            }
        );


    /* ========================================================
       TERMS ERROR CLEAR
    ======================================================== */

    if (signupTerms) {

        signupTerms.addEventListener(
            "change",
            function () {

                if (this.checked) {

                    clearInvalid(
                        this
                    );

                }

            }
        );

    }


    /* ========================================================
       LOGIN FORM

       IMPORTANT:
       - NO ACCOUNT CHECK
       - NO SIGNUP EMAIL MATCH
       - NO SIGNUP PASSWORD MATCH
       - ANY VALID EMAIL CAN LOGIN
       - DISPLAY NAME IS CREATED FROM EMAIL
    ======================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* CLEAR PREVIOUS ERRORS */

                clearMessage(
                    loginMessage
                );


                clearFormErrors(
                    loginForm
                );


                /* GET VALUES */

                const email =
                    loginEmail
                        ? normalizeEmail(
                            loginEmail.value
                        )
                        : "";


                const role =
                    loginRole
                        ? loginRole.value
                        : "";


                const password =
                    loginPassword
                        ? loginPassword.value
                        : "";


                let valid = true;


                /* EMAIL VALIDATION */

                if (
                    !email ||
                    !isValidEmail(email)
                ) {

                    setInvalid(
                        loginEmail
                    );

                    valid = false;

                }


                /* ROLE VALIDATION */

                const loginRoleDropdown =
                    document.getElementById(
                        "stacklyFinanceLoginRoleDropdown"
                    );


                if (!role) {

                    setInvalid(
                        loginRoleDropdown
                    );

                    valid = false;

                }


                /* PASSWORD VALIDATION */

                if (
                    !password ||
                    !isValidPassword(
                        password
                    )
                ) {

                    setInvalid(
                        loginPassword
                    );

                    valid = false;

                }


                /* INVALID LOGIN */

                if (!valid) {

                    showMessage(
                        loginMessage,
                        "Please enter a valid email, select a role, and enter a password with at least 6 characters.",
                        "error"
                    );

                    return;

                }


                /* ==================================================
                   CREATE DISPLAY NAME FROM LOGIN EMAIL

                   arul.stefy@gmail.com
                   -> Arul
                ================================================== */

                const displayName =
                    getNameFromEmail(
                        email
                    );


                /* ==================================================
                   STORE LOGIN DETAILS

                   IMPORTANT:
                   Do NOT store "User".
                ================================================== */

                storeLoginDetails(
                    displayName,
                    email,
                    role
                );


                /* REMEMBER ME */

                if (
                    rememberMe &&
                    rememberMe.checked
                ) {

                    localStorage.setItem(
                        REMEMBER_EMAIL_KEY,
                        email
                    );

                } else {

                    localStorage.removeItem(
                        REMEMBER_EMAIL_KEY
                    );

                }


                /* SUCCESS */

                showMessage(
                    loginMessage,
                    "Login successful. Redirecting...",
                    "success"
                );


                /* REDIRECT */

                setTimeout(
                    function () {

                        redirectByRole(
                            role
                        );

                    },
                    500
                );

            }
        );

    }


    /* ========================================================
       SIGNUP FORM
    ======================================================== */

    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* CLEAR OLD ERRORS */

                clearMessage(
                    signupMessage
                );


                clearFormErrors(
                    signupForm
                );


                /* GET VALUES */

                const name =
                    signupName
                        ? signupName.value
                            .replace(
                                /\s+/g,
                                " "
                            )
                            .trim()
                        : "";


                const email =
                    signupEmail
                        ? normalizeEmail(
                            signupEmail.value
                        )
                        : "";


                const role =
                    signupRole
                        ? signupRole.value
                        : "";


                const password =
                    signupPassword
                        ? signupPassword.value
                        : "";


                const confirmPassword =
                    signupConfirmPassword
                        ? signupConfirmPassword.value
                        : "";


                const termsAccepted =
                    signupTerms
                        ? signupTerms.checked
                        : false;


                let valid = true;


                /* NAME */

                if (
                    !name ||
                    !isValidName(name)
                ) {

                    setInvalid(
                        signupName
                    );

                    valid = false;

                }


                /* EMAIL */

                if (
                    !email ||
                    !isValidEmail(email)
                ) {

                    setInvalid(
                        signupEmail
                    );

                    valid = false;

                }


                /* ROLE */

                const signupRoleDropdown =
                    document.getElementById(
                        "stacklyFinanceSignupRoleDropdown"
                    );


                if (!role) {

                    setInvalid(
                        signupRoleDropdown
                    );

                    valid = false;

                }


                /* PASSWORD */

                if (
                    !password ||
                    !isValidPassword(
                        password
                    )
                ) {

                    setInvalid(
                        signupPassword
                    );

                    valid = false;

                }


                /* CONFIRM PASSWORD */

                if (
                    !confirmPassword ||
                    password !==
                    confirmPassword
                ) {

                    setInvalid(
                        signupConfirmPassword
                    );

                    valid = false;

                }


                /* TERMS */

                if (!termsAccepted) {

                    setInvalid(
                        signupTerms
                    );

                    valid = false;

                }


                /* INVALID SIGNUP */

                if (!valid) {

                    showMessage(
                        signupMessage,
                        "Please enter all details in the correct format.",
                        "error"
                    );

                    return;

                }


                /* GET EXISTING ACCOUNTS */

                const accounts =
                    getAccounts();


                /* DUPLICATE EMAIL CHECK */

                const existingAccount =
                    accounts.find(
                        function (user) {

                            return (
                                normalizeEmail(
                                    user.email ||
                                    ""
                                ) === email
                            );

                        }
                    );


                if (existingAccount) {

                    setInvalid(
                        signupEmail
                    );


                    showMessage(
                        signupMessage,
                        "This email is already registered. Please use another email.",
                        "error"
                    );


                    return;

                }


                /* CREATE ACCOUNT */

                const newAccount = {

                    name:
                        name,

                    email:
                        email,

                    role:
                        role,

                    password:
                        password,

                    createdAt:
                        new Date()
                            .toISOString()

                };


                accounts.push(
                    newAccount
                );


                /* SAVE ACCOUNT */

                const saved =
                    saveAccounts(
                        accounts
                    );


                if (!saved) {

                    showMessage(
                        signupMessage,
                        "Unable to create the account. Please try again.",
                        "error"
                    );

                    return;

                }


                /* SIGNUP SUCCESS */

                showMessage(
                    signupMessage,
                    "Account created successfully. Moving to login...",
                    "success"
                );


                /* ==================================================
                   MOVE TO LOGIN

                   IMPORTANT:
                   Login email remains EMPTY.
                ================================================== */

                setTimeout(
                    function () {


                        /* CLEAR LOGIN EMAIL */

                        if (loginEmail) {

                            loginEmail.value =
                                "";

                        }


                        /* CLEAR LOGIN PASSWORD */

                        if (loginPassword) {

                            loginPassword.value =
                                "";

                        }


                        /* CLEAR LOGIN ROLE */

                        if (loginRole) {

                            loginRole.value =
                                "";

                        }


                        /* RESET LOGIN DROPDOWN */

                        resetRoleDropdown(
                            "stacklyFinanceLoginRoleDropdown"
                        );


                        /* RESET REMEMBER ME */

                        if (rememberMe) {

                            rememberMe.checked =
                                false;

                        }


                        /* REMOVE REMEMBERED EMAIL */

                        localStorage.removeItem(
                            REMEMBER_EMAIL_KEY
                        );


                        /* SHOW LOGIN */

                        showLogin();


                        /* FINAL EMAIL RESET */

                        if (loginEmail) {

                            loginEmail.value =
                                "";

                        }

                    },
                    700
                );

            }
        );

    }


    /* ========================================================
       ROLE DROPDOWN ERROR CLEAR
    ======================================================== */

    roleDropdowns.forEach(
        function (dropdown) {

            dropdown.addEventListener(
                "click",
                function () {

                    clearInvalid(
                        dropdown
                    );

                }
            );

        }
    );


    /* ========================================================
       INITIAL LOGIN STATE

       IMPORTANT:
       LOGIN EMAIL IS ALWAYS EMPTY
       ON PAGE LOAD.
    ======================================================== */

    if (loginEmail) {

        loginEmail.value =
            "";

    }


    if (loginPassword) {

        loginPassword.value =
            "";

    }


    if (loginRole) {

        loginRole.value =
            "";

    }


    if (rememberMe) {

        rememberMe.checked =
            false;

    }


    /* ========================================================
       RESET LOGIN DROPDOWN
    ======================================================== */

    resetRoleDropdown(
        "stacklyFinanceLoginRoleDropdown"
    );


    /* ========================================================
       RESET SIGNUP DROPDOWN
    ======================================================== */

    resetRoleDropdown(
        "stacklyFinanceSignupRoleDropdown"
    );


    /* ========================================================
       INITIAL VIEW
    ======================================================== */

    showLogin();

});


/* ============================================================
   STACKLY FINANCE
   LOGIN DATA FROM LOCAL STORAGE

   THIS PART RUNS ON:
   - client.html
   - client-profile.html
   - other client dashboard pages

   It reads:
   loginEmail
   loginName

   Then updates:
   - Header email
   - Sidebar name
   - Profile full name
   - Profile hero name
   - Profile email
============================================================ */


/* ============================================================
   GET SAVED LOGIN DATA
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
   FALLBACK EMAIL
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


/* ============================================================
   DEFAULT EMAIL

   Only used when no login email exists.
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

function getClientDisplayNameFromEmail(email) {

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


    /* ========================================================
       ONLY FIRST WORD

       arul.stefy@gmail.com
       -> Arul

       john.doe@gmail.com
       -> John
    ======================================================== */

    const firstWord =
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
   CREATE DISPLAY NAME

   Replace old generic names.
============================================================ */

if (
    !savedName ||
    savedName.trim() === "" ||
    savedName === "User" ||
    savedName === "Client User"
) {

    savedName =
        getClientDisplayNameFromEmail(
            savedEmail
        );

}


/* ============================================================
   SAVE DISPLAY NAME
============================================================ */

localStorage.setItem(
    "loginName",
    savedName
);


/* ============================================================
   HEADER EMAIL
============================================================ */

const emailElement =
    document.getElementById(
        "stacklyFinanceClientEmail"
    );


if (emailElement) {

    emailElement.textContent =
        savedEmail;

}


/* ============================================================
   SIDEBAR NAME
============================================================ */

const sidebarName =
    document.getElementById(
        "stacklyFinanceClientSidebarName"
    );


if (sidebarName) {

    sidebarName.textContent =
        savedName;

}


/* ============================================================
   PROFILE FULL NAME
============================================================ */

const profileFullName =
    document.getElementById(
        "stkprofileFullName"
    );


if (profileFullName) {

    profileFullName.textContent =
        savedName;

}


/* ============================================================
   PROFILE HERO NAME
============================================================ */

const profileHeroName =
    document.getElementById(
        "stkprofileHeroName"
    );


if (profileHeroName) {

    profileHeroName.textContent =
        savedName;

}


/* ============================================================
   PROFILE EMAIL ADDRESS

   THIS IS THE IMPORTANT PART.

   The actual login email is inserted
   into the <strong> element.
============================================================ */

const profileEmailAddress =
    document.getElementById(
        "stkprofileEmailAddress"
    );


if (profileEmailAddress) {

    profileEmailAddress.textContent =
        savedEmail;

}