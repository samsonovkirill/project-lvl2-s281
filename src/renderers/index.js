import treeRender from './tree';
import plainRender from './plain';

const renderers = {
  tree: treeRender,
  plain: plainRender,
};

export default format => (data) => {
  const render = renderers[format];
  if (!render) {
    throw new Error(`Render format ${format} is not supported`);
  }
  return render(data);
};
