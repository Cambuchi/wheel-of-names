// module to create the footer with javascript
const createFooter = () => {
  const footer = document.createElement('div');
  footer.id = 'footer';

  footer.textContent = 'good luck have fun';

  return footer;
};

export default createFooter;
