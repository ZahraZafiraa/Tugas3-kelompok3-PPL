const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
const novelsFilePath = "novels.json";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Fungsi untuk membaca file JSON dengan validasi
const readNovels = () => {
    try {
        if (!fs.existsSync(novelsFilePath)) {
            fs.writeFileSync(novelsFilePath, JSON.stringify({ novels: [] }, null, 2));
        }
        const data = fs.readFileSync(novelsFilePath, "utf8");
        const parsedData = JSON.parse(data);
        // console.log("Isi novel.json:", parsedData); // 🔍 Debugging
        return parsedData.novels || [];
    } catch (error) {
        console.error("Gagal membaca file JSON:", error);
        return [];
    }
};

// Fungsi untuk menulis file JSON
const writeNovels = (novels) => {
    try {
        fs.writeFileSync(novelsFilePath, JSON.stringify({ novels }, null, 2));
    } catch (error) {
        console.error("Gagal menulis file JSON:", error);
    }
};

// 🟢 GET: Ambil semua novel
app.get("/novels", (req, res) => {
    const novels = readNovels();
    res.json({ novels });
});

// 🟢 GET: Ambil novel dengan rating tertinggi (Versi Diperbaiki)
app.get("/novels/top-rated", (req, res) => {
    let novels = readNovels();
    
    if (novels.length === 0) {
        return res.status(404).json({ message: "Tidak ada novel yang tersedia!" });
    }

    // Filter hanya novel yang memiliki rating valid (angka)
    let ratedNovels = novels.filter(novel => typeof novel.rating === "number" && !isNaN(novel.rating));

    if (ratedNovels.length === 0) {
        return res.status(404).json({ message: "Tidak ada novel dengan rating yang valid!" });
    }

    // Cari semua novel dengan rating tertinggi jika ada lebih dari satu
    const maxRating = Math.max(...ratedNovels.map(novel => novel.rating));
    const topRatedNovels = ratedNovels.filter(novel => novel.rating === maxRating);

    res.json({ 
        message: "Novel dengan rating tertinggi!", 
        topRatedNovel: topRatedNovels[0] // Ambil satu yang terbaik
    });
});

// 🟢 GET: Ambil detail novel berdasarkan judul
app.get("/novels/:title", (req, res) => {
    const { title } = req.params;
    const novels = readNovels();
    const novel = novels.find(n => n.title.toLowerCase() === title.toLowerCase());

    if (novel) {
        res.json(novel);
    } else {
        res.status(404).json({ message: "Novel tidak ditemukan." });
    }
});

// 🟢 POST: Tambah novel baru
app.post("/novels", (req, res) => {
    const { title, author, year, genre, pages, rating, summary } = req.body;

    if (!title || !author || !year || !genre || !pages || !rating || !summary) {
        return res.status(400).json({ message: "Semua data harus diisi!" });
    }

    let novels = readNovels();

    // Cek apakah judul sudah ada
    if (novels.some(n => n.title.toLowerCase() === title.toLowerCase())) {
        return res.status(400).json({ message: "Novel dengan judul ini sudah ada!" });
    }

    const newNovel = { title, author, year, genre, pages, rating, summary };
    novels.push(newNovel);
    writeNovels(novels);

    res.json({ message: "Novel berhasil ditambahkan!", data: newNovel });
});

// 🟡 PUT: Update novel berdasarkan judul
app.put("/novels/:title", (req, res) => {
    const { title } = req.params;
    const { author, year, genre, pages, rating, summary } = req.body;

    let novels = readNovels();
    let novelIndex = novels.findIndex(n => n.title.toLowerCase() === title.toLowerCase());

    if (novelIndex === -1) {
        return res.status(404).json({ message: "Novel tidak ditemukan." });
    }

    novels[novelIndex] = { ...novels[novelIndex], author, year, genre, pages, rating, summary };
    writeNovels(novels);

    res.json({ message: "Novel berhasil diperbarui!", data: novels[novelIndex] });
});

// 🔴 DELETE: Hapus novel berdasarkan judul
app.delete("/novels/:title", (req, res) => {
    const title = decodeURIComponent(req.params.title).toLowerCase();
    let novels = readNovels();

    // Jika ditemukan, lanjut hapus
    const filteredNovels = novels.filter(n => n.title.toLowerCase() !== title);
    writeNovels(filteredNovels);

    res.json({ message: "Novel berhasil dihapus." });
});



// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});