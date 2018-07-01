import _ from 'lodash';
import { makePrefix, getItemHandler } from './utils';

const standartBuilder = (item, path) => {
  const fullpath = `${makePrefix(path)}${item.key}`;
  return { ...item, key: fullpath };
};

const objBuilders = {
  nested: ({ children, key }, path, render) => render(children, [...path, key]),
  new: standartBuilder,
  modified: standartBuilder,
  deleted: standartBuilder,
};

const convert = (diffs, path = []) => {
  const affectedItems = diffs.filter(item => item.type !== 'unmodified');
  const convertedItems = affectedItems.reduce((acc, item) => {
    const build = getItemHandler(item, objBuilders);
    const convertedItem = build(item, path, convert);
    return [...acc, convertedItem];
  }, []);
  return _.flatten(convertedItems);
};

const render = (diffs) => {
  const diffsFlatList = convert(diffs);
  const convertedOutput = diffsFlatList.reduce((acc, item) => {
    const itemTypeOmited = _.omit(item, 'type');
    if (acc.data[item.type]) {
      return {
        data: { ...acc.data, [item.type]: [...acc.data[item.type], itemTypeOmited] },
        stats: { ...acc.stats, [item.type]: acc.stats[item.type] + 1 },
      };
    }
    return {
      data: { ...acc.data, [item.type]: [itemTypeOmited] },
      stats: { ...acc.stats, [item.type]: 1 },
    };
  }, { data: {}, stats: {} });
  const statFields = Object.keys(convertedOutput.stats);
  const affectedCount = statFields.reduce((acc, item) => acc + convertedOutput.stats[item], 0);
  const finalOutput = {
    ...convertedOutput,
    stats: { ...convertedOutput.stats, affected: affectedCount },
  };
  const resultJSON = JSON.stringify(finalOutput);
  return `${resultJSON}\n`;
};

export default render;
