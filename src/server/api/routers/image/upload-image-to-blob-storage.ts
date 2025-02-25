import { type DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import { env } from "~/env";

export async function uploadImageToBlobStorage(
  defaultAzureCredential: DefaultAzureCredential,
  blobName: string,
  data: Buffer | Blob | ArrayBuffer | ArrayBufferView
) {
  const azureBlobStorageUri = `https://${env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`;
  const blobServiceClient = new BlobServiceClient(azureBlobStorageUri, defaultAzureCredential);

  const containerName = env.AZURE_STORAGE_ACCOUNT_IMAGES_CONTAINER_NAME;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const isContainerExist = await containerClient.exists();
  if (!isContainerExist) {
    console.log(`Container "${containerName}" does not exist. Creating a new container...`);
    await containerClient.create({ access: "blob" });
  }

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.log("Uploading image to Azure Blob Storage...");
  await blockBlobClient.uploadData(data);

  const downloadUrl = blockBlobClient.url;
  return downloadUrl;
}
