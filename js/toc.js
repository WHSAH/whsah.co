
const toc = document.getElementById("TOC");
for (let link of toc.getElementsByTagName("a")) {
    const backlink = document.createElement("a");
    backlink.className = 'citation-backlinks';
    backlink.innerHTML = '↩︎';
    backlink.style.fontSize = '0.6em';
    backlink.href = "#" + link.id;

    document.getElementById(link.getAttribute("href").substr(1)).append(" ", backlink);
}
