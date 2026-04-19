
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


    function showForm(type) {

        document.getElementById('statusMsg').style.display = 'none';
        

        document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
        document.getElementById(type + '-sec').classList.add('active');

        
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        document.getElementById('tab-' + type).classList.add('active');
    }


    function showStatus(text, isError = false) {
        const msg = document.getElementById('statusMsg');
        msg.innerText = text;
        msg.style.display = 'block';
        msg.style.background = isError ? "#fee2e2" : "#dcfce7";
        msg.style.color = isError ? "#b91c1c" : "#15803d";
        msg.style.border = isError ? "1px solid #fecaca" : "1px solid #bbf7d0";
    }


    

    document.getElementById('loginForm').onsubmit = function(e) {
        e.preventDefault();
        const email = document.getElementById('lEmail').value.trim();
        const pass = document.getElementById('lPass').value.trim();

        if (email && pass) {
            showStatus("Success! Redirecting to dashboard...");
            setTimeout(() => { window.location.href = "index.html"; }, 1200);
        } else {
            showStatus("Please fill all fields.", true);
        }
    };

    document.getElementById('registerForm').onsubmit = function(e) {
        e.preventDefault();
        const pass = document.getElementById('rPass').value;
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passRegex.test(pass)) {
            showStatus("Password must be 8+ chars with Uppercase, Number, and Symbol.", true);
            return;
        }

        showStatus("Account created! Please Sign In.");
        setTimeout(() => { showForm('signin'); }, 2000);
    }
