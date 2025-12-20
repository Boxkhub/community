document.write(`
    <script>
        document.querySelectorAll('.clickable-image').forEach(img => {
            img.addEventListener('click', function () {
                const modal = document.getElementById("image-modal");
                const modalImg = document.getElementById("modal-img");
                modal.style.display = "block";
                modalImg.src = this.src;
            });
        });

        document.querySelector(".close-btn").addEventListener('click', function () {
            document.getElementById("image-modal").style.display = "none";
        });

        document.getElementById("image-modal").addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = "none";
            }
        });
    </script>

    <footer class="dark-footer">
        <div class="container">
            <div class="social-icons">
                <a href="https://www.youtube.com/@բողկ", target="_blank"><i class="fab fa-youtube"></i></a>
                <a href="https://discord.gg/3ajuQbwzKN", target="_blank"><i class="fab fa-discord"></i></a>
                <a href="https://t.me/boxk_chat", target="_blank"><i class="fab fa-telegram"></i></a>
            </div>
            <div class="copyright">
                <p>&copy; 2025 BOXK Modding. All mods are for games that we don't own.</p>
            </div>
        </div>
    </footer>
`)

function filterMods(tag) {
	const modCards = document.querySelectorAll('.mod-card');
	const filterButtons = document.querySelectorAll('.tag-filter');
	const searchInput = document.getElementById('mod-search');
	const searchIcon = document.querySelector('.search-box i');
	const noResults = document.getElementById('no-results');
	
	filterButtons.forEach(btn => {
		if (btn.dataset.tag === tag) {
			btn.classList.add('active');
		} else {
			btn.classList.remove('active');
		}
	});
	
	if (tag === 'all') {
		searchInput.disabled = false;
		searchInput.placeholder = "Որոնել...";
		searchIcon.style.color = "var(--text-secondary)";
		searchInput.style.opacity = "1";
		searchInput.style.cursor = "text";
	} else {
		searchInput.disabled = true;
		searchInput.placeholder = "Որոնումը հասանելի չէ";
		searchIcon.style.color = "var(--white-stripe)";
		searchInput.style.opacity = "0.6";
		searchInput.style.cursor = "not-allowed";
		searchInput.value = "";
	}
	
	modCards.forEach(card => {
		if (tag === 'all') {
			card.classList.remove('hidden');
		} else {
			const cardTags = card.getAttribute('data-tags');
			if (cardTags && cardTags.includes(tag)) {
				card.classList.remove('hidden');
			} else {
				card.classList.add('hidden');
			}
		}
	});
	
	checkVisibleCards();
}

function searchMods() {
	const activeTag = document.querySelector('.tag-filter.active').dataset.tag;
	const searchTerm = document.getElementById('mod-search').value.toLowerCase();
	const modCards = document.querySelectorAll('.mod-card');
	const noResults = document.getElementById('no-results');
	
	if (activeTag !== 'all') return;
	
	let visibleCount = 0;
	
	modCards.forEach(card => {
		const title = card.querySelector('h3').textContent.toLowerCase();
		const description = card.querySelector('p').textContent.toLowerCase();
		
		if (searchTerm.trim() === '') {
			card.classList.remove('hidden');
			visibleCount++;
		} else if (title.includes(searchTerm) || description.includes(searchTerm)) {
			card.classList.remove('hidden');
			visibleCount++;
		} else {
			card.classList.add('hidden');
		}
	});
	
	if (searchTerm.trim() !== '' && visibleCount === 0) {
		noResults.style.display = 'block';
	} else {
		noResults.style.display = 'none';
	}
}

function checkVisibleCards() {
	const modCards = document.querySelectorAll('.mod-card');
	const noResults = document.getElementById('no-results');
	let visibleCount = 0;
	
	modCards.forEach(card => {
		if (!card.classList.contains('hidden')) {
			visibleCount++;
		}
	});
	
	if (visibleCount === 0) {
		noResults.style.display = 'block';
	} else {
		noResults.style.display = 'none';
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const filterButtons = document.querySelectorAll('.tag-filter');
	filterButtons.forEach(button => {
		button.addEventListener('click', () => {
			const tag = button.getAttribute('data-tag');
			filterMods(tag);
		});
	});
	
	const searchInput = document.getElementById('mod-search');
	searchInput.addEventListener('input', searchMods);
	
	searchInput.disabled = false;
	
	checkVisibleCards();
});