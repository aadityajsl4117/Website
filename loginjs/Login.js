  function togglePass(inputId, icon) {
        const input = document.getElementById(inputId);
        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        } else {
            input.type = "password";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        }
    }

    // 2. Tab Switcher
    function showForm(type, btn) {
        const sections = document.querySelectorAll('.form-section');
        const tabs = document.querySelectorAll('.tab-btn');
        document.getElementById('statusMsg').style.display = 'none';
        
        sections.forEach(s => s.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(type + '-sec').classList.add('active');
    }

    // 3. Validation Logic
    function checkRules(pass) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass);
    }

    function showStatus(text, isError = false) {
        const msg = document.getElementById('statusMsg');
        msg.innerText = text;
        msg.style.display = 'block';
        msg.style.background = isError ? "#fee2e2" : "#dcfce7";
        msg.style.color = isError ? "#b91c1c" : "#15803d";
        msg.style.border = isError ? "1px solid #fecaca" : "1px solid #bbf7d0";
    }

    document.getElementById('loginForm').onsubmit = (e) => {
        e.preventDefault();
        showStatus("Checking credentials... Please wait.");
    };

    document.getElementById('registerForm').onsubmit = (e) => {
        e.preventDefault();
        const pass = document.getElementById('rPass').value;
        if (!checkRules(pass)) {
            showStatus("Password must be 8+ chars with Uppercase, Number, and Symbol.", true);
            return;
        }
        showStatus("Account created! Redirecting to login...");
        setTimeout(() => window.location.reload(), 2000);
    };


    
    document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault(); 

    const email = document.getElementById('lEmail').value.trim();
    const password = document.getElementById('lPass').value.trim();

    if (email === "" || password === "") {
        alert("Please enter email and password");
    } else {


        document.getElementById("statusMsg").innerText = "Login Successful! Redirecting...";
        document.getElementById("statusMsg").style.display = "block";


        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);
    }
};