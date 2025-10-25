function addReview(place) {
  const review = prompt(`Masukkan review Anda untuk ${place}:`);
  if (review && review.trim() !== '') {
    const reviewList = document.getElementById(`reviews-${place}`);
    if (reviewList) {
      const li = document.createElement('li');
      li.textContent = review.trim();
      reviewList.appendChild(li);
    } else {
      console.warn(`Elemen reviews-${place} tidak ditemukan di DOM.`);
    }
  }
}

let harga = 0;
let motor = "";

function bukaSewa(nama, hargaPerHari) {
  motor = nama;
  harga = Number(hargaPerHari);

  const modal = document.getElementById("modalSewa");
  const namaEl = document.getElementById("namaMotor");
  const hargaEl = document.getElementById("hargaMotor");
  const hariInput = document.getElementById("hari");

  if (!modal || !namaEl || !hargaEl || !hariInput) {
    console.error("Elemen modal atau input tidak ditemukan. Pastikan ID sesuai.");
    return;
  }

  modal.style.display = "flex";
  namaEl.innerText = nama;
  hargaEl.innerText = harga.toLocaleString("id-ID");

  hariInput.value = 1;
  hitungTotal();
}

function tutupSewa() {
  const modal = document.getElementById("modalSewa");
  if (modal) modal.style.display = "none";
}

function hitungTotal() {
  const hariInput = document.getElementById("hari");
  const totalEl = document.getElementById("totalHarga");
  const linkWA = document.getElementById("linkWA");

  if (!hariInput || !totalEl || !linkWA) {
    console.error("Elemen untuk menghitung/menampilkan total tidak ditemukan.");
    return;
  }

  const hari = parseInt(hariInput.value, 10) || 1;
  const total = harga * hari;
  totalEl.innerText = total.toLocaleString("id-ID");

  const pesan = `Halo Mau Sewa ${motor} selama ${hari} hari. Total harga Rp ${total.toLocaleString("id-ID")}`;
  linkWA.href = `https://wa.me/6282177566395?text=${encodeURIComponent(pesan)}`;
}

// ✅ Fungsi Booking dipindah keluar agar bisa diakses tombol HTML
function lanjutBooking() {
  const googleFormURL = "https://forms.gle/1dL2QAGLzNaVfqGw8"; // ganti dengan link form kamu
  window.open(googleFormURL, "_blank");
}

window.addEventListener("click", function (event) {
  const modal = document.getElementById("modalSewa");
  if (modal && event.target === modal) {
    tutupSewa();
  }
});
