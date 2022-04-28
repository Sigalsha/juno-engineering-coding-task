import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid } from "react-loader-spinner";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { fetchImageUrls } from "../api/index";

const Loader = styled.div`
  margin: 0 auto;
`;

const Image = styled.img`
  object-fit: contain;
  max-width: 90%;
  height: 100%;
  margin: auto 5%;
`;

const ImageCarousel = (props) => {
  const [loading, setLoading] = useState(true);
  const [fetchedImages, setFetchedImages] = useState([]);
  // TODO - const [errorMsg, setError] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      const fetchedImages = await fetchImageUrls();
      setFetchedImages(fetchedImages);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      {loading || !fetchImageUrls ? (
        <Loader>
          <Grid height="200" width="200" color="grey" ariaLabel="loading" />
        </Loader>
      ) : (
        <>
          <ArrowBackIosIcon />
          <Box
            sx={{
              bgcolor: "#cfe8fc",
              height: "80vh",
              width: "50%",
              margin: "0 auto"
            }}
          >
            <Image src={fetchedImages[0]} alt="image" />
          </Box>
          <ArrowForwardIosIcon />
        </>
      )}
    </Container>
  );
};
export default ImageCarousel;
