import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const AddToCart = React.lazy(() => import("checkout/AddToCart"));
import { getImage, getPokemonById } from "search/products";

const DetailsContent = (props) => {
  const { id } = useParams();

  const { data: pokemon } = useQuery(["getPokemonById", { id }], getPokemonById);
  
  return (
    <>
      {
        pokemon != null ? (
          <Card style={{ width: "18rem" }} key={pokemon.name.english}>
            <Card.Img
              variant="top"
              src={getImage(pokemon)}
              style={{
                maxHeight: 200,
                objectFit: "contain",
                width: "auto",
                height: "auto",
              }}
            />
            <Card.Body>
              <Card.Title>{pokemon.name.english}</Card.Title>
              <Card.Text>{pokemon.type.join(", ")}</Card.Text>
              <Row>
                <Col xs={4}>${pokemon.price}</Col>
                <Col xs={8}>
                  <React.Suspense fallback={<span />}>
                    <AddToCart pokemon={pokemon}>Add To Cart</AddToCart>
                  </React.Suspense>
                </Col>
              </Row>
            </Card.Body>
          </Card>
         ) :
           null
      }
    </>
  );
};

export default DetailsContent;
