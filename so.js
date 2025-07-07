    function printPyramid(rows) {
        for (let i = 1; i <= rows; i++) {
            const spaces = " ".repeat(rows - i);
            const stars = "*".repeat(2 * i - 1);
            console.log(spaces + stars);
        }
    }

    // Beispiel: Eine Pyramide mit 4 Reihen ausgeben
    printPyramid(100);