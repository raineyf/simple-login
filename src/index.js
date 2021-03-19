(() => {
    if (!document.querySelector("form")) return;
    const loginForm = document.querySelector("#login-form");
    const signupForm = document.querySelector("#signup-form");
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    const errorMessages = document.querySelectorAll(".input-error");
    const userError = document.querySelector("#username-error");
    const userErrorMessage = userError.innerHTML;
    const passError = document.querySelector("#password-error");
    const clearErrorMessages = () => {
        errorMessages.forEach((m) => {
            m.classList.remove("active");
            userError.innerHTML = userErrorMessage;
        });
    };
    const getFormData = () => {
        let formData = {
            username: usernameInput.value,
            password: passwordInput.value,
        };
        return formData;
    };
    if (loginForm) {
        const submitForm = (formData) => {
            clearErrorMessages();
            const options = {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            fetch("/login", options)
                .then((res) => res.json())
                .then((json) => {
                    if (json.loginStatus == "success") {
                        window.location = json.redirect;
                    } else if (json.message == "user does not exist") {
                        userError.classList.add("active");
                        usernameInput.focus();
                    } else if (
                        json.message == "username and password do not match"
                    ) {
                        passError.classList.add("active");
                        passwordInput.focus();
                    }
                });
        };
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            submitForm(getFormData());
        });
    }
    if (signupForm) {
        const submitForm = (formData) => {
            clearErrorMessages();
            const userVal = usernameInput.value;
            const passVal = passwordInput.value;
            const hasNumber = (myString) => {
                return /\d/.test(myString);
            };
            if (userVal.length < 5) {
                userError.classList.add("active");
                usernameInput.focus();
            } else if (
                passVal.toLowerCase() === passVal ||
                passVal.toUpperCase() === passVal ||
                !hasNumber(passVal)
            ) {
                passError.classList.add("active");
                passwordInput.focus();
            } else {
                const options = {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                fetch("/signup", options)
                    .then((res) => res.json())
                    .then((json) => {
                        if (json.signupStatus == "success") {
                            window.alert("Account Added!");
                        } else if (
                            json.signupStatus == "fail" &&
                            json.message == "Username unavailable"
                        ) {
                            userError.innerHTML = json.message;
                            userError.classList.add("active");
                            usernameInput.focus();
                        }
                    });
            }
        };

        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            submitForm(getFormData());
        });
    }
})();
