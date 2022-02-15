import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import {
  searchBox,
  hits,
  pagination,
  refinementList,
} from 'instantsearch.js/es/widgets';

import resultHit from '../templates/result-hit';

/** MIDDLEWARE NOT USED
search.use(
  instantsearch.middlewares.createInsightsMiddleware({
    insightsClient: aa,
  })
);

 */

/**
 * @class ResultsPage
 * @description Instant Search class to display content on main page
 */
class ResultPage {
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   */
  _registerClient() {
    this._searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );

    this._searchInstance = instantsearch({
      indexName: process.env.ALGOLIA_INDEX,
      searchClient: this._searchClient,
    });
  }

  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      searchBox({
        container: '#searchbox',
      }),
      hits({
        container: '#hits',
        templates: {
          item: resultHit => {
          const productURL =
          'product.html?objectID=' +
          hits.objectID +
          '&queryID=' +
          hits.__queryID;
        },
      },
      }),
      pagination({
        container: '#pagination',
      }),
      refinementList({
        container: '#brand-facet',
        attribute: 'brand',
      }),
      refinementList({
        container: '#categories-facet',
        attribute: 'categories',
      }),
    ]);
  }

  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */

  _startSearch() {
    this._searchInstance.start();
  }
}

document.getElementById('add-to-cart').addEventListener('click', () => {
  aa('convertedObjectIDsAfterSearch', {
    index: indexName,
    eventName: 'Addedition_Cart',
    userToken: 'US1',
    objectIDs: [objectID],
    queryID: urlParams.get('queryID'),
  });

});

export default ResultPage;