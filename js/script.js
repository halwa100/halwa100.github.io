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
//chatboot
document.getElementById('chatbot-fab').addEventListener('click', function () {
    document.getElementById('chatbot').style.display = 'flex';
    document.getElementById('chatbot-fab').style.display = 'none'; // Hide the FAB when modal is open
});

document.getElementById('close-chatbot').addEventListener('click', function () {
    document.getElementById('chatbot').style.display = 'none';
    document.getElementById('chatbot-fab').style.display = 'flex'; // Show the FAB when modal is closed
});

document.getElementById('send-chatbot-message').addEventListener('click', function () {
    const userInput = document.getElementById('chatbot-text-input').value;
    addMessage('You', userInput);
    processMessage(userInput);
    document.getElementById('chatbot-text-input').value = '';
});

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    if (sender === 'Halwa bot') {
        messageElement.innerHTML = `${sender}: ${message}`;
    } else {
        messageElement.textContent = `${sender}: ${message}`;
    }
    document.getElementById('chatbot-messages').appendChild(messageElement);
    document.getElementById('chatbot-body').scrollTop = document.getElementById('chatbot-body').scrollHeight;
}

function processMessage(message) {
    let response = '';

    if (message.toLowerCase().includes('jam buka')) {
        response = 'Toko kami buka dari jam 08.30 pagi hingga 20.00 malam setiap hari.';
    } else if (message.toLowerCase().includes('lokasi')) {
        response = `
            <p>Toko kami berlokasi di:</p>
            <iframe class="map-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9715908691524!2d110.49060257526641!3d-7.012623992988865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708dd6f5f2fbf3%3A0xa2a7e5da256699d8!2sHalwa%20Advertising!5e0!3m2!1sid!2sid!4v1723499644422!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        `;
    } else if (message.toLowerCase().includes('harga')) {
        response = 'Harga produk kami bervariasi, mulai dari Rp 800 hingga Rp 170.000.';
    } else if (message.toLowerCase().includes('jenis')) {
        response = 'ada bermacam macam jenis barang dan boleh request';
    }
    else {
        response = 'Maaf, saya tidak mengerti pertanyaan Anda. Coba tanyakan tentang jam buka, lokasi, atau harga.';
    }

    addMessage('Halwa bot', response);
}


document.querySelectorAll('.column').forEach(function (column) {
    column.addEventListener('touchstart', function () {
        column.classList.add('active');
    });

    column.addEventListener('touchend', function () {
        setTimeout(function () {
            column.classList.remove('active');
        }, 200); // Durasi animasi sesuai dengan durasi @keyframes
    });
});
window.addEventListener('resize', function() {
  var chatbotModal = document.querySelector('.chatbot-modal');
  var header = document.querySelector('header');
  
  // Menyimpan tinggi header
  var headerHeight = header ? header.offsetHeight : 0;

  if (window.innerHeight < 600) { // Menandakan keyboard muncul
    chatbotModal.style.bottom = (headerHeight + 20) + 'px'; // Menyesuaikan posisi chatbot
  } else {
    chatbotModal.style.bottom = '20px'; // Posisi normal
  }
});
