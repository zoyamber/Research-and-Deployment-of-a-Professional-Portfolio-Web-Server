document.addEventListener("DOMContentLoaded", function() {
    const terminalContent = document.getElementById("terminal-content");
    terminalContent.innerHTML = ""; // Clear the terminal content

    const typewriterLines = [
        { prompt: "~$", text: "zoya.location" },
        { prompt: ">", text: "Surrey, BC" },
        { prompt: "~$", text: "zoya.contact" },
        { prompt: ">", text: "zoyamber@gmail.com", link: "mailto:zoyamber@gmail.com" },
        { prompt: "~$", text: "zoya.resume" },
        { prompt: ">", text: "ZoyaResume.pdf", link: "/static/assets/ZoyaResume.pdf" },
        { prompt: "~$", text: "zoya.education" },
        { prompt: ">", text: "BCIT, Computer Information Technology" },
        { prompt: "~$", text: "zoya.skills" },
        { prompt: ">", text: "HTML, CSS, JavaScript, Python, MySQL" }
    ];

    let lineIndex = 0;

    function typeWriter(line) {
        const promptElement = document.createElement("span");
        promptElement.className = "terminal-prompt";
        promptElement.innerHTML = line.prompt + " ";

        const textElement = document.createElement("span");
        textElement.className = "typewriter";

        if (line.link) {
            const linkElement = document.createElement("a");
            linkElement.href = line.link;
            linkElement.target = "_blank";
            textElement.appendChild(linkElement);
        }

        const lineElement = document.createElement("div");
        lineElement.className = "typewriter-line";
        lineElement.appendChild(promptElement);
        lineElement.appendChild(textElement);

        terminalContent.appendChild(lineElement);

        const text = line.text;
        let i = 0;

        function typeCharacter() {
            if (i < text.length) {
                if (line.link) {
                    textElement.firstChild.innerHTML += text.charAt(i);
                } else {
                    textElement.innerHTML += text.charAt(i);
                }
                i++;
                setTimeout(typeCharacter, 50);
            } else {
                lineIndex++;
                if (lineIndex < typewriterLines.length) {
                    setTimeout(() => typeWriter(typewriterLines[lineIndex]), 500);
                }
            }
        }

        typeCharacter();
    }

    if (typewriterLines.length > 0) {
        typeWriter(typewriterLines[lineIndex]);
    }
});