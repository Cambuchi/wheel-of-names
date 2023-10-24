// module for creating the content section

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

  const question = document.createElement('div');
  question.id = 'question';

  // // append all items into the content container
  content.append(blurb);
  content.append(chart);
  content.append(question);

  return content;
};

export default createContent;
