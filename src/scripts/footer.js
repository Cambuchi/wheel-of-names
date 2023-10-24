// module to create the footer with javascript
const createFooter = () => {
  const footer = document.createElement('div');
  footer.id = 'footer';

  footer.textContent = 'Compliant to NAVEX 2023 updated branding!';

  return footer;
};

export default createFooter;
