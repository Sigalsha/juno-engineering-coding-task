import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid } from "react-loader-spinner";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { fetchImages, fetchImage } from "../api/index";

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
    console.log("useEffect for fetching all images");

    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedImages = await fetchImages();
        console.log(fetchedImages);
        setFetchedImages(fetchedImages);
        setImagesLength(fetchedImages.length);
        setLoading(false);
      } catch (error) {
        console.log("error: ", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(async () => {
    setLoading(true);
    console.log("useEffect for fetching single image");
    try {
      console.log(currentImgIndex);

      await fetchImage(currentImgIndex);
      console.log(currentImgIndex);

      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
      setError(error);
      setLoading(false);
    }
  }, [currentImgIndex]);

  const handleNextClick = () => {
    console.log(imagesLength);
    setCurrentImgIndex(
      currentImgIndex === imagesLength - 1 ? 0 : currentImgIndex + 1
    );
  };

  const handlePrevClick = () => {
    console.log(imagesLength);
    console.log(currentImgIndex);

    setCurrentImgIndex(
      currentImgIndex === 0 ? imagesLength - 1 : currentImgIndex - 1
    );
  };

  const loader = (
    <Loader>
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
      <ArrowBackIosIcon sx={{ margin: "0 auto" }} onClick={handlePrevClick} />

      {fetchedImages.length &&
        fetchedImages.map((fetchedImage, index) => {
          return (
            <div key={index}>
              {index === currentImgIndex && fetchedImage && (
                <Image
                  key={index}
                  src={fetchedImages[currentImgIndex]}
                  alt="image"
                />
              )}
            </div>
          );
        })}

      <ArrowForwardIosIcon
        sx={{ margin: "0 auto" }}
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
      {loading ? loader : !fetchedImages || errorMsg ? error : carousel}
    </Container>
  );
};
export default ImageCarousel;
