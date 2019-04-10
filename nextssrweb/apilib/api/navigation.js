import express from 'express';
import Navigation from 'apilib/models/navigation';
import NavigationType from 'apilib/models/navigationtype';
import { mockNavigationTypes, mockNavigations } from 'apilib/mockjson/mocknavs'

const needmock = process.env.NODE_ENV !== 'production';
const navigationRouter = express.Router();

/* eslint-disable no-unused-vars */
navigationRouter.get('/navigations', async (req, res) => {
  if (needmock) {
    res.json(mockNavigations());
  } else {
    try {
      const navigations = await Navigation.list();
      res.json(navigations);
    } catch (err) {
      res.json({ error: err.message || err.toString() });
    }
  }
});

/* eslint-disable no-unused-vars */
navigationRouter.get('/navigationtypes', async (req, res) => {
  if (needmock) {
    res.json(mockNavigationTypes());
  } else {
    try {
      const navigationtypes = await NavigationType.list();
      res.json(navigationtypes);
    } catch (err) {
      res.json({ error: err.message || err.toString() });
    }
  }
});

/* eslint-disable no-unused-vars */
navigationRouter.post('/navigationtype', async (req, res) => {
  // pass
});

export default navigationRouter;
