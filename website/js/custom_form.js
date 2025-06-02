window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const foodRadios = Array.from(form.elements["food"]);
    const foodDetails = document.getElementById("foodDetails");

    if (foodDetails) {
        foodRadios.forEach((radio) => {
            radio.addEventListener("change", () => {
                foodDetails.style.display =
                    radio.value === "yes" && radio.checked ? "block" : "none";
            });
        });
    }

    const requiredFields = [
        "eventName",
        "orgName",
        "date",
        "startTime",
        "endTime",
        "location",
        "description",
    ];

    requiredFields.forEach((fieldName) => {
        const field = form.elements[fieldName];
        if (field) {
            field.addEventListener("blur", () => validateField(field));
            field.addEventListener("input", () => clearFieldError(field));
        }
    });

    foodRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
            clearFieldError(form.querySelector(".food-group"), "radio");
        });
    });

    function validateField(field) {
        const value = field.value.trim();

        if (field.hasAttribute("required") && !value) {
            showFieldError(field, `${getFieldLabel(field)} is required`);
            return false;
        }

        if (field.name === "endTime") {
            const startTime = form.elements["startTime"].value;
            if (startTime && value && value <= startTime) {
                showFieldError(field, "End time must be after start time");
                return false;
            }
        }

        clearFieldError(field);
        return true;
    }

    function validateRadioGroup() {
        const foodRadioGroup = form.querySelector(".food-group");
        const isChecked = foodRadios.some((radio) => radio.checked);

        if (!isChecked) {
            showFieldError(
                foodRadioGroup,
                "Please select whether food will be provided",
                "radio",
            );
            return false;
        }

        clearFieldError(foodRadioGroup, "radio");
        return true;
    }

    function showFieldError(field, message, type = "input") {
        const fieldContainer = field.closest(".form-group");
        clearFieldError(field, type);

        if (type === "input") {
            field.classList.add("error");
        }

        fieldContainer.classList.add("has-error");

        const errorElement = document.createElement("span");
        errorElement.className =
            type === "radio" ? "radio-group-error" : "error-message";
        errorElement.textContent = message;

        if (type === "radio") {
            fieldContainer.appendChild(errorElement);
        } else {
            field.insertAdjacentElement("afterend", errorElement);
        }
    }

    function clearFieldError(field, type = "input") {
        const fieldContainer = field.closest(".form-group");

        if (type === "input") {
            field.classList.remove("error", "success");
        }

        fieldContainer.classList.remove("has-error");

        const errorSelector =
            type === "radio" ? ".radio-group-error" : ".error-message";
        const existingError = fieldContainer.querySelector(errorSelector);
        if (existingError) {
            existingError.remove();
        }
    }

    function getFieldLabel(field) {
        const fieldContainer = field.closest(".form-group");
        const label = fieldContainer.querySelector("label");
        if (label) {
            const labelClone = label.cloneNode(true);
            const asteriskSpan = labelClone.querySelector(".required-asterisk");
            if (asteriskSpan) {
                asteriskSpan.remove();
            }
            return labelClone.textContent.trim();
        }
        return field.name;
    }

    function showSuccessMessage() {
        const existing = document.querySelector(".success-message");
        if (existing) {
            existing.remove();
        }

        const successElement = document.createElement("div");
        successElement.className = "success-message";
        successElement.textContent = "Event Successfully Posted!";

        const submitButton = document.getElementById("submitButton");
        submitButton.insertAdjacentElement("afterend", successElement);

        setTimeout(() => {
            if (successElement.parentNode) {
                successElement.remove();
            }
        }, 5000);
    }

    function handleFileUpload(file) {
        if (!file) return null;

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                resolve({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: e.target.result,
                    lastModified: file.lastModified,
                });
            };
            reader.onerror = function (e) {
                reject(e);
            };
            reader.readAsDataURL(file);
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let isValid = true;

        requiredFields.forEach((fieldName) => {
            const field = form.elements[fieldName];
            if (field && !validateField(field)) {
                isValid = false;
            }
        });

        if (!validateRadioGroup()) {
            isValid = false;
        }

        if (!isValid) {
            const firstError = form.querySelector(".error, .has-error");
            if (firstError) {
                firstError.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
            return;
        }

        const photoInput = document.getElementById("photo");
        const photoFile = photoInput.files[0];

        let photoData = null;
        if (photoFile) {
            try {
                photoData = await handleFileUpload(photoFile);
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("Error uploading file. Please try again.");
                return;
            }
        }

        const eventData = {
            eventName: form.elements["eventName"].value,
            orgName: form.elements["orgName"].value,
            date: form.elements["date"].value,
            startTime: form.elements["startTime"].value,
            endTime: form.elements["endTime"].value,
            location: form.elements["location"].value,
            description: form.elements["description"].value,
            food: form.querySelector('input[name="food"]:checked').value,
            photo: photoData,
            altText: form.elements["altText"].value,
            timestamp: new Date().toISOString(),
        };

        let events = JSON.parse(localStorage.getItem("events") || "[]");

        events.push(eventData);

        localStorage.setItem("events", JSON.stringify(events));

        showSuccessMessage();
        form.reset();
        foodRadios.forEach((r) => (r.checked = false));
        if (foodDetails) {
            foodDetails.style.display = "none";
        }

        document.getElementById("fileNameDisplay").textContent =
            "No file chosen";

        form.querySelectorAll(".error, .success").forEach((el) => {
            el.classList.remove("error", "success");
        });
        form.querySelectorAll(".error-message, .radio-group-error").forEach(
            (el) => {
                el.remove();
            },
        );
    });
});
