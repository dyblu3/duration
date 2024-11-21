// script.js
$(document).ready(function() {
    // Inisialisasi datepicker untuk input tanggal dengan format DD/MM/YYYY
    $("#start-date, #end-date").datepicker({
        dateFormat: "dd/mm/yy",  // Mengubah format tanggal menjadi DD/MM/YYYY
        changeMonth: true,
        changeYear: true
    });
});

function calculateDuration() {
    const startDate = document.getElementById("start-date").value;
    const startTime = document.getElementById("start-time").value;
    const endDate = document.getElementById("end-date").value;
    const endTime = document.getElementById("end-time").value;
    
    if (!startDate || !startTime || !endDate || !endTime) {
        alert("Harap masukkan semua tanggal dan waktu!");
        return;
    }

    // Memeriksa format tanggal (DD/MM/YYYY) dan mengonversinya menjadi YYYY-MM-DD
    const startDateParts = startDate.split('/');
    const endDateParts = endDate.split('/');

    if (startDateParts.length !== 3 || endDateParts.length !== 3) {
        alert("Format tanggal salah, pastikan menggunakan DD/MM/YYYY");
        return;
    }

    // Mengonversi ke format yang diterima oleh JavaScript (YYYY-MM-DD)
    const startDateTime = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}T${startTime}`);
    const endDateTime = new Date(`${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}T${endTime}`);

    // Menghitung selisih dalam milidetik
    const diff = endDateTime - startDateTime;

    if (diff < 0) {
        alert("Tanggal dan waktu selesai harus lebih besar dari tanggal dan waktu mulai!");
        return;
    }

    // Menghitung durasi dalam berbagai unit
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Menampilkan hasil durasi
    const result = document.getElementById("duration-result");
    result.textContent = `${years} tahun ${months} bulan ${days} hari ${hours} jam ${minutes} menit`;
}