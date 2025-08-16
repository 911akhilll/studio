
'use server';
/**
 * @fileOverview A flow for managing images in the project.
 * This is a special flow that does not call an LLM. Instead, it serves as a
 * trigger for the AI assistant to perform file operations on behalf of the user.
 * - listImages: Lists images in the `public/images` directory.
 * - uploadImage: "Uploads" an image by creating a new file in `public/images`.
 * - deleteImage: Deletes an image from `public/images`.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// === List Images Flow ===
const ListImagesOutputSchema = z.object({
  images: z.array(z.string()).describe('A list of image paths, e.g., /images/foo.png'),
});
export async function listImages(): Promise<z.infer<typeof ListImagesOutputSchema>> {
  return listImagesFlow();
}
const listImagesFlow = ai.defineFlow(
  {
    name: 'listImagesFlow',
    outputSchema: ListImagesOutputSchema,
  },
  async () => {
    // This is a placeholder. The AI assistant will intercept this call
    // and provide a real list of files from the `public/images` directory.
    console.log('Listing project images...');
    return { images: [] };
  }
);


// === Upload Image Flow ===
const UploadImageInputSchema = z.object({
  fileName: z.string().describe('The name of the file to create, e.g., my-image.png'),
  fileData: z.string().describe("The full Data URI of the file to upload. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
const UploadImageOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
  filePath: z.string().optional().describe('The final path of the uploaded image.'),
});

export async function uploadImage(input: z.infer<typeof UploadImageInputSchema>): Promise<z.infer<typeof UploadImageOutputSchema>> {
    return uploadImageFlow(input);
}

const uploadImageFlow = ai.defineFlow(
  {
    name: 'uploadImageFlow',
    inputSchema: UploadImageInputSchema,
    outputSchema: UploadImageOutputSchema,
  },
  async (input) => {
    // This is a placeholder. The AI assistant will intercept this call,
    // decode the Data URI, and save the file to `public/images`.
    console.log(`Uploading image: ${input.fileName}`);
    return { success: true, filePath: `/images/${input.fileName}` };
  }
);


// === Delete Image Flow ===
const DeleteImageInputSchema = z.object({
  filePath: z.string().describe('The path to the image to delete, e.g., /images/my-image.png'),
});
const DeleteImageOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
});

export async function deleteImage(input: z.infer<typeof DeleteImageInputSchema>): Promise<z.infer<typeof DeleteImageOutputSchema>> {
    return deleteImageFlow(input);
}

const deleteImageFlow = ai.defineFlow(
  {
    name: 'deleteImageFlow',
    inputSchema: DeleteImageInputSchema,
    outputSchema: DeleteImageOutputSchema,
  },
  async (input) => {
    // This is a placeholder. The AI assistant will intercept this call
    // and delete the specified file from the project.
    console.log(`Deleting image: ${input.filePath}`);
    return { success: true };
  }
);
