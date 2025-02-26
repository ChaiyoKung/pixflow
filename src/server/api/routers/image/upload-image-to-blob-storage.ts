import { type BlobServiceClient } from "@azure/storage-blob";
import { lookup } from "~/utils/mime-types";

export async function uploadImageToBlobStorage(
  client: BlobServiceClient,
  containerName: string,
  blobName: string,
  data: Buffer | Blob | ArrayBuffer | ArrayBufferView
) {
  const containerClient = client.getContainerClient(containerName);

  const isContainerExist = await containerClient.exists();
  if (!isContainerExist) {
    console.log(`Container "${containerName}" does not exist. Creating a new container...`);
    await containerClient.create({ access: "blob" });
  }

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.log("Uploading image to Azure Blob Storage...");
  await blockBlobClient.uploadData(data, { blobHTTPHeaders: { blobContentType: lookup(blobName) } });

  const downloadUrl = blockBlobClient.url;
  return downloadUrl;
}
