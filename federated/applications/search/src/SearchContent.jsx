import React from "react";
import { FormControl, Row, Col, Card } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AddToCart = React.lazy(() => import("checkout/AddToCart"));
import { getImage, searchPokemon } from "./products";

import { searchAction } from './store/search/actions';


const SearchContent = ({logSearch, searchData}) => {
  const [search, searchSet] = React.useState("");
  const { data } = useQuery(["searchPokemon", { q: search }], searchPokemon);

  return (
    <>
      <Row style={{ paddingTop: "1em" }}>
        <FormControl
          type="text"
          placeholder="Search"
          value={search}
          onChange={(evt) => {
            logSearch(evt.target.value);
            searchSet(evt.target.value);
          }}
        />
      </Row>
      <span>Redux value: {searchData}</span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 33%)",
          gridGap: "1em",
          paddingTop: "1em",
        }}
      >
        {data &&
          data.map((pokemon) => (
            <Card style={{ width: "18rem" }} key={pokemon.id}>
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
                <Link to={`/${pokemon.id}`} key={pokemon.name.english}>
                  <Card.Title>{pokemon.name.english}</Card.Title>
                </Link>
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
          ))}
      </div>
    </>
  );
};

export default connect(
  (state) => state.search,
  (dispatch) => ({
    logSearch: (value) => dispatch(searchAction(value)),
  }),
)(SearchContent);
