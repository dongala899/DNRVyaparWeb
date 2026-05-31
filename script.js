document.querySelectorAll('.faq-question').forEach(function(button) {
    button.addEventListener('click', function() {
        var item = this.parentElement;
        var isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function(i) {
            i.classList.remove('active');
        });
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('active');
});
