// module to create header with javascript
const createHeader = () => {
  const header = document.createElement('div');
  header.id = 'header';

  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const d = new Date();
  let day = weekday[d.getDay()];

  const title = document.createElement('p');
  title.classList = 'title';
  title.textContent = 'Happy ' + day + '!';

  header.append(title);

  return header;
};

export default createHeader;
