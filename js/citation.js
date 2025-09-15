
// Taken from https://github.com/MaxwellBo/celine
// MIT License
//
// Copyright (c) 2024 Max Bo
function alphabetize(n) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  let out = "";
  while (n > 0) {
    const mod = (n - 1) % 26;
    out = alphabet[mod] + out;
    n = Math.floor((n - mod) / 26);
  }
  return out;
}
// end import

for (let entry of document.getElementsByClassName("csl-entry")) {
    // open all external references in a new tab
    for (let link of entry.getElementsByTagName("a")) {
        link.setAttribute("target", "_blank");
    }

    const ref = entry.id;

    const citations = document.querySelectorAll("a[href='#" + ref + "']");
    const backlinks = document.createElement("sup");
    backlinks.className = 'citation-backlinks';
    backlinks.textContent = "^ ";

    let i = 1;
    for (let cit of citations) {
	let backlink = alphabetize(i);
	// enable backlink
	cit.setAttribute("id", ref + '-' + backlink);

	// backlink
	const elem = document.createElement('a');
	elem.textContent = backlink;
	elem.href = '#' + ref + '-' + backlink;
	backlinks.append(elem, " ");

	// enable hover action
	const wrapper = document.createElement('span');
	// wrap the cit to allow mouseover of both elements combined
	cit.parentNode.replaceChild(wrapper, cit);
	wrapper.appendChild(cit);

        const tooltip = document.createElement('span');
        tooltip.innerHTML = entry.innerHTML;
	tooltip.className = 'citation-tooltip';
	wrapper.appendChild(tooltip);

        wrapper.addEventListener('mouseenter', () => {
	    // Position the tooltip underneath the citation link, but further left if necessary
            const contentPadding = parseFloat(window.getComputedStyle(document.getElementsByClassName("render-area")[0]).paddingRight, 10);
	    const contentWidth = window.innerWidth - contentPadding*2;
	    const boxStyle = window.getComputedStyle(tooltip);
	    const boxWidth = Math.min(parseFloat(boxStyle.width, 10) + parseFloat(boxStyle.paddingRight)*2 + 2, contentWidth + 2);
	    const rectStart = cit.getBoundingClientRect().left;

	    const position = (rectStart + boxWidth > contentWidth) ? contentWidth - boxWidth + contentPadding : rectStart;
	    tooltip.style.left = `${position}px`;
            tooltip.style.display = 'block';
        });

        wrapper.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });

	i++;
    }
    entry.prepend(backlinks, " ");
}
