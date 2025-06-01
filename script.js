document.addEventListener('DOMContentLoaded', () => {
    const questionsContainer = document.getElementById('questions-container');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');

    // Contoh pertanyaan (bisa diperbanyak dan disesuaikan)
    // Setiap pertanyaan diasosiasikan dengan satu atau lebih tipe RIASEC
    const questions = [
        { text: "Saya suka memperbaiki peralatan elektronik.", type: "R" },
        { text: "Saya suka melakukan penelitian ilmiah.", type: "I" },
        { text: "Saya suka membuat karya seni (melukis, musik).", type: "A" },
        { text: "Saya suka membantu orang lain belajar atau berkembang.", type: "S" },
        { text: "Saya suka memimpin sebuah tim atau proyek.", type: "E" },
        { text: "Saya suka bekerja dengan data dan angka secara teratur.", type: "C" },
        { text: "Saya suka bekerja di luar ruangan.", type: "R" },
        { text: "Saya suka memecahkan masalah yang kompleks.", type: "I" },
        { text: "Saya suka menulis cerita atau puisi.", type: "A" },
        { text: "Saya suka mendengarkan dan memberi saran kepada teman.", type: "S" },
        { text: "Saya suka menjual ide atau produk.", type: "E" },
        { text: "Saya suka mengatur barang-barang atau informasi.", type: "C" }
        // Tambahkan lebih banyak pertanyaan di sini
    ];

    // Tampilkan pertanyaan
    function renderQuestions() {
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question-item');
            questionDiv.innerHTML = `
                <label for="q${index}">${index + 1}. ${q.text}</label>
                <select id="q${index}" data-type="${q.type}">
                    <option value="0">Tidak Sesuai</option>
                    <option value="1">Kurang Sesuai</option>
                    <option value="2">Cukup Sesuai</option>
                    <option value="3">Sesuai</option>
                    <option value="4">Sangat Sesuai</option>
                </select>
            `;
            questionsContainer.appendChild(questionDiv);
        });
    }

    // Hitung hasil
    submitBtn.addEventListener('click', () => {
        const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        const selects = questionsContainer.querySelectorAll('select');

        selects.forEach(select => {
            const scoreValue = parseInt(select.value);
            const questionType = select.dataset.type;
            if (scores.hasOwnProperty(questionType)) {
                scores[questionType] += scoreValue;
            }
        });

        // Tentukan tipe dominan (sangat sederhana, bisa dikembangkan)
        let dominantType = "";
        let maxScore = -1;
        for (const type in scores) {
            if (scores[type] > maxScore) {
                maxScore = scores[type];
                dominantType = type;
            }
        }

        // Menampilkan hasil
        let resultString = `Skor Anda: R=${scores.R}, I=${scores.I}, A=${scores.A}, S=${scores.S}, E=${scores.E}, C=${scores.C}. `;
        resultString += `Tipe minat dominan Anda kemungkinan adalah: **${getRiasecName(dominantType)} (${dominantType})**.`;

        resultText.innerHTML = resultString; // Menggunakan innerHTML agar tag <strong> terbaca
        resultContainer.classList.remove('hidden');
    });

    function getRiasecName(typeCode) {
        const names = {
            R: "Realistic",
            I: "Investigative",
            A: "Artistic",
            S: "Social",
            E: "Enterprising",
            C: "Conventional"
        };
        return names[typeCode] || "Tidak Diketahui";
    }

    renderQuestions();
});