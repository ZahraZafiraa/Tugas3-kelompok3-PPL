# Tugas3-kelompok3-PPL
# Project 3 PPL 

## NOVEL HUB
NovelHub adalah aplikasi berbasis Node.js yang digunakan untuk mengelola daftar novel. Aplikasi ini memungkinkan pengguna untuk menambahkan, melihat, memperbarui, dan menghapus data novel yang disimpan dalam file JSON sebagai database.

![image](https://github.com/user-attachments/assets/765d49f2-8db8-4b61-9f13-a2c11352117a)


### Fitur Utama 
1. Melihat Daftar Novel – Menampilkan semua novel yang tersimpan dalam database.
2. Menambahkan Novel Baru – Pengguna dapat menambahkan novel dengan informasi lengkap seperti judul, pengarang, tahun terbit, genre, jumlah halaman, rating, dan ringkasan. Semua data wajib diisi.
3. Melihat Detail Novel – Mencari dan menampilkan detail sebuah novel berdasarkan judul.
4. Memperbarui Informasi Novel – Memungkinkan pengguna untuk mengubah informasi novel yang sudah ada.
5. Menghapus Novel – Menghapus novel dari database berdasarkan judul.
6. Menampilkan Novel dengan Rating Tertinggi – Menampilkan novel dengan rating tertinggi di database.

### Teknologi yang digunakan
- Node.js - Backend server
- Express.js - Framework untuk API
- JavaScript (ES6+) - Bahasa pemrograman utama
- HTML/CSS - Tampilan frontend

### Cara menjalankan aplikasi
1. Pastikan Node.js telah terinstal di komputer Anda.
2. Clone repositori ini atau buat file dengan struktur di atas.
3. Install dependensi dengan perintah berikut
   
   **npm install**
   
4. Jalankan server menggunakan perintah berikut:
   
   **node server.js**
   
   atau dengan nodemon agar restart otomatis saat ada perubahan:
   
   **nodemon server.js**
   
6. Buka Browser dan akses:
   
   **http://localhost:3000/**

### Note
- Data disimpan dalam format JSON pada file novels.json.


### Kontribusi
- Jika ingin berkontribusi, silakan fork repository ini dan buat pull request.
