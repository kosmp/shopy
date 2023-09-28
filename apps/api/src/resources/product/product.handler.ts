import { eventBus, InMemoryEvent } from '@paralect/node-mongo';

import logger from 'logger';
import ioEmitter from 'io-emitter';
import { DATABASE_DOCUMENTS } from 'app.constants';

import { Product } from './product.types';

const { PRODUCTS } = DATABASE_DOCUMENTS;

eventBus.on(`${PRODUCTS}.created`, (data: InMemoryEvent<Product>) => {
  try {
    const product = data.doc;

    ioEmitter.publishToUser(product._id, 'product:created', product);
  } catch (err) {
    logger.error(`${PRODUCTS}.created handler error: ${err}`);
  }
});

eventBus.on(`${PRODUCTS}.deleted`, (data: InMemoryEvent<Product>) => {
  try {
    const product = data.doc;

    ioEmitter.publishToUser(product._id, 'product:deleted', product);
  } catch (err) {
    logger.error(`${PRODUCTS}.deleted handler error: ${err}`);
  }
});