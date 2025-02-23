export async function fetchImageArrayBuffer(url: string | URL) {
  console.log("Fetching image from URL...");
  const imageResponse = await fetch(url);
  const imageArrayBuffer = await imageResponse.arrayBuffer();
  return imageArrayBuffer;
}
