// module for creating the content section

import plusImage from '../assets/images/plus.png';

const createContent = () => {
  // create content container
  const content = document.createElement('div');
  content.id = 'content';

  // create the blurb
  const blurb = document.createElement('div');
  blurb.id = 'blurb';
  blurb.textContent = 'TODO: custom backgrounds...';

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

  const display = document.createElement('div');
  display.id = 'display';

  const graphic = document.createElement('div');
  graphic.id = 'graphic';

  const information = document.createElement('div');
  information.id = 'information';

  // // append all items into the content container
  display.append(chart);
  information.append(addItemsBar);
  information.append(itemsContainer);

  graphic.append(display);
  graphic.append(information);

  content.append(blurb);
  content.append(graphic);

  return content;
};

export default createContent;
