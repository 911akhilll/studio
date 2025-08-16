# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Using Your Own Images

To use your own images in this project, follow these steps:

1.  **Create an `images` directory:** Inside the `public` folder at the root of your project, create a new folder named `images`.
2.  **Add your images:** Place your image files (e.g., `my-project-image.png`) inside the `public/images` directory.
3.  **Reference them in your code:** You can now use your images directly in your components. For example, in an `Image` component, you would reference it with a relative path starting from the `public` folder:

    ```jsx
    import Image from 'next/image';

    <Image src="/images/my-project-image.png" alt="My Project" width={800} height={600} />
    ```

You can update the `projects` array in `src/components/projects.tsx` to use your new images.
