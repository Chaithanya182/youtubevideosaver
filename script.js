let embedUrlList = JSON.parse(localStorage.getItem("listEle")) || [];  // Initialize or retrieve the list
let videosContainer = document.getElementById("videos-container");
let inputEle = document.getElementById("input-ele");

// Function to create and append the iframe
function createAndAppend(embedUrl) {
    if (!embedUrl) {
        console.log("Invalid URL. Cannot create iframe.");
        return; // Exit the function if embedUrl is invalid
    }

    console.log(embedUrl);

    // Create iframe element
    let iframeEle = document.createElement("iframe");
    iframeEle.setAttribute("class", "video");
    iframeEle.setAttribute("width", "560");
    iframeEle.setAttribute("height", "315");
    iframeEle.setAttribute("title", "YouTube video player");
    iframeEle.setAttribute("frameborder", "0");
    iframeEle.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    iframeEle.setAttribute("allowfullscreen", "");
    iframeEle.setAttribute("src", embedUrl);

    // Append the iframe to the videos container
    videosContainer.appendChild(iframeEle);
}


function convertShortToEmbedLink(youtubeUrl) {
    const urlPattern = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?&\s]+)/;
    const match = youtubeUrl.match(urlPattern);

    if (match && match[1]) {
        const videoId = match[1];
        return `https://www.youtube.com/embed/${videoId}`;
    } else {
        return null;
    }
}

inputEle.onkeydown = (event) => {
    if (event.key === "Enter") {
        let embedUrl = convertShortToEmbedLink(event.target.value);
        
        if (embedUrl) {
            embedUrlList.push(embedUrl); 
            localStorage.setItem("listEle", JSON.stringify(embedUrlList));  
            createAndAppend(embedUrlList[embedUrlList.length - 1]); 
        } else {
            console.log("Invalid YouTube URL");
        }
    }
};

window.onload = () => {
    embedUrlList.forEach(url => {
        createAndAppend(url); 
    });
};
