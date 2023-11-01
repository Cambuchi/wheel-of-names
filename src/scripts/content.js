// module for creating the content section

import plusImage from '../assets/images/plus.png';

const createContent = () => {
  // create content container
  const content = document.createElement('div');
  content.id = 'content';

  // create the blurb
  const blurb = document.createElement('div');
  blurb.id = 'blurb';
  blurb.textContent = 'TODO: add/remove people';

  const chart = document.createElement('div');
  chart.id = 'chart';

  // create the addItemsBar
  const addItemsBar = document.createElement('div');
  addItemsBar.id = 'add-items-bar';
  // add the addItemsBar image
  const addIcon = new Image();
  addIcon.src = plusImage;
  addIcon.id = 'plus-icon';
  // add the addItemsBar text input
  const addItems = document.createElement('input');
  addItems.type = 'text';
  addItems.id = 'add-items';
  addItems.placeholder = 'Add items...';
  // append search items into the addItemsBar
  addItemsBar.append(addItems);
  addItemsBar.append(addIcon);

  // create the items list
  const itemsContainer = document.createElement('div');
  itemsContainer.id = 'items-container';
  const items = document.createElement('ul');
  items.id = 'items';

  itemsContainer.append(items);

  // // append all items into the content container
  content.append(blurb);
  content.append(chart);
  content.append(addItemsBar);
  content.append(itemsContainer);

  return content;
};

export default createContent;
