export function preloadImages() {
    return new Promise((resolve) => {
        const images = [
            {
                src: 'assets/images/space0.jpg',
                type: 'background'
            },
        ];

        let loadedImages = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
            resolve();
            return;
        }

        images.forEach(image => {
            const img = new Image();
            img.onload = () => {
                loadedImages++;
                if (image.type === 'background') {
                    document.documentElement.style.backgroundImage = `url(${image.src})`;
                    document.documentElement.classList.add('loaded');
                }
                if (loadedImages === totalImages) {
                    resolve();
                }
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${image.src}`);
                loadedImages++;
                if (loadedImages === totalImages) {
                    resolve();
                }
            };
            img.src = image.src;
        });
    });
} 