import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { Grid } from "react-loader-spinner";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { fetchImages } from "../api/index";

const Loader = styled.div`
  margin: 0 auto;
`;

const Image = styled.img`
  object-fit: contain;
  max-width: 80%;
  height: 100%;
  margin: 0 5%;

  @media (max-width: 480px) {
    max-width: 75%;
  }
`;

const ImageCarousel = (props) => {
  const [loading, setLoading] = useState(true);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [imagesLength, setImagesLength] = useState(0);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const [errorMsg, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchImages();
        setFetchedImages(fetchedImages);
        setImagesLength(fetchedImages.length);
      } catch (error) {
        setError(error);
      }
    };
    loadImages();
    setLoading(false);
  }, []);

  const handleNextClick = () => {
    setCurrentImgIndex(
      currentImgIndex === imagesLength - 1 ? 0 : currentImgIndex + 1
    );
  };

  const handlePrevClick = () => {
    setCurrentImgIndex(
      currentImgIndex === 0 ? imagesLength - 1 : currentImgIndex - 1
    );
  };

  const loader = (
    <Loader data-testid="loader">
      <Grid height="200" width="200" color="grey" ariaLabel="loading" />
    </Loader>
  );

  const error = (
    <Alert severity="error">
      {errorMsg ? errorMsg : "An error occurred, please try again"}
    </Alert>
  );

  const carousel = (
    <>
      <ArrowBackIosIcon
        sx={{
          margin: "0 auto",
          "&:hover": {
            cursor: "pointer"
          }
        }}
        onClick={handlePrevClick}
      />

      {fetchedImages.length &&
        fetchedImages.map((fetchedImage, index) => {
          return (
            <Fragment key={index}>
              {index === currentImgIndex && fetchedImage && (
                <Image
                  key={index}
                  src={fetchedImages[currentImgIndex]}
                  alt="image"
                  data-testid="fetchImg"
                />
              )}
            </Fragment>
          );
        })}

      <ArrowForwardIosIcon
        sx={{
          margin: "0 auto",
          "&:hover": {
            cursor: "pointer"
          }
        }}
        onClick={handleNextClick}
      />
    </>
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {loading || !fetchedImages || isNaN(currentImgIndex)
        ? loader
        : errorMsg
        ? error
        : carousel}
    </Container>
  );
};
export default ImageCarousel;
