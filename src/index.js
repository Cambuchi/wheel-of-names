// import styles
import './styles/modern-normalize.css';
import './styles/main.css';

// import modules
import initialize from './scripts/initialize';
import * as DataStorage from './scripts/datastorage';

import * as d3 from './scripts/d3';

import TrashIcon from './assets/images/trash.png';
import EditIcon from './assets/images/edit.png';

const drawChart = (data) => {
  document.getElementById('chart').innerHTML = '';
  let padding = { top: 20, right: 40, bottom: 0, left: 0 },
    w = 650 - padding.left - padding.right,
    h = 650 - padding.top - padding.bottom,
    r = Math.min(w, h) / 2,
    rotation = 0,
    oldrotation = 0,
    picked = 100000,
    oldpick = [],
    color = d3.scale
      .ordinal()
      .range([
        '#FF4500',
        '#A30000',
        '#BFC805',
        '#157201',
        '#F884F8',
        '#D50580',
        '#03C7DC',
        '#054BC5',
      ]);

  let svg = d3
    .select('#chart')
    .append('svg')
    .data([data])
    .attr('width', w + padding.left + padding.right)
    .attr('height', h + padding.top + padding.bottom);

  let container = svg
    .append('g')
    .attr('class', 'chartholder')
    .attr(
      'transform',
      'translate(' + (w / 2 + padding.left) + ',' + (h / 2 + padding.top) + ')',
    );

  let vis = container.append('g');

  let pie = d3.layout
    .pie()
    .sort(null)
    .value(function (d) {
      return 1;
    });

  let arc = d3.svg.arc().outerRadius(r);

  // select paths, use arc generator to draw
  let arcs = vis
    .selectAll('g.slice')
    .data(pie)
    .enter()
    .append('g')
    .attr('class', 'slice');

  arcs
    .append('path')
    .attr('fill', function (d, i) {
      return color(i);
    })
    .attr('d', function (d) {
      return arc(d);
    });

  // add the text
  arcs
    .append('text')
    .attr('transform', function (d) {
      d.innerRadius = 0;
      d.outerRadius = r;
      d.angle = (d.startAngle + d.endAngle) / 2;
      return (
        'rotate(' +
        ((d.angle * 180) / Math.PI - 90) +
        ')translate(' +
        (d.outerRadius - 10) +
        ')'
      );
    })
    .attr('text-anchor', 'end')
    .text(function (d, i) {
      return data[i];
    });
  container.on('click', spin);

  function spin(d) {
    container.on('click', null);
    //all slices have been seen, all done
    console.log('OldPick: ' + oldpick.length, 'Data length: ' + data.length);
    if (oldpick.length == data.length) {
      console.log('done');
      container.on('click', null);
      return;
    }
    let ps = 360 / data.length,
      pieslice = Math.round(1440 / data.length),
      rng = Math.floor(Math.random() * 1440 + 360);

    rotation = Math.round(rng / ps) * ps;

    picked = Math.round(data.length - (rotation % 360) / ps);
    picked = picked >= data.length ? picked % data.length : picked;
    if (oldpick.indexOf(picked) !== -1) {
      d3.select(this).call(spin);
      return;
    } else {
      oldpick.push(picked);
    }

    rotation += 90 - Math.round(ps / 2);

    if (oldpick.length > 1) {
      d3.select(
        '.slice:nth-child(' + (oldpick[oldpick.length - 2] + 1) + ') text',
      ).style('fill', '#222');
    }

    vis
      .transition()
      .duration(1500)
      .attrTween('transform', rotTween)
      .each('end', function () {
        //mark question as seen
        d3.select('.slice:nth-child(' + (picked + 1) + ') path').attr(
          'fill',
          '#222',
        );
        d3.select('.slice:nth-child(' + (picked + 1) + ') text').style(
          'fill',
          'white',
        );

        // replace blurb with current name
        let currentName = d3.select(
          '.slice:nth-child(' + (picked + 1) + ') text',
        )[0][0]['textContent'];
        d3.selectAll('#blurb')[0][0]['textContent'] =
          'And the winner is... ' + currentName + '!';
        //populate question
        // d3.select('#question').text(data[picked].question);
        oldrotation = rotation;

        /* Get the result value from object "data" */
        // console.log(data[picked].value);

        /* Comment the below line for restrict spin to sngle time */
        container.on('click', spin);
      });
  }

  //make arrow
  svg
    .append('g')
    .attr(
      'transform',
      'translate(' +
        (w + padding.left + padding.right + 10) +
        ',' +
        (h / 2 + padding.top) +
        ')',
    )
    .append('path')
    .attr('d', 'M-' + r * 0.15 + ',0L0,' + r * 0.05 + 'L0,-' + r * 0.05 + 'Z')
    .style({ fill: 'white' });

  //draw spin circle
  container
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 60)
    .style({ fill: 'white', cursor: 'pointer' });

  //spin text
  container
    .append('text')
    .attr('x', 0)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .text('SPIN')
    .style({ 'font-weight': 'bold', 'font-size': '30px' });

  function rotTween(to) {
    let i = d3.interpolate(oldrotation % 360, rotation);
    return function (t) {
      return 'rotate(' + i(t) + ')';
    };
  }

  function getRandomNumbers() {
    let array = new Uint16Array(1000);
    let scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
    if (
      window.hasOwnProperty('crypto') &&
      typeof window.crypto.getRandomValues === 'function'
    ) {
      window.crypto.getRandomValues(array);
      console.log('works');
    } else {
      //no support for crypto, get crappy random numbers
      for (let i = 0; i < 1000; i++) {
        array[i] = Math.floor(Math.random() * 100000) + 1;
      }
    }
    return array;
  }
};

const load = () => {
  let data = DataStorage.retrieveData('data');
  populateItems(data);
  drawChart(data);
};

const addItem = (item, itemList) => {
  if (itemList.includes(item)) {
    console.log(`TODO: let user know ${item} already exists in list`);
    return;
  } else {
    itemList.push(item);
    DataStorage.setLocalStorage('data', itemList);
    load();
    createListeners();
  }
};

const deleteItem = (item, itemList) => {
  const index = itemList.indexOf(item);
  const newList = itemList.splice(index, 1);
  return newList;
};

const createItemListTrashIcon = () => {
  const trash = new Image();
  trash.src = TrashIcon;
  trash.className = 'item-list-trash';
  return trash;
};

const createItemListEditIcon = () => {
  const edit = new Image();
  edit.src = EditIcon;
  edit.className = 'item-list-edit';
  return edit;
};

const createItemListElement = (item) => {
  const itemListElement = document.createElement('li');
  itemListElement.classList = 'item-list-element';

  const itemName = document.createElement('div');
  itemName.classList = 'item-list-name';
  itemName.textContent = item;

  const itemTrash = createItemListTrashIcon();
  const editIcon = createItemListEditIcon();

  itemListElement.appendChild(itemName);
  // itemListElement.appendChild(editIcon);
  itemListElement.appendChild(itemTrash);

  return itemListElement;
};

const addItemContent = (itemData) => {
  // target item content container
  const itemList = document.getElementById('items-container');

  // create the item element
  const item = createItemListElement(itemData);

  // add the item to the item content container
  itemList.appendChild(item);
};

const populateItems = (itemList) => {
  const itemContainer = document.getElementById('items-container');
  itemContainer.innerHTML = '';

  itemList.forEach((item) => {
    addItemContent(item);
  });
};

const createAddItemsListener = () => {
  const inputElement = document.getElementById('add-items');
  inputElement.addEventListener(
    'keyup',
    (event) => {
      if (event.code === 'Enter') {
        const newItem = inputElement.value;
        const data = DataStorage.retrieveData('data');
        addItem(newItem, data);
        inputElement.value = '';
      }
      event.stopPropagation();
    },
    false,
  );
  const inputIconElement = document.getElementById('plus-icon');
  inputIconElement.addEventListener(
    'click',
    (event) => {
      if (event.target.id === 'plus-icon') {
        const newItem = inputElement.value;
        const data = DataStorage.retrieveData('data');
        addItem(newItem, data);
        inputElement.value = '';
      }
      event.stopPropagation();
    },
    false,
  );
};

const createListeners = () => {
  // retrieve the data
  const data = DataStorage.retrieveData('data');
  document.body.addEventListener(
    'click',
    (event) => {
      if (event.target !== event.currentTarget) {
        if (event.target.classList.contains('item-list-trash')) {
          const itemName = event.target.parentNode.firstChild.textContent;
          let newData = deleteItem(itemName, data);
          DataStorage.setLocalStorage('data', data);
          load();
        }
      }
      event.stopPropagation();
    },
    false,
  );
};

const clearItemList = (itemList) => {};

(() => {
  initialize();
  load();
  createListeners();
  createAddItemsListener();
})();
