import React, { useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";

const Gallery = (props) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const imageLinks = props.images.map((image) => {
        return `http://localhost:5000/${image.filePath}`;
    });

    return (
        <div>
            <img
                src={imageLinks[0]}
                onClick={() => openImageViewer(0)}
                width="100"
                style={{ margin: "2px" }}
                alt=""
            />

            {isViewerOpen && (
                <ImageViewer
                    src={imageLinks}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                    disableScroll={false}
                    backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)"
                    }}
                    closeOnClickOutside={true}
                />
            )}
        </div>
    );
};

export default Gallery;