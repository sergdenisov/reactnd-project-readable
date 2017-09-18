import React from 'react';
import { Grid, Jumbotron, PageHeader } from 'react-bootstrap';
import Categories from '../Categories/Categories';
import Posts from '../Posts/Posts';

const MainView = () => (
  <div>
    <Jumbotron>
      <Grid>
        <PageHeader>Main page</PageHeader>
      </Grid>
    </Jumbotron>
    <Categories />
    <Posts />
  </div>
);

export default MainView;
