const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
const novelsFilePath = "D:/gitkraken/PPL/Tugas3-kelompok3-PPL/novels.json";

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

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});