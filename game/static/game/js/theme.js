document.addEventListener("DOMContentLoaded", () => {
    const safeLocalStorage = {
        get(key) {
            try {
                return window.localStorage.getItem(key);
            } catch (error) {
                return null;
            }
        },
        set(key, value) {
            try {
                window.localStorage.setItem(key, value);
            } catch (error) {
                // ignore restricted storage environments
            }
        }
    };

    const storedTheme = safeLocalStorage.get("theme");
    const legacyTheme = safeLocalStorage.get("chessBoardTheme");
    const validStoredTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
    const savedTheme =
        validStoredTheme ||
        (legacyTheme === "light" || legacyTheme === "dark" ? legacyTheme : null) ||
        "dark";

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    const toggle = document.getElementById("themeToggle");

    const updateToggleState = (theme) => {
        if (!toggle) {
            return;
        }

        toggle.setAttribute("type", "button");
        toggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
        toggle.setAttribute(
            "aria-label",
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
        );
        toggle.textContent = theme === "light" ? "☀️" : "🌙";
    };
    updateToggleState(savedTheme);
    if (toggle) {
        toggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";

            document.documentElement.setAttribute("data-theme", newTheme);
            safeLocalStorage.set("theme", newTheme);
            updateToggleState(newTheme);
        });
    }
});
