// No framework, no build step. Just toggles the mobile menu.
document.addEventListener('DOMContentLoaded', function () {
	var btn = document.getElementById('menu-btn');
	var menu = document.getElementById('mobile-menu');
	if (btn && menu) {
		btn.addEventListener('click', function () {
			menu.classList.toggle('open');
		});
	}
});
