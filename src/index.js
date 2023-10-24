// import styles
import './styles/modern-normalize.css';
import './styles/main.css';

// import modules
import initialize from './scripts/initialize';

import * as d3 from './scripts/d3.v3.min';

// IIFE to encapsulate site creation
(() => {
  // create the initial page structure
  initialize();

  var padding = { top: 20, right: 40, bottom: 0, left: 0 },
    w = 800 - padding.left - padding.right,
    h = 800 - padding.top - padding.bottom,
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
  var data = [
    {
      label: 'Cam',
      value: 1,
      question: 'Loves traveling and wheels with names.',
    },
    {
      label: 'Damien',
      value: 2,
      question: 'Coming in hot and dual-wielding fire extinguishers.',
    },
    {
      label: 'Boss Mike',
      value: 3,
      question:
        "Suddenly you hear boss music playing, oh wait that's just Mike's computer straining under the load of 100 tabs.",
    },
    {
      label: 'Brad',
      value: 4,
      question: "Today's standup is sponsored by... ",
    },
    {
      label: 'Keith',
      value: 5,
      question:
        'Keith-math is going to the store to get coffee but leaving with pinto beans because BEANS.',
    },
    {
      label: 'PJ',
      value: 6,
      question: 'Platform wizard and also the remote working outfit of choice.',
    },
    {
      label: '#1 Mike G.',
      value: 7,
      question: 'Undisputed, number one Mike.',
    },
    {
      label: 'George',
      value: 8,
      question: 'Congrats on your recent promotion!',
    },
    {
      label: 'Ryan',
      value: 9,
      question: 'Unofficial SusEng father figure.',
    },
    {
      label: 'Best Mike S.',
      value: 10,
      question: 'Unarguably THE best Mike.',
    },
    {
      label: 'Ana',
      value: 11,
      question: 'Auggie is the unofficial SusEng mascot.',
    },
    {
      label: 'Ben',
      value: 12,
      question: 'I heard he lives in a panel van.',
    },
    {
      label: 'Jefferey',
      value: 13,
      question:
        'Strong contender to take it all home in the Best Meme-game NAVEX tournament.',
    },
    {
      label: 'Simon',
      value: 14,
      question:
        'Most likely following up on a ticket out of nowhere like John Cena.',
    },
    {
      label: 'Kyle',
      value: 15,
      question: 'With big feet comes big responsibility.',
    },
  ];
  var svg = d3
    .select('#chart')
    .append('svg')
    .data([data])
    .attr('width', w + padding.left + padding.right)
    .attr('height', h + padding.top + padding.bottom);
  var container = svg
    .append('g')
    .attr('class', 'chartholder')
    .attr(
      'transform',
      'translate(' + (w / 2 + padding.left) + ',' + (h / 2 + padding.top) + ')',
    );
  var vis = container.append('g');

  var pie = d3.layout
    .pie()
    .sort(null)
    .value(function (d) {
      return 1;
    });
  // declare an arc generator function
  var arc = d3.svg.arc().outerRadius(r);
  // select paths, use arc generator to draw
  var arcs = vis
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
      return data[i].label;
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
    var ps = 360 / data.length,
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
    vis
      .transition()
      .duration(1500)
      .attrTween('transform', rotTween)
      .each('end', function () {
        //mark question as seen
        d3.select('.slice:nth-child(' + (picked + 1) + ') path').attr(
          'fill',
          '#111',
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
          "It's your turn " + currentName;
        //populate question
        d3.select('#question').text(data[picked].question);
        oldrotation = rotation;

        /* Get the result value from object "data" */
        console.log(data[picked].value);

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
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function (t) {
      return 'rotate(' + i(t) + ')';
    };
  }

  function getRandomNumbers() {
    var array = new Uint16Array(1000);
    var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
    if (
      window.hasOwnProperty('crypto') &&
      typeof window.crypto.getRandomValues === 'function'
    ) {
      window.crypto.getRandomValues(array);
      console.log('works');
    } else {
      //no support for crypto, get crappy random numbers
      for (var i = 0; i < 1000; i++) {
        array[i] = Math.floor(Math.random() * 100000) + 1;
      }
    }
    return array;
  }
})();
