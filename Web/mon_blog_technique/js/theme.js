function applyTheme(theme) {
    const body = document.body;
    
    body.classList.remove('dark-mode', 'light-mode');
    
    if (theme === 'dark-mode') {
        body.classList.add('dark-mode');
        document.querySelector(".label-dark-or-light").textContent = 'Mode clair';
        document.querySelector("#dark-or-light").checked = true;
    } 
    
    else {
        body.classList.add('light-mode');
        document.querySelector(".label-dark-or-light").textContent = 'Mode sombre';
        document.querySelector("#dark-or-light").checked = false;
    }

    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    applyTheme(newTheme);
}

function applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } 
    
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark-mode');
    } 
    
    else {
        applyTheme('light-mode');
    }
}

document.querySelector("#dark-or-light").addEventListener("change", toggleTheme);

applyInitialTheme();