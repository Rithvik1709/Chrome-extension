const shortenButton = document.getElementById("shorten-btn");
const longUrlInput = document.getElementById("long-url");
const shortUrlDisplay = document.getElementById("short-url");
const copyMessage = document.getElementById("copy-msg");

function generateHash(url) {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = (hash << 5) - hash + url.charCodeAt(i);
    hash |= 0; 
  }
  return Math.abs(hash).toString(36); 
}

shortenButton.addEventListener("click", () => {
  const longUrl = longUrlInput.value.trim();
  if (!longUrl) {
    shortUrlDisplay.textContent = "Please enter a valid URL.";
    return;
  }

  const shortHash = generateHash(longUrl);
  const shortUrl = `https://short.url/${shortHash}`; 
  shortUrlDisplay.textContent = shortUrl;

  shortUrlDisplay.addEventListener("click", () => {
    navigator.clipboard.writeText(shortUrl);
    copyMessage.textContent = "Short URL copied to clipboard!";
    setTimeout(() => (copyMessage.textContent = ""), 2000);
  });
});
