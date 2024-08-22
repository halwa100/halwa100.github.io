document.addEventListener('DOMContentLoaded', function () {
    const chatbotFab = document.querySelector('.chatbot-fab');
    const chatbotModal = document.querySelector('.chatbot-modal');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-footer input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotBody = document.getElementById('chatbot-body');
    const sendMessageButton = document.getElementById('send-chatbot-message');
// Combined Event Listener for Search and Price Filtering
    document.getElementById('searchForm').addEventListener('submit', function (e) {
        e.preventDefault();  // Prevent form submission and page reload

        const searchValue = document.getElementById('searchInput').value.toLowerCase();
        const selectedPriceRange = document.getElementById('priceFilter').value;
        const products = document.querySelectorAll('.column');

        products.forEach(product => {
            const productName = product.querySelector('h2').textContent.toLowerCase();
            const productDescription = product.querySelectorAll('p')[1]?.textContent.toLowerCase() || '';
            const priceText = product.querySelector('.price').textContent;
            const price = parseInt(priceText.replace(/[^\d]/g, ''));

            // Check if product matches the search term and price filter
            let matchesSearch = productName.includes(searchValue) || productDescription.includes(searchValue);
            let matchesPrice = (selectedPriceRange === 'all') ||
                (selectedPriceRange === '0,- sampai 800,-' && price <= 800) ||
                (selectedPriceRange === '800,- sampai 3000,-' && price > 800 && price <= 3000) ||
                (selectedPriceRange === '3000,- sampai 50000,-' && price > 3000 && price <= 50000) ||
                (selectedPriceRange === '50000,- sampai 170000,-' && price > 50000 && price <= 170000) ||
                (selectedPriceRange === '170000,- sampai 9999999,-' && price > 170000);

            // Display product if both filters are matched
            product.style.display = (matchesSearch && matchesPrice) ? 'block' : 'none';
        });
    });
    // Fungsi untuk menampilkan modal chatbot
    function showChatbotModal() {
        chatbotModal.style.display = 'flex';
        chatbotFab.style.display = 'none'; // Sembunyikan tombol FAB saat modal terbuka
        adjustChatbotPosition(); // Sesuaikan posisi ketika modal terbuka
    }

    // Fungsi untuk menyembunyikan modal chatbot
    function hideChatbotModal() {
        chatbotModal.style.display = 'none';
        chatbotFab.style.display = 'flex'; // Tampilkan kembali tombol FAB saat modal tertutup
    }

    // Fungsi untuk menyesuaikan posisi modal chatbot agar tetap di tengah layar saat keyboard muncul
    function adjustChatbotPosition() {
        const viewportHeight = window.innerHeight;
        const modalHeight = chatbotModal.offsetHeight;
        const availableHeight = viewportHeight - modalHeight;
        chatbotModal.style.bottom = `${availableHeight / 2}px`; // Posisikan di tengah
    }

    // Fungsi untuk menambahkan pesan ke dalam chatbot
    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = (sender === 'Halwa bot') ? `${sender}: ${message}` : `${sender}: ${message}`;
        chatbotMessages.appendChild(messageElement);
        chatbotBody.scrollTop = chatbotBody.scrollHeight; // Otomatis scroll ke pesan terbaru
    }

    // Fungsi untuk memproses pesan pengguna dan memberikan respons
    function processMessage(message) {
        let response = '';
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('jam buka')) {
            response = 'Toko kami buka dari jam 08.30 pagi hingga 20.00 malam setiap hari.';
        } else if (lowerMessage.includes('lokasi')) {
            response = `
                <p>Toko kami berlokasi di:</p>
                <iframe class="map-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9715908691524!2d110.49060257526641!3d-7.012623992988865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708dd6f5f2fbf3%3A0xa2a7e5da256699d8!2sHalwa%20Advertising!5e0!3m2!1sid!2sid!4v1723499644422!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            `;
        } else if (lowerMessage.includes('harga')) {
            response = 'Harga produk kami bervariasi, mulai dari Rp 800 hingga Rp 170.000.';
        } else if (lowerMessage.includes('jenis')) {
            response = 'Ada bermacam-macam jenis barang dan boleh request.';
        } else {
            response = 'Maaf, saya tidak mengerti pertanyaan Anda. Coba tanyakan tentang jam buka, lokasi, atau harga.';
        }

        addMessage('Halwa bot', response);
    }

    // Event listener untuk membuka chatbot ketika FAB diklik
    chatbotFab.addEventListener('click', showChatbotModal);

    // Event listener untuk menutup chatbot ketika tombol close diklik
    chatbotClose.addEventListener('click', hideChatbotModal);

    // Event listener untuk mengirim pesan chatbot
    sendMessageButton.addEventListener('click', function () {
        const userInput = chatbotInput.value;
        if (userInput.trim() !== '') {
            addMessage('You', userInput);
            processMessage(userInput);
            chatbotInput.value = '';
        }
    });

    // Kirim pesan menggunakan tombol Enter
    chatbotInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Cegah default behavior dari Enter
            sendMessageButton.click(); // Trigger tombol kirim
        }
    });

    // Sesuaikan posisi chatbot saat ukuran layar berubah (misalnya saat keyboard muncul di perangkat mobile)
    window.addEventListener('resize', function () {
        if (chatbotModal.style.display === 'flex') {
            adjustChatbotPosition();
        }
    });

    // Sesuaikan posisi chatbot saat input diaktifkan (untuk perangkat mobile)
    chatbotInput.addEventListener('focus', adjustChatbotPosition);
    chatbotInput.addEventListener('blur', function () {
        chatbotModal.style.bottom = '20px'; // Kembalikan posisi default setelah input kehilangan fokus
    });
});
